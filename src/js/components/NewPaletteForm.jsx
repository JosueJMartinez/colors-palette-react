import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { arrayMove } from "react-sortable-hoc";
import SortablePalette from "./NewPaletteFormComponents/SortablePalette";
import styles from "../../styles/NewPaletteFormStyles";
import PaletteFormNav from "./NewPaletteFormComponents/PaletteFormNav";
import NewColorPickerForm from "./NewPaletteFormComponents/NewColorPickerForm";

const drawerWidth = 350;

const useStyles = makeStyles(theme => styles(theme, drawerWidth));

export default function NewPaletteForm(props) {
  const classes = useStyles();

  const [state, setState] = useState({
    isDrawerOpen: true,
    paletteColors: [],
    newPaletteName: "",
    buttonClickCtr: 0,
  });

  useEffect(() => {
    document.body.classList.add("overflow");

    return () => {
      document.body.classList.remove("overflow");
    };
  });

  const isFull = state.paletteColors.length >= props.maxColors;

  const handleDrawerOpen = () => {
    setState(prevState => ({ ...prevState, isDrawerOpen: true }));
  };

  const handleDrawerClose = () => {
    setState(prevState => ({ ...prevState, isDrawerOpen: false }));
  };

  const addColor = color => {
    setState(prevState => ({
      ...prevState,
      paletteColors: [...prevState.paletteColors, color],
      buttonClickCtr: prevState.buttonClickCtr + 1,
    }));
  };

  const handleClearClick = () => {
    setState(prevState => ({
      ...prevState,
      paletteColors: [],
      isFull: false,
      newColorName: "",
    }));
  };

  const handleSubmitPalette = newPaletteName => {
    const newPalette = {
      paletteName: newPaletteName,
      id: newPaletteName.toLowerCase().replace(/ /g, "-"),
      emoji: "🎨",
      colors: state.paletteColors,
    };
    props.addPalette(newPalette);
    props.history.push("/");
  };

  const deleteColor = deleteColorName => {
    setState(prevState => ({
      ...prevState,
      paletteColors: state.paletteColors.filter(
        color => color.name !== deleteColorName
      ),
    }));
  };

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setState(prevState => ({
      ...prevState,
      paletteColors: arrayMove(
        prevState.paletteColors,
        oldIndex,
        newIndex
      ),
    }));
  };

  const handleRandColorClick = e => {
    const color = getRandColor();
    addColor(color);
  };

  const getRandColor = () => {
    let randColor = {};
    let isUnique = true;

    do {
      let randNum = Math.floor(Math.random() * props.palettes.length);
      const randPalette = props.palettes[randNum];

      randNum = Math.floor(Math.random() * randPalette.colors.length);
      randColor = randPalette.colors[randNum];
      let color = {};

      for (let i = 0; i < state.paletteColors.length; i++) {
        color = state.paletteColors[i];
        isUnique = true;
        if (
          color.color === randColor.color ||
          color.name.toLowerCase() === randColor.name.toLocaleLowerCase()
        ) {
          isUnique = false;
          break;
        }
      }
    } while (!isUnique);
    return randColor;
  };

  return (
    <div
      className={classes.root}
      style={{ height: "100%", width: "100%" }}
    >
      <PaletteFormNav
        isDrawerOpen={state.isDrawerOpen}
        palettes={props.palettes}
        totalColors={state.paletteColors.length}
        handleSubmitPalette={handleSubmitPalette}
        handleDrawerOpen={handleDrawerOpen}
      />
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={state.isDrawerOpen}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <Typography variant="h5" className={classes.drawerHeaderTitle}>
            RCP Options
          </Typography>
          <IconButton onClick={handleDrawerClose}>
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
            <Button color="secondary" onClick={handleClearClick}>
              Clear Palette
            </Button>
            <Button
              color="primary"
              onClick={handleRandColorClick}
              disabled={isFull}
              style={{
                backgroundColor: isFull ? "grey" : "",
              }}
            >
              Random Color
            </Button>
          </ButtonGroup>
          <NewColorPickerForm
            isFull={isFull}
            addColor={addColor}
            paletteColors={state.paletteColors}
            buttonClickCtr={state.buttonClickCtr}
          />
        </div>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: state.isDrawerOpen,
        })}
      >
        <div className={classes.drawerHeader} />
        <SortablePalette
          paletteColors={state.paletteColors}
          deleteColor={deleteColor}
          onSortEnd={onSortEnd}
          axis={"xy"}
        />
      </main>
    </div>
  );
}

NewPaletteForm.defaultProps = {
  maxColors: 20,
};
