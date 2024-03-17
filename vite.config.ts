import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Layouts from 'vite-plugin-vue-layouts'
import Pages from 'vite-plugin-pages'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import packageJson from './package.json'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default ({ mode }: { mode: string }) => {
  const APP_NAME = JSON.stringify(packageJson.name)
  const APP_VERSION = JSON.stringify(packageJson.version)

  return defineConfig({
    base: process.env.MODE == 'dev' ? '/truth-dare' : '/',
    define: {
      APP_VERSION,
      APP_NAME
    },
    plugins: [
      vue(),
      AutoImport({
        dts: 'src/autoimport.d.ts',
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/, // .vue
          /\.md$/ // .md
        ],
        imports: [
          'vue',
          'vue-router',
          '@vueuse/core',
          'pinia',
          {
            'naive-ui': ['useDialog', 'useMessage', 'useNotification', 'useLoadingBar']
          }
        ],
        eslintrc: { enabled: true },
        resolvers: [NaiveUiResolver()],
        dirs: ['src/models', 'src/middlewares', 'src/plugins']
      }),
      Components({
        dts: 'src/components.d.ts',
        extensions: ['vue', 'md'],
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
        dirs: ['src/components'],
        directoryAsNamespace: true,
        resolvers: [NaiveUiResolver(), IconsResolver()]
      }),
      Icons({
        autoInstall: true,
        compiler: 'vue3'
      }),
      Pages({
        dirs: [{ baseRoute: '', dir: 'src/views' }]
      }),
      Layouts({
        layoutsDirs: 'src/layouts'
      }),
      VitePWA({
        registerType: 'autoUpdate',
        injectRegister: 'auto',
        manifest: {
          screenshots: [],
          name: process.env.VITE_APP_NAME,
          short_name: APP_NAME,
          description: '',
          theme_color: '#ffffff',
          icons: [
            {
              src: 'pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png'
            },
            {
              src: 'pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png'
            }
          ]
        },
        devOptions: {
          enabled: true
        },
        workbox: {
          clientsClaim: true,
          skipWaiting: true
        }
      })
    ],
    resolve: {
      alias: {
        '~': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  })
}
