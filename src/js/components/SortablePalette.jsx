import React from "react";
import { SortableContainer } from "react-sortable-hoc";
import DraggableColorBox from "./DraggableColorBox";

const SortablePalette = SortableContainer(
  ({ paletteColors, deleteColor }) => {
    return (
      <div style={{ height: "100%" }}>
        {paletteColors.map((c, idx) => (
          <DraggableColorBox
            key={c.name}
            color={c}
            index={idx}
            deleteColor={deleteColor}
          />
        ))}
      </div>
    );
  }
);

export default SortablePalette;
