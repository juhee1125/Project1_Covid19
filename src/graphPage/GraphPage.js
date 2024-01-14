// GraphPage.js
import React, { useState, useRef } from "react";
import Nav from '../navigation/Nav'
import SelectedItem from './select';
import CovidWorld from './components/CovidWorld.module.css'; // Import the CovidWorld component

function GraphPage() {
  const resultRef = useRef([]);
  const [selected, setSelected] = useState([]);

  return (
    <div className="App">
      <Nav/>
      <CovidWorld
        selected={selected}
        setSelected={setSelected}
        resultRef={resultRef}
      />
      <SelectedItem
        selected={selected}
        setSelected={setSelected}
        resultRef={resultRef}
      />
    </div>
  );
}

export default GraphPage;
