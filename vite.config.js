import { VitePWA } from 'vite-plugin-pwa'
import { defineConfig } from 'vite'
import { resolve } from 'path'

//const root = resolve(__dirname, '/')
const outDir = resolve(__dirname, 'dist')

export default defineConfig({
  plugins: [ 
      VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/cdnjs\.cloudflare\.com\/ajax\/libs\/font\-awesome\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'fontaw-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ],
        globPatterns: ['**/*.{js,css,html,ico,png,jpg,jpeg,svg,json,vue,txt,woff2}'],
        cleanupOutdatedCaches: true
      },
      includeAssets: ['favicon.ico',],
      manifest: {
        name: 'Srirafim mangment app',
        short_name: 'Srirafim mangment app',
        description: 'My Awesome App description',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/icons/logo-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icons/logo-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  build: {
    outDir,
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        eighth: resolve(__dirname, 'eighth', 'index.html'),
      }
    }
  }
})