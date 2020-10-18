import React from "react";
import { SortableContainer } from "react-sortable-hoc";
import { withStyles } from "@material-ui/styles";
import DraggableColorBox from "./DraggableColorBox";

const styles = { root: { height: "100%" } };

const SortablePalette = SortableContainer(
  ({ paletteColors, deleteColor, classes }) => {
    return (
      <div className={classes.root}>
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

export default withStyles(styles)(SortablePalette);