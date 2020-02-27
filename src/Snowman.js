import React, { useState } from "react";
import "./Snowman.css";
import img0 from "./0.png";
import img1 from "./1.png";
import img2 from "./2.png";
import img3 from "./3.png";
import img4 from "./4.png";
import img5 from "./5.png";
import img6 from "./6.png";
import { randomWord, ENGLISH_WORDS } from "./words";

function Snowman({ maxWrong, images, words }) {
  /** by default, allow 6 guesses and use provided gallows images. */

  const [nWrong, updateNWrong] = useState(0);
  const [guessed, updateGuessed] = useState(new Set());
  const [answer, updateAnswer] = useState(randomWord(words));

  function restartGame(){
    updateNWrong(0);
    updateGuessed(new Set());
    updateAnswer(randomWord(words));
  }
  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
  function guessedWord() {
    return answer
      .split("")
      .map(ltr => (guessed.has(ltr) ? ltr : "_"));
  }

  function win(){
    const display = guessedWord(); //display is the word after each guess
    return !display.includes("_"); //returns true if display does not contain _ anymore
  }

  /** handleGuest: handle a guessed letter:
      - add to guessed letters
      - if not in answer, increase number-wrong guesses
  */
  function handleGuess(evt) {
    let ltr = evt.target.value;
    updateGuessed(g => {
      const newGuessed = new Set(g);
      newGuessed.add(ltr);
      return newGuessed;
    });

    updateNWrong(n => n + (answer.includes(ltr) ? 0 : 1));
  }

  /** generateButtons: return array of letter buttons to render */
  function generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map(ltr => (
      <button
        key={ltr}
        value={ltr}
        onClick={handleGuess}
        disabled={guessed.has(ltr)}
      >
        {ltr}
      </button>
    ));
  }

  let output = nWrong < maxWrong ? generateButtons() : `You lose, the word was: ${answer}`;
  if(win()){
    output = "You win!";
  }

  /** render: render game */
  return (
    <div className="Snowman" data-testid="snowman">
      <img src={images[nWrong]} alt={`img${nWrong}`} />
      <p> Number wrong: {nWrong}</p>
      <p className="Snowman-word" data-testid="guessedWord">{guessedWord()}</p>
      <p>{output}</p>
      <button className="Snowman-restart" onClick={restartGame}>Restart</button>
    </div>
  );
}

Snowman.defaultProps = {
  maxWrong: 6,
  images: [img0, img1, img2, img3, img4, img5, img6],
  words: ENGLISH_WORDS
};

export default Snowman;
