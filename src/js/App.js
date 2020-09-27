import React from 'react';
import '../css/App.css';
import Palette from './components/Palette';
import seedColors from './seedColors';
import genPalette from './chromaHelpers';

function App() {
	console.log(genPalette(seedColors[0]));
	return (
		<div className="App">
			<Palette {...seedColors[0]} />
		</div>
	);
}

export default App;
