JEDNODUCHÉ ODESÍLÁNÍ E-MAILŮ

Příjemce: sigurd.gnezdilov@gmail.com

1. Nahraj celý obsah ZIPu na hosting s podporou PHP mail().
2. Kontaktní formulář volá contact-send.php.
3. Formulář žádosti o CV volá cv-request.php.
4. Otestuj oba formuláře přímo na webu (otevření přes file:// PHP nespustí).

Poznámka: From: noreply@sigurd.site musí hosting povolit. Na některých
hostinzích bude potřeba skutečná adresa vlastní domény nebo SMTP.
Funkce mail() vrací informaci o předání e-mailu poštovnímu systému,
nikoliv záruku doručení do Gmailu. Zkontroluj i složku Spam.

Jde o minimalistické řešení. Před veřejným nasazením se hodí ochrana
proti opakovanému spamu / rate limiting.
