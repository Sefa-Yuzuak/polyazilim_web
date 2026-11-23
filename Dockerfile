# Üretilmiş statik site + kendi nginx ayarımız (önbellek, gzip, güvenlik başlıkları).
# Sayfalar ve görseller depoda hazır gelir: node scripts/build.mjs ve python scripts/gorseller.py yerelde çalıştırılır.
FROM nginx:1.28-alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/site.conf /etc/nginx/conf.d/site.conf
COPY nginx/guvenlik.conf /etc/nginx/guvenlik.conf
COPY . /usr/share/nginx/html
