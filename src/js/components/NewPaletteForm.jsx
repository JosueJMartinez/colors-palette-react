import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";

const styles = { root: {} };

class NewPaletteForm extends Component {
  render() {
    return (
      <div>
        <h1>PaletteForm component</h1>
      </div>
    );
  }
}

export default withStyles(styles)(NewPaletteForm);
