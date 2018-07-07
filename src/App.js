import React, { Component } from "react";
import Card from "./components/Card";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import Score from "./components/Score";
import cards from "./cards.json";
//import score from "./components/Score";
import "./App.css"; 

class App extends Component { 

  state = {
    score: 0
  };

  setScore = value => {
    this.setState({ score: value });
  };
  
  selectCard = (id, score) => {

    // Filter this.state.cards for cards with an id not equal to the id being removed
    cards.filter(card => card.id !== id);

    // Use the setState method to update a component's state
    this.setScore(score + 1);

  };


  // Note: The images/faces/suit for the cards are initialized from cards json array  
  getImageUrl = id => {
     let card = cards.filter(card => card.id === id);
     console.log('card ', card)
     return  card[0] ? card[0].image : null;
  };

  getImageLocation = id => {
    let card = cards.filter(card => card.id === id);
    console.log('card ', card)
    return  card[0] ? card[0].location : null;
  };

  // This method is called from shuffleCards and handles shuffling the cards json array
  shuffleArray(array) {
    let i = array.length - 1;
    for (; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  // Map over cards and render a Card component for each card object
  // Also render a title and the curret score
  render() {
    const shuffledCards = this.shuffleArray(cards); 
    return (
      <Wrapper>
        <Title>Memory Game</Title>
        <Score score={this.state.score}>'Score :' + {this.score}</Score>
        {shuffledCards.map((card,idx) => (
          <Card
            score={this.state.score}
            selectCard={this.selectCard}
            id={card.id}
            key={idx}
            name={card.name}
            image={card.image}
            suit={card.suit}
            face={card.face}
            location={this.getRandomCard()}
          />
        ))}
      </Wrapper>
    );
  }

  getRandomCard = function() {
    return cards[Math.floor(Math.random() * 2)];
  };

  // Example of how it will be used,
  // 1) On load if the game
  //    a) Allow cards to be rendered unsorted, reset the score
  //    b) Build array of images from the unsorted cards
  //    c) Call the random shuffle method above
  //    d) Use resuting array to set images in the cards.
  onLoad = (event) =>
  {
    this.shuffleCards();
  }
  
  onRemove = (event) =>
  {
    this.shuffleCards();
  }

  shuffleCards = () =>
  {
    console.log('Pre shuffle: ' + cards);
    let shuffledCards = this.shuffleArray(cards);
    console.log('Post shuffle: ' + shuffledCards);

    return shuffledCards;
  }

  // 2) On selection of a card,
  //    b) Build array of images from remainig cards
  //    c) Call the random shuffle method above
  //    b) Update the score 
}
export default App;
