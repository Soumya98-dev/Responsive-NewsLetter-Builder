// src/components/Sidebar.jsx
import React from "react";

function Sidebar({ addElement }) {
  return (
    <div className="sidebar">
      <h3>Elements</h3>
      <button onClick={() => addElement("text")}>Add Text</button>
      <button onClick={() => addElement("image")}>Add Image</button>
      <button onClick={() => addElement("button")}>Add Button</button>
    </div>
  );
}

export default Sidebar;
