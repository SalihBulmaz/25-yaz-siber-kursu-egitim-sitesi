# 🕵️ Ağ Keşfi ve Bilgi Toplama Rehberi

## 📚 Bu Bölümde Neler Öğreneceğiz?

- Nmap ile ağ tarama (Mahalleyi keşfetmek gibi!)
- Telnet ile bağlantı kurma (Eski telefon görüşmesi gibi)
- SSH ile güvenli bağlantı (Şifreli mektup gibi)
- Script çalıştırma ve argümanlar
- Session yönetimi

---

## 🗺️ NMAP - Ağın Haritasını Çıkarmak

### Nmap Nedir?
Nmap, bir mahalleye yeni taşındığınızda "Bu sokakta kimler yaşıyor, hangi evlerde kimse yok, hangi evlerin kapıları açık?" diye sorular sormanız gibidir. Ağdaki cihazları ve servislerini keşfetmemize yarar.

### 🎯 Temel Nmap Komutları

#### 1. Basit Host Tarama
```bash
# Tek bir IP'yi kontrol et (Kapıyı çalıp "Kimse var mı?" demek gibi)
nmap 192.168.1.1

# IP aralığını tara (Tüm sokağı dolaşmak gibi)
nmap 192.168.1.1-100

# Ağ segmentini tara (Mahalleyi taramak gibi)
nmap 192.168.1.0/24
```

#### 2. Port Tarama
```bash
# En yaygın portları tara (Ana kapıları kontrol et)
nmap -F 192.168.1.1

# Belirli portları tara (Belirli kapıları kontrol et)
nmap -p 22,80,443 192.168.1.1

# Tüm portları tara (Her kapıyı tek tek kontrol et - YAVAŞ!)
nmap -p- 192.168.1.1

# UDP portları tara (Arka bahçe kapılarını kontrol et)
nmap -sU 192.168.1.1
```

#### 3. Servis Tespiti
```bash
# Servisleri tespit et (Kapının arkasında kim var?)
nmap -sV 192.168.1.1

# İşletim sistemi tespit et (Evin sahibi kim?)
nmap -O 192.168.1.1

# Her şeyi birden yap (Dedektiflik modu!)
nmap -A 192.168.1.1
```

### 🔥 İleri Seviye Nmap

#### Tarama Hızı Ayarlama
```bash
# Yavaş tarama (Gizlice yaklaşmak)
nmap -T1 192.168.1.1

# Hızlı tarama (Koşarak geçmek)
nmap -T4 192.168.1.1

# Çok hızlı tarama (Araba ile geçmek - DİKKAT: Fark edilebilir!)
nmap -T5 192.168.1.1
```

#### Script Kullanımı
```bash
# Güvenlik açığı tarama (Evin zayıf noktalarını bul)
nmap --script vuln 192.168.1.1

# HTTP bilgi toplama (Web sitesinin sırlarını öğren)
nmap --script http-enum 192.168.1.1

# SMB paylaşımlarını listele (Komşunun açık klasörlerini gör)
nmap --script smb-enum-shares 192.168.1.1

# Tüm default scriptleri çalıştır
nmap -sC 192.168.1.1
```

### 💡 Pratik Örnekler

#### Örnek 1: Ev Ağını Taramak
```bash
# Önce kendi IP'nizi öğrenin
ip addr show

# Sonra ağınızı tarayın (192.168.1.0/24 yerine kendi ağınızı yazın)
nmap -sn 192.168.1.0/24

# Aktif cihazları bulup, portlarını tarayın
nmap -A 192.168.1.0/24
```

#### Örnek 2: Web Sunucu Analizi
```bash
# Web sunucusu var mı?
nmap -p 80,443 192.168.1.1

# Web sunucusu hakkında bilgi topla
nmap -p 80 --script http-title,http-headers 192.168.1.1
```

---

## 📞 TELNET - Eski Usul Haberleşme

### Telnet Nedir?
Telnet, açık bir telefon hattı gibidir. Her şey şifresiz gönderilir, herkes duyabilir. Günümüzde güvenlik testleri ve eski sistemlerle haberleşmek için kullanılır.

### 🔌 Telnet Kullanımı

