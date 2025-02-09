import React, { useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import "../index.css";

function DraggableElement({
  el,
  index,
  moveElement,
  updateText,
  removeElement,
}) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "ELEMENT",
    item: { id: el.id, index, type: el.type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [, drop] = useDrop(() => ({
    accept: "ELEMENT",
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveElement(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  }));

  return (
    <div
      ref={(node) => drag(drop(node))}
      style={{
        opacity: isDragging ? 0.5 : 1,
        padding: "10px",
        marginBottom: "5px",
        border: "1px solid #ccc",
        backgroundColor: "#fff",
        cursor: "grab",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {el.type === "text" ? (
        <input
          type="text"
          value={el.text}
          onChange={(e) => updateText(el.id, e.target.value)}
          style={{
            width: "80%",
            border: "none",
            padding: "5px",
            fontSize: "16px",
            outline: "none",
          }}
        />
      ) : el.type === "image" ? (
        <img src="https://picsum.photos/150" alt="Random" />
      ) : el.type === "button" ? (
        <button>Click Me</button>
      ) : null}

      <button
        onClick={() => removeElement(el.id)}
        style={{
          marginLeft: "10px",
          background: "red",
          color: "white",
          border: "none",
          padding: "5px",
          cursor: "pointer",
        }}
      >
        ❌
      </button>
    </div>
  );
}

function Canvas() {
  const [elements, setElements] = useState([]);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "ELEMENT",
    drop: (item, monitor) => {
      if (item.index === undefined) {
        setElements((prev) => [
          ...prev,
          {
            id: Date.now(),
            type: item.type,
            text: item.type === "text" ? "Sample Text" : "",
          },
        ]);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const moveElement = (fromIndex, toIndex) => {
    setElements((prev) => {
      const updatedElements = [...prev];
      const [movedElement] = updatedElements.splice(fromIndex, 1);
      updatedElements.splice(toIndex, 0, movedElement);
      return updatedElements.map((el, idx) => ({ ...el, index: idx }));
    });
  };

  const updateText = (id, newText) => {
    setElements((prev) =>
      prev.map((el) => (el.id === id ? { ...el, text: newText } : el))
    );
  };

  const removeElement = (id) => {
    setElements((prev) => prev.filter((el) => el.id !== id));
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
        <DraggableElement
          key={el.id}
          el={el}
          index={index}
          moveElement={moveElement}
          updateText={updateText}
          removeElement={removeElement}
        />
      ))}
    </div>
  );
}

export default Canvas;
