import React from "react";
import Card from "./Card";

const CardList = ({ cards }) => {
  return (
    <div id="container" className="mt-10">
      {cards.map((card, idx) => (
        <Card {...card} key={card.toString() + " " + idx} />
      ))}
    </div>
  );
};

export default CardList;
