const playingField = document.querySelector(".playing-field");
const score = 0;
const tetrominosName = ["I", "J", "L", "O", "S", "T", "Z"];
const randomTetraminoName =
  tetrominosName[getRandomInt(0, tetrominosName.length - 1)];
console.log(randomTetraminoName);

// Объект для создания массива с длиной (высотой поля) 20
const tetrominos = {
  I: [
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],

  J: [
    [0, 0, 2],
    [0, 0, 2],
    [0, 2, 2],
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

// Добавление тетромино в матрицу gameBoard по указанным координатам x и y
function addTetrominoToBoard(tetromino, x, y) {
  for (let i = 0; i < tetromino.length; i++) {
    for (let j = 0; j < tetromino[i].length; j++) {
      if (tetromino[i][j]) {
        gameBoard[y + i][x + j] = tetromino[i][j];
      }
    }
  }
}
const INITIAL_X_INDEX = 4; // начальная позиция по оси X
let INITIAL_Y_INDEX = 3; // начальная позиция по оси Y

// function fallTetramino() {

//   // Добавить тетромино на игровое поле
//   let initialCoord = {
//     x: INITIAL_X_INDEX,
//     y: INITIAL_Y_INDEX,
//   };
//   setInterval(() => {
//     initialCoord.y += 1;

//   // initializeGameBoard();
//   }, 1000);
// rerender()
// }

function fallTetramino() {
  setInterval(() => {
    INITIAL_Y_INDEX += 1;
    // console.log(INITIAL_Y_INDEX);
    addTetrominoToBoard(
      tetrominos[randomTetraminoName],
      INITIAL_X_INDEX,
      INITIAL_Y_INDEX
    );
    rerender();
  }, 1000);
}

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
    for (let j = 0; j < gameBoard[row].length; j++) {
      let ceil = document.getElementById(`ceil_${[row]}_${[j]}`);

      switch (gameBoard[row][j]) {
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

// buildGameBoard();

// fallTetramino();
console.log(gameBoard);

const startGame = () => {
  initializeGameBoard();
  addTetrominoToBoard(
    tetrominos[randomTetraminoName],
    INITIAL_X_INDEX,
    INITIAL_Y_INDEX
  );
  rerender()
  fallTetramino();

  //  rerender();

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
