# Wi-Fi Sızma Testi (Kablosuz Ağlara Saldırı)

**Yazar:** Oguzhan Ozdemir  
**Tarih:** 10 Mart 2023  
**Okuma Süresi:** 3 dakika

![Wi-Fi](https://miro.medium.com/v2/resize:fit:1200/1*BJAZcXEK3BUyjFLfcHSsZA.png)

**UYARI : Bu çalışmayı kendi Wi-Fi Ağıma ve cihazıma yapacağım.**

Bir önceki yazmış olduğum **"Deauth Attack Nedir ? Kali Linux ile Nasıl Yapılır ?"** yazıma göz atmanızı tavsiye ediyorum. Bu yazım devam niteliğindedir.

**4 Adet** kullanacağımız araç mevcuttur.

## 1. airmon-ng

Kablosuz Ağların içerisinde dönen paketleri yakalamamız için Ağ kartımızı monitör moda almamız için **airmon-ng** kullanılmaktadır.

```bash
> iwconfig
> airmong-ng start wlan0
> iwconfig
```

![wlan0mon > Monitor Mode](https://miro.medium.com/v2/resize:fit:1200/1*YZu7UBxF5pJUDMjFH6Dmgw.png)

## 2-3. airodump-ng

Etrafımızdaki Cihazları (Modem) tespit etmek için **airodump-ng** kullanılmaktadır.

```bash
> airodump-ng wlan0mon
> ctrl + c
```

![bssid | ch](https://miro.medium.com/v2/resize:fit:1200/1*_Wl9LKOx1XfV9-KYkPcHHw.png)

Yakalanan paketleri "Wi-Fi" dosyasına kaydedilmesini gerçekleştireceğiz. Bu işlem arka tarafta çalışmaya devam ederken, **aireplay-ng** ile de **WPA handshake**'i yakalamamız için saldırıya başlıyoruz. **WPA handshake** eşleştiğinde ctrl + c ile işlemi sonlandırıyoruz.

```bash
> airodump-ng --bssid 98:0D:67:5B:86:49 -c 8 -w Wi-Fi wlan0mon
```

![2 ve 3 aynı anda gerçekleştirilmelidir. WPA handshake'i yakalamak için.](https://miro.medium.com/v2/resize:fit:1200/1*-XD7_psqWpxd-EqELrekhw.png)

## 3-2. aireplay-ng

--deauth paketleri göndererek, hedefteki cihazı (e.x = telefon) ağdan düşürüyor ve cihaz tekrardan bağlanmaya çalıştığında (elle ağa bağlanılması tavsiyedir) **WPA handshake**'i yakalamış oluyoruz. Buda bizi bir sonraki adıma yönlendirmek için kullanılan bir DOS saldırıdır. **Başka bir CLI ekranında bu komut satırını çalıştırıyoruz.**

![aireplay-ng deauth attack](https://miro.medium.com/v2/resize:fit:1200/1*-XD7_psqWpxd-EqELrekhw.png)

## 4. aircrack-ng

airodump-ng üzerinden dinleyip kayıtlamış olduğumuz dosyayı kullanarak şifre kırma saldırısını **aircrack-ng** ile gerçekleştireceğiz. cap uzantılı dosyayı kullanarak şifre çözümleme işlemini gerçekleştireceğiz.

Password denemesi için Github da bulunan rockyou.txt dosyasını kullanacağım. Fakat benim Wi-Fi şifrem Complex Password olduğu için bunu bulamayabilir. Bu yüzden rockyou.txt dosyasını ekstra editleyip kendi Wi-Fi şifremi içerisine ekledim.

-w : dosya uzantısı

```bash
> ls
> locate rockyou.txt
> aircrack-ng -0 -w /usr/share/wordlists/rockyou.txt wifihack-01.cap
```

![aircrack-ng Wi-Fi-01.cap](https://miro.medium.com/v2/resize:fit:1200/1*_yTQrj5fFEjD1forpAJLVA.png)

![KEY FOUND!](https://miro.medium.com/v2/resize:fit:1162/1*XILojjPJ11195WLsRHig2A.png)

İşlemler bittikten sonra Ağ kartımızı Manage Mod'a çekiyoruz.

![wlan0 > Manage Mode](https://miro.medium.com/v2/resize:fit:1200/1*1IaW-kkO2r4YyTx-PutX6w.png)

**Umarım iyi anlatabilmişimdir. Eksik ya da yanlış bir yer varsa yorum yapmayı ve belirtmeyi unutmayınız.**

**Teşekkür ederim :)**

---

**Etiketler:** Kali Linux, Wifihacking, Bruteforce Attack, Networking