import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import arrayMove from "array-move";

import SortablePalette from "./NewPaletteFormComponents/SortablePalette";
import PaletteFormNav from "./NewPaletteFormComponents/PaletteFormNav";
import PaletteFormDrawer from "./NewPaletteFormComponents/PaletteFormDrawer";
import styles from "../../styles/NewPaletteFormStyles";
import { DRAWER_WIDTH } from "../../constants";
import seedColors from "../seedColors";

const useStyles = makeStyles(theme => styles(theme, DRAWER_WIDTH));

export default function NewPaletteForm(props) {
  const classes = useStyles();

  const [state, setState] = useState({
    isDrawerOpen: true,
    paletteColors: seedColors[0].colors,
    addClickCtr: 0,
    isGrabbing: false,
  });

  const { isDrawerOpen, paletteColors, addClickCtr, isGrabbing } = state;
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
    document.querySelector("body").style.cursor = "";
    setState(prevState => ({
      ...prevState,
      paletteColors: arrayMove(
        prevState.paletteColors,
        oldIndex,
        newIndex
      ),
      isGrabbing: false,
    }));
  };

  const onSortMove = () => {
    document.querySelector("body").style.cursor = "grabbing";
    setState(prevState => ({ ...prevState, isGrabbing: true }));
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
        isGrabbing={isGrabbing}
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
        isGrabbing={isGrabbing}
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
          onSortStart={onSortMove}
          distance={20}
          isGrabbing={isGrabbing}
        />
      </main>
    </div>
  );
}

NewPaletteForm.defaultProps = {
  maxColors: 20,
};
