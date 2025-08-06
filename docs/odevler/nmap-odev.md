# 🔍 Ağ Keşfi ve Bilgi Toplama - Pratik Ödevler

## 📚 Bu Bölümün Ödevleri (8 Adet)

---

## 📖 OKUMA ÖDEVLERİ

### 📑 Zorunlu Okumalar:
1. **Nmap Official Guide**: https://nmap.org/book/man.html
2. **SSH Security Best Practices**: https://www.ssh.com/academy/ssh/security
3. **Network Reconnaissance Guide**: https://owasp.org/www-community/attacks/Network_Reconnaissance
4. **Port Scanning Techniques**: https://nmap.org/book/man-port-scanning-techniques.html
5. **OSINT Framework**: https://osintframework.com/

### 📰 Ek Makaleler:
- **"The Art of Port Scanning"** - Fyodor (Nmap creator)
- **"SSH Tunneling Explained"** - DigitalOcean Community
- **"Network Security Scanning with Nmap"** - SANS Institute
- **"Telnet vs SSH: Why SSH Won"** - TechTarget

---

## 🎯 ÖDEV 1: Temel Ağ Keşfi
**Süre:** 45 dakika  
**Zorluk:** Başlangıç ⭐

### 📋 Görevler:
1. Kendi ağınızdaki tüm aktif cihazları keşfedin
2. Her cihazın MAC adresini ve üretici bilgisini bulun
3. Ağdaki en yaygın işletim sistemlerini tespit edin
4. Sonuçları raporlayın

### 🔧 Kullanılacak Komutlar:
```bash
# Ana görev komutları (ipucu olarak)
ip route
nmap -sn [ağ_aralığı]
nmap -A [hedef_ip]
```

### 📊 Beklenen Çıktı:
- Aktif cihazların listesi (IP, MAC, İşletim Sistemi)
- En az 3 farklı cihaz türünün tespiti
- Ağ topolojisi hakkında kısa analiz raporu

### ✅ Değerlendirme Kriterleri:
- Doğru nmap parametrelerini kullanma (25%)
- Tüm aktif cihazları bulma (35%)
- Raporun kalitesi ve detayı (40%)

---

## 🎯 ÖDEV 2: Port Tarama Uzmanı
**Süre:** 60 dakika  
**Zorluk:** Orta ⭐⭐

### 📋 Görevler:
1. Hedef sistemi (Metasploitable2 VM) tam port taraması yapın
2. Her açık port için çalışan servisi detaylarıyla tespit edin
3. Banner grabbing ile servis versiyonlarını öğrenin
4. Potansiyel güvenlik açıkları için ilk değerlendirme yapın

### 🔧 Kullanılacak Araçlar:
```bash
# Farklı tarama teknikleri
nmap -sS [hedef]      # SYN Scan
nmap -sU [hedef]      # UDP Scan  
nmap -sV [hedef]      # Version Detection
nmap -O [hedef]       # OS Detection
telnet [ip] [port]    # Banner Grabbing
```

### 📊 Beklenen Çıktı:
- Açık TCP portlarının listesi (tamamı)
- Açık UDP portlarından en az 3 tanesi
- Her servis için version bilgisi
- Güvenlik açığı potansiyeli değerlendirmesi

### ✅ Değerlendirme Kriterleri:
- Kapsamlı port taraması (30%)
- Servis tespiti doğruluğu (25%)
- Banner grabbing başarısı (20%)
- Güvenlik analizi kalitesi (25%)

---

## 🎯 ÖDEV 3: SSH Güvenlik Analizi
**Süre:** 50 dakika  
**Zorluk:** Orta ⭐⭐

### 📋 Görevler:
1. Ağınızda SSH çalışan tüm sistemleri bulun
2. Her SSH servisinin konfigürasyonunu analiz edin
3. Zayıf kimlik doğrulama ayarlarını tespit edin
4. SSH brute force saldırısı simülasyonu yapın (sadece kendi sisteminizde!)

### 🔧 Kullanılacak Araçlar:
```bash
# SSH keşif ve analiz
nmap -p 22 --open [ağ_aralığı]
nmap --script ssh-enum-algos [hedef]
nmap --script ssh-hostkey [hedef]
hydra -l root -P /usr/share/wordlists/rockyou.txt [hedef] ssh
```

