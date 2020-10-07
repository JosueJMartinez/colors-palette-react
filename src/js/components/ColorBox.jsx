import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { withStyles } from '@material-ui/styles';

import '../../css/ColorBox.css';

const styles = {
	root: {
		width: '20%',
		height: '25%',
		margin: '0 auto',
		display: 'inline-block',
		position: 'relative',
		cursor: 'pointer',
		'&:hover $copy-button': {
			opacity: 1
		}
	},
	'copy-button': {
		width: '100px',
		height: '30px',
		position: 'absolute',
		display: 'inline-block',
		top: '50%',
		left: '50%',
		marginLeft: '-50px',
		marginTop: '-15px',
		textAlign: 'center',
		outline: 'none',
		border: 'none',
		background: '#ffffff34',
		fontSize: '1rem',
		lineHeight: '20px',
		color: 'white',
		opacity: '0',
		cursor: 'pointer',
		transition: '0.5s',
		textTransform: 'uppercase'
	},
	'copy-container': {
		width: '100%',
		height: '100%'
	},
	'height-lvl-palette': {
		height: '50%'
	},
	'copy-overlay': {
		opacity: '0',
		zIndex: '0',
		width: '100%',
		height: '100%',
		position: 'absolute',
		transition: 'transform 0.6s ease-in-out',
		transform: 'scale(0.1)'
	},
	show: {
		opacity: '1',
		transform: 'scale(10)',
		zIndex: '10'
	},
	content: {
		margin: '0 auto',
		width: '100%',
		height: '100%',
		display: 'flex',
		alignItems: 'flex-end',
		justifyContent: 'space-between'
	},
	'more-link': {
		background: '#ffffff34',
		padding: '0 5px',
		color: 'white',
		width: '60px',
		height: '30px',
		textAlign: 'center',
		lineHeight: '30px',
		textDecoration: 'none'
	},
	'color-name': {
		paddingLeft: '5px',
		padding: '10px',
		fontSize: '12px',
		letterSpacing: '1px'
	},
	'margin-back': {
		marginTop: '-30px'
	},
	back: {
		width: '100px',
		height: '30px',
		position: 'absolute',
		display: 'inline-block',
		top: '50%',
		left: '50%',
		marginLeft: '-50px',
		textAlign: 'center',
		outline: 'none',
		border: 'none',
		background: '#000000',
		fontSize: '1rem',
		lineHeight: '30px',
		color: 'white',
		opacity: '1',
		cursor: 'pointer',
		transition: '0.5s',
		textTransform: 'uppercase',
		textDecoration: 'none',
		'&:hover': {
			backgroundColor: 'grey'
		}
	},
	'default-pointer': {
		cursor: 'default !important'
	}
};

class ColorBox extends Component {
	state = {
		copied: false
	};

	handleCopyClick = e => {
		this.animate();
	};

	animate = () => {
		this.setState({ copied: true }, () => {
			this.props.toggleCopyMessage(this.props.type);
			setTimeout(() => {
				this.props.toggleCopyMessage('');
				this.setState({ copied: false });
			}, 1500);
		});
	};

	render() {
		const {
			type,
			id,
			name,
			paletteId,
			isLevelPalette,
			classes,
			isBackBox
		} = this.props;

		const { copied } = this.state;
		const nameArr = !name ? '' : name.split(' ');

		const decideButtonType = () => {
			if (!isBackBox) {
				return (
					<CopyToClipboard text={type} onCopy={this.handleCopyClick}>
						<div
							className={`${classes.root} ${isLevelPalette
								? classes['height-lvl-palette']
								: ''}`}
							style={{ backgroundColor: type }}
							id={type}
						>
							<div
								style={{ backgroundColor: type }}
								className={`${classes['copy-overlay']} ${copied &&
									classes['show']}`}
							/>

							<div className={classes['copy-container']}>
								<div className={classes.content}>
									<span className={classes['color-name']}>
										<div>{nameArr[0]}</div>
										<div>{nameArr[1]}</div>
									</span>{' '}
									<button className={classes['copy-button']}>Copy</button>
									{isLevelPalette ? (
										''
									) : (
										<Link
											to={`/palette/${paletteId}/${id}`}
											className={classes['more-link']}
											onClick={e => e.stopPropagation()}
										>
											More
										</Link>
									)}
								</div>
							</div>
						</div>
					</CopyToClipboard>
				);
			}
			return (
				<div
					className={`${classes.root} ${classes[
						'height-lvl-palette'
					]} ${classes['margin-back']} ${classes['default-pointer']}`}
				>
					<div className={classes['copy-container']}>
						<div className={classes['content']}>
							<Link
								className={classes['back']}
								to={`/palette/${paletteId}`}
							>
								Back
							</Link>
						</div>
					</div>
				</div>
			);
		};

		return <Fragment>{decideButtonType()}</Fragment>;
	}
}

export default withStyles(styles)(ColorBox);
