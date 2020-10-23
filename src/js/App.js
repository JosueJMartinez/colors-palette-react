import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";

import Palette from "./components/Palette";

import seedColors from "./seedColors";
import genPalette from "./chromaHelpers";

import PaletteList from "./components/PaletteList";
import NewPaletteForm from "./components/NewPaletteForm";

function App() {
  const memPalettes = JSON.parse(localStorage.getItem("RCP_PaletteList"));
  const [state, setState] = useState({
    palettes: memPalettes ? memPalettes : seedColors,
  });

  const { palettes } = state;

  useEffect(() => {
    localStorage.setItem("RCP_PaletteList", JSON.stringify(palettes));
  }, [palettes]);

  const addPalette = newPalette => {
    setState(prevState => ({
      palettes: [...prevState.palettes, newPalette],
    }));
  };

  const removePalette = removedId => {
    const newPalettes = palettes.filter(p => p.id !== removedId);
    setState({ palettes: newPalettes });
  };

  const grabPalette = id => {
    const found = palettes.filter(p => id === p.id);
    return genPalette(found[0]);
  };

  return (
    <div className="App">
      <Switch>
        <Route
          exact
          path="/"
          render={routeProps => (
            <PaletteList
              palettes={state.palettes}
              {...routeProps}
              removePalette={removePalette}
            />
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
