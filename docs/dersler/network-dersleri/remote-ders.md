# 🌐 Uzaktan Erişim ve Dosya Paylaşımı Rehberi

## 📚 Bu Bölümde Neler Öğreneceğiz?

- SSH ile ileri seviye işlemler
- VNC ile görsel uzaktan erişim
- SAMBA ile dosya paylaşımı
- Güvenli uzaktan çalışma teknikleri
- Ağ üzerinden kaynak paylaşımı

---

## 🔐 SSH - İleri Seviye Kullanım

### SSH Nedir? (Hatırlatma)
SSH, bir evin akıllı kilidi gibidir. Sadece anahtarı olanlar girebilir, ve içeride ne konuştuğunuzu dışarıdan kimse duyamaz.

### 🚀 SSH Tünelleme (Port Forwarding)

#### Yerel Port Yönlendirme (Local Forward)
Uzaktaki bir servisi sanki kendi bilgisayarınızda çalışıyormuş gibi kullanabilirsiniz.

```bash
# Uzak sunucudaki veritabanına güvenli erişim
ssh -L 3306:localhost:3306 kullanici@uzak.sunucu.com
# Artık localhost:3306'ya bağlanınca uzaktaki MySQL'e bağlanırsınız

# Uzak web arayüzüne erişim
ssh -L 8080:localhost:80 kullanici@uzak.sunucu.com
# http://localhost:8080 ile uzaktaki web sitesine erişin

# Çoklu port yönlendirme
ssh -L 8080:localhost:80 -L 3306:localhost:3306 kullanici@uzak.sunucu.com
```

#### Uzaktan Port Yönlendirme (Remote Forward)
Kendi bilgisayarınızdaki servisi uzaktaki ağdan erişilebilir hale getirin.

```bash
# Kendi web sunucunuzu uzaktan erişilebilir yapın
ssh -R 8080:localhost:80 kullanici@uzak.sunucu.com
# Uzaktaki makinede 8080 portu sizin web sunucunuza bağlanır

# Ters shell için (Güvenlik testlerinde kullanılır)
ssh -R 4444:localhost:4444 kullanici@uzak.sunucu.com
```

#### Dinamik Port Yönlendirme (SOCKS Proxy)
Tüm internet trafiğinizi uzak sunucu üzerinden geçirin.

```bash
# SOCKS proxy oluştur
ssh -D 8080 kullanici@uzak.sunucu.com

# Tarayıcınızı proxy'yi kullanacak şekilde ayarlayın:
# SOCKS5 proxy: localhost:8080
```

### 🔑 SSH Anahtar Yönetimi

#### Güçlü Anahtarlar Oluşturma
```bash
# Ed25519 anahtarı (en güvenli)
ssh-keygen -t ed25519 -C "benim.email@domain.com"

# RSA anahtarı (eski sistemler için)
ssh-keygen -t rsa -b 4096 -C "benim.email@domain.com"

# Passphrase ile korumalı anahtar
ssh-keygen -t ed25519 -f ~/.ssh/ozel_anahtar
```

#### SSH Agent Kullanımı
```bash
# SSH agent'ı başlat
eval $(ssh-agent)

# Anahtarınızı agent'a ekle
ssh-add ~/.ssh/id_ed25519

# Agent'taki anahtarları listele
ssh-add -l

# Belirli bir anahtarı sil
ssh-add -d ~/.ssh/id_ed25519
```

### 📁 SSH ile Dosya İşlemleri

#### SCP (Secure Copy)
```bash
# Tek dosya kopyalama
scp dosya.txt kullanici@sunucu.com:/hedef/klasor/

# Klasör kopyalama
scp -r proje_klasoru/ kullanici@sunucu.com:/hedef/

# Port belirtme
scp -P 2222 dosya.txt kullanici@sunucu.com:/hedef/

# İlerleme gösterimi
scp -v dosya.txt kullanici@sunucu.com:/hedef/
```

#### SFTP (SSH File Transfer Protocol)
```bash
# SFTP oturumu başlat
sftp kullanici@sunucu.com

# SFTP komutları:
# ls          - Uzak klasör listesi
# lls         - Yerel klasör listesi
# cd          - Uzak klasör değiştir
# lcd         - Yerel klasör değiştir
# put dosya   - Dosya yükle
# get dosya   - Dosya indir
# mkdir       - Uzakta klasör oluştur
# rmdir       - Uzakta klasör sil
# exit        - Çıkış
```

