import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'ox_lib — Fantastic RP',
  description: 'Documentation ox_lib custom pour Fantastic RP',
  lang: 'fr-FR',
  base: '/Fantastic-docs/',
  cleanUrls: true,
  themeConfig: {
    logo: '/logo.png',
    nav: [
      { text: 'Accueil', link: '/' },
      { text: 'Menus', link: '/menus/' },
      { text: 'UI', link: '/notifications' },
      { text: 'Vêtements', link: '/clothing' },
      { text: 'Configuration', link: '/configuration' },
      { text: 'ox_target', link: '/ox-target' },
    ],
    sidebar: [
      {
        text: 'Introduction',
        items: [
          { text: 'Accueil', link: '/' },
          { text: 'Configuration', link: '/configuration' },
        ]
      },
      {
        text: 'Menus',
        items: [
          { text: 'Vue d\'ensemble', link: '/menus/' },
          { text: 'List Menu', link: '/menus/list-menu' },
          { text: 'Context Menu', link: '/menus/context-menu' },
          { text: 'Types d\'items', link: '/menus/item-types' },
          { text: 'Callbacks', link: '/menus/callbacks' },
          { text: 'Radial Menu', link: '/radial-menu' },
          { text: 'Style visuel', link: '/menus/style' },
        ]
      },
      {
        text: 'Interface',
        items: [
          { text: 'Notifications', link: '/notifications' },
          { text: 'TextUI', link: '/textui' },
          { text: 'Progress Bar / Circle', link: '/progress' },
          { text: 'Skill Check', link: '/skillcheck' },
          { text: 'Input Dialog', link: '/input-dialog' },
          { text: 'Alert Dialog', link: '/alert-dialog' },
          { text: 'Clipboard', link: '/clipboard' },
        ]
      },
      {
        text: 'Systèmes custom',
        items: [
          { text: 'Vêtements (Clothing)', link: '/clothing' },
          { text: 'ox_target', link: '/ox-target' },
        ]
      },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/overextended/ox_lib' }
    ],
    search: {
      provider: 'local'
    },
    outline: {
      level: [2, 3],
      label: 'Sur cette page'
    },
    docFooter: {
      prev: 'Précédent',
      next: 'Suivant'
    },
    footer: {
      message: 'Documentation ox_lib — Fantastic RP',
    }
  }
})
