import React, { Component } from 'react';

import ColorBox from './ColorBox';

import 'rc-slider/assets/index.css';
import '../../css/Palette.css';
import NavBar from './NavBar';

export default class Palette extends Component {
	state = {
		copyStatus: {
			show: false,
			color: ''
		},
		level: 500
	};

	toggleCopyMessage = color => {
		this.setState(prevProps => ({
			copyStatus: { show: !prevProps.copyStatus.show, color }
		}));
	};

	handleSlider = newLevel => {
		this.setState({ level: newLevel });
	};

	render() {
		const { colors, emoji, id, paletteName } = this.props;
		const { show, color } = this.state.copyStatus;
		const { level } = this.state;
		return (
			<div className="Palette">
				{/* NavBar goes here */}
				<NavBar level={level} handleSlider={this.handleSlider} />

				<div className={`copy-overlay-text ${show && 'show'}`}>
					<h1>Copied</h1>
					<p>{color}</p>
				</div>
				<div className="Palette-colors">
					{/* Mapping colors array into individual colorboxes */}
					{colors[level].map(c => (
						<ColorBox
							key={c.id}
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
