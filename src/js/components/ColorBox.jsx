import React, { Component } from 'react';
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
		'&:hover $copy-button':{
			opacity: 1
		}
	},
	'copy-button':{
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
	'copy-container':{
			width: '100%',
			height: '100%'
	}
	// back: {
	// 	width: '100px',
	// 	height: '30px',
	// 	position: 'absolute',
	// 	display: 'inline-block',
	// 	top: '50%',
	// 	left: '50%',
	// 	marginLeft: '-50px',
	// 	textAlign: 'center',
	// 	outline: 'none',
	// 	border: 'none',
	// 	background: '#000000',
	// 	fontSize: '1rem',
	// 	lineHeight: '30px',
	// 	color: 'white',
	// 	opacity: '1',
	// 	cursor: 'pointer',
	// 	transition: '0.5s',
	// 	textTransform: 'uppercase',
	// 	textDecoration: 'none'
	// }
	
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
			classes
		} = this.props;

		const { copied } = this.state;
		const nameArr = name.split(' ');

		return (
			<CopyToClipboard text={type} onCopy={this.handleCopyClick}>
				<div
					className={`${classes.root} ${isLevelPalette
						? 'ColorBox-height-lvl-palette'
						: ''}`}
					style={{ backgroundColor: type }}
					id={type}
				>
					<div
						style={{ backgroundColor: type }}
						className={`copy-overlay ${copied && 'show'}`}
					/>

					<div className={classes['copy-container']}>
						<div className="content">
							<span className="color-name">
								<div>{nameArr[0]}</div>
								<div>{nameArr[1]}</div>
							</span>{' '}
							<button className={classes['copy-button']}>Copy</button>
							{isLevelPalette ? (
								''
							) : (
								<Link
									to={`/palette/${paletteId}/${id}`}
									className="more-link"
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
}

export default withStyles(styles)(ColorBox);
