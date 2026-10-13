(() => {
  const template = () => `<form class="contact-form" novalidate>
    <div class="contact-form-row"><label>Jméno<input name="name" autocomplete="name" placeholder="Vaše jméno" maxlength="100" minlength="2" required></label><label>E-mail<input name="email" type="email" autocomplete="email" inputmode="email" placeholder="vas@email.cz" maxlength="254" required></label></div>
    <label>S čím se na mě obracíte?<select name="type"><option value="konzultace">Bezplatná konzultace</option><option value="dotaz">Dotaz</option><option value="spoluprace">Spolupráce</option></select></label>
    <label>Vaše zpráva<textarea name="message" minlength="10" maxlength="5000" required placeholder="Popište svůj nápad nebo problém. Není potřeba technické zadání."></textarea></label>
    <div class="contact-hidden" aria-hidden="true"><label>Web<input name="website" tabindex="-1" autocomplete="off"></label></div>
    <p class="contact-fineprint">Vaše údaje použiji pouze k odpovědi na tento dotaz, ne k marketingovým sdělením.</p>
    <p class="contact-feedback" role="status" aria-live="polite"></p><button type="submit" class="contact-send">ODESLAT ZPRÁVU ↗</button>
  </form>`;
  document.querySelectorAll('[data-contact-form]').forEach(el => {
    el.innerHTML = template(); const form = el.querySelector('form'), feedback = form.querySelector('.contact-feedback'), button = form.querySelector('button[type=submit]');
    form.addEventListener('submit', async e => {
      e.preventDefault(); if (button.disabled) return;
      feedback.className='contact-feedback';
      if (!form.checkValidity()) { form.reportValidity(); feedback.textContent='Prosím vyplňte všechna povinná pole správně.'; return; }
      if (location.protocol === 'file:') { feedback.textContent='Pro odeslání je nutné nasadit web na PHP hosting a nastavit contact-config.php.'; return; }
      button.disabled=true; button.textContent='ODESÍLÁM…';
      try {
        const response = await fetch('contact-send.php',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams(new FormData(form)),credentials:'same-origin',cache:'no-store'});
        const json=await response.json(); if (!response.ok || !json.ok) throw new Error(json.message || 'Zprávu se nepodařilo odeslat.');
        feedback.classList.add('success'); feedback.textContent=json.message; form.reset();
      } catch (error) { feedback.textContent=error.message || 'Odeslání se nezdařilo. Zkontrolujte nastavení PHP hostingu.'; }
      finally { button.disabled=false; button.textContent='ODESLAT ZPRÁVU ↗'; }
    });
  });
  const modal=document.getElementById('contactModal'); if (!modal) return;
  let focusBefore=null;
  const open = () => { focusBefore=document.activeElement; modal.hidden=false; document.body.classList.add('contact-modal-active'); modal.querySelector('input[name=name]').focus(); };
  const close = () => { modal.hidden=true; document.body.classList.remove('contact-modal-active'); focusBefore?.focus?.(); };
  document.querySelectorAll('[data-contact-open]').forEach(el => el.addEventListener('click',open));
  modal.querySelectorAll('[data-contact-close]').forEach(el => el.addEventListener('click',close));
  document.addEventListener('keydown', e => {
    if (modal.hidden) return;
    if (e.key==='Escape') { e.preventDefault();close();return; }
    if (e.key==='Tab') {
      const items=[...modal.querySelectorAll('button:not(:disabled), input:not([tabindex="-1"]),select,textarea,a[href]')].filter(x=>x.getClientRects().length);
      const first=items[0],last=items[items.length-1];
      if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}
    }
  });
})();
