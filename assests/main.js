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