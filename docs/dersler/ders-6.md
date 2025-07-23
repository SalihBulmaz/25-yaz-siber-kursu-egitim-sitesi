# Ders 6: Kali Linuxa Giriş

## 🐧 1. Linux Giriş (Kali Linux Bağlamında)

**Linux Nedir?** Açık kaynaklı, terminal odaklı ve hacker'ların tercih ettiği işletim sistemidir.

**Kali Linux Ne İçin Kullanılır?** Penetrasyon testleri, sızma denemeleri, analizler ve adli bilişim.

🎯 **Terminalden kontrol:** `uname -a` komutu ile işletim sistemini öğren. 

---

## 💻 2. Kali Linux Arayüz ve Yapı

Açıldığında karşınıza terminal odaklı sade bir arayüz çıkar.

**Terminal penceresini açmak için:**
```bash
CTRL + ALT + T
```

🔎 **Terminalden bak:** `ls /usr/share` → Araç klasörleri

---

## 📁 3. Terminalde Gezinme

```bash
pwd           # Hangi klasördeyim?
ls            # Bulunduğum klasördeki içerik
cd Downloads  # Downloads klasörüne geç
rm            # Dosyaları siler 
rm -rf        # Dosyaları zorla siler 
mv            # Dosyaları taşır
cp            # Kopyalama işlemleri
sudo su       # Yetki yükseltme
```

🧠 **Mini görev:** `cd /etc && ls` komutunu dene.

---

## 🗃️ 4. Taşıma ve Kopyalama

```bash
cp dosya.txt /home/kali/Desktop     # Kopyala
mv dosya.txt Belgeler/              # Taşı
rm dosya.txt                        # Sil
```

⚠️ **Dikkat:** `rm` komutu kalıcı siler, dikkatli kullanılmalı.

---

## 🔐 5. Yetkiler ve sudo

Linux'ta root ve normal kullanıcı ayrımı vardır.

```bash
sudo nano /etc/hosts     # Yalnızca sudo ile düzenlenebilir
whoami                   # Kimim?
```

🧠 **Etkinlik:** `sudo apt update` komutunu terminalde çalıştır.

---

## 📂 6. Önemli Klasörler

| Klasör | Açıklama |
|--------|----------|
| `/etc` | Sistem ayarları |
| `/home` | Kullanıcı dizinleri |
| `/bin` | Sistem komutları |
| `/var` | Loglar |

🎯 `ls /bin | head` komutu ile sistem komutlarını gör.

---

## 📦 7. Paket Yönetimi (APT)

```bash
sudo apt update                 # Depo listesini güncelle
sudo apt install nmap -y       # Nmap kur
```

🧠 **Etkinlik:** `sudo apt install sl` ve `sl` yaz, animasyon gör!

---

## ✍️ 8. nano Editör

```bash
nano deneme.txt     # Dosya oluştur/düzenle
CTRL + X            # Çık
Y                   # Kaydet
```

✏️ **Mini görev:** Kendine bir günlük dosyası yaz.

---

## ⚙️ 9. Temel Terminal Komutları

```bash
clear               # Terminali temizle
ip a                # IP bilgisi gösterir
ping 1.1.1.1        # Ağ bağlantısı testi
passwd              # Şifre değiştirir
```

🧠 **Etkinlik:** `man ping` yazarak komutun yardım sayfasını incele.

---

## 🌐 10. Ağlara Giriş

Kali Linux'ta ağlar terminalden izlenebilir:

```bash
ip a                 # IP adresi öğren
nmcli dev status     # Ağ bağdaştırıcılarını göster
```

🧠 **Görev:** `ping google.com` ile bağlantı testi yap.

---

## 🔄 11. DNS & İsim Çözümleme

```bash
cat /etc/resolv.conf     # DNS adresini gösterir
```

🧠 **Görev:** DNS değiştirdikten sonra `ping google.com` çalışıyor mu kontrol et.

---

## 🛡️ 12. VPN Kullanımı

Terminal üzerinden VPN kullanımı için OpenVPN kullanılır.

### Adım Adım VPN Kurulumu:

1. **Ücretsiz VPN Dosyası İndirme:**
   - Google'a "free openvpn vpnbook" yazarak siteye git
   - Server kısmında ülkelere göre seçip indir

2. **Dosya Hazırlığı:**
   - İndirilen dosyaları zip'ten çıkar
   - Terminalden dosyanın bulunduğu konuma gel

3. **VPN Bağlantısı:**
   ```bash
   cd vpn_klasor_adi
   ls  # Dosyaları görüntüle
   sudo apt install openvpn -y
   sudo openvpn vpnbook-ca222-tcp80.ovpn  # Dosya adın farklı olabilir
   ```

4. **Kullanıcı Adı ve Şifre:**
   - İndirdiğin yerde parola ve şifre var
   - "Initialization completed" benzeri yazı çıkacak
   - **O terminali kapatma!** Yoksa bağlantı kopar

🧠 **Etkinlik:** Config dosyası ile sunucuya bağlanmayı dene.

---

## 📲 13. DNS Değiştirme (Elle)

DNS ayarı dosya üzerinden yapılır:

```bash
echo "nameserver 1.1.1.1" | sudo tee /etc/resolv.conf
```

🔧 **Test:** `dig google.com` veya `nslookup google.com`

---

## 🧰 14. Sorun Giderme

| Sorun | Çözüm |
|-------|-------|
| Wi-Fi çalışmıyor | `sudo systemctl restart NetworkManager` |
| DNS hatası | `/etc/resolv.conf` kontrol et |
| VPN bağlantısı yok | Farklı config dosyası dene |

---

## ⚡ Ekstra: Etik Hacker Ne Yapar?

✅ **Etik Hacker:**
- Kali Linux'ta sistemleri test eder
- **Yetkisiz erişim sağlamaz**
- İz bırakmadan çalışır
- Güvenlik açıklarını raporlar

❌ **Etik Olmayan:**
- Yetkisiz sistemlere girmek
- Zarar vermek
- Kişisel bilgileri çalmak

---

## 🎓 Sonuç

Bu eğitim ile Kali Linux'un temellerini öğrendin! Unutma ki siber güvenlik bilgilerini sadece **etik** ve **yasal** amaçlarla kullan. Her zaman izin aldığın sistemlerde test yap ve güvenlik uzmanı olmak için çalış.

**Başarılar! 🚀**