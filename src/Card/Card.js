import React from "react";
import { Swipeable, direction } from 'react-deck-swiper';
import { useState } from "react";
import cardsData from "../Cards/cardsData";

const Card = ({ name, title, picture, age }) => {

    const [lastSwipeDirection, setLastSwipeDirection] = useState(null);
    const [card, setCard] = useState(cardsData);

    const handleOnSwipe = (swipeDirection) => {
        swipeDirection === direction.RIGHT ?
            // handle right swipe
            setLastSwipeDirection() :
            swipeDirection === direction.LEFT ?
                // handle left swipe
                setLastSwipeDirection() :
                setCard((prev) => prev.slice(1));
    };

    return (
        <>
            {
                card.length > 0 ?
                    <Swipeable onSwipe={handleOnSwipe}>
                        <div className="card">
                            <div className="card-container">
                                <img src={picture} />
                                <div className="card-details">{name}, {age}</div>
                                <div className="card-title">{title}</div>
                            </div>
                        </div>
                    </Swipeable> :
                    card.length === 0 ?
                        <p>Thats the end!</p> :
                        null
            }
        </>
    )
}

export default Card;