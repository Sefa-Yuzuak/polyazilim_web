"""Proje ekran görüntülerinden duyarlı AVIF + WebP sürümleri üretir.

Kaynak : kaynak/ekran/*.{png,jpg,webp}  (yayına girmez, .dockerignore)
Çıktı  : assets/img/<ad>-<genişlik>.<özet>.{avif,webp}  (adında içerik özeti var → nginx'te 1 yıl önbellek)
Ölçüler: scripts/gorsel-olcu.json → build.mjs srcset/width/height'i buradan okur.

Kullanım: python scripts/gorseller.py   (Pillow >= 12, AVIF desteğiyle)
Sonra:    node scripts/build.mjs
"""
from __future__ import annotations

import hashlib
import json
from pathlib import Path

from PIL import Image, ImageFilter, features

KOK = Path(__file__).resolve().parent.parent
KAYNAK = KOK / "kaynak" / "ekran"
CIKTI = KOK / "assets" / "img"
OLCU = KOK / "scripts" / "gorsel-olcu.json"
GENISLIKLER = (480, 640, 800, 1200, 1600)


def uret() -> None:
    if not features.check("avif"):
        raise SystemExit("Bu Pillow kurulumunda AVIF desteği yok.")
    CIKTI.mkdir(parents=True, exist_ok=True)
    olcu: dict[str, dict] = {}
    yazilan: set[str] = set()
    for dosya in sorted(KAYNAK.iterdir()):
        if dosya.suffix.lower() not in {".png", ".jpg", ".jpeg", ".webp"}:
            continue
        ozet = hashlib.sha256(dosya.read_bytes()).hexdigest()[:8]
        with Image.open(dosya) as ham:
            resim = ham.convert("RGB")
        g0, y0 = resim.size
        genislikler = [g for g in GENISLIKLER if g < g0] + [min(g0, GENISLIKLER[-1])]
        surumler = []
        for g in genislikler:
            y = round(y0 * g / g0)
            kucuk = resim if g == g0 else resim.resize((g, y), Image.LANCZOS).filter(ImageFilter.UnsharpMask(radius=0.6, percent=40, threshold=2))
            for uzanti, ayar in (("avif", {"quality": 60, "speed": 4}), ("webp", {"quality": 80, "method": 6})):
                ad = f"{dosya.stem}-{g}.{ozet}.{uzanti}"
                hedef = CIKTI / ad
                if not hedef.exists():
                    kucuk.save(hedef, uzanti.upper(), **ayar)
                yazilan.add(ad)
            surumler.append(g)
        olcu[dosya.name] = {"ad": dosya.stem, "ozet": ozet, "genislik": g0, "yukseklik": y0, "surumler": surumler}
        print(f"{dosya.name}: {g0}x{y0} -> {surumler}")
    for eski in CIKTI.iterdir():
        if eski.name not in yazilan:
            eski.unlink()
    OLCU.write_text(json.dumps(olcu, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")


if __name__ == "__main__":
    uret()
