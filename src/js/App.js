import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import Palette from "./components/Palette";
import seedColors from "./seedColors";
import genPalette from "./chromaHelpers";
import PaletteList from "./components/PaletteList";
import NewPaletteForm from "./components/NewPaletteForm";
import "../css/App.css";

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
      <Route
        render={({ location }) => (
          <TransitionGroup className="transition-group">
            <CSSTransition
              key={location.key}
              classNames="transition"
              timeout={500}
            >
              <Switch location={location}>
                <Route
                  exact
                  path="/"
                  render={routeProps => (
                    <div className="page">
                      <PaletteList
                        palettes={state.palettes}
                        {...routeProps}
                        removePalette={removePalette}
                      />
                    </div>
                  )}
                />
                <Route
                  exact
                  path="/palette/new"
                  render={routeProps => (
                    <div className="page">
                      <NewPaletteForm
                        {...routeProps}
                        addPalette={addPalette}
                        palettes={state.palettes}
                      />
                    </div>
                  )}
                />
                <Route
                  exact
                  path="/palette/:id"
                  render={routeProps => (
                    <div className="page">
                      <Palette
                        {...grabPalette(routeProps.match.params.id)}
                        {...routeProps}
                      />
                    </div>
                  )}
                />
                <Route
                  exact
                  path="/palette/:id/:color"
                  render={routeProps => (
                    <div className="page">
                      <Palette
                        isRegPalette={false}
                        {...routeProps}
                        {...grabPalette(routeProps.match.params.id)}
                      />
                    </div>
                  )}
                />
                <Route
                  render={() => (
                    <div className="page">
                      {" "}
                      <h1>404 page</h1>
                    </div>
                  )}
                />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        )}
      ></Route>
    </div>
  );
}

export default App;
