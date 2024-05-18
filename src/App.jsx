import { useRef, useState } from "react";

import "./App.css";

function Square({ value, onSquareClick, position }) {
  return (
    <button className={`square ${position}`} onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function Board() {
  let [squares, setSquares] = useState(Array(9).fill(null));
  let [player, setPlayer] = useState(0);
  let click = useRef(0);

  const handleSquareClick = (index) => {
    if (squares[index] || calculateWinner(squares)) return;

    const nextSquares = squares.slice();

    nextSquares[index] = player === 0 ? "X" : "O";
    setSquares(nextSquares);

    changePlayer();

    click.current += 1;
  };

  const changePlayer = () => {
    setPlayer(player === 0 ? 1 : 0);
  };

  const calculateWinner = (squaresArray) => {
    const winnerLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    // Checks if any winning line is 'owned' by a single player
    // returns "X" or "O" if there's a winner, null otherwise
    for (let i = 0; i < winnerLines.length; ++i) {
      const [a, b, c] = winnerLines[i];
      if (
        squaresArray[a] &&
        squaresArray[a] === squaresArray[b] &&
        squaresArray[a] === squaresArray[c]
      ) {
        return squaresArray[a];
      }
    }

    return null;
  };

  let winnerSign = calculateWinner(squares);

  let status;
  if (winnerSign) {
    status = `Player ${winnerSign} has won!`;
  } else if (click.current == 9) {
    status = "Tie!";
  } else {
    status = `Turn: ${player === 0 ? "X" : "O"}`;
  }

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setPlayer(Math.floor(Math.random() * 100) % 2 === 0 ? 0 : 1);

    winnerSign = "";
    click.current = 0;
    status = "";
  };

  return (
    <div className="game">
      <div className="status">{status}</div>
      <div className="board-row">
        <Square
          position={"top left"}
          value={squares[0]}
          onSquareClick={() => handleSquareClick(0)}
        ></Square>

        <Square
          position={"top"}
          value={squares[1]}
          onSquareClick={() => handleSquareClick(1)}
        ></Square>

        <Square
          position={"top right"}
          value={squares[2]}
          onSquareClick={() => handleSquareClick(2)}
        ></Square>
      </div>

      <div className="board-row">
        <Square
          position={"mid-left"}
          value={squares[3]}
          onSquareClick={() => handleSquareClick(3)}
        ></Square>

        <Square
          value={squares[4]}
          onSquareClick={() => handleSquareClick(4)}
        ></Square>

        <Square
          position={"mid-right"}
          value={squares[5]}
          onSquareClick={() => handleSquareClick(5)}
        ></Square>
      </div>

      <div className="board-row">
        <Square
          position={"bottom left"}
          value={squares[6]}
          onSquareClick={() => handleSquareClick(6)}
        ></Square>

        <Square
          position={"bottom"}
          value={squares[7]}
          onSquareClick={() => handleSquareClick(7)}
        ></Square>

        <Square
          position={"bottom right"}
          value={squares[8]}
          onSquareClick={() => handleSquareClick(8)}
        ></Square>
      </div>
      <button onClick={resetGame} className="reset-btn">
        Reset Game
      </button>
    </div>
  );
}
