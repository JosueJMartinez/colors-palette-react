import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { ChromePicker } from "react-color";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
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

const drawerWidth = 350;

const useStyles = makeStyles(theme => styles(theme, drawerWidth));

export default function NewPaletteForm(props) {
  const classes = useStyles();
  const [state, setState] = useState({
    isOpen: true,
    currentColor: "#0000FF",
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
    isFull: false,
    newColorName: "",
    newPaletteName: "",
  });

  useEffect(() => {
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

    ValidatorForm.addValidationRule("isPaletteNameUnique", value =>
      props.palettes.every(
        ({ paletteName }) =>
          value.toLowerCase() !== paletteName.toLocaleLowerCase()
      )
    );

    ValidatorForm.addValidationRule(
      "isPaletteNotEmpty",
      () => state.paletteColors.length > 0
    );

    return () => {
      ValidatorForm.removeValidationRule("isColorNameUnique");
      ValidatorForm.removeValidationRule("isColorUnique");
      ValidatorForm.removeValidationRule("isPaletteNameUnique");
      ValidatorForm.removeValidationRule("isPaletteNotEmpty");
    };
  });

  useEffect(() => {
    if (state.paletteColors.length > 19)
      return setState(prevState => ({ ...prevState, isFull: true }));
    setState(prevState => ({ ...prevState, isFull: false }));
    // return () => {};
  }, [state.paletteColors]);

  const handleDrawerOpen = () => {
    setState(prevState => ({ ...prevState, isOpen: true }));
  };

  const handleDrawerClose = () => {
    setState(prevState => ({ ...prevState, isOpen: false }));
  };

  const handleChangeComplete = color => {
    setState(prevState => ({
      ...prevState,
      currentColor: color.hex,
    }));
  };

  const handleAddColorSubmit = e => {
    let isFull = false;
    if (state.paletteColors.length >= 19) {
      isFull = true;
    }
    setState(prevState => ({
      ...prevState,
      paletteColors: [
        ...prevState.paletteColors,
        { color: state.currentColor, name: prevState.newColorName },
      ],
      isFull: isFull,
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

  const goBack = () => {
    props.history.push("/");
  };

  const handleSubmitPalette = () => {
    const newPalette = {
      paletteName: state.newPaletteName,
      id: state.newPaletteName.toLowerCase().replace(/ /g, "-"),
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

  return (
    <div
      className={classes.root}
      style={{ height: "100%", width: "100%" }}
    >
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: state.isOpen,
        })}
        color="default"
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(
              classes.menuButton,
              state.isOpen && classes.hide
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" noWrap>
            Create A Palette
          </Typography>

          <ValidatorForm
            instantValidate={false}
            onSubmit={handleSubmitPalette}
            className={classes.formContent}
            onError={errors => console.log(errors)}
          >
            <TextValidator
              className={classes.formContent}
              label="Palette Name"
              onChange={handleNameChange}
              name="newPaletteName"
              value={state.newPaletteName}
              validators={[
                "required",
                "isPaletteNameUnique",
                "isPaletteNotEmpty",
              ]}
              errorMessages={[
                "this field is required",
                "Already a palette with this name",
                "Palette at least needs one color",
              ]}
            />
            <ButtonGroup
              className={classes.appBarButtons}
              variant="contained"
              color="primary"
              aria-label="contained primary button group"
              disableElevation
            >
              <Button color="secondary" onClick={goBack}>
                Go Back
              </Button>
              <Button type="submit" color="primary">
                Save Palette
              </Button>
            </ButtonGroup>
          </ValidatorForm>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={state.isOpen}
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
            <Button color="primary">Random Color</Button>
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
              style={{ backgroundColor: state.currentColor }}
              disabled={state.isFull}
            >
              {state.isFull ? "Palette Full" : "Add Color"}
            </Button>
          </ValidatorForm>
        </div>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: state.isOpen,
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
