import React, { useState } from "react";
import { useDrop } from "react-dnd";
import "../index.css";

function Canvas() {
  const [elements, setElements] = useState([]);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "ELEMENT",
    drop: (item) => setElements((prev) => [...prev, item]),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      className="canvas"
      ref={drop}
      style={{
        backgroundColor: isOver ? "#f0f0f0" : "#fff",
        width: "75%",
        minHeight: "500px",
        border: "1px solid #ddd",
        padding: "20px",
      }}
    >
      <h3>Your Newsletter</h3>
      {elements.map((el, index) => (
        <div
          key={index}
          style={{
            padding: "10px",
            marginBottom: "5px",
            border: "1px solid #ccc",
          }}
        >
          {el.type === "text" ? (
            <p>Sample Text</p>
          ) : el.type === "image" ? (
            <img src="https://picsum.photos/150" alt="Random Image" />
          ) : (
            <button>Click Me</button>
          )}
        </div>
      ))}
    </div>
  );
}

export default Canvas;
