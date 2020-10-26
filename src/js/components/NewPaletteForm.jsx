import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { arrayMove } from "react-sortable-hoc";
import SortablePalette from "./NewPaletteFormComponents/SortablePalette";
import PaletteFormNav from "./NewPaletteFormComponents/PaletteFormNav";
import PaletteFormDrawer from "./NewPaletteFormComponents/PaletteFormDrawer";
import styles from "../../styles/NewPaletteFormStyles";
import { DRAWER_WIDTH } from "../../constants";

const useStyles = makeStyles(theme => styles(theme, DRAWER_WIDTH));

export default function NewPaletteForm(props) {
  const classes = useStyles();

  const [state, setState] = useState({
    isDrawerOpen: true,
    paletteColors: [
      { name: "red", color: "#F44336" },
      { name: "pink", color: "#E91E63" },
      { name: "purple", color: "#9C27B0" },
      { name: "deeppurple", color: "#673AB7" },
      { name: "indigo", color: "#3F51B5" },
      { name: "blue", color: "#2196F3" },
      { name: "lightblue", color: "#03A9F4" },
      { name: "cyan", color: "#00BCD4" },
      { name: "teal", color: "#009688" },
      { name: "green", color: "#4CAF50" },
      { name: "lightgreen", color: "#8BC34A" },
      { name: "lime", color: "#CDDC39" },
      { name: "yellow", color: "#FFEB3B" },
      { name: "amber", color: "#FFC107" },
      { name: "orange", color: "#FF9800" },
      { name: "deeporange", color: "#FF5722" },
      { name: "brown", color: "#795548" },
      { name: "grey", color: "#9E9E9E" },
      { name: "bluegrey", color: "#607D8B" },
    ],
    addClickCtr: 0,
  });

  const { isDrawerOpen, paletteColors, addClickCtr } = state;
  const { maxColors, addPalette, history, palettes } = props;

  useEffect(() => {
    document.body.classList.add("overflow");
    document.querySelector(".page").classList.add("fullscreen-height");
    document.querySelector(".page").style.position = "fixed";
    return () => {
      document.body.classList.remove("overflow");
      document
        .querySelector(".page")
        .classList.remove("fullscreen-height");
      document.querySelector(".page").style.position = "absolute";
    };
  });

  const isFull = paletteColors.length >= maxColors;

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
      addClickCtr: prevState.addClickCtr + 1,
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

  const handleSubmitPalette = submitted => {
    const { paletteName, emoji } = submitted;
    const newPalette = {
      paletteName,
      id: paletteName.toLowerCase().replace(/ /g, "-"),
      emoji,
      colors: paletteColors,
    };
    addPalette(newPalette);
    history.push("/");
  };

  const deleteColor = deleteColorName => {
    setState(prevState => ({
      ...prevState,
      paletteColors: paletteColors.filter(
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
      let randNum = Math.floor(Math.random() * palettes.length);
      const randPalette = palettes[randNum];

      randNum = Math.floor(Math.random() * randPalette.colors.length);
      randColor = randPalette.colors[randNum];
      let color = {};

      for (let i = 0; i < paletteColors.length; i++) {
        color = paletteColors[i];
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
    <div className={classes.root}>
      <PaletteFormNav
        isDrawerOpen={isDrawerOpen}
        palettes={palettes}
        totalColors={paletteColors.length}
        handleSubmitPalette={handleSubmitPalette}
        handleDrawerOpen={handleDrawerOpen}
      />
      <PaletteFormDrawer
        isDrawerOpen={isDrawerOpen}
        handleDrawerClose={handleDrawerClose}
        handleClearClick={handleClearClick}
        handleRandColorClick={handleRandColorClick}
        isFull={isFull}
        addColor={addColor}
        paletteColors={paletteColors}
        addClickCtr={addClickCtr}
      />
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: isDrawerOpen,
        })}
      >
        <div className={classes.drawerHeader} />
        <SortablePalette
          paletteColors={paletteColors}
          deleteColor={deleteColor}
          onSortEnd={onSortEnd}
          axis={"xy"}
          distance={20}
        />
      </main>
    </div>
  );
}

NewPaletteForm.defaultProps = {
  maxColors: 20,
};
