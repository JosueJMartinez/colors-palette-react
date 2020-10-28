import React from "react";
import { SortableContainer } from "react-sortable-hoc";
import { withStyles } from "@material-ui/styles";

import DraggableColorBox from "./DraggableColorBox";
import styles from "../../../styles/NewPaletteFormComponentStyles/SortablePaletteStyles";

const SortablePalette = SortableContainer(
  ({ paletteColors, deleteColor, classes, isGrabbing }) => {
    return (
      <div className={classes.root}>
        {paletteColors.map((c, idx) => (
          <DraggableColorBox
            key={c.name}
            color={c}
            index={idx}
            deleteColor={deleteColor}
            isGrabbing={isGrabbing}
          />
        ))}
      </div>
    );
  }
);

export default withStyles(styles)(SortablePalette);
