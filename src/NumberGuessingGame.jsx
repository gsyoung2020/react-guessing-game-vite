import React, { Component, useState } from "react";
import GuessControl from "./GuessControl";
import GuessMessage from "./GuessMessage";
import GameOver from "./GameOver";

/**
 *
 * Returns a random integer number from 1-100 inclusive
 */
function getRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

const MAX_ATTEMPTS = 5;

function NumberGuessingGame(props) {
  const [numberToGuess, setnumberToGuess] = useState(
    getRandomNumber()
  );
  const [numberOfGuesses, setnumberOfGuesses] = useState(0);
  const [latestGuess, setlatestGuess] = useState(null);

  function handleGuess(guess) {
    setlatestGuess(guess);
    //explict with the return in brackets as it allows for multi-line usage
    setnumberOfGuesses((numberOfGuesses) => {
      return numberOfGuesses + 1;
    });
    /*
    // implict if it only needs to be a single line, no return or brackets needed
    setnumberOfGuesses((numberOfGuesses) => numberOfGuesses + 1)
    */
  }
  function handleReset() {
    setnumberOfGuesses(getRandomNumber());
    setnumberToGuess(0);
    setlatestGuess(null);
  }
  const isCorrectGuess = latestGuess === numberToGuess;

  const isGameOver =
    isCorrectGuess || numberOfGuesses === MAX_ATTEMPTS;

  return (
    <div>
      <h2>I'm thinking of a number from 1 to 100.</h2>
      <h2>
        Can you guess the number I am thinking of in {MAX_ATTEMPTS}{" "}
        tries?
      </h2>
      <GuessControl onGuess={handleGuess} />
      {isGameOver && (
        <GameOver hasWon={isCorrectGuess} onReset={handleReset} />
      )}
      {!isGameOver && (
        <GuessMessage
          guess={latestGuess}
          numberToGuess={numberToGuess}
          numberOfGuesses={numberOfGuesses}
        />
      )}
    </div>
  );
}

class NumberGuessingGameOld extends Component {
  constructor(props) {
    super(props);

    this.state = {
      numberToGuess: getRandomNumber(),
      numberOfGuesses: 0,
      latestGuess: null,
    };

    /**
     * These lines are required to make the methods/functions declared on this
     *  class have the correct `this` object when they run.
     */
    this.handleGuess = this.handleGuess.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleGuess(guess) {
    this.setState({
      latestGuess: guess,
      numberOfGuesses: this.state.numberOfGuesses + 1,
    });
  }

  handleReset() {
    this.setState({
      numberToGuess: getRandomNumber(),
      numberOfGuesses: 0,
      latestGuess: null,
    });
  }

  render() {
    const isCorrectGuess =
      this.state.latestGuess === this.state.numberToGuess;

    const isGameOver =
      isCorrectGuess || this.state.numberOfGuesses === MAX_ATTEMPTS;

    return (
      <div>
        <h2>I'm thinking of a number from 1 to 100.</h2>
        <h2>
          Can you guess the number I am thinking of in {MAX_ATTEMPTS}{" "}
          tries?
        </h2>
        <GuessControl onGuess={this.handleGuess} />
        {isGameOver && (
          <GameOver
            hasWon={isCorrectGuess}
            onReset={this.handleReset}
          />
        )}
        {!isGameOver && (
          <GuessMessage
            guess={this.state.latestGuess}
            numberToGuess={this.state.numberToGuess}
            numberOfGuesses={this.state.numberOfGuesses}
          />
        )}
      </div>
    );
  }
}

export default NumberGuessingGame;
