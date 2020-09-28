import React, { Component } from 'react';

import '../../css/Footer.css';

export default class Footer extends Component {
	render() {
		const { emoji, name } = this.props;
		return (
			<footer className="Footer">
				<div>
					<span className="emoji">{emoji}</span> {name}
				</div>
			</footer>
		);
	}
}
