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
			this.props.toggleCopyMessage(this.props.color);
			setTimeout(() => {
				this.setState({ copied: false }, () =>
					this.props.toggleCopyMessage('')
				);
			}, 1500);
		});
	};

	render() {
		const { hex, id, rgb, rbga, name } = this.props;
		const { copied } = this.state;
		return (
			<CopyToClipboard text={hex} onCopy={this.handleCopyClick}>
				<div
					className="ColorBox"
					style={{ backgroundColor: hex }}
					id={hex}
				>
					<div
						style={{ backgroundColor: hex }}
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
