import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Palette from "./components/Palette";
import PaletteList from "./components/PaletteList";
import SingleColorPalette from "./components/SingleColorPalette";
import Page from "./components/Page";
import NewPaletteForm from "./components/NewPaletteForm";
import seedColors from "./components/seedColors";
import { generatePalette } from "./components/colorHelpers";

const savedPalettes = JSON.parse(window.localStorage.getItem("palettes"));

class App extends React.Component {
  state = { palettes: savedPalettes || seedColors };

  findPalette = (id) => {
    return this.state.palettes.find((palette) => {
      return palette.id === id;
    });
  };
  savePalette = (newPalette) => {
    this.setState(
      { palettes: [...this.state.palettes, newPalette] },
      this.syncLocalStorage
    );
  };
  deletePalette = (id) => {
    this.setState(
      (st) => ({
        palettes: st.palettes.filter((palette) => palette.id !== id),
      }),
      this.syncLocalStorage
    );
  };
  syncLocalStorage = () => {
    window.localStorage.setItem(
      "palettes",
      JSON.stringify(this.state.palettes)
    );
  };

  render() {
    return (
      <div>
        <Route
          render={({ location }) => (
            <TransitionGroup>
              <CSSTransition classNames="page" timeout={500} key={location.key}>
                <Switch location={location}>
                  <Route
                    exact
                    path="/palette/new"
                    render={(routeProps) => (
                      <Page>
                        <NewPaletteForm
                          savePalette={this.savePalette}
                          palettes={this.state.palettes}
                          {...routeProps}
                        />
                      </Page>
                    )}
                  />
                  <Route
                    exact
                    path="/"
                    render={(routeProps) => (
                      <Page>
                        <PaletteList
                          palettes={this.state.palettes}
                          deletePalette={this.deletePalette}
                          {...routeProps}
                        />
                      </Page>
                    )}
                  />
                  <Route
                    exact
                    path="/palette/:id"
                    render={(routeProps) => (
                      <Page>
                        <Palette
                          palette={generatePalette(
                            this.findPalette(routeProps.match.params.id)
                          )}
                        />
                      </Page>
                    )}
                  />
                  <Route
                    exact
                    path="/palette/:paletteId/:colorId"
                    render={(routeProps) => (
                      <Page>
                        <SingleColorPalette
                          colorId={routeProps.match.params.colorId}
                          palette={generatePalette(
                            this.findPalette(routeProps.match.params.paletteId)
                          )}
                        />
                      </Page>
                    )}
                  />
                </Switch>
              </CSSTransition>
            </TransitionGroup>
          )}
        />

        {/* <div>
      <Palette palette={generatePalette(seedColors[4])} />
    </div> */}
      </div>
    );
  }
}

export default App;