### 🏗️ SSH Konfigürasyonu

#### SSH Config Dosyası (~/.ssh/config)
```bash
# Kısayollar oluşturun
Host webserver
    HostName 192.168.1.100
    User admin
    Port 2222
    IdentityFile ~/.ssh/web_anahtari

Host veritabani
    HostName db.firma.com
    User dbadmin
    LocalForward 3306 localhost:3306
    
Host jumpbox
    HostName 10.0.0.1
    User jumper
    ProxyJump webserver

# Artık sadece "ssh webserver" demeniz yeterli!
```

---

## 🖥️ VNC - Görsel Uzaktan Erişim

### VNC Nedir?
VNC, uzaktaki bir bilgisayarı sanki önünüzde oturuyormuş gibi kullanmanızı sağlar. Televizyondaki kanalı değiştiren kumanda gibi düşünün - her şeyi görebilir ve kontrol edebilirsiniz.

### 🎮 VNC Server Kurulumu

#### Ubuntu/Debian'da VNC Server
```bash
# VNC server kur
sudo apt update
sudo apt install tightvncserver

# VNC server'ı başlat (ilk kez şifre sorar)
vncserver :1

# Masaüstü ortamı ayarla
echo "startxfce4 &" > ~/.vnc/xstartup
chmod +x ~/.vnc/xstartup

# Server'ı yeniden başlat
vncserver -kill :1
vncserver :1
```

#### CentOS/RHEL'de VNC Server
```bash
# VNC server kur
sudo yum install tigervnc-server

# Kullanıcı için VNC şifresi belirle
vncpasswd

# VNC service'ini etkinleştir
sudo systemctl enable vncserver@:1.service
sudo systemctl start vncserver@:1.service
```

### 🔗 VNC Client Bağlantısı

#### Linux'ta VNC Client
```bash
# Vino viewer (basit)
sudo apt install vinagre
vinagre 192.168.1.100:5901

# RealVNC viewer (gelişmiş)
sudo snap install vnc-viewer
vnc-viewer 192.168.1.100:5901
```

#### Komut Satırından VNC
```bash
# X11VNC ile mevcut ekranı paylaş
x11vnc -display :0 -auth /var/run/lightdm/root/:0

# SSH tüneli üzerinden güvenli VNC
ssh -L 5901:localhost:5901 kullanici@uzak.sunucu.com
# Sonra yerel VNC viewer ile localhost:5901'e bağlan
```

### 🔐 VNC Güvenliği

#### SSH Tüneli ile Güvenli VNC
```bash
# SSH tüneli oluştur
ssh -L 5901:localhost:5901 kullanici@vnc.sunucu.com

# Yerel VNC client ile bağlan
vncviewer localhost:5901
```

#### VNC over SSH Script'i
```bash
#!/bin/bash
# secure_vnc.sh

if [ $# -ne 2 ]; then
    echo "Kullanım: $0 <sunucu> <kullanici>"
    exit 1
fi

SERVER=$1
USER=$2

echo "🔐 $SERVER'a güvenli VNC bağlantısı kuruluyor..."

# SSH tüneli aç
ssh -L 5901:localhost:5901 -N -f $USER@$SERVER

sleep 2

echo "🖥️  VNC viewer başlatılıyor..."
vncviewer localhost:5901

echo "🔒 Bağlantı sonlandırılıyor..."
pkill -f "ssh -L 5901"
```

---

## 📂 SAMBA - Windows Uyumlu Dosya Paylaşımı

### Samba Nedir?
Samba, farklı işletim sistemlerindeki bilgisayarlar arasında dosya ve yazıcı paylaşımı sağlar. Bir okulun kütüphanesi gibi - herkes kitaplara (dosyalara) erişebilir.

### 🏗️ Samba Server Kurulumu

#### Ubuntu/Debian'da Samba
```bash
# Samba kur
sudo apt update
sudo apt install samba samba-common-bin

# Samba servisini başlat
sudo systemctl start smbd
sudo systemctl enable smbd

# Güvenlik duvarı ayarları
sudo ufw allow samba
```

