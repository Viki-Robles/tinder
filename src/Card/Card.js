import React, { useMemo } from 'react';
import { Swipeable, direction } from 'react-deck-swiper';
import { useState } from 'react';
import cardsData from '../Cards/cardsData';
import { useMove } from 'react-use-gesture';


const Card = ({ name, title, picture, age }) => {

    // Create Swipeable Hooks to control the movement of each card
    const [lastSwipeDirection, setLastSwipeDirection] = useState(null);
    const [card, setCard] = useState(cardsData);
    let x = useMove();

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

    //Create an onDrag function so that the card will dissapear when is surpassing the x initial point limit.
    const onDragEnd = () => {
        return function (_, info) {
            if (Math.abs(info.point.x) < 150) {
                x.start({ x: 0 });
            } else {
                x.start({ x: info.point.x < 0 ? - 200 : 200 });
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