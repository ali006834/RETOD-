İkas Cors'u sunucu da deploy ettiğimde sildiği için bu proxy yazdım.

Bu proxy sayesinde CORS hatası almadan Instagram Graph API’ye sunucu üzerinden istek atıcam.
Mantıksa şu:
Frontend → Proxy → Instagram
Vercel’e Deploy Etme
vercel.com’ da bu klasörü deploy edicem.


Projede .env.local oluşturup bunu eklicem;
NEXT_PUBLIC_INSTAGRAM_PROXY_URL=https://instagram-proxy-xxxxx.vercel.app

Instagram isteklerini direkt Instagram’a değil, bu proxy adresine göndericem.