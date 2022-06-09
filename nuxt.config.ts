import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@unocss/nuxt'],
  css: [
    'highlight.js/styles/vs2015.css',
  ],
  meta: {
    script: [
      { src: 'https://media.inyaw.com/css/APlayer/APlayer.min.js' },
      { src: 'https://media.inyaw.com/css/lv2d/live2dcubismcore.min.js' },
      { src: 'https://media.inyaw.com/css/lv2d/pixi.min.js' },
      { src: 'https://media.inyaw.com/css/lv2d/live2dv3.min.js' },
    ],
    link: [
      { rel: 'stylesheet', href: 'https://media.inyaw.com/css/APlayer/APlayer.min.css' },
    ],
  },
  unocss: {
    icons: true,
  },
})