#### Samba Kullanıcısı Oluşturma
```bash
# Sistem kullanıcısı oluştur
sudo adduser smbuser

# Samba kullanıcısı olarak ekle
sudo smbpasswd -a smbuser

# Kullanıcıyı etkinleştir
sudo smbpasswd -e smbuser
```

### ⚙️ Samba Konfigürasyonu

#### /etc/samba/smb.conf Ayarları
```bash
# Konfigürasyon dosyasını düzenle
sudo nano /etc/samba/smb.conf

# Temel ayarlar ekle:
[global]
    workgroup = WORKGROUP
    server string = Benim Dosya Sunucum
    security = user
    map to guest = bad user

[public]
    comment = Genel Dosyalar
    path = /srv/samba/public
    browseable = yes
    guest ok = yes
    read only = no
    create mask = 0644
    directory mask = 0755

[private]
    comment = Özel Dosyalar
    path = /srv/samba/private
    valid users = smbuser
    guest ok = no
    writable = yes
    browseable = yes
```

#### Paylaşım Klasörleri Oluşturma
```bash
# Klasörleri oluştur
sudo mkdir -p /srv/samba/public
sudo mkdir -p /srv/samba/private

# İzinleri ayarla
sudo chmod 755 /srv/samba/public
sudo chmod 750 /srv/samba/private
sudo chown -R nobody:nogroup /srv/samba/public
sudo chown -R smbuser:smbuser /srv/samba/private

# Konfigürasyonu test et
testparm

# Samba'yı yeniden başlat
sudo systemctl restart smbd
```

### 🔍 Samba Client Kullanımı

#### Linux'ta Samba Paylaşımlarına Erişim
```bash
# SMB paylaşımlarını listele
smbclient -L //192.168.1.100 -U smbuser

# Paylaşıma bağlan
smbclient //192.168.1.100/public -U smbuser

# SMB komutları:
# ls          - Dosyaları listele
# cd          - Klasör değiştir
# get dosya   - Dosya indir
# put dosya   - Dosya yükle
# mkdir       - Klasör oluştur
# exit        - Çıkış
```

#### Samba Paylaşımını Mount Etme
```bash
# Mount noktası oluştur
sudo mkdir /mnt/samba

# Geçici mount
sudo mount -t cifs //192.168.1.100/public /mnt/samba -o username=smbuser

# Kalıcı mount (fstab'a ekle)
echo "//192.168.1.100/public /mnt/samba cifs username=smbuser,password=sifre,uid=1000,gid=1000 0 0" | sudo tee -a /etc/fstab
```

### 🔒 Samba Güvenliği

#### Güvenlik Testleri
```bash
# Anonim erişim testi
smbclient -L //192.168.1.100 -N

# Null session testi
rpcclient -U "" -N 192.168.1.100

# SMB paylaşımlarını tarama (Nmap ile)
nmap --script smb-enum-shares -p 445 192.168.1.100

# SMB güvenlik açıklarını tarama
nmap --script smb-vuln* -p 445 192.168.1.100
```

---

## 🛠️ Pratik Araçlar ve Script'ler

### 🔍 Ağ Keşif Script'i
```bash
#!/bin/bash
# network_discovery.sh

echo "🌐 Ağ Keşif ve Servis Tarayıcısı"
echo "================================"

read -p "Hedef ağ (örn: 192.168.1.0/24): " NETWORK

echo "🔍 $NETWORK ağındaki aktif hostları buluyorum..."
nmap -sn $NETWORK | grep "Nmap scan report" | cut -d " " -f 5 > active_hosts.txt

while read -r host; do
    echo ""
    echo "🎯 $host analiz ediliyor..."
    
    # SSH kontrolü
    if nmap -p 22 $host | grep -q "22/tcp open"; then
        echo "✅ SSH aktif (Port 22)"
    fi
    
    # HTTP/HTTPS kontrolü
    if nmap -p 80,443 $host | grep -q "80/tcp open\|443/tcp open"; then
        echo "🌐 Web sunucu aktif"
    fi
    
    # SMB kontrolü
    if nmap -p 445 $host | grep -q "445/tcp open"; then
        echo "📁 SMB paylaşımı aktif"
        echo "   SMB paylaşımları:"
        nmap --script smb-enum-shares -p 445 $host | grep "|"
    fi
    
    # VNC kontrolü
    if nmap -p 5900-5910 $host | grep -q "tcp open"; then
        echo "🖥️  VNC sunucu aktif"
    fi
    
done < active_hosts.txt

rm active_hosts.txt
```

