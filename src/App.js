import React from "react";
import { Route, Switch } from "react-router-dom";
import Palette from "./components/Palette";
import seedColors from "./components/seedColors";
import { generatePalette } from "./components/colorHelpers";
import PaletteList from "./components/PaletteList";
import SingleColorPalette from "./components/SingleColorPalette";

function App() {
  const findPalette = (id) => {
    return seedColors.find((palette) => {
      return palette.id === id;
    });
  };
  return (
    <div>
      <Switch>
        <Route exact path="/" render={(routeProps) => <PaletteList palettes={seedColors} {...routeProps}/>} />
        <Route
          exact
          path="/palette/:id"
          render={(routeProps) => (
            <Palette
              palette={generatePalette(findPalette(routeProps.match.params.id))}
            />
          )}
        />
        <Route exact path='/palette/:paletteId/:colorId' render={(routeProps) => (
            <SingleColorPalette
            colorId={routeProps.match.params.colorId}
              palette={generatePalette(findPalette(routeProps.match.params.paletteId))}
            />
          )} />
      </Switch>
      {/* <div>
      <Palette palette={generatePalette(seedColors[4])} />
    </div> */}
    </div>
  );
}

export default App;
