# Python Döngü Ödevleri - Kolaydan Zora

## 1. Sayı Sayacı (For Döngüsü) - Kolay

**Açıklama:** 1'den kullanıcının girdiği sayıya kadar olan tüm sayıları ekrana yazdıran program.

**Kullanılan Konular:** `input()`, `print()`, `int()`, `for`, `range()`

**İpucu:** `range()` fonksiyonunu kullanarak sayıları döngüde gezin.

**Örnek Çıktı:**
```
Hangi sayıya kadar saymak istiyorsunuz? 5
1
2
3
4
5
```

---

## 2. Çift Sayı Toplayıcı (While Döngüsü) - Kolay

**Açıklama:** 1'den 20'ye kadar olan çift sayıları bulup toplamlarını hesaplayan program.

**Kullanılan Konular:** `while`, `print()`, `int()`, modulo operatörü (`%`)

**İpucu:** Sayının çift olup olmadığını kontrol etmek için `%` operatörünü kullanın.

**Örnek Çıktı:**
```
1'den 20'ye kadar çift sayılar: 2, 4, 6, 8, 10, 12, 14, 16, 18, 20
Çift sayıların toplamı: 110
```

---

## 3. Not Ortalaması Hesaplayıcı (For Döngüsü) - Kolay-Orta

**Açıklama:** Kullanıcıdan kaç adet not gireceğini sorun, notları bir listeye ekleyip ortalamasını hesaplayan program.

**Kullanılan Konular:** `input()`, `print()`, `int()`, `float()`, `list`, `for`, `len()`, `sum()`

**İpucu:** Boş bir liste oluşturun ve döngüde notları ekleyin. Toplamı eleman sayısına bölün.

**Örnek Çıktı:**
```
Kaç adet not gireceksiniz? 4
1. notu girin: 85
2. notu girin: 92
3. notu girin: 78
4. notu girin: 95
Notlarınız: [85, 92, 78, 95]
Ortalama: 87.5
```

---

## 4. Şifre Kontrolü (While Döngüsü) - Orta

**Açıklama:** Kullanıcıdan şifre isteyen ve doğru şifre girilene kadar tekrar soran program. Deneme sayısını takip edin.

**Kullanılan Konular:** `input()`, `print()`, `str`, `while`, `int()`

**İpucu:** Doğru şifreyi bir değişkende saklayın ve kullanıcı girişi ile karşılaştırın.

**Örnek Çıktı:**
```
Şifrenizi girin: 1234
Yanlış şifre! Tekrar deneyin.
Şifrenizi girin: abcd
Yanlış şifre! Tekrar deneyin.
Şifrenizi girin: python123
Doğru şifre! Giriş başarılı.
Toplam deneme sayısı: 3
```

---

## 5. Faktöriyel Hesaplayıcı (For Döngüsü) - Orta

**Açıklama:** Kullanıcıdan bir sayı alın ve bu sayının faktöriyelini hesaplayan program. Hesaplama adımlarını da gösterin.

**Kullanılan Konular:** `input()`, `print()`, `int()`, `for`, `range()`, `str`

**İpucu:** 1'den başlayarak girilen sayıya kadar çarpım yapın. `range(1, n+1)` kullanın.

**Örnek Çıktı:**
```
Faktöriyelini hesaplamak istediğiniz sayı: 5
5! = 5 × 4 × 3 × 2 × 1 = 120
```

---

## 6. Kelime Frekans Sayacı (For Döngüsü) - Orta

**Açıklama:** Kullanıcıdan bir cümle alın ve cümledeki her kelimenin kaç kez geçtiğini gösteren program.

**Kullanılan Konular:** `input()`, `print()`, `str`, `dict`, `for`, `split()`, `lower()`

**İpucu:** Cümleyi kelimelere ayırın, dictionary kullanarak her kelimeyi sayın.

**Örnek Çıktı:**
```
Bir cümle girin: Python çok güzel bir dil Python öğrenmek çok eğlenceli
Kelime frekansları:
python: 2
çok: 2
güzel: 1
bir: 1
dil: 1
öğrenmek: 1
eğlenceli: 1
```

