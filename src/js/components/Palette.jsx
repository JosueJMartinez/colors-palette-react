import React, { Component } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import chroma from "chroma-js";
import clsx from "clsx";
import { withStyles } from "@material-ui/styles";

import NavBar from "./PaletteComponents/NavBar";
import ColorBox from "./PaletteComponents/ColorBox";
import Footer from "./PaletteComponents/Footer";
import styles from "../../styles/PaletteStyles";

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
    colors: {},
    emoji: "",
    id: "",
    paletteName: "",
    isColorFound: false,
  };

  componentDidMount() {
    document.body.classList.add("overflow");
    const palette = this.props.grabPalette(this.props.match.params.id);
    if (!palette) {
      return this.props.history.push("/");
    }
    // i am here working to add a check if color exists in the palette
    if (!this.props.isRegPalette) {
      const colorFound = palette.colors["50"].filter(
        c => c.id === this.props.match.params.color
      );

      if (!colorFound.length) return this.props.history.push("/");

      return this.setState(prevState => ({
        ...prevState,
        ...palette,
        isColorFound: true,
      }));
    }

    this.setState(prevState => ({ ...prevState, ...palette }));
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
    const { isRegPalette, match, classes } = this.props;
    const {
      level,
      type,
      isOpen,
      copyStatus,
      colors,
      emoji,
      id,
      paletteName,
      isColorFound,
    } = this.state;
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

    const loadContent = () => {
      return id.length &&
        (isRegPalette || (!isRegPalette && isColorFound)) ? (
        <>
          {" "}
          <div
            className={clsx(classes.copyOverlayText, {
              [classes.show]: show,
            })}
          >
            <h1
              className={
                this.isBackgroundColorDark(color)
                  ? classes.darkBackground
                  : undefined
              }
            >
              Copied
            </h1>
            <p
              className={
                this.isFontColorDark(color) ? classes.lightText : undefined
              }
            >
              {color}
            </p>
          </div>
          <div className={classes.paletteColors}>
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
              <>
                <IconButton
                  size="small"
                  aria-label="close"
                  color="inherit"
                  onClick={this.handleClose}
                  onClose={this.handleClose}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </>
            }
          />
        </>
      ) : (
        "is Loading"
      );
    };

    return (
      <div className={classes.root}>
        <NavBar
          level={isRegPalette && level}
          handleSlider={isRegPalette && this.handleSlider}
          handleFormat={this.changeFormat}
          type={type}
        />
        {loadContent()}
        <Footer emoji={emoji} name={paletteName} />
      </div>
    );
  }
}

export default withStyles(styles)(Palette);
