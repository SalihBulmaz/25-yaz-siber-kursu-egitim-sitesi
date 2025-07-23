# 🌐 Ağ Komutları

---

## 📋 İçindekiler

1. [Bağlantı Testi](#bağlantı-testi)
2. [Ağ Arayüz Bilgileri](#ağ-arayüz-bilgileri)
3. [Dosya İndirme](#dosya-indirme)
4. [Ağ Bağlantıları](#ağ-bağlantıları)
5. [DNS İşlemleri](#dns-işlemleri)
6. [Port Tarama](#port-tarama)

---

## Bağlantı Testi

### 🌐 ping - Bağlantı Testi
```bash
# Sürekli ping (Ctrl+C ile durdur)
ping google.com

# Belirli sayıda ping
ping -c 5 google.com

# Zaman aşımı belirtme
ping -c 3 -W 2 google.com

# IPv6 ping
ping6 ipv6.google.com
```

### 🔌 telnet - Port Bağlantı Testi
```bash
# HTTP port testi
telnet google.com 80

# SSH port testi
telnet localhost 22

# SMTP port testi
telnet gmail.com 25
```

---

## Ağ Arayüz Bilgileri

### 🔌 ifconfig - Ağ Arayüz Bilgileri
```bash
# Tüm ağ arayüzleri
ifconfig

# Belirli arayüz
ifconfig eth0

# Sadece aktif arayüzler
ifconfig -s
```

### 🌐 ip - Modern Ağ Komutları
```bash
# Tüm arayüzleri göster
ip addr show

# Belirli arayüzü göster
ip addr show eth0

# Arayüz durumunu değiştir
sudo ip link set eth0 up
sudo ip link set eth0 down
```

### 🔍 Çıktı Analizi
```bash
eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 192.168.1.100  netmask 255.255.255.0  broadcast 192.168.1.255
        inet6 fe80::a00:27ff:fe4e:66a1  prefixlen 64  scopeid 0x20<link>
        ether 08:00:27:4e:66:a1  txqueuelen 1000  (Ethernet)
```

- `inet` → IPv4 adresi
- `netmask` → Alt ağ maskesi
- `ether` → MAC adresi

---

## Dosya İndirme

### 🌍 wget - Dosya İndirme
```bash
# Dosya indirme
wget https://example.com/dosya.txt

# Farklı isimle kaydetme
wget -O yeni_ad.txt https://example.com/dosya.txt

# Sessiz indirme
wget -q https://example.com/dosya.txt

# Arka planda indirme
wget -b https://example.com/buyuk_dosya.zip
```

### 📥 curl - Çok Amaçlı İndirme
```bash
# Dosya indirme
curl -O https://example.com/dosya.txt

# İçeriği göster
curl https://example.com

# Header bilgileri
curl -I https://example.com

# POST isteği
curl -X POST -d "data=test" https://example.com/api
```

---

## Ağ Bağlantıları

### 🔗 netstat - Ağ Bağlantıları
```bash
# Tüm bağlantıları göster
netstat -tuln

# Aktif bağlantılar
netstat -tuln | grep ESTABLISHED

# Belirli portu dinle
netstat -tuln | grep :80
```

### 🌐 ss - Modern Socket İstatistikleri
```bash
# Tüm soketleri göster
ss -tuln

# Aktif bağlantılar
ss -tuln | grep ESTAB

# Belirli portu dinle
ss -tuln | grep :22
```

---

## DNS İşlemleri

### 🔍 nslookup - DNS Sorgulama
```bash
# Domain IP adresi
nslookup google.com

# Ters DNS sorgusu
nslookup 8.8.8.8

# Belirli DNS sunucusu kullan
nslookup google.com 8.8.8.8
```

### 🌐 dig - Detaylı DNS Sorgulama
```bash
# A kaydı sorgulama
dig google.com

# MX kaydı sorgulama
dig MX google.com

# NS kaydı sorgulama
dig NS google.com

# Kısa çıktı
dig +short google.com
```

### 🔄 host - Basit DNS Sorgulama
```bash
# IP adresi bul
host google.com

# Ters DNS
host 8.8.8.8

# Belirli kayıt türü
host -t MX google.com
```

---

## Port Tarama

### 🔍 nmap - Port Tarama
```bash
# Basit port tarama
nmap localhost

# Belirli port aralığı
nmap -p 1-100 localhost

# Hızlı tarama
nmap -F localhost

# Detaylı tarama
nmap -sS -sV localhost
```

### 🔌 nc (netcat) - Port Testi
```bash
# Port dinleme
nc -l 8080

# Port bağlantı testi
nc -zv localhost 22

# Dosya transferi
nc -l 8080 > alinan_dosya.txt
nc localhost 8080 < gonderilecek_dosya.txt
```

---

## 🎯 Pratik Örnekler

### Örnek 1: Ağ Durumu Kontrolü
```bash
# Ağ arayüzlerini kontrol et
ifconfig

# İnternet bağlantısını test et
ping -c 3 8.8.8.8

# DNS çalışıyor mu kontrol et
nslookup google.com

# Varsayılan ağ geçidini bul
ip route | grep default
```

### Örnek 2: Web Sunucu Testi
```bash
# Web sunucusu çalışıyor mu
curl -I http://localhost

# Port 80 açık mı
netstat -tuln | grep :80

# HTTP bağlantısı test et
telnet localhost 80
```

### Örnek 3: Ağ Performans Testi
```bash
# Ping testi
ping -c 10 google.com

# Download hızı testi
wget -O /dev/null http://speedtest.ftp.otenet.gr/files/test100k.db

# Ağ trafiği izleme
iftop
```

---

## 🔗 İlgili Konular

- [Terminal Temelleri](terminal-temelleri.md)
- [Sistem Komutları](sistem-komutlari.md)
- [Güvenlik ve İzinler](guvenlik-izinler.md)

---

*Bu ders, ağ komutlarını öğrenmek için hazırlanmıştır. Ağ güvenliği için dikkatli olun!* 