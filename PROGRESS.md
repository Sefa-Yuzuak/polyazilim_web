# PROGRESS.md — polyazilim_web

Bu dosya projedeki her adımı ve kararı kaydeder. Devralan yeni bir ajan/geliştirici
buradan tüm bağlamı edinebilmelidir. **Her görevden sonra güncellenmelidir.**

## Proje özeti

- **Ne:** PolyAzılım (Türk yazılım şirketi) portfolyo sitesi.
- **Stack:** Derleme bağımlılığı olmayan statik HTML/CSS/JS. `node scripts/build.mjs` ana sayfayı, proje ve hizmet sayfalarını, sitemap ve llms.txt dosyalarını üretir. Üretilen dosyalar depoda tutulur; Coolify mevcut static düzeniyle kökten yayınlar.
- **Güncel tasarım (11.11.2026):** Kullanıcının yenileme talebiyle eski terminal/matrix teması kaldırıldı. Koyu yeşil, lime ve kırık beyaz; Space Grotesk başlıklar ve Manrope metin; büyük gerçek proje görselleri, erişilebilir menü ve hareket azaltma desteği.
- **Bölümler:** Görsel proje vitrini, 6 seçili çalışma, 4 hizmet, yaklaşım/süreç, SSS ve e-posta iletişimi. Ayrı portföy sayfası ve 11 proje detay sayfası, 4 hizmet detay sayfası.

## Günlük

### 2026-07-26 — Proje kurulumu (Claude)

- Repo dizini oluşturuldu: `~/Desktop/polyazilim_web`.
- `index.html` yazıldı:
  - Hero: sahte terminal penceresi; yazma efektiyle `> polyazilim --init` yazılıyor, ardından `[OK] sistem hazır` ve tagline `web • otomasyon • yönetim panelleri` görünüyor.
  - Hizmetler: 7 hizmet (web siteleri, otomasyon sistemleri, yönetim panelleri, e-ticaret entegrasyonları Trendyol/Koçtaş, sosyal medya otomasyonu, Telegram botları, 3D sanal showroom).
  - Projeler: 7 kart (scy, actorstudio, aibell, artolyemiz, misyonhukuk, alacanhukuk, telegram-bot). Her kartta `assets/screenshots/<isim>.png` görseli + link + kısa açıklama.
  - İletişim: `mailto:info@polyazilim.com` butonu. **Karar:** Gerçek e-posta adresi verilmediği için `info@polyazilim.com` varsayıldı — doğrulanmalı/değiştirilmeli.
