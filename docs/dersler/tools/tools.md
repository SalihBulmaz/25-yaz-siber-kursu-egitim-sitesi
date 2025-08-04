# Siber Güvenlik Eğitim Dokümanı (Detaylı)

Bu doküman, siber güvenlik konularında kapsamlı bir eğitim materyali sunar. Netdiscover, Nmap, ARP, ARP zehirlenmesi, Wireshark, Bettercap, ARP spoofing, parola ele geçirme, HTTPS, caplet değiştirme ve ortadaki adam (MITM) saldırılarına karşı korunma konularını detaylı bir şekilde ele alır. Her bölüm, teknik açıklamalar, pratik örnekler, adım adım talimatlar ve etik hususlarla zenginleştirilmiştir.

## 1. Netdiscover
### Genel Bakış
Netdiscover, yerel ağlarda cihazları tespit etmek için kullanılan açık kaynaklı bir ağ tarama aracıdır. Aktif ve pasif tarama modlarıyla çalışır, ARP (Adres Çözümleme Protokolü) isteklerini kullanarak cihazların IP ve MAC adreslerini belirler. Özellikle ağ keşfi ve envanter oluşturma için kullanışlıdır.

### Teknik Detaylar
- **Aktif Tarama**: ARP istekleri gönderir ve yanıtları toplar. Bu, hızlı sonuç verir ancak ağda tespit edilebilir.
- **Pasif Tarama**: Mevcut ARP trafiğini dinler, bu nedenle daha gizlidir ancak daha yavaş olabilir.
- **Çıktı Formatı**: IP adresi, MAC adresi, cihaz üreticisi (OUI veritabanına göre) ve bazen cihaz adı.

### Kurulum ve Kullanım
1. **Kurulum** (Debian/Ubuntu tabanlı sistemler için):
   ```bash
   sudo apt-get update
   sudo apt-get install netdiscover
   ```
2. **Aktif Tarama Örneği**:
   ```bash
   sudo netdiscover -i eth0 -r 192.168.1.0/24
   ```
   - `-i eth0`: Kullanılacak ağ arayüzü (örneğin, Ethernet için eth0).
   - `-r 192.168.1.0/24`: Taranacak IP aralığı.
   - Çıktı: Ağdaki cihazların IP ve MAC adreslerini listeler, örneğin:
     ```
     192.168.1.100  00:14:22:01:23:45  TP-LINK TECHNOLOGIES
     192.168.1.101  00:16:17:89:ab:cd  ASUS
     ```

3. **Pasif Tarama Örneği**:
   ```bash
   sudo netdiscover -p -i eth0
   ```
   - Pasif modda ağ trafiğini dinler, cihazları tespit etmek için ARP istek/yanıtlarını analiz eder.

4. **Otomatik Tarama**:
   ```bash
   sudo netdiscover -s 1 -c 10
   ```
   - `-s 1`: Her tarama arasında 1 saniye bekler.
   - `-c 10`: 10 tarama döngüsü gerçekleştirir.

### Pratik Uygulama
- **Senaryo**: Bir ağ yöneticisi, yerel ağda yetkisiz cihazları tespit etmek istiyor.
- **Adımlar**:
  1. Netdiscover ile ağdaki tüm cihazları tarayın.
  2. Çıktıyı bir dosyaya kaydedin:
     ```bash
     sudo netdiscover -i eth0 -r 192.168.1.0/24 > devices.txt
     ```
  3. Bilinmeyen MAC adreslerini inceleyin ve üretici bilgilerini kontrol edin.

### Etik Hususlar
- Netdiscover’ı yalnızca sahibi olduğunuz veya yazılı izin aldığınız ağlarda kullanın.
- Yetkisiz tarama, gizlilik ihlali olarak kabul edilir ve yasal sonuçlar doğurabilir.
- Tespit edilmekten kaçınmak için pasif modu tercih edin, ancak bu bile izinsiz yapıldığında etik dışıdır.

