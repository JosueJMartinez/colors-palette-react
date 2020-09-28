import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Palette from './components/Palette';

import seedColors from './seedColors';
import genPalette from './chromaHelpers';

import '../css/App.css';
import PaletteList from './components/PaletteList';

function App() {
	const grabPalette = id => {
		const found = seedColors.filter(p => id === p.id);
		return genPalette(found[0]);
	};

	return (
		<div className="App">
			<Switch>
				<Route
					exact
					path="/"
					render={() => <PaletteList palettes={seedColors} />}
				/>
				<Route
					exact
					path="/palette/:id"
					render={routeProps => (
						<Palette {...grabPalette(routeProps.match.params.id)} />
					)}
				/>
				<Route render={() => <h1>404 page</h1>} />
			</Switch>
		</div>
	);
}

export default App;
