#!/usr/bin/env python3
"""从 borrowed/xiangjie 生成产品面谱录 JSON。本典折算 1 两 = 40 克。功效文案不入库原文。"""

from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "borrowed" / "xiangjie"
OUT = ROOT / "src" / "data" / "corpus"
HANDMADE_MAT_FILES = [
    ROOT / "src" / "data" / "materials.ts",
    ROOT / "src" / "data" / "material-extras.ts",
]

LIANG = 40.0
QIAN = 4.0
FEN = 0.4
JIN = 640.0
ZI = 1.0

TYPE_TO_USE = {
    "熏香": "burn",
    "香饼": "burn",
    "香丸": "burn",
    "合香": "burn",
    "线香": "burn",
    "线香参考": "burn",
    "印香": "seal",
    "香囊": "wear",
    "佩香/烧香": "wear",
    "软香": "anoint",
    "器物香": "anoint",
    "香水": "anoint",
}

CAT_MAP = {
    "木质": "wood",
    "树脂": "resin",
    "结晶": "resin",
    "液体": "resin",
    "动物香材": "animal",
    "制香辅料": "compound",
    "炭料": "compound",
    "矿物辅料": "compound",
    "古方名物": "compound",
    "古方组合名": "compound",
}

print("constants ok")

SYNONYM = {
    "白檀": "檀香",
    "白檀香": "檀香",
    "真檀": "檀香",
    "旃檀": "檀香",
    "沉水香": "沉香",
    "水沉": "沉香",
    "伽南": "沉香",
    "龙脑香": "龙脑",
    "冰片": "龙脑",
    "片脑": "龙脑",
    "瑞龙脑": "龙脑",
    "生脑": "龙脑",
    "脐香": "麝香",
    "当门子": "麝香",
    "片麝": "麝香",
    "流螺": "甲香",
    "香甲": "甲香",
    "陵叶": "零陵香",
    "零陵": "零陵香",
    "蕙草": "零陵香",
    "燕草": "零陵香",
    "鸡舌香": "丁香",
    "丁子香": "丁香",
    "丁皮": "丁香",
    "丁香皮": "丁香",
    "舶上丁皮": "丁香",
    "薰陆": "乳香",
    "乳头香": "乳香",
    "滴乳": "乳香",
    "滴乳香": "乳香",
    "苏合": "苏合香",
    "苏合油": "苏合香",
    "白蜜": "炼蜜",
    "蜂蜜": "炼蜜",
    "熟蜜": "炼蜜",
    "白沙蜜": "炼蜜",
    "生蜜": "炼蜜",
    "黄熟": "栈香",
    "黄熟香": "栈香",
    "笺香": "栈香",
    "馢香": "栈香",
    "青桂香": "栈香",
    "生结香": "栈香",
    "生结": "栈香",
    "元参": "玄参",
    "韶脑": "樟脑",
    "云木香": "木香",
    "蕃降真": "降真香",
    "紫藤香": "降真香",
    "金沙降": "降真香",
    "兜娄婆香": "藿香",
    "白梅末": "白梅",
    "白梅肉": "白梅",
    "麸炭末": "麸炭",
}


def load_json(name: str):
    return json.loads((SRC / name).read_text(encoding="utf-8"))


def parse_handmade_materials() -> dict[str, str]:
    mapping: dict[str, str] = {}
    pattern = re.compile(
        r"id:\s*'([^']+)'[\s\S]*?name:\s*'([^']+)'[\s\S]*?aliases:\s*\[([^\]]*)\]",
        re.M,
    )
    for path in HANDMADE_MAT_FILES:
        text = path.read_text(encoding="utf-8")
        for match in pattern.finditer(text):
            mid, name, raw_aliases = match.group(1), match.group(2), match.group(3)
            mapping[name] = mid
            for alias in re.findall(r"'([^']+)'", raw_aliases):
                mapping[alias] = mid
    return mapping


def slug_material(name: str) -> str:
    return "mat_" + re.sub(r"[^\w\u4e00-\u9fff]+", "_", name).strip("_")


def clean_text(text: str) -> str:
    if not text:
        return ""
    text = text.replace("\u00a0", " ").replace("\u3000", " ")
    text = re.sub(r"[·•○]+", " ", text)
    text = re.sub(r"\s+", " ", text)
    return text.strip()


def strip_editorial(text: str) -> str:
    if not text:
        return ""
    cut_at = len(text)
    for marker in ("功效", "适用人群", "主治", "品相方法", "【功效", "[功效"):
        i = text.find(marker)
        if i >= 0:
            cut_at = min(cut_at, i)
    return clean_text(text[:cut_at])


def section(text: str, label: str) -> str:
    if not text:
        return ""
    pattern = rf"\[{label}\]\s*(.*?)(?=\[[^\]]+\]|$)"
    match = re.search(pattern, text, re.S)
    return clean_text(match.group(1)) if match else ""


