import React, { Component } from 'react';

export default class Palette extends Component {
	render() {
		const { colors, emoji, id, paletteName } = this.props;
		return (
			<div className="Palette">
				{/* NavBar goes here */}
				<div className="Palette-colors">
					{colors.map(c => (
						<p key={c.color} id={c.color}>
							{c.name}, {c.color}
						</p>
					))}
				</div>
				{/* footer here */}
			</div>
		);
	}
}
