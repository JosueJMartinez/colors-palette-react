import React, { useEffect } from "react";
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

export default function NewPaletteForm() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    isOpen: true,
    currentColor: { hex: "#0000FF", rgb: { a: 0, b: 255, g: 0, r: 1 } },
    paletteColors: [],
    isFull: false,
    newColorName: "",
  });

  useEffect(() => {
    ValidatorForm.addValidationRule("isColorNameUnique", value =>
      state.paletteColors.every(
        ({ name }) => name.toLowerCase() !== value.toLowerCase()
      )
    );
    ValidatorForm.addValidationRule("isColorUnique", value =>
      state.paletteColors.every(
        ({ hex }) => state.currentColor.hex !== hex
      )
    );
    return () => {
      ValidatorForm.removeValidationRule("isColorNameUnique");
      ValidatorForm.removeValidationRule("isColorUnique");
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
      currentColor: { hex: color.hex, rgb: color.rgb },
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
        { ...state.currentColor, name: prevState.newColorName },
      ],
      isFull: isFull,
      newColorName: "",
      currentColor: { hex: "#0000FF", rgb: { a: 0, b: 255, g: 0, r: 1 } },
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
    const newColorName = e.target.value;
    setState(prevState => ({ ...prevState, newColorName }));
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
              name="name"
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
