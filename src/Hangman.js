import React, { Component } from "react";
import "./Hangman.css";
import img0 from "./0.jpg";
import img1 from "./1.jpg";
import img2 from "./2.jpg";
import img3 from "./3.jpg";
import img4 from "./4.jpg";
import img5 from "./5.jpg";
import img6 from "./6.jpg";
import { randomWord } from "./words.js";

class Hangman extends Component {
  /** by default, allow 6 guesses and use provided gallows images. */
  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6]
  };

  constructor(props) {
    super(props);
    this.state = {
      nWrong: 0,
      guessed: new Set(),
      answer: randomWord()
    };
    this.handleGuess = this.handleGuess.bind(this);
    this.restart = this.restart.bind(this);
  }

  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
  guessedWord() {
    return this.state.answer
      .split("")
      .map(ltr => (this.state.guessed.has(ltr) ? ltr : "_"));
  }

  /** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
  handleGuess(evt) {
    let ltr = evt.target.value;
    this.setState(st => ({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1),
      gameOver: st.nWrong === this.props.maxWrong ? true : false
    }));
  }

  /** generateButtons: return array of letter buttons to render */
  generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map(ltr => (
      <button
        className="letter_button"
        key={ltr}
        value={ltr}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(ltr)}
      >
        {ltr}
      </button>
    ));
  }

  checkGameLose() {
    return this.state.nWrong === this.props.maxWrong;
  }

  checkGameWin() {
    return !this.guessedWord().toString().includes("_");
  }

  restart() {
    this.setState({
      nWrong: 0,
      guessed: new Set(),
      answer: randomWord()
    });
  }

  /** render: render game */
  render() {
    console.log(this.state.answer);
    return (
      <div className='Hangman'>
        <h1>Hangman</h1>
        <img src={this.props.images[this.state.nWrong]} alt={this.state.nWrong + " wrong guesses"}/>
        <p className="wrong-guess_counter">Number wrong: {this.state.nWrong}</p>
        <p className='Hangman-word'>{this.guessedWord()}</p>
        <p className={this.checkGameLose() || this.checkGameWin() ? 'hidden' : "Hangman-btns"}>{this.generateButtons()}</p>
        <p className={this.checkGameWin() ? "win_msg" : "hidden"}>Congratulation!</p>
        <div className={this.checkGameLose() ? "lose_scenario" : "hidden"}>
          <p className="lose_msg">You lose</p>
          <p className="right_word">The word is: {this.state.answer}</p>
        </div>
        <button onClick={this.restart} className="restart_button">Restart</button>
      </div>
    );
  }
}

export default Hangman;
