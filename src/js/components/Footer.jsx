import React from 'react';

import '../../css/Footer.css';

export default function Footer(props) {
	const { emoji, name } = props;

	return (
		<footer className="Footer">
			<div>
				<span className="emoji">{emoji}</span> {name}
			</div>
		</footer>
	);
}
