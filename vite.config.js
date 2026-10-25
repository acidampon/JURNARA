import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import {VitePWA} from 'vite-plugin-pwa';

const isGitHubPages = process.env.GITHUB_PAGES === 'true';
const base = isGitHubPages ? '/JURNARA/' : '/';

export default defineConfig({
  base,
  plugins:[react(),VitePWA({
    registerType:'autoUpdate',
    manifest:{
      name:'JURNARA',
      short_name:'JURNARA',
      start_url:base,
      scope:base,
      display:'standalone',
      background_color:'#f8fafc',
      theme_color:'#111827',
      description:'Build your career. Find your opportunity.'
    },
    workbox:{
      globPatterns:['**/*.{js,css,html,ico,png,svg,webmanifest,json}'],
      navigateFallback:`${base}index.html`
    }
  })]
});
