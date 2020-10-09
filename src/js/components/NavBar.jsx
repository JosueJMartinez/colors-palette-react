import React from 'react';
import Slider from 'rc-slider';
// import { withStyles } from '@material-ui/core/styles';
// import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
// import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import 'rc-slider/assets/index.css';
import '../../css/NavBar.css';
import { Link } from 'react-router-dom';

export default function NavBar(props) {
	const { level, handleSlider, type, handleFormat } = props;
	// const classes = this.styles(withStyles);
	return (
		<nav className="NavBar">
			<div className="logo">
				<Link to="/">RCP</Link>
			</div>
			{handleSlider ? (
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
			) : (
				''
			)}
			<div className="select-container">
				{/* <FormControl variant="outlined"> */}
				<Select
					labelId="demo-simple-select-label"
					id="demo-simple-select"
					name="type"
					value={type}
					onChange={handleFormat}
					label="Format"
				>
					<MenuItem value="hex">HEX - #ffffff</MenuItem>
					<MenuItem value="rgb">RGB - RGB(255,255,255)</MenuItem>
					<MenuItem value="rgba">RGBA - RGB(255,255,255, 1.0)</MenuItem>
				</Select>
				{/* </FormControl> */}
			</div>
		</nav>
	);
}

NavBar.defaultProps = {
	type: 'hex'
};
