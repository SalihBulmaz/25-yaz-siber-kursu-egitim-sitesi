# 📁 Dosya ve Klasör Yönetimi

---

## 📋 İçindekiler

1. [Dosya İşlemleri](#dosya-işlemleri)
2. [Klasör İşlemleri](#klasör-işlemleri)
3. [Dosya Kopyalama ve Taşıma](#dosya-kopyalama-ve-taşıma)
4. [Dosya Silme](#dosya-silme)
5. [Dosya Arama](#dosya-arama)
6. [Dosya İzinleri](#dosya-izinleri)

---

## Dosya İşlemleri

### 📄 touch - Boş Dosya Oluşturma
```bash
# Tek dosya oluşturma
touch test.txt

# Birden fazla dosya oluşturma
touch dosya1.txt dosya2.txt dosya3.txt

# Python dosyası oluşturma
touch hesap_makinesi.py
```

### 🗂️ cp - Dosya Kopyalama
```bash
# Dosya kopyalama
cp dosya.txt yedek_dosya.txt

# Klasör kopyalama
cp -r klasör/ yeni_klasör/

# Birden fazla dosyayı bir klasöre kopyalama
cp dosya1.txt dosya2.txt hedef_klasör/
```

### 📦 mv - Dosya Taşıma/Yeniden Adlandırma
```bash
# Dosyayı yeniden adlandırma
mv eski_ad.txt yeni_ad.txt

# Dosyayı başka klasöre taşıma
mv dosya.txt Documents/

# Klasörü taşıma
mv eski_klasör/ Documents/yeni_klasör/
```

---

## Klasör İşlemleri

### 📁 mkdir - Klasör Oluşturma
```bash
# Tek klasör oluşturma
mkdir Documents

# Birden fazla klasör oluşturma
mkdir klasor1 klasor2 klasor3

# İç içe klasörler oluşturma
mkdir -p ana_klasor/alt_klasor/derin_klasor
```

### 🗑️ rmdir - Boş Klasör Silme
```bash
# Boş klasör silme
rmdir bos_klasor

# Birden fazla boş klasör silme
rmdir klasor1 klasor2
```

---

## Dosya Silme

### 🗑️ rm - Dosya Silme
```bash
# Dosya silme
rm dosya.txt

# Birden fazla dosya silme
rm dosya1.txt dosya2.txt

# Klasör silme
rm -r klasör/

# Zorla silme (dikkatli olun!)
rm -rf klasör/
```

#### ⚠️ Güvenlik Uyarısı
`rm -rf` komutu çok tehlikelidir! Sistemi bozabilir.

---

## Dosya Arama

### 🔍 find - Dosya Arama
```bash
# İsme göre arama
find /home/kali -name "*.txt"

# Dosya tipine göre arama
find /home/kali -type f -name "test*"

# Boyuta göre arama (1MB'den büyük)
find /home/kali -size +1M

# Son 24 saatte değişenler
find /home/kali -mtime -1

# Boş dosyalar
find /home/kali -empty
```

### 📍 locate - Hızlı Dosya Arama
```bash
# Veritabanını güncelle (root gerekli)
sudo updatedb

# Dosya ara
locate python

# Büyük/küçük harf duyarsız arama
locate -i PYTHON
```

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
```

---

## 📊 Disk Kullanım Analizi

### 📊 du - Disk Kullanım Analizi
```bash
# Mevcut dizinin boyutu
du -sh .

# Alt dizinlerin boyutları
du -sh */

# En büyük 10 dosya/klasör
du -sh * | sort -hr | head -10

# Belirli dizinin analizi
du -sh /home/kali/Documents
```

---

## 🎯 Pratik Örnekler

### Örnek 1: Proje Klasörü Oluşturma
```bash
# Ana proje klasörü oluştur
mkdir -p ~/projelerim/{web_sitesi,python_kodlari,belgeler}

# Alt klasörlere git ve dosya oluştur
cd ~/projelerim/python_kodlari
touch hesap_makinesi.py
touch veri_analizi.py

cd ~/projelerim/web_sitesi
touch index.html
touch style.css

cd ~/projelerim/belgeler
touch README.md
touch notlar.txt
```

### Örnek 2: Dosya Yedekleme
```bash
# Önemli dosyaları yedekle
cp ~/projelerim/python_kodlari/hesap_makinesi.py ~/yedekler/

# Tarihli yedek oluştur
cp dosya.txt dosya_$(date +%Y%m%d).txt

# Klasör yedekleme
cp -r ~/projelerim ~/yedekler/projelerim_$(date +%Y%m%d)
```

### Örnek 3: Dosya Temizleme
```bash
# Geçici dosyaları bul ve sil
find ~/Downloads -name "*.tmp" -delete

# Boş dosyaları bul
find ~/Documents -empty

# Büyük dosyaları bul (100MB'den büyük)
find ~/ -size +100M 2>/dev/null
```

---

## 🔗 İlgili Konular

- [Terminal Temelleri](terminal-temelleri.md)
- [Metin İşlemleri](metin-islemleri.md)
- [Güvenlik ve İzinler](guvenlik-izinler.md)

---

*Bu ders, dosya ve klasör yönetimini öğrenmek için hazırlanmıştır. Güvenli dosya işlemleri için dikkatli olun!* 