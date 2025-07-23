# 📝 Metin İşleme Komutları

---

## 📋 İçindekiler

1. [Dosya İçeriği Görüntüleme](#dosya-içeriği-görüntüleme)
2. [Metin Editörleri](#metin-editörleri)
3. [Metin Arama ve Filtreleme](#metin-arama-ve-filtreleme)
4. [Metin İşleme](#metin-işleme)
5. [Dosya Karşılaştırma](#dosya-karşılaştırma)

---

## Dosya İçeriği Görüntüleme

### 🐱 cat - Dosya İçeriğini Gösterme
```bash
# Dosya içeriğini göster
cat dosya.txt

# Birden fazla dosyayı birleştir
cat dosya1.txt dosya2.txt

# Satır numaralarıyla göster
cat -n dosya.txt

# Dosya oluşturma (Ctrl+D ile bitir)
cat > yeni_dosya.txt
```

### 👁️ head - Dosyanın Başını Gösterme
```bash
# İlk 10 satır (varsayılan)
head dosya.txt

# İlk 5 satır
head -n 5 dosya.txt

# İlk 3 satır
head -3 dosya.txt
```

### 🦘 tail - Dosyanın Sonunu Gösterme
```bash
# Son 10 satır (varsayılan)
tail dosya.txt

# Son 5 satır
tail -n 5 dosya.txt

# Dosyayı sürekli izleme
tail -f log_dosyasi.txt
```

### 🔢 wc - Kelime/Satır Sayma
```bash
# Satır, kelime ve karakter sayısı
wc dosya.txt

# Sadece satır sayısı
wc -l dosya.txt

# Sadece kelime sayısı
wc -w dosya.txt

# Sadece karakter sayısı
wc -c dosya.txt
```

---

## Metin Editörleri

### ✏️ nano - Basit Metin Editörü
```bash
# Yeni dosya oluşturma veya var olanı düzenleme
nano dosya.txt
```

#### ⌨️ Nano Kısayolları
- **Ctrl + O** → Dosyayı kaydet
- **Enter** → Kaydetmeyi onayla
- **Ctrl + X** → Nano'dan çık
- **Ctrl + K** → Satırı kes
- **Ctrl + U** → Kesilen satırı yapıştır
- **Ctrl + W** → Arama yap
- **Ctrl + G** → Yardım menüsü

### 🐑 vim - Gelişmiş Metin Editörü
```bash
# Dosyayı vim ile aç
vim dosya.txt
```

#### 🔧 Vim Temel Komutları
- **i** → Insert moduna geç
- **Esc** → Normal moda geç
- **:w** → Kaydet
- **:q** → Çık
- **:wq** → Kaydet ve çık
- **:q!** → Kaydetmeden çık

---

## Metin Arama ve Filtreleme

### 🔎 grep - Metin Arama
```bash
# Dosyada kelime arama
grep "error" log_dosyasi.txt

# Büyük/küçük harf duyarsız arama
grep -i "error" log_dosyasi.txt

# Satır numaralarıyla göster
grep -n "error" log_dosyasi.txt

# Birden fazla dosyada arama
grep -r "error" /var/log/

# Tersini bulma (error içermeyen satırlar)
grep -v "error" log_dosyasi.txt
```

### 🔍 sed - Stream Editor
```bash
# Satır değiştirme
sed 's/eski/yeni/g' dosya.txt

# Belirli satırları silme
sed '1,5d' dosya.txt

# Satır numarası ekleme
sed '=' dosya.txt | sed 'N;s/\n/ /'

# Dosyayı değiştirme
sed -i 's/eski/yeni/g' dosya.txt
```

### 🔧 awk - Metin İşleme
```bash
# Belirli alanları gösterme
awk '{print $1, $3}' dosya.txt

# Koşullu filtreleme
awk '$3 > 100 {print $0}' dosya.txt

# Toplama işlemi
awk '{sum += $1} END {print sum}' dosya.txt

# Alan ayırıcı değiştirme
awk -F',' '{print $1}' dosya.txt
```

---

## Metin İşleme

### 🔄 tr - Karakter Dönüştürme
```bash
# Küçük harfleri büyük harfe çevir
cat dosya.txt | tr '[:lower:]' '[:upper:]'

# Belirli karakterleri değiştir
echo "merhaba" | tr 'a' 'e'

# Boşlukları tire ile değiştir
echo "merhaba dünya" | tr ' ' '-'
```

### ✂️ cut - Alan Kesme
```bash
# Belirli karakterleri kes
cut -c 1-10 dosya.txt

# Belirli alanları kes
cut -d',' -f1,3 dosya.txt

# Alan ayırıcı olarak boşluk
cut -d' ' -f1,2 dosya.txt
```

### 🔗 paste - Dosya Birleştirme
```bash
# Dosyaları yan yana birleştir
paste dosya1.txt dosya2.txt

# Belirli ayırıcı ile
paste -d',' dosya1.txt dosya2.txt
```

---

## Dosya Karşılaştırma

### 🔍 diff - Dosya Karşılaştırma
```bash
# İki dosyayı karşılaştır
diff dosya1.txt dosya2.txt

# Yan yana karşılaştırma
diff -y dosya1.txt dosya2.txt

# Sadece farklılıkları göster
diff -q dosya1.txt dosya2.txt
```

### 🔄 comm - Ortak Satırları Bulma
```bash
# Ortak satırları göster
comm -12 dosya1.txt dosya2.txt

# Sadece dosya1'de olanlar
comm -23 dosya1.txt dosya2.txt

# Sadece dosya2'de olanlar
comm -13 dosya1.txt dosya2.txt
```

---

## 🎯 Pratik Örnekler

### Örnek 1: Log Dosyası Analizi
```bash
# Son 10 satırı görüntüle
tail -10 /var/log/syslog

# Error mesajlarını bul
grep -i error /var/log/syslog

# Belirli tarihteki mesajlar
grep "2024-01-15" /var/log/syslog

# Mesaj sayısını say
grep -c "error" /var/log/syslog
```

### Örnek 2: Metin İşleme
```bash
# Dosya oluştur
echo "merhaba dünya" > test.txt
echo "python programlama" >> test.txt
echo "linux terminal" >> test.txt

# Büyük harfe çevir
cat test.txt | tr '[:lower:]' '[:upper:]'

# Kelime sayısını bul
wc -w test.txt

# İlk kelimeyi kes
cut -d' ' -f1 test.txt
```

### Örnek 3: Dosya Karşılaştırma
```bash
# İki dosya oluştur
echo "satır1" > dosya1.txt
echo "satır2" >> dosya1.txt
echo "satır3" >> dosya1.txt

echo "satır1" > dosya2.txt
echo "satır2" >> dosya2.txt
echo "satır4" >> dosya2.txt

# Farklılıkları bul
diff dosya1.txt dosya2.txt

# Ortak satırları bul
comm -12 dosya1.txt dosya2.txt
```

---

## 🔗 İlgili Konular

- [Terminal Temelleri](terminal-temelleri.md)
- [Dosya Yönetimi](dosya-yonetimi.md)
- [Python ve Scripting](python-scripting.md)

---

*Bu ders, metin işleme komutlarını öğrenmek için hazırlanmıştır. Metin işleme araçlarını etkin kullanın!* 