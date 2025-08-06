# 🌐 Uzaktan Erişim ve Dosya Paylaşımı - Pratik Ödevler

## 📚 Bu Bölümün Ödevleri (8 Adet)

---

## 📖 OKUMA ÖDEVLERİ

### 📑 Zorunlu Okumalar:
1. **SSH Port Forwarding Guide**: https://www.ssh.com/academy/ssh/tunneling/example
2. **VNC Security Best Practices**: https://www.realvnc.com/en/connect/docs/security.html
3. **Samba Configuration Guide**: https://wiki.samba.org/index.php/Setting_up_Samba_as_a_Standalone_Server
4. **SSH Key Management**: https://www.ssh.com/academy/ssh/keygen
5. **Network File System Security**: https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/7/html/storage_administration_guide/ch-nfs

### 📰 Ek Makaleler:
- **"SSH Tunneling: Examples, Command, Server Config"** - SSH.com
- **"SAMBA Security Guide"** - Ubuntu Documentation
- **"VNC vs RDP vs SSH: Remote Access Compared"** - TechTarget
- **"Linux File Sharing with Samba"** - DigitalOcean
- **"Advanced SSH Techniques"** - Red Hat Enterprise Linux Documentation

---

## 🎯 ÖDEV 1: SSH Anahtar Yönetimi Uzmanı
**Süre:** 60 dakika  
**Zorluk:** Başlangıç ⭐

### 📋 Görevler:
1. 3 farklı türde SSH key çifti oluşturun (RSA, Ed25519, ECDSA)
2. Her anahtarı farklı passphrase ile koruyun
3. SSH agent kullanarak anahtarları yönetin
4. Uzak sisteme passwordless SSH bağlantısı kurun

### 🔧 Kullanılacak Komutlar:
```bash
# Anahtar oluşturma
ssh-keygen -t rsa -b 4096
ssh-keygen -t ed25519
ssh-keygen -t ecdsa

# Agent yönetimi
eval $(ssh-agent)
ssh-add [key_path]
ssh-copy-id user@host
```

### 📊 Beklenen Çıktı:
- 3 farklı anahtar türü ve özellikleri
- SSH agent'ta yüklenen anahtarların listesi
- Başarılı passwordless bağlantı ekran görüntüsü
- Anahtar güvenliği hakkında kısa rapor

### ✅ Değerlendirme Kriterleri:
- Anahtar türleri doğru oluşturulması (30%)
- Passphrase kullanımı (20%)
- SSH agent kullanımı (25%)
- Passwordless bağlantı (25%)

---

## 🎯 ÖDEV 2: SSH Tünelleme Akademisi
**Süre:** 90 dakika  
**Zorluk:** İleri ⭐⭐⭐

### 📋 Görevler:
1. Local port forwarding ile uzak veritabanına bağlantı kurun
2. Remote port forwarding ile yerel web serverınızı paylaşın
3. Dynamic port forwarding (SOCKS proxy) kurun
4. SSH jump host üzerinden cascade bağlantı yapın

### 🔧 Senaryolar:
```bash
# Senaryo 1: Uzak MySQL erişimi
ssh -L 3306:localhost:3306 user@db-server

# Senaryo 2: Yerel web sunucuyu paylaşma
ssh -R 8080:localhost:80 user@public-server

# Senaryo 3: SOCKS proxy
ssh -D 1080 user@proxy-server

# Senaryo 4: Jump host
ssh -J jump-host user@final-destination
```

### 📊 Beklenen Çıktı:
- Her tünelleme türü için çalışan örnek
- Network trafiğinin analizi (netstat, ss komutlarıyla)
- Tünelleme performans testleri
- Güvenlik analizi raporu

### ✅ Değerlendirme Kriterleri:
- Local forwarding başarısı (25%)
- Remote forwarding başarısı (25%)
- SOCKS proxy kurulumu (25%)
- Jump host kullanımı (25%)

---

## 🎯 ÖDEV 3: VNC Güvenlik Laboratuvarı
**Süre:** 70 dakika  
**Zorluk:** Orta ⭐⭐

### 📋 Görevler:
1. VNC server kurulumu ve konfigürasyonu yapın
2. SSH tüneli üzerinden güvenli VNC bağlantısı kurun
3. VNC güvenlik açıklarını test edin
4. VNC trafiğini analiz edin (Wireshark ile)

