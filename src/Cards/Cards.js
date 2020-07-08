import React from 'react';
import cardsData from './cardsData';
import Card from '../Card/Card';
import './Cards.css';


export default function Cards() {

  return cardsData().map(({ name, age, picture, id }) => (
      <Card
        key={id}
        id={id}
        name={name}
        picture={picture}
        age={age} 
        />
    ))
}