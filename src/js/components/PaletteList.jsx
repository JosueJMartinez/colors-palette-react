import React, { Component } from "react";
import { Link } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { withStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

import MiniPalette from "./PaletteListComponents/MiniPalette";
import DeleteDialog from "./PaletteListComponents/DeleteDialog";
import styles from "../../styles/PaletteListStyles";

class PaletteList extends Component {
  state = {
    isDeleteDialogOpen: false,
    potentialDeleteID: "",
  };

  openDelete = id => {
    this.setState({ isDeleteDialogOpen: true, potentialDeleteID: id });
  };

  closeDelete = () => {
    this.setState({ isDeleteDialogOpen: false, potentialDeleteID: "" });
  };
  render() {
    const { classes, palettes, removePalette } = this.props;
    const { isDeleteDialogOpen, potentialDeleteID } = this.state;

    return (
      <Container className={classes.root} fixed maxWidth={"md"}>
        <nav className={classes.nav}>
          <h1>RCP</h1>
          <Link to="/palette/new" className={classes.create}>
            Create New Palette
          </Link>
        </nav>

        <Grid container justify="center">
          <TransitionGroup component={null}>
            {palettes.map(p => (
              <CSSTransition
                key={p.id}
                timeout={500}
                classNames="transition"
              >
                <MiniPalette openDelete={this.openDelete} {...p} />
              </CSSTransition>
            ))}
          </TransitionGroup>
        </Grid>

        <DeleteDialog
          closeDelete={this.closeDelete}
          isDeleteDialogOpen={isDeleteDialogOpen}
          potentialDeleteID={potentialDeleteID}
          removePalette={removePalette}
        />
      </Container>
    );
  }
}

export default withStyles(styles)(PaletteList);
