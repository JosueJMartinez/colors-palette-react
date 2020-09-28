import React from 'react';

import Palette from './components/Palette';

import seedColors from './seedColors';
import genPalette from './chromaHelpers';

import '../css/App.css';

function App() {
	return (
		<div className="App">
			<Palette {...genPalette(seedColors[0])} />
		</div>
	);
}

export default App;
