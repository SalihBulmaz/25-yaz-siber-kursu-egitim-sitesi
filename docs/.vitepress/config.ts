import { defineConfig } from "vitepress";

// To auto-generate sidebar, use a plugin or script. For now, add lesson pages manually here.
export default defineConfig({
  title: "Siber Güvenlik Eğitimi",
  description: "Siber güvenlik dersleri ve ödevleri",
  themeConfig: {
    nav: [
      { text: "Ana Sayfa", link: "/" },
      { text: "Dersler", link: "/dersler/" },
      { text: "Ödevler", link: "/odevler/" },
    ],
    sidebar: [
      {
        text: "📚 Dersler",
        items: [
          { text: "Dersler Ana Sayfa", link: "/dersler/" },
          {
            text: "Terminal Komutları",
            items: [
              {
                text: "Terminal Komutları Ana Sayfa",
                link: "/dersler/terminal-komutlari/",
              },
              {
                text: "Terminal Temelleri",
                link: "/dersler/terminal-komutlari/terminal-temelleri",
              },
              {
                text: "Dosya Yönetimi",
                link: "/dersler/terminal-komutlari/dosya-yonetimi",
              },
              {
                text: "Sistem Komutları",
                link: "/dersler/terminal-komutlari/sistem-komutlari",
              },
              {
                text: "Ağ Komutları",
                link: "/dersler/terminal-komutlari/ag-komutlari",
              },
              {
                text: "Metin İşlemleri",
                link: "/dersler/terminal-komutlari/metin-islemleri",
              },
              {
                text: "Güvenlik İzinleri",
                link: "/dersler/terminal-komutlari/guvenlik-izinler",
              },
            ],
          },
          {
            text: "WiFi Saldırıları",
            items: [
              {
                text: "Ders 7 - WiFi Saldırıları",
                link: "/dersler/wifi-saldirilari/ders-7",
              },
            ],
          },
          {
            text: "Sık kullanılan araçlar",
            items: [
              { text: "Sık kullanılan araçlar", link: "/dersler/tools/tools" },
            ],
          },
          {
            text: "Sızma Testleri",
            items: [
              {
                text: "Metasploitable",
                link: "/dersler/sizma-testleri/sızma_testlerine_giris",
              },
            ],
          },
        ],
      },
      {
        text: "📝 Ödevler",
        items: [
          { text: "Ödevler Ana Sayfa", link: "/odevler/" },
          { text: "Terminal Pratikleri 1", link: "/odevler/odevler-6" },
          { text: "Terminal Pratikleri 2", link: "/odevler/odevler-7" },
          { text: "Python Döngü Ödevleri", link: "/odevler/dongu-odevleri" },
          { text: "GÜNCEL ÖDEV", link: "/odevler/tools-hw" },
          // Add more assignments here
        ],
      },
      {
        text: "📰 Makaleler",
        items: [
          { text: "Etik Hacking", link: "/makaleler/etik-hacking" },
          { text: "Penetrasyon Testi", link: "/makaleler/penetrasyon-testi" },
          { text: "Zafiyet Analizi", link: "/makaleler/zafiyet-analizi" },
          { text: "Güvenlik Açıkları", link: "/makaleler/guvenlik-aciklari" },
          { text: "Ağ Güvenliği", link: "/makaleler/ag-guvenligi" },
          { text: "Wi-Fi Güvenliği", link: "/makaleler/wifi-guvenligi" },
        ],
      },
    ],
    socialLinks: [{ icon: "github", link: "https://github.com/your-repo" }],
    footer: {
      message: "Siber güvenlik eğitimi için hazırlanmıştır.",
      copyright: "Copyright © 2024",
    },
  },
});