### 🔐 SSH Bağlantı Yöneticisi
```bash
#!/bin/bash
# ssh_manager.sh

CONFIG_FILE="$HOME/.ssh_connections"

show_menu() {
    echo "🔐 SSH Bağlantı Yöneticisi"
    echo "=========================="
    echo "1. Yeni bağlantı ekle"
    echo "2. Kayıtlı bağlantıları listele"
    echo "3. Bağlantıya ssh yap"
    echo "4. Bağlantı sil"
    echo "5. SSH tüneli oluştur"
    echo "6. Çıkış"
    echo ""
}

add_connection() {
    read -p "Bağlantı adı: " name
    read -p "Sunucu IP/hostname: " host
    read -p "Kullanıcı adı: " user
    read -p "Port (varsayılan 22): " port
    port=${port:-22}
    
    echo "$name|$user@$host|$port" >> $CONFIG_FILE
    echo "✅ Bağlantı kaydedildi!"
}

list_connections() {
    if [ ! -f $CONFIG_FILE ]; then
        echo "❌ Kayıtlı bağlantı bulunamadı!"
        return
    fi
    
    echo "📋 Kayıtlı Bağlantılar:"
    echo "======================"
    cat -n $CONFIG_FILE | while read line; do
        name=$(echo $line | cut -d'|' -f2)
        connection=$(echo $line | cut -d'|' -f3)
        port=$(echo $line | cut -d'|' -f4)
        echo "$name - $connection:$port"
    done
}

connect_ssh() {
    list_connections
    read -p "Bağlanılacak satır numarası: " num
    
    connection_line=$(sed -n "${num}p" $CONFIG_FILE)
    if [ -z "$connection_line" ]; then
        echo "❌ Geçersiz seçim!"
        return
    fi
    
    user_host=$(echo $connection_line | cut -d'|' -f2)
    port=$(echo $connection_line | cut -d'|' -f3)
    
    echo "🔌 Bağlanıyor: $user_host:$port"
    ssh -p $port $user_host
}

create_tunnel() {
    list_connections
    read -p "Tünel oluşturulacak bağlantı satır no: " num
    
    connection_line=$(sed -n "${num}p" $CONFIG_FILE)
    if [ -z "$connection_line" ]; then
        echo "❌ Geçersiz seçim!"
        return
    fi
    
    user_host=$(echo $connection_line | cut -d'|' -f2)
    ssh_port=$(echo $connection_line | cut -d'|' -f3)
    
    read -p "Yerel port: " local_port
    read -p "Uzak port: " remote_port
    
    echo "🌉 SSH tüneli oluşturuluyor..."
    echo "Yerel: localhost:$local_port -> Uzak: $remote_port"
    ssh -L $local_port:localhost:$remote_port -p $ssh_port $user_host
}

while true; do
    show_menu
    read -p "Seçiminiz (1-6): " choice
    
    case $choice in
        1) add_connection ;;
        2) list_connections ;;
        3) connect_ssh ;;
        4) echo "Silme özelliği henüz eklenmedi" ;;
        5) create_tunnel ;;
        6) echo "Güle güle! 👋"; break ;;
        *) echo "❌ Geçersiz seçim!" ;;
    esac
    
    echo ""
    read -p "Devam etmek için Enter'a basın..."
    clear
done
```

