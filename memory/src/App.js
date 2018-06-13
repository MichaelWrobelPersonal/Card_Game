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
    cards,
    score
  };

  removeCard = id => {
    // Filter this.state.cards for cards with an id not equal to the id being removed
    const cards = this.state.cards.filter(card => card.id !== id);
    let score = this.state.score;

    score += 1;

    // Set this.state.cards equal to the new cards array
    this.shuffleCards()
    this.setState({ cards, score });
  };

  getImageUrl = id => {
     const card = this.state.cards.filter(card => card.id === id);
     console.log('card ', card)
     return  card[0] ? card[0].image : null;
  };

  setImageUrl = (id, image) => {
    const cards = this.state.cards;
    const card = cards.filter(card => card.id === id);
    this.setState({ image }); 
    console.log('card_ ', card);
  };
  // Map over this.state.cards and render a FriendCard component for each card object
  render() {
    return (
      <Wrapper>
        <Title>Memory Game</Title>
        <Score>{this.state.score}</Score>
        {this.state.cards.map(card => (
          <Card
            removeCard={this.removeCard}
            id={card.id}
            key={card.id}
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
    let images = [];
    let key = 0;
    for(key=0;key<cards.length; key++)
    {
      images[key] = this.getImageUrl(key);
      console.log('Preimage: ' + images[key]);
    }

    console.log('Pre shuffle: ' + cards);
    images = this.shuffle(images);
    console.log('Post shuffle: ' + cards);

    for(key=0;key<cards.length; key++)
    {
      if (images[key] != null)
      {
        console.log('Postimage: ' + images[key]);
        this.setImageUrl(key, images[key]);
      }
    }
  }

  // 2) On deletion of a card,
  //    a) Card is removed, and score is updated
  //    b) Build array of images from remainig cards
  //    c) Call the random shuffle method above
  //    d) Use resuting array to set images in the cards.  
}
export default App;
