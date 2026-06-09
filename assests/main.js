const SLIDE_DELAY = 3000;

// ── Hero title JS ──
document.querySelectorAll('.hero__title').forEach(title => {
  const words = title.textContent.trim().split(/\s+/);
  if (words.length < 2) return;
  const rest = words.slice(2).join(' ');
  title.innerHTML =
    words[0] + ' ' + words[1] + (rest ? '<br>' + rest : '');
});

// ── Bullets ──
const bullets = document.querySelectorAll('.hero__bullet');
const totalSlides = bullets.length;
let progressTimer = null;

function resetBullets() {
  bullets.forEach(b => {
    const span = b.querySelector('span');
    span.style.transition = 'none';
    span.style.width = '0%';
  });
}

function activateBullet(index) {
  resetBullets();
  const i = ((index % totalSlides) + totalSlides) % totalSlides;

  // 2 frame gözlə ki transition:none tətbiq olsun
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      bullets[i].querySelector('span').style.transition = `width ${SLIDE_DELAY}ms linear`;
      bullets[i].querySelector('span').style.width = '100%';
    });
  });
}

// ── Swiper ──
const heroSwiper = new Swiper('.heroSwiper', {
  loop: true,
  speed: 700,
  autoplay: {
    delay: SLIDE_DELAY,
    disableOnInteraction: false,
  },
  navigation: {
    prevEl: '.swiper-button-prev',
    nextEl: '.swiper-button-next',
  },
  on: {
    afterInit(swiper) {
      activateBullet(swiper.realIndex);
    },
    realIndexChange(swiper) {
      activateBullet(swiper.realIndex);
    },
  },
});

// ── Bullet click ──
bullets.forEach((b, i) => {
  b.addEventListener('click', () => {
    heroSwiper.slideToLoop(i);
    heroSwiper.autoplay.stop();
    heroSwiper.autoplay.start();
  });
});

document.getElementById("year").textContent = new Date().getFullYear();

// ── Services Swiper ──
const servicesSwiper = new Swiper('.servicesSwiper', {
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  speed: 600,
  slidesPerView: 1,
  spaceBetween: 15,
  breakpoints: {
    576: { slidesPerView: 2 },
    992: { slidesPerView: 3 },
  },
});

const mainButton = document.getElementById("main-button");
mainButton.addEventListener("click", function () {
  this.classList.toggle("open");
});

// ── Car Search ──
const models = {
  BMW:        ['3 серия', '5 серия', '7 серия', 'X3', 'X5', 'X6'],
  Mercedes:   ['C-Class', 'E-Class', 'S-Class', 'GLC', 'GLE', 'GLS'],
  Audi:       ['A4', 'A6', 'A8', 'Q5', 'Q7', 'Q8'],
  Toyota:     ['Camry', 'Corolla', 'Land Cruiser', 'RAV4', 'Highlander'],
  Hyundai:    ['Sonata', 'Elantra', 'Tucson', 'Santa Fe', 'Palisade'],
  Kia:        ['K5', 'Sportage', 'Sorento', 'Telluride', 'Stinger'],
  Volkswagen: ['Passat', 'Golf', 'Tiguan', 'Touareg', 'Arteon'],
  Nissan:     ['Altima', 'Maxima', 'X-Trail', 'Qashqai', 'Patrol'],
};

const brandSelect = document.getElementById('brandSelect');
const modelSelect = document.getElementById('modelSelect');
const mileageSelect = document.getElementById('mileageSelect');
const brandDropdown = document.getElementById('brandDropdown');
const modelDropdown = document.getElementById('modelDropdown');
const mileageDropdown = document.getElementById('mileageDropdown');

let selectedBrand = null;

function toggleSelect(el) {
  const isOpen = el.classList.contains('open');
  document.querySelectorAll('.car-search__select').forEach(s => s.classList.remove('open'));
  if (!isOpen) el.classList.add('open');
}

function bindSimpleSelect(selectEl, dropdownEl) {
  if (!selectEl || !dropdownEl) return;

  selectEl.addEventListener('click', e => {
    e.stopPropagation();
    toggleSelect(selectEl);
  });

  dropdownEl.querySelectorAll('.car-search__option').forEach(opt => {
    opt.addEventListener('click', e => {
      e.stopPropagation();
      const valueEl = selectEl.querySelector('.car-search__value');
      valueEl.textContent = opt.textContent;
      valueEl.classList.add('selected');
      selectEl.classList.remove('open');
    });
  });
}

