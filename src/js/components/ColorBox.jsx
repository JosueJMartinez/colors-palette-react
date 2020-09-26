import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import '../../css/ColorBox.css';

export default class ColorBox extends Component {
	render() {
		const { color, name } = this.props;
		return (
			<CopyToClipboard text={color}>
				<div
					className="ColorBox"
					style={{ backgroundColor: color }}
					id={color}
				>
					<div className="copy-container">
						<div className="content">
							<div className="color-name">{name}</div>{' '}
							<button className="copy-button">Copy</button>
							<div className="more-link">More</div>
						</div>
					</div>
				</div>
			</CopyToClipboard>
		);
	}
}
