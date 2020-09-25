import React from 'react';
import '../css/App.css';
import Palette from './components/Palette';
import seedColors from './seedColors';

function App() {
	console.log(seedColors);
	return (
		<div className="App">
			<Palette {...seedColors[8]} />
		</div>
	);
}

export default App;
