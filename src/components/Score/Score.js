import React from "react";
import "./Score.css";

const Score = (props) => {

 // The render method returns the JSX that should be rendered
    return (
      <div className="score text-center">
        <div className="score-body">
          <p className="score-text">Score: {props.score}</p>
        </div>
      </div>
    );
  }

//  const Score = (props) => {
//  return <h1 className="score">{props.value}</h1>;
//};

export default Score;