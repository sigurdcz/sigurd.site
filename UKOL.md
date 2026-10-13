# UKOL: Integrace promo fotografii do portfolia

Datum: 2026-10-13
Zadani: Zkopirovat hotove promo fotografie sedmi projektu do webu Sigurd SITE a priradit hlavni i galerijni snimky ke spravnym projektum.
Doporuceny model: Terra - jde o ohranicenou produkcni upravu vice assetu a existujiciho datoveho napojeni portfolia.

## Kroky

- [x] Overit zdrojovou strukturu promo fotografii a soucasny model portfolia.
- [x] Zkopirovat obrazky do vhodne struktury assetu bez ztraty nebo skryteho fallbacku.
- [x] Priradit hlavni a galerijni fotografie ke spravnym projektum.
- [x] Overit existenci vsech souboru, odkazy a syntaxi dotcenych dat/scriptu.
- [x] Zkontrolovat relevantni dokumentaci a zapsat vysledek.

## Poznamky

Projekt nema adresar `.git`; vytvoreni commitu proto neni mozne bez explicitniho souhlasu s inicializaci repozitare.
Zkopirovano 28 JPG (7 hlavnich a 21 galerijnich). Pridana datova polozka `localvoiceai`, ktera v portfoliu puvodne chybela; nepotvrzene detaily zustaly viditelne oznacene jako `Projekt / upresnit`.
`media-map.js` nyni rozlisuje cover a galerii. Detail projektu umoznuje prepinat vsechny prirazene snimky.
Overeni proslo: 28 unikatnich cest existuje, JavaScript soubory prosly `node --check` a HTML pouziva cache verzi 14.2.

## Vysledek

Promo fotografie jsou zkopirovane a prirazene k projektum RB Videos Photos, Dark Master web, sigurd.site, Taura LARP, Ced, ElevenLabs Laboratory a LocalVoiceAI Worker. Galerie v detailu umoznuje prepinat vsechny dodane snimky. Aktualizovan byl `README.md`; dalsi dokumentace nebyla touto zmenou vecne dotcena.
