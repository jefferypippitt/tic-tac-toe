"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

type Player = "X" | "O" | null;

export default function GameBoard() {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<Player>("X");
  const [winner, setWinner] = useState<Player | "tie" | null>(null);
  const [turns, setTurns] = useState(0);

  const handleSquareClick = (index: number) => {
    if (board[index] === null && !winner) {
      const newBoard = [...board];
      newBoard[index] = currentPlayer;
      setBoard(newBoard);
      setTurns(turns + 1);
      const newWinner = checkWin(newBoard);
      if (newWinner) {
        setWinner(newWinner);
      } else {
        setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
      }
    }
  };

  const checkWin = (board: Player[]): Player | "tie" | null => {
    const winningLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winningLines.length; i++) {
      const [a, b, c] = winningLines[i];
      if (board[a] && board[a] === board[b] && board[b] === board[c]) {
        return board[a];
      }
    }

    if (board.every((square) => square !== null)) {
      return "tie";
    }

    return null;
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer("X");
    setWinner(null);
    setTurns(0);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">Tic Tac Toe</h1>
      <div className="mb-4 text-xl">
        {winner
          ? winner === "tie"
            ? "It's a tie!"
            : `Player ${winner} wins! 🎉`
          : `Player ${currentPlayer}'s turn`}
      </div>
      <div className="grid grid-cols-3 gap-4">
        {board.map((square, index) => (
          <Button
            key={index}
            className={`w-20 h-20 rounded-md shadow-md flex items-center justify-center text-4xl font-bold cursor-pointer transition-colors duration-200 ${
              square === "X"
                ? "text-emerald-300"
                : square === "O"
                ? "text-amber-300"
                : ""
            }`}
            onClick={() => handleSquareClick(index)}
          >
            {square}
          </Button>
        ))}
      </div>
      {winner && (
        <Button
          onClick={resetGame}
          className="mt-8 px-4 py-2 transition-colors"
        >
          Restart Game
        </Button>
      )}
    </div>
  );
}
