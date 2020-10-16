import React from "react";
import { withStyles } from "@material-ui/styles";
import { Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

const styles = {
  root: {
    width: "20%",
    height: "25%",
    margin: "0 auto",
    display: "inline-block",
    position: "relative",
    cursor: "pointer",
    "&:hover $deleteIcon": {
      color: "white",
      fontSize: "30px",
      backgroundColor: "rgba(0,0,0,0.5)",
    },
  },
  content: {
    height: "100%",
    width: "100%",
    margin: "0 auto",
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  name: {
    paddingLeft: "5px",
    padding: "10px",
    fontSize: "12px",
    letterSpacing: "1px",
  },
  deleteIcon: {
    padding: "0px 3px 3px 3px",
    marginBottom: "5px",
    color: "rgba(0,0,0,0.5)",
    transition: "all 0.3s ease-in-out",
  },
};

function DraggableColorBox(props) {
  const { color, classes, handleDeletion } = props;

  const handleDeleteClick = () => {
    handleDeletion(color.name);
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
}

export default withStyles(styles)(DraggableColorBox);
