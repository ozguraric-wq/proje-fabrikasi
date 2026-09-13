(() => {
  'use strict';
  const header = document.querySelector('.site-header');
  const triggers = [...document.querySelectorAll('.mega-trigger')];
  const scrim = document.querySelector('.menu-scrim');
  const mobile = document.getElementById('mobile-menu');
  const mobileToggle = document.querySelector('.menu-toggle');
  const desktop = window.matchMedia('(min-width: 1024px)');
  let activeTrigger = null;

  function closeMega(returnFocus = false) {
    triggers.forEach(button => {
      button.setAttribute('aria-expanded', 'false');
      document.getElementById(button.getAttribute('aria-controls')).hidden = true;
    });
    scrim.hidden = true;
    if (returnFocus && activeTrigger) activeTrigger.focus();
    activeTrigger = null;
  }
  function openMega(button) {
    if (!desktop.matches) return;
    const expanded = button.getAttribute('aria-expanded') === 'true';
    closeMega();
    if (expanded) return;
    activeTrigger = button;
    button.setAttribute('aria-expanded', 'true');
    document.getElementById(button.getAttribute('aria-controls')).hidden = false;
    scrim.hidden = false;
  }
  triggers.forEach(button => {
    button.addEventListener('click', () => openMega(button));
    button.addEventListener('keydown', event => {
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        if (button.getAttribute('aria-expanded') !== 'true') openMega(button);
        document.getElementById(button.getAttribute('aria-controls')).querySelector('a').focus();
      }
    });
  });
  scrim.addEventListener('click', () => closeMega(true));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && activeTrigger) closeMega(true);
  });
  header.addEventListener('focusout', () => {
    requestAnimationFrame(() => { if (!header.contains(document.activeElement)) closeMega(); });
  });
  header.querySelectorAll('a').forEach(link => link.addEventListener('click', () => closeMega()));
  document.addEventListener('click', event => {
    if (!header.contains(event.target) && !scrim.contains(event.target)) closeMega();
  });

  function closeMobile() {
    if (mobile.open) mobile.close();
  }
  mobileToggle.addEventListener('click', () => {
    closeMega();
    if (mobile.open) return closeMobile();
    mobile.showModal();
    mobileToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    mobile.querySelector('.menu-close').focus();
  });
  mobile.querySelector('.menu-close').addEventListener('click', closeMobile);
  mobile.addEventListener('close', () => {
    mobileToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
  mobile.addEventListener('click', event => {
    if (event.target !== mobile) return;
    const box = mobile.getBoundingClientRect();
    if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) closeMobile();
  });
  mobile.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    closeMobile();
    const id = link.getAttribute('href');
    if (id.startsWith('#')) requestAnimationFrame(() => focusAnchor(id));
  }));
  desktop.addEventListener('change', event => {
    closeMega();
    if (event.matches) closeMobile();
  });

  function activateTab(button, focus = false) {
    const group = button.dataset.tabGroup;
    document.querySelectorAll(`[data-tab-group="${group}"]`).forEach(tab => {
      const selected = tab === button;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
      document.getElementById(tab.getAttribute('aria-controls')).hidden = !selected;
    });
    if (focus) button.focus();
  }
  document.querySelectorAll('[role="tablist"]').forEach(list => {
    const tabs = [...list.querySelectorAll('[role="tab"]')];
    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => activateTab(tab));
      tab.addEventListener('keydown', event => {
        let next;
        if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
        if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
        if (event.key === 'Home') next = 0;
        if (event.key === 'End') next = tabs.length - 1;
        if (next !== undefined) { event.preventDefault(); activateTab(tabs[next], true); }
      });
    });
  });

  function focusAnchor(hash) {
    if (!hash || hash === '#') return;
    const target = document.getElementById(decodeURIComponent(hash.slice(1)));
    if (!target) return;
    if (target.tagName === 'DETAILS') {
      target.open = true;
      target.querySelector('summary').focus({preventScroll: true});
    } else {
      target.setAttribute('tabindex', '-1');
      target.focus({preventScroll: true});
    }
  }
  document.querySelectorAll('a[href^="#ek-"]').forEach(link => link.addEventListener('click', () => focusAnchor(link.hash)));
  window.addEventListener('hashchange', () => focusAnchor(location.hash));
  focusAnchor(location.hash);

  const backTop = document.querySelector('.back-top');
  const updateScroll = () => backTop.classList.toggle('visible', window.scrollY > 700);
  window.addEventListener('scroll', updateScroll, {passive:true});
  updateScroll();
})();