## 2. Nmap Kullanımı
### Genel Bakış
Nmap (Network Mapper), ağ keşfi, port tarama ve güvenlik denetimi için kullanılan güçlü bir açık kaynak araçtır. Ağdaki cihazları, açık portları, çalışan servisleri ve hatta işletim sistemi bilgilerini tespit edebilir.

### Teknik Detaylar
- **Tarama Türleri**:
  - TCP SYN tarama (gizli tarama).
  - UDP tarama (hizmet keşfi için).
  - İşletim sistemi ve sürüm tespiti.
- **Performans Seçenekleri**: Zamanlama şablonları (-T0’dan -T5’e) tarama hızını ayarlar.
- **Çıktı Formatları**: Normal, XML, grep uyumlu.

### Kurulum ve Kullanım
1. **Kurulum**:
   ```bash
   sudo apt-get install nmap
   ```
2. **Temel Ağ Taraması**:
   ```bash
   nmap 192.168.1.0/24
   ```
   - Belirtilen IP aralığındaki tüm cihazları tarar.
   - Çıktı: Aktif cihazların IP adresleri ve açık portları listelenir.

3. **Port Taraması**:
   ```bash
   nmap -p 1-1000 192.168.1.100
   ```
   - Hedef IP’de 1-1000 port aralığını tarar.
   - Örnek çıktı:
     ```
     PORT    STATE SERVICE
     22/tcp  open  ssh
     80/tcp  open  http
     ```

4. **Hızlı ve Gizli Tarama**:
   ```bash
   nmap -T4 -F 192.168.1.100
   ```
   - `-T4`: Hızlı tarama şablonu.
   - `-F`: Sık kullanılan portları tarar.

5. **İşletim Sistemi Tespiti**:
   ```bash
   nmap -O 192.168.1.100
   ```
   - Hedef cihazın işletim sistemini ve sürümünü tahmin eder.

6. **Ağ Senaryosu Taraması**:
   ```bash
   nmap -sS -sV -O 192.168.1.100
   ```
   - `-sS`: Gizli SYN taraması.
   - `-sV`: Servis/sürüm tespiti.
   - `-O`: İşletim sistemi tespiti.

### Pratik Uygulama
- **Senaryo**: Bir şirket ağında açık portları ve potansiyel güvenlik açıklarını tespit etmek.
- **Adımlar**:
  1. Hedef IP aralığını belirleyin (örn. 192.168.1.0/24).
  2. Nmap ile tarama yapın ve sonuçları XML formatında kaydedin:
     ```bash
     nmap -oX results.xml 192.168.1.0/24
     ```
  3. Açık portları ve servisleri inceleyin, güvenlik açıklarını değerlendirin.

### Etik Hususlar
- Nmap ile tarama yapmadan önce ağ sahibinden yazılı izin alın.
- Agresif taramalar (örn. -A parametresi) ağ performansını etkileyebilir ve tespit edilebilir.
- Yasal olmayan taramalar, ağ politikalarını veya yasaları ihlal edebilir.

## 3. ARP Nedir ve Nasıl Kullanılır?
### Genel Bakış
ARP (Address Resolution Protocol), IP adreslerini MAC adreslerine eşlemek için kullanılan bir ağ protokolüdür. Yerel ağlarda cihazların birbirine veri gönderebilmesi için gereklidir.

### Teknik Detaylar
- **ARP İsteği**: Bir cihaz, hedef IP adresine sahip cihazın MAC adresini öğrenmek için bir ARP isteği yayınlar.
- **ARP Yanıtı**: Hedef cihaz, kendi MAC adresini içeren bir yanıt gönderir.
- **ARP Tablosu**: Her cihaz, IP-MAC eşleşmelerini yerel bir tabloda saklar.

### Kullanım
1. **ARP Tablosunu Görüntüleme**:
   - Linux:
     ```bash
     arp -a
     ```
     - Çıktı: Yerel ağdaki IP-MAC eşleşmeleri, örneğin:
       ```
       192.168.1.100 (00:14:22:01:23:45) at eth0
       ```
   - Windows:
     ```cmd
     arp -a
     ```

