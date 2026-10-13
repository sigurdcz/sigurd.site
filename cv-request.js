/* CV request modal: static-friendly progressive enhancement. Configure cv-request.php on hosting. */
(() => {
  const modal = document.getElementById('cvModal');
  const form = document.getElementById('cvRequestForm');
  if (!modal || !form) return;
  const panel = modal.querySelector('.cv-modal-panel');
  const input = document.getElementById('cvEmail');
  const feedback = document.getElementById('cvFeedback');
  const submit = form.querySelector('button[type="submit"]');
  let previouslyFocused = null;
  let pending = false;
  const open = () => {
    previouslyFocused = document.activeElement;
    modal.hidden = false;
    document.body.classList.add('cv-modal-open');
    feedback.textContent = '';
    input.focus();
  };
  const close = () => {
    if (pending) return;
    modal.hidden = true;
    document.body.classList.remove('cv-modal-open');
    previouslyFocused?.focus?.();
  };
  document.querySelectorAll('[data-cv-open]').forEach(el => el.addEventListener('click', open));
  modal.querySelectorAll('[data-cv-close]').forEach(el => el.addEventListener('click', close));
  document.addEventListener('keydown', event => {
    if (modal.hidden) return;
    if (event.key === 'Escape') { event.preventDefault(); close(); }
    if (event.key === 'Tab') {
      const controls = [...modal.querySelectorAll('button:not([disabled]), input:not([tabindex="-1"]):not([disabled])')];
      const first = controls[0], last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (pending) return;
    feedback.className = 'cv-feedback';
    const email = input.value.trim();
    if (!input.validity.valid || !email) {
      feedback.textContent = 'Zadejte prosím platnou e-mailovou adresu.';
      input.focus(); return;
    }
    if (location.protocol === 'file:') {
      feedback.textContent = 'Lokální HTML nemůže žádost odeslat. Pro odesílání je potřeba nahrát web na PHP hosting a nastavit příjemce v cv-request.php.';
      return;
    }
    pending = true; submit.disabled = true; submit.querySelector('span').textContent = 'ODESÍLÁM…';
    try {
      const response = await fetch('cv-request.php', {
        method: 'POST', headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: new URLSearchParams({email, website: form.elements.website.value}),
        credentials: 'same-origin', cache: 'no-store'
      });
      const data = await response.json();
      if (!response.ok || !data.ok) throw new Error(data.message || 'Žádost se nepodařilo odeslat.');
      feedback.className = 'cv-feedback is-success';
      feedback.textContent = 'Žádost byla odeslána. CV vám následně pošlu na uvedený e-mail.';
      form.reset();
    } catch (error) {
      feedback.textContent = error instanceof SyntaxError
        ? 'Na serveru není dostupné odesílání žádostí. Nahrajte také cv-request.php na hosting.'
        : error.message || 'Odeslání se nezdařilo. Zkuste to prosím později.';
    } finally {
      pending = false; submit.disabled = false; submit.querySelector('span').textContent = 'ODESLAT ŽÁDOST';
    }
  });
})();