### 🔧 Kurulum Adımları:
```bash
# VNC Server kurulumu
sudo apt install tightvncserver
vncserver :1

# Güvenli bağlantı
ssh -L 5901:localhost:5901 user@vnc-server
vncviewer localhost:5901

# Trafik analizi
sudo tcpdump -i lo port 5901
```

### 📊 Beklenen Çıktı:
- Çalışan VNC server ekran görüntüsü
- SSH tünelli güvenli bağlantı
- Wireshark paket analizi
- Güvenlik zafiyetleri raporu

### ✅ Değerlendirme Kriterleri:
- VNC server kurulumu (25%)
- SSH tüneli kurulumu (30%)
- Güvenlik testi (25%)
- Trafik analizi (20%)

---

## 🎯 ÖDEV 4: SAMBA Dosya Sunucusu Projesi
**Süre:** 100 dakika  
**Zorluk:** İleri ⭐⭐⭐

### 📋 Görevler:
1. Samba server kurulumu ve konfigürasyonu
2. Farklı erişim seviyelerinde 4 paylaşım oluşturun
3. Windows ve Linux clientlardan erişim testleri
4. SAMBA güvenlik ayarlarını optimize edin

### 🔧 Paylaşım Tipleri:
```bash
# 1. Public (herkes erişebilir)
# 2. Group (sadece grup üyeleri)
# 3. User (sadece belirli kullanıcı)
# 4. Admin (sadece admin)

# Test komutları
smbclient -L //server-ip
smbclient //server-ip/share-name
```

### 📊 Beklenen Çıktı:
- Çalışan Samba konfigürasyon dosyası
- 4 farklı paylaşım ve erişim testleri
- Windows client bağlantısı ekran görüntüsü
- Güvenlik hardening raporu

### ✅ Değerlendirme Kriterleri:
- Samba kurulumu (20%)
- Paylaşım konfigürasyonu (30%)
- Client testleri (25%)
- Güvenlik optimizasyonu (25%)

---

## 🎯 ÖDEV 5: SCP ve SFTP Mastery
**Süre:** 50 dakika  
**Zorluk:** Orta ⭐⭐

### 📋 Görevler:
1. SCP ile dosya ve klasör transferi senaryoları
2. SFTP ile interaktif dosya yönetimi
3. Transfer hızlarını optimize edin
4. Batch dosya transferi script'i yazın

### 🔧 Transfer Senaryoları:
```bash
# Çeşitli SCP kullanımları
scp file.txt user@host:/path/
scp -r folder/ user@host:/path/
scp -P 2222 file.txt user@host:/path/

# SFTP batch işlemleri
sftp -b commands.txt user@host

# Hız optimizasyonu
scp -o Compression=yes -o CompressionLevel=9
```

### 📊 Beklenen Çıktı:
- Başarılı dosya transfer örnekleri
- SFTP komut listesi ve sonuçları
- Transfer hızı karşılaştırması
- Otomatik transfer script'i

### ✅ Değerlendirme Kriterleri:
- SCP kullanım çeşitliliği (30%)
- SFTP interaktif kullanım (25%)
- Hız optimizasyonu (20%)
- Batch script kalitesi (25%)

---

## 🎯 ÖDEV 6: SSH Konfigürasyon Wizard
**Süre:** 80 dakika  
**Zorluk:** İleri ⭐⭐⭐

### 📋 Görevler:
1. SSH client konfigürasyon dosyası (~/.ssh/config) oluşturun
2. 5 farklı sunucu için kısayol tanımları yapın
3. ProxyJump, HostKeyAlgorithms gibi ileri ayarları kullanın
4. SSH connection multiplexing aktif edin

### 🔧 Konfigürasyon Örnekleri:
```bash
# ~/.ssh/config örneği
Host webserver
    HostName 192.168.1.100
    User admin
    Port 2222
    IdentityFile ~/.ssh/web_key
    
Host database
    HostName 10.0.0.50
    User dbadmin
    ProxyJump webserver
    LocalForward 3306 localhost:3306
```

### 📊 Beklenen Çıktı:
- Tam konfigürasyonlu SSH config dosyası
- Her sunucu için test bağlantıları
- Connection multiplexing demo
- Konfigürasyon dokümantasyonu

### ✅ Değerlendirme Kriterleri:
- Config dosyası kapsamı (30%)
- İleri ayarlar kullanımı (25%)
- ProxyJump başarısı (25%)
- Multiplexing implementasyonu (20%)

