# Siber Güvenlik Ödevi: İnterneti Güvenli Kullanmayı Öğrenelim!

Merhaba arkadaşlar! Bu ödevde, internet ve ağ dünyasında güvenliği öğrenmek için eğlenceli görevler yapacağız. Siber güvenlik araçlarını (Netdiscover, Nmap, Wireshark gibi) kullanarak ağları nasıl keşfedeceğimizi ve interneti güvenli kullanacağımızı öğreneceğiz. Her görevde, bir yetişkinin (öğretmen veya ebeveyn) gözetiminde kullanabileceğiniz basit komutlar da vereceğiz. Hazırsanız, başlayalım!

## Ödev Kuralları
- Ödevi yaparken bir yetişkinden yardım isteyin, özellikle komutları çalıştırırken.
- İnterneti kullanırken her zaman güvenli sitelere (https:// ile başlayan) girdiğinizden emin olun.
- Komutları yalnızca bir test ortamında veya öğretmeninizin/ailenizin izniyle kullanın.
- Ödevi tamamlamak için bir defter, kalem veya bilgisayar kullanabilirsiniz.
- Eğlenmeyi unutmayın! 😊

---

## Görev 1: Ağ Dedektifi Ol! (Netdiscover)
### Ne Öğreneceğiz?
Netdiscover, evinizdeki veya okulunuzdaki ağda hangi cihazların bağlı olduğunu bulmamıza yarayan bir araçtır. Mesela, telefonunuz, tabletiniz veya akıllı televizyonunuz ağa bağlı mı, bunu öğrenebilirsiniz!

### Görev
1. **Soru**: Evinizde internete bağlı kaç cihaz var? (Örnek: Annemin telefonu, benim tabletim, babamın bilgisayarı)
   - Bir kağıda cihazları yazın.
2. **Etkinlik**: Bir yetişkine sorun: Wi-Fi modeminizde hangi cihazların bağlı olduğunu nasıl görebilirsiniz? (İpucu: Modem ayarlarına bakabilirsiniz!)
3. **Çizim**: Bir ağ haritası çizin. Ortada modemi çizin, etrafına bağlı cihazları (telefon, tablet vb.) ekleyin.
4. **Komut (Yetişkin Gözetiminde)**:
   - Netdiscover ile ağdaki cihazları görmek için şu komutu kullanabilirsiniz:
     ```bash
     sudo netdiscover -i eth0 -r 192.168.1.0/24
     ```
     - **Açıklama**: Bu komut, ağda hangi cihazların olduğunu listeler (örneğin, IP ve MAC adresleri). Yetişkinle birlikte bir test ağında deneyin.

### Teslim
- Cihaz listesini, ağ haritasını ve komutun nasıl çalıştığını (yetişkinle denediyseniz) öğretmeninize gösterin.

---

## Görev 2: İnternet Kapılarını Keşfet! (Nmap)
### Ne Öğreneceğiz?
Nmap, bir bilgisayarın internetteki “kapılarını” (portlarını) kontrol eder. Bu kapılar, internetten gelen bilgilerin geçtiği yerlerdir. Mesela, web sitelerine girmek için 80 numaralı kapı kullanılır.

### Görev
1. **Soru**: Bir bilgisayarın internette neler yaptığını düşünüyorsunuz? (Örnek: Oyun oynama, video izleme)
   - Düşündüklerinizi kağıda yazın.
2. **Etkinlik**: Bir ev kapısını düşünün. Kapının kilitli olması güvenli midir? İnternetteki kapılar için de aynı şey geçerli mi? Bir cümle yazın.
3. **Komut (Yetişkin Gözetiminde)**:
   - Nmap ile bir cihazın açık kapılarını görmek için şu komutu kullanabilirsiniz:
     ```bash
     nmap 192.168.1.100
     ```
     - **Açıklama**: Bu komut, belirtilen IP adresindeki açık portları (kapıları) listeler. Yetişkinle birlikte bir test cihazında deneyin.
4. **Oyun**: Öğretmeninizle “port oyunu” oynayın. Öğretmeniniz bir bilgisayarın kapıları gibi davranabilir, siz hangi kapının açık olduğunu tahmin edin.

### Teslim
- Yazılı cevaplarınızı, komut deneme notlarınızı (eğer denediyseniz) ve oyun notlarınızı öğretmeninize teslim edin.

---

## Görev 3: Adres Bulmaca! (ARP)
### Ne Öğreneceğiz?
ARP, cihazların birbirini bulması için kullanılan bir sistemdir. Örneğin, telefonunuz modeme “Sen kimsinsin?” diye sorar ve modem adresini (MAC adresi) söyler.

### Görev
1. **Soru**: Bir arkadaşınıza mektup göndermek için adresini bilmeniz gerekir mi? İnternette cihazların adresleri nelerdir? (İpucu: IP ve MAC adresi)
   - Cevabınızı yazın.
2. **Etkinlik**: Bir arkadaşınıza “gizli mesaj” yazın ve kağıda onun “adresini” (örneğin, sınıf numarasını) yazın. Mesajı sadece doğru adrese gönderin!
3. **Komut (Yetişkin Gözetiminde)**:
   - ARP tablosunu görmek için şu komutu kullanabilirsiniz:
     ```bash
     arp -a
     ```
     - **Açıklama**: Bu komut, ağdaki cihazların IP ve MAC adreslerini gösterir. Yetişkinle bir test ağında deneyin.
4. **Çizim**: Bir kağıda iki cihaz çizin (örneğin, telefon ve modem). Aralarına bir ok koyun ve “ARP sorusu” yazın.

### Teslim
- Mesajınızı, adresinizi, çiziminizi ve komut deneme notlarınızı (eğer denediyseniz) öğretmeninize gösterin.

---

## Görev 4: Kötü Mesajları Tespit Et! (ARP Zehirlenmesi ve ARP Spoofing)
### Ne Öğreneceğiz?
Bazen kötü niyetli kişiler, cihazların adreslerini taklit ederek internetteki mesajları çalmaya çalışır. Buna “ARP zehirlenmesi” diyoruz. Bu, birinin mektubunu yanlış kişiye göndermesine benzer.

### Görev
1. **Soru**: Birinin mektubunu başka biri açarsa ne olur? İnternette bu neden tehlikelidir?
   - Cevabınızı bir cümleyle yazın.
2. **Etkinlik**: Öğretmeninizle “rol oyunu” oynayın. Biriniz “kötü niyetli kişi” olun ve bir mesajı yanlış kişiye göndermeye çalışın. Diğerleri bunu nasıl fark eder?
3. **Komut (Yetişkin Gözetiminde)**:
   - ARP zehirlenmesini test etmek için (sadece eğitim amaçlı!) şu komutu kullanabilirsiniz:
     ```bash
     sudo bettercap -iface eth0 -T 192.168.1.100 --spoof arp
     ```
     - **Açıklama**: Bu komut, bir test ağında ARP zehirlenmesi yapar. Yetişkinle birlikte ve sadece izinli bir ortamda deneyin.
4. **Öneri**: İnternette kötü niyetli kişilerden korunmak için ne yapmalıyız? (Örnek: Güvenli siteler kullanmak)

### Teslim
- Yazılı cevabınızı, rol oyunu notlarınızı ve komut deneme notlarınızı (eğer denediyseniz) öğretmeninize teslim edin.

---

## Görev 5: İnternet Dedektifi! (Wireshark)
### Ne Öğreneceğiz?
Wireshark, internetteki mesajları (paketleri) yakalayıp incelememize yardımcı olur. Bir dedektif gibi, ağda neler olduğunu görebiliriz!

### Görev
1. **Soru**: Bir web sitesine girerken hangi bilgiler gönderilir? (Örnek: Kullanıcı adı, parola)
   - Düşündüklerinizi yazın.
2. **Etkinlik**: Bir kağıda, bir web sitesine girerken gönderdiğiniz bilgileri çizin (örneğin, bir zarf ve içinde “parola” yazısı).
3. **Komut (Yetişkin Gözetiminde)**:
   - Wireshark ile ağ trafiğini yakalamak için şu komutu kullanabilirsiniz:
     ```bash
     sudo wireshark -i eth0
     ```
     - **Açıklama**: Bu komut, ağdaki mesajları yakalar. Yetişkinle bir test ağında deneyin ve “http” filtresiyle web trafiğini görün.
4. **Oyun**: Öğretmeninizle “mesaj yakalama” oyunu oynayın. Biriniz mesaj gönderin, diğeriniz dedektif olup mesajı “yakalamaya” çalışsın.

### Teslim
- Çiziminizi, oyun notlarınızı ve komut deneme notlarınızı (eğer denediyseniz) öğretmeninize gösterin.

---

## Görev 6: Süper Güvenlik Aracı! (Bettercap)
### Ne Öğreneceğiz?
Bettercap, ağda neler olduğunu anlamak için kullanılan bir güvenlik aracıdır. Dedektifler gibi, ağdaki sorunları bulmamıza yardımcı olur.

### Görev
1. **Soru**: Bir dedektif olsaydınız, internette hangi sorunları arardınız? (Örnek: Sahte web siteleri)
   - Cevabınızı yazın.
2. **Etkinlik**: Bir kağıda, bir “güvenlik dedektifi” çizimi yapın. Dedektifin elinde bir büyüteç olsun ve “Bettercap” yazın.
3. **Komut (Yetişkin Gözetiminde)**:
   - Bettercap ile ağ trafiğini izlemek için şu komutu kullanabilirsiniz:
     ```bash
     sudo bettercap -iface eth0
     ```
     - **Açıklama**: Bu komut, ağdaki olayları izler. Yetişkinle bir test ağında deneyin.
4. **Öneri**: İnternette güvenliği artırmak için ne yapabiliriz? (Örnek: Güçlü parolalar kullanmak)

### Teslim
- Çiziminizi, yazılı cevabınızı ve komut deneme notlarınızı (eğer denediyseniz) öğretmeninize teslim edin.

---

## Görev 7: Parola Avcısı! (Parolaları Ele Geçirme)
### Ne Öğreneceğiz?
Parolalar, internetteki hesabınızı koruyan kilitlerdir. Kötü niyetli kişiler parolaları çalmaya çalışabilir, ama biz onları koruyacağız!

### Görev
1. **Soru**: Güçlü bir parola nasıl olmalı? (İpucu: Uzun, karışık, rakam ve harf içermeli)
   - Örnek bir parola yazın. (Örnek: “Gunes123!”)
2. **Etkinlik**: Bir arkadaşınızla “parola oyunu” oynayın. Biriniz güçlü bir parola yazsın, diğeriniz bunu tahmin etmeye çalışsın. Zor mu?
3. **Komut (Yetişkin Gözetiminde)**:
   - Bettercap ile parola yakalamayı test etmek için (eğitim amaçlı):
     ```bash
     sudo bettercap -iface eth0 --proxy
     ```
     - **Açıklama**: Bu komut, HTTP trafiğini izler. Yetişkinle ve sadece test ortamında deneyin.
4. **Öneri**: Parolanızı korumak için ne yapmalısınız? (Örnek: Kimseyle paylaşmamak)

### Teslim
- Yazılı cevabınızı, oyun notlarınızı ve komut deneme notlarınızı (eğer denediyseniz) öğretmeninize gösterin.

---

## Görev 8: Güvenli İnternet! (HTTPS)
### Ne Öğreneceğiz?
HTTPS, internette güvenli siteleri gösterir. Adres çubuğunda “https://” ve bir kilit simgesi görürseniz, o site güvenlidir!

### Görev
1. **Soru**: Bir web sitesine girerken adres çubuğunda ne aramalısınız? (İpucu: Kilit simgesi)
   - Cevabınızı yazın.
2. **Etkinlik**: Bir yetişkine sorun: En sevdiğiniz web sitesinin adresi “https://” ile mi başlıyor? Kilit simgesini kontrol edin!
3. **Komut (Yetişkin Gözetiminde)**:
   - Bir sitenin HTTPS kullanıp kullanmadığını görmek için tarayıcıda şu adımları izleyin:
     - Adres çubuğunda kilit simgesine tıklayın.
     - Sertifika bilgilerini kontrol edin.
   - Alternatif: Wireshark ile HTTPS trafiğini görmek için:
     ```bash
     sudo wireshark -i eth0 -f "tcp port 443"
     ```
     - **Açıklama**: Bu komut, HTTPS trafiğini (port 443) yakalar. Yetişkinle deneyin.
4. **Çizim**: Bir kağıda, bir web sitesinin adres çubuğunu çizin ve kilit simgesini ekleyin.

### Teslim
- Çiziminizi, yazılı cevabınızı ve komut deneme notlarınızı (eğer denediyseniz) öğretmeninize teslim edin.

---

## Görev 9: Komut Dosyası Yazalım! (Caplet Değiştirme)
### Ne Öğreneceğiz?
Caplet, Bettercap’in özel komut dosyalarıdır. Bu dosyalar, ağda ne yapacağımızı söylemek için kullanılır. Mesela, bir dedektifin not defteri gibi!

### Görev
1. **Soru**: Bir dedektifin not defterinde neler yazabilir? İnternette bunu nasıl kullanırız?
   - Cevabınızı yazın.
2. **Etkinlik**: Bir kağıda, bir “dedektif notu” yazın. Örneğin: “Ağda hangi cihazlar var, kontrol et!”
3. **Komut (Yetişkin Gözetiminde)**:
   - Basit bir caplet dosyası oluşturmak için:
     ```bash
     echo "net.probe on" > dedektif.cap
     sudo bettercap -iface eth0 -caplet dedektif.cap
     ```
     - **Açıklama**: Bu caplet, ağdaki cihazları tarar. Yetişkinle bir test ağında deneyin.
4. **Çizim**: Bir kağıda, bir dedektifin elinde “caplet” yazan bir not defteri çizin.

### Teslim
- Yazılı cevabınızı, çiziminizi ve komut deneme notlarınızı (eğer denediyseniz) öğretmeninize gösterin.

---

## Görev 10: Ortadaki Adamdan Korun! (MITM Koruması)
### Ne Öğreneceğiz?
Ortadaki adam (MITM), internette mesajlarınızı gizlice dinlemeye çalışan bir kötü niyetli kişidir. Biz bunu önlemek için neler yapabiliriz, öğreneceğiz!

### Görev
1. **Soru**: İnternette mesajlarınızın başkası tarafından okunmasını önlemek için ne yapmalısınız? (İpucu: Güvenli siteler, VPN)
   - Cevabınızı yazın.
2. **Etkinlik**: Öğretmeninizle “gizli mesaj oyunu” oynayın. Biriniz mesaj gönderin, diğeriniz “ortadaki adam” olup mesajı yakalamaya çalışsın. Ama güvenli bir kilit (HTTPS gibi) kullanırsanız ne olur?
3. **Komut (Yetişkin Gözetiminde)**:
   - Anormal ARP trafiğini tespit etmek için:
     ```bash
     sudo arpwatch -i eth0
     ```
     - **Açıklama**: Bu komut, ağdaki şüpheli adres değişikliklerini izler. Yetişkinle deneyin.
4. **Öneri**: İnternette güvenli kalmak için 3 kural yazın. (Örnek: HTTPS kullan, parolanı paylaşma)

### Teslim
- Yazılı cevabınızı, oyun notlarınızı, komut deneme notlarınızı (eğer denediyseniz) ve 3 kuralınızı öğretmeninize teslim edin.

---

## Ödev Teslimi
- Tüm yazılı cevaplarınızı, çizimlerinizi ve oyun notlarınızı bir deftere veya kağıda toplayın.
- Komutları denediyseniz, yetişkinle neler yaptığınızı not edin ve öğretmeninize anlatın.
- Ödevinizi teslim ederken, en çok hangi görevi sevdiğinizi söyleyin!

## Ekstra Puan
- İnternette güvenli kalmak için kendi “Siber Güvenlik Kuralları” posterinizi çizin. Örneğin: “Kilit simgesini kontrol et!” veya “Güçlü parola kullan!”
- Posterinizde renkli kalemler kullanın ve sınıfta paylaşın!