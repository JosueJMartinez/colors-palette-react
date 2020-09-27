import React from 'react';
import '../css/App.css';
import Palette from './components/Palette';
import seedColors from './seedColors';
import genPalette from './chromaHelpers';

function App() {
	return (
		<div className="App">
			<Palette {...genPalette(seedColors[4])} />
		</div>
	);
}

export default App;
