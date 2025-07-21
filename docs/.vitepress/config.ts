import { defineConfig } from 'vitepress'

// To auto-generate sidebar, use a plugin or script. For now, add lesson pages manually here.
export default defineConfig({
  themeConfig: {
    sidebar: [
      {
        text: 'Dersler',
        items: [
          { text: 'Ders 6', link: '/ders-6' },
          // Add more lessons here
        ]
      }
    ]
  }
})
