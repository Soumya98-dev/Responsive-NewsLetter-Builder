import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Sidebar from "./components/Sidebar";
import Canvas from "./components/Canvas";
import "./index.css";

function App() {
  const [elements, setElements] = useState([]);

  const addElement = (type) => {
    setElements([...elements, { type }]);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="app-container">
        <Sidebar addElement={addElement} />
        <Canvas />
      </div>
    </DndProvider>
  );
}

export default App;
