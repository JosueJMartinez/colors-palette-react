import React, { Component } from 'react';
import ColorBox from './ColorBox';
import '../../css/Palette.css';

export default class Palette extends Component {
	render() {
		const { colors, emoji, id, paletteName } = this.props;
		return (
			<div className="Palette">
				{/* NavBar goes here */}
				<div className="Palette-colors">
					{/* Mapping colors array into individual colorboxes */}
					{colors.map(c => <ColorBox key={c.color} {...c} />)}
				</div>
				{/* footer here */}
			</div>
		);
	}
}
