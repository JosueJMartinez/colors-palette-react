import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AddToPhotosIcon from "@material-ui/icons/AddToPhotos";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import styles from "../../../styles/PaletteFormNavStyles";
import PaletteMetaForm from "./PaletteMetaForm";
import { DRAWER_WIDTH } from "../../../constants";

// const DRAWER_WIDTH = styleConstants;

const useStyles = makeStyles(theme => styles(theme, DRAWER_WIDTH));

function PaletteFormNav(props) {
  const classes = useStyles();

  const [state, setState] = useState({
    stateOfMetaForm: "closed",
  });

  const {
    isDrawerOpen,
    totalColors,
    palettes,
    handleDrawerOpen,
    handleSubmitPalette,
  } = props;

  const { stateOfMetaForm } = state;

  // const nameInputRef = useRef(null)

  const goBack = () => {
    props.history.push("/");
  };

  const changeStateOfForm = stateOfMetaForm => {
    setState(prevState => ({ ...prevState, stateOfMetaForm }));
  };

  const handleFormClick = () => {
    // nameInputRef.current.focus();
    changeStateOfForm("nameForm");
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
            <AddToPhotosIcon />
          </IconButton>
          <Typography variant="h5" noWrap>
            RCP
          </Typography>
        </Toolbar>
        <div className={classes.appBarBtns}>
          {" "}
          <ButtonGroup
            variant="contained"
            color="primary"
            aria-label="contained primary button group"
            disableElevation
          >
            <Button color="secondary" onClick={goBack}>
              Go Back
            </Button>
            <Button onClick={handleFormClick} color="primary">
              Save Palette
            </Button>
          </ButtonGroup>
        </div>
      </AppBar>
      <PaletteMetaForm
        handleSubmitPalette={handleSubmitPalette}
        palettes={palettes}
        totalColors={totalColors}
        changeStateOfForm={changeStateOfForm}
        stateOfMetaForm={stateOfMetaForm}
      />
    </div>
  );
}

export default withRouter(PaletteFormNav);
