import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['leaf.svg', 'leaf-180.png', 'masked-icon.svg'],
      manifest: {
        name: 'Leafify Image Detector',
        short_name: 'Leafify',
        description: 'My Awesome App description',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'leaf-196.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'leaf-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
})
