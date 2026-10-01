import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import {VitePWA} from 'vite-plugin-pwa';
export default defineConfig({
  plugins:[react(),VitePWA({
    registerType:'autoUpdate',
    manifest:{name:'Career Pilot',short_name:'Career Pilot',start_url:'/',display:'standalone',
      background_color:'#f8fafc',theme_color:'#111827',description:'Build your career. Find your opportunity.'},
    workbox:{navigateFallback:'/index.html'}
  })]
});