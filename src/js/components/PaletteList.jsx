import React, { Component } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

import MiniPalette from './MiniPalette';

export default class PaletteList extends Component {
	render() {
		const { palettes } = this.props;
		const useStyles = makeStyles(theme => ({
			root: {
				flexGrow: 1
			},
			paper: {
				padding: theme.spacing(2),
				textAlign: 'center',
				color: theme.palette.text.secondary
			}
		}));
		return (
			<Container fixed>
				<Grid container spacing={3}>
					<Grid item xs={12}>
						<h1>List of Palette Colors</h1>
					</Grid>
					{palettes.map(p => <MiniPalette key={p.id} {...p} />)}
				</Grid>
			</Container>
		);
	}
}
