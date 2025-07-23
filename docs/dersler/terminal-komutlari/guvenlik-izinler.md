# 🔐 Güvenlik ve İzin Komutları

---

## 📋 İçindekiler

1. [Dosya İzinleri](#dosya-izinleri)
2. [Kullanıcı Yönetimi](#kullanıcı-yönetimi)
3. [Grup Yönetimi](#grup-yönetimi)
4. [Sudo Kullanımı](#sudo-kullanımı)
5. [Güvenlik Kontrolleri](#güvenlik-kontrolleri)

---

## Dosya İzinleri

### 🔐 chmod - Dosya İzinleri

#### 📖 İzin Sistemi
```
rwx rwx rwx
│   │   └── Diğer kullanıcılar (others)
│   └────── Grup (group)  
└────────── Sahip (owner)

r = read (okuma) = 4
w = write (yazma) = 2  
x = execute (çalıştırma) = 1
```

#### 🔢 Sayısal İzinler
```bash
755 = rwxr-xr-x (Sahip: rwx, Grup: r-x, Diğer: r-x)
644 = rw-r--r-- (Sahip: rw-, Grup: r--, Diğer: r--)
600 = rw------- (Sahip: rw-, Grup: ---, Diğer: ---)
777 = rwxrwxrwx (Herkese her şey - TEHLİKELİ!)
```

#### 🔧 Temel Kullanım
```bash
# Sadece sahibi okuyabilir
chmod 600 gizli_dosya.txt

# Herkes okuyabilir, sahip yazabilir
chmod 644 herkes_okusun.txt

# Script dosyasını çalıştırılabilir yap
chmod +x script.py

# Klasör için izin
chmod 755 klasör/

# Sembolik izinler
chmod u+rwx,g+rx,o+r dosya.txt
```

### 👤 chown - Dosya Sahipliği
```bash
# Dosya sahibini değiştir
sudo chown yeni_kullanici dosya.txt

# Sahip ve grubu değiştir
sudo chown kullanici:grup dosya.txt

# Klasör ve içeriğini değiştir
sudo chown -R kullanici:grup klasör/
```

### 👥 chgrp - Grup Değiştirme
```bash
# Dosya grubunu değiştir
sudo chgrp yeni_grup dosya.txt

# Klasör ve içeriğini değiştir
sudo chgrp -R yeni_grup klasör/
```

---

## Kullanıcı Yönetimi

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

# Belirli kullanıcının bilgisi
id kali
```

### 👥 who - Giriş Yapan Kullanıcılar
```bash
# Şu anda giriş yapan kullanıcılar
who

# Son giriş yapan kullanıcılar
last

# Son giriş yapan kullanıcılar (kısa)
last -n 5
```

### 👤 w - Detaylı Kullanıcı Bilgisi
```bash
# Kullanıcı aktiviteleri
w

# Belirli kullanıcı
w kali
```

---

## Grup Yönetimi

### 👥 getent - Grup Bilgileri
```bash
# Tüm grupları listele
getent group

# Belirli grubu ara
getent group sudo

# Kullanıcının gruplarını bul
groups kali
```

### 🔍 newgrp - Geçici Grup Değiştirme
```bash
# Geçici olarak gruba geç
newgrp sudo

# Grup değişikliğini kontrol et
groups
```

---

## Sudo Kullanımı

### 🔐 sudo - Yetkili Komut Çalıştırma
```bash
# Tek komut için sudo
sudo apt update

# Root shell'e geç
sudo -i

# Belirli kullanıcı olarak çalıştır
sudo -u kullanici komut

# Sudo yetkilerini test et
sudo -l
```

### 🔍 sudoers - Sudo Yapılandırması
```bash
# Sudoers dosyasını düzenle
sudo visudo

# Sudoers dosyasını kontrol et
sudo visudo -c

# Belirli kullanıcının yetkilerini gör
sudo -l -U kullanici
```

---

## Güvenlik Kontrolleri

### 🔍 ls -l - İzin Kontrolü
```bash
# Detaylı dosya listesi
ls -l

# Gizli dosyalarla birlikte
ls -la

# İnsanların okuyabileceği format
ls -lh

# Belirli dizinin izinleri
ls -ld /home/kali
```

### 🔐 umask - Varsayılan İzinler
```bash
# Mevcut umask değeri
umask

# Umask değerini değiştir
umask 022

# Yeni dosya için umask
umask 077
```

### 🔍 stat - Dosya Durumu
```bash
# Dosya detayları
stat dosya.txt

# Sadece izinleri göster
stat -c "%a %n" dosya.txt

# İzinleri sembolik formatta
stat -c "%A %n" dosya.txt
```

---

## 🎯 Pratik Örnekler

### Örnek 1: Güvenli Dosya Oluşturma
```bash
# Gizli dosya oluştur
touch gizli_dosya.txt
chmod 600 gizli_dosya.txt

# Herkesi okuyabileceği dosya
touch herkes_okusun.txt
chmod 644 herkes_okusun.txt

# Çalıştırılabilir script
touch test_script.sh
echo '#!/bin/bash\necho "Merhaba!"' > test_script.sh
chmod 755 test_script.sh

# İzinleri kontrol et
ls -l gizli_dosya.txt herkes_okusun.txt test_script.sh
```

### Örnek 2: Kullanıcı ve Grup Analizi
```bash
# Kullanıcı bilgilerini görüntüle
echo "Kullanıcı: $(whoami)"
echo "Kullanıcı ID: $(id -u)"
echo "Grup ID: $(id -g)"
echo "Gruplar: $(groups)"

# Detaylı kimlik bilgisi
id

# Giriş yapan kullanıcılar
who
w
```

### Örnek 3: Güvenlik Kontrolü
```bash
# Kritik dosyaların izinlerini kontrol et
ls -la /etc/passwd /etc/shadow /etc/sudoers

# Kullanıcı home dizinlerinin izinleri
ls -ld /home/*

# Çalıştırılabilir dosyaları bul
find /home/kali -type f -executable

# Sahipsiz dosyaları bul
find /home/kali -nouser -o -nogroup
```

---

## ⚠️ Güvenlik Uyarıları

### 🔴 Tehlikeli İzinler
```bash
# Bu izinler tehlikelidir!
chmod 777 dosya.txt  # Herkese her şey
chmod 666 dosya.txt  # Herkese okuma/yazma
chmod 000 dosya.txt  # Hiç kimse erişemez
```

### 🟡 Dikkat Edilmesi Gerekenler
- `/etc/shadow` dosyasına erişim
- Sistem dosyalarının izinleri
- Kullanıcı home dizinlerinin güvenliği
- Sudo yetkilerinin kontrolü

---

## 🔗 İlgili Konular

- [Terminal Temelleri](terminal-temelleri.md)
- [Dosya Yönetimi](dosya-yonetimi.md)
- [Sistem Komutları](sistem-komutlari.md)

---

*Bu ders, güvenlik ve izin komutlarını öğrenmek için hazırlanmıştır. Güvenlik her zaman önceliğiniz olsun!* 