import React, { Component } from 'react';
import Card from './components/Card';
import Timer from './components/Timer';
import { initializeDeck, isMatch } from './services/cardService';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = this.getBaseState();
  }

  getBaseState = () => {
    return {
      first: -1,
      second: -1,
      score: 0,
      deck: initializeDeck()
    }
  }

  hideNonMatch = () => {
    const { first, second, deck } = this.state;
    // User clicking restart while non matching cards are flipped, causes issue.
    // Therefore, check if there is still a reason to hide.
    if (first !== -1 && second !== -1) {
      deck[first].flipped = false;
      deck[second].flipped = false;
      this.setState({ deck: deck, first: -1, second: -1 });
    }
  }

  onCardSelected = (e, index) => {
    const { first, second, deck, score } = this.state;
    if (first === -1) {
      this.setState(state => {
        deck[index].flipped = true;
        return { deck: deck, first: index };
      });
    } else if (second === -1) {
      deck[index].flipped = true;
      if (isMatch(deck[first], deck[index])) {
        this.setState({ first: -1, second: -1, score: score + 1 });
      } else {
        this.setState({ deck: deck, second: index }, () => 
          setTimeout(this.hideNonMatch, 1500)
        )
      }
    }
  }

  restart = () => {
    this.setState(this.getBaseState());
  }

  render() {
    return (
      <div id='content'>
        <div className='sticky-header'>
          <i id='refresh' className="fa fa-refresh" onClick={this.restart}></i>
          <div id='score'>Score: {this.state.score} / 26</div>
          <Timer />
        </div>
        <div className="card-list">
          { this.state.deck.map((card, index) => (
            <Card
              key={index}
              card={card}
              index={index}
              onClick={this.onCardSelected}
            />
          )) }
      </div>
      </div>
    );
  }
}

export default App;
