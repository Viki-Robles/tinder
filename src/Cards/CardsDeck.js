import React from "react";
import cardsData from "./cardsData";
import Card from "../Card/Card";
import { useState } from "react";
import { useSprings, animated, interpolate } from "react-spring";
import { useGesture } from "react-use-gesture";
import "./CardsDeck.css";




const to = i => ({
  x: 0,
  y: i * -10,
  scale: 1,
  rot: -10 + Math.random() * 20,
  delay: i * 100
});
const from = i => ({ rot: 0, scale: 1.5, y: -1000 }); // These two are just helpers, they curate 
//spring data, values that are later being interpolated into css.

const trans = (r, s) =>
  `perspective(1500px) rotateX(30deg) rotateY(${r /
  10}deg) rotateZ(${r}deg) scale(${s})`;

export default function CardsDeck() {
  const [gone] = useState(() => new Set());// The set flags all the cards that are flicked out

  const [props, set] = useSprings(cardsData.length, i => ({
    ...to(i),
    from: from(i)
  }));

  // Create a gesture, we're looking 
  //in down-state, delta (current-pos - click-pos), direction and velocity
  const bind = useGesture(
    ({
      args: [index],
      down,
      delta: [xDelta],
      direction: [xDir],
      velocity
    }) => {
      const trigger = velocity > 0.2; //It triggers the card to fly out
      const dir = xDir < 0 ? -1 : 1; //That's the direction of the card left or right

    if (!down && trigger) gone.add(index); // If finger's up and trigger velocity is reached, we flag the
      set(i => {
        if (index !== i) return;
        const isGone = gone.has(index);
        const x = isGone ? (200 + window.innerWidth) * dir : down ? xDelta : 0;
        const rot = xDelta / 100 + (isGone ? dir * 10 * velocity : 0);
        const scale = down ? 1.1 : 1;
        return {
          x,
          rot,
          scale,
          delay: undefined,
          config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 }
        };
      });

      if (!down && gone.size === cardsData.length)
        setTimeout(() => gone.clear() || set(i => to(i)), 600);
    }
  );
  return cardsData().map(({ x, y, rot, scale, name, age, picture, id }, i) => (
      <Card
        key={id}
        id={id}
        i={i}
        x={x}
        y={y}
        rot={rot}
        scale={scale}
        trans={trans}
        bind={bind}
        name={name}
        picture={picture}
        age={age} />
     
  ))
}