---

## 🎯 ÖDEV 7: Network File System (NFS) Güvenliği
**Süre:** 75 dakika  
**Zorluk:** İleri ⭐⭐⭐

### 📋 Görevler:
1. NFS server kurulumu ve konfigürasyonu
2. Farklı mount seçenekleri ile testler
3. NFS güvenlik açıklarını araştırın
4. NFSv4 vs NFSv3 güvenlik karşılaştırması

### 🔧 NFS Komutları:
```bash
# Server tarafı
sudo apt install nfs-kernel-server
sudo nano /etc/exports
sudo exportfs -ra

# Client tarafı
showmount -e [server-ip]
sudo mount -t nfs [server]:[path] [local-path]

# Güvenlik testleri
nmap --script nfs-enum [server]
```

### 📊 Beklenen Çıktı:
- Çalışan NFS paylaşımları
- Mount testleri ve performance ölçümleri
- Güvenlik açığı tarama sonuçları
- NFSv3 vs NFSv4 karşılaştırma raporu

### ✅ Değerlendirme Kriterleri:
- NFS kurulum başarısı (25%)
- Mount testleri (25%)
- Güvenlik analizi (30%)
- Version karşılaştırması (20%)

---

## 🎯 ÖDEV 8: Uzaktan Erişim Güvenlik Denetimi
**Süre:** 120 dakika  
**Zorluk:** İleri ⭐⭐⭐⭐

### 📋 Görevler:
1. Ağdaki tüm uzaktan erişim servislerini tespit edin
2. Her servis için güvenlik açığı taraması yapın
3. Brute force saldırı simülasyonları gerçekleştirin
4. Kapsamlı güvenlik değerlendirmesi raporu hazırlayın

### 🔧 Tarama ve Test Araçları:
```bash
# Servis keşfi
nmap -sV -p 22,23,3389,5900-5910 [network]

# SSH güvenlik testleri  
nmap --script ssh-enum-algos,ssh-hostkey [target]
hydra -l admin -P wordlist.txt [target] ssh

# VNC testleri
nmap --script vnc-enum,vnc-brute [target]

# SMB/CIFS testleri
enum4linux [target]
smbclient -L [target] -N
```

### 📊 Beklenen Çıktı:
- Ağdaki tüm uzaktan erişim servislerin haritası
- Her servis için detaylı güvenlik analizi
- Brute force test sonuçları
- Risk değerlendirmesi ve öneriler raporu
- İyileştirme action plan'ı

### ✅ Değerlendirme Kriterleri:
- Kapsamlı servis keşfi (25%)
- Güvenlik açığı tespiti (25%)
- Brute force test kalitesi (20%)
- Rapor detayı ve önerileri (30%)

---

## 📊 Lab Ortamı Gereksinimleri

### 🖥️ Minimum Sistem:
- **Ana Makine**: Kali Linux (fiziksel veya VM)
- **Test VM'leri**: 
  - Ubuntu Server (SSH, Samba testleri için)
  - Windows 10 (client testleri için)
  - Metasploitable2 (güvenlik testleri için)

### 🔧 Gerekli Araçlar:
```bash
# SSH araçları (varsayılan olarak kurulu)
ssh, ssh-keygen, ssh-copy-id, scp, sftp

# VNC araçları
sudo apt install tightvncserver vinagre

# Samba araçları  
sudo apt install samba samba-common-bin smbclient

# NFS araçları
sudo apt install nfs-kernel-server nfs-common

# Analiz araçları
sudo apt install wireshark tcpdump netstat-nat

# Brute force araçları (dikkatli kullanın!)
sudo apt install hydra medusa
```

### 🌐 Network Kurulumu:
- **NAT Network**: 192.168.56.0/24 (VirtualBox)
- **Host-Only Adapter**: Güvenli test ortamı için
- **Firewall**: Test sırasında geçici olarak devre dışı bırakılabilir

---

## 📈 İlerleme Takibi

### 📊 Ödev Tamamlama Checklist:

#### Temel Seviye (Ödev 1, 5):
- [ ] SSH key management
- [ ] SCP/SFTP kullanımı
- [ ] Temel dosya transferleri
- [ ] Client-server bağlantıları

#### Orta Seviye (Ödev 2, 3, 6):
- [ ] SSH tunneling teknikleri  
- [ ] VNC güvenlik testleri
- [ ] SSH konfigürasyon yönetimi
- [ ] Network analizi

