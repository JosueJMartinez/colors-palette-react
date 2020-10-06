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
	static defaultProps = {
		isRegPalette: true
	};
	state = {
		copyStatus: {
			show: false,
			color: ''
		},
		level: 500,
		type: 'hex',
		isOpen: false
	};

	componentDidMount() {
		document.body.classList.add('overflow');
	}

	componentWillUnmount() {
		document.body.classList.remove('overflow');
	}

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

	handleClose = () => {
		this.setState({ isOpen: false });
	};

	render() {
		const {
			colors,
			emoji,
			id,
			paletteName,
			isRegPalette,
			match
		} = this.props;
		const { level, type, isOpen, copyStatus } = this.state;
		const { show, color } = copyStatus;
		const { params } = match;

		const decidePalette = () => {
			if (isRegPalette) {
				return mapPaletteBoxes(colors[level], false);
			}

			const keys = Object.keys(colors);
			const colorLevels = [];
			for (let i = 1; i < keys.length; i++) {
				const c = colors[keys[i]].filter(c => c.id === params.color);
				colorLevels.push(c[0]);
			}
			return mapPaletteBoxes(colorLevels, true);
		};

		const mapPaletteBoxes = (palette, isLevel) => {
			return palette.map(c => (
				<ColorBox
					key={c.name}
					name={c.name}
					type={c[type]}
					id={c.id}
					toggleCopyMessage={this.toggleCopyMessage}
					paletteId={id}
					isLevelPalette={isLevel}
					isBackBox={false}
				/>
			));
		};

		const addBackButton = () => {
			if (!isRegPalette) {
				return <ColorBox isBackBox={true} paletteId={id} />;
			}
		};

		return (
			<div className="Palette">
				{/* NavBar goes here */}
				<NavBar
					level={level}
					handleSlider={isRegPalette && this.handleSlider}
					handleFormat={this.changeFormat}
					type={type}
				/>

				<div className={`copy-overlay-text ${show && 'show'}`}>
					<h1>Copied</h1>
					<p>{color}</p>
				</div>
				<div className="Palette-colors">
					{/* Mapping colors array into individual colorboxes */}
					{decidePalette()}
					{addBackButton()}
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
						<Fragment>
							<IconButton
								size="small"
								aria-label="close"
								color="inherit"
								onClick={this.handleClose}
								onClose={this.handleClose}
							>
								<CloseIcon fontSize="small" />
							</IconButton>
						</Fragment>
					}
				/>
				{/* footer here */}
				<Footer emoji={emoji} name={paletteName} />
			</div>
		);
	}
}
