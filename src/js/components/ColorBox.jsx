import React, { Component } from 'react';
import '../../css/ColorBox.css';

export default class ColorBox extends Component {
	render() {
		const { color, name } = this.props;
		return (
			<div
				className="ColorBox"
				style={{ backgroundColor: color }}
				id={color}
			>
				<span>More</span>
				{color}, {name}
			</div>
		);
	}
}
