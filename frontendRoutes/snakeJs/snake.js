const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const computedStyle = window.getComputedStyle(canvas);
canvas.width = parseInt(computedStyle.width); // Récupère la largeur CSS
canvas.height = parseInt(computedStyle.height); // Récupère la hauteur CSS

const gridSize = canvas.width / 20 ; // Size of each cell in pixels
const canvasSize = canvas.width; // Canvas width and height
const totalCells = canvasSize / gridSize;

console.log(gridSize);

// Snake and food
let snake = [{ x: 10, y: 10 }]; // Snake starts at the center
let food = { x: 0, y: 0 };
let direction = { x: 0, y: 1 }; // Initial direction
let snakeLength = 1;
let gameRunning = true;

// Draw a cell
function drawCell(x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x * gridSize, y * gridSize, gridSize, gridSize);
}

// Place food randomly
function placeFood() {
  food = {
    x: Math.floor(Math.random() * totalCells),
    y: Math.floor(Math.random() * totalCells),
  };

  // Ensure food doesn't spawn on the snake
  if (snake.some(segment => segment.x === food.x && segment.y === food.y)) {
    placeFood();
  }
}

// Update the game state
function updateGame() {
  if (!gameRunning) return;

  // Move the snake
  const head = {
    x: snake[0].x + direction.x,
    y: snake[0].y + direction.y,
  };

  // Check collisions
  if (
    head.x < 0 || head.x >= totalCells || 
    head.y < 0 || head.y >= totalCells || 
    snake.some(segment => segment.x === head.x && segment.y === head.y)
  ) {
    gameRunning = false;
    alert("Game Over! Press OK to restart.");
    document.location.reload();
    return;
  }

  // Add new head to the snake
  snake.unshift(head);

  // Check if food is eaten
  if (head.x === food.x && head.y === food.y) {
    snakeLength++;
    placeFood();
  }

  // Remove tail if the snake hasn't grown
  while (snake.length > snakeLength) {
    snake.pop();
  }

}

// Render the game
function renderGame() {
  // Clear the canvas
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.width);

  // Draw food
  drawCell(food.x, food.y, "#f00");

  // Draw snake
  snake.forEach(segment => drawCell(segment.x, segment.y, "#0f0"));
}

document.getElementById("upBtn").addEventListener("click", handleInput); // Pour le bouton haut
document.getElementById("downBtn").addEventListener("click", handleInput); // Pour le bouton bas
document.getElementById("leftBtn").addEventListener("click", handleInput); // Pour le bouton gauche
document.getElementById("rightBtn").addEventListener("click", handleInput); // Pour le bouton droite

// Handle keyboard input
function handleInput(event) {
    // Si l'événement est un événement clavier
    if (event.type === "keydown") {
      switch (event.key) {
        case "ArrowUp":
          if (direction.y === 0) direction = { x: 0, y: -1 };
          break;
        case "ArrowDown":
          if (direction.y === 0) direction = { x: 0, y: 1 };
          break;
        case "ArrowLeft":
          if (direction.x === 0) direction = { x: -1, y: 0 };
          break;
        case "ArrowRight":
          if (direction.x === 0) direction = { x: 1, y: 0 };
          break;
      }
    }
  
    // Si l'événement est un événement de clic (pour les boutons mobiles)
    if (event.type === "click") {
      // L'argument "directionInput" peut être soit "up", "down", "left", "right"
      if (event.currentTarget.id === "upBtn" && direction.y === 0) {
        direction = { x: 0, y: -1 };
      } else if (event.currentTarget.id === "downBtn" && direction.y === 0) {
        direction = { x: 0, y: 1 };
      } else if (event.currentTarget.id === "leftBtn" && direction.x === 0) {
        direction = { x: -1, y: 0 };
      } else if (event.currentTarget.id === "rightBtn" && direction.x === 0) {
        direction = { x: 1, y: 0 };
      }
    }
  }

// Main game loop
function gameLoop() {
  updateGame();
  renderGame();
}

// Initialize the game
function startGame() {
  placeFood();
  document.addEventListener("keydown", handleInput);
  setInterval(gameLoop, 100); // Game updates every 100ms
}

startGame();