import React, { Component } from "react";
import Card from "./components/Card";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import Score from "./components/Score";
import cards from "./cards.json";
import score from "./components/Score";
import "./App.css"; 

class App extends Component { 
  // Setting this.state.cards to the cards json array
  state = {
    score
  };

  removeCard = id => {

    // Filter this.state.cards for cards with an id not equal to the id being removed
    cards.filter(card => card.id !== id);
    let score = this.state.score;
    score += 1;

    // Set this.state.cards equal to the new cards array
    this.setState({ score });
  };

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

  setImageUrl = (id, image) => {
    let card = cards.filter(card => card.id === id);
    console.log('image_', image );
    console.log('card_', card);
    card.image = image;
    this.setState({ image }); 
    console.log('card_- ', card);
  };

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

  // Map over this.state.cards and render a FriendCard component for each card object
  render() {
    const shuffledCards = this.shuffleArray(cards); 
    return (
      <Wrapper>
        <Title>Memory Game</Title>
        <Score>{this.state.score}</Score>
        {shuffledCards.map((card,idx) => (
          <Card
            removeCard={this.removeCard}
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

  shuffle = (array) => {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }
  

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

  // 2) On deletion of a card,
  //    a) Card is removed, and score is updated
  //    b) Build array of images from remainig cards
  //    c) Ca ll the random shuffle method above
  //    d) Use resuting array to set images in the cards.  
}
export default App;
