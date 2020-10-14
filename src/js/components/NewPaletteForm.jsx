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
import TextField from "@material-ui/core/TextField";

import styles from "../../styles/NewPaletteFormStyles";

const drawerWidth = 350;

const useStyles = makeStyles(theme => styles(theme, drawerWidth));

export default function NewPaletteForm() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    isOpen: true,
    background: { hex: "#0000FF", rgb: { a: 0, b: 255, g: 0, r: 1 } },
    paletteColors: [],
  });

  const handleDrawerOpen = () => {
    setState(prevState => ({ ...prevState, isOpen: true }));
  };

  const handleDrawerClose = () => {
    setState(prevState => ({ ...prevState, isOpen: false }));
  };

  const handleChangeComplete = (color, e) => {
    setState(prevState => ({
      ...prevState,
      background: { hex: color.hex, rgb: color.rgb },
    }));
  };

  const handleAddColorClick = e => {
    setState(prevState => ({
      ...prevState,
      paletteColors: [...prevState.paletteColors, state.background],
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
        <Typography variant="h4" className={classes.designTitle}>
          Design Your Palette
        </Typography>
        <ButtonGroup
          className={classes.formContent}
          variant="contained"
          color="primary"
          aria-label="contained primary button group"
          disableElevation
        >
          <Button color="secondary">Clear Palette</Button>
          <Button color="primary">Random Color</Button>
        </ButtonGroup>
        <ChromePicker
          className={classes.formContent}
          color={state.background}
          onChangeComplete={handleChangeComplete}
        />
        <TextField
          className={classes.formContent}
          required
          id="outlined-required"
          label="Color Name"
          variant="outlined"
        />
        <Button
          className={classes.bottomForm}
          variant="contained"
          color="primary"
          style={{ backgroundColor: state.background.hex }}
          onClick={handleAddColorClick}
        >
          Add Color
        </Button>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: state.isOpen,
        })}
      >
        <div className={classes.drawerHeader} />

        {state.paletteColors.map(c => (
          <div
            style={{
              background: c.hex,
            }}
          >
            test
          </div>
        ))}
      </main>
    </div>
  );
}
