import React, { Component, Fragment } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import chroma from "chroma-js";

import { withStyles } from "@material-ui/styles";

import NavBar from "./NavBar";
import ColorBox from "./ColorBox";
import Footer from "./Footer";

import "rc-slider/assets/index.css";

const styles = {
  root: {
    height: "100vh",
  },
  paletteColors: {
    height: "90%",
    textTransform: "uppercase",
  },
  copyOverlayText: {
    width: "100%",
    height: "100%",
    left: "0",
    right: "0",
    top: "0",
    bottom: "0",
    position: "fixed",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    fontSize: "4rem",
    transform: "scale(0.1)",
    color: "white",
    opacity: "0",
    "& p": {
      fontSize: "2rem",
      fonteight: "100",
      color: "black",
    },
    "& $lightText": {
      color: "white",
    },
  },
  show: {
    opacity: "1",
    transform: "scale(1)",
    zIndex: "14",
    transition: "all 0.1s ease-in-out",
    transitionDelay: "0.3s",
    "& h1": {
      fontWeight: "400",
      textShadow: "1px 2px black",
      background: "#ffffff2d",
      width: "100%",
      textAlign: "center",
      marginBottom: "0px",
      padding: "1rem",
    },
    "& $darkBackground": {
      background: "#00000084",
    },
  },
  darkBackground: {},
  lightText: {},
};

class Palette extends Component {
  static defaultProps = {
    isRegPalette: true,
  };
  state = {
    copyStatus: {
      show: false,
      color: "white",
    },
    level: 500,
    type: "hex",
    isOpen: false,
  };

  componentDidMount() {
    document.body.classList.add("overflow");
  }

  componentWillUnmount() {
    document.body.classList.remove("overflow");
  }

  toggleCopyMessage = color => {
    this.setState(prevProps => ({
      copyStatus: {
        show: !prevProps.copyStatus.show,
        color,
      },
    }));
  };

  handleSlider = newLevel => {
    this.setState({ level: newLevel });
  };

  changeFormat = e => {
    const { value, name } = e.target;
    this.setState({ [name]: value, isOpen: true });
  };

  handleClose = () => {
    this.setState({ isOpen: false });
  };

  isFontColorDark = color => {
    return chroma(color).luminance() < 0.08;
  };

  isBackgroundColorDark = color => {
    return chroma(color).luminance() > 0.04;
  };

  render() {
    const {
      colors,
      emoji,
      id,
      paletteName,
      isRegPalette,
      match,
      classes,
    } = this.props;
    const { level, type, isOpen, copyStatus } = this.state;
    const { show, color } = copyStatus;
    const { params } = match;

    const decidePalette = () => {
      if (isRegPalette) {
        return mapPaletteBoxes(colors[level], true);
      }

      const keys = Object.keys(colors);
      const colorLevels = [];
      for (let i = 1; i < keys.length; i++) {
        const c = colors[keys[i]].filter(c => c.id === params.color);
        colorLevels.push(c[0]);
      }
      return mapPaletteBoxes(colorLevels, false);
    };

    const mapPaletteBoxes = (palette, isRegPalette) => {
      return palette.map(c => {
        return (
          <ColorBox
            key={c.name}
            name={c.name}
            type={c[type]}
            id={c.id}
            toggleCopyMessage={this.toggleCopyMessage}
            paletteId={id}
            isRegPalette={!isRegPalette}
            isBackBox={false}
            isFontColorDark={this.isFontColorDark}
            isBackgroundColorDark={this.isBackgroundColorDark}
          />
        );
      });
    };

    const addBackButton = () => {
      if (!isRegPalette) {
        return <ColorBox isBackBox={true} paletteId={id} />;
      }
    };

    return (
      <div className={classes.root}>
        {/* NavBar goes here */}
        <NavBar
          level={isRegPalette && level}
          handleSlider={isRegPalette && this.handleSlider}
          handleFormat={this.changeFormat}
          type={type}
        />

        <div
          className={`${classes.copyOverlayText} ${show && classes.show}`}
        >
          <h1
            // style={{ backgroundColor: this.backgroundColorLum(color) }}
            className={
              this.isBackgroundColorDark(color) && classes.darkBackground
            }
          >
            Copied
          </h1>
          <p
            // style={{ color: this.fontColorLum(color) }}
            className={
              this.isFontColorDark(color) ? classes.lightText : undefined
            }
          >
            {color}
          </p>
        </div>
        <div className={classes.paletteColors}>
          {/* Mapping colors array into individual colorboxes */}
          {decidePalette()}
          {addBackButton()}
        </div>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          open={isOpen}
          autoHideDuration={1500}
          onClose={this.handleClose}
          message={
            <span id="message-id">Format is {type.toUpperCase()}</span>
          }
          ContentProps={{ "aria-describedby": "message-id" }}
          action={
            <Fragment>
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={this.handleClose}
                onClose={this.handleClose}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Fragment>
          }
        />
        {/* footer here */}
        <Footer emoji={emoji} name={paletteName} />
      </div>
    );
  }
}

export default withStyles(styles)(Palette);
