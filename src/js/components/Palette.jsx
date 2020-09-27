import React, { Component } from 'react';
import ColorBox from './ColorBox';
import '../../css/Palette.css';

export default class Palette extends Component {
	state = {
		copyStatus: {
			show: false,
			color: ''
		}
	};

	toggleCopyMessage = color => {
		this.setState(prevProps => ({
			copyStatus: { show: !prevProps.copyStatus.show, color }
		}));
	};

	render() {
		const { colors, emoji, id, paletteName } = this.props;
		const { show, color } = this.state.copyStatus;
		return (
			<div className="Palette">
				{/* NavBar goes here */}
				<div className={`copy-overlay-text ${show && 'show'}`}>
					<h1>Copied</h1>
					<p>{color}</p>
				</div>
				<div className="Palette-colors">
					{/* Mapping colors array into individual colorboxes */}
					{colors.map(c => (
						<ColorBox
							key={c.color}
							{...c}
							toggleCopyMessage={this.toggleCopyMessage}
						/>
					))}
				</div>
				{/* footer here */}
			</div>
		);
	}
}