- `style.css` yazıldı: CSS değişkenleri (`--bg`, `--accent` vb.), mobile-first grid (640px'de 2 sütun, 960px'de 3 sütun), keskin kenarlar (border-radius yok), `prefers-reduced-motion` için global animasyon kapatma. **Karar:** Soluk gri metin `#a8a8a8` seçildi (WCAG AA, #0a0a0a üzerinde ~8.7:1 kontrast).
- `script.js` yazıldı: hero yazma efekti + canvas matrix yağmuru (~12.5fps, `rgba(0,255,156,0.10)` çok düşük opaklık). `prefers-reduced-motion` aktifse: komut anında yazılı gösterilir, canvas DOM'dan kaldırılır.
- Ekran görüntüsü placeholder'ları: PowerShell + System.Drawing ile 800×500 gri PNG'ler üretildi (`assets/screenshots/`). **Karar:** Gerçek görüntüler gelene kadar site bozuk görsel ikonu göstermesin diye boş kutu yerine gerçek PNG dosyaları üretildi; aynı isimle üzerine yazılarak değiştirilecekler.
- Git: `git init`, ilk commit (`ed89a38`), branch `main` olarak adlandırıldı.
  - **Karar:** Makinede global git kimliği yoktu; repo-local kimlik olarak GitHub hesabı `Sefa-Yuzuak` + noreply e-postası ayarlandı.
- GitHub: `gh repo create polyazilim_web --public --source . --push` ile repo oluşturuldu ve push edildi.
  - Repo: https://github.com/Sefa-Yuzuak/polyazilim_web
  - **Karar:** Görünürlük belirtilmemişti; herkese açık portfolyo içeriği olduğu için `--public` seçildi (gerekirse `gh repo edit --visibility private` ile değiştirilebilir).
- PROGRESS.md güncellendi ve push edildi.

### 2026-07-26 — Gerçek ekran görüntüleri bağlandı (Claude)

- Kullanıcı `assets/screenshots/` içine gerçek görselleri attı: `aibell.png`, `artolyemiz.png`, `misyonhukuk.png` (placeholder'ların üzerine) + yeni dosyalar `scy.webp`, `actorstudio.webp`, `alacan.webp` (eski `scy.png` ve `actorstudio.png` placeholder'ları silindi).
- `index.html` güncellendi: scy, actorstudio ve alacanhukuk kartları `.webp` dosyalarını gösterecek şekilde düzeltildi. **Karar:** `alacan.webp`, alacanhukuk.com kartının görseli olarak yorumlandı; artık kullanılmayan `alacanhukuk.png` placeholder'ı silindi.
- `telegram-bot.png` hâlâ gri placeholder.

### 2026-07-26 — Görsel/SEO/hover iyileştirmeleri (Claude)

- `telegram-bot.png` yeniden üretildi (PowerShell + System.Drawing, 800×500, ~10KB): terminal estetiğinde sohbet günlüğü — `> telegram-bot --start`, `[✓] bot online`, `[✓] webhook bağlandı`, `[✓] komut: /durum`, `[✓] mesaj işlendi` vb. Artık placeholder değil, kasıtlı bir görsel.
- Görsel optimizasyonu:
  - `aibell.png` (569KB, 1280×610) → `aibell.jpg` (45KB, JPEG q82) dönüştürüldü.
  - **Tespit:** `artolyemiz.png` ve `misyonhukuk.png` aslında yanlış uzantılı WebP dosyalarıydı (RIFF/WEBP imzalı; GDI+ bu yüzden "OutOfMemory" hatası veriyordu). Zaten sıkıştırılmış oldukları için `.webp` uzantısına yeniden adlandırıldılar.
  - Tüm proje görselleri artık ≤84KB. `loading="lazy"` hepsinde mevcuttu; alt metinleri daha açıklayıcı Türkçe ifadelerle güncellendi.
  - **Not:** Makinede magick/cwebp/ffmpeg/pngquant yok; sıkıştırma .NET System.Drawing ile yapıldı.
- Kart hover overlay: görsel üzerine `.card-media` sarmalayıcı + `.card-overlay` eklendi. Hover/focus-within'de koyu overlay açılıyor, `$ cat proje.txt` steps() animasyonuyla yazılıyor (0.8s), ardından accent yeşili 1 satırlık özet beliriyor. `aria-hidden="true"` (kart gövdesindeki açıklamanın kopyası). Reduced-motion: global kuralın kapsamadığı `animation-delay`/`transition-delay` da 0.01ms'e indirildi — her şey anında görünür.
- Favicon: inline SVG data URI (`>` sembolü, #00ff9c / #0a0a0a).
- SEO: title `PolyAzılım — Web, Otomasyon, Yönetim Panelleri`; Türkçe meta description genişletildi; `og:type/url/locale/title/description/image` eklendi. **Karar:** `og:image` ve `og:url` için `https://polyazilim.com/` mutlak adresi varsayıldı — canlı domain farklıysa güncellenmeli. `lang="tr"` zaten mevcuttu.

- Commit sırasında tespit: kullanıcı `assets/screenshots/logo.webp` eklemiş (PolyAzılım logosu olduğu tahmin ediliyor); commit'e dahil oldu ama sitede henüz kullanılmıyor — bekleyen işlere eklendi.

### 2026-07-26 — Logo header'a eklendi (Claude)

- Kullanıcı kararı: header'da yalnızca logo kullanılacak (metin logo kaldırıldı).
- `logo.webp`, `assets/screenshots/` → `assets/logo.webp` konumuna taşındı (git mv).
- Header'daki `poly**azilim**_` metin logosu `<img class="logo-img" src="assets/logo.webp" alt="PolyAzılım" height="36">` ile değiştirildi.
- **Karar:** Logo siyah "POL YAZILIM" yazısı açık zemin üzerinde — koyu sitede görünmez olurdu. CSS ile `filter: invert(1)` + `mix-blend-mode: screen` uygulandı: yazı beyaza döner, zemin karışımla kaybolur (opak/şeffaf her iki durumda da çalışır).
- **Not:** Logodaki marka "POL YAZILIM" olarak yazıyor, site metinlerinde ise "PolyAzılım" kullanılıyor — tutarlılık kullanıcıyla netleştirilebilir.

### 2026-07-26 — apple-touch-icon + Coolify deploy hazırlığı (Claude)

- **Not (PART A):** Kullanıcının yeni istemi logoyu "metin yanına" koymayı tarif ediyordu; ancak bir önceki oturumda kullanıcı soruya "yalnızca logo" cevabı vermişti ve bu uygulanmış durumda (`assets/logo.webp`, invert + mix-blend-mode fix). Çelişki kullanıcıya raporlandı; mevcut "yalnızca logo" hali korundu.
- `apple-touch-icon` eklendi: `assets/apple-touch-icon.png` (180×180, favicon ile aynı tasarım: #0a0a0a zeminde #00ff9c ">"). **Karar:** Apple touch icon WebP/SVG desteklemez ve GDI+ webp okuyamadığından logo rasterize edilemedi; favicon ile tutarlı ">" simgesi üretildi.
- **Coolify (PART B) — TOKEN BEKLİYOR:**
  - Coolify `http://127.0.0.1:8000` üzerinde çalışıyor; `/api/health` = OK.
  - `/api/v1/*` uçları 401 Unauthenticated dönüyor; ortamda/konfigürasyonda API token yok.
  - Kullanıcıdan Coolify UI → **Keys & Tokens → API tokens** → yeni token oluşturup paylaşması istendi (write/deploy yetkili). Token gelince: sunucu public IP raporlanacak (polyazilim.com DNS A kaydı için), statik app oluşturulacak (kaynak: https://github.com/Sefa-Yuzuak/polyazilim_web, branch main, build yok, kök dizin), domain polyazilim.com + www yönlendirmesi, Let's Encrypt, push'ta otomatik deploy, ilk deploy tetiklenecek.

### 2026-07-26 — artolyemiz.com ACME/SSL arıza teşhisi (Claude)

- Kullanıcı, coolify-proxy (Traefik) loglarında artolyemiz.com için ACME hataları paylaştı (2026-07-25 06:43–06:53): `unable to obtain ACME certificate`, `invalid authorization`, challenge yanıtı `404`, doğrulama IP'si `2a06:41c0:1:24::1e7` (IPv6).
- **Kök neden:** Alan adında Coolify sunucusuna ait olmayan bayat bir AAAA (IPv6) kaydı vardı; Let's Encrypt doğrulamayı IPv6 üzerinden yapıp yanlış sunucudan 404 aldı.
- **Çözüm zaten uygulanmış:** DNS bölgesi 2026-07-25'te güncellenmiş (SOA seri `2026072502`), AAAA kaydı kaldırılmış. Traefik'in sonraki denemesi başarılı olmuş: mevcut sertifika CN=artolyemiz.com, bitiş **2026-10-23**, zincir doğrulaması geçiyor (`curl --resolve` ile teyit edildi, HTTP 200). **Sunucuda işlem gerekmedi.**
- Yan bulgular:
  - **Coolify sunucusu public IP: `70.40.138.238`** (known_hosts + artolyemiz/misyonhukuk/alacanhukuk A kayıtlarının tamamı bu IP). polyazilim.com DNS A kaydı için kullanılacak IP bu.
  - Bu makinenin bulunduğu ağın DNS'i (kurumsal ağ) bu alan adlarına NXDOMAIN döndürüyor — testler DoH (cloudflare-dns.com) ve `curl --resolve` ile yapıldı. Yerel tarayıcı testlerinde alan adı açılmazsa sebep bu olabilir; sunucu sorunu değil.
  - Bu makineden sunucuya SSH denemesi izin sınıflandırıcısı tarafından engellendi (root@70.40.138.238); teşhis SSH'sız tamamlandı.
- artolyemiz.com A kaydı → `70.40.138.238`, AAAA yok; `www.artolyemiz.com` kaydı tanımlı değil (istenirse eklenebilir).

### 2026-07-26 — polyazilim.com DNS doğrulandı; deploy hâlâ token bekliyor (Claude)

- Kullanıcı DNS'i ayarladı. DoH ile doğrulandı (yerel DNS filtreli olduğundan cloudflare-dns.com üzerinden):
  - `polyazilim.com` A → `70.40.138.238` ✓, AAAA yok ✓ (SOA seri `2026072602`)
  - `www.polyazilim.com` CNAME → `polyazilim.com` → aynı IP ✓, AAAA yok ✓
- Coolify API hâlâ 401 (token yok); ortamda/masaüstünde token dosyası bulunamadı. SSH bu makineden izin sistemince engelli. **Statik uygulama oluşturma, domain/SSL, otomatik deploy ve ilk deploy adımları API token gelene kadar bloke.**
- Masaüstündeki `sunucu taşıma hafıza dosyası.md` incelendi (token yok). **Bulgu:** Monitoring bildirimleri `polyazilim@gmail.com` adresine gidiyor — sitedeki iletişim mailto'su `info@polyazilim.com` varsayımıydı; kullanıcıya soruldu.

### 2026-07-26 — CANLI: Coolify deploy tamamlandı (Claude)

- Kullanıcı API token verdi (güvenlik gereği bu dosyaya YAZILMADI; Coolify UI → Keys & Tokens'tan yönetiliyor).
- İletişim e-postası kullanıcı kararıyla `polyazilim@gmail.com` yapıldı (commit `4571063`).
- Coolify üzerinden oluşturulan uygulama:
  - Sunucu: **cloud 3** (`xi5tjz3mtd8qxrlt4x7nfq1j`, IP `70.40.138.238`), proje: "My first project" / production.
  - Uygulama: **polyazilim-web** (`e64kcc076ujw88698xgy2p32`), build pack **static** (nginx:alpine), kaynak `Sefa-Yuzuak/polyazilim_web` branch `main`, base directory `/`, build komutu yok.
  - Domainler: `https://polyazilim.com` + `https://www.polyazilim.com`, Let's Encrypt otomatik.
- İlk deploy: `t537l1fmps2ympnzhdxp7oh6` → **finished** (~20 sn).
- Dış doğrulama (`curl --resolve` ile, yerel DNS filtreli):
  - `https://polyazilim.com` → 200, sertifika zinciri geçerli (ssl_verify=0) ✓
  - `https://www.polyazilim.com` → 200, sertifika geçerli ✓
  - HTTP → HTTPS 302 yönlendirmesi her ikisinde ✓
  - İçerik doğru: yeni title, logo, `mailto:polyazilim@gmail.com` ✓
- **Otomatik deploy KURULAMADI:** Coolify paneli dışarıdan erişilebilir değil — `70.40.138.238:8000` kapalı (timeout), panel için public FQDN yok (coolify/panel/deploy/cloud.polyazilim.com tanımsız). GitHub webhook'unun ulaşacağı adres olmadığından webhook kurmak anlamsız olurdu. Seçenekler:
  1. (Önerilen) `coolify.polyazilim.com` A kaydı → 70.40.138.238 açılıp Coolify Settings → Instance Domain ayarlanırsa panel Traefik+LE arkasına girer; sonra GitHub webhook'u `gh` ile kurulabilir.
  2. Alternatif: her push sonrası manuel tetikleme: `POST /api/v1/deploy?uuid=e64kcc076ujw88698xgy2p32` (Bearer token ile, tünel üzerinden 127.0.0.1:8000).
- **Şimdilik kural: push sonrası deploy'u API ile manuel tetikle** (bu oturumda da böyle yapıldı).

## Bekleyen işler / notlar
- [ ] Otomatik deploy: `coolify.polyazilim.com` DNS + Instance Domain ayarı sonrası GitHub webhook kur (yukarıdaki not).
- [x] İletişim e-postası: `polyazilim@gmail.com` olarak güncellendi.
- [x] `og:url`/`og:image`: canlı domain `https://polyazilim.com/` ile uyumlu.
- [x] Coolify'da statik site deploy edildi; **site CANLI**.

### 2026-11-11 — Portföy ve SEO/GEO yenilemesi

- Başlangıç commit’i a4362fb1b33b3c6b7f2bbb9d1bcbbaf6aa474082; canlı uygulama e64kcc076ujw88698xgy2p32 (id 9), dal main, Coolify static.
- Terminal ve matrix görünümü tamamen değiştirildi. Gerçek proje görselleri tarayıcı çerçeveleriyle sunuldu; büyük proje kartları, mobil menü, kategori filtreleri, süreç, hizmet ve SSS alanları eklendi.
- 17 indekslenebilir sayfa: ana sayfa, proje listesi, 11 proje ve 4 hizmet sayfası. Ek 404.html noindex.
- Her Telden portföye eklendi; kapak fotoğrafının gerçek ürün fotoğrafı olduğu belirtildi. Güvenlik ekranında örnek veri, Telegram görselinde temsili akış, Actor Studio ve AIBell görsellerinde arşiv niteliği açıklandı. Açılmayan Actor Studio yayına giden bağlantısı kaldırıldı; çalışma arşiv olarak korundu.
- Artölyemiz kapsamı mevcut canlı siteye göre 3D baskı/figür/maket olarak düzeltildi. AIBell için doğrulanmamış AI işlevleri anlatılmadı. Satış artışı, müşteri sayısı, değerlendirme puanı veya başarı oranı uydurulmadı.
- Organization, WebSite, WebPage, Service, CreativeWork, BreadcrumbList, CollectionPage/ItemList ve görünür içerikle aynı FAQPage verileri eklendi. Müşteri alan adlarını şirketin sameAs kimliği gibi gösteren eski işaretleme kaldırıldı.
- Canonical, açıklamalar, sosyal paylaşım etiketleri, büyük görsel önizlemesi, sitemap ve llms.txt düzenlendi. Açık adres/telefon/konum uydurulmadı; mevcut e-posta, GA4 ve site doğrulama kimlikleri korundu.
- Tasarım araştırması: https://www.awwwards.com/websites/portfolio/ (büyük proje sunumu ve tipografi). SEO/GEO: https://developers.google.com/search/docs/appearance/ai-features . Sıralama/AI görünürlük garantisi verilmez.
- Kaynak üretimi scripts/build.mjs içinde. Düzenleme sonrası node scripts/build.mjs çalıştırılmalı; doğrudan üretilen sayfalardaki değişiklikler sonraki üretimde silinir.
- Kontrol: 18 HTML sayfasında 302 iç bağlantı ve 15 farklı yerel görsel/stil/script bağlantısı; tek H1, dil, benzersiz kimlikler, canonical ve JSON-LD/SSS eşleşmesi başarılı. JS sözdizimi ve git diff kontrolü başarılı. CSS parser ortamda yok; tarayıcı önizleme host’u kullanılamıyor. Mobil/masaüstü görsel ve etkileşim doğrulaması tamamlanmadı.
- Geri alma: Coolify’da a4362fb1b33b3c6b7f2bbb9d1bcbbaf6aa474082 commit’ini rollback=true ile dağıtmak. Mevcut imajın sunucuda varlığı doğrulandı; mevcut uygulama statik ve bağlı diski yok.
- Yayın öncesi HTTP ve kaynak bağlantı kontrolleri tamamlanır; yayından sonra yeni sayfalar, statik dosyalar, JSON-LD ve çalışan commit kontrol edilir.
- HTTP kontrolü: 17 sayfa ve 15 yerel varlık 200; başlık/açıklamalar benzersiz, JSON-LD geçerli, GA4/GSC kimlikleri başlangıçla aynı. Üretim deterministik. PHP önizlemesi bilinmeyen yolda ana sayfaya düşerek 200 verdi; bu geliştirme sunucusu davranışıdır. Gerçek 404 yanıtı üretimdeki nginx üzerinde kontrol edilecek; yerel 404 testi geçti sayılmadı.

### 2026-11-11 — Yeni portföy CANLI

- Kaynak commit: 33f19188c4ffb9f9c76ee71b3d31e81a92cde747, GitHub main dalına gönderildi.
- Push sonrası otomatik dağıtım kaydı oluşmadığı görüldü. Mevcut Coolify uygulama dağıtım fonksiyonu kullanılarak aynı commit sıraya alındı; yeni kimlik bilgisi üretilmedi.
- Dağıtım cc61bddf-0994-4833-a4c3-748beab24cad: finished. Bitiş 11.11.2026 19:46:45 (Europe/Istanbul).
- Çalışan konteyner: e64kcc076ujw88698xgy2p32-20261111T164603. İmaj etiketi 33f19188c4ffb9f9c76ee71b3d31e81a92cde747, durum running.
- Dış doğrulama: 17 sayfa, 15 statik varlık, sitemap.xml, robots.txt ve llms.txt başarılı. 17 benzersiz başlık, geçerli JSON-LD ve yeni ana sayfa metni doğrulandı.
- Bilinmeyen üretim adresi gerçek 404 döndürdü. www.polyazilim.com 301 yönlendirmesi mevcut.
- Canlı uygulama dışındaki sitelerin, proxy, ağ veya sunucu hizmetlerinin ayarları değiştirilmedi. Veri diski veya kullanıcı verisi taşıma gerekmedi.
- Bu son kayıt belgelendirmedir; uygulama kodunu değiştirmez. Tarayıcı önizleme host’una erişilemediğinden görsel/mobil etkileşim QA sınırı devam ediyor. Arama motorlarının yeniden taraması ve SEO/GEO görünürlük sonucu ayrıca ölçülmedi.

### 2026-11-11 — Görsel oranları ve güvenlik projesi bağlantıları
- Kullanıcı ana sayfa görsellerinin ölçeksiz göründüğünü belirtti ve güvenlik projesine bağlantı verilmemesini istedi.
- Eğik/üst üste hero ekranları kaldırıldı; tek düz SCY proje görseli kullanıldı. Kartların dış alanı 4:3, iç görsel alanı 8:5 ve object-fit:contain olarak düzenlendi; görsel esnetme/kırpma kaldırıldı. Dar ekranlarda aşırı iç boşluk oluşturan özel fotoğraf stilleri temizlendi.
- Tüm görsellerin width/height değerleri gerçek dosya ölçülerine göre düzeltildi. CSS önbellek parametresi güncellendi.
- Güvenlik projesi ana sayfa, portföy ve ilgili hizmet alanlarında bağlantısız kart olarak korunuyor. Ayrıntı sayfası kaldırıldı; sitemap, ItemList ve llms.txt bağlantıları temizlendi.
- Kontrol: 17 üretilen HTML dosyasında güvenlik projesine href/yapılandırılmış URL bulunmadı; sitemap/llms bağlantısı yok; üst üste hero sınıfları yok; üretim ve JavaScript sözdizimi başarılı.
- Risk: ortak kart görsel oranı diğer proje kartlarını da etkiler. Geri alma: önceki çalışan 33f19188c4ffb9f9c76ee71b3d31e81a92cde747 imajını Coolify’da dağıtmak. Yayın sonrası yeni ana sayfa/CSS ve kaldırılan proje sayfasının 404 yanıtı kontrol edilecek. Tarayıcı önizleme erişim sınırı devam ediyor.

### 2026-11-11 — Her Telden gerçek ekran görüntüsü
- Kullanıcı portföy kartında ürün fotoğrafı yerine sitenin ekran görüntüsünü istedi.
- Herkese açık canlı adresin gerçek ekran görüntüsü Thum.io URL screenshot API üzerinden alındı; 1200x750. Görsel açılıp menü, başlık, CTA ve ürün fotoğrafını birlikte içerdiği doğrulandı. Görsel AI ile üretilmedi veya yeniden tasarlanmadı.
- assets/screenshots/her-telden-site.png eklendi; eski ürün fotoğrafı kaldırıldı. Ana sayfa, portföy ve proje detayındaki görsel/alt metin/ölçüler ve schema adresleri yeniden üretildi.
- Ürün fotoğrafına özel detail-cake çerçevesi kaldırıldı. Proje notu gerçek site ekran görüntüsü ve çekim tarihini belirtiyor.
- Risk yalnız görsel ve sunumuyla sınırlı; geri alma önceki d4d13564e2e94f710e0cd5e3ec7815a3bc0c8e36 imajını yeniden dağıtmak. Gerçek görsel ölçüsü, eski görsel referanslarının temizliği ve üretim sözdizimi doğrulandı; yayında yeni dosya ve HTML referansı kontrol edilir.
