import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Fantastic RP — Documentation',
  description: 'Documentation custom Fantastic RP',
  lang: 'fr-FR',
  base: '/Fantastic-docs/',
  cleanUrls: true,
  themeConfig: {
    logo: '/logo.png',
    nav: [
      { text: 'Accueil', link: '/' },
      { text: 'Menus', link: '/menus/' },
      { text: 'Interface', link: '/notifications' },
      { text: 'ox_target', link: '/ox-target' },
      { text: 'Configuration', link: '/configuration' },
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
        text: 'Menus (ox_lib)',
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
        text: 'Interface (ox_lib)',
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
        text: 'ox_target',
        items: [
          { text: 'Options & Submenus', link: '/ox-target' },
        ]
      },
      {
        text: 'Vêtements (ox_inventory)',
        items: [
          { text: 'Système Clothing', link: '/clothing' },
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
      message: 'Documentation Fantastic RP',
    }
  }
})