### 📁 Samba Paylaşım Yöneticisi
```bash
#!/bin/bash
# samba_manager.sh

SAMBA_CONFIG="/etc/samba/smb.conf"
SHARE_PATH="/srv/samba"

check_root() {
    if [ "$EUID" -ne 0 ]; then
        echo "❌ Bu script root yetkileri gerektirir!"
        echo "Kullanım: sudo $0"
        exit 1
    fi
}

install_samba() {
    echo "📦 Samba yükleniyor..."
    apt update
    apt install -y samba samba-common-bin
    systemctl enable smbd
    systemctl start smbd
    echo "✅ Samba kurulumu tamamlandı!"
}

create_share() {
    read -p "Paylaşım adı: " share_name
    read -p "Paylaşım açıklaması: " description
    read -p "Klasör yolu ($SHARE_PATH/paylaşım_adı): " custom_path
    
    if [ -z "$custom_path" ]; then
        share_path="$SHARE_PATH/$share_name"
    else
        share_path="$custom_path"
    fi
    
    read -p "Genel erişime açık olsun mu? (y/n): " public_access
    
    # Klasör oluştur
    mkdir -p "$share_path"
    
    if [ "$public_access" = "y" ]; then
        chmod 755 "$share_path"
        chown nobody:nogroup "$share_path"
        
        # Konfigürasyon ekle
        cat >> $SAMBA_CONFIG << EOF

[$share_name]
    comment = $description
    path = $share_path
    browseable = yes
    guest ok = yes
    read only = no
    create mask = 0644
    directory mask = 0755
EOF
    else
        read -p "Hangi kullanıcı erişebilsin: " valid_user
        chmod 750 "$share_path"
        chown $valid_user:$valid_user "$share_path"
        
        cat >> $SAMBA_CONFIG << EOF

[$share_name]
    comment = $description
    path = $share_path
    valid users = $valid_user
    guest ok = no
    writable = yes
    browseable = yes
EOF
    fi
    
    # Konfigürasyonu test et ve yeniden başlat
    if testparm -s > /dev/null 2>&1; then
        systemctl restart smbd
        echo "✅ Paylaşım '$share_name' oluşturuldu!"
        echo "📁 Klasör: $share_path"
    else
        echo "❌ Konfigürasyon hatası!"
    fi
}

list_shares() {
    echo "📋 Mevcut Samba Paylaşımları:"
    echo "============================="
    
    grep -E "^\[.*\]$" $SAMBA_CONFIG | grep -v "\[global\]" | while read share; do
        share_name=$(echo $share | tr -d '[]')
        share_path=$(grep -A 10 "^\[$share_name\]" $SAMBA_CONFIG | grep "path" | cut -d'=' -f2 | xargs)
        echo "📂 $share_name -> $share_path"
    done
}

scan_network_shares() {
    echo "🔍 Ağdaki SMB paylaşımları taranıyor..."
    read -p "Ağ aralığı (örn: 192.168.1.0/24): " network
    
    nmap -p 445 --script smb-enum-shares $network
}

show_menu() {
    echo "📁 Samba Paylaşım Yöneticisi"
    echo "=============================="
    echo "1. Samba kur"
    echo "2. Yeni paylaşım oluştur"
    echo "3. Mevcut paylaşımları listele"
    echo "4. Ağdaki paylaşımları tara"
    echo "5. Samba durumunu kontrol et"
    echo "6. Çıkış"
    echo ""
}

check_status() {
    echo "🔍 Samba Durum Kontrolü:"
    echo "========================"
    
    if systemctl is-active --quiet smbd; then
        echo "✅ Samba servisi çalışıyor"
    else
        echo "❌ Samba servisi durmuş"
    fi
    
    echo ""
    echo "📊 Aktif bağlantılar:"
    smbstatus -b 2>/dev/null || echo "Aktif bağlantı yok"
    
    echo ""
    echo "🔗 Paylaşım erişim adresleri:"
    local_ip=$(ip route get 1 | awk '{print $7}' | head -1)
    grep -E "^\[.*\]$" $SAMBA_CONFIG | grep -v "\[global\]" | while read share; do
        share_name=$(echo $share | tr -d '[]')
        echo "  \\\\$local_ip\\$share_name"
    done
}

main() {
    check_root
    
    while true; do
        show_menu
        read -p "Seçiminiz (1-6): " choice
        
        case $choice in
            1) install_samba ;;
            2) create_share ;;
            3) list_shares ;;
            4) scan_network_shares ;;
            5) check_status ;;
            6) echo "Güle güle! 👋"; break ;;
            *) echo "❌ Geçersiz seçim!" ;;
        esac
        
        echo ""
        read -p "Devam etmek için Enter'a basın..."
        clear
    done
}

main
```

---

## 🎮 VNC Yönetim Araçları

