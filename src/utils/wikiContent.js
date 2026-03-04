export const WIKI_SECTIONS = [
  { id: 'giris', label: 'Giriş', icon: '◈' },
  { id: 'kurulum', label: 'Kurulum', icon: '⚙' },
  { id: 'api-key', label: 'API Key', icon: '🔑' },
  { id: 'veri-cekme', label: 'Veri Çekme', icon: '▶' },
  { id: 'dosya-kaydetme', label: 'Dosya Kaydetme', icon: '◉' },
  { id: 'saved-files', label: 'Saved Files', icon: '◫' },
  { id: 'endpoint-rehberi', label: 'Endpoint Rehberi', icon: '≡' },
  { id: 'parametreler', label: 'Parametreler', icon: '⊞' },
  { id: 'rate-limit-plan', label: 'Rate Limit & Plan', icon: '⚡' },
  { id: 'ornek-akis', label: 'Örnek Akış', icon: '→' },
  { id: 'teknoloji-stack', label: 'Teknoloji Stack', icon: '⬡' },
]

export const WIKI_CONTENT = `# API Football Dashboard

**Geliştiriciler ve istatistikçiler için** API-Football v3 verilerine hızlı erişim terminali.  

(Önemli Not: Tüm veriler local'de çalışır, hiçbir şey uzak sunucuya gitmez.)

---

## Giriş

Bu uygulama, [API-Football v3](https://www.api-football.com/) servisiyle doğrudan iletişim kurar.  
Amacı: endpoint seçimi, parametre girişi ve JSON yanıtı görüntülemeyi tek ekranda birleştirmek.

**Neler yapabilirsiniz:**

- Herhangi bir API-Football endpoint'ine parametre girerek istek atabilirsiniz.
- Gelen JSON yanıtı interaktif ağaç görünümünde veya ham formatta incelenebilir.
- Yanıtı \`data-stat/\` klasörüne timestamped JSON dosyası olarak kaydedebilirsiniz.
- Kayıtlı dosyaları listeler, görüntüler, indirir veya silebilirsiniz.

---

## Kurulum

### Gereksinimler

- **Node.js** v18 veya üzeri
- **npm** v9 veya üzeri
- API-Football hesabı (ücretsiz veya ücretli herhangi bir plan aboneliği gerekii.)

### Adımlar

\`\`\`bash
# 1. Projeyi klonlayın
git clone https://github.com/kullanici/apifootball-dashboard
cd apifootball-dashboard

# 2. Bağımlılıkları yükleyin
npm install

# 3. Geliştirme sunucularını başlatın
npm run dev
\`\`\`

Uygulama iki sunucu başlatır:

- **Vite** — React frontend → [http://localhost:5173](http://localhost:5173)
- **Express** — API proxy + dosya I/O → [http://localhost:3001](http://localhost:3001)

> Sadece \`npm run dev\` gereklidir. \`concurrently\` her iki süreci aynı anda yönetir.

### Production Build

\`\`\`bash
npm run build
\`\`\`

---

## API Key

### Nereden Alınır

1. [api-football.com](https://www.api-football.com/) adresine gidin
2. Ücretsiz hesap oluşturun
3. Dashboard → **My Applications** → **API-Football** → API anahtarınızı kopyalayın

### Uygulamaya Ekleme

1. Uygulamayı açın ([http://localhost:5173](http://localhost:5173))
2. Sayfanın üstündeki **API KEY** alanına anahtarınızı yapıştırın
3. **SAVE** butonuna basın — anahtar tarayıcının \`localStorage\`'ına kaydedilir

> **Güvenlik:** API key hiçbir zaman kayıt dosyalarına veya terminale yazılmaz.  
> Yalnızca tarayıcı hafızasında ve Express proxy isteğinin header'ında bulunur.

### Plan Limitleri

| Plan | Günlük İstek | Fiyat |
|------|-------------|-------|
| Free | 100 | Ücretsiz |
| Starter | 7.500 | Ücretli |
| Pro | 30.000 | Ücretli |

---

## Veri Çekme

### Akış

1. Sol menüden bir **endpoint** seçin (ör: *Leagues / Cups*)
2. Orta panelde gerekli ve opsiyonel parametreleri doldurun
3. **▶ FETCH DATA** butonuna tıklayın
4. Sağ panelde JSON yanıtı görünür

### Parametre Kuralları

- \`*\` işaretli alanlar zorunludur
- Boş bırakılan opsiyonel parametreler istekten çıkarılır
- API-Football tarih formatı: \`YYYY-MM-DD\`
- Timezone: IANA formatı, ör: \`Europe/Istanbul\`

### Yanıt Yapısı

Her API-Football yanıtı şu yapıya sahiptir:

\`\`\`json
{
  "get": "leagues",
  "parameters": { "country": "Turkey" },
  "errors": [],
  "results": 5,
  "paging": { "current": 1, "total": 1 },
  "response": [ ...veri dizisi... ]
}
\`\`\`

- \`results\` — dönen kayıt sayısı
- \`errors\` — API hata mesajları (boş dizi = başarılı)
- \`paging\` — sayfalama bilgisi

### Görünüm Modları

| Mod | Açıklama |
|-----|----------|
| **TREE** | Katlanabilir / açılabilir interaktif JSON ağacı |
| **RAW** | Ham, formatlı JSON metni |
| **COPY** | Tüm JSON'u panoya kopyalar |

---

## Dosya Kaydetme

### Otomatik Kayıt

Herhangi bir isteği göndermeden önce:

1. Form altındaki **Save as JSON** toggle'ını aktif edin
2. Dosya adını düzenleyin (uzantısız, ör: \`premier_league_2024\`)
3. **FETCH DATA** butonuna basın

Dosya şu isimle \`data-stat/\` klasörüne kaydedilir:

\`\`\`
data-stat/premier_league_2024_1709558400000.json
\`\`\`

> Timestamp eklenmesi, aynı isimle yapılan farklı çekimlerin birbirinin üzerine yazılmasını önler.

### Klasör Konumu

\`data-stat/\` dizini projenin kök klasöründedir. Dosyalar git ile paylaşılabilir, başka araçlarla işlenebilir.

---

## Saved Files

**Saved Files** sekmesi kayıtlı tüm JSON dosyalarını listeler.

### Özellikler

- **Önizleme** — Dosyaya tıklayarak içeriği sağ panelde interaktif ağaç görünümde açın
- **İndirme** — \`↓\` butonu ile .json dosyasını bilgisayarınıza indirin
- **Silme** — \`✕\` butonu ile dosyayı \`data-stat/\` klasöründen kalıcı silin
- **Arama** — Dosya adına göre anlık filtreleme
- **Yenile** — \`↺ REFRESH\` ile listeyi güncelleyin

### Dosya Boyutu

Büyük endpoint yanıtları (ör: tüm sezon fixture'ları) birkaç MB olabilir.  
Tarayıcıda görüntüleme için sorun yoktur; çok büyük dosyalar için RAW modu daha hızlıdır.

---

## Endpoint Rehberi

### CORE

| Endpoint | Açıklama |
|----------|----------|
| \`/status\` | API kotanızı, plan bilginizi ve abonelik durumunuzu gösterir |
| \`/timezones\` | API'nin desteklediği tüm timezone string'lerini listeler |
| \`/countries\` | Mevcut ülkeleri, bayraklarını ve ISO kodlarını döner |
| \`/leagues/seasons\` | Desteklenen tüm sezon yıllarını listeler |

### LEAGUES

| Endpoint | Açıklama |
|----------|----------|
| \`/leagues\` | Tüm ligler ve kupalar; ülke, sezon, tip ile filtrelenebilir |
| \`/standings\` | Lig puan tablosu; sezon ve lig ID'si gerektirir |
| \`/fixtures/rounds\` | Bir ligdeki tüm haftaları/turları listeler |

### TEAMS

| Endpoint | Açıklama |
|----------|----------|
| \`/teams\` | Takım bilgisi, logo, ülke, kuruluş yılı |
| \`/teams/statistics\` | Bir takımın belirli ligteki detaylı sezon istatistikleri |
| \`/teams/seasons\` | Bir takımın verisi olan tüm sezonlar |
| \`/teams/countries\` | Takımların bulunduğu ülke listesi |
| \`/venues\` | Stadyum bilgisi; kapasite, şehir, yüzey türü |

### PLAYERS

| Endpoint | Açıklama |
|----------|----------|
| \`/players\` | Oyuncu bilgisi + sezon istatistikleri (gol, asist, kart vb.) |
| \`/players/seasons\` | Belirli oyuncunun verisi bulunan sezonlar |
| \`/players/squads\` | Takım kadrosu, mevcut oyuncular |
| \`/players/topscorers\` | En çok gol atan 20 oyuncu |
| \`/players/topassists\` | En çok asist yapan 20 oyuncu |
| \`/players/topyellowcards\` | En çok sarı kart gören 20 oyuncu |
| \`/players/topredcards\` | En çok kırmızı kart gören 20 oyuncu |
| \`/transfers\` | Oyuncu transfer geçmişi veya takımın transfer kayıtları |
| \`/trophies\` | Oyuncu veya teknik direktörün kupa/şampiyonluk listesi |
| \`/sidelined\` | Oyuncu/teknik direktörün sakatlık/ceza geçmişi |

### FIXTURES

| Endpoint | Açıklama |
|----------|----------|
| \`/fixtures\` | Ana maç endpoint'i; canlı, tarihe göre, takıma göre vb. |
| \`/fixtures/headtohead\` | İki takım arasındaki karşılıklı maç geçmişi |
| \`/fixtures/statistics\` | Bir maçın takım bazlı istatistikleri (şutlar, top hakimiyeti vb.) |
| \`/fixtures/events\` | Maç içi olaylar (gol, sarı kart, değişiklik vb.) |
| \`/fixtures/lineups\` | 11'ler ve yedek kadro |
| \`/fixtures/players\` | Maçtaki her oyuncunun bireysel istatistikleri |

### INJURIES & ODDS

| Endpoint | Açıklama |
|----------|----------|
| \`/injuries\` | Maç/lig/takım bazlı sakatlık bildirimleri |
| \`/predictions\` | Belirli maç için AI tahminleri ve istatistiksel analiz |
| \`/odds\` | Maç öncesi bahis oranları |
| \`/odds/live\` | Canlı bahis oranları |
| \`/odds/bookmakers\` | Desteklenen bahis sitelerinin listesi |
| \`/odds/bets\` | Bahis marketleri/türleri (Maç Sonucu, Handikap vb.) |

### COACHES

| Endpoint | Açıklama |
|----------|----------|
| \`/coachs\` | Teknik direktör bilgisi, kariyer geçmişi ve istatistikleri |

---

## Parametreler

### Ortak Parametreler

| Parametre | Tip | Açıklama |
|-----------|-----|----------|
| \`season\` | integer | 4 haneli yıl, ör: \`2024\` |
| \`league\` | integer | Lig ID'si (bkz: /leagues endpoint'i) |
| \`team\` | integer | Takım ID'si (bkz: /teams endpoint'i) |
| \`player\` | integer | Oyuncu ID'si |
| \`fixture\` | integer | Maç ID'si |
| \`date\` | string | \`YYYY-MM-DD\` formatı |
| \`timezone\` | string | IANA tz, ör: \`Europe/Istanbul\` |
| \`page\` | integer | Sayfalama (varsayılan: 1) |
| \`search\` | string | Metin araması (min. 3-4 karakter) |

### Fixtures Status Kodları

| Kod | Tam Ad | Açıklama |
|-----|--------|----------|
| \`TBD\` | Time to Be Defined | Tarih belirsiz |
| \`NS\` | Not Started | Başlamadı |
| \`1H\` | First Half | İlk yarı |
| \`HT\` | Half Time | Devre arası |
| \`2H\` | Second Half | İkinci yarı |
| \`ET\` | Extra Time | Uzatma |
| \`P\` | Penalty In Progress | Penaltı |
| \`FT\` | Match Finished | Bitti |
| \`AET\` | Finished After Extra Time | Uzatmada bitti |
| \`PEN\` | Finished by Penalty | Penaltıda bitti |
| \`PST\` | Postponed | Ertelendi |
| \`CANC\` | Cancelled | İptal |
| \`SUSP\` | Suspended | Askıya alındı |
| \`LIVE\` | In Progress | Canlı |

---

## Rate Limit & Plan

### Free Plan Kullanımı

Günlük **100 istek** hakkıyla akıllı kullanım önemlidir. Bazı güncel verilere erişmek için ücretli plan aboneliği gerekebilir.

### İstek Sayacı Kontrol

\`\`\`
Endpoint: API Status
Path: /status
Parametre: yok
\`\`\`

Yanıttaki \`requests.current\` alanı bugün kullandığınız istek sayısını gösterir.

---

## Örnek Akış

### Süper Lig 2024-25 Puan Tablosu

\`\`\`
1. Endpoint: Leagues / Cups
   league: (boş)  name: Süper Lig  country: Turkey
   → league id örneği (ör: 203)

2. Endpoint: Standings
   league: 203   season: 2024
   Save as JSON: ✓  Dosya adı: superlig_standings_2024
   → Puan tablosu kaydedildi
\`\`\`

### Manchester United Son 5 Maç

\`\`\`
1. Endpoint: Teams
   search: man united
   → team id örneği (ör: 33)

2. Endpoint: Fixtures
   team: 33   last: 5   timezone: Europe/Istanbul
   Save as JSON: ✓  Dosya adı: manutd_last5
\`\`\`

### Canlı Maçlar

\`\`\`
Endpoint: Fixtures
live: all
timezone: Europe/Istanbul
\`\`\`

---

## Teknoloji Stack

### Frontend

| Paket | Versiyon | Kullanım |
|-------|----------|----------|
| React | 18 | UI kütüphanesi |
| React Router DOM | 6 | Client-side routing |
| Vite | 5 | Build tool & dev server |

### Backend

| Paket | Versiyon | Kullanım |
|-------|----------|----------|
| Express | 4 | API proxy sunucusu |
| cors | 2 | Cross-origin header yönetimi |
| Node https | built-in | API-Football'a istek |
| Node fs | built-in | data-stat/ dosya I/O |

### Mimari Kararlar

**Neden Express proxy?**  
\`api-sports.io\` CORS header'ı döndürmez. Tarayıcıdan direkt istek atmak mümkün değildir.  
Express, isteği sunucu tarafında iletip yanıtı frontend'e döndürür.

**Neden state App seviyesinde?**  
\`FetchPage\` route değişiminde unmount olur. Endpoint seçimi, form değerleri ve son yanıt  
\`App.jsx\`'te tutulduğu için sekme geçişlerinde kaybolmaz.

**Neden Context API?**  
API key'in \`ApiKeyProvider\` aracılığıyla tüm component ağacında paylaşılması,  
her component'in localStorage'ı bağımsız okumasından kaynaklanabilecek senkronizasyon sorunlarını önler.
`

export default WIKI_CONTENT