### 📊 Beklenen Çıktı:
- SSH çalışan sistemlerin listesi
- Her sistem için SSH konfigürasyon analizi
- Güvenlik zafiyetlerinin raporu
- Brute force saldırı sonuçları

### ✅ Değerlendirme Kriterleri:
- SSH sistemleri tam tespit (25%)
- Konfigürasyon analizi detayı (30%)
- Güvenlik zafiyeti tespiti (25%)
- Brute force test başarısı (20%)

---

## 🎯 ÖDEV 4: Script Ninja Projesi
**Süre:** 90 dakika  
**Zorluk:** İleri ⭐⭐⭐

### 📋 Görevler:
1. Otomatik ağ keşif script'i yazın
2. Script, ağdaki tüm cihazları bulup, portlarını tarasın
3. Sonuçları HTML raporu olarak kaydetsin
4. Cron job ile günlük otomatik çalışacak şekilde ayarlayın

### 🔧 Gereksinimler:
```bash
#!/bin/bash
# Script özellikleri:
# - Ağ aralığını otomatik tespit
# - Paralel tarama (hız için)
# - Renkli çıktı
# - Log kaydetme
# - HTML rapor oluşturma
```

### 📊 Beklenen Çıktı:
- Çalışan bash script dosyası
- HTML rapor örneği
- Cron job konfigürasyonu
- Script kullanım kılavuzu

### ✅ Değerlendirme Kriterleri:
- Script fonksiyonelliği (40%)
- Kod kalitesi ve okunabilirlik (25%)
- HTML rapor tasarımı (20%)
- Cron job kurulumu (15%)

---

## 🎯 ÖDEV 5: Telnet Arkeolojisi
**Süre:** 40 dakika  
**Zorluk:** Başlangıç ⭐

### 📋 Görevler:
1. Ağınızda telnet servisi çalışan sistemleri bulun
2. Her telnet servisine manual bağlantı kurup banner'ını alın
3. HTTP servislerine telnet ile manual request gönderin
4. SMTP servisine telnet ile mail gönderme deneyin

### 🔧 Kullanılacak Komutlar:
```bash
nmap -p 23 [ağ_aralığı]
telnet [ip] 23
telnet [ip] 80
# HTTP request:
GET / HTTP/1.1
Host: [hostname]

telnet [ip] 25
# SMTP commands örneği
```

### 📊 Beklenen Çıktı:
- Telnet servisleri listesi
- Her servis için banner bilgisi
- HTTP manual request sonucu
- SMTP bağlantı denemesi ekran görüntüsü

### ✅ Değerlendirme Kriterleri:
- Telnet servisleri tespiti (30%)
- Manual bağlantı başarısı (25%)
- HTTP request doğruluğu (25%)
- SMTP etkileşimi (20%)

---

## 🎯 ÖDEV 6: Nmap Script Motoru (NSE) Uzmanlığı
**Süre:** 75 dakika  
**Zorluk:** İleri ⭐⭐⭐

### 📋 Görevler:
1. 10 farklı NSE script'i kullanarak hedef sistemi analiz edin
2. Güvenlik açığı tespit script'lerini çalıştırın
3. Servis enumeration script'leri ile detaylı bilgi toplayın
4. Sonuçları kategorilere ayırarak raporlayın

### 🔧 Kullanılacak NSE Scriptleri:
```bash
# Güvenlik açıkları
nmap --script vuln [hedef]
nmap --script smb-vuln* [hedef]

# Enumeration
nmap --script http-enum [hedef]
nmap --script smtp-commands [hedef]
nmap --script ftp-anon [hedef]

# Brute force
nmap --script ssh-brute [hedef]
```

### 📊 Beklenen Çıktı:
- 10 farklı script sonucu
- Tespit edilen güvenlik açıklarının listesi
- Servis bilgileri raporu
- Risk değerlendirmesi

### ✅ Değerlendirme Kriterleri:
- Script çeşitliliği (25%)
- Sonuçların doğru yorumlanması (30%)
- Rapor organizasyonu (25%)
- Risk analizi kalitesi (20%)

---

## 🎯 ÖDEV 7: Session Master Challenge
**Süre:** 55 dakika  
**Zorluk:** Orta ⭐⭐

### 📋 Görevler:
1. Screen kullanarak 4 farklı session başlatın
2. Her session'da farklı bir tarama işi çalıştırın
3. Session'lar arası geçiş yaparak işlemleri kontrol edin
4. Tmux ile aynı işlemi tekrarlayın ve karşılaştırın

