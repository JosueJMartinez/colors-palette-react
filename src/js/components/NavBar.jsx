import React, { Component } from 'react';
import Slider from 'rc-slider';

import 'rc-slider/assets/index.css';
import '../../css/NavBar.css';

export default class NavBar extends Component {
	render() {
		const { level, handleSlider } = this.props;
		return (
			<nav className="NavBar">
				<div className="logo">
					<a href="#">RCP</a>
				</div>
				<div className="slider-wrapper">
					<span>Level: {level}</span>
					<div className="slider">
						<Slider
							defaultValue={level}
							min={100}
							max={900}
							onAfterChange={handleSlider}
							step={100}
						/>
					</div>
				</div>
			</nav>
		);
	}
}
