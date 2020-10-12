import React, { Component } from "react";
import { Link } from "react-router-dom";

import { withStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import styles from "../../styles/PaletteListStyles";

import MiniPalette from "./MiniPalette";

class PaletteList extends Component {
  render() {
    const { classes, palettes } = this.props;

    return (
      <Container className={classes.root} fixed maxWidth={"sm"}>
        <nav className={classes.nav}>
          <h1>RCP</h1>
          <Link to="/palette/new" className={classes.create}>
            Create New Palette
          </Link>
        </nav>
        <Grid container spacing={3}>
          {palettes.map(p => (
            <MiniPalette key={p.id} {...p} />
          ))}
        </Grid>
      </Container>
    );
  }
}

export default withStyles(styles)(PaletteList);
