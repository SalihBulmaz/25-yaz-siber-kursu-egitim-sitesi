# 🐧 Terminal Temelleri - Kali Linux

**Kullanıcı:** kali  
**Şifre:** kali  
**İşletim Sistemi:** Kali Linux

---

## 📋 İçindekiler

1. [Terminal Nedir?](#terminal-nedir)
2. [Temel Kavramlar](#temel-kavramlar)
3. [Temel Komutlar](#temel-komutlar)
4. [Navigasyon](#navigasyon)
5. [Yardım Alma](#yardım-alma)

---

## Terminal Nedir?

Terminal, Linux sistemlerde komut satırı aracılığıyla işlemler yapmanızı sağlayan bir uygulamadır.

### 🚀 Terminal Açma
- **Kali Linux'ta:** `Ctrl + Alt + T` veya Applications → Terminal

---

## Temel Kavramlar

### 🏠 Home Dizini
```bash
# Kullanıcı kali'nin home dizini
/home/kali
```

### 📂 Çalışma Dizini (Current Directory)
```bash
# Şu anda hangi dizinde olduğunuzu gösterir
pwd
```

**Örnek Çıktı:**
```
/home/kali
```

### 🔄 Prompt Yapısı
```bash
kali@kali:~$ 
```
- `kali` → Kullanıcı adı
- `@kali` → Makine adı
- `~` → Home dizinini temsil eder
- `$` → Normal kullanıcı (root olsaydı `#` olurdu)

---

## Temel Komutlar

### 📍 pwd - Çalışma Dizini
```bash
pwd
# Çıktı: /home/kali
```

### 📝 ls - Dosya Listeleme
```bash
# Mevcut dizini listele
ls

# Detaylı listeleme
ls -l

# Gizli dosyalarla birlikte
ls -a

# Detaylı + gizli dosyalar
ls -la

# Boyut bilgisiyle
ls -lh
```

### 🚶‍♂️ cd - Dizin Değiştirme
```bash
# Belirli dizine gitme
cd Documents

# Home dizinine gitme
cd ~
# veya sadece
cd

# Bir önceki dizine gitme
cd ..

# İki seviye yukarı çıkma
cd ../..

# Önceki dizine geri dönme
cd -
```

---

## Navigasyon

### 📁 Klasör Oluşturma
```bash
# Tek klasör oluşturma
mkdir Documents

# Birden fazla klasör oluşturma
mkdir klasor1 klasor2 klasor3

# İç içe klasörler oluşturma
mkdir -p ana_klasor/alt_klasor/derin_klasor
```

### 📄 Dosya Oluşturma
```bash
# Boş dosya oluşturma
touch test.txt

# Birden fazla dosya oluşturma
touch dosya1.txt dosya2.txt dosya3.txt
```

---

## Yardım Alma

### ❓ Komut Yardımı
```bash
# Komut hakkında yardım
man ls
man cd

# Kısa yardım
ls --help
cd --help
```

### 🔍 Komut Arama
```bash
# Komut arama
apropos "dosya listele"
whatis ls
```

---

## 🎯 Pratik Örnekler

### Örnek 1: Temel Navigasyon
```bash
# Home dizinine git
cd ~

# Documents klasörü oluştur
mkdir Documents

# Documents klasörüne git
cd Documents

# Alt klasörler oluştur
mkdir projelerim
mkdir projelerim/python_kodlari

# Python kodları klasörüne git
cd projelerim/python_kodlari

# Mevcut konumu göster
pwd
# Çıktı: /home/kali/Documents/projelerim/python_kodlari
```

### Örnek 2: Dosya İşlemleri
```bash
# Test dosyası oluştur
touch test.py

# Dosyayı listele
ls -la test.py

# Dosyayı sil
rm test.py

# Klasörü sil
rm -r projelerim
```

---

## 📚 Öğrenme İpuçları

1. **Komutları ezberlemeyin** - Yardım sistemini kullanın
2. **Tab tuşunu kullanın** - Otomatik tamamlama için
3. **Geçmiş komutları kullanın** - ↑↓ tuşları ile
4. **Hata mesajlarını okuyun** - Çözüm için ipuçları verir

---

## 🔗 İlgili Konular

- [Dosya Yönetimi](dosya-yonetimi.md)
- [Sistem Komutları](sistem-komutlari.md)
- [Ağ Komutları](ag-komutlari.md)

---

*Bu ders, terminal temellerini öğrenmek için hazırlanmıştır. Pratik yaparak öğrenmeyi unutmayın!* 