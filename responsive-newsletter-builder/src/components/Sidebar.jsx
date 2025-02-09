import React from "react";
import { useDrag } from "react-dnd";
import "../styles/sidebar.css";

function SidebarElement({ type }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "ELEMENT",
    item: { type, isNew: true },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className="sidebar-element"
      style={{
        opacity: isDragging ? 0.5 : 1,
        padding: "10px",
        marginBottom: "10px",
        border: "1px solid #ddd",
        backgroundColor: "#f9f9f9",
        cursor: "grab",
        textAlign: "center",
        fontWeight: "bold",
        borderRadius: "5px",
      }}
    >
      {type}
    </div>
  );
}

function Sidebar() {
  return (
    <div
      className="sidebar"
      style={{ width: "25%", padding: "20px", background: "#f7f7f7" }}
    >
      <h3>Drag Elements</h3>
      <SidebarElement type="text" />
      <SidebarElement type="image" />
      <SidebarElement type="button" />
    </div>
  );
}

export default Sidebar;