if (brandSelect && modelSelect && brandDropdown && modelDropdown) {
  brandSelect.addEventListener('click', e => {
    e.stopPropagation();
    toggleSelect(brandSelect);
  });
  modelSelect.addEventListener('click', e => {
    e.stopPropagation();
    toggleSelect(modelSelect);
  });

  document.addEventListener('click', () => {
    document.querySelectorAll('.car-search__select').forEach(s => s.classList.remove('open'));
  });

  brandDropdown.querySelectorAll('.car-search__option').forEach(opt => {
    opt.addEventListener('click', e => {
      e.stopPropagation();
      selectedBrand = opt.dataset.value;
      brandSelect.querySelector('.car-search__value').textContent = opt.textContent;
      brandSelect.querySelector('.car-search__value').classList.add('selected');
      brandSelect.classList.remove('open');

      const modelValue = modelSelect.querySelector('.car-search__value');
      modelValue.textContent = modelValue.dataset.placeholder || 'Модель';
      modelValue.classList.remove('selected');

      modelDropdown.innerHTML = '';
      models[selectedBrand].forEach(m => {
        const div = document.createElement('div');
        div.className = 'car-search__option';
        div.textContent = m;
        div.addEventListener('click', e2 => {
          e2.stopPropagation();
          modelSelect.querySelector('.car-search__value').textContent = m;
          modelSelect.querySelector('.car-search__value').classList.add('selected');
          modelSelect.classList.remove('open');
        });
        modelDropdown.appendChild(div);
      });
    });
  });

  bindSimpleSelect(mileageSelect, mileageDropdown);
}

(function () {
  const marquee = document.querySelector('._logoMarquee_50ytu_157');
  if (!marquee) return;

  const lists = marquee.querySelectorAll('._logoMarqueeList_50ytu_164');
  if (lists.length < 2) return;

  const list1 = lists[0];
  const list2 = lists[1];

  marquee.style.display = 'flex';
  marquee.style.overflow = 'hidden';
  marquee.style.position = 'relative';

  list1.style.flexShrink = '0';
  list2.style.flexShrink = '0';

  let offset = 0;
  let listWidth = 0;

  function measure() {
    listWidth = list1.scrollWidth;
  }

  function tick() {
    offset += 2;
    if (offset >= listWidth) {
      offset = 0;
    }
    list1.style.transform = `translateX(-${offset}px)`;
    list2.style.transform = `translateX(-${offset}px)`;
    requestAnimationFrame(tick);
  }

  measure();
  window.addEventListener('resize', measure);
  requestAnimationFrame(tick);
})();
// ── Request modal ──
(function initRequestModal() {
  const MODAL_TRIGGER_RE =
    /(оставить\s+заявку|связаться\s+с\s+нами|получить\s+консультацию|заказать\s+звонок|^связаться$)/i;

  function getTriggerLabel(el) {
    return (el.textContent || '').replace(/\s+/g, ' ').trim();
  }

  function isSubmitControl(el) {
    if (!el) return false;
    if (el.matches('button[type="submit"], input[type="submit"]')) return true;
    if (el.closest('form') && el.matches('button:not([type]), button[type="submit"], input[type="submit"]')) {
      const type = (el.getAttribute('type') || 'submit').toLowerCase();
      return type === 'submit';
    }
    return false;
  }

  function isModalTrigger(el) {
    if (!el || el.closest('.request-modal')) return false;
    if (el.hasAttribute('data-no-modal')) return false;
    if (isSubmitControl(el)) return false;
    if (el.classList.contains('modalBtn')) return true;
    if (el.tagName !== 'BUTTON' && el.tagName !== 'A') return false;
    return MODAL_TRIGGER_RE.test(getTriggerLabel(el));
  }

  function createModal() {
    if (document.getElementById('requestModal')) return;

    const modal = document.createElement('div');
    modal.className = 'request-modal';
    modal.id = 'requestModal';
    modal.setAttribute('aria-hidden', 'true');
    modal.innerHTML = `
      <div class="request-modal__overlay" data-modal-close></div>
      <div
        class="request-modal__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="requestModalTitle"
      >
        <button type="button" class="request-modal__close" data-modal-close aria-label="Закрыть">&times;</button>
        <h2 id="requestModalTitle" class="request-modal__title">Оставить заявку</h2>
        <p class="request-modal__subtitle">
          Оставьте контакты — менеджер свяжется с вами и проконсультирует по покупке, кредиту, лизингу и страхованию.
        </p>
        <form class="request-modal__form" id="requestModalForm">
          <input type="text" name="name" placeholder="Имя" autocomplete="name" required>
          <input type="tel" name="phone" placeholder="Номер телефона" autocomplete="tel" required>
          <input type="email" name="email" placeholder="Email (необязательно)" autocomplete="email">
          <textarea name="message" placeholder="Комментарий (необязательно)" rows="3"></textarea>
          <button type="submit" class="request-modal__submit">Отправить заявку</button>
        </form>
      </div>
    `;

    document.body.appendChild(modal);

    modal.querySelectorAll('[data-modal-close]').forEach(el => {
      el.addEventListener('click', closeModal);
    });

    modal.querySelector('#requestModalForm').addEventListener('submit', e => {
      e.preventDefault();
      const form = e.currentTarget;
      const dialog = modal.querySelector('.request-modal__dialog');
      const title = modal.querySelector('.request-modal__title');
      const subtitle = modal.querySelector('.request-modal__subtitle');

      form.remove();
      if (subtitle) subtitle.remove();
      title.textContent = 'Заявка отправлена';

      const success = document.createElement('p');
      success.className = 'request-modal__success';
      success.textContent =
        'Спасибо! Мы получили вашу заявку и свяжемся с вами в ближайшее время.';
      dialog.appendChild(success);
    });
  }

  function openModal() {
    createModal();
    const modal = document.getElementById('requestModal');
    if (!modal) return;

    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');

    const mainButton = document.getElementById('main-button');
    if (mainButton) mainButton.classList.remove('open');

    const firstInput = modal.querySelector('input[name="name"]');
    if (firstInput) {
      requestAnimationFrame(() => firstInput.focus());
    }
  }

  function closeModal() {
    const modal = document.getElementById('requestModal');
    if (!modal) return;

    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  }

  window.openModal = openModal;
  window.closeModal = closeModal;

  document.addEventListener('click', e => {
    const trigger = e.target.closest('a, button');
    if (!trigger || !isModalTrigger(trigger)) return;

    e.preventDefault();
    openModal();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });
})();

