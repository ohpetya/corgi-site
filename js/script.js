const container = document.getElementById("game-container");
const message = document.getElementById("message");
const livesDisplay = document.getElementById("lives");

let level = 3;
let lives = 3;
let correctCells = [];
let selectedCells = [];
let scoreBoard = [];

// Загружаем сохраненные результаты при запуске
document.addEventListener('DOMContentLoaded', () => {
    loadScoreboard();
    if (container) startGame();
});

function startGame() {
    if (!container) return;
    
    if (level > 12) {
        message.textContent = "Поздравляем! Вы прошли все уровни!";
        return;
    }

    correctCells = [];
    selectedCells = [];
    container.innerHTML = "";

    message.textContent = `Уровень ${level - 2}: Запомни ${level} зелёных плиток!`;
    createGrid(level);
    highlightRandomCells(level);
}

function createGrid(size) {
  container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  container.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  for (let i = 0; i < size * size; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;

    cell.addEventListener("click", () => handleCellClick(cell));
    container.appendChild(cell);
  }
}

function highlightRandomCells(count) {
  const cells = document.querySelectorAll(".cell");
  const totalCells = cells.length;

  while (correctCells.length < count) {
    const randomIndex = Math.floor(Math.random() * totalCells);
    if (!correctCells.includes(randomIndex)) {
      correctCells.push(randomIndex);
    }
  }

  correctCells.forEach((index) => {
    cells[index].classList.add("green");
  });

  setTimeout(() => {
    cells.forEach((cell) => cell.classList.remove("green"));
  }, 1000);
}

function handleCellClick(cell) {
  const index = parseInt(cell.dataset.index);

  if (selectedCells.includes(index)) return;

  selectedCells.push(index);
  cell.classList.add("clicked");

  if (selectedCells.length === correctCells.length) {
    checkResult();
  }
}

function checkResult() {
  const isCorrect = selectedCells.every((index) => correctCells.includes(index)) &&
                    correctCells.every((index) => selectedCells.includes(index));

  if (isCorrect) {
    message.textContent = "Правильно! Переход на следующий уровень!";
    level++;
    setTimeout(startGame, 1500);
  } else {
    lives--;
    livesDisplay.textContent = lives;

    if (lives === 0) {
      message.textContent = "Игра окончена! Попробуй снова.";
      container.innerHTML = "";

      const playerName = prompt("Введите ваше имя:");
      if (playerName) {
        updateScoreboard(playerName, level - 1);
      }
    } else {
      message.textContent = "Неправильно! Попробуй снова.";
      selectedCells = [];
      setTimeout(startGame, 1500);
    }
  }
}

function restartGame() {
    level = 3;
    lives = 3; 
    livesDisplay.textContent = lives;
    startGame();
}

// Сохраняем таблицу рекордов
function saveScoreboard() {
    localStorage.setItem('memoryGameScoreboard', JSON.stringify(scoreBoard));
}

// Загружаем таблицу рекордов
function loadScoreboard() {
    const saved = localStorage.getItem('memoryGameScoreboard');
    if (saved) {
        scoreBoard = JSON.parse(saved);
        updateScoreboardDisplay();
    }
}

function updateScoreboard(playerName, playerRecord) {
    const existingPlayer = scoreBoard.find((player) => player.name === playerName);

    if (existingPlayer) {
        if (playerRecord > existingPlayer.record) {
            existingPlayer.record = playerRecord;
        }
    } else {
        scoreBoard.push({ name: playerName, record: playerRecord });
    }

    scoreBoard.sort((a, b) => b.record - a.record);
    scoreBoard = scoreBoard.slice(0, 10); // Сохраняем топ-10
    
    saveScoreboard();
    updateScoreboardDisplay();
}

function updateScoreboardDisplay() {
    const scoreboardBody = document.getElementById("scoreboard-body");
    if (!scoreboardBody) return;
    
    scoreboardBody.innerHTML = "";
    scoreBoard.forEach((player) => {
        const row = document.createElement("tr");
        row.innerHTML = `<td>${player.name}</td><td>${player.record}</td>`;
        scoreboardBody.appendChild(row);
    });
}

function clearScoreboard() {
    if (confirm("Вы уверены, что хотите очистить всю таблицу рекордов?")) {
        scoreBoard = [];
        localStorage.removeItem('memoryGameScoreboard');
        updateScoreboardDisplay();
    }
}