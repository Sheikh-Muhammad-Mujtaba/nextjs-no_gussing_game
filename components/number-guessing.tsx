"use client";
import { useState, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Confetti from "react-confetti"; // Importing react-confetti

export default function NumberGuessing(): JSX.Element {
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [paused, setPaused] = useState<boolean>(false);
  const [targetNumber, setTargetNumber] = useState<number>(0);
  const [userGuess, setUserGuess] = useState<string>(""); // Keep this as string for input handling
  const [attempts, setAttempts] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [showConfetti, setShowConfetti] = useState<boolean>(false); // To control confetti display
  const [maxAttempts] = useState<number>(5); // Maximum attempts set to 5
  const [gameResult, setGameResult] = useState<string>(""); // To store the result message

  // Start game and generate random number
  const handleStartGame = (): void => {
    setGameStarted(true);
    setGameOver(false);
    setAttempts(0);
    setPaused(false);
    setTargetNumber(Math.floor(Math.random() * 10) + 1);
    setUserGuess(""); // Clear previous guess
    setErrorMessage(""); // Clear error messages
    setShowConfetti(false); // Reset confetti display
    setGameResult(""); // Reset game result message
  };

  // Pause and resume game
  const handlePausedGame = (): void => {
    setPaused(true);
  };

  const handleResumeGame = (): void => {
    setPaused(false);
  };

  // Handle guess
  const handleGuess = (): void => {
    const parsedGuess = parseInt(userGuess, 10); // Parse input as number

    // Check for valid number input
    if (isNaN(parsedGuess)) {
      setErrorMessage("Please enter a valid number.");
      return;
    }

    // Check if guess is within the valid range
    if (parsedGuess < 1) {
      setErrorMessage("Your guess is less than 1. Please select a number between 1 and 10.");
      return;
    } else if (parsedGuess > 10) {
      setErrorMessage("Your guess is greater than 10. Please select a number between 1 and 10.");
      return;
    }

    // Valid guess, reset error message
    setErrorMessage("");
    setAttempts((prevAttempts) => prevAttempts + 1);

    // Check if the guess matches the target number
    if (parsedGuess === targetNumber) {
      setGameOver(true);

      // Special case: If user guesses it on the first attempt
      if (attempts === 0) {
        alert("You are a Genius!"); // Show alert for first attempt win
        setGameResult("win"); // Set game result to win
      } else {
        alert("You Win!"); // Show alert for general win
        setGameResult("win"); // Set game result to win
      }

      // Trigger confetti animation
      setShowConfetti(true);
      // Stop confetti after 5 seconds
      setTimeout(() => setShowConfetti(false), 5000);

    } else {
      // If attempts reach the limit, game over
      if (attempts + 1 === maxAttempts) {
        setGameOver(true);
        setErrorMessage("You Lose");
        alert("Game Over!"); // Show alert for game over
        setGameResult("lose"); // Set game result to lose
      } else {
        alert("Wrong guess! Try again.");
      }
    }
  };

  // Reset game
  const handleTryAgain = (): void => {
    setGameStarted(false);
    setGameOver(false);
    setUserGuess("");
    setAttempts(0);
    setErrorMessage("");
    setShowConfetti(false); // Reset confetti display
    setGameResult(""); // Reset game result message
  };

  // Handle input change for guess
  const handleUserGuessChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setUserGuess(e.target.value); // Keep input as string
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-800 to-black">
      {/* Render Confetti when the user wins */}
      {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}

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
                className="bg-gray-100 border border-gray-300 text-black placeholder-gray-400 rounded-lg py-2 px-4 w-full max-w-xs focus:bg-white focus:border-blue-500"
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

            {errorMessage && (
              <p className="text-red-500 text-center mb-4">{errorMessage}</p>
            )}

            <div className="text-center text-black">
              <p>Attempts: {attempts} / {maxAttempts}</p>
            </div>
          </div>
        )}

        {gameOver && (
          <div>
            <div className="text-center mb-4 text-black">
              {/* Show different heading based on game result */}
              <h2 className="text-2xl font-bold">
                {gameResult === "win" ? "You Win!" : "You Lose!"}
              </h2>

              {/* Show different paragraph based on game result */}
              <p>
                {gameResult === "win"
                  ? `You guessed the number in ${attempts} attempts.`
                  : `You wouldn't guess the number in ${attempts} attempts.`}
              </p>
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
