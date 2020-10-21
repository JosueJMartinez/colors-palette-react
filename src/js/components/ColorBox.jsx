import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { withStyles } from "@material-ui/styles";
import styles from "../../styles/ColorBoxStyles";

class ColorBox extends Component {
  state = {
    copied: false,
  };

  handleCopyClick = () => {
    this.animate();
  };

  animate = () => {
    this.setState({ copied: true }, () => {
      this.props.toggleCopyMessage(this.props.type);
      setTimeout(() => {
        this.props.toggleCopyMessage("white");
        this.setState({ copied: false });
      }, 1500);
    });
  };

  render() {
    const {
      type,
      id,
      name,
      paletteId,
      isRegPalette,
      classes,
      isBackBox,
    } = this.props;

    const { copied } = this.state;
    const nameArr = !name ? "" : name.split(" ");

    const decideButtonType = () => {
      if (!isBackBox) {
        return (
          <CopyToClipboard text={type} onCopy={this.handleCopyClick}>
            <div
              className={classes.root}
              style={{ backgroundColor: type }}
              id={type}
            >
              <div
                style={{ backgroundColor: type }}
                className={`${classes["copy-overlay"]} ${
                  copied && classes["show"]
                }`}
              />

              <div className={classes["copy-container"]}>
                <div className={classes.content}>
                  <span
                    className={`${classes["color-name"]} ${classes["text-color"]}`}
                  >
                    <div>{nameArr[0]}</div>
                    <div>{nameArr[1]}</div>
                  </span>{" "}
                  <button
                    className={`${classes["copy-button"]} ${classes["dark-background"]}`}
                  >
                    Copy
                  </button>
                  {isRegPalette ? (
                    ""
                  ) : (
                    <Link
                      to={`/palette/${paletteId}/${id}`}
                      className={`${classes["more-link"]} ${classes["dark-background"]}`}
                      onClick={e => e.stopPropagation()}
                    >
                      More
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </CopyToClipboard>
        );
      }
      return (
        <div
          className={`${classes.root} ${classes["height-lvl-palette"]} ${classes["margin-back"]} ${classes["default-pointer"]}`}
        >
          <div className={classes["copy-container"]}>
            <div className={classes["content"]}>
              <Link
                className={classes["back"]}
                to={`/palette/${paletteId}`}
              >
                Back
              </Link>
            </div>
          </div>
        </div>
      );
    };

    return <Fragment>{decideButtonType()}</Fragment>;
  }
}

export default withStyles(styles)(ColorBox);