(function initMobileMenu() {
  const triggers = [
    document.getElementById('navTrigger'),
    document.getElementById('navTrigger2'),
  ].filter(Boolean);
  const headerNav = document.querySelector('header .headernav nav ul');

  if (!triggers.length || !headerNav) return;

  const phoneIcon =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>';
  const mailIcon =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="3"/><polyline points="2,4 12,13 22,4"/></svg>';

  function getContactLink(selectors) {
    for (const selector of selectors) {
      const link = document.querySelector(selector);
      if (link?.getAttribute('href')) return link;
    }
    return null;
  }

  function getSocialLinks() {
    const links = [
      {
        href: 'https://wa.me/79189179163',
        img: '/assests/img/whatsapp.svg',
        label: 'WhatsApp',
      },
      {
        href: 'https://t.me/+79043430043',
        img: '/assests/img/telegram.svg',
        label: 'Telegram',
      },
      {
        href: '/contacts.html',
        img: '/assests/img/maxmessencer.png',
        label: 'MAX',
      },
    ];

    const widgetWhatsApp = document.getElementById('wrapper_whatsapp');
    const widgetTelegram = document.getElementById('wrappertg');
    const widgetMax = document.querySelector('#main-div a[title="mesenger"], #main-div a[title="messenger"]');

    if (widgetWhatsApp?.href?.startsWith('http')) links[0].href = widgetWhatsApp.href;
    if (widgetTelegram?.href?.startsWith('http')) links[1].href = widgetTelegram.href;
    if (widgetMax?.href?.startsWith('http')) links[2].href = widgetMax.href;

    document.querySelectorAll('footer .icons a[href]').forEach((link, index) => {
      const href = link.getAttribute('href')?.trim();
      const img = link.querySelector('img')?.getAttribute('src');
      if (!href?.startsWith('http') || !img || !links[index]) return;
      links[index].href = href;
      links[index].img = img;
    });

    return links;
  }

  function createMenuModal() {
    document.getElementById('siteMenuModal')?.remove();

    const logo = document.querySelector('header .logo img');
    const emailLink = getContactLink(['header .phone a[href^="mailto:"]']);
    const phoneLink = getContactLink([
      'header .icons__phone[href^="tel:"]',
      'header .icons a[href^="tel:"]',
    ]);
    const socials = getSocialLinks();

    const modal = document.createElement('div');
    modal.className = 'site-menu-modal';
    modal.id = 'siteMenuModal';
    modal.setAttribute('aria-hidden', 'true');

    modal.innerHTML = `
      <div class="site-menu-modal__overlay" data-menu-close></div>
      <div class="site-menu-modal__panel" role="dialog" aria-modal="true" aria-labelledby="siteMenuTitle">
        <div class="site-menu-modal__head">
          <div class="site-menu-modal__brand">
            ${logo ? `<img src="${logo.getAttribute('src')}" alt="${logo.getAttribute('alt') || 'МаксАвто'}">` : ''}
          </div>
          <button type="button" class="site-menu-modal__close" data-menu-close aria-label="Закрыть меню">&times;</button>
        </div>
       
        <nav class="site-menu-modal__nav" aria-label="Навигация"></nav>
        <div class="site-menu-modal__contacts"></div>
        <div class="site-menu-modal__socials">
          <span class="site-menu-modal__socials-label">Мы в соцсетях</span>
          <div class="site-menu-modal__socials-row"></div>
        </div>
        <button type="button" class="site-menu-modal__cta modalBtn">Оставить заявку</button>
      </div>
    `;

    document.body.appendChild(modal);

    const navList = modal.querySelector('.site-menu-modal__nav');
    navList.appendChild(headerNav.cloneNode(true));

    const contacts = modal.querySelector('.site-menu-modal__contacts');
    if (phoneLink) {
      contacts.insertAdjacentHTML(
        'beforeend',
        `<a href="${phoneLink.getAttribute('href')}" class="site-menu-modal__contact">
          <span class="site-menu-modal__contact-icon">${phoneIcon}</span>
          <span class="site-menu-modal__contact-text">${phoneLink.textContent.trim()}</span>
        </a>`,
      );
    }
    if (emailLink) {
      contacts.insertAdjacentHTML(
        'beforeend',
        `<a href="${emailLink.getAttribute('href')}" class="site-menu-modal__contact">
          <span class="site-menu-modal__contact-icon">${mailIcon}</span>
          <span class="site-menu-modal__contact-text">${emailLink.textContent.trim()}</span>
        </a>`,
      );
    }

    const socialsRow = modal.querySelector('.site-menu-modal__socials-row');
    socials.forEach((social) => {
      const item = document.createElement('a');
      item.className = 'site-menu-modal__social';
      item.href = social.href;
      item.target = '_blank';
      item.rel = 'noopener noreferrer';
      item.setAttribute('aria-label', social.label);
      item.innerHTML = `<img src="${social.img}" alt="">`;
      socialsRow.appendChild(item);
    });

    modal.querySelectorAll('[data-menu-close]').forEach((el) => {
      el.addEventListener('click', closeMenu);
    });

    modal.querySelectorAll('.site-menu-modal__nav a').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    modal.querySelector('.site-menu-modal__cta')?.addEventListener('click', closeMenu);
  }

  function setMenuOpen(isOpen) {
    const modal = document.getElementById('siteMenuModal');
    if (!modal) return;

    modal.classList.toggle('is-open', isOpen);
    modal.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
    document.body.classList.toggle('menu-open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';

    triggers.forEach((trigger) => {
      trigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  function openMenu() {
    createMenuModal();
    setMenuOpen(true);
  }

  function toggleMenu() {
    const modal = document.getElementById('siteMenuModal');
    if (modal?.classList.contains('is-open')) closeMenu();
    else openMenu();
  }

  window.closeSiteMenu = closeMenu;

  triggers.forEach((trigger) => {
    trigger.setAttribute('role', 'button');
    trigger.setAttribute('aria-expanded', 'false');
    trigger.setAttribute('aria-label', 'Открыть меню');
    trigger.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      toggleMenu();
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    const modal = document.getElementById('siteMenuModal');
    if (modal?.classList.contains('is-open')) closeMenu();
  });
})();

document.querySelectorAll('.brends-card').forEach((card) => {
  if (card.closest('a.brends-card-link')) return;

  const link = document.createElement('a');
  link.href = '/catalog.html';
  link.className = 'brends-card-link';
  link.setAttribute('aria-label', 'Перейти в каталог');
  card.parentNode.insertBefore(link, card);
  link.appendChild(card);
});

document.querySelectorAll('._faq_item').forEach(item => {
  const answer = item.querySelector('._faq_answer');

  if (item.classList.contains('active')) {
    answer.style.height = answer.scrollHeight + 'px';
  }

  item.querySelector('._faq_question').addEventListener('click', () => {
    const isActive = item.classList.contains('active');

    document.querySelectorAll('._faq_item').forEach(i => {
      i.classList.remove('active');
      i.querySelector('._faq_answer').style.height = '0px';
    });

    if (!isActive) {
      item.classList.add('active');
      answer.style.height = answer.scrollHeight + 'px';
    }
  });
});