### VNC Server Kurulum Script'i
```bash
#!/bin/bash
# vnc_setup.sh

echo "🖥️  VNC Server Kurulum Aracı"
echo "============================"

# VNC server kur
sudo apt update
sudo apt install -y tightvncserver xfce4 xfce4-goodies

echo "🔐 VNC şifresi belirleniyor..."
vncpasswd

# Masaüstü ortamı ayarla
mkdir -p ~/.vnc
cat > ~/.vnc/xstartup << 'EOF'
#!/bin/bash
xrdb $HOME/.Xresources
startxfce4 &
EOF

chmod +x ~/.vnc/xstartup

echo "🚀 VNC server başlatılıyor..."
vncserver :1 -geometry 1024x768 -depth 24

local_ip=$(ip route get 1 | awk '{print $7}' | head -1)
echo "✅ VNC server hazır!"
echo "🔗 Bağlantı adresi: $local_ip:5901"
echo "📱 VNC Viewer ile bağlanabilirsiniz"

# Güvenlik uyarısı
echo ""
echo "⚠️  GÜVENLİK UYARISI:"
echo "VNC trafiği şifrelenmez! SSH tüneli kullanmanız önerilir:"
echo "ssh -L 5901:localhost:5901 $(whoami)@$local_ip"
```

### VNC Client Bağlantı Yöneticisi
```bash
#!/bin/bash
# vnc_client.sh

CONFIG_FILE="$HOME/.vnc_connections"

add_vnc_server() {
    read -p "Server adı: " name
    read -p "Server IP: " host
    read -p "Port (varsayılan 5901): " port
    port=${port:-5901}
    read -p "SSH tüneli kullan? (y/n): " use_ssh
    
    if [ "$use_ssh" = "y" ]; then
        read -p "SSH kullanıcısı: " ssh_user
        echo "$name|$host|$port|ssh|$ssh_user" >> $CONFIG_FILE
    else
        echo "$name|$host|$port|direct|" >> $CONFIG_FILE
    fi
    
    echo "✅ VNC server kaydedildi!"
}

list_vnc_servers() {
    if [ ! -f $CONFIG_FILE ]; then
        echo "❌ Kayıtlı VNC server bulunamadı!"
        return
    fi
    
    echo "📋 Kayıtlı VNC Serverlar:"
    echo "========================="
    cat -n $CONFIG_FILE | while read line; do
        name=$(echo $line | cut -d'|' -f2)
        host=$(echo $line | cut -d'|' -f3)
        port=$(echo $line | cut -d'|' -f4)
        method=$(echo $line | cut -d'|' -f5)
        echo "$name - $host:$port ($method)"
    done
}

connect_vnc() {
    list_vnc_servers
    read -p "Bağlanılacak satır numarası: " num
    
    connection_line=$(sed -n "${num}p" $CONFIG_FILE)
    if [ -z "$connection_line" ]; then
        echo "❌ Geçersiz seçim!"
        return
    fi
    
    name=$(echo $connection_line | cut -d'|' -f1)
    host=$(echo $connection_line | cut -d'|' -f2)
    port=$(echo $connection_line | cut -d'|' -f3)
    method=$(echo $connection_line | cut -d'|' -f4)
    ssh_user=$(echo $connection_line | cut -d'|' -f5)
    
    if [ "$method" = "ssh" ]; then
        echo "🔐 SSH tüneli oluşturuluyor..."
        ssh -L $port:localhost:$port -N -f $ssh_user@$host
        sleep 2
        echo "🖥️  VNC bağlantısı başlatılıyor..."
        vncviewer localhost:$port
        pkill -f "ssh -L $port"
    else
        echo "🖥️  Doğrudan VNC bağlantısı..."
        vncviewer $host:$port
    fi
}

while true; do
    echo "🖥️  VNC Client Yöneticisi"
    echo "========================"
    echo "1. VNC server ekle"
    echo "2. Serverları listele"
    echo "3. VNC'ye bağlan"
    echo "4. Çıkış"
    echo ""
    
    read -p "Seçiminiz (1-4): " choice
    
    case $choice in
        1) add_vnc_server ;;
        2) list_vnc_servers ;;
        3) connect_vnc ;;
        4) echo "Güle güle! 👋"; break ;;
        *) echo "❌ Geçersiz seçim!" ;;
    esac
    
    echo ""
    read -p "Devam etmek için Enter'a basın..."
    clear
done
```