### 🔧 Session Görevleri:
```bash
# Session 1: Yavaş port tarama
# Session 2: UDP port tarama  
# Session 3: Güvenlik açığı tarama
# Session 4: HTTP enumeration

# Her session için:
screen -S [session_adı]
tmux new-session -s [session_adı]
```

### 📊 Beklenen Çıktı:
- Screen session'larının ekran görüntüleri
- Tmux session'larının ekran görüntüleri
- Session yönetimi komutlarının listesi
- Screen vs Tmux karşılaştırması

### ✅ Değerlendirme Kriterleri:
- Session oluşturma becerisi (25%)
- Çoklu görev yönetimi (30%)
- Session geçiş ustalığı (25%)
- Karşılaştırma analizi (20%)

---

## 🎯 ÖDEV 8: OSINT ve Reconnaissance Projesi
**Süre:** 100 dakika  
**Zorluk:** İleri ⭐⭐⭐

### 📋 Görevler:
1. Belirlenen hedef domain hakkında OSINT toplayın
2. DNS kayıtlarını analiz edin
3. Subdomain keşfi yapın
4. Email adresi formatlarını tespit edin
5. Sosyal medya varlığını araştırın
6. Teknoloji stack'ini belirleyin

### 🔧 Kullanılacak Araçlar:
```bash
# DNS analizi
dig [domain]
nslookup [domain]
dnsrecon -d [domain]

# Subdomain keşfi
sublist3r -d [domain]
gobuster dns -d [domain] -w /usr/share/wordlists/dirbuster/directory-list-2.3-small.txt

# Teknoloji tespiti
whatweb [domain]
wafw00f [domain]
```

### 📊 Beklenen Çıktı:
- Kapsamlı OSINT raporu
- DNS kayıtlarının analizi
- Bulunan subdomain'lerin listesi
- Email format tahminleri
- Teknoloji stack raporu
- Sosyal medya profilleri

### ✅ Değerlendirme Kriterleri:
- OSINT kapsamı (25%)
- DNS analizi doğruluğu (20%)
- Subdomain keşif başarısı (20%)
- Teknoloji tespiti (20%)
- Rapor kalitesi (15%)

---

## 📊 Genel Değerlendirme Kriterleri

### 🏆 Notlandırma Sistemi:
- **A (90-100)**: Tüm görevler mükemmel, yaratıcı çözümler
- **B (80-89)**: Görevlerin çoğu başarılı, iyi teknik beceri
- **C (70-79)**: Temel görevler tamamlandı, orta seviye
- **D (60-69)**: Bazı eksikler var, temel seviye
- **F (0-59)**: Önemli eksikler, tekrar gerekli

### 📝 Teslim Formatı:
1. **Komut logları**: Kullanılan tüm komutlar
2. **Ekran görüntüleri**: Önemli sonuçların screenshot'ı
3. **Rapor**: Bulgular ve analizler
4. **Script dosyaları**: Yazılan kodlar (varsa)

### ⏰ Teslim Süresi:
Her ödev için belirlenen sürenin 2 katı kadar ek süre (araştırma ve rapor yazma için)

### 🔄 Tekrar Politikası:
- İlk denemede 60'ın altında alan öğrenciler, 1 hafta sonra tekrar hakkı
- Tekrar sınavında sadece tamamlanamayan görevler değerlendirilir

---

## 🎯 Başarı İpuçları

### 💡 Öneriler:
1. **Her komutu deneyin** - Sadece okumak yetmez
2. **Hataları kaydedin** - Hangi komut neden çalışmadı?
3. **Alternatif yollar bulun** - Bir yöntem işe yaramazsa başka deneyin
4. **Dokümantasyon okuyun** - Man pages'ler en iyi arkadaşınız
5. **Lab ortamı kurun** - Güvenli test ortamınız olsun

### ⚠️ Dikkat Edilmesi Gerekenler:
- Sadece kendi lab ortamınızda test yapın
- Başkalarının ağlarına izinsiz tarama yapmayın
- VPN kullanarak kendi güvenliğinizi sağlayın
- Tüm aktiviteleri loglayın

**Bu ödevleri tamamladığınızda gerçek bir ağ keşfi uzmanı olacaksınız!** 🚀