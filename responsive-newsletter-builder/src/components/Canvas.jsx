import React, { useState } from "react";
import { useDrop } from "react-dnd";
import "../index.css";

function Canvas() {
  const [elements, setElements] = useState([]);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "ELEMENT",
    drop: (item) =>
      setElements((prev) => [
        ...prev,
        {
          ...item,
          id: Date.now(),
          text: item.type === "text" ? "Sample Text" : "",
        },
      ]),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const updateText = (id, newText) => {
    setElements((prev) =>
      prev.map((el) => (el.id === id ? { ...el, text: newText } : el))
    );
  };

  return (
    <div
      className="canvas"
      ref={drop}
      style={{
        backgroundColor: isOver ? "#e0e0e0" : "#fff",
        width: "75%",
        minHeight: "500px",
        border: "1px solid #ddd",
        padding: "20px",
      }}
    >
      <h3>Your Newsletter</h3>
      {elements.map((el, index) => (
        <div
          key={el.id}
          style={{
            padding: "10px",
            marginBottom: "5px",
            border: "1px solid #ccc",
          }}
        >
          {el.type === "text" ? (
            <input
              type="text"
              value={el.text}
              onChange={(e) => updateText(el.id, e.target.value)}
              style={{
                width: "100%",
                border: "none",
                padding: "5px",
                fontSize: "16px",
                outline: "none",
              }}
            />
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
