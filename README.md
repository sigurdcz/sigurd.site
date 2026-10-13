# SIGURD — NEURAL PORTFOLIO v3

**Samostatný český web v HTML, CSS a JavaScriptu.** Vychází přímo ze zachované verze v2, zejména z původní animované neuronové úvodní scény. Pro zobrazení nepotřebuje žádný build, Node.js ani databázi.

## Co je nové

- **Homepage:** hlavní titulek „Vyberte, co vás zajímá.“; původní mozek, pět větví, pohybující se uzly, bloom a animované impulzy zůstaly zachované.
- **Web:** prezentační UX pro netechnického klienta, přínosy, ukázky realizací, animovaný postup spolupráce a CTA s formulářem na přípravu zadání.
- **Aplikace:** malý samostatný software jako alternativa k nepotřebně rozsáhlým nástrojům. Vizuální galerie utilit, větší referenční projekty, srovnání a interaktivní ilustrativní kalkulace času.
- **Backend:** tři grafické celky — interaktivní technologická mapa (uzly), animovaný proces vývoje (Scrum / review / QA), kvalita a debugging. Doplněny technologie, loga a reálné profesní reference.
- **AI:** interaktivní sedmistupňová pyramida od chatbota po AI architekta, vazba na vlastní praktické projekty a část o rychlém prototypování aplikací s AI. Nejde o oficiální klasifikaci.
- **GameDev:** předchozí rozsáhlá sekce v2 zůstává beze změny, jak bylo dohodnuto.
- Každá přestavěná sekce má vlastní skutečnou HTML adresu, unikátní SEO metadata a textový obsah v HTML i pro variantu bez JavaScriptu.

## Spuštění

Rozbalte archiv a otevřete `index.html`. Web funguje i z `file://`. Alternativně v hlavní složce spusťte:

```bash
python -m http.server 8000
```

Potom otevřete `http://localhost:8000/`.

## Práce s obrázky

Vybrané projekty používají skutečné JPG fotografie v `assets/screenshots/<projekt>/`: soubor `hlavni.jpg` slouží jako náhled a soubory v `galerie/` se zobrazují v detailu projektu. Projekty bez vlastní sady dál používají SVG ilustraci z `assets/projects/`.

Mapování spravuje `media-map.js`. Každý záznam obsahuje hlavní fotografii a pole galerie:

```js
window.NEURAL_MEDIA = {
  projectId: {
    cover: 'assets/screenshots/project/hlavni.jpg',
    gallery: [
      'assets/screenshots/project/galerie/01.jpg',
      'assets/screenshots/project/galerie/02.jpg'
    ]
  }
};
```

Původní SVG ilustrace zůstávají v `assets/projects/`. Technologie mají lokální SVG loga v `assets/brand/`; u části starších firemních referencí byly ve v2 použité vzdálené favicony, které vyžadují internetové připojení.

## Obsah, přizpůsobení a kontaktní CTA

- `portfolio-data.js` — strukturované reference a stavy projektů (ponechány z v2).
- `app.js`, `style.css` — původní neuronová scéna a routing.
- `portfolio.js`, `portfolio.css` — původní rozšířené šablony a GameDev.
- `portfolio-v3.js`, `portfolio-v3.css` — nová klientská, backendová a AI UX vrstva.
- `index.html`, `backend.html`, `web.html`, `aplikace.html`, `ai.html`, `gamedev.html` — indexovatelné stránky.

Tlačítka „Chci probrat svůj web“ a „Chci vlastní nástroj“ otevřou lokální formulář, který vytvoří **text zadání ke zkopírování**. Nic neodesílají: kontaktní e-mail nebyl potvrzen. Jakmile ho doplníte, je možné formulář napojit na odesílání.

Kalkulace na stránce Aplikace je matematický model podle uživatelských vstupů, nikoliv doložená úspora nebo záruka výsledku.

## Redakční a SEO poznámka

