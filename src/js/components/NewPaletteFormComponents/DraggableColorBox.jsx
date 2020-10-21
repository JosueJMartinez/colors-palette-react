import React from "react";
import { withStyles } from "@material-ui/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import { SortableElement } from "react-sortable-hoc";
import styles from "../../../styles/DraggableColorBoxStyles";

const DraggableColorBox = SortableElement(props => {
  const { color, classes, deleteColor } = props;

  const handleDeleteClick = () => {
    deleteColor(color.name);
  };

  return (
    <div
      id={color.name}
      className={classes.root}
      style={{ backgroundColor: color.color }}
    >
      <div className={classes.content}>
        <span className={classes.name}>{color.name}</span>
        <DeleteIcon
          className={classes.deleteIcon}
          onClick={handleDeleteClick}
        />
      </div>
    </div>
  );
});

export default withStyles(styles)(DraggableColorBox);
