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
				<div className="copy-container">
					<div className="content">
						<span>{name}</span>{' '}
						<button className="copy-button">Copy</button>
						<span className="more-link">More</span>
					</div>
				</div>
			</div>
		);
	}
}
