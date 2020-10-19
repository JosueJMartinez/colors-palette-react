import React, { useState } from "react";
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
import styles from "../../../styles/PaletteFormNavStyles";
import PaletteMetaForm from "./PaletteMetaForm";

const drawerWidth = 350;
const useStyles = makeStyles(theme => styles(theme, drawerWidth));

function PaletteFormNav(props) {
  const classes = useStyles();
  const [state, setState] = useState({
    isPaletteNameOpen: false,
  });
  const {
    isDrawerOpen,
    totalColors,
    palettes,
    handleDrawerOpen,
    handleSubmitPalette,
  } = props;

  const { isPaletteNameOpen } = state;

  const goBack = () => {
    props.history.push("/");
  };

  const handleClickOpen = () => {
    setState(prevState => ({ ...prevState, isPaletteNameOpen: true }));
  };

  const handleClose = () => {
    setState(prevState => ({ ...prevState, isPaletteNameOpen: false }));
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
        </Toolbar>
        <div className={classes.appBarBtns}>
          {" "}
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
            <Button onClick={handleClickOpen} color="primary">
              Save Palette
            </Button>
          </ButtonGroup>
        </div>
      </AppBar>
      <PaletteMetaForm
        isOpen={isPaletteNameOpen}
        handleClose={handleClose}
        handleSubmitPalette={handleSubmitPalette}
        palettes={palettes}
        totalColors={totalColors}
      />
    </div>
  );
}

export default withRouter(PaletteFormNav);
