# Neural Portfolio v9 — audit výkonu a změny

## Změny
- Adaptive frame throttling na úvodní animaci: přibližný horní limit 45 FPS desktop / 30 FPS mobil, 10 FPS u vnitřních pohledů, přibližně 4–5 FPS při reduced-motion. Limity jsou cílové intervaly vykreslování, nikoli naměřené FPS.
- Při skrytí karty se animační smyčka **zastaví** a po návratu obnoví (Page Visibility API).
- Canvas backing store omezen na přibližně 2,6 milionu pixelů (s minimální škálou 0,65), pro omezení nároků na paměť grafiky u vysokých DPI / dlouhých rozlišení.
- CSS vykreslovací optimalizace vzdálených sekcí pomocí `content-visibility:auto` a intrinsic-size na desktopu, pokud mají podporované třídy.
- V `contact-config.php` je nově nastavena adresa příjemce `sigurd.gnezdilov@gmail.com` pro konzultace a žádosti o CV.

## Ověřeno
- Syntaxe všech lokálních `.js` přes `node --check`.
- Syntaxe PHP přes `php -l`.
- Kontrola relativních zdrojů ze všech HTML stránek.
- ZIP se po vytvoření ověřuje pomocí `unzip -t`.

## Co se NEPODAŘILO ověřit
- Chromium headless se při vykreslování stránky zasekl a byl po 16 sekundách ukončen. Nemáme nové screenshoty ani skutečné FPS, CPU/GPU, Web Vitals a Lighthouse výsledky. Neuvádět odhady jako reálně naměřené zrychlení.
- Chování při specifických viewportech, ruční test klikání a reálné doručení zpráv přes hostovaný PHP `mail()` musí projít staging QA.

## Doporučený reprodukovatelný test
1. Hostovat web na PHP stagingu s HTTPS.
2. DevTools → Performance: 15 s idle homepage, 15 s pohyb myši, navigace, 15 s mobilní emulace.
3. Porovnat v8 vs v9 FPS, total scripting time, dropped frames, GPU/CPU a memory.
4. Lighthouse Mobile/Desktop (performance, accessibility, best practices, SEO); testovat třikrát s identickým profilem.
5. Ověřit kontaktní modal, CV modal a doručení mailů; odesílání je možné až na konfigurovaném hostingu.

## Server
- Odesílající adresa `from` zůstala prázdná: PHP použije doménovou fallback adresu, kterou může hosting odmítnout. Před produkcí nakonfiguruj autorizovaného SMTP odesílatele. Příjemce je již nastaven.
