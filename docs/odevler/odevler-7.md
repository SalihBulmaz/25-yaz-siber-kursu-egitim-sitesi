# 🐧 Linux Terminal Komutları - Ek Ödevler

Bu belgede temel Linux komutlarını pekiştirmek için çeşitli ödevler bulunmaktadır.

---

## 📝 **ÖDEV 1: Dosya ve Klasör Yönetimi**

### 🎯 Görevler
1. `Documents` klasöründe `projelerim` adında yeni bir klasör oluşturun
2. Bu klasörün içinde `web_sitesi` ve `python_kodlari` adında iki alt klasör oluşturun
3. `python_kodlari` klasörüne gidin
4. `hesap_makinesi.py` adında bir dosya oluşturun
5. Dosyanın içine basit bir toplama işlemi yapan kod yazın

### 💻 Kullanılacak Komutlar
```bash
mkdir
cd
nano veya touch
ls
pwd
```

### ✅ Beklenen Sonuç
- Düzenli klasör yapısı
- Çalışan Python dosyası

---

## 📝 **ÖDEV 2: Sistem Bilgileri ve Dosya İşlemleri**

### 🎯 Görevler
1. Sisteminizin tarih ve saat bilgisini `tarih_bilgisi.txt` dosyasına kaydedin
2. Sistemde çalışan işlemleri `islemler.txt` dosyasına kaydedin
3. Disk kullanım bilgilerini `disk_bilgisi.txt` dosyasına kaydedin
4. Bu üç dosyayı `sistem_raporlari` klasöründe toplayın
5. Tüm dosyaların içeriğini terminal ekranında gösterin

### 💻 Kullanılacak Komutlar
```bash
date
ps
df -h
mkdir
cat
mv veya cp
```

### ✅ Beklenen Sonuç
- Sistem bilgilerini içeren 3 ayrı dosya
- Düzenli klasör yapısı

---

## 📝 **ÖDEV 3: Ağ ve Bağlantı Testleri**

### 🎯 Görevler
1. Yerel ağ arayüz bilgilerinizi görüntüleyin
2. `8.8.8.8` (Google DNS) adresine 5 ping gönderin
3. `youtube.com` adresine 4 ping gönderin
4. Her iki ping sonucunu ayrı dosyalara kaydedin
5. Sonuçları karşılaştırarak hangisinin daha hızlı olduğunu belirleyin

### 💻 Kullanılacak Komutlar
```bash
ifconfig veya ip addr
ping -c 5
ping -c 4
> veya >>
cat
```

### ✅ Beklenen Sonuç
- Ağ bağlantı testleri
- Ping sonuçlarının kaydedilmesi

---

## 📝 **ÖDEV 4: Metin Dosyası İşlemleri**

### 🎯 Görevler
1. `notlarim.txt` adında bir dosya oluşturun
2. Dosyaya 5 satır metin yazın (her satırda farklı bir konu)
3. Dosyanın ilk 3 satırını görüntüleyin
4. Dosyanın son 2 satırını görüntüleyin
5. Dosyada kaç satır olduğunu sayın
6. Dosyanın içeriğini büyük harflerle görüntüleyin

### 💻 Kullanılacak Komutlar
```bash
nano
head -n 3
tail -n 2
wc -l
tr '[:lower:]' '[:upper:]'
cat
```

### ✅ Beklenen Sonuç
- Metin manipülasyon becerilerinin gelişmesi

---

## 📝 **ÖDEV 5: Dosya Arama ve Filtreleme**

### 🎯 Görevler
1. Home dizininizde `.txt` uzantılı tüm dosyaları bulun
2. Adında `test` geçen dosyaları arayın
3. Son 24 saatte değiştirilmiş dosyaları listeleyin
4. En büyük 5 dosyayı boyutlarıyla birlikte listeleyin
5. Boş klasörleri bulun

### 💻 Kullanılacak Komutlar
```bash
find
locate
du -sh
ls -la
grep
```

### ✅ Beklenen Sonuç
- Dosya arama ve filtreleme becerilerinin gelişmesi

---

