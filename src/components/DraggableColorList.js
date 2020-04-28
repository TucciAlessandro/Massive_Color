import React from "react";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import DraggableColorBox from "./DraggableColorBox";

const DraggrableColorList = SortableContainer(({ colors, removeColor }) => {
  return (
    <div style={{ height: "100%" }}>
      {colors.map((color, i) => (
        <DraggableColorBox
          index={i}
          color={color.color}
          name={color.name}
          handleClick={() => removeColor(color.name)}
          key={color.name}
        />
      ))}
    </div>
  );
});

export default DraggrableColorList;
