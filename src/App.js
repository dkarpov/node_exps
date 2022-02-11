import "./App.css";
import Form from "./Form";
import React, { useState } from "react";

function App() {
  return (
    <div>
      <h1 className="pt-10 text-center mt-6 text-3xl leading-9 font-extrabold text-gray-900">
        Search a GitHub User Here
      </h1>
      <Form />
    </div>
  );
}

export default App;
