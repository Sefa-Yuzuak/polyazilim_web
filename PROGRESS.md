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
- Git: `git init`, ilk commit, GitHub'da `polyazilim_web` reposu oluşturulup push edildi (detay aşağıdaki güncellemede).

## Bekleyen işler / notlar

- [ ] Gerçek ekran görüntülerini `assets/screenshots/` içine at (dosya adları: `scy.png`, `actorstudio.png`, `aibell.png`, `artolyemiz.png`, `misyonhukuk.png`, `alacanhukuk.png`, `telegram-bot.png` — 800×500 veya 8:5 oran önerilir).
- [ ] İletişim e-postasını doğrula (`info@polyazilim.com` varsayıldı).
- [ ] Coolify'da statik site olarak deploy et (build komutu yok; kök dizin servis edilecek).
