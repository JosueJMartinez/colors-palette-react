import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import clsx from "clsx";

import NewColorPickerForm from "./NewColorPickerForm";
import styles from "../../../styles/NewPaletteFormComponentStyles/PaletteFormDrawerStyles";
import { DRAWER_WIDTH } from "../../../constants";

const useStyles = makeStyles(theme => styles(theme, DRAWER_WIDTH));

export default function PaletteFormDrawer(props) {
  const classes = useStyles(props);

  const {
    isDrawerOpen,
    handleDrawerClose,
    handleClearClick,
    handleRandColorClick,
    isFull,
    addColor,
    paletteColors,
    addClickCtr,
    isGrabbing,
  } = props;

  return (
    <Drawer
      className={classes.root}
      variant="persistent"
      anchor="left"
      open={isDrawerOpen}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <Typography variant="h5" className={classes.drawerHeaderTitle}>
          Create a Palette
        </Typography>
        <IconButton
          onClick={handleDrawerClose}
          className={classes.isGrabbing}
        >
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <div className={classes.drawerContainer}>
        <Typography variant="h4" className={classes.formContent}>
          Design Your Palette
        </Typography>
        <ButtonGroup
          className={classes.formContent}
          variant="contained"
          color="primary"
          aria-label="contained primary button group"
          disableElevation
        >
          <Button
            color="secondary"
            onClick={handleClearClick}
            className={classes.isGrabbing}
          >
            Clear Palette
          </Button>
          <Button
            color="primary"
            onClick={handleRandColorClick}
            disabled={isFull}
            className={clsx(classes.isGrabbing, classes.isFull)}
          >
            Random Color
          </Button>
        </ButtonGroup>
        <NewColorPickerForm
          isFull={isFull}
          addColor={addColor}
          paletteColors={paletteColors}
          addClickCtr={addClickCtr}
          isGrabbing={isGrabbing}
        />
      </div>
    </Drawer>
  );
}
