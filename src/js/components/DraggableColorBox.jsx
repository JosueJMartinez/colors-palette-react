import React from "react";
import { withStyles } from "@material-ui/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import { SortableElement } from "react-sortable-hoc";

const styles = {
  root: {
    width: "20%",
    height: "25%",
    margin: "0 auto",
    display: "inline-block",
    position: "relative",
    cursor: "default",
    "&:hover $deleteIcon": {
      color: "white",
      transform: "scale(1.3)",
    },
  },
  content: {
    height: "100%",
    width: "100%",
    margin: "0 auto",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-between",
    color: "rgba(0,0,0,0.5)",
  },
  name: {
    paddingLeft: "5px",
    padding: "10px",
    fontSize: "12px",
    letterSpacing: "1px",
  },
  deleteIcon: {
    transition: "all 0.3s ease-in-out",
    cursor: "pointer",
    margin: "0 5px",
    marginBottom: "3px",
  },
};

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