## 📝 **ÖDEV 6: Güvenlik ve İzinler**

### 🎯 Görevler
1. `gizli_dosya.txt` adında bir dosya oluşturun
2. Dosyayı sadece sahibinin okuyabileceği şekilde ayarlayın
3. `herkes_okusun.txt` adında başka bir dosya oluşturun
4. Bu dosyayı herkesin okuyabileceği şekilde ayarlayın
5. Her iki dosyanın izin durumlarını kontrol edin
6. Kullanıcı ve grup bilgilerinizi görüntüleyin

### 💻 Kullanılacak Komutlar
```bash
touch
chmod 600
chmod 644
ls -l
whoami
groups
id
```

### ✅ Beklenen Sonuç
- Dosya izinleri konusunda temel bilgi

---

## 📝 **ÖDEV 7: Python Script Otomasyonu**

### 🎯 Görevler
1. `sistem_bilgi.py` adında bir Python scripti oluşturun
2. Script şu bilgileri yazdırsın:
   - Güncel tarih ve saat
   - Kullanıcı adı
   - Çalışma dizini
   - Python versiyonu
3. Scripti çalıştırılabilir yapın
4. Scripti çalıştırın ve çıktıyı `script_sonuc.txt` dosyasına kaydedin

### 📝 Python Kodu Örneği
```python
import os
import datetime
import sys
import getpass

print("=== SİSTEM BİLGİ RAPORU ===")
print(f"Tarih/Saat: {datetime.datetime.now()}")
print(f"Kullanıcı: {getpass.getuser()}")
print(f"Çalışma Dizini: {os.getcwd()}")
print(f"Python Versiyonu: {sys.version}")
```

### 💻 Kullanılacak Komutlar
```bash
nano
chmod +x
python3
./script_adi.py
```

---

## 📝 **ÖDEV 8: Log Dosyası Analizi**

### 🎯 Görevler
1. `/var/log/` dizinini inceleyin (izin varsa)
2. `dmesg` komutuyla sistem mesajlarını görüntüleyin
3. Son 20 sistem mesajını `son_mesajlar.txt` dosyasına kaydedin
4. Bu mesajlarda `error` kelimesi geçen satırları bulun
5. Sonuçları analiz edin

### 💻 Kullanılacak Komutlar
```bash
ls /var/log/
dmesg
tail -n 20
grep -i error
wc -l
```

---

## 🎯 **BONUS ÖDEV: Mini Proje**

### 📋 Proje: Basit Sistem Raporlama Scripti

**Görev:** Sistem hakkında kapsamlı rapor üreten bir bash script yazın

**Script İçermesi Gerekenler:**
- Sistem tarihi ve saati
- Disk kullanım durumu
- Bellek kullanım durumu
- Ağ arayüz bilgileri
- Son 5 giriş yapan kullanıcı
- Sistemin açık kalma süresi

**Bonus Özellikler:**
- Raporun HTML formatında kaydedilmesi
- Renklendirme kullanımı
- Otomatik email gönderimi (isteğe bağlı)

---

## 📚 **Öğrenme Hedefleri**

Bu ödevleri tamamladıktan sonra şunları öğrenmiş olacaksınız:

✅ **Dosya Sistemi Yönetimi**
- Klasör ve dosya oluşturma
- Dosya kopyalama/taşıma
- İzin yönetimi

✅ **Sistem İzleme**
- Sistem bilgilerini alma
- Log dosyalarını okuma
- Performans izleme

✅ **Ağ İşlemleri**
- Bağlantı testleri
- Ağ yapılandırması
- Temel troubleshooting

✅ **Otomasyon**
- Script yazma
- Görev programlama
- Sistem otomasyonu

---

## 🏆 **Tamamlama Kriterleri**

Her ödev için:
- [ ] Tüm komutlar başarıyla çalıştırıldı
- [ ] Çıktılar doğru formatta kaydedildi
- [ ] Dosya/klasör yapısı düzgün oluşturuldu
- [ ] Komutların ne yaptığı anlaşıldı

**İyi çalışmalar! 🚀**