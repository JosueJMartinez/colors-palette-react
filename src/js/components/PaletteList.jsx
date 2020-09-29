import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import MiniPalette from './MiniPalette';

export default class PaletteList extends Component {
	render() {
		const { palettes } = this.props;
		const useStyles = makeStyles((theme) => ({
		  root: {
			flexGrow: 1,
		  },
		  paper: {
			padding: theme.spacing(2),
			textAlign: 'center',
			color: theme.palette.text.secondary,
		  },
		}));
		return (
			
			
			<Grid container spacing={1}>
				<Grid item xs={12}><h1>List of Palette Colors</h1></Grid>
				<Grid item xs={12}><MiniPalette /></Grid>	
				
				{palettes.map(p => (
				<Grid key={p.id} id={p.id} item xs={12} sm={6} md={4} lg={3}>
					<Link to={`/palette/${p.id}`}>{p.paletteName}</Link>
				</Grid>
				))}
				
			</Grid>
		);
	}
}
