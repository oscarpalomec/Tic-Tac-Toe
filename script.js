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
  };

  const consoleGameboardArray = () => {
    console.log(gameBoardArray);
  };

  const emptyArray = () => {
    for (let i = 0; i < gameBoardArray.length; i++) {
      gameBoardArray[i] = "";
    }
  };

  return {
    addMark,
    renderBoard,
    gameBoardArray,
    checkTie,
    consoleGameboardArray,
    emptyArray,
  };
})();

const Player = (playerName, playerMark) => {
  const getName = playerName;
  const getPlayerMark = playerMark;

  return { getName, getPlayerMark };
};

const displayController = (() => {
  const modalButton = document.getElementById("show-modal");
  const addPlayersBtn = document.querySelector("#add-players-button");
  const restartBtn = document.querySelector("#restart-button");
  const player1Name = document.querySelector(".player1Name");
  const player2Name = document.querySelector(".player2Name");
  const square = document.getElementsByClassName("square");
  let player1, player2;

  function showModal() {
    document.querySelector(".bg-modal").style.display = "flex";
  }

  modalButton.addEventListener("click", showModal);

  addPlayersBtn.addEventListener("click", addNewPlayers);

  restartBtn.addEventListener("click", restartGame);

  const clearGameboard = () => {
    for (let i = 0; i < square.length; i++) {
      square[i].innerHTML = "";
      square[i].classList.remove("inARow");
      square[i].setAttribute("id", `${i}`);
    }
  };

  const removeSquareAttribute = () => {
    for (let i = 0; i < square.length; i++) {
      square[i].removeAttribute("id");
    }
  };

  function addNewPlayers(e) {
    e.preventDefault();
    gameBoard.emptyArray();
    clearGameboard();
    gameBoard.consoleGameboardArray();
    const player1sName = document.getElementById("player1Name");
    const player2sName = document.getElementById("player2Name");

    player1 = Player(player1sName.value, "X");
    player2 = Player(player2sName.value, "O");
    player1Name.innerHTML = `${player1.getName}'s turn`;
    player2Name.innerHTML = "";
    player1sName.value = "";
    player2sName.value = "";
    document.querySelector(".bg-modal").style.display = "none";
  }

  function restartGame(e) {
    e.preventDefault();
    gameBoard.emptyArray();
    clearGameboard();
    gameBoard.consoleGameboardArray();
    isplayer1Playing = true;
    player2Name.innerHTML = "";
    player1Name.innerHTML = `${player1.getName}'s turn`;
  }
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

        if (isplayer1Playing) {
          player2Name.innerHTML = `${player2.getName} wins!`;
          player1Name.innerHTML = `${player2.getName} wins!`;
          removeSquareAttribute();
        } else {
          player1Name.innerHTML = `${player1.getName} wins!`;
          player2Name.innerHTML = `${player1.getName} wins!`;
          removeSquareAttribute();
        }
      }
    }
  };

  for (let i = 0; i < square.length; i++) {
    square[i].addEventListener("click", (e) => {
      if (isplayer1Playing) {
        gameBoard.addMark(square[i].id, player1.getPlayerMark);
        if (square[i].hasAttribute("id") == true) {
          square[i].innerHTML = player1.getPlayerMark;
          gameBoard.consoleGameboardArray();
          isplayer1Playing = false;
          player1Name.innerHTML = "";
          player2Name.innerHTML = `${player2.getName}'s turn`;
        }
        square[i].removeAttribute("id");
        if (gameBoard.checkTie() == false) {
          player1Name.innerHTML = "It's a tie!";
          player2Name.innerHTML = "It's a tie!";
        }

        e.stopPropagation();
      } else {
        gameBoard.addMark(square[i].id, player2.getPlayerMark);
        if (square[i].hasAttribute("id") == true) {
          square[i].innerHTML = player2.getPlayerMark;
          gameBoard.consoleGameboardArray();
          isplayer1Playing = true;
          player2Name.innerHTML = "";
          player1Name.innerHTML = `${player1.getName}'s turn`;
        }
        square[i].removeAttribute("id");
        if (gameBoard.checkTie() == false) {
          player1Name.innerHTML = "It's a tie!";
          player2Name.innerHTML = "It's a tie!";
        }
        e.stopPropagation();
      }
      check3InARow(winningCombination);
    });
  }
})();
