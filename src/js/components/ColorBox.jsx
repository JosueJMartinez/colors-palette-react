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
			this.props.toggleCopyMessage(this.props.type);
			setTimeout(() => {
				this.props.toggleCopyMessage('');
				this.setState({ copied: false });
			}, 1500);
		});
	};

	render() {
		const { type, id, name } = this.props;
		const { copied } = this.state;
		const nameArr = name.split(' ');
		return (
			<CopyToClipboard text={type} onCopy={this.handleCopyClick}>
				<div
					className="ColorBox"
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
							<span className="more-link">More</span>
						</div>
					</div>
				</div>
			</CopyToClipboard>
		);
	}
}