---

## 🏆 Kapsamlı Pratik Projeler

### Proje 1: Ev Ağı İzleme Sistemi
```bash
#!/bin/bash
# home_network_monitor.sh

NETWORK="192.168.1.0/24"
LOG_FILE="$HOME/network_monitor.log"

echo "🏠 Ev Ağı İzleme Sistemi Başlatılıyor..."

while true; do
    echo "$(date): Ağ taraması başlıyor..." >> $LOG_FILE
    
    # Aktif cihazları bul
    active_hosts=$(nmap -sn $NETWORK | grep "Nmap scan report" | wc -l)
    echo "$(date): $active_hosts aktif cihaz bulundu" >> $LOG_FILE
    
    # Yeni cihaz kontrolü
    nmap -sn $NETWORK | grep "Nmap scan report" | cut -d " " -f 5 > /tmp/current_hosts.txt
    
    if [ -f /tmp/previous_hosts.txt ]; then
        # Yeni cihazlar
        new_hosts=$(comm -13 /tmp/previous_hosts.txt /tmp/current_hosts.txt)
        if [ ! -z "$new_hosts" ]; then
            echo "🚨 YENİ CİHAZ TESPİT EDİLDİ: $new_hosts"
            echo "$(date): Yeni cihaz: $new_hosts" >> $LOG_FILE
        fi
        
        # Kaybolmuş cihazlar  
        lost_hosts=$(comm -23 /tmp/previous_hosts.txt /tmp/current_hosts.txt)
        if [ ! -z "$lost_hosts" ]; then
            echo "📴 CİHAZ KAYBOLDU: $lost_hosts"
            echo "$(date): Kayıp cihaz: $lost_hosts" >> $LOG_FILE
        fi
    fi
    
    cp /tmp/current_hosts.txt /tmp/previous_hosts.txt
    
    echo "⏰ 5 dakika bekleniyor..."
    sleep 300
done
```

