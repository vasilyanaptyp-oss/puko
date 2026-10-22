(function () {
  var d = document, root = d.documentElement;
  root.classList.add('js');

  // header border on scroll
  var hdr = d.getElementById('hdr');
  function onScroll() { hdr.classList.toggle('is-s', window.scrollY > 8); }
  onScroll(); window.addEventListener('scroll', onScroll, { passive: true });

  // mobile menu
  var burger = d.querySelector('.burger'), mnav = d.getElementById('mnav');
  function setMenu(open) {
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    mnav.classList.toggle('open', open);
  }
  burger.addEventListener('click', function () { setMenu(burger.getAttribute('aria-expanded') !== 'true'); });
  mnav.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
  d.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
  window.addEventListener('resize', function () { if (window.innerWidth >= 1140) setMenu(false); });

  // reveal on scroll
  var els = d.querySelectorAll('.rv');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (ents) {
      ents.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.06 });
    els.forEach(function (el) { io.observe(el); });
  } else { els.forEach(function (el) { el.classList.add('in'); }); }

  // contact form -> prepared e-mail
  var f = d.getElementById('cform');
  if (f) f.addEventListener('submit', function (e) {
    e.preventDefault();
    var T = window.PUKO_T || {}, err = f.querySelector('.f-err');
    var q = function (n) { return f.querySelector('[name=' + n + ']').value.trim(); };
    var name = q('name'), contact = q('contact'), msg = q('msg');
    if (!name || !contact || !msg) { err.hidden = false; return; }
    err.hidden = true;
    var body = (T.f_name || 'Nimi') + ': ' + name + '\n' + (T.f_contact || 'Kontakt') + ': ' + contact + '\n\n' + msg;
    location.href = 'mailto:' + f.getAttribute('data-mail') + '?subject=' + encodeURIComponent(T.f_subj || 'Päring') + '&body=' + encodeURIComponent(body);
  });
})();
