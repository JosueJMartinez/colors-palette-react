import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Home extends Component {
	render() {
		const { palettes } = this.props;
		return (
			<div>
				<h1>List of Palette Colors</h1>
				<ul>
					{palettes.map(p => (
						<li key={p.id} id={p.id}>
							<Link to={`/palette/${p.id}`}>{p.paletteName}</Link>
						</li>
					))}
				</ul>
			</div>
		);
	}
}
