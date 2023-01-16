import React from "react";

function ListItem({ title, body }) {
  return (
    <div
      style={{
        padding: 10,
        border: " 1px solid grey",
        borderRadius: 10,
        margin: 15,
      }}
    >
      <h3>{title}</h3>
      <p>{body}</p>
    </div>
  );
}

export default ListItem;
