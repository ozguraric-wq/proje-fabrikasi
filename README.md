# Proje Fabrikası — Vizyon Eskişehir 2036

V4 Konsept ve Uygulama Ekleri belgesine dayalı, Türkçe sunum sitesi.

Bu paket sunum demosudur. Başvuru toplamaz, kişisel veri saklamaz ve bir başvuru yönetim sistemi olduğunu iddia etmez. Pilot sayı ve süreler V4 çalışma taslağındaki önerilerdir.

## İçerik

14 içerik bölümü; üç proje kaynağı ve üç çıktı şeması; 14 ilçe kapsamı; yedi aşamalı etkileşimli üretim döngüsü; görev ve zaman paylaşımı; Bir Fikrim Var işleyişi; dosya standardı ve hazırlık seviyeleri; finansman yolları; puanlama ağırlıkları; başvuru ve teslim kontrolleri; izleme ve sürdürülebilirlik; 90 günlük pilot ve 14 ekin açıklamaları.

## Dosyalar

- `dist/index.html`: Sunumun bütün içeriği. Çerçeve veya kurulum gerektirmeyen statik site.
- `dist/assets/site.css`: Kurumsal görünüm, masaüstü mega menü, mobil açılır yan menü, duyarlı yerleşim ve yazdırma stilleri.
- `dist/assets/site.js`: Menü, klavye ile sekme gezinmesi, ilgili ekin açılması ve sayfa başına dönüş.
- `dist/assets/*.webp`: Yerel, farklı ekran boyutları için optimize edilmiş görseller. Masaüstü görselinin büyük sürümü mobilde indirilmez.
- V4 Word ve PDF dosyalarının herkese açık paylaşımı açık kullanıcı onayı beklemektedir. Bu sürümde belge dosyaları ve indirme bağlantıları yayımlanmaz; webde 14 ekin kullanım açıklamaları bulunur.
- `.github/workflows/pages.yml`: GitHub Pages yayın akışı.

## GitHub Pages yayını

1. Bu proje için kullanılacak GitHub deposuna paketin **içeriğini**, `.github` klasörü dahil, ekleyin. `dist` klasörü depo kökünde kalmalıdır.
2. Ana dalı `main` olarak kullanın. Depoda **Settings → Pages → Build and deployment → Source → GitHub Actions** seçin.
3. Ana dala gönderim, yayın akışını başlatır. Gerekirse **Actions → Proje Fabrikası demo yayını → Run workflow** çalıştırın.
4. Yayın bağlantısı yalnızca başarılı Actions çalışmasındaki `github-pages` ortamı ve Pages ayarları üzerinden alınmalıdır.

GitHub Pages henüz bu paket için etkinleştirilmiş veya başarılı yayın doğrulanmış değildir. Bir canlı adres varsayılmamıştır.

[GitHub'ın resmî Pages iş akışı rehberi](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages) esas alınmıştır. Yalnızca `dist` yayımlanır; paket meta belgeleri ziyaretçilere sunulmaz.

## Yerel inceleme

`dist/index.html` güncel bir tarayıcıda açılabilir; CSS, JavaScript, görseller ve belgeler göreli adreslerle çalışır. İnternet bağlantısı yalnızca görsel lisans kaynaklarına gidildiğinde gerekir. Teknik kurulum veya harici font/CDN bağımlılığı yoktur.

## İçerik güncellemesi

Kaynak V4 belgesi değiştiğinde web metni, PDF sayfa bağlantıları ve indirilebilir Word/PDF birlikte güncellenmelidir. Mevcut pilot hedefleri gerçekleşmiş başarı verilerine çevirmeyin. Yeni başvuru veya kurum entegrasyonu eklenmesi bu sunumun kapsamı dışındadır.

## Görsel kullanım

`ASSET_SOURCES.md` atıf ve lisans bilgilerini içerir. Fotoğrafların CC BY-SA 4.0 koşulları korunmalıdır. Kurumsal logolar özgün kullanıcı varlıklarından, tasarımları değiştirilmeden web boyutlarına dönüştürülmüştür.
