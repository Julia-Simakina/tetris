const playingField = document.querySelector(".playing-field");
const score = 0;

//Объект для создания массива с длиной (высотой поля) 20
const initialObject = {
  length: 20,
};

//Создаю игровое поле (многомерный массив)
const gameBoard = Array.from(initialObject, () => new Array(10).fill(0));
console.log(gameBoard);


//Ячейки grid
for (let i = 0; i < 200; i++) {
  let ceil = document.createElement('div');
  ceil.classList.add('playing-field__ceil')
  playingField.appendChild(ceil);
}

//Фигурки
const tetrominos = {
  I: {
    color: "#FFAE00",
    model: [
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
  },
  J: {
    color: "#af00cc",
    model: [
      [0, 0, 2],
      [0, 0, 2],
      [0, 2, 2],
    ],
  },
  L: {
    color: "#133AAC",
    model: [
      [3, 0, 0],
      [3, 0, 0],
      [3, 3, 0],
    ],
  },
  O: {
    color: "#FFC900",
    model: [
      [4, 4],
      [4, 4],
    ],
  },
  S: {
    color: "#87EA00",
    model: [
      [0, 5, 5],
      [5, 5, 0],
    ],
  },
  T: {
    color: "#d00000",
    model: [
      [6, 6, 6],
      [0, 6, 0],
    ],
  },
  Z: {
    color: "#560EAD",
    model: [
      [7, 7, 0],
      [0, 7, 7],
    ],
  },
};

// const block = document.createElement('div');
// block.classList.add("block");
// playingField.append(block);

// Отрисовка фигуры на игровом поле
function renderingTetromino(tetromino, color) {
  tetromino.forEach((row, i) => {
    row.forEach((cell, j) => {
      if (cell) {
        const block = document.createElement("div");
        block.classList.add("block");
        // if (cell === 6) {
        //   block.style.backgroundColor = "green";
        // }
        block.style.backgroundColor = color;

        block.style.top = `${i * 30}px`;
        block.style.left = `${j * 30}px`;
        playingField.append(block);

        console.log("j>>>", j);
      }
    });
  });
}

// for (let i = 0; i < gameBoard.length; i++) {
//   for (let j = 0; j < gameBoard[i]; j++) {
//     let ceil = document.createElement("div");
//     ceil.innerHTML = `${gameBoard[i][j]}`;
//     ceil.classList.add("laying-field__ceil");

//     playingField.append(ceil);
//   }
// }

// Начало игры
function game() {
  const tetromino = tetrominos.I.model;
  const color = tetrominos.I.color;
  renderingTetromino(tetromino, color);
}

game();
