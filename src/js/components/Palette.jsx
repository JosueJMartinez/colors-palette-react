import React, { Component, Fragment } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import NavBar from './NavBar';
import ColorBox from './ColorBox';
import Footer from './Footer';

import 'rc-slider/assets/index.css';
import '../../css/Palette.css';

export default class Palette extends Component {
	state = {
		copyStatus: {
			show: false,
			color: ''
		},
		level: 500,
		type: 'hex',
		isOpen: false
	};

	toggleCopyMessage = color => {
		this.setState(prevProps => ({
			copyStatus: {
				show: !prevProps.copyStatus.show,
				color
			}
		}));
	};

	handleSlider = newLevel => {
		this.setState({ level: newLevel });
	};

	changeFormat = e => {
		const { value, name } = e.target;
		this.setState({ [name]: value, isOpen: true });
	};

	handleClose = (event, reason) => {
		this.setState({ isOpen: false });
	};

	render() {
		const { colors, emoji, id, paletteName } = this.props;
		const { show, color } = this.state.copyStatus;
		const { level, type, isOpen } = this.state;

		return (
			<div className="Palette">
				{/* NavBar goes here */}
				<NavBar
					level={level}
					handleSlider={this.handleSlider}
					handleFormat={this.changeFormat}
					type={type}
				/>

				<div className={`copy-overlay-text ${show && 'show'}`}>
					<h1>Copied</h1>
					<p>{color}</p>
				</div>
				<div className="Palette-colors">
					{/* Mapping colors array into individual colorboxes */}
					{colors[level].map(c => (
						<ColorBox
							key={c.id}
							name={c.name}
							type={c[type]}
							id={c.id}
							toggleCopyMessage={this.toggleCopyMessage}
						/>
					))}
				</div>
				<Snackbar
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'left'
					}}
					open={isOpen}
					autoHideDuration={1500}
					onClose={this.handleClose}
					message={
						<span id="message-id">Format is {type.toUpperCase()}</span>
					}
					ContentProps={{ 'aria-describedby': 'message-id' }}
					action={
						<React.Fragment>
							<IconButton
								size="small"
								aria-label="close"
								color="inherit"
								onClick={this.handleClose}
								onClose={this.handleClose}
							>
								<CloseIcon fontSize="small" />
							</IconButton>
						</React.Fragment>
					}
				/>
				{/* footer here */}
				<Footer emoji={emoji} name={paletteName} />
			</div>
		);
	}
}
