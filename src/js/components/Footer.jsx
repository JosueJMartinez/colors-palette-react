import React, { Component } from 'react';

import '../../css/Footer.css';

export default class Footer extends Component {
	render() {
		const { emoji, name } = this.props;
		return (
			<footer className="Footer">
				<div>
					{emoji} {name}
				</div>
			</footer>
		);
	}
}
