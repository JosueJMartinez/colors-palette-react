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

import styles from "../../styles/NewPaletteFormStyles";
import DraggableColorBox from "./DraggableColorBox";

const drawerWidth = 350;

const useStyles = makeStyles(theme => styles(theme, drawerWidth));

export default function NewPaletteForm(props) {
  const classes = useStyles();
  const [state, setState] = useState({
    isOpen: true,
    currentColor: "#0000FF",
    paletteColors: [],
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
    ValidatorForm.addValidationRule("isColorUnique", value =>
      state.paletteColors.every(
        ({ color }) => state.currentColor !== color
      )
    );

    ValidatorForm.addValidationRule("isPaletteNameUnique", value =>
      props.checkPaletteName(value)
    );

    ValidatorForm.addValidationRule(
      "isPaletteNotEmpty",
      value => state.paletteColors.length > 0
    );

    return () => {
      ValidatorForm.removeValidationRule("isColorNameUnique");
      ValidatorForm.removeValidationRule("isColorUnique");
      ValidatorForm.removeValidationRule("isPaletteNameUnique");
      ValidatorForm.removeValidationRule("isPaletteNotEmpty");
    };
  });

  useEffect(() => {
    if (state.paletteColors.length > 19) {
      setState(prevState => ({ ...prevState, isFull: true }));
    }
    return () => {};
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

  const handleSavePalette = () => {
    const newPalette = {
      paletteName: state.newPaletteName,
      id: state.newPaletteName.toLowerCase().replace(/ /g, "-"),
      emoji: "🎨",
      colors: state.paletteColors,
    };
    props.addPalette(newPalette);
    props.history.push("/");
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
            // ref="form"
            instantValidate={false}
            onSubmit={handleSavePalette}
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
              <Button
                type="submit"
                color="primary"
                // onClick={}
              >
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
            // ref="form"
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
              style={{ backgroundColor: state.currentColor.hex }}
              // onClick={handleAddColorClick}
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

        {state.paletteColors.map(c => (
          <DraggableColorBox key={c.name} color={c} />
        ))}
      </main>
    </div>
  );
}
