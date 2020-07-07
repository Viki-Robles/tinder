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
const from = i => ({ rot: 0, scale: 1.5, y: -1000 });

const trans = (r, s) =>
  `perspective(1500px) rotateX(30deg) rotateY(${r /
  10}deg) rotateZ(${r}deg) scale(${s})`;

export default function CardsDeck() {
  const [gone] = useState(() => new Set());

  const [props, set] = useSprings(cardsData.length, i => ({
    ...to(i),
    from: from(i)
  }));

  const bind = useGesture(
    ({
      args: [index],
      down,
      delta: [xDelta],
      direction: [xDir],
      velocity
    }) => {
      const trigger = velocity > 0.2;

      const dir = xDir < 0 ? -1 : 1;

      if (!down && trigger) gone.add(index);

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
    <animated.div key={i} style={{ transform: interpolate([x, y], (x, y) => `translate3d(${x}px,${y}px,0)`) }}>
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
      <animated.div {...bind(i)} style={{ transform: interpolate([rot, scale], trans), picture: picture }} />
    </animated.div>
  ))
}

