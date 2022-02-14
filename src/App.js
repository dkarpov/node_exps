import "./App.css";
import Form from "./Form";
import React, { useState } from "react";
import CardList from "./components/CardList";

function App() {
  const [cards, setCards] = useState([]);

  const addNewCard = (card) => {
    setCards([...cards, card]);
  };

  return (
    <div>
      <h1 className="pt-10 text-center mt-6 text-3xl leading-9 font-extrabold text-gray-900">
        Search a GitHub User Here
      </h1>
      <Form onSubmit={addNewCard} />
      <CardList cards={cards} />
    </div>
  );
}

export default App;
