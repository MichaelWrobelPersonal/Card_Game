import React from "react";
import "./Card.css";

const Card = props => (
  <div className="card">
    <div className="img-container">
      <img alt={props.face + ' of ' + props.suit} src={process.env.PUBLIC_URL + '/images/cards/' + props.image} />
    </div>
    <div className="content">
      <ul>
        <li>
          <strong>Suit:</strong> {props.suit}
        </li>
        <li>
          <strong>Face:</strong> {props.face}
        </li>
      </ul>
    </div>
    <span onClick={() => props.removeCard(props.id)} className="remove">
    </span>
  </div>
);

export default Card;
