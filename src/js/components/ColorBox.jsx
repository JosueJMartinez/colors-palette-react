import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import '../../css/ColorBox.css';

export default class ColorBox extends Component {
	state = {
		copied: false
	};

	handleCopyClick = e => {
		console.log(e);
		this.animate();
	};

	animate = () => {
		this.setState({ copied: true }, () => {
			setTimeout(() => {
				this.props.toggleCopyMessage(this.props.color);
				setTimeout(() => {
					this.props.toggleCopyMessage('');
					this.setState({ copied: false });
				}, 900);
			}, 600);
		});
	};

	render() {
		const { color, name } = this.props;
		const { copied } = this.state;
		return (
			<CopyToClipboard text={color} onCopy={this.handleCopyClick}>
				<div
					className="ColorBox"
					style={{ backgroundColor: color }}
					id={color}
				>
					<div
						style={{ backgroundColor: color }}
						className={`copy-overlay ${copied && 'show'}`}
					/>

					<div className="copy-container">
						<div className="content">
							<span className="color-name">{name}</span>{' '}
							<button className="copy-button">Copy</button>
							<span className="more-link">More</span>
						</div>
					</div>
				</div>
			</CopyToClipboard>
		);
	}
}
