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

const drawerWidth = 300;

const useStyles = makeStyles(theme => styles(theme, drawerWidth));

export default function NewPaletteForm() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    isOpen: true,
    background: "#fff",
    color: {},
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

  // const handleChange = (color, e) => {
  //   setState(prevState => ({
  //     ...prevState,
  //     color: { hex: color.hex, rgb: color.rgb },
  //   }));
  // };

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
            RCP
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
          <Typography variant="h6" className={classes.drawerHeaderTitle}>
            RCP Options
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <Typography>Design Your Palette</Typography>
        <ButtonGroup
          variant="contained"
          color="primary"
          aria-label="contained primary button group"
          disableElevation
        >
          <Button color="secondary">Create Palette</Button>
          <Button color="primary">Random Color</Button>
        </ButtonGroup>
        <ChromePicker
          color={state.background}
          onChangeComplete={handleChangeComplete}
          // onChange={handleChange}
          // disableAlpha
        />
        <TextField id="filled-basic" label="Filled" variant="filled" />
        <Button variant="contained" color="primary">
          Add Color
        </Button>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: state.isOpen,
        })}
        style={{
          height: "100%",
          width: "100%",
        }}
      >
        <div className={classes.drawerHeader} />
        <div
          style={{
            background: state.background.hex,
            height: "20%",
            width: "25%",
          }}
        >
          test
        </div>
      </main>
    </div>
  );
}
