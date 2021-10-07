const gameBoard = (() => {
  let gameBoardArray = ["", "", "", "", "", "", "", "", ""];

  const addMark = (arrayIndex, mark) => {
    gameBoardArray[arrayIndex] = mark;
  };

  const renderBoard = () => {
    for (let i = 0; i < gameBoardArray.length; i++) {
      document.querySelector(`.s${i + 1}`).innerHTML = gameBoardArray[i];
    }
    
  };

  const checkTie = () => {
    return gameBoardArray.includes("");
  }


  return { addMark, renderBoard, gameBoardArray, checkTie };
})();

const Player = (playerName, playerMark) => {
  const getName = playerName;
  const getPlayerMark = playerMark;

  return { getName, getPlayerMark };
};

const displayController = (() => {
  const player1Name = document.querySelector('.player1Name');
  const player2Name = document.querySelector('.player2Name');
  const square = document.getElementsByClassName("square");
  console.log(square.length);

  let player1 = Player("oscar", "X");
  let player2 = Player("Luis", "O");

  gameBoard.renderBoard();
  

  let isplayer1Playing = true;

  let winningCombination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2],
  ];

  const check3InARow = (combinations) => {
    let a, b, c;

    for (let i = 0; i < combinations.length; i++) {
      [a, b, c] = combinations[i];
      if (
        (square[a].innerHTML == "X" &&
          square[b].innerHTML == "X" &&
          square[c].innerHTML == "X") ||
        (square[a].innerHTML == "O" &&
          square[b].innerHTML == "O" &&
          square[c].innerHTML == "O")
      ) {
        square[a].classList.add("inARow");
        square[b].classList.add("inARow");
        square[c].classList.add("inARow");

        if (isplayer1Playing){
          player2Name.innerHTML = `${player2.getName} wins!`;
        }else {
          player1Name.innerHTML = `${player1.getName} wins!`;
        }
      }

    }

  };


  //Hacer una función para si hay tie
  

  for (let i = 0; i < square.length; i++) {
    square[i].addEventListener("click", (e) => {
      if (isplayer1Playing) {
        
        console.log(square[i]);
        gameBoard.addMark(square[i].id, player1.getPlayerMark);
        if (square[i].hasAttribute("id") == true) {
          square[i].innerHTML = player1.getPlayerMark;
          isplayer1Playing = false;
          console.log(`${player2.getName}'s turn`);
          player1Name.innerHTML = "";
          player2Name.innerHTML = `${player2.getName}'s turn`;
          
        }
        square[i].removeAttribute("id");
        console.log(gameBoard.gameBoardArray);
        if (gameBoard.checkTie() == false) {
          console.log('tieeee');
        }
        
        e.stopPropagation();
      } else {
        
        console.log(square[i]);
        gameBoard.addMark(square[i].id, player2.getPlayerMark);
        if (square[i].hasAttribute("id") == true) {
          square[i].innerHTML = player2.getPlayerMark;
          isplayer1Playing = true;
          console.log(`${player1.getName}'s turn`);
          player2Name.innerHTML = "";
          player1Name.innerHTML = `${player1.getName}'s turn`;
          
        }
        square[i].removeAttribute("id");

        console.log(gameBoard.gameBoardArray);
        if (gameBoard.checkTie() == false) {
          console.log('tieeee');
        }
        e.stopPropagation();
      }
      check3InARow(winningCombination);
    });
  }
})();

/*
COMO FUNCIONARÁ EL JUEGO:

1. El jugador 1  tira ✓
2. Cambiar a jugador 2 ✓
  -No puede tirar en un lugar ocupado ✓
3. El jugador 2 tira ✓
4. Si hay 3 in a row de una marca:
  - El juego acaba
      -Poner una pantalla encima para que ya no se le pueda picar a la cuadrícula
  - Se anuncia un ganador ✓
  - Habrá un botón de reiniciar
      -Hacer una función para regresar todo como al inicio y ligarla al botón
5. Si el juego acaba y no hay 3 in a row:
  - Se anuncia que fue un empate
6. Podría haber un solo botón y que cambie entre reiniciar y jugar

*/
