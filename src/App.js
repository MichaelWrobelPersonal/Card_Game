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
    let shuffled = this.shuffleCards();

    // Filter this.state.cards for cards with an id not equal to the id being removed
    let cards = this.state.cards.filter(card => card.id !== id);
    let score = this.state.score;
    let shuffledCards = cards;
    score += 1;
    for (let i=0;i<cards.length;i++)
    {
      console.log("Cards_--", cards[shuffled[i]]);
      if( cards[shuffled[i] != null])
      {
        let card = this.state.cards.filter(card => card.id === shuffled[i]);
        card.id = cards[shuffled[i].id];
        card.location = cards[shuffled[i].location];
        card.image = cards[shuffled[i].image];
        card.face = cards[shuffled[i].face];
        card.suit = cards[shuffled[i].suit];
        console.log('Cards_---', card); 
        shuffledCards[i] = card;      
      }
    }

    // Set this.state.cards equal to the new cards array
    console.log('Cards-___', shuffledCards)
    this.setState({ shuffledCards, score });
    console.log('Cards____', shuffledCards)
  };

  getImageUrl = id => {
     let card = this.state.cards.filter(card => card.id === id);
     console.log('card ', card)
     return  card[0] ? card[0].image : null;
  };

  getImageLocation = id => {
    let card = this.state.cards.filter(card => card.id === id);
    console.log('card ', card)
    return  card[0] ? card[0].location : null;
  };

  setImageUrl = (id, image) => {
    let cards = this.state.cards;
    let card = cards.filter(card => card.id === id);
    console.log('image_', image );
    console.log('card_', card);
    card.image = image;
    this.setState({ image }); 
    console.log('card_- ', card);
  };

  setImageLocation = (id, location) => {
    let cards = this.state.cards;
    let card = cards.filter(card => card.id === id);
    console.log('location_', location );
    console.log('card_', card);
    card.location = location;
    card.id = location;
    this.setState({ card }); 
    console.log('card_- ', card);
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
    let unshuffled = [];
    let shuffled = [];
    let key = 0;
    for(key=0;key<cards.length; key++)
    {
      unshuffled[key] = this.getImageLocation(key);
      console.log('PreLocation: ' + unshuffled[key]);
    }

    console.log('Pre shuffle: ' + unshuffled);
    shuffled = this.shuffle(unshuffled);
    console.log('Post shuffle: ' + shuffled);

    for(key=0;key<cards.length; key++)
    {
      if (shuffled[key] != null)
      {
        console.log('PostLocation: ' + shuffled[key]);
        this.setImageLocation(key, shuffled[key]);
      }
    }
    return shuffled;
  }

  // 2) On deletion of a card,
  //    a) Card is removed, and score is updated
  //    b) Build array of images from remainig cards
  //    c) Call the random shuffle method above
  //    d) Use resuting array to set images in the cards.  
}
export default App;