#### İleri Seviye (Ödev 4, 7, 8):
- [ ] Samba server yönetimi
- [ ] NFS güvenlik analizi
- [ ] Kapsamlı güvenlik denetimi
- [ ] Profesyonel raporlama

### 🎯 Beceri Geliştirme Haritası:
1. **Hafta 1-2**: Temel uzaktan erişim (SSH, keys)
2. **Hafta 3-4**: İleri SSH (tunneling, proxy)
3. **Hafta 5-6**: Dosya paylaşımı (Samba, NFS)
4. **Hafta 7-8**: Güvenlik denetimi ve analiz

---

## 💡 Başarı İpuçları

### 🔧 Teknik İpuçlar:
1. **Her zaman yedek alın**: Konfigürasyon dosyalarını kaydedin
2. **Log kayıtlarını takip edin**: `/var/log/` altındaki logları izleyin
3. **Network trafiğini analiz edin**: Wireshark ile paket analizi yapın
4. **Güvenlik odaklı düşünün**: Her servis bir potansiyel giriş noktası

### 📚 Öğrenme Stratejileri:
1. **Kademeli ilerleme**: Basit ödevlerden başlayın
2. **Hands-on yaklaşım**: Her komutu mutlaka deneyin
3. **Hata analizi**: Başarısız denemelerinizi analiz edin
4. **Alternatif yöntemler**: Aynı sonuca farklı yollardan ulaşın

### 🤝 Collaboration Tips:
- Sınıf arkadaşlarınızla lab ortamında birlikte çalışın
- SSH bağlantılarını birbirinizin sistemlerinde test edin
- Güvenlik bulgularınızı paylaşın ve tartışın

---

## ⚠️ Güvenlik Uyarıları

### 🛡️ Etik Kurallar:
- **Sadece kendi lab ortamınızda test yapın**
- **Gerçek sistemlere izinsiz erişim sağlamayın**
- **Zayıf parolalar sadece test amaçlı kullanın**
- **Brute force saldırıları sadece kendi sistemlerinizde yapın**

### 🔒 Lab Güvenliği:
- Test VM'lerini izole edin (Host-Only network)
- Güçlü parolalar kullanın (gerçek ortam için)
- Test sonrası hassas dosyaları temizleyin
- Firewall ayarlarını kontrol edin

---

## 📋 Değerlendirme Rubrik'i

### 🏆 Mükemmel (90-100 puan):
- Tüm görevler eksiksiz tamamlandı
- Yaratıcı çözümler ve optimizasyonlar
- Detaylı güvenlik analizleri
- Profesyonel kalitede raporlar

### 👍 İyi (80-89 puan):
- Ana görevler başarıyla tamamlandı
- Temel güvenlik prensipleri uygulandı
- Açık ve anlaşılır dokümantasyon
- Küçük teknik hatalar olabilir

### 📈 Orta (70-79 puan):
- Görevlerin çoğu tamamlandı
- Temel işlevsellik çalışıyor
- Dokümantasyon eksiklikleri var
- Bazı güvenlik konuları gözden kaçırılmış

### 🔄 Geliştirilmeli (60-69 puan):
- Görevlerin yarısından azı tamamlandı
- Önemli teknik hatalar var
- Dokümantasyon yetersiz
- Güvenlik prensipleri uygulanmamış

### ❌ Yetersiz (0-59 puan):
- Görevlerin çoğu tamamlanmamış
- Temel kavramlar anlaşılmamış
- Dokümantasyon yok veya çok eksik
- Tekrar gerekli

---

## 🎓 Sertifikasyon Hazırlığı

Bu ödevleri tamamladıktan sonra hazır olacağınız sertifikalar:

### 📜 Endüstri Sertifikaları:
- **CompTIA Security+**: Network security, access control
- **Linux Professional Institute (LPI)**: SSH, network services
- **Red Hat Certified System Administrator**: Remote access, file sharing
- **Certified Ethical Hacker (CEH)**: SSH tunneling, reconnaissance

### 🏅 Özel Yetenekler:
- SSH tunnel master
- Samba administrator
- VNC security specialist
- Remote access security auditor

**Bu ödevleri başarıyla tamamladığınızda enterprise-level uzaktan erişim sistemlerini yönetebilecek seviyeye ulaşacaksınız!** 🚀

---

*"Practice makes perfect - but perfect practice makes permanent!"* 💪