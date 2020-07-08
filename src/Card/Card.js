import React from 'react';
import { Swipeable, direction } from 'react-deck-swiper';
import { useState } from 'react';
import cardsData from '../Cards/cardsData';


const Card = ({ name, title, picture, age }) => {
    //let x = useMotionValue();

    // Create Swipeable Hooks to control the movement of each card
    const [lastSwipeDirection, setLastSwipeDirection] = useState(null);
    const [card, setCard] = useState(cardsData);

    // Creat a function that will control the Hook State
    const handleOnSwipe = (swipeDirection) => {
        swipeDirection === direction.RIGHT ?
            // handle right swipe
            setLastSwipeDirection() :
            swipeDirection === direction.LEFT ?
                // handle left swipe
                setLastSwipeDirection() :
                setCard((prev) => prev.slice(1));
    };

    //Create an onDrag function to make the card dissapear when is surpassing the x initial limit.
    // x needs to be defined with useMotion
    const onDragEnd = () => {
        return function (_, info) {
            if (Math.abs(info.point.x) < 150) {
                card.start({ x: 0 });
            } else {
                card.start({ x: info.point.x < 0 ? - 200 : 200 });
            }
        }
    };

    return (
        <>
            {
                card.length > 0 ?
                    <Swipeable onSwipe={handleOnSwipe} onDragEnd={onDragEnd}>
                        <div className="card" >
                            <div className="card-container">
                                <img src={picture} />
                                <div className="card-details">{name}, {age}</div>
                                <div className="card-title">{title}</div>
                            </div>
                        </div>
                    </Swipeable> :
                    <div>Looks like you reach to the end of your search :) </div>
            }
        </>
    )
}

export default Card;