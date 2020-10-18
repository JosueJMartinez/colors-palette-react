import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { ChromePicker } from "react-color";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import {
  ValidatorForm,
  TextValidator,
} from "react-material-ui-form-validator";
import { arrayMove } from "react-sortable-hoc";
import SortablePalette from "./SortablePalette";
import styles from "../../styles/NewPaletteFormStyles";
import PaletteFormNav from "./PaletteFormComponents/PaletteFormNav";

const drawerWidth = 350;

const useStyles = makeStyles(theme => styles(theme, drawerWidth));

export default function NewPaletteForm(props) {
  const classes = useStyles();
  const [state, setState] = useState({
    isDrawerOpen: true,
    currentColor: "#0000FF",
    paletteColors: [],
    newColorName: "",
    newPaletteName: "",
  });

  useEffect(() => {
    document.body.classList.add("overflow");

    ValidatorForm.addValidationRule("isColorNameUnique", value =>
      state.paletteColors.every(
        ({ name }) => name.toLowerCase() !== value.toLowerCase()
      )
    );

    ValidatorForm.addValidationRule("isColorUnique", () =>
      state.paletteColors.every(
        ({ color }) => state.currentColor !== color
      )
    );

    return () => {
      document.body.classList.remove("overflow");
      ValidatorForm.removeValidationRule("isColorNameUnique");
      ValidatorForm.removeValidationRule("isColorUnique");
    };
  });

  const isFull = state.paletteColors.length >= props.maxColors;

  const handleDrawerOpen = () => {
    setState(prevState => ({ ...prevState, isDrawerOpen: true }));
  };

  const handleDrawerClose = () => {
    setState(prevState => ({ ...prevState, isDrawerOpen: false }));
  };

  const handleChangeComplete = color => {
    setState(prevState => ({
      ...prevState,
      currentColor: color.hex,
    }));
  };

  const handleAddColorSubmit = e => {
    addColor({ color: state.currentColor, name: state.newColorName });
  };

  const addColor = color => {
    setState(prevState => ({
      ...prevState,
      paletteColors: [...prevState.paletteColors, color],

      newColorName: "",
      currentColor: "#0000FF",
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

  const handleNameChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    setState(prevState => ({
      ...prevState,
      [name]: value,
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
    // console.log(color);
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

      isUnique = state.paletteColors.every(
        color =>
          color.color !== randColor.color &&
          color.name.toLowerCase() !== randColor.name.toLocaleLowerCase()
      );
    } while (!isUnique);

    return randColor;
  };

  return (
    <div
      className={classes.root}
      style={{ height: "100%", width: "100%" }}
    >
      <PaletteFormNav
        classes={classes}
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

        <div className={classes.form}>
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
          <ChromePicker
            disableAlpha
            className={classes.formContent}
            color={state.currentColor}
            onChangeComplete={handleChangeComplete}
          />
          <ValidatorForm
            instantValidate={false}
            onSubmit={handleAddColorSubmit}
            className={classes.formContent}
            onError={errors => console.log(errors)}
          >
            <TextValidator
              className={classes.formContent}
              label="Name"
              onChange={handleNameChange}
              name="newColorName"
              value={state.newColorName}
              validators={[
                "required",
                "isColorNameUnique",
                "isColorUnique",
              ]}
              errorMessages={[
                "this field is required",
                "color name in use already",
                "color is already in use",
              ]}
            />
            <Button
              type="submit"
              className={classes.formContent}
              variant="contained"
              color="primary"
              style={{
                backgroundColor: isFull ? "grey" : state.currentColor,
              }}
              disabled={isFull}
            >
              {isFull ? "Palette Full" : "Add Color"}
            </Button>
          </ValidatorForm>
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