def map_source(raw: str) -> tuple[str, str]:
    src = raw or "资料待校勘"
    compact = src.replace("《", "").replace("》", "")
    if any(key in src for key in ("香乘", "晦斋", "墨娥", "猎香新谱")):
        return "xiangcheng", compact[:24]
    if "陈氏" in src or "武氏" in src or "沈立" in src or "香谱补遗" in src:
        return "chenshi", compact[:24]
    if "洪" in src or src.startswith("香谱") or "洪氏" in src:
        return "xiangpu", compact[:24]
    return "diben", compact[:24]


def map_use(kind: str, name: str) -> str:
    if any(key in name for key in ("熏衣", "熏御衣")):
        return "fumigate"
    if any(key in name for key in ("衣香", "佩", "香囊")):
        return "wear"
    if "印" in name:
        return "seal"
    if any(key in name for key in ("涂", "傅", "面脂", "香水")):
        return "anoint"
    return TYPE_TO_USE.get(kind or "", "burn")


def grams_of(amount, unit: str):
    if amount is None or not unit:
        return None
    table = {"两": LIANG, "钱": QIAN, "分": FEN, "斤": JIN, "字": ZI, "厘": 0.04}
    factor = table.get(unit)
    if factor is None:
        return None
    value = round(float(amount) * factor, 4)
    if abs(value - round(value)) < 1e-9:
        return int(round(value))
    return float(f"{value:.2f}")


def to_number(value):
    if isinstance(value, (int, float)):
        return float(value)
    return None


def resolve_material(name: str, handmade: dict, corpus_ids: dict) -> str:
    name = (name or "").strip()
    if not name:
        return "mat_unknown"
    for key in (name, SYNONYM.get(name, "")):
        if key and key in handmade:
            return handmade[key]
        if key and key in corpus_ids:
            return corpus_ids[key]
    return corpus_ids.get(name) or handmade.get(name) or slug_material(name)


def build_steps(original, method, usage, editorial):
    drugs = section(original, "药物")
    prep = section(original, "制备")
    how = section(original, "用法")
    steps = []
    if drugs:
        steps.append({"original": drugs[:80], "text": "按上表称取。有本典克数的可称。"})
    if prep:
        text = clean_text(method) or prep
        if editorial:
            text = "底本为自动整理，功效文案已去掉。"
        steps.append({"original": prep[:80], "text": text[:180] or "按原文制备。"})
    if how:
        steps.append({"original": how[:80], "text": how[:160]})
    return steps[:6]




def build_materials(handmade):
    raw = load_json("materials.json")
    occupied = set(handmade.values())
    occupied_names = set(handmade)
    corpus_ids = {}
    items = []
    for mat in raw:
        name = mat["name"]
        aliases = [a for a in (mat.get("aliases") or []) if a and a != name]
        if name in occupied_names:
            corpus_ids[name] = handmade[name]
            for alias in aliases:
                corpus_ids[alias] = handmade[name]
            continue
        mid = mat.get("id") or slug_material(name)
        if mid in occupied:
            mid = slug_material(name)
        occupied.add(mid)
        occupied_names.add(name)
        corpus_ids[name] = mid
        for alias in aliases:
            corpus_ids.setdefault(alias, mid)
        items.append({
            "id": mid,
            "name": name,
            "aliases": aliases[:8],
            "category": CAT_MAP.get(mat.get("category") or "", "herb"),
            "nature": clean_text(mat.get("aromaticSummary") or mat.get("characteristic") or "")[:24] or "—",
            "origin": "谱中名物，产地随方而记",
            "prep": clean_text(mat.get("processingNote") or "")[:80] or "按原方炮制",
            "authenticity": clean_text(mat.get("identitySummary") or "")[:80] or "以方中原称为准",
            "summary": clean_text(mat.get("sourceNote") or "")[:80] or (name + "，入方名物。"),
            "sourceId": "diben",
            "juan": "香材",
        })
    return items, corpus_ids


