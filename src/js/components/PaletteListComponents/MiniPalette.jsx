import React from "react";
import { useHistory } from "react-router-dom";
import { withStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import CancelIcon from "@material-ui/icons/Cancel";
import styles from "../../../styles/MiniPaletteStyles";

function MiniPalette(props) {
  const { classes, id, paletteName, emoji, colors, openDelete } = props;
  const history = useHistory();
  const onClickPalette = e => {
    history.push(`/palette/${id}`);
  };

  const handleDeleteClick = e => {
    e.stopPropagation();
    openDelete(id);
  };

  return (
    <Grid
      onClick={onClickPalette}
      className={classes.root}
      id={id}
      item
      xs={12}
      sm={4}
    >
      <IconButton
        color="secondary"
        aria-label="delete palette"
        onClick={handleDeleteClick}
        edge="start"
        className={classes.deleteIcon}
      >
        <CancelIcon />
      </IconButton>
      <div className={classes.card}>
        <div className={classes.colors}>
          {colors.map((c, idx) => (
            <div
              className={classes.color}
              item
              xs={3}
              style={{ backgroundColor: c.color }}
              key={idx}
            />
          ))}
        </div>
        <h5 className={classes.title}>
          {paletteName} <span className="emoji">{emoji}</span>
        </h5>
      </div>
    </Grid>
  );
}

export default withStyles(styles)(MiniPalette);
