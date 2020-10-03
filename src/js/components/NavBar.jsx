import React, { Component } from 'react';
import Slider from 'rc-slider';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import 'rc-slider/assets/index.css';
import '../../css/NavBar.css';
import { Link } from 'react-router-dom';

// const styles = theme => ({
// 	formControl: {
// 		margin: theme.spacing(1),
// 		minWidth: 120
// 	},
// 	selectEmpty: {
// 		marginTop: theme.spacing(2)
// 	}
// });

export default class NavBar extends Component {
	static defaultProps = {
		type: 'hex'
	};

	render() {
		const { level, handleSlider, type, handleFormat } = this.props;

		// const classes = this.styles(withStyles);
		return (
			<nav className="NavBar">
				<div className="logo">
					<Link to="/">RCP</Link>
				</div>
				{this.props.handleSlider ? (
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
}