#### Temel Bağlantı
```bash
# Bir servise bağlan
telnet 192.168.1.1 23

# Web sunucusuna bağlan (HTTP portu)
telnet google.com 80

# Mail sunucusuna bağlan
telnet gmail-smtp-in.l.google.com 25
```

#### Manuel HTTP İsteği
```bash
# Web sunucusuna bağlan
telnet www.google.com 80

# Bağlandıktan sonra şunu yaz:
GET / HTTP/1.1
Host: www.google.com

# İki kez Enter'a bas, sayfayı göreceksin!
```

### 🎭 Telnet ile Port Test Etme
```bash
# Port açık mı kontrol et
telnet 192.168.1.1 22
# Bağlanırsa port açık, bağlanmazsa kapalı

# SSH servisi çalışıyor mu test et
telnet 192.168.1.1 22
# SSH banner'ını göreceksin: "SSH-2.0-OpenSSH_7.4"
```

---

## 🔐 SSH - Güvenli Bağlantı

### SSH Nedir?
SSH, şifreli bir telefon görüşmesi gibidir. Konuşmanızı kimse dinleyemez. Uzaktaki bilgisayarlara güvenli şekilde bağlanmak için kullanılır.

### 🚀 SSH Kullanımı

#### Temel Bağlantı
```bash
# Kullanıcı adı ile bağlan
ssh kullanici@192.168.1.100

# Farklı port kullan
ssh -p 2222 kullanici@192.168.1.100

# Şifre kullanmadan bağlan (anahtar ile)
ssh -i ~/.ssh/private_key kullanici@192.168.1.100
```

#### Dosya Kopyalama (SCP)
```bash
# Uzak sunucudan dosya indir
scp kullanici@192.168.1.100:/path/dosya.txt ./

# Uzak sunucuya dosya yükle
scp dosya.txt kullanici@192.168.1.100:/path/

# Klasör kopyala (recursive)
scp -r klasor/ kullanici@192.168.1.100:/path/
```

### 🔑 SSH Anahtar Yönetimi

#### Anahtar Çifti Oluşturma
```bash
# RSA anahtarı oluştur
ssh-keygen -t rsa -b 4096

# Ed25519 anahtarı oluştur (daha güvenli)
ssh-keygen -t ed25519

# Anahtarını sunucuya kopyala
ssh-copy-id kullanici@192.168.1.100
```

### 🌐 SSH Tünelleme

#### Port Yönlendirme
```bash
# Yerel port yönlendirme (Uzaktaki servisi kendi bilgisayarında çalışıyormuş gibi kullan)
ssh -L 8080:localhost:80 kullanici@192.168.1.100
# Artık http://localhost:8080 uzaktaki web sunucusunu gösterir

# Uzaktan port yönlendirme (Kendi servisini uzaktaki makinede yayınla)
ssh -R 8080:localhost:80 kullanici@192.168.1.100

# SOCKS proxy oluştur (Tüm trafiğini uzak sunucu üzerinden geçir)
ssh -D 8080 kullanici@192.168.1.100
```

---

## 📜 Script Çalıştırma ve Argümanlar

### Bash Script Temelleri

#### Script Oluşturma
```bash
# Script dosyası oluştur
nano myscript.sh

# Shebang ile başla (Hangi yorumlayıcı kullanılacağını söyler)
#!/bin/bash

echo "Merhaba Dünya!"
```

#### Script'i Çalıştırılabilir Yapma
```bash
# Çalıştırma izni ver
chmod +x myscript.sh

# Script'i çalıştır
./myscript.sh
```

### 🎯 Argümanlar Kullanma

#### Temel Argümanlar
```bash
#!/bin/bash
echo "Script adı: $0"
echo "İlk argüman: $1"
echo "İkinci argüman: $2"
echo "Tüm argümanlar: $@"
echo "Argüman sayısı: $#"
```

#### Pratik Tarama Script'i
```bash
#!/bin/bash
# tarama.sh

if [ $# -eq 0 ]; then
    echo "Kullanım: $0 <IP_adresi>"
    exit 1
fi

IP=$1
echo "🔍 $IP adresini tarıyorum..."

echo "📍 Ping testi:"
ping -c 3 $IP

echo "🔍 Port tarama:"
nmap -F $IP

echo "🖥️  İşletim sistemi tespiti:"
nmap -O $IP
```

### 🔄 Döngüler ve Koşullar

