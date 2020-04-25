import React from "react";
import { Route, Switch } from "react-router-dom";
import Palette from "./Palette";
import seedColors from "./seedColors";
import { generatePalette } from "./colorHelpers";
import PaletteList from "./PaletteList";

function App() {
  const findPalette = (id) => {
    return seedColors.find((palette) => {
      return palette.id === id;
    });
  };
  return (
    <div>
      <Switch>
        <Route exact path="/" render={() => <PaletteList palettes={seedColors}/>} />
        <Route
          exact
          path="/palette/:id"
          render={(routeProps) => (
            <Palette
              palette={generatePalette(findPalette(routeProps.match.params.id))}
            />
          )}
        />
      </Switch>
      {/* <div>
      <Palette palette={generatePalette(seedColors[4])} />
    </div> */}
    </div>
  );
}

export default App;