---

## 7. Asal Sayı Bulucu (While Döngüsü) - Orta-Zor

**Açıklama:** Belirli bir aralıktaki tüm asal sayıları bulan ve bir listede saklayan program.

**Kullanılan Konular:** `input()`, `print()`, `int()`, `list`, `while`, `for`, `bool`

**İpucu:** Her sayı için 2'den o sayının kareköküne kadar bölen kontrolü yapın.

**Örnek Çıktı:**
```
Başlangıç sayısı: 10
Bitiş sayısı: 30
10-30 arası asal sayılar: [11, 13, 17, 19, 23, 29]
Toplam 6 adet asal sayı bulundu.
```

---

## 8. Öğrenci Not Sistemi (For Döngüsü) - Orta-Zor

**Açıklama:** Birden fazla öğrencinin notlarını alan, her öğrenci için ortalama hesaplayan ve en yüksek ortalamayı bulan program.

**Kullanılan Konular:** `input()`, `print()`, `int()`, `float()`, `dict`, `list`, `for`, `max()`

**İpucu:** Öğrenci isimlerini anahtar, notları değer olarak dictionary'de saklayın.

**Örnek Çıktı:**
```
Kaç öğrenci var? 3
1. öğrencinin adı: Ali
Ali'nin kaç notu var? 3
1. not: 85
2. not: 90
3. not: 88
2. öğrencinin adı: Ayşe
Ayşe'nin kaç notu var? 2
1. not: 95
2. not: 92
3. öğrencinin adı: Mehmet
Mehmet'in kaç notu var? 3
1. not: 78
2. not: 82
3. not: 85

Sonuçlar:
Ali: Ortalama 87.67
Ayşe: Ortalama 93.50
Mehmet: Ortalama 81.67
En yüksek ortalama: Ayşe (93.50)
```

---

## 9. Sayı Tahmin Oyunu (While Döngüsü) - Zor

**Açıklama:** Bilgisayar 1-100 arası rastgele sayı tutar, kullanıcı tahmin eder. İpuçları vererek doğru tahmini buldurma oyunu.

**Kullanılan Konular:** `input()`, `print()`, `int()`, `while`, `import random`, `list`

**İpucu:** `random.randint()` kullanın. Tahminleri kaydedin ve "büyük/küçük" ipuçları verin.

**Örnek Çıktı:**
```
1-100 arası bir sayı tuttum. Tahmin et!
Tahmininiz: 50
Daha büyük bir sayı!
Tahmininiz: 75
Daha küçük bir sayı!
Tahmininiz: 62
Daha küçük bir sayı!
Tahmininiz: 56
Daha büyük bir sayı!
Tahmininiz: 59
Tebrikler! 5 tahminde bildiniz.
Tahminleriniz: [50, 75, 62, 56, 59]
```

---

## 10. Matris İşlemleri (For Döngüsü) - Zor

**Açıklama:** Kullanıcıdan 2 adet 3x3 matris alın, bu matrisleri toplayan ve çarpan program.

**Kullanılan Konular:** `input()`, `print()`, `int()`, `list`, `for`, iç içe döngüler, 2 boyutlu listeler

**İpucu:** İç içe for döngüleri kullanın. Matris çarpımı için üçlü döngü gerekir.

**Örnek Çıktı:**
```
İlk matrisin elemanlarını girin:
[0,0]: 1
[0,1]: 2
[0,2]: 3
[1,0]: 4
[1,1]: 5
[1,2]: 6
[2,0]: 7
[2,1]: 8
[2,2]: 9

İkinci matrisin elemanlarını girin:
[0,0]: 9
[0,1]: 8
[0,2]: 7
[1,0]: 6
[1,1]: 5
[1,2]: 4
[2,0]: 3
[2,1]: 2
[2,2]: 1

Matris Toplama:
[[10, 10, 10],
 [10, 10, 10],
 [10, 10, 10]]

Matris Çarpma:
[[30,  24,  18],
 [84,  69,  54],
 [138, 114, 90]]
```