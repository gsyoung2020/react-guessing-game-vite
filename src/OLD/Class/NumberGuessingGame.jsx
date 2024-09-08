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

// change to a function

// Steps for refactoring Class Components to Functional Components:
// 1. Create new empty functional component
// 2. render method -> return
// 3. props -> props
// 4. this.state -> useState() (remember to import useState)
// 5. handlerMethods -> handlerFunctions
// 6. Ensure all this's are gone and also this.state's
// 7. Ensure all setStates are replaced with individual useState setters
// 8. Comment out old class component and rename new func component with same name
// 9. Test it out and make sure it works!

function NumberGuessingGame() {
  const [numberToGuess, setNumbertoguess] = useState(getRandomNumber);
  const [numberOfGuesses, setNumberOfGuesses] = useState(0);
  const [latestGuess, setLatestGuess] = useState(null);

  function handleGuess(guess) {
    setLatestGuess(guess);
    setNumberOfGuesses((numberOfGuesses) => numberOfGuesses + 1);
  }

  function handleReset() {
    setNumbertoguess(getRandomNumber);
    setNumberOfGuesses(0);
    setLatestGuess(null);
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

class NumberGuessingGameOLD extends Component {
  constructor(props) {
    super(props);

    // need to create an useState for each
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
    //this is where you use the Setter
    this.setState({
      latestGuess: guess,
      numberOfGuesses: this.state.numberOfGuesses + 1,
    });
  }

  handleReset() {
    //this is where you use the Setter
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
