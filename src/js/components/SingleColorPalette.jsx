import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import { withStyles } from '@material-ui/styles';

import NavBar from './NavBar';
import Footer from './Footer';
import ColorBox from './ColorBox';

const styles = {
	root: { height: '100vh' }
};

class SingleColorPalette extends Component {
	state = {
		copyStatus: {
			show: false,
			color: ''
		},

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

	changeFormat = e => {
		const { value, name } = e.target;
		this.setState({ [name]: value, isOpen: true });
	};

	handleClose = (event, reason) => {
		this.setState({ isOpen: false });
	};

	render() {
		const { colors, match, classes, emoji, paletteName, id } = this.props;
		const { params } = match;
		const { type, isOpen } = this.state;
		const { show, color } = this.state.copyStatus;

		const keys = Object.keys(colors);
		const colorLevels = [];

		for (let i = 1; i < keys.length; i++) {
			const c = colors[keys[i]].filter(c => c.id === params.color);
			colorLevels.push(c[0]);
		}

		return (
			<div className={classes.root}>
				<NavBar />
				{/* <div className={`copy-overlay-text ${show && 'show'}`}>
					<h1>Copied</h1>
					<p>{color}</p>
				</div> */}
				<div className="Palette-colors">
					{colorLevels.map(l => (
						<ColorBox
							key={l.name}
							name={l.name}
							type={l[type]}
							id={l.name}
							toggleCopyMessage={this.toggleCopyMessage}
							paletteId={id}
							isLevelPalette={true}
						/>

						// <div style={{ backgroundColor: l.hex }}>{l.name} </div>
					))}
					<div className="ColorBox ColorBox-height-lvl-palette ColorBox-margin-back">
						<div className="copy-container">
							<div className="content">
								<span className="color-name">
									<div> </div>
									<div> </div>
								</span>{' '}
								<Link className="back" to={`/palette/${params.id}`}>
									Back
								</Link>
							</div>
						</div>
					</div>
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
				<Footer emoji={emoji} name={paletteName} />
			</div>
		);
	}
}

export default withStyles(styles)(SingleColorPalette);
