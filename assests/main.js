const SLIDE_DELAY = 3000;

// ── Hero title JS ──
document.querySelectorAll('.hero__title').forEach(title => {
  const words = title.textContent.trim().split(/\s+/);
  if (words.length < 2) return;
  title.innerHTML =
    words[0] +
    '<br><span>' + words[1] + '</span> ' +
    words.slice(2).join(' ');
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

const brandSelect   = document.getElementById('brandSelect');
const modelSelect   = document.getElementById('modelSelect');
const brandDropdown = document.getElementById('brandDropdown');
const modelDropdown = document.getElementById('modelDropdown');

let selectedBrand = null;

// Toggle dropdown
function toggleSelect(el) {
  const isOpen = el.classList.contains('open');
  document.querySelectorAll('.car-search__select').forEach(s => s.classList.remove('open'));
  if (!isOpen) el.classList.add('open');
}

brandSelect.addEventListener('click', e => { e.stopPropagation(); toggleSelect(brandSelect); });
modelSelect.addEventListener('click', e => { e.stopPropagation(); toggleSelect(modelSelect); });

document.addEventListener('click', () => {
  document.querySelectorAll('.car-search__select').forEach(s => s.classList.remove('open'));
});

// Brand seçimi
brandDropdown.querySelectorAll('.car-search__option').forEach(opt => {
  opt.addEventListener('click', e => {
    e.stopPropagation();
    selectedBrand = opt.dataset.value;
    brandSelect.querySelector('.car-search__value').textContent = opt.textContent;
    brandSelect.querySelector('.car-search__value').classList.add('selected');
    brandSelect.classList.remove('open');

    // Model dropdown-u doldur
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