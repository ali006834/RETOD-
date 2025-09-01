/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://dizaynella.com.tr',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/api/*', '/admin/*', '/private/*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/admin/', '/private/', '/account/', '/cart/', '/checkout/'],
      },
    ],
    additionalSitemaps: [
      'https://dizaynella.com.tr/sitemap.xml',
    ],
  },
  // Statik sayfalar
  additionalPaths: async (config) => {
    const staticPages = [
      // Ana sayfa ve önemli sayfalar
      { loc: '/', changefreq: 'daily', priority: 1.0 },
      { loc: '/anasayfa', changefreq: 'daily', priority: 0.64 },
      
      // Kategori sayfaları
      { loc: '/yeniler', changefreq: 'weekly', priority: 0.8 },
      { loc: '/koleksiyon', changefreq: 'weekly', priority: 0.8 },
      { loc: '/buyuk-beden-koleksiyon', changefreq: 'weekly', priority: 0.8 },
      { loc: '/gece-elbiseleri', changefreq: 'weekly', priority: 0.8 },
      { loc: '/ozel-indirimler', changefreq: 'weekly', priority: 0.8 },
      { loc: '/one-cikanlar', changefreq: 'weekly', priority: 0.8 },
      { loc: '/cok-satanlar', changefreq: 'weekly', priority: 0.8 },
      
      // Alt kategoriler
      { loc: '/bluz', changefreq: 'weekly', priority: 0.64 },
      { loc: '/sezon-trendleri', changefreq: 'weekly', priority: 0.64 },
      { loc: '/blazer-ceket', changefreq: 'weekly', priority: 0.64 },
      { loc: '/elbise-2', changefreq: 'weekly', priority: 0.64 },
      { loc: '/etek-1', changefreq: 'weekly', priority: 0.64 },
      { loc: '/sezon-sonu-firsatlari', changefreq: 'weekly', priority: 0.64 },
      { loc: '/kumas-pantolon', changefreq: 'weekly', priority: 0.64 },
      { loc: '/alt---ust-takim', changefreq: 'weekly', priority: 0.64 },
      { loc: '/bluz-1', changefreq: 'weekly', priority: 0.64 },
      { loc: '/ceket-yelek', changefreq: 'weekly', priority: 0.64 },
      { loc: '/buyuk-beden-elbise', changefreq: 'weekly', priority: 0.64 },
      { loc: '/buyuk-beden-etek', changefreq: 'weekly', priority: 0.64 },
      { loc: '/her-beden-icin-stil', changefreq: 'weekly', priority: 0.64 },
      { loc: '/pantolon', changefreq: 'weekly', priority: 0.64 },
      { loc: '/buyuk-beden-alt---ust-takim', changefreq: 'weekly', priority: 0.64 },
      
      // Sayfa sayfaları
      { loc: '/pages/iletisim', changefreq: 'monthly', priority: 0.8 },
      { loc: '/pages/hakkimizda', changefreq: 'monthly', priority: 0.8 },
      { loc: '/pages/magazalar', changefreq: 'monthly', priority: 0.8 },
      { loc: '/pages/kariyer', changefreq: 'monthly', priority: 0.8 },
      { loc: '/pages/cerez-politikasi', changefreq: 'yearly', priority: 0.5 },
      { loc: '/pages/mesafeli-satis-sozlesmesi', changefreq: 'yearly', priority: 0.5 },
      { loc: '/pages/gizlilik-sozlesmesi', changefreq: 'yearly', priority: 0.5 },
      { loc: '/pages/iade-ve-teslimat', changefreq: 'yearly', priority: 0.5 },
      { loc: '/pages/kampanyalar', changefreq: 'weekly', priority: 0.8 },
      { loc: '/pages/sik-sorulan-sorular', changefreq: 'monthly', priority: 0.7 },
      
             // Diğer sayfalar
       { loc: '/search', changefreq: 'weekly', priority: 0.6 },
       { loc: '/cart', changefreq: 'weekly', priority: 0.4 },
       { loc: '/checkout', changefreq: 'weekly', priority: 0.5 },
       { loc: '/account', changefreq: 'monthly', priority: 0.3 },
       { loc: '/account/login', changefreq: 'monthly', priority: 0.3 },
       { loc: '/account/register', changefreq: 'monthly', priority: 0.3 },
       { loc: '/account/forgot-password', changefreq: 'monthly', priority: 0.3 },
       { loc: '/account/recover-password', changefreq: 'monthly', priority: 0.3 },
       { loc: '/account/activate', changefreq: 'monthly', priority: 0.3 },
       { loc: '/account/addresses', changefreq: 'monthly', priority: 0.3 },
       { loc: '/account/favorite-products', changefreq: 'monthly', priority: 0.3 },
       { loc: '/account/raffles', changefreq: 'monthly', priority: 0.3 },
    ]

    // Ürün sayfaları (Google sitemap'ten alınan veriler)
    const productPages = [
      // Takım elbiseler - Priority 0.8
      { loc: '/poplin-mix-metal-aksesuarli-takim-el-2700', changefreq: 'weekly', priority: 0.8 },
      { loc: '/gold-aksesuarli-vatkali-takim-el-2701', changefreq: 'weekly', priority: 0.8 },
      { loc: '/poplin-mix-broslu-ikili-takim-el-2702', changefreq: 'weekly', priority: 0.8 },
      { loc: '/manset-detayli-ceket-takim-el-2703', changefreq: 'weekly', priority: 0.8 },
      { loc: '/cizgi-garnili-metal-aksesuarli-takim-el-2707', changefreq: 'weekly', priority: 0.8 },
      { loc: '/ceket-pantolon-takim-el-2711', changefreq: 'weekly', priority: 0.8 },
      { loc: '/kontrast-fiyonk-detayli-puanli-ceketli-takim-el-2712', changefreq: 'weekly', priority: 0.8 },
      { loc: '/deri-aksesuarli-yelek-takim-el-2716', changefreq: 'weekly', priority: 0.8 },
      { loc: '/tasli-aksesuarli-orme-takim-el-2721', changefreq: 'weekly', priority: 0.8 },
      { loc: '/piton-desen-etekli-yelek-takim-el-2727', changefreq: 'weekly', priority: 0.8 },
      { loc: '/tafta-etekli-blazer-ceket-takim-el-2708', changefreq: 'weekly', priority: 0.64 },
      { loc: '/leopar-etekli-yelek-takim-el-2710', changefreq: 'weekly', priority: 0.64 },
      { loc: '/gold-aksesuarli-blazer-ceket-takim-el-2705', changefreq: 'weekly', priority: 0.51 },
      
      // Elbiseler - Priority 0.8
      { loc: '/on-yirtmacli-tam-boy-elbise-el-4351', changefreq: 'weekly', priority: 0.8 },
      { loc: '/el-4175', changefreq: 'weekly', priority: 0.8 },
      { loc: '/el-4165', changefreq: 'weekly', priority: 0.8 },
      { loc: '/elbise-el-1734', changefreq: 'weekly', priority: 0.8 },
      { loc: '/el-4163', changefreq: 'weekly', priority: 0.8 },
      { loc: '/el-2592', changefreq: 'weekly', priority: 0.8 },
      
      // Elbiseler - Priority 0.64
      { loc: '/saten-detayli-cicek-aksesuarli-elbise-el-4362', changefreq: 'weekly', priority: 0.64 },
      { loc: '/aplikeli-uzun-kol-elbise-el-4358', changefreq: 'weekly', priority: 0.64 },
      { loc: '/beli-asimetrik-detay-islemeli-aksesuarli-elbise-el-4370', changefreq: 'weekly', priority: 0.64 },
      { loc: '/el-4138-b', changefreq: 'weekly', priority: 0.64 },
      { loc: '/el-4137-b', changefreq: 'weekly', priority: 0.64 },
      { loc: '/el-1612-b', changefreq: 'weekly', priority: 0.64 },
      { loc: '/el-1152-b', changefreq: 'weekly', priority: 0.64 },
      { loc: '/elbise-el-4322-b', changefreq: 'weekly', priority: 0.64 },
      { loc: '/elbise-el-4306-b', changefreq: 'weekly', priority: 0.64 },
      { loc: '/elbise-el-4288-b', changefreq: 'weekly', priority: 0.64 },
      { loc: '/elbise-el-4257-b', changefreq: 'weekly', priority: 0.64 },
      { loc: '/el-4213-b', changefreq: 'weekly', priority: 0.64 },
      { loc: '/el-2645-b', changefreq: 'weekly', priority: 0.64 },
      { loc: '/etek-el-1194-b', changefreq: 'weekly', priority: 0.64 },
      { loc: '/el-4189-b', changefreq: 'weekly', priority: 0.64 },
      { loc: '/el-4176-b', changefreq: 'weekly', priority: 0.64 },
      { loc: '/el-4164-b', changefreq: 'weekly', priority: 0.64 },
      { loc: '/el-2584-b', changefreq: 'weekly', priority: 0.64 },
      { loc: '/el-2574-b', changefreq: 'weekly', priority: 0.64 },
      { loc: '/el-2572-b', changefreq: 'weekly', priority: 0.64 },
      { loc: '/bluz-el-1734-b', changefreq: 'weekly', priority: 0.64 },
      { loc: '/el-4192', changefreq: 'weekly', priority: 0.64 },
      { loc: '/el-4193', changefreq: 'weekly', priority: 0.64 },
      { loc: '/kemerli-tencel-elbise-el-4199', changefreq: 'weekly', priority: 0.64 },
      { loc: '/elbise-el-4314', changefreq: 'weekly', priority: 0.64 },
      { loc: '/elbise-el-4327', changefreq: 'weekly', priority: 0.64 },
      { loc: '/elbise-el-4330', changefreq: 'weekly', priority: 0.64 },
      { loc: '/el-2651', changefreq: 'weekly', priority: 0.64 },
      { loc: '/el-2583', changefreq: 'weekly', priority: 0.64 },
      { loc: '/etek-el-1205', changefreq: 'weekly', priority: 0.64 },
      { loc: '/elbise-el-4294', changefreq: 'weekly', priority: 0.64 },
      { loc: '/elbise-el-4288', changefreq: 'weekly', priority: 0.64 },
      { loc: '/elbise-el-4257', changefreq: 'weekly', priority: 0.64 },
      { loc: '/el-2660', changefreq: 'weekly', priority: 0.64 },
      
      // Elbiseler - Priority 0.51
      { loc: '/ribanali-saten-elbise-el-4350', changefreq: 'weekly', priority: 0.51 },
      { loc: '/bluz-el-1640', changefreq: 'weekly', priority: 0.51 },
      { loc: '/bluz-el-1612', changefreq: 'weekly', priority: 0.51 },
      { loc: '/bluz-el-1653', changefreq: 'weekly', priority: 0.51 },
      { loc: '/bluz-el-1643', changefreq: 'weekly', priority: 0.51 },
      { loc: '/el-1642', changefreq: 'weekly', priority: 0.51 },
      { loc: '/bluz-el-1619', changefreq: 'weekly', priority: 0.51 },
      { loc: '/el-1613', changefreq: 'weekly', priority: 0.51 },
      { loc: '/el-1745', changefreq: 'weekly', priority: 0.51 },
      { loc: '/el-1744', changefreq: 'weekly', priority: 0.51 },
      { loc: '/gomlek-el-1743', changefreq: 'weekly', priority: 0.51 },
      { loc: '/el-1741', changefreq: 'weekly', priority: 0.51 },
      { loc: '/el-1749', changefreq: 'weekly', priority: 0.51 },
      { loc: '/pantolon-el-1115', changefreq: 'weekly', priority: 0.51 },
      { loc: '/etek-el-1106', changefreq: 'weekly', priority: 0.51 },
      { loc: '/etek-el-1194', changefreq: 'weekly', priority: 0.51 },
      { loc: '/etek-el-1176', changefreq: 'weekly', priority: 0.51 },
      { loc: '/pantolon-el-1108', changefreq: 'weekly', priority: 0.51 },
      { loc: '/pantolon-el-1101', changefreq: 'weekly', priority: 0.51 },
      { loc: '/el-1200', changefreq: 'weekly', priority: 0.51 },
      { loc: '/pantolon-el-1174', changefreq: 'weekly', priority: 0.51 },
      { loc: '/bluz-el-1734-b', changefreq: 'weekly', priority: 0.51 },
      { loc: '/el-1723-b', changefreq: 'weekly', priority: 0.51 },
      { loc: '/el-1722-b', changefreq: 'weekly', priority: 0.51 },
      { loc: '/bluz-el-1720-b', changefreq: 'weekly', priority: 0.51 },
      { loc: '/etek-el-1176-b', changefreq: 'weekly', priority: 0.51 },
      
      // Diğer ürünler
      { loc: '/balenli-ve-metal-fermuarli-bustiyer-el-1803', changefreq: 'weekly', priority: 0.64 },
    ]

    return [...staticPages, ...productPages]
  },
}

