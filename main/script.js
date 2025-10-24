const track = document.querySelector('.bg-track');
const indicators = document.querySelectorAll('.indicator');
let index = 0;
let slideCount = 4;
let startX = 0;
let isDragging = false;
let autoSlideTimer;

/* ========================= */
/*     슬라이드 인디케이터    */
/* ========================= */
function updateIndicator() {
  indicators.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
}

function moveSlide(newIndex) {
  index = (newIndex + slideCount) % slideCount;
  track.style.transform = `translateX(-${index * 100}vw)`;
  updateIndicator();
}

/* ========================= */
/*        자동 슬라이드       */
/* ========================= */
function startAutoSlide() {
  autoSlideTimer = setInterval(() => {
    moveSlide(index + 1);
  }, 8000);
}

function stopAutoSlide() {
  clearInterval(autoSlideTimer);
}

/* ========================= */
/*       드래그 이벤트         */
/* ========================= */
track.addEventListener('mousedown', e => {
  stopAutoSlide();
  isDragging = true;
  startX = e.pageX;
});

track.addEventListener('mouseup', e => {
  if (!isDragging) return;
  isDragging = false;
  let delta = e.pageX - startX;
  if (delta > 50) moveSlide(index - 1);
  else if (delta < -50) moveSlide(index + 1);
  startAutoSlide();
});

track.addEventListener('mouseleave', () => isDragging = false);

track.addEventListener('touchstart', e => {
  stopAutoSlide();
  startX = e.touches[0].pageX;
});

track.addEventListener('touchend', e => {
  let delta = e.changedTouches[0].pageX - startX;
  if (delta > 50) moveSlide(index - 1);
  else if (delta < -50) moveSlide(index + 1);
  startAutoSlide();
});

/* =================================== */
/*           Career Panel 토글          */
/* =================================== */
const mainWrapper = document.querySelector('.main-wrapper');
const careerPanel = document.getElementById('careerPanel');
const careerMenu = document.querySelector('[data-menu="career"]');
const homeLogo = document.getElementById('homeLogo');

let careerOpen = false;  // 패널 열림 여부

function toggleCareerPanel() {
  if (!careerOpen) {
    // 열기
    mainWrapper.style.transform = "translateY(-95vh)";
    careerPanel.classList.add('active');
    careerOpen = true;
  } else {
    // 닫기
    mainWrapper.style.transform = "translateY(0)";
    careerPanel.classList.remove('active');
    careerOpen = false;
  }
}

/* 메뉴 버튼 클릭 → career 패널 토글 */
careerMenu.addEventListener('click', toggleCareerPanel);

/* 로고 클릭 → career 패널 닫기 전용 */
homeLogo.addEventListener('click', () => {
  if (careerOpen) {
    mainWrapper.style.transform = "translateY(0)";
    careerPanel.classList.remove('active');
    careerOpen = false;
  }
});

/* 초기화 */
updateIndicator();
startAutoSlide();
