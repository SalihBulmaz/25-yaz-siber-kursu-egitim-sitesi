# 🇵🇸 Filistin Temalı Terminal Rehberi

Bu rehber, temel terminal komutlarını öğrenirken aynı zamanda Filistin'e destek mesajı veren bir pratik kılavuzdur.

---

## 📂 1. Yeni Klasör Oluşturma ve Gezinme

### 🎯 Hedef
Filistin adında bir klasör oluşturmak ve içine girmek

### ⚡ Komutlar
```bash
# 1. Adım: Palestine klasörünü oluştur
mkdir Palestine

# 2. Adım: Oluşturulan klasöre gir
cd Palestine
```

### ℹ️ Açıklama
- `mkdir` → **Make Directory** (Dizin Oluştur)
- `cd` → **Change Directory** (Dizin Değiştir)

---

## ✍️ 2. Python Dosyası Oluşturma ve Kod Yazma

### 🎯 Hedef
Özgür Filistin mesajı yazdıran bir Python dosyası oluşturmak

### ⚡ Komutlar
```bash
# Nano editör ile gazze.py dosyasını oluştur ve aç
nano gazze.py
```

### 📝 Yazılacak Kod
```python
print("Özgür Filistin için!")
```

### 💾 Kaydetme
- **Ctrl + O** → Dosyayı kaydet
- **Enter** → Onay
- **Ctrl + X** → Nano'dan çık

---

## 📁 3. Python Dosyasını Çalıştırma

### 🎯 Hedef
Oluşturulan Python dosyasını terminal üzerinden çalıştırmak

### ⚡ Komut
```bash
# Python dosyasını çalıştır
python3 gazze.py
```

### 🖥️ Beklenen Çıktı
```
Özgür Filistin için!
```

### ⚠️ Not
Dosya adının **gazze.py** olduğundan emin olun!

---

## 🔐 4. IP Adresi Öğrenme

### 🎯 Hedef
Sistemin ağ yapılandırmasını ve IP adresini öğrenmek

### ⚡ Komut
```bash
# Ağ arayüzlerini listele
ifconfig
```

### 📋 Çıktıyı Kaydetme
```bash
# Çıktıyı txt dosyasına kaydet
ifconfig > /home/kali/Documents/ip_bilgileri.txt
```

### 🔍 Dikkat Edilecek Noktalar
- **inet** → IPv4 adresi
- **inet6** → IPv6 adresi
- **lo** → Loopback arayüzü (127.0.0.1)
- **eth0/wlan0** → Ethernet/WiFi arayüzü

---

## 🌐 5. Google'a Ping Atma ve Analiz

### 🎯 Hedef
Google sunucularıyla bağlantıyı test etmek ve ağ gecikmesini ölçmek

### ⚡ Komut
```bash
# Google'a 3 paket ping gönder
ping -c 3 google.com
```

### 🤔 `-c 3` Parametresi Neden Kullanılır?

#### 📖 Açıklama
- **`-c`** → **Count** (Sayım) parametresi
- **`3`** → Gönderilecek ping paket sayısı

#### 🎯 Faydaları
1. **Sınırlı Test** → Sonsuz ping'i önler
2. **Hızlı Sonuç** → 3 paket yeterli bilgi verir
3. **Kaynak Tasarrufu** → Gereksiz ağ trafiği yaratmaz
4. **Otomatik Durma** → Manuel müdahale gerektirmez

#### 📊 Örnek Çıktı
```
PING google.com (172.217.16.142) 56(84) bytes of data.
64 bytes from google.com (172.217.16.142): icmp_seq=1 ttl=118 time=12.3 ms
64 bytes from google.com (172.217.16.142): icmp_seq=2 ttl=118 time=11.8 ms
64 bytes from google.com (172.217.16.142): icmp_seq=3 ttl=118 time=12.1 ms

--- google.com ping statistics ---
3 packets transmitted, 3 received, 0% packet loss
round-trip min/avg/max/mdev = 11.8/12.1/12.3/0.2 ms
```

### 📈 Ping Sonuçları Analizi
- **time** → Yanıt süresi (ms)
- **ttl** → Time To Live (Paket yaşam süresi)
- **packet loss** → Paket kaybı oranı
- **avg** → Ortalama yanıt süresi

---

## 🎉 Tebrikler!

Bu rehberi tamamlayarak şunları öğrendin:
- ✅ Klasör oluşturma ve gezinme
- ✅ Dosya oluşturma ve düzenleme
- ✅ Python kodunu çalıştırma
- ✅ Sistem bilgilerini öğrenme
- ✅ Ağ bağlantısını test etme

### 🇵🇸 "Özgür Filistin için!" 
*Her kod satırında adalet için umut vardır.*