### Proje 2: Uzaktan Masaüstü Yöneticisi
```bash
#!/bin/bash
# remote_desktop_manager.sh

show_main_menu() {
    echo "🖥️  Uzaktan Masaüstü Yöneticisi"
    echo "================================"
    echo "1. SSH bağlantısı"
    echo "2. VNC bağlantısı"
    echo "3. SSH tüneli ile VNC"
    echo "4. Dosya transferi (SCP/SFTP)"
    echo "5. Port yönlendirme"
    echo "6. Çıkış"
    echo ""
}

ssh_connection() {
    read -p "Sunucu IP: " host
    read -p "Kullanıcı: " user
    read -p "Port (22): " port
    port=${port:-22}
    
    echo "🔐 $user@$host:$port bağlantısı kuruluyor..."
    ssh -p $port $user@$host
}

vnc_connection() {
    read -p "VNC Server IP: " host
    read -p "VNC Port (5901): " port
    port=${port:-5901}
    
    echo "🖥️  VNC bağlantısı: $host:$port"
    
    if command -v vncviewer >/dev/null; then
        vncviewer $host:$port
    else
        echo "❌ VNC viewer bulunamadı! Kurulum:"
        echo "Ubuntu: sudo apt install vinagre"
        echo "veya snap install vnc-viewer"
    fi
}

secure_vnc() {
    read -p "SSH Server IP: " ssh_host
    read -p "SSH Kullanıcı: " ssh_user
    read -p "SSH Port (22): " ssh_port
    ssh_port=${ssh_port:-22}
    read -p "VNC Port (5901): " vnc_port
    vnc_port=${vnc_port:-5901}
    
    echo "🔐 Güvenli VNC bağlantısı kuruluyor..."
    
    # SSH tüneli oluştur
    ssh -L $vnc_port:localhost:$vnc_port -N -f -p $ssh_port $ssh_user@$ssh_host
    
    if [ $? -eq 0 ]; then
        echo "✅ SSH tüneli oluşturuldu"
        sleep 2
        
        echo "🖥️  VNC başlatılıyor..."
        vncviewer localhost:$vnc_port
        
        echo "🔒 SSH tüneli kapatılıyor..."
        pkill -f "ssh -L $vnc_port"
    else
        echo "❌ SSH tüneli oluşturulamadı!"
    fi
}

file_transfer() {
    echo "📁 Dosya Transfer Menüsü"
    echo "========================"
    echo "1. Dosya yükle (SCP)"
    echo "2. Dosya indir (SCP)"
    echo "3. İnteraktif transfer (SFTP)"
    read -p "Seçim: " ft_choice
    
    read -p "Sunucu IP: " host
    read -p "Kullanıcı: " user
    
    case $ft_choice in
        1)
            read -p "Yerel dosya yolu: " local_file
            read -p "Uzak hedef klasör: " remote_path
            scp "$local_file" $user@$host:"$remote_path"
            ;;
        2)
            read -p "Uzak dosya yolu: " remote_file
            read -p "Yerel hedef klasör: " local_path
            scp $user@$host:"$remote_file" "$local_path"
            ;;
        3)
            sftp $user@$host
            ;;
    esac
}

port_forwarding() {
    echo "🌉 Port Yönlendirme"
    echo "==================="
    echo "1. Yerel port yönlendirme (Local Forward)"
    echo "2. Uzak port yönlendirme (Remote Forward)"
    echo "3. SOCKS proxy"
    read -p "Seçim: " pf_choice
    
    read -p "SSH Server IP: " host
    read -p "SSH Kullanıcı: " user
    
    case $pf_choice in
        1)
            read -p "Yerel port: " local_port
            read -p "Uzak port: " remote_port
            echo "🔗 Yerel $local_port -> Uzak $remote_port"
            ssh -L $local_port:localhost:$remote_port $user@$host
            ;;
        2)
            read -p "Uzak port: " remote_port
            read -p "Yerel port: " local_port
            echo "🔗 Uzak $remote_port -> Yerel $local_port"
            ssh -R $remote_port:localhost:$local_port $user@$host
            ;;
        3)
            read -p "SOCKS proxy port: " socks_port
            echo "🌐 SOCKS proxy: localhost:$socks_port"
            echo "Tarayıcı proxy ayarları:"
            echo "SOCKS5: localhost:$socks_port"
            ssh -D $socks_port $user@$host
            ;;
    esac
}

# Ana program döngüsü
while true; do
    show_main_menu
    read -p "Seçiminiz (1-6): " choice
    
    case $choice in
        1) ssh_connection ;;
        2) vnc_connection ;;
        3) secure_vnc ;;
        4) file_transfer ;;
        5) port_forwarding ;;
        6) echo "👋 Güle güle!"; break ;;
        *) echo "❌ Geçersiz seçim!" ;;
    esac
    
    echo ""
    read -p "Ana menüye dönmek için Enter'a basın..."
    clear
done
```

---

## 🎓 Özet ve İpuçları

### 📝 Bu Bölümde Öğrendiklerimiz:

1. **SSH İleri Seviye**: Tünelleme, port yönlendirme, anahtar yönetimi
2. **VNC**: Görsel uzaktan erişim, güvenli bağlantı yöntemleri
3. **SAMBA**: Windows uyumlu dosya paylaşımı, ağ keşfi
4. **Güvenlik**: SSH tünelleme ile güvenli bağlantılar
5. **Otomasyon**: Karmaşık işlemleri basitleştiren script'ler

### 🔒 Güvenlik İpuçları:

- **SSH anahtarları kullanın** - Şifrelerden daha güvenli
- **VNC'yi asla doğrudan internete açmayın** - SSH tüneli kullanın
- **Güçlü şifreler seçin** - Özellikle SAMBA paylaşımları için
- **Gereksiz servisleri kapatın** - Sadece gerekli olanları açık tutun
- **Düzenli güvenlik taraması yapın** - Kendi sistemlerinizi test edin

### 🎯 Pratik Öneriler:

1. **Ev labı kurun** - Sanal makinelerle test ortamı oluşturun
2. **Script'leri kişiselleştirin** - Kendi ihtiyaçlarınıza göre değiştirin
3. **Dokümantasyon tutun** - Hangi ayarları yaptığınızı not edin
4. **Yedek alın** - Konfigürasyon dosyalarını kaydedin

Bir sonraki bölümde güvenlik testleri ve Meterpreter kullanımını öğreneceğiz! 🚀