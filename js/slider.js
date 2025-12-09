document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector('.slider');
  const slidesContainer = slider.querySelector('.slides');
  const slides = slider.querySelectorAll('.slide');
  const prevBtn = slider.querySelector('.prev');
  const nextBtn = slider.querySelector('.next');

  let currentIndex = 0;
  const total = slides.length;

  function showSlide(index) {
    if (index < 0) index = total - 1;
    if (index >= total) index = 0;
    slidesContainer.style.transform = `translateX(-${index * 100}%)`;
    currentIndex = index;
  }

  prevBtn.addEventListener('click', () => {
    showSlide(currentIndex - 1);
  });

  nextBtn.addEventListener('click', () => {
    showSlide(currentIndex + 1);
  });

  // Автопрокрутка (опционально)
  setInterval(() => {
    showSlide(currentIndex + 1);
  }, 4000);
});