2. **Manuel ARP İsteği Gönderme** (arping ile):
   ```bash
   sudo apt-get install arping
   sudo arping -I eth0 192.168.1.100
   ```
   - Belirtilen IP adresine ARP isteği gönderir ve MAC adresini döndürür.

3. **Statik ARP Girişi Ekleme** (güvenlik için):
   ```bash
   sudo arp -s 192.168.1.1 00:14:22:01:23:45
   ```
   - Belirtilen IP’ye sabit bir MAC adresi atar, ARP zehirlenmesini zorlaştırır.

### Pratik Uygulama
- **Senaryo**: Ağda yanlış bir MAC adresi ile iletişim kuran bir cihazı tespit etme.
- **Adımlar**:
  1. ARP tablosunu kontrol edin: `arp -a`.
  2. Şüpheli IP-MAC eşleşmelerini inceleyin.
  3. `arping` ile cihazın gerçek MAC adresini doğrulayın.

### Etik Hususlar
- ARP yalnızca ağ yönetimi veya sorun giderme amaçlı kullanılmalıdır.
- ARP tablosunu manipüle etmek (örn. ARP zehirlenmesi) izinsiz yapıldığında yasa dışıdır.

## 4. ARP Zehirlenmesi (ARP Poisoning)
### Genel Bakış
ARP zehirlenmesi, bir saldırganın sahte ARP yanıtları göndererek hedef cihazın ARP tablosunu manipüle etmesi işlemidir. Bu, genellikle ortadaki adam (MITM) saldırıları için kullanılır.

### Teknik Detaylar
- **Süreç**: Saldırgan, hedef cihaza ağ geçidi (gateway) gibi davranarak sahte ARP yanıtları gönderir. Hedef, veri paketlerini saldırgana yönlendirir.
- **Riskler**: Trafik dinleme, veri değiştirme veya parola çalma.

### Kullanım Örneği
- **Araç**: Bettercap
- **Komut**:
   ```bash
   sudo bettercap -iface eth0 -T 192.168.1.100 --spoof arp
   ```
   - `-T 192.168.1.100`: Hedef cihazın IP adresi.
   - `--spoof arp`: ARP zehirlenmesi başlatır.

- **Alternatif Araç**: arpspoof
   ```bash
   sudo arpspoof -i eth0 -t 192.168.1.100 -r 192.168.1.1
   ```
   - `-t 192.168.1.100`: Hedef cihaz.
   - `-r 192.168.1.1`: Ağ geçidi.

### Pratik Uygulama
- **Senaryo**: Bir test ortamında ARP zehirlenmesi ile ağ trafiğini yönlendirme.
- **Adımlar**:
  1. Bettercap ile hedef cihaz ve ağ geçidi arasında ARP zehirlenmesi başlatın.
  2. Wireshark ile yönlendirilen trafiği analiz edin.
  3. Güvenlik açıklarını belirleyin ve düzeltme önerileri sunun.

### Etik Hususlar
- ARP zehirlenmesi yalnızca test veya eğitim amaçlı, izinli ortamlarda kullanılmalıdır.
- Yetkisiz ARP zehirlenmesi, ağ güvenliğini ihlal eder ve yasal sonuçlar doğurur.

## 5. Wireshark Nedir?
### Genel Bakış
Wireshark, ağ trafiğini yakalamak ve analiz etmek için kullanılan açık kaynaklı bir protokol analiz aracıdır. TCP, UDP, HTTP, ARP, DNS gibi protokolleri ayrıntılı bir şekilde incelemek için idealdir.

### Teknik Detaylar
- **Paket Yakalama**: Gerçek zamanlı veya kaydedilmiş ağ trafiğini yakalar.
- **Filtreleme**: Protokol, IP adresi veya port bazlı filtreleme sağlar.
- **Analiz**: Paket içeriğini (başlık ve veri) ayrıntılı olarak gösterir.

