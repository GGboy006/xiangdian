import path from 'node:path'
import process from 'node:process'
import Uni from '@uni-helper/plugin-uni'
import { isMpWeixin } from '@uni-helper/uni-env'
import UniComponents from '@uni-helper/vite-plugin-uni-components'
// @see https://uni-helper.js.org/vite-plugin-uni-layouts
import UniLayouts from '@uni-helper/vite-plugin-uni-layouts'
// @see https://github.com/uni-helper/vite-plugin-uni-manifest
import UniManifest from '@uni-helper/vite-plugin-uni-manifest'
// @see https://uni-helper.js.org/vite-plugin-uni-pages
import UniPages from '@uni-helper/vite-plugin-uni-pages'
// @see https://github.com/uni-helper/vite-plugin-uni-platform
// 需要与 @uni-helper/vite-plugin-uni-pages 插件一起使用
import UniPlatform from '@uni-helper/vite-plugin-uni-platform'

/**
 * 分包优化、模块异步跨包调用、组件异步跨包引用
 * @see https://github.com/uni-ku/bundle-optimizer
 */
import UniOptimization from '@uni-ku/bundle-optimizer'
// https://github.com/uni-ku/root
import UniKuRoot from '@uni-ku/root'
import dayjs from 'dayjs'
import { visualizer } from 'rollup-plugin-visualizer'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig, loadEnv } from 'vite'
import ViteRestart from 'vite-plugin-restart'
import openDevTools from './scripts/open-dev-tools'
import vitePluginEruda from './scripts/vite-plugin-eruda'
import { createCopyNativeResourcesPlugin } from './vite-plugins/copy-native-resources'
import syncManifestPlugin from './vite-plugins/sync-manifest-plugins'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // mode: 区分生产环境还是开发环境
  console.log('command, mode -> ', command, mode)

  const { UNI_PLATFORM, SKIP_OPEN_DEVTOOLS } = process.env
  console.log('UNI_PLATFORM -> ', UNI_PLATFORM)

  const envDir = path.resolve(process.cwd(), 'env')
  const env = loadEnv(mode, envDir)
  const localEnv = loadEnv(mode, envDir, '')
  const {
    VITE_APP_PORT,
    VITE_SERVER_BASEURL,
    VITE_APP_TITLE,
    VITE_DELETE_CONSOLE,
    VITE_APP_PUBLIC_BASE,
    VITE_APP_PROXY_ENABLE,
    VITE_APP_PROXY_PREFIX,
    VITE_COPY_NATIVE_RES_ENABLE,
  } = env
  const { WECHAT_DEVTOOLS_CLI_PATH } = localEnv
  console.log('环境变量 env -> ', env)

  return defineConfig({
    envDir: './env',
    base: VITE_APP_PUBLIC_BASE,
    plugins: [
      UniLayouts(),
      UniPlatform(),
      UniManifest(),
      UniComponents({
        extensions: ['vue'],
        deep: true,
        directoryAsNamespace: false,
        dts: 'src/types/components.d.ts',
      }),
      UniPages({
        exclude: ['**/components/**/**.*', '**/sections/**/**.*'],
        subPackages: ['src/pages-sub'],
        dts: 'src/types/uni-pages.d.ts',
      }),
      UniOptimization({
        enable: isMpWeixin,
        dts: {
          base: 'src/types',
        },
        logger: false,
      }),
      UniKuRoot({
        excludePages: ['**/components/**/**.*', '**/sections/**/**.*'],
      }),
      Uni(),
      {
        name: 'fix-vite-plugin-vue',
        configResolved(config) {
          const plugin = config.plugins.find(p => p.name === 'vite:vue')
          if (plugin && plugin.api && plugin.api.options) {
            plugin.api.options.devToolsEnabled = false
          }
        },
      },
      UnoCSS(),
      AutoImport({
        imports: ['vue', 'uni-app'],
        dts: 'src/types/auto-import.d.ts',
        dirs: ['src/hooks'],
        vueTemplate: true,
      }),
      ViteRestart({
        restart: ['vite.config.js'],
      }),
      UNI_PLATFORM === 'h5' && {
        name: 'html-transform',
        transformIndexHtml(html) {
          return html
            .replace('%BUILD_TIME%', dayjs().format('YYYY-MM-DD HH:mm:ss'))
            .replace('%VITE_APP_TITLE%', VITE_APP_TITLE)
        },
      },
      UNI_PLATFORM === 'h5'
      && mode === 'production'
      && visualizer({
        filename: './node_modules/.cache/visualizer/stats.html',
        open: true,
        gzipSize: true,
        brotliSize: true,
      }),
      createCopyNativeResourcesPlugin(
        UNI_PLATFORM === 'app' && VITE_COPY_NATIVE_RES_ENABLE === 'true',
        {
          verbose: mode === 'development',
        },
      ),
      syncManifestPlugin(),
      vitePluginEruda({
        open: false,
      }),
      SKIP_OPEN_DEVTOOLS !== 'true' && openDevTools({
        mode,
        wechatDevtoolsCliPath: WECHAT_DEVTOOLS_CLI_PATH,
      }),
    ],
    define: {
      __VITE_APP_PROXY__: JSON.stringify(VITE_APP_PROXY_ENABLE),
    },
    css: {
      postcss: {
        plugins: [],
      },
    },
    resolve: {
      alias: {
        '@': path.join(process.cwd(), './src'),
        '@img': path.join(process.cwd(), './src/static/images'),
      },
    },
    server: {
      host: '0.0.0.0',
      hmr: true,
      port: Number.parseInt(VITE_APP_PORT, 10),
      proxy: JSON.parse(VITE_APP_PROXY_ENABLE)
        ? {
            [VITE_APP_PROXY_PREFIX]: {
              target: VITE_SERVER_BASEURL,
              changeOrigin: true,
              rewrite: path =>
                path.replace(new RegExp(`^${VITE_APP_PROXY_PREFIX}`), ''),
            },
          }
        : undefined,
    },
    esbuild: {
      drop: VITE_DELETE_CONSOLE === 'true' ? ['console', 'debugger'] : [],
    },
    build: {
      sourcemap: false,
      target: 'es6',
      minify: mode === 'development' ? false : 'esbuild',
    },
  })
})
