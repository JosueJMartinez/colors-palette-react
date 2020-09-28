import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MiniPalette from './MiniPalette';

export default class PaletteList extends Component {
	render() {
		const { palettes } = this.props;
		return (
			<div>
				<h1>List of Palette Colors</h1>
				<MiniPalette />
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
