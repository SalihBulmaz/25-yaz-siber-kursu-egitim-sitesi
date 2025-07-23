import { defineConfig } from 'vitepress'

// To auto-generate sidebar, use a plugin or script. For now, add lesson pages manually here.
export default defineConfig({
  title: 'Siber Güvenlik Eğitimi',
  description: 'Siber güvenlik dersleri ve ödevleri',
  themeConfig: {
    nav: [
      { text: 'Ana Sayfa', link: '/' },
      { text: 'Dersler', link: '/dersler/' },
      { text: 'Ödevler', link: '/odevler/' }
    ],
    sidebar: [
      {
        text: '📚 Dersler',
        items: [
          { text: 'Dersler Ana Sayfa', link: '/dersler/' },
          { text: 'Ders 6 - Terminal Temelleri', link: '/dersler/ders-6' },
          // Add more lessons here
        ]
      },
      {
        text: '📝 Ödevler',
        items: [
          { text: 'Ödevler Ana Sayfa', link: '/odevler/' },
          { text: 'Ödev 6 - Terminal Pratikleri', link: '/odevler/odevler-6' },
          // Add more assignments here
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/your-repo' }
    ],
    footer: {
      message: 'Siber güvenlik eğitimi için hazırlanmıştır.',
      copyright: 'Copyright © 2024'
    }
  }
})