### Kurulum ve Kullanım
1. **Kurulum**:
   ```bash
   sudo apt-get install wireshark
   ```
   - Kurulum sırasında, kablolu veya kablosuz arayüzler için yakalama izni yapılandırılabilir.

2. **Ağ Arayüzü Seçimi**:
   - Wireshark’ı başlatın ve analiz etmek istediğiniz arayüzü seçin (örn. eth0).
   - Örnek: `sudo wireshark -i eth0`

3. **Filtreleme Örnekleri**:
   - HTTP trafiği: `http`
   - Belirli IP’den gelen trafik: `ip.src == 192.168.1.100`
   - Belirli port: `tcp.port == 80`

4. **Trafik Kaydetme**:
   ```bash
   sudo tshark -i eth0 -w capture.pcap
   ```
   - Tshark, Wireshark’ın komut satırı sürümüdür.

### Pratik Uygulama
- **Senaryo**: Ağda anormal HTTP trafiğini tespit etme.
- **Adımlar**:
  1. Wireshark ile eth0 arayüzünden trafik yakalayın.
  2. Filtre uygulayın: `http.request.method == POST`.
  3. Form verilerini analiz ederek potansiyel parola sızıntılarını kontrol edin.

### Etik Hususlar
- Wireshark ile yalnızca kendi ağınızdaki trafiği analiz edin.
- Başka birinin trafiğini izinsiz yakalamak, gizlilik ihlali ve yasa dışıdır.

## 6. Bettercap
### Genel Bakış
Bettercap, ağ analizi, MITM saldırıları ve güvenlik testleri için kullanılan modern bir araçtır. ARP spoofing, DNS spoofing, SSL stripping ve ağ izleme gibi özellikler sunar.

### Teknik Detaylar
- **Modüler Yapı**: Caplet’ler ile özelleştirilebilir.
- **Protokol Desteği**: HTTP, HTTPS, DNS, TCP, UDP.
- **Entegrasyonlar**: Wireshark veya diğer araçlarla birlikte kullanılabilir.

### Kullanım
1. **Kurulum**:
   ```bash
   sudo apt-get install bettercap
   ```
2. **ARP Spoofing**:
   ```bash
   sudo bettercap -iface eth0 --target 192.168.1.100 --gateway 192.168.1.1
   ```
   - Hedef cihaz ile ağ geçidi arasında trafiği yönlendirir.

3. **DNS Spoofing**:
   ```bash
   sudo bettercap -iface eth0 --dns dns_spoof.cap
   ```
   - Örnek caplet:
     ```bash
     set dns.spoof.domains example.com
     set dns.spoof.address 192.168.1.200
     dns.spoof on
     ```

4. **HTTP Proxy ile Trafik Analizi**:
   ```bash
   sudo bettercap -iface eth0 --proxy
   ```

### Pratik Uygulama
- **Senaryo**: Bir test ağında sahte bir web sitesine yönlendirme.
- **Adımlar**:
  1. DNS spoofing ile sahte bir DNS yanıtı oluşturun.
  2. Bettercap ile HTTP trafiğini yakalayın ve analiz edin.
  3. Kullanıcı davranışlarını simüle ederek güvenlik açıklarını test edin.

### Etik Hususlar
- Bettercap yalnızca izinli test ortamlarında kullanılmalıdır.
- Yetkisiz kullanım, ağ güvenliğini tehdit eder ve yasa dışıdır.

## 7. ARP Spoofing
### Genel Bakış
ARP spoofing, ARP zehirlenmesinin bir türüdür ve sahte ARP mesajları ile ağ trafiğini yönlendirmeyi amaçlar. MITM saldırıları için yaygın bir tekniktir.

### Teknik Detaylar
- **Süreç**: Saldırgan, hedef cihazın ARP tablosuna sahte MAC adresleri enjekte eder.
- **Sonuç**: Trafik, saldırganın kontrol ettiği cihaza yönlendirilir.

