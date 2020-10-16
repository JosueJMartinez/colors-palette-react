import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";

import Palette from "./components/Palette";

import seedColors from "./seedColors";
import genPalette from "./chromaHelpers";

import PaletteList from "./components/PaletteList";
import NewPaletteForm from "./components/NewPaletteForm";

function App() {
  const [state, setState] = useState({ palettes: seedColors });

  const grabPalette = id => {
    const found = state.palettes.filter(p => id === p.id);
    return genPalette(found[0]);
  };

  const addPalette = newPalette => {
    setState(prevState => ({
      palettes: [...prevState.palettes, newPalette],
    }));
  };

  return (
    <div className="App">
      <Switch>
        <Route
          exact
          path="/"
          render={routeProps => (
            <PaletteList palettes={state.palettes} {...routeProps} />
          )}
        />
        <Route
          exact
          path="/palette/new"
          render={routeProps => (
            <NewPaletteForm
              {...routeProps}
              addPalette={addPalette}
              palettes={state.palettes}
            />
          )}
        />
        <Route
          exact
          path="/palette/:id"
          render={routeProps => (
            <Palette
              {...grabPalette(routeProps.match.params.id)}
              {...routeProps}
            />
          )}
        />
        <Route
          exact
          path="/palette/:id/:color"
          render={routeProps => (
            <Palette
              isRegPalette={false}
              {...routeProps}
              {...grabPalette(routeProps.match.params.id)}
            />
          )}
        />
        <Route render={() => <h1>404 page</h1>} />
      </Switch>
    </div>
  );
}

export default App;
