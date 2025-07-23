# 💻 Sistem Bilgi Komutları

---

## 📋 İçindekiler

1. [Tarih ve Saat](#tarih-ve-saat)
2. [İşlem Yönetimi](#işlem-yönetimi)
3. [Disk Kullanımı](#disk-kullanımı)
4. [Bellek Kullanımı](#bellek-kullanımı)
5. [Sistem Durumu](#sistem-durumu)
6. [Kullanıcı Bilgileri](#kullanıcı-bilgileri)

---

## Tarih ve Saat

### 📅 date - Tarih ve Saat
```bash
# Mevcut tarih ve saat
date

# Özel format
date "+%Y-%m-%d %H:%M:%S"

# Dosyaya kaydetme
date > tarih_bilgisi.txt
```

### ⏰ uptime - Sistem Açık Kalma Süresi
```bash
# Sistem ne kadar süredir açık
uptime

# Örnek çıktı:
# 14:23:45 up 2 days, 4:15, 2 users, load average: 0.15, 0.25, 0.20
```

---

## İşlem Yönetimi

### 🔄 ps - Çalışan İşlemler
```bash
# Mevcut kullanıcının işlemleri
ps

# Tüm işlemler
ps aux

# Belirli işlem arama
ps aux | grep firefox
```

### 🎯 top - Canlı İşlem İzleme
```bash
# Canlı işlem izleme
top

# Sadece belirli sayıda işlem göster
top -n 10

# CPU kullanımına göre sırala
top -o %CPU
```

### 🔪 kill - İşlem Sonlandırma
```bash
# İşlem ID'si ile sonlandır
kill 1234

# Zorla sonlandır
kill -9 1234

# İsme göre sonlandır
pkill firefox
```

---

## Disk Kullanımı

### 💽 df - Disk Kullanımı
```bash
# Disk kullanımı (bayt cinsinden)
df

# İnsanların okuyabileceği format (MB, GB)
df -h

# Belirli dosya sistemini gösterme
df -h /
```

### 📊 du - Dizin Boyutu
```bash
# Mevcut dizinin boyutu
du -sh .

# Alt dizinlerin boyutları
du -sh */

# En büyük 10 dosya/klasör
du -sh * | sort -hr | head -10
```

---

## Bellek Kullanımı

### 🧠 free - Bellek Kullanımı
```bash
# Bellek durumu
free

# İnsanların okuyabileceği format
free -h

# Sürekli güncelleme (3 saniyede bir)
free -h -s 3
```

---

## Sistem Durumu

### 📈 htop - Gelişmiş Sistem İzleme
```bash
# Gelişmiş sistem izleme (kurulu değilse)
sudo apt install htop
htop
```

### 🌡️ sensors - Sıcaklık Bilgileri
```bash
# Sistem sıcaklığı (kurulu değilse)
sudo apt install lm-sensors
sensors
```

### 🔧 lscpu - CPU Bilgileri
```bash
# CPU detayları
lscpu

# Sadece model adı
lscpu | grep "Model name"
```

---

## Kullanıcı Bilgileri

### 👤 whoami - Kullanıcı Bilgisi
```bash
# Mevcut kullanıcı adı
whoami

# Çıktı: kali
```

### 👥 groups - Grup Bilgileri
```bash
# Mevcut kullanıcının grupları
groups

# Belirli kullanıcının grupları
groups kali
```

### 🆔 id - Detaylı Kullanıcı Bilgisi
```bash
# Kullanıcı ve grup ID'leri
id

# Çıktı örneği:
# uid=1000(kali) gid=1000(kali) groups=1000(kali),27(sudo)
```

### 👥 who - Giriş Yapan Kullanıcılar
```bash
# Şu anda giriş yapan kullanıcılar
who

# Son giriş yapan kullanıcılar
last
```

---

## 🎯 Pratik Örnekler

### Örnek 1: Sistem Raporu Oluşturma
```bash
# Sistem raporu klasörü oluştur
mkdir -p ~/sistem_raporlari

# Tarih bilgisini kaydet
date "+%Y-%m-%d %H:%M:%S - Sistem Zamanı" > ~/sistem_raporlari/tarih_bilgisi.txt

# Çalışan işlemleri kaydet
ps aux > ~/sistem_raporlari/islemler.txt

# Disk kullanım bilgilerini kaydet
df -h > ~/sistem_raporlari/disk_bilgisi.txt

# Bellek bilgilerini kaydet
free -h > ~/sistem_raporlari/bellek_bilgisi.txt
```

### Örnek 2: Sistem Performans İzleme
```bash
# CPU kullanımını izle
top -b -n 1 | grep "Cpu(s)"

# Bellek kullanımını izle
free -h | grep "Mem"

# Disk kullanımını izle
df -h / | tail -1
```

### Örnek 3: İşlem Analizi
```bash
# En çok CPU kullanan 5 işlem
ps aux --sort=-%cpu | head -6

# En çok bellek kullanan 5 işlem
ps aux --sort=-%mem | head -6

# Belirli kullanıcının işlemleri
ps aux | grep kali
```

---

## 🔗 İlgili Konular

- [Terminal Temelleri](terminal-temelleri.md)
- [Ağ Komutları](ag-komutlari.md)
- [Metin İşlemleri](metin-islemleri.md)

---

*Bu ders, sistem bilgilerini öğrenmek için hazırlanmıştır. Sistem izleme araçlarını etkin kullanın!* 