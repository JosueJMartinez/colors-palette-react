import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import {
  ValidatorForm,
  TextValidator,
} from "react-material-ui-form-validator";
import styles from "../../../styles/PaletteFormNavStyles";

const drawerWidth = 350;
const useStyles = makeStyles(theme => styles(theme, drawerWidth));

function PaletteFormNav(props) {
  const classes = useStyles();
  const [state, setState] = useState({
    newPaletteName: "",
  });
  const {
    isDrawerOpen,
    totalColors,
    palettes,
    handleDrawerOpen,
    handleSubmitPalette,
  } = props;

  const { newPaletteName } = state;

  useEffect(() => {
    ValidatorForm.addValidationRule("isPaletteNameUnique", value =>
      palettes.every(
        ({ paletteName }) =>
          value.toLowerCase() !== paletteName.toLocaleLowerCase()
      )
    );

    ValidatorForm.addValidationRule(
      "isPaletteNotEmpty",
      () => totalColors > 0
    );
    return () => {
      ValidatorForm.removeValidationRule("isPaletteNameUnique");
      ValidatorForm.removeValidationRule("isPaletteNotEmpty");
    };
  });

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

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: isDrawerOpen,
        })}
        color="default"
      >
        <Toolbar className={classes.toolBar}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(
              classes.menuButton,
              isDrawerOpen && classes.hide
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" noWrap>
            Create A Palette
          </Typography>
          <div className={classes.appBarBtns}>
            {" "}
            <ValidatorForm
              instantValidate={false}
              onSubmit={() => handleSubmitPalette(newPaletteName)}
              className={classes.paletteNameForm}
              onError={errors => console.log(errors)}
            >
              <TextValidator
                // className={classes.formContent}
                label="Palette Name"
                onChange={handleNameChange}
                name="newPaletteName"
                value={newPaletteName}
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
                // className={classes}
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
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withRouter(PaletteFormNav);
