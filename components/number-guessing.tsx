"use client";
import { useState, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface NumberGuessingState {
  gameStarted: boolean;
  gameOver: boolean;
  paused: boolean;
  targetNumber: number;
  userGuess: number | string;
  attempts: number;
}

export default function NumberGuessing(): JSX.Element {
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [paused, setPaused] = useState<boolean>(false);
  const [targetNumber, setTargetNumber] = useState<number>(0);
  const [userGuess, setUserGuess] = useState<number | string>(""); // Ensure this is either a number or an empty string
  const [attempts, setAttempts] = useState<number>(0);

  // Game starts and random number generated (preserved logic)
  const handleStartGame = (): void => {
    setGameStarted(true);
    setGameOver(false);
    setAttempts(0);
    setPaused(false);
    setTargetNumber(Math.floor(Math.random() * 10) + 1); // Generate a random number
    setUserGuess(""); // Reset the guess input
  };

  // Pause the game
  const handlePausedGame = (): void => {
    setPaused(true);
  };

  // Resume the game
  const handleResumeGame = (): void => {
    setPaused(false);
  };

  // Handle the user's guess and check if it's correct
  const handleGuess = (): void => {
    const parsedGuess = parseInt(userGuess as string, 10); // Parse userGuess as integer

    if (isNaN(parsedGuess)) {
      alert("Please enter a valid number between 1 and 10.");
      return;
    }

    setAttempts((prevAttempts) => prevAttempts + 1);

    if (parsedGuess === targetNumber) {
      setGameOver(true); // Correct guess, end the game
    } else {
      alert(`Wrong guess! Try again.`);
    }
  };

  // Restart the game
  const handleTryAgain = (): void => {
    setGameStarted(false);
    setGameOver(false);
    setUserGuess(""); // Reset the guess input
    setAttempts(0);
  };

  // Handle user input changes in the guess field (ensure it is a valid number)
  const handleUserGuessChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    const numberValue = parseInt(value, 10);

    // If the value is a valid number or empty, update the state
    if (!isNaN(numberValue) || value === "") {
      setUserGuess(value);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-800 to-black">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-2 text-black">
          Number Guessing Game
        </h1>
        <p className="text-center text-black mb-4">
          Try to guess the number between 1 and 10!
        </p>

        {!gameStarted && (
          <div className="flex justify-center mb-4">
            <Button
              onClick={handleStartGame}
              className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              Start Game
            </Button>
          </div>
        )}

        {gameStarted && !gameOver && (
          <div>
            <div className="flex justify-center mb-4">
              {paused ? (
                <Button
                  onClick={handleResumeGame}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                >
                  Resume
                </Button>
              ) : (
                <Button
                  onClick={handlePausedGame}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                >
                  Pause
                </Button>
              )}
            </div>
            <div className="flex justify-center mb-4">
              <Input
                type="number"
                value={userGuess}
                onChange={handleUserGuessChange}
                className="bg-gray-100 border border-gray-300 rounded-lg py-2 px-4 w-full max-w-xs"
                placeholder="Enter your guess"
                disabled={paused} // Disable input when paused
              />
              <Button
                onClick={handleGuess}
                className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded ml-4"
                disabled={paused} // Disable guess button when paused
              >
                Guess
              </Button>
            </div>

            <div className="text-center text-black">
              <p>Attempts: {attempts}</p>
            </div>
          </div>
        )}

        {gameOver && (
          <div>
            <div className="text-center mb-4 text-black">
              <h2 className="text-2xl font-bold">You Win!</h2>
              <p>You guessed the number in {attempts} attempts.</p>
            </div>
            <div className="flex justify-center">
              <Button
                onClick={handleTryAgain}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
              >
                Try Again
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
