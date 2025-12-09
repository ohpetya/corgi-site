let score = 0;

const paw = document.getElementById('corgi-paw');
const scoreDisplay = document.getElementById('score');
const resetBtn = document.getElementById('reset-btn');

paw.addEventListener('click', () => {
  score++;
  scoreDisplay.textContent = `Счёт: ${score}`;
});

resetBtn.addEventListener('click', () => {
  score = 0;
  scoreDisplay.textContent = `Счёт: ${score}`;
});
