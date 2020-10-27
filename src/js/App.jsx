import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import Palette from "./components/Palette";
import seedColors from "./seedColors";
import genPalette from "./chromaHelpers";
import PaletteList from "./components/PaletteList";
import NewPaletteForm from "./components/NewPaletteForm";
import Page from "./components/Page";

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
    if (!found.length) return null;
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
                    <Page>
                      <PaletteList
                        palettes={state.palettes}
                        {...routeProps}
                        removePalette={removePalette}
                      />
                    </Page>
                  )}
                />
                <Route
                  exact
                  path="/palette/new"
                  render={routeProps => (
                    <Page>
                      <NewPaletteForm
                        {...routeProps}
                        addPalette={addPalette}
                        palettes={state.palettes}
                      />
                    </Page>
                  )}
                />
                <Route
                  exact
                  path="/palette/:id"
                  render={routeProps => (
                    <Page className="page">
                      <Palette
                        // {...grabPalette(routeProps.match.params.id)}
                        {...routeProps}
                        grabPalette={grabPalette}
                      />
                    </Page>
                  )}
                />
                <Route
                  exact
                  path="/palette/:id/:color"
                  render={routeProps => (
                    <Page className="page">
                      <Palette
                        isRegPalette={false}
                        {...routeProps}
                        //{...grabPalette(routeProps.match.params.id)}
                        grabPalette={grabPalette}
                      />
                    </Page>
                  )}
                />
                <Route
                  render={routeProps => (
                    <Page>
                      <PaletteList
                        isRegPalette={true}
                        palettes={state.palettes}
                        {...routeProps}
                        removePalette={removePalette}
                      />
                    </Page>
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
