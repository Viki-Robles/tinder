import React from "react";
import "./Card.css";
import { Swipeable, direction } from 'react-deck-swiper';
import CardsDeck from "../Cards/CardsDeck";


const Card = ({ name, title, picture, age }) => {
    const handleOnSwipe = (swipeDirection) => {
        if (swipeDirection === direction.RIGHT) {
            // handle right swipe
            return;
        }

        if (swipeDirection === direction.LEFT) {
            // handle left swipe
            return;
        }
    }
    return (
        <>
            <Swipeable onSwipe={handleOnSwipe}>
                <div className="card">
                    <div className="card-container">
                        <img src={picture} />
                        <div className="card-name">{name}, {age}</div>
                        <div className="card-title">{title}</div>
                    </div>
                </div>
            </Swipeable>
        </>
    );
}

export default Card;