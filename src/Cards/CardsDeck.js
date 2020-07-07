import React from "react";
import cardsData from "./cardsData";
import Card from "../Card/Card";

import "./CardsDeck.css";

export default function CardsDeck() {
  return cardsData().map(({ name, age, picture, id }) => (
      <Card
        key={id}
        id={id}
        name={name}
        picture={picture}
        age={age} />
     
  ))
}