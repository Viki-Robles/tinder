import React from "react";
import "./Card.css";
import { animated, interpolate } from "react-spring";



export default function Card({ name, title, picture, age }) {
    return (
                <div className="card">
                    <div className="card-container">
                        <img src={picture} />
                        <div className="card-name">{name}, {age}</div>
                        <div className="card-title">{title}</div>
                    </div>
                </div>
    );
}