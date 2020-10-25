import React from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";

import Slider from "rc-slider";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

import "rc-slider/assets/index.css";
import styles from "../../../styles/NavBarStyles";

function NavBar(props) {
  const { level, handleSlider, type, handleFormat, classes } = props;

  return (
    <>
      <nav className={classes.root}>
        <div className={classes.logo}>
          <Link to="/">RCP</Link>
        </div>
        {handleSlider ? (
          <div className={classes.sliderContainer}>
            <span className={classes.levelDisplay}>Level: {level}</span>
            <div className={classes.slider}>
              <Slider
                defaultValue={level}
                min={100}
                max={900}
                onAfterChange={handleSlider}
                step={100}
              />
            </div>
          </div>
        ) : (
          ""
        )}
        <div className={classes.selectContainer}>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name="type"
            value={type}
            onChange={handleFormat}
            label="Format"
          >
            <MenuItem value="hex">HEX - #ffffff</MenuItem>
            <MenuItem value="rgb">RGB - RGB(255,255,255)</MenuItem>
            <MenuItem value="rgba">RGBA - RGB(255,255,255, 1.0)</MenuItem>
          </Select>
        </div>
      </nav>
    </>
  );
}

NavBar.defaultProps = {
  type: "hex",
};

export default withStyles(styles)(NavBar);
