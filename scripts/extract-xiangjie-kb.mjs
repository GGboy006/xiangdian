/**
 * 从香笺解包 appservice 抽出古方、香材 JSON，不接入产品。
 */
import fs from 'node:fs'
import path from 'node:path'
import vm from 'node:vm'

const ROOT = path.resolve(import.meta.dirname, '..')
const SRC = path.join(ROOT, 'wxapkg/wx02590eef639ed420_unpacked/appservice.app.js')
const OUT = path.join(ROOT, 'borrowed/xiangjie')

function extractBody(src, moduleName) {
  const tag = `define("data/kb/${moduleName}"`
  const i = src.indexOf(tag)
  if (i < 0)
    throw new Error(`missing ${moduleName}`)
  const fn = src.indexOf('function', i)
  const brace = src.indexOf('{', fn)
  const end = src.indexOf(`\n}, {\n    isPage: false,\n    isComponent: false,\n    currentFile: 'data/kb/${moduleName}'`, brace)
  if (end < 0)
    throw new Error(`end not found ${moduleName}`)
  return src.slice(brace + 1, end)
}

function runModule(body) {
  const module = { exports: {} }
  const sandbox = {
    require(p) {
      if (p.includes('_object_spread'))
        return { _: (a, b) => Object.assign({}, a || {}, b || {}) }
      return {}
    },
    module,
    exports: module.exports,
    Object,
    Array,
    Set,
    Number,
    String,
    Boolean,
    Math,
    JSON,
  }
  sandbox.exports = module.exports
  vm.runInNewContext(body, sandbox, { timeout: 15000 })
  return sandbox.module.exports
}

function slimIngredient(item = {}) {
  return {
    name: item.name || '',
    originalAmount: item.originalAmount || '',
    amount: item.amount ?? null,
    unit: item.unit || '',
    gram: item.gram ?? null,
    conversionStatus: item.conversionStatus || '',
    note: item.note || '',
  }
}

function flagsOf(formula) {
  const blob = [formula.originalText, formula.method, formula.note].join('\n')
  const flags = []
  if (/功效|适用人群|治疗头痛|安神定志/.test(blob))
    flags.push('editorial_efficacy')
  if (/约\d+(\.\d+)?克/.test(blob) && /一两（约30克）|约30克/.test(blob))
    flags.push('baked_30g_liang')
  if (String(formula.searchText || '').includes('/') || String(formula.searchText || '').includes('\\'))
    flags.push('had_local_path')
  return flags
}

function slimFormula(item, layer) {
  return {
    id: item.id,
    layer,
    name: item.name || '',
    source: item.source || '',
    type: item.type || '',
    method: item.method || '',
    note: item.note || '',
    originalText: item.originalText || '',
    ingredients: (item.ingredients || []).map(slimIngredient),
    unitProfileId: item.unitProfileId || '',
    unitProfileConfidence: item.unitProfileConfidence || '',
    flags: flagsOf(item),
  }
}

function slimMaterial(item) {
  return {
    id: item.id,
    name: item.name || '',
    aliases: item.aliases || [],
    category: item.category || '',
    sourceNote: item.sourceNote || '',
    processingNote: item.processingNote || '',
    characteristic: item.characteristic || '',
    identitySummary: item.identitySummary || '',
    aromaticSummary: item.aromaticSummary || '',
    nameRelations: (item.nameRelations || []).map(row => ({
      name: row.name || '',
      relationLabel: row.relationLabel || '',
      targetName: row.targetName || '',
      note: row.note || '',
    })),
    sourceCount: item.sourceCount ?? 0,
    reviewStatus: item.reviewStatus || '',
  }
}

function writeJson(file, data) {
  fs.writeFileSync(path.join(OUT, file), `${JSON.stringify(data, null, 2)}\n`)
}

const src = fs.readFileSync(SRC, 'utf8')
fs.mkdirSync(OUT, { recursive: true })

const generated = runModule(extractBody(src, 'ancient-formulas.generated.js'))
const reviewed = runModule(extractBody(src, 'ancient-formulas.reviewed.generated.js'))
const web = runModule(extractBody(src, 'web-sourced-formulas.generated.js'))
const materials = runModule(extractBody(src, 'materials.frontend.generated.js'))
const units = runModule(extractBody(src, 'unit-profiles.js'))

const formulasGenerated = generated.map(item => slimFormula(item, 'generated'))
const formulasReviewed = reviewed.map(item => slimFormula(item, 'reviewed'))
const formulasWeb = (Array.isArray(web) ? web : []).map(item => slimFormula(item, 'web'))
const materialsSlim = (Array.isArray(materials) ? materials : []).map(slimMaterial)

writeJson('formulas.generated.json', formulasGenerated)
writeJson('formulas.reviewed.json', formulasReviewed)
writeJson('formulas.web.json', formulasWeb)
writeJson('materials.json', materialsSlim)
writeJson('unit-profiles.json', {
  profiles: units.unitProfiles || [],
  specialUnits: units.specialUnits || {},
})

const index = {
  source: '香笺解包 knowledge base，仅作资料底本，未接入《香典》产品',
  extractedAt: new Date().toISOString().slice(0, 10),
  counts: {
    formulasGenerated: formulasGenerated.length,
    formulasReviewed: formulasReviewed.length,
    formulasWeb: formulasWeb.length,
    formulasTotal: formulasGenerated.length + formulasReviewed.length + formulasWeb.length,
    materials: materialsSlim.length,
    unitProfiles: (units.unitProfiles || []).length,
    generatedWithEfficacy: formulasGenerated.filter(item => item.flags.includes('editorial_efficacy')).length,
  },
}
writeJson('index.json', index)
console.log(JSON.stringify(index.counts, null, 2))
