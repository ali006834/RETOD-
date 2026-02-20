# Instagram API Proxy

Bu proxy, CORS nedeniyle tarayıcıdan erişilemeyen Instagram Graph API'ye sunucu tarafından istek yapar.

## Vercel'de Deploy Adımları

1. **Vercel hesabı:** [vercel.com](https://vercel.com) → Sign up (GitHub ile giriş yapabilirsiniz)

2. **Yeni proje:**
   - Dashboard → "Add New" → "Project"
   - "Import Git Repository" yerine "Deploy" sekmesinde "Browse" ile `instagram-proxy` klasörünü seçin
   - Veya: Bu klasörü ayrı bir GitHub repo'ya yükleyip "Import" ile bağlayın

3. **Deploy:**
   - Root Directory: `instagram-proxy` (eğer ana proje içindeyse)
   - Framework Preset: Other
   - Deploy'a tıklayın

4. **URL'yi kopyalayın:** Örn: `https://instagram-proxy-xxxxx.vercel.app`

5. **Ana projede .env.local oluşturun:**
   ```
   NEXT_PUBLIC_INSTAGRAM_PROXY_URL=https://instagram-proxy-xxxxx.vercel.app
   ```
