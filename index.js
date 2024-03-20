const playingField = document.querySelector(".playing-field");
const score = 0;
const tetrominosName = ["I", "J", "L", "O", "S", "T", "Z"];
const randomTetraminoName =
  tetrominosName[getRandomInt(0, tetrominosName.length - 1)];
console.log(randomTetraminoName);

const tetrominos = {
  I: [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],

  J: [
    [0, 2, 0],
    [0, 2, 0],
    [2, 2, 0],
  ],

  L: [
    [3, 0, 0],
    [3, 0, 0],
    [3, 3, 0],
  ],

  O: [
    [4, 4],
    [4, 4],
  ],

  S: [
    [0, 5, 5],
    [5, 5, 0],
    [0, 0, 0],
  ],
  T: [
    [6, 6, 6],
    [0, 6, 0],
    [0, 0, 0],
  ],
  Z: [
    [7, 7, 0],
    [0, 7, 7],
    [0, 0, 0],
  ],
};

// Объект для создания массива с длиной (высотой поля) 20
const initialObject = {
  length: 20,
};

//Создаю игровое поле (многомерный массив)
const gameBoard = Array.from(initialObject, () => new Array(10).fill(0));

// gameBoard.forEach(row => {
//   row.forEach(value => {
//     let ceil = document.createElement('div');
//       ceil.classList.add('playing-field__ceil');
//       ceil.textContent = value;
//       playingField.appendChild(ceil);
//   })
// })

function getRandomElement(array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

// Cлучайное число в заданном диапазоне
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * @param tetromino - matrix
 * @param x - start X position
 * @param y - start Y position
 */
// Добавление тетромино в матрицу gameBoard по указанным координатам x и y
function addTetrominoToBoard(tetromino, x, y) {
  tetromino.forEach((tetRow, tetRowIndex) => {
    tetRow.forEach((tetCol, tetColIndex) => {
      if (tetCol) {
        gameBoard[tetRowIndex + y][tetColIndex + x] = tetCol;
      }
    });
  });

  rerender();
}

let initialX = 3; // начальная позиция по оси X
let initialY = 3; // начальная позиция по оси Y

//Ячейки grid
function initializeGameBoard() {
  for (let row = 0; row < gameBoard.length; row++) {
    for (let j = 0; j < gameBoard[row].length; j++) {
      let ceil = document.createElement("div");
      ceil.classList.add("playing-field__ceil");
      // ceil.textContent = gameBoard[row][j];
      ceil.setAttribute("id", `ceil_${[row]}_${[j]}`);
      playingField.append(ceil);
    }
  }
}

// Перерисовка поля при кажом изменении
const rerender = () => {
  for (let row = 0; row < gameBoard.length; row++) {
    for (let col = 0; col < gameBoard[row].length; col++) {
      let ceil = document.getElementById(`ceil_${[row]}_${[col]}`);
      if (gameBoard[row][col - 1]) {
        ceil.removeAttribute("class");
        // ceil.classList.add("playing-field__ceil");
      }
      switch (gameBoard[row][col]) {
        // case 0:
        //   ceil.classList.add("playing-field__ceil");
        //   break;
        case 1:
          ceil.classList.add("I");
          break;
        case 2:
          ceil.classList.add("J");
          break;

        case 3:
          ceil.classList.add("L");
          break;

        case 4:
          ceil.classList.add("O");
          break;

        case 5:
          ceil.classList.add("S");
          break;
        case 6:
          ceil.classList.add("T");
          break;

        case 7:
          ceil.classList.add("Z");
          break;
      }
    }
  }
};

let currentTetromino = tetrominos[randomTetraminoName];
function moveRight() {
  if (initialX + currentTetromino[0].length < gameBoard[0].length) {
    initialX++; // Смещение вправо
    // Обновить матрицу с учетом новых координат
    for (let tetRow = 0; tetRow < currentTetromino.length; tetRow++) {
      for (
        let tetCol = currentTetromino[tetRow].length - 1;
        tetCol >= 0;
        tetCol--
      ) {
        if (currentTetromino[tetRow][tetCol] !== 0) {
          gameBoard[initialY + tetRow][initialX + tetCol] =
            currentTetromino[tetRow][tetCol];
          // Обнулить предыдущее местоположение тетрамино
          if (tetCol !== 0) {
            gameBoard[initialY + tetRow][initialX + tetCol - 1] = 0;
          }
        }
      }
    }
  }
}
function moveLeft() {
  if (initialX > 0) {
    initialX--; // Смещение влево
    // Обновить матрицу с учетом новых координат
    for (let tetRow = 0; tetRow < currentTetromino.length; tetRow++) {
      for (let tetCol = 0; tetCol < currentTetromino[tetRow].length; tetCol++) {
        if (currentTetromino[tetRow][tetCol] !== 0) {
          gameBoard[initialY + tetRow][initialX + tetCol] =
            currentTetromino[tetRow][tetCol];
          // Обнулить предыдущее местоположение тетрамино
          if (tetCol !== currentTetromino[tetRow].length - 1) {
            gameBoard[initialY + tetRow][initialX + tetCol + 1] = 0;
          }
        }
      }
    }
  }
}

function moveDown() {
  if (initialY + currentTetromino.length < gameBoard.length) {
    initialY++;

    for (let tetRow = currentTetromino.length - 1; tetRow >= 0; tetRow--) {
      for (let tetCol = 0; tetCol < currentTetromino[tetRow].length; tetCol++) {
        if (currentTetromino[tetRow][tetCol] !== 0) {
          gameBoard[initialY + tetRow][initialX + tetCol] =
            currentTetromino[tetRow][tetCol];
        }
        // Обнулить предыдущее местоположение тетрамино
        if (tetRow !== 0) {
          gameBoard[initialY + tetRow - 1][initialX + tetCol] = 0;
        }
      }
    }
  }
}

document.addEventListener("keydown", function (event) {
  if (event.code == "ArrowDown") {
    moveDown();
    rerender();
  }
});

document.addEventListener("keydown", function (event) {
  if (event.code == "ArrowRight") {
    moveRight();
    rerender();
  }
});

document.addEventListener("keydown", function (event) {
  if (event.code == "ArrowLeft") {
    moveLeft();
    rerender();
  }
});

// buildGameBoard();

// fallTetramino();
console.log(gameBoard);

const startGame = () => {
  initializeGameBoard();
  addTetrominoToBoard(currentTetromino, initialX, initialY);

  rerender();
  // moveDown()
  // moveTetrominoDown()

  // generateGameField()
  /*
  - generate pseudorandom block (queue) {
      - get first block from queue;
      - set it
      - generate new block
      - add to queue
    }

  - check for gameover

  - drop block {
    set listeners (keyboard events)

    handle next step {
      if (collision) {
        check for fullfilled line
        next block
      }
    }

  }
  - 
  */
};

startGame();

[
  [
    {
      state: "Active",
      tetromino: "J",
    },
    {
      state: "Empty",
    },
  ],
  [
    {
      state: "Settled",
    },
  ],
];


class ClassA {
  currentCoords = {
    x: null,
    y: null,
  }
}