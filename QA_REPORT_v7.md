# QA / UX audit — Neural Portfolio v7

## Rozsah a důležitá omezení
Audit vychází z reálného zdrojového kódu v6 a oprav v7. **Plošná vizuální kontrola a plnohodnotný E2E test v desktopovém/mobilním prohlížeči NENÍ dokončený.** Testovací prohlížeč v tomto prostředí blokuje přímé navigace na lokální HTTP i file:// URL. Pokus o vložení celé stránky se zasekl. Proto nejsou vytvořené nové screenshoty v7; žádné domnělé výsledky Lighthouse ani FPS nejsou uváděny.

## Potvrzené vady a opravy
1. Původní tlačítko CV bylo pouze v index.html. **Opraveno:** tlačítko i modal na všech 7 HTML stránkách.
2. Tlačítko nebylo dost výrazné. **Opraveno:** zvýšený kontrast a dodatečný CTA odkaz pod titulkem homepage, úprava hlavičky pro malé displeje.
3. Text O mně byl obecný a stručný. **Opraveno:** konkrétní přístup od problému k cíli, návrhu, prototypu, iteracím, testování a výsledku v 6 grafických krocích.
4. Původní CSS řešilo malé displeje pouze částečně. **Úprava:** responzivní breakpointy 1050, 670 a 375 px pro hlavičku a proces. Reálné vykreslení na zařízení je nutné ověřit.

## Funkce — co je a není doložené
- Validace HTML struktury pomocí BeautifulSoup: unikátní ID, přítomnost CV modalu, tlačítka, souborů skriptů a stylů.
- Syntaxe JavaScriptu: `node --check` u všech souborů.
- Odesílání formuláře: endpoint PHP existuje, ale funkci `mail()` a doručení lze ověřit až na hostingu po nastavení `$recipient`. Lokální preview zobrazuje vysvětlující hlášku.
- Funkčnost všech filtrů, tlačítek, animací, modalů, grafů a navigace při kliknutí: **E2E běh neprošel; neověřeno**.
- Performance: **Lighthouse / INP / LCP / CLS / FPS nezměřeno**. Doporučený následný krok je Lighthouse Mobile + Desktop a Chrome Performance profiling na produkčním/staging URL.

## UX / marketing: posouzení obsahu a architektury
- **Homepage:** působivá vizuální identita a pět jasných oborů. Riziko: animovaná mapa nemusí být okamžitě zřejmá všem; doporučeno měřit klikatelnost jednotlivých uzlů. CV CTA na úvodu nyní viditelnější.
- **Web:** reference první, následně nabídka, proces spolupráce. Doporučení: reálné screenshoty před/po, jednoznačný vlastní přínos, výrazné klientské CTA a doklady výsledků.
- **Aplikace:** správně komunikovat jednoduchost samostatných utilit a úsporu času; přínosy a čísla publikovat pouze po ověření. Důležitá je galerie skutečných rozhraní a ukázky problému → řešení.
- **Backend:** prezentace pro HR a seniorní vývojáře — stack, architektura, debugging, code quality a vývojový proces. U jednotlivých technologií držet pouze skutečnou zkušenost.
- **AI:** pyramida slouží k vysvětlení přístupu, nikoli jako objektivní klasifikace lidí. Vlastní projekty a automatizace důležitější než neurčité přísliby.
- **GameDev:** obsahově beze změn; nutně označit R&D / prototypy od vydaných titulů.
- **O mně:** nový konkrétní postup řešení problémů pomáhá HR i klientům pochopit styl spolupráce; žádné smyšlené metriky.

## Doporučené finální QA před publikací
1. Na skutečném staging URL projít rozměry **320, 375, 390, 768, 1024, 1440, 1920 px**, kontrolovat clipping/overlap, viditelnost CTA a textů.
2. Pořídit celé stránky a detailní screenshoty homepage / Web / Aplikace / Backend / AI / GameDev / O mně a modalu na desktopu i mobilu.
3. Automaticky otestovat navigaci a každý interaktivní prvek Playwrightem; validovat bezchybnou JS konzoli a všechny síťové odpovědi.
4. Lighthouse desktop/mobile a Chrome Performance: ověřit LCP, CLS, INP, RAM, GPU a FPS v animačních scénách.
5. Otestovat CV formulář na hostingu včetně chybného e-mailu, anti-spam limitu a skutečného doručení.

## Automatizovaná statická kontrola
Viz `QA_RESULTS_v7.json`.