Stavy projektů, vlastní rozsah práce i neověřené informace z podkladů jsou označované tak, aby nevznikalo nepravdivé tvrzení o dokončených produktech nebo autorství celého projektu. Před ostrým nasazením doplňte skutečné screenshoty, kontakty a prověřte texty, canonical URL, indexaci, přístupnost a výkon na cílovém hostingu.

## v4: úvodní rozmístění
Web je nahoře pod titulkem, AI zaujímá původní místo Webu, neuronové jádro je přesunuto dolů na původní místo AI. Pro mobil je pořadí Web → Backend → AI → Aplikace → GameDev → mozek. Ostatní podstránky a data jsou zachovány.


## Žádost o CV (v5)
Na úvodní stránce je tlačítko **Požádat o CV** s přístupným modálním dialogem. Návštěvník zadá e-mail a odešle žádost; CV se **neodesílá automaticky**, majitel ho pošle ručně.

**Před publikováním:** otevři `cv-request.php` a vyplň `$recipient = 'tvoje@adresa.cz';` skutečnou adresou pro příjem žádostí. Nahraj všechny soubory na hosting s PHP a funkční funkcí `mail()` (nebo nastav SMTP na hostingu). Lokálně z `file://` odesílání nefunguje a zobrazí se vysvětlení. Bez nastaveného příjemce endpoint vrátí chybu a nic nepředstírá. Odesílání je omezeno na 3 žádosti za hodinu z jedné IP; obsah e-mailu neukládá do databáze. Zajisti dle potřeby informaci o zpracování osobních údajů a otestuj doručování.

## v6 — UX pořadí sekcí
- Web: reference → klientské přínosy a nabídka → postup spolupráce.
- Aplikace: hlavní referenční projekty → malé nástroje → výhody a úspory → nová sekce spolupráce.
- Backend: firemní reference → technologický stack → vývojový proces → kvalita → týmová spolupráce.
- AI: projekty → interaktivní pyramida → prototypování → implementace AI workflow a spolupráce.
- GameDev: beze změny. Homepage a CV modal z verze v5 zachovány.
- Odkazy v navigaci a hlavní CTA upraveny podle nového pořadí.


## v7
Žádost o CV je nyní na všech stránkách a jako druhý CTA na homepage. O mně je rozšířené o šestikrokový přístup k vývoji. Report `QA_REPORT_v7.md` uvádí skutečný rozsah statických kontrol a omezení vizuálních testů.


## v7
Žádost o CV je nyní na všech stránkách a jako druhý CTA na homepage. O mně je rozšířené o šestikrokový přístup k vývoji. Report `QA_REPORT_v7.md` uvádí skutečný rozsah statických kontrol a omezení vizuálních testů.


## v7
Žádost o CV je nyní na všech stránkách a jako druhý CTA na homepage. O mně je rozšířené o šestikrokový přístup k vývoji. Report `QA_REPORT_v7.md` uvádí skutečný rozsah statických kontrol a omezení vizuálních testů.


## v8 — Kontakt / bezplatná konzultace
- Modal kontaktu na všech stránkách + `/kontakt.html`.
- Odesílání přes `contact-send.php` (PHP mail), společné nastavení s CV v `contact-config.php`.
- Před nasazením vyplnit `recipient` a `from` v `contact-config.php` a otestovat e-mail.
- Na lokálních `file://` stránkách se zprávy neodesílají.
- E-mailové odpovědi jsou ruční; bezplatná konzultace není automatická rezervace termínu.


## Performance v9
Viz `PERFORMANCE_QA_v9.md` pro provedené optimalizace, omezení QA a testovací plán. Příjemce formulářů: sigurd.gnezdilov@gmail.com.

## V11 – hardware Čed
Doplněno Arduino s mikrofonem, vlastní firmware a HTTP odesílání hlasu na vlastní transkripční server do sekcí AI a Aplikace.