def build_formula(raw, handmade, corpus_ids):
    flags = raw.get("flags") or []
    editorial = "editorial_efficacy" in flags or raw.get("layer") == "generated"
    original = strip_editorial(raw.get("originalText") or "")
    method = clean_text(raw.get("method") or "")
    if editorial:
        method = re.sub(r"一两约\s*30\s*克", "本典按一两四十克", method)
        method = strip_editorial(method)
    source_id, juan = map_source(raw.get("source") or "")
    use = map_use(raw.get("type") or "", raw.get("name") or "")
    ingredients = []
    for part in raw.get("ingredients") or []:
        name = part.get("name") or ""
        amount = clean_text(str(part.get("originalAmount") or "")) or "—"
        grams = grams_of(to_number(part.get("amount")), part.get("unit") or "")
        note = clean_text(part.get("note") or "")
        if "功效" in note or "适用" in note:
            note = ""
        item = {"materialId": resolve_material(name, handmade, corpus_ids), "amount": amount[:16]}
        if grams is not None:
            item["grams"] = grams
        if note:
            item["note"] = note[:40]
        ingredients.append(item)
    has_scale = any("grams" in p for p in ingredients)
    usage = section(raw.get("originalText") or "", "用法") or strip_editorial(raw.get("note") or "")
    if not usage:
        usage = "按制法成香后焚、佩或用。试样为宜。"
    if not has_scale:
        usage = "只可对照，不可按克做。" + usage
    if "铅粉" in original:
        usage = "原方或裹铅粉，有毒，本典不作。" + usage
    layer = raw.get("layer") or "reviewed"
    summary = {"reviewed": "校勘底本。", "web": "辑录底本。", "generated": "粗编底本，不充原文。"}.get(layer, "")
    summary = (summary + (raw.get("source") or "") + "。白话为自撰整理。").replace("。。", "。")
    if editorial:
        summary = "粗编底本。功效、适用人群已去掉，不当原文。"
    return {
        "id": raw["id"], "name": raw["name"], "aliases": [], "pattern": raw.get("type") or "",
        "use": use, "method": method[:180] or "按原文制备。", "usage": usage[:180],
        "ingredients": ingredients, "sourceId": source_id, "juan": juan,
        "summary": summary[:80], "original": original[:360],
        "steps": build_steps(raw.get("originalText") or "", method, usage, editorial),
        "layer": layer, "editorial": editorial, "compareOnly": not has_scale,
    }


def build_units():
    raw = load_json("unit-profiles.json")
    profiles = []
    for item in raw.get("profiles") or []:
        units = item.get("units") or {}
        profiles.append({
            "id": item["id"], "name": item["name"],
            "liang": units.get("两"), "qian": units.get("钱"),
            "fen": units.get("分"), "jin": units.get("斤"),
            "note": (item.get("note") or "")[:80],
        })
    return {
        "canon": {"id": "xiangdian", "name": "本典尺", "liang": 40, "qian": 4, "fen": 0.4, "jin": 640, "zi": 1,
                  "note": "本典以 1 两 = 40 克折算，便于入手，不充古秤。"},
        "profiles": profiles, "ziXiangjie": 0.4,
    }


def main():
    handmade = parse_handmade_materials()
    materials, corpus_ids = build_materials(handmade)
    for key, val in SYNONYM.items():
        if val in handmade:
            corpus_ids.setdefault(key, handmade[val])
        elif val in corpus_ids:
            corpus_ids.setdefault(key, corpus_ids[val])
    formulas = []
    for fname in ("formulas.reviewed.json", "formulas.web.json", "formulas.generated.json"):
        for item in load_json(fname):
            formulas.append(build_formula(item, handmade, corpus_ids))
    known_ids = set(handmade.values()) | {m["id"] for m in materials}
    stubs = 0
    for formula in formulas:
        for part in formula["ingredients"]:
            mid = part["materialId"]
            if mid not in known_ids:
                name = mid.replace("mat_", "").replace("_", "")
                materials.append({
                    "id": mid, "name": name or mid, "aliases": [], "category": "herb",
                    "nature": "—", "origin": "方中原称", "prep": "按原方",
                    "authenticity": "以方中原称为准", "summary": (name or mid) + "，因入方补条。",
                    "sourceId": "diben", "juan": "香材",
                })
                known_ids.add(mid)
                stubs += 1
    OUT.mkdir(parents=True, exist_ok=True)
    (OUT / "formulas.json").write_text(json.dumps(formulas, ensure_ascii=False, indent=2), encoding="utf-8")
    (OUT / "materials.json").write_text(json.dumps(materials, ensure_ascii=False, indent=2), encoding="utf-8")
    (OUT / "units.json").write_text(json.dumps(build_units(), ensure_ascii=False, indent=2), encoding="utf-8")
    meta = {
        "formulas": len(formulas),
        "reviewed": sum(1 for f in formulas if f["layer"] == "reviewed"),
        "web": sum(1 for f in formulas if f["layer"] == "web"),
        "generated": sum(1 for f in formulas if f["layer"] == "generated"),
        "editorial": sum(1 for f in formulas if f["editorial"]),
        "materials": len(materials),
        "handmadeMaterials": len(set(handmade.values())),
        "withScale": sum(1 for f in formulas if not f["compareOnly"]),
        "stubs": stubs,
    }
    (OUT / "meta.json").write_text(json.dumps(meta, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps(meta, ensure_ascii=False))


if __name__ == "__main__":
    main()