### Kullanım Örneği
- **Araç**: arpspoof
   ```bash
   sudo arpspoof -i eth0 -t 192.168.1.100 -r 192.168.1.1
   ```
   - Hedef cihaz (192.168.1.100) ile ağ geçidi (192.168.1.1) arasında trafiği yönlendirir.

- **Bettercap ile**:
   ```bash
   sudo bettercap -iface eth0 --target 192.168.1.100 --gateway 192.168.1.1
   ```

### Pratik Uygulama
- **Senaryo**: Eğitim amaçlı bir MITM testi.
- **Adımlar**:
  1. ARP spoofing ile trafiği yönlendirin.
  2. Wireshark ile yönlendirilen trafiği analiz edin.
  3. Potansiyel güvenlik açıklarını raporlayın.

### Etik Hususlar
- ARP spoofing yalnızca test ortamlarında ve izinle yapılmalıdır.
- Yetkisiz kullanım, ağ güvenliğini tehlikeye atar ve yasa dışıdır.

## 8. Parolaları Ele Geçirme
### Genel Bakış
Parolaları ele geçirme, MITM saldırıları, kimlik avı veya ağ trafiği analizi ile gerçekleştirilir. HTTP trafiği, parola sızıntılarının ana hedefidir.

### Teknik Detaylar
- **MITM ile**: ARP spoofing ile trafik yönlendirilir, HTTP POST istekleri analiz edilir.
- **Kimlik Avı**: Sahte giriş sayfaları ile kullanıcılar kandırılır.
- **SSL Stripping**: HTTPS’yi HTTP’ye düşürerek şifresiz veri yakalanır.

### Kullanım Örneği
- **Bettercap ile HTTP Parola Yakalama**:
   ```bash
   sudo bettercap -iface eth0 --proxy --proxy-module http
   ```
   - HTTP trafiğini yakalar ve form verilerini analiz eder.

- **Kimlik Avı Örneği**:
  1. Sahte bir giriş sayfası oluşturun (örn. HTML/CSS ile).
  2. Bettercap ile DNS spoofing yaparak kullanıcıları bu sayfaya yönlendirin.

### Pratik Uygulama
- **Senaryo**: Bir test ortamında parola sızıntısını simüle etme.
- **Adımlar**:
  1. ARP spoofing ile trafiği yönlendirin.
  2. Wireshark veya Bettercap ile HTTP POST isteklerini analiz edin.
  3. Güvenlik açıklarını kapatmak için öneriler sunun.

### Etik Hususlar
- Parola ele geçirme yalnızca etik hackleme testleri için kullanılmalıdır.
- Başka birinin parolasını izinsiz ele geçirmek yasa dışıdır ve ciddi etik sorunlar yaratır.

## 9. HTTPS
### Genel Bakış
HTTPS, HTTP’nin SSL/TLS protokolleri ile şifrelenmiş sürümüdür. Kullanıcı ile sunucu arasındaki veri aktarımını korur ve kimlik doğrulama sağlar.

### Teknik Detaylar
- **SSL/TLS**: Veriler şifrelenir, yalnızca doğru anahtara sahip cihazlar tarafından okunabilir.
- **Sertifikalar**: Güvenilir Sertifika Otoriteleri (CA) tarafından sağlanan sertifikalar, sitenin kimliğini doğrular.
- **Zayıf Noktalar**: SSL stripping, sahte sertifikalar veya yanlış yapılandırılmış sertifikalar.

### HTTPS ve Güvenlik
- HTTPS, MITM saldırılarına karşı güçlü bir koruma sağlar.
- Ancak, kullanıcılar sahte sertifika uyarılarını görmezden gelirse risk oluşur.

