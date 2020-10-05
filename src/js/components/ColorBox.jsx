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
		cursor: 'pointer'
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

					<div className="copy-container">
						<div className="content">
							<span className="color-name">
								<div>{nameArr[0]}</div>
								<div>{nameArr[1]}</div>
							</span>{' '}
							<button className="copy-button">Copy</button>
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
