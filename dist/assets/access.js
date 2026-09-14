(() => {
  'use strict';
  // Presentation-only gate for the public GitHub Pages demo. It does not
  // authorize document requests or protect the publicly accessible source.
  const expectedDigest = '09c93e4f2c542d655bbf9fd0ec9397fd24f39758329f8c0776290be8580fcf26';
  const sessionKey = 'pf-demo-access-v1';
  const screen = document.getElementById('access-screen');
  const presentation = document.getElementById('presentation');
  const form = document.getElementById('access-form');
  const username = document.getElementById('access-username');
  const password = document.getElementById('access-password');
  const reveal = document.getElementById('access-reveal');
  const error = document.getElementById('access-error');
  const submit = form.querySelector('[type="submit"]');
  let pending = false;
  let returnHash = location.hash;

  function readSession() {
    try { return sessionStorage.getItem(sessionKey) === 'active'; }
    catch { return false; }
  }
  function clearError() {
    error.hidden = true;
    error.textContent = '';
    username.removeAttribute('aria-invalid');
    password.removeAttribute('aria-invalid');
  }
  function hidePassword() {
    password.type = 'password';
    reveal.textContent = 'Göster';
    reveal.setAttribute('aria-pressed', 'false');
  }
  function enter(focus = true) {
    clearError();
    screen.hidden = true;
    screen.inert = true;
    presentation.hidden = false;
    presentation.inert = false;
    password.value = '';
    hidePassword();
    try { sessionStorage.setItem(sessionKey, 'active'); } catch { /* In-memory access still works. */ }
    document.dispatchEvent(new Event('pf:access-granted'));
    if (focus) requestAnimationFrame(() => {
      let target = document.getElementById('hero-title');
      try { target = document.getElementById(decodeURIComponent(returnHash.slice(1))) || target; } catch { /* Ignore malformed hashes. */ }
      const details = target.closest('details');
      if (details) details.open = true;
      target.setAttribute('tabindex', '-1');
      target.focus({preventScroll: true});
      if (returnHash) target.scrollIntoView({block: 'start', behavior: 'instant'});
      else window.scrollTo({top: 0, behavior: 'instant'});
    });
  }
  function leave() {
    document.dispatchEvent(new Event('pf:access-revoked'));
    try { sessionStorage.removeItem(sessionKey); } catch { /* No stored session. */ }
    presentation.hidden = true;
    presentation.inert = true;
    screen.hidden = false;
    screen.inert = false;
    form.reset();
    hidePassword();
    clearError();
    returnHash = '';
    try { history.replaceState(null, '', location.pathname + location.search); } catch { /* Local file preview. */ }
    window.scrollTo({top: 0, behavior: 'instant'});
    username.focus({preventScroll: true});
  }
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (pending || !form.reportValidity()) return;
    clearError();
    pending = true;
    submit.disabled = true;
    submit.firstElementChild.textContent = 'Kontrol ediliyor…';
    try {
      const bytes = new TextEncoder().encode('proje-fabrikasi-demo-v1\0' + username.value.trim() + '\0' + password.value);
      const digest = await crypto.subtle.digest('SHA-256', bytes);
      const hex = Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, '0')).join('');
      if (hex !== expectedDigest) {
        error.textContent = 'Kullanıcı adı veya şifre hatalı. Lütfen tekrar deneyin.';
        error.hidden = false;
        username.setAttribute('aria-invalid', 'true');
        password.setAttribute('aria-invalid', 'true');
        password.value = '';
        password.focus();
        return;
      }
      enter();
    } catch {
      error.textContent = 'Giriş kontrolü tamamlanamadı. Güncel bir tarayıcıda HTTPS site bağlantısını açıp yeniden deneyin.';
      error.hidden = false;
    } finally {
      pending = false;
      submit.disabled = false;
      submit.firstElementChild.textContent = 'Sunuma giriş';
    }
  });
  reveal.addEventListener('click', () => {
    const show = password.type === 'password';
    password.type = show ? 'text' : 'password';
    reveal.textContent = show ? 'Gizle' : 'Göster';
    reveal.setAttribute('aria-pressed', String(show));
  });
  username.addEventListener('input', clearError);
  password.addEventListener('input', clearError);
  document.querySelectorAll('[data-signout]').forEach(button => button.addEventListener('click', leave));
  form.querySelectorAll('input, button').forEach(control => { control.disabled = false; });
  if (readSession()) enter(false);
  window.addEventListener('pageshow', event => {
    if (event.persisted && !readSession() && !presentation.hidden) leave();
  });
})();
