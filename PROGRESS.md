# PROGRESS.md — polyazilim_web

Bu dosya projedeki her adımı ve kararı kaydeder. Devralan yeni bir ajan/geliştirici
buradan tüm bağlamı edinebilmelidir. **Her görevden sonra güncellenmelidir.**

## Proje özeti

- **Ne:** PolyAzılım (Türk yazılım şirketi) portfolyo sitesi.
- **Stack:** Saf statik — tek `index.html` + `style.css` + `script.js`. Framework yok, build adımı yok. Coolify'da statik site olarak deploy edilecek.
- **Tasarım kuralları (katı):** Terminal/hacker estetiği; bg `#0a0a0a`, metin beyaz/gri, tek accent `#00ff9c`; her yerde JetBrains Mono (Google Fonts); arka planda çok düşük opaklıkta animasyonlu matrix karakter yağmuru (`prefers-reduced-motion`'a saygılı); keskin kenarlar, gradient yok, bol boşluk, WCAG AA kontrast, mobile-first.
- **Bölümler (Türkçe içerik):** Hero (sahte terminal + yazma efekti), Hizmetler, Projeler (kart grid), İletişim (mailto).

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

## Bekleyen işler / notlar

- [ ] İletişim e-postasını doğrula (`info@polyazilim.com` varsayıldı).
- [ ] `og:url`/`og:image` mutlak adresini canlı domainle doğrula (`https://polyazilim.com/` varsayıldı).
- [ ] Coolify'da statik site olarak deploy et (build komutu yok; kök dizin servis edilecek).