#### IP Aralığı Tarama
```bash
#!/bin/bash
# ağ_tarama.sh

NETWORK="192.168.1"

for i in {1..254}; do
    IP="$NETWORK.$i"
    if ping -c 1 -W 1 $IP &> /dev/null; then
        echo "✅ $IP aktif"
        nmap -F $IP
    fi
done
```

---

## 🎮 Session Yönetimi

### Screen Kullanımı
```bash
# Yeni session başlat
screen -S tarama_session

# Session'dan çık (arka planda çalışmaya devam eder)
# Ctrl+A ardından D

# Session'ları listele
screen -ls

# Session'a geri dön
screen -r tarama_session

# Session'ı sonlandır
screen -S tarama_session -X quit
```

### Tmux Kullanımı
```bash
# Yeni session başlat
tmux new-session -s hack_session

# Session'dan çık
# Ctrl+B ardından D

# Session'ları listele
tmux list-sessions

# Session'a geri dön
tmux attach-session -t hack_session

# Session'ı sonlandır
tmux kill-session -t hack_session
```

---

## 🏆 Pratik Projeler

### Proje 1: Ağ Keşif Aracı
Kendi ağınızı tarayacak bir script yazın:
```bash
#!/bin/bash
echo "🏠 Ev Ağı Tarayıcısı"
echo "==================="

# Kendi IP'nizi bulun
MY_IP=$(ip route get 1 | awk '{print $7}' | head -1)
NETWORK=$(echo $MY_IP | cut -d. -f1-3)

echo "📍 IP'niz: $MY_IP"
echo "🌐 Ağınız: $NETWORK.0/24"
echo ""

echo "🔍 Aktif cihazları buluyorum..."
nmap -sn $NETWORK.0/24 | grep -E "Nmap scan report|MAC Address"
```

### Proje 2: Servis Keşif Aracı
```bash
#!/bin/bash
echo "🔍 Servis Keşif Aracı"
read -p "Hedef IP: " TARGET

echo "🎯 $TARGET adresindeki servisleri tarıyorum..."

# Ana portları tara
echo "📋 Açık portlar:"
nmap -F $TARGET

echo ""
echo "🔍 Detaylı servis bilgileri:"
nmap -sV $TARGET

echo ""
echo "📜 Script taraması:"
nmap -sC $TARGET
```

### Proje 3: SSH Bağlantı Yöneticisi
```bash
#!/bin/bash
echo "🔐 SSH Bağlantı Yöneticisi"

read -p "Sunucu IP: " SERVER
read -p "Kullanıcı adı: " USER
read -p "Port (varsayılan 22): " PORT
PORT=${PORT:-22}

echo "🔌 $USER@$SERVER:$PORT adresine bağlanıyor..."

# SSH bağlantısını test et
if ssh -o ConnectTimeout=5 -p $PORT $USER@$SERVER "echo 'Bağlantı başarılı!'" 2>/dev/null; then
    echo "✅ Bağlantı başarılı!"
    ssh -p $PORT $USER@$SERVER
else
    echo "❌ Bağlantı başarısız!"
    echo "🔍 Port durumunu kontrol ediyorum..."
    nmap -p $PORT $SERVER
fi
```

---

## 🎓 Özet ve Önemli Noktalar

### 📝 Öğrendiklerimiz:
1. **Nmap**: Ağları ve servisleri keşfetmek için en önemli araç
2. **Telnet**: Güvensiz ama hızlı test aracı
3. **SSH**: Güvenli uzaktan erişim ve dosya transferi
4. **Script**: Tekrarlanan işleri otomatikleştirme
5. **Session**: Uzun süren işleri arka planda çalıştırma

### ⚠️ Etik Hatırlatmalar:
- Bu araçları sadece kendi ağınızda veya izniniz olan sistemlerde kullanın
- Başkalarının sistemlerini izinsiz taramak yasadışıdır
- Öğrenme amaçlı test laboratorları kurun
- Her zaman yasal sınırlar içinde kalın

### 🔄 Pratik Yapın:
1. Kendi ev ağınızı tarayın
2. Farklı nmap parametrelerini deneyin
3. SSH anahtarları oluşturun ve kullanın
4. Basit scriptler yazıp geliştirin

Bir sonraki bölümde uzaktan erişim ve dosya paylaşımı konularını işleyeceğiz! 🚀