const boardSize = 10;
const gameBoard = document.getElementById('game-board');
const cells = [];

let snake = [{ x: 0, y: 0 }];
let food = { x: 5, y: 5 };
let direction = 'right';
let speed = 800;

function initializeGameBoard() {
  for (let row = 0; row < boardSize; row++) {
    for (let col = 0; col < boardSize; col++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cells.push(cell);
      gameBoard.appendChild(cell);
    }
  }
}

function render() {
  cells.forEach((cell) => cell.classList.remove('snake', 'food'));

  snake.forEach((segment) => {
    const index = segment.x + segment.y * boardSize;
    cells[index].classList.add('snake');
  });

  const foodIndex = food.x + food.y * boardSize;
  cells[foodIndex].classList.add('food');
}

function update() {
  const head = Object.assign({}, snake[0]);

  switch (direction) {
    case 'up':
      head.y -= 1;
      break;
    case 'down':
      head.y += 1;
      break;
    case 'left':
      head.x -= 1;
      break;
    case 'right':
      head.x += 1;
      break;
  }

  if (head.x < 0 || head.x >= boardSize || head.y < 0 || head.y >= boardSize) {
    resetGame();
    return;
  }

  if (isCollisionWithSelf(head)) {
    resetGame();
    return;
  }

  if (head.x === food.x && head.y === food.y) {
    snake.unshift(head);
    generateFood();
  } else {
    snake.pop();
    snake.unshift(head);
  }
}

function isCollisionWithSelf(head) {
  return snake
    .slice(1)
    .some((segment) => segment.x === head.x && segment.y === head.y);
}

function generateFood() {
  let newFood;
  do {
    newFood = {
      x: Math.floor(Math.random() * boardSize),
      y: Math.floor(Math.random() * boardSize),
    };
  } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
  
  food = newFood;
}

function resetGame() {
  snake = [{ x: 0, y: 0 }];
  direction = 'right';
  generateFood();
  updateScore(snake.length);
}

// Инициализация игры
initializeGameBoard();

// Обработчики клавиатуры
document.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'ArrowUp':
      if (direction !== 'down') direction = 'up';
      break;
    case 'ArrowDown':
      if (direction !== 'up') direction = 'down';
      break;
    case 'ArrowLeft':
      if (direction !== 'right') direction = 'left';
      break;
    case 'ArrowRight':
      if (direction !== 'left') direction = 'right';
      break;
    case 'r':
    case 'R':
      resetGame();
      break;
  }
});

// Обработчики кнопок управления
document.querySelector('.up').addEventListener('click', () => {
  if (direction !== 'down') direction = 'up';
});
document.querySelector('.down').addEventListener('click', () => {
  if (direction !== 'up') direction = 'down';
});
document.querySelector('.left').addEventListener('click', () => {
  if (direction !== 'right') direction = 'left';
});
document.querySelector('.right').addEventListener('click', () => {
  if (direction !== 'left') direction = 'right';
});
document.querySelector('.reset-btn').addEventListener('click', resetGame);

// Обработчик изменения скорости
document.getElementById('speed').addEventListener('change', (e) => {
  speed = parseInt(e.target.value);
});

function updateScore(score) {
  document.getElementById('score').textContent = score;
}

// Игровой цикл
function gameLoop() {
  update();
  render();
  updateScore(snake.length);
  setTimeout(gameLoop, speed);
}

gameLoop();