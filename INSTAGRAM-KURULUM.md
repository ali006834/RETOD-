# Instagram Gönderileri Bileşeni - Adım Adım Kurulum

## Ön Gereksinimler

- Instagram Business/Creator hesabı
- Meta for Developers'da oluşturulmuş Instagram Basic Display veya Instagram Graph API uygulaması
- Geçerli Access Token

---

## ADIM 1: Instagram Proxy'yi Vercel'de Deploy Edin

1. **Vercel hesabı oluşturun** (ücretsiz)
   - [vercel.com](https://vercel.com) → Sign up
   - GitHub hesabınızla giriş yapabilirsiniz

2. **instagram-proxy klasörünü deploy edin**
   - **Seçenek A – Vercel CLI:**
     ```bash
     cd instagram-proxy
     npx vercel
     ```
   - **Seçenek B – Vercel Dashboard:**
     - instagram-proxy klasörünü ayrı bir GitHub repo'ya yükleyin
     - Vercel Dashboard → New Project → Import Git Repository
     - Repo'yu seçip Deploy edin

3. **Deploy URL'ini kopyalayın**
   - Örnek: `https://instagram-proxy-abc123.vercel.app`
   - Sonunda `/` olmamalı

---

## ADIM 2: Ortam Değişkenini Ayarlayın

1. **Proje kökünde `.env.local` dosyası oluşturun** (yoksa)

2. **Şu satırı ekleyin:**
   ```
   NEXT_PUBLIC_INSTAGRAM_PROXY_URL=https://instagram-proxy-abc123.vercel.app
   ```
   (Kendi deploy URL'nizi yazın)

3. **Ikas deploy için:** Ikas tema ayarlarında veya build ortamında bu değişkeni tanımlayın.

---

## ADIM 3: Instagram Access Token Alın

1. [developers.facebook.com](https://developers.facebook.com) → Uygulamanız
2. Instagram Basic Display veya Instagram Graph API ürününü ekleyin
3. Access Token oluşturun (uzun ömürlü token kullanın)
4. Token'ı kopyalayın

---

## ADIM 4: Ikas Tema Editöründe Yapılandırın

1. Ikas tema editörünü açın
2. Ana sayfaya veya ilgili sayfaya **Instagram Gönderileri** bileşenini ekleyin
3. Bileşen ayarlarında:
   - **Başlık:** Örn. "Bizi Instagram'da Takip Edin"
   - **Access Token:** Meta'dan aldığınız token
   - **Instagram Gönderi Limiti:** Gösterilecek post sayısı (örn. 12)

4. Kaydedin ve yayınlayın

---

## ADIM 5: Test Edin

1. **Lokal test:**
   ```bash
   yarn dev
   ```
   - http://localhost:3333 adresine gidin
   - Instagram bileşeninin olduğu sayfayı açın

2. **Hata alırsanız:**
   - Tarayıcı konsolunu (F12) kontrol edin
   - `NEXT_PUBLIC_INSTAGRAM_PROXY_URL` doğru ayarlı mı kontrol edin
   - Access token süresinin dolmadığından emin olun

---

## Özet Kontrol Listesi

- [ ] instagram-proxy Vercel'de deploy edildi
- [ ] NEXT_PUBLIC_INSTAGRAM_PROXY_URL .env.local'de tanımlı
- [ ] Instagram Access Token alındı
- [ ] Tema editöründe bileşen eklendi ve token/başlık/limit ayarlandı
- [ ] `yarn dev` ile test edildi