### Pratik Uygulama
- **Senaryo**: Bir web sitesinin HTTPS yapılandırmasını test etme.
- **Adımlar**:
  1. Web sitesinin sertifikasını kontrol edin (tarayıcıda kilit simgesi).
  2. SSL Labs gibi araçlarla sertifika güvenilirliğini test edin: [SSL Labs](https://www.ssllabs.com/ssltest/).
  3. Zayıf şifreleme protokollerini (örn. SSLv3) tespit edin.

### Etik Hususlar
- HTTPS’yi atlatmaya çalışmak yalnızca test ortamlarında yapılmalıdır.
- Gerçek dünyada HTTPS’yi kırmaya çalışmak yasa dışıdır.

## 10. Caplet Değiştirme
### Genel Bakış
Caplet’ler, Bettercap’in özelleştirilmiş betik dosyalarıdır ve belirli görevleri otomatikleştirmek için kullanılır. ARP spoofing, DNS spoofing veya ağ izleme gibi işlemleri yapılandırır.

### Teknik Detaylar
- **Yapı**: Caplet’ler, Bettercap’in komutlarını bir betik dosyasında toplar.
- **Kullanım**: Komut satırı veya dosya olarak çalıştırılır.

### Örnek Caplet
```bash
# arp_spoof.cap
set arp.spoof.targets 192.168.1.100
set arp.spoof.fullduplex true
arp.spoof on
```
- **Çalıştırma**:
   ```bash
   sudo bettercap -iface eth0 -caplet arp_spoof.cap
   ```

### Pratik Uygulama
- **Senaryo**: Bir test ağında otomatik ARP spoofing testi.
- **Adımlar**:
  1. Yukarıdaki caplet’i oluşturun ve kaydedin.
  2. Bettercap ile çalıştırın ve sonuçları analiz edin.
  3. Güvenlik açıklarını raporlayın.

### Etik Hususlar
- Caplet’ler yalnızca izinli test ortamlarında kullanılmalıdır.
- Kötü niyetli caplet’ler ağ güvenliğini tehlikeye atabilir.

## 11. Ortadaki Adam (MITM) Saldırılarına Karşı Korunma
### Genel Bakış
MITM saldırıları, bir saldırganın iki taraf arasındaki iletişimi gizlice dinlemesi veya manipüle etmesidir. ARP spoofing, DNS spoofing veya sahte Wi-Fi noktaları bu tür saldırılarda kullanılır.

### Teknik Detaylar
- **Tespit**: Anormal ARP trafiği veya sertifika uyarıları.
- **Koruma Yöntemleri**:
  - HTTPS zorunluluğu (HSTS).
  - VPN kullanımı.
  - Statik ARP girişleri.

### Korunma Yöntemleri
1. **HTTPS Kullanımı**:
   - Her zaman HTTPS kullanan siteleri tercih edin.
   - Tarayıcıda “https://” ve kilit simgesini kontrol edin.
2. **VPN Kullanımı**:
   - Genel Wi-Fi ağlarında VPN kullanarak trafiğinizi şifreleyin (örn. OpenVPN, NordVPN).
3. **ARP Tespiti**:
   - `arpwatch` ile anormal ARP trafiğini izleyin:
     ```bash
     sudo apt-get install arpwatch
     sudo arpwatch -i eth0
     ```
4. **Sertifika Doğrulama**:
   - HTTPS sitelerinde sertifika uyarılarını dikkate alın.
5. **Statik ARP Tabloları**:
   - Önemli cihazlar için statik ARP girişleri kullanın:
     ```bash
     sudo arp -s 192.168.1.1 00:14:22:01:23:45
     ```
6. **İki Faktörlü Kimlik Doğrulama (2FA)**:
   - Önemli hesaplar için 2FA’yı etkinleştirin.

### Pratik Uygulama
- **Senaryo**: Bir ağda MITM saldırısını tespit etme ve önleme.
- **Adımlar**:
  1. `arpwatch` ile ARP trafiğini izleyin.
  2. HTTPS sitelerine erişirken sertifika uyarılarını kontrol edin.
  3. VPN kullanarak trafiği şifreleyin ve test edin.

### Etik Hususlar
- MITM saldırılarını öğrenmek, güvenlik uzmanları için önemlidir ancak kötü niyetli kullanımı yasa dışıdır.
- Güvenlik testleri yalnızca yetkili ortamlarda yapılmalıdır.