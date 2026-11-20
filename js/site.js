/* EMC Digital Solutions · Home 2026 — interazioni */
(function () {
  'use strict';
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }

  /* ---------------- i18n (IT nel markup, EN qui) ---------------- */
  var EN = {
    'nav.about': 'About', 'nav.services': 'Services', 'nav.portfolio': 'Portfolio', 'nav.method': 'Method',
    'nav.social': 'Social', 'nav.app': 'App', 'nav.news': 'News', 'nav.pricing': 'Pricing', 'nav.contact': 'Contact us',
    'hero.label': 'Tailor-made digital solutions',
    'hero.title': '<span class="line"><span>Digital that makes</span></span><span class="line"><span>your business</span></span><span class="line"><span><em>grow.</em></span></span>',
    'hero.subtitle': 'Custom websites, e-commerce, apps and management software. <strong>Designed and built by the people who talk to you directly</strong> — no middlemen, no endless waits.',
    'hero.cta1': 'Get a free first idea', 'hero.cta2': 'See our work',
    'hero.p1': 'Websites & Landing pages', 'hero.p3': 'Mobile apps', 'hero.p4': 'Management software & SaaS',
    'hero.badge': 'Free first idea', 'hero.badgeSub': 'no commitment',
    'stats.1': 'years of experience', 'stats.2': 'projects delivered', 'stats.3': 'response time', 'stats.4': 'handled by us',
    'clients.label': 'They chose EMC',
    'about.label': 'About us',
    'about.quote': 'A Sicilian software house that works like a <em>workshop</em>: every project is thought out, written and refined by hand, <em>tailored</em> to you.',
    'about.p1': 'EMC Digital Solutions is a team of professionals with over 15 years of experience in software development, SaaS and digital solutions, serving clients in Italy and abroad.',
    'about.p2': 'We analyse your needs, design the architecture and build with the most suitable technologies, focusing on code quality, cybersecurity and measurable results — from Google indexing to conversion optimisation.',
    'about.p3': 'You always talk to the person building your project: no call centres, no hand-offs.',
    'about.founderRole': 'Founder · Full Stack Developer & teacher', 'about.founderLink': 'Profile',
    'about.value1': 'Digital craftsmanship', 'about.value1d': 'Carefully written code and design built around your brand. Never anonymous templates.',
    'about.value2': 'Tailored solutions', 'about.value2d': 'Every project starts from your real needs, not from a standard package.',
    'about.value3': 'Measurable results', 'about.value3d': 'Analytics, SEO and conversions: you always know what works and why.',
    'about.value4': 'Direct support', 'about.value4d': 'Same-day replies and ongoing support, even after launch.',
    'services.label': 'What we do', 'services.title': 'What we can do <em>for you</em>',
    'services.subtitle': 'One partner for your entire digital presence, from the first idea to launch — and beyond.',
    'services.more': 'Learn more', 'services.ask': 'Ask for details',
    'services.web.title': '360° websites',
    'services.web.desc': 'Fast, elegant showcase sites, landing pages and web apps, with advanced SEO, Google Analytics, Google Business Profile and Google Maps positioning.',
    'services.tag.multi': 'Multilingual', 'services.tag.orders': 'Orders & inventory',
    'services.ecommerce.title': 'Custom e-commerce',
    'services.ecommerce.desc': 'Complete multilingual online stores: catalogue, secure payments, orders and inventory, automated emails and SEO. Professional quality at clear prices.',
    'services.saas.title': 'Management software & SaaS',
    'services.saas.desc': 'Inventory, orders, customers and reports: cloud management systems, ERP and scalable, secure SaaS platforms.',
    'services.app.title': 'Mobile apps',
    'services.app.desc': 'Native and cross-platform Android and iOS apps: UX design, push notifications and store release.',
    'services.social.title': 'Social & visibility',
    'services.social.desc': 'Social media management, geo-targeted campaigns, Google Business and local SEO so customers find and choose you.',
    'services.card.title': 'Branding, business cards & QR',
    'services.card.desc': 'Logos, printed and digital business cards, flyers and print material: custom design, print-ready files and a digital version with QR code.',
    'services.pricing.title': 'Clear plans and prices',
    'services.pricing.desc': 'Fixed prices stated before we start, agreed payments and no surprises. Discover the plans for your business online presence.',
    'services.pricing.link': 'See the plans',
    'method.label': 'The method', 'method.title': 'From idea to launch, <em>in four steps</em>',
    'method.subtitle': 'A clear, transparent process: you always know where we are, what comes next and what it costs.',
    'method.s1': 'Listening', 'method.s1d': 'A free consultation to understand your business, goals and customers. You get a first idea with no commitment.',
    'method.s2': 'Design', 'method.s2d': 'A tailored proposal with fixed timing and price, then design and structure shared with you.',
    'method.s3': 'Development', 'method.s3d': 'We build with modern technologies, with frequent previews to gather your feedback.',
    'method.s4': 'Launch & growth', 'method.s4d': 'Go-live, SEO and Google Business, then ongoing support and improvements over time.',
    'ecom.eyebrow': 'Turnkey e-commerce', 'ecom.title': 'Want to sell online? We build your <em>complete store.</em>',
    'ecom.lead': 'A professional e-commerce, fast and crafted in every detail — multilingual, with secure payments and order management. Just like the one we built for La Compagnia del Gluten Free.',
    'ecom.price': 'Top-tier quality and professionalism, at an unbeatable price', 'ecom.cta': 'Request a free quote',
    'ecom.f1.t': 'Multilingual catalogue', 'ecom.f1.d': 'Products and content in several languages, ready to sell anywhere.',
    'ecom.f2.t': 'Secure payments', 'ecom.f2.d': 'Cards, Stripe and PayPal with a protected checkout.',
    'ecom.f3.t': 'Orders & inventory', 'ecom.f3.d': 'Orders, stock and shipping always under control.',
    'ecom.f4.t': 'Professional emails', 'ecom.f4.d': 'Branded order confirmations from your own domain.',
    'ecom.f5.t': 'SEO & speed', 'ecom.f5.d': 'Optimised for Google and mobile.',
    'ecom.f6.t': 'Support included', 'ecom.f6.d': 'We support you from launch onwards.',
    'portfolio.label': 'Our work', 'portfolio.title': 'Projects that <em>speak for us</em>',
    'portfolio.subtitle': 'A selection of projects delivered for businesses across different industries.',
    'portfolio.filter.all': 'All', 'portfolio.viewProject': 'Visit website', 'portfolio.caseStudy': 'The project',
    'portfolio.viewOffer': 'See the offer', 'portfolio.badge.full': 'Full project',
    'portfolio.lcgf.desc': 'Full e-commerce for gluten-free products: multilingual catalogue (IT/EN/FR/DE), online payments, order and shipping management, branded transactional emails.',
    'portfolio.barbershoppileo.desc': 'Dark & gold showcase site for a barber shop in Canicattì: gallery, reviews, FAQ and booking with an availability calendar via WhatsApp or email.',
    'portfolio.sartonero.desc': 'Our management software for clothing stores: point of sale, stock by size and colour, multiple shops, gift cards and loyalty. Already running in two stores.',
    'portfolio.sartonero.link': 'Discover Sartonero',
    'portfolio.ivoucher.desc': 'A platform for digital gift cards and vouchers with QR for any business: gift cards, multi-use passes and stored-value cards, validated by phone and impossible to use twice, under the shop\'s brand.',
    'portfolio.ivoucher.link': 'Discover iVoucher',
    'portfolio.terredimiele.desc': 'End-to-end project for a Sicilian apiary: showcase website, PDF catalogue, business cards, stand material, branded t-shirt and social media management.',
    'portfolio.lavalleincantata.desc': 'Bilingual (IT/EN) site for a holiday home in the Divine Comedy Park: galleries, surroundings, map and availability requests.',
    'portfolio.grandifirme.desc': 'Showcase site for a children\'s clothing outlet, with a product catalogue connected to the <a href="https://sartonero.it/" target="_blank" rel="noopener">Sartonero</a> retail software.',
    'portfolio.megaservice.desc': 'Showcase site for a Q8 service station and AdBlue supply: services, locations with interactive map and managers\' contacts.',
    'portfolio.kleinbaby.desc': 'Website for a children\'s clothing store: brands, collections and contacts in a colourful, easy-to-use design.',
    'portfolio.giulianalagreca.desc': 'Website for a funeral home: services, 24/7 availability, contacts and map. Sober, respectful design.',
    'portfolio.fratellidirosa.desc': 'Website for a funeral agency: services, 24/7 assistance, contacts and location. Elegant, discreet layout.',
    'portfolio.herbora.desc': 'Website for a herbal shop in "Botanical Editorial" style: product catalogue, blog and social integration.',
    'portfolio.social.title': 'Social Media & Visibility',
    'portfolio.social.desc': 'Complete social media management, geo-targeted campaigns and brand strategies to boost your business online visibility.',
    'tag.multi': 'Multilingual', 'tag.pay': 'Payments', 'tag.booking': 'Bookings', 'tag.localseo': 'Local SEO',
    'tag.multishop': 'Multi-store', 'tag.site': 'Website', 'tag.branding': 'Branding & print', 'tag.bilingual': 'Bilingual',
    'social.label': 'Social & visibility', 'social.title': 'Where your customers are, <em>so are you</em>',
    'social.subtitle': 'On social media, on Google and in people\'s minds: measurable strategies to grow brand awareness and return on investment.',
    'social.s1.title': 'Social management', 'social.s1.desc': 'We run your Facebook and Instagram with professional content and an editorial plan built for your industry.',
    'social.s1.i1': '8-12 posts per month', 'social.s1.i2': '4-8 stories per month', 'social.s1.i3': 'Custom editorial plan', 'social.s1.i4': 'Comments and messages management',
    'social.s2.title': 'Advertising campaigns', 'social.s2.desc': 'Sponsored posts on Facebook and Instagram with geo-targeting to reach customers in your area.',
    'social.s2.i1': 'Targeting by area, age and interests', 'social.s2.i2': 'Measurable, controllable budget', 'social.s2.i3': '5,000+ people reached per month', 'social.s2.i4': 'Monthly report with clear metrics',
    'social.s3.title': 'Local visibility', 'social.s3.desc': 'We make you visible on Google Maps and local search, with an optimised Google Business profile.',
    'social.s3.i1': 'Optimised Google Business Profile', 'social.s3.i2': 'Google Maps listing', 'social.s3.i3': 'Local SEO and ranking', 'social.s3.i4': 'Reviews and reputation management',
    'app.label': 'Mobile development', 'app.title': 'Custom apps, <em>in your customers\' pockets</em>',
    'app.subtitle': 'Native and cross-platform apps built around your business: from the first idea to release on the App Store and Google Play.',
    'app.f1.title': 'Cross-platform', 'app.f1.desc': 'Android and iOS from a single codebase with native performance.',
    'app.f2.title': 'Push notifications', 'app.f2.desc': 'Real-time reminders and alerts for users and managers.',
    'app.f3.title': 'Real time', 'app.f3.desc': 'Data synced instantly across every device.',
    'app.f4.title': 'Security', 'app.f4.desc': 'Protected login, encrypted data and GDPR compliance.',
    'app.cta': 'Discover app development', 'app.phone-name': 'Your app', 'app.phone-tagline': 'Tailored to you',
    'app.phone-k': 'Bookings today', 'app.phone-btn': 'Book now',
    'tech.label': 'Our stack', 'tech.title': 'State-of-the-art <em>technologies</em>',
    'tech.subtitle': 'Modern, reliable tools, chosen case by case to make every project fast, secure and easy to grow.',
    'why.label': 'Why EMC Digital Solutions', 'why.title': 'A partner, <em>not a supplier</em>',
    'why.1': 'Direct line', 'why.1d': 'You always talk to the developer, never a call centre. No middlemen.',
    'why.2': 'Clear, fixed prices', 'why.2d': 'Stated before we start, with agreed payments. No surprises.',
    'why.3': 'Always fast', 'why.3d': 'Same-day replies and quick, reliable delivery times.',
    'why.4': 'Tailored design', 'why.4d': 'An identity designed for you, never anonymous templates. All of Italy, remotely.',
    'faq.title': 'Frequently asked <em>questions</em>', 'faq.side': 'Can\'t find what you\'re looking for? Write to us: we reply the same day.',
    'faq.wa': 'Message us on WhatsApp',
    'faq.q1': 'What services do you offer?', 'faq.a1': 'Web and e-commerce development, custom management software, social media management, Google visibility and Android & iOS apps.',
    'faq.q2': 'How much does a website cost?', 'faq.a2': 'It depends on your needs: we build tailor-made solutions, from showcase sites to complex platforms. Contact us for a free quote.',
    'faq.q3': 'How long does it take to build a website?', 'faq.a3': 'Usually a few weeks for a showcase site; longer for complex projects. We define a clear roadmap together.',
    'faq.q4': 'Do you also handle social media and SEO?', 'faq.a4': 'Yes: social media management, content plans, geo-targeted campaigns, SEO and Google Business Profile to help the right customers find you.',
    'faq.q5': 'Do you provide support after launch?', 'faq.a5': 'Yes: maintenance, updates and ongoing direct support. We don\'t leave you alone after launch.',
    'faq.q6': 'Where do you operate?', 'faq.a6': 'We are based in Sicily and work with clients across Italy, both remotely and on site.',
    'cta.title': 'Let\'s talk about your project.<br><em>The first consultation is free.</em>',
    'cta.text': 'Tell us about your business: we\'ll send you a first idea for your website, free and with no commitment.',
    'contact.label': 'Let\'s talk', 'contact.title': 'Let\'s start <em>working together</em>',
    'contact.subtitle': 'Have a project in mind? Write to us: we reply within 24 hours.',
    'contact.where': 'Where we are', 'contact.location': 'Campobello di Licata (AG), Sicily · all of Italy',
    'contact.cta': 'Book a consultation', 'contact.flyer': 'Flyer (PDF)',
    'contact.form.name': 'Name', 'contact.form.namePlaceholder': 'Your name', 'contact.form.phone': 'Phone',
    'contact.form.phonePlaceholder': 'Optional', 'contact.form.emailPlaceholder': 'Your email', 'contact.form.message': 'Message',
    'contact.form.messagePlaceholder': 'Tell us about your project...', 'contact.form.send': 'Send message',
    'contact.form.privacy': 'I have read and accept the <a href="privacy-policy.html" target="_blank">Privacy Policy</a>',
    'footer.big': 'Let\'s create something <em>beautiful</em> together',
    'footer.desc': 'Tailor-made digital solutions for businesses that want to grow. Software development, SaaS and digital strategies from Sicily, for all of Italy.',
    'footer.quicklinks': 'Explore', 'footer.services': 'Services', 'footer.contacts': 'Contact',
    'footer.privacy': 'Privacy Policy', 'footer.cookie': 'Cookie Policy', 'footer.rights': 'All rights reserved.',
    'cookie.text': 'This website uses technical cookies to improve your browsing experience. <a href="cookie-policy.html">Read the Cookie Policy</a>',
    'cookie.accept': 'Accept'
  };
  var IT = {};
  function cacheIT() {
    document.querySelectorAll('[data-i18n]').forEach(function (el) { var k = el.getAttribute('data-i18n'); if (!(k in IT)) IT[k] = { t: el.textContent }; });
    document.querySelectorAll('[data-i18n-html]').forEach(function (el) { var k = el.getAttribute('data-i18n-html'); if (!(k in IT)) IT[k] = { h: el.innerHTML }; });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) { IT['ph:' + el.getAttribute('data-i18n-placeholder')] = { p: el.placeholder }; });
  }
  var lang = 'it';
  function applyLang(l) {
    lang = l; store('emc-lang', l); document.documentElement.lang = l;
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var k = el.getAttribute('data-i18n'); var v = l === 'en' ? EN[k] : (IT[k] && IT[k].t);
      if (v != null) el.textContent = v;
    });
    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      var k = el.getAttribute('data-i18n-html'); var v = l === 'en' ? EN[k] : (IT[k] && IT[k].h);
      if (v != null) el.innerHTML = v;
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      var k = el.getAttribute('data-i18n-placeholder'); var v = l === 'en' ? EN[k] : (IT['ph:' + k] && IT['ph:' + k].p);
      if (v != null) el.placeholder = v;
    });
    document.querySelectorAll('.lang-label').forEach(function (s) { s.textContent = l === 'it' ? 'EN' : 'IT'; });
  }
  cacheIT();
  if (store('emc-lang') === 'en') applyLang('en');
  ['langToggle', 'langToggleMobile'].forEach(function (id) {
    var b = document.getElementById(id); if (b) b.addEventListener('click', function () { applyLang(lang === 'it' ? 'en' : 'it'); });
  });

  /* ---------------- Nav, progress bar ---------------- */
  var nav = document.getElementById('nav'), bar = document.getElementById('scrollBar');
  function onScroll() {
    var y = window.pageYOffset || document.documentElement.scrollTop;
    nav.classList.toggle('scrolled', y > 30);
    var max = (document.documentElement.scrollHeight - window.innerHeight) || 1;
    bar.style.width = Math.min(100, y / max * 100).toFixed(2) + '%';
  }
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

  var burger = document.getElementById('burger'), mm = document.getElementById('mmenu');
  function setMenu(open) {
    burger.classList.toggle('open', open); mm.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open); mm.setAttribute('aria-hidden', !open);
    document.body.style.overflow = open ? 'hidden' : '';
  }
  burger.addEventListener('click', function () { setMenu(!mm.classList.contains('open')); });
  mm.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
  window.addEventListener('resize', function () { if (window.innerWidth > 1100) setMenu(false); });

  /* active link */
  var links = document.querySelectorAll('.nav-links a[href^="#"]');
  if ('IntersectionObserver' in window) {
    var so = new IntersectionObserver(function (en) {
      en.forEach(function (e) {
        if (e.isIntersecting) {
          links.forEach(function (a) { a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id); });
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    document.querySelectorAll('main section[id]').forEach(function (s) { so.observe(s); });
  }

  /* ---------------- Reveal + counters ---------------- */
  var rv = document.querySelectorAll('.reveal');
  function countUp(el) {
    var target = +el.getAttribute('data-count'); if (reduce) { el.textContent = target; return; }
    var t0 = null, dur = 1600;
    function f(t) { if (!t0) t0 = t; var p = Math.min(1, (t - t0) / dur); el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(f); }
    el.textContent = '0'; requestAnimationFrame(f);
  }
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (en) {
      en.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('in');
        e.target.querySelectorAll('[data-count]').forEach(countUp);
        io.unobserve(e.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    rv.forEach(function (el) { io.observe(el); });
  } else { rv.forEach(function (el) { el.classList.add('in'); }); }

  /* ---------------- Card spotlight + hero parallax ---------------- */
  if (fine && !reduce) {
    document.querySelectorAll('.card').forEach(function (c) {
      c.addEventListener('pointermove', function (e) {
        var r = c.getBoundingClientRect();
        c.style.setProperty('--mx', (e.clientX - r.left) + 'px'); c.style.setProperty('--my', (e.clientY - r.top) + 'px');
      });
    });
    var sc = document.getElementById('showcase');
    if (sc) {
      var frames = sc.querySelectorAll('[data-depth]'), raf = null, mx = 0, my = 0;
      document.getElementById('hero').addEventListener('pointermove', function (e) {
        mx = e.clientX / window.innerWidth - 0.5; my = e.clientY / window.innerHeight - 0.5;
        if (!raf) raf = requestAnimationFrame(function () {
          frames.forEach(function (f) { var d = +f.getAttribute('data-depth'); f.style.translate = (-mx * d) + 'px ' + (-my * d) + 'px'; });
          raf = null;
        });
      });
    }
  }

  /* ---------------- Portfolio filter ---------------- */
  var filters = document.querySelectorAll('.filter'), works = document.querySelectorAll('.work');
  filters.forEach(function (b) {
    b.addEventListener('click', function () {
      var f = b.getAttribute('data-filter');
      filters.forEach(function (x) { x.classList.toggle('active', x === b); });
      works.forEach(function (w) {
        var show = f === 'all' || (' ' + w.getAttribute('data-category') + ' ').indexOf(' ' + f + ' ') > -1;
        w.classList.toggle('hide', !show);
        w.classList.toggle('feature-off', f !== 'all');
        if (show) w.classList.add('in');
      });
      document.getElementById('works').classList.toggle('filtered', f !== 'all');
    });
  });

  /* ---------------- Calendly ---------------- */
  document.querySelectorAll('.js-calendly').forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      if (window.Calendly) window.Calendly.initPopupWidget({ url: 'https://calendly.com/emcdigitalsolution/30min' });
      else window.open('https://calendly.com/emcdigitalsolution/30min', '_blank', 'noopener');
    });
  });

  /* ---------------- Cookie ---------------- */
  var cb = document.getElementById('cookieBanner');
  if (!store('emc-cookies-accepted')) setTimeout(function () { cb.classList.add('show'); }, 1200);
  document.getElementById('cookieAccept').addEventListener('click', function () { store('emc-cookies-accepted', 'true'); cb.classList.remove('show'); });

  var yr = document.getElementById('year'); if (yr) yr.textContent = new Date().getFullYear();

  /* ---------------- Contact form (Apps Script EMC) ---------------- */
  var form = document.getElementById('contactForm');
  if (form) {
    var status = document.getElementById('formStatus');
    var API = 'https://script.google.com/macros/s/AKfycbxLCgN0-mHN86Dk37a5m-p2A3DgMjc8b__aCO_9oBA_amLUn5MlipebKalo5qNIoSWl/exec';
    var T = {
      it: { ok: 'Messaggio inviato con successo! Ti risponderemo presto.', err: 'Si è verificato un errore. Riprova più tardi.', req: 'Compila nome, email e messaggio.', mail: 'Inserisci un indirizzo email valido.', priv: 'Per inviare devi accettare la Privacy Policy.', sending: 'Invio in corso…', send: 'Invia messaggio' },
      en: { ok: 'Message sent successfully! We will get back to you soon.', err: 'An error occurred. Please try again later.', req: 'Please fill in name, email and message.', mail: 'Please enter a valid email address.', priv: 'Please accept the Privacy Policy to continue.', sending: 'Sending…', send: 'Send message' }
    };
    var phone = form.querySelector('[name="phone"]');
    phone.addEventListener('input', function () { this.value = this.value.replace(/[^0-9+ ]/g, ''); });
    function v(n) { var el = form.querySelector('[name="' + n + '"]'); return el ? el.value.trim() : ''; }
    function toast(msg, type) {
      var t = document.getElementById('toast'); t.textContent = msg; t.className = type;
      setTimeout(function () { t.classList.add('show'); }, 10); clearTimeout(t._t); t._t = setTimeout(function () { t.classList.remove('show'); }, 6000);
    }
    function show(type, msg) { status.className = 'form-status ' + (type === 'ok' ? 'success' : 'error'); status.textContent = msg; toast(msg, type); }
    var btn = form.querySelector('.form-submit'), label = btn.querySelector('.btn-label');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var L = T[lang === 'en' ? 'en' : 'it'];
      if (form.querySelector('[name="_honey"]').value) return;
      if (!v('name') || !v('email') || !v('message')) { show('err', L.req); return; }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v('email'))) { show('err', L.mail); return; }
      if (!form.querySelector('[name="privacy"]').checked) { show('err', L.priv); return; }
      btn.disabled = true; label.textContent = L.sending;
      fetch(API, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ site: 'emcdigitalsolutions', name: v('name'), email: v('email'), phone: v('phone'), message: v('message') }) })
        .then(function () { show('ok', L.ok); form.reset(); if (window.gtag) window.gtag('event', 'generate_lead', { method: 'contact_form' }); })
        .catch(function () { show('err', L.err); })
        .finally(function () { btn.disabled = false; label.textContent = L.send; });
    });
  }
})();
