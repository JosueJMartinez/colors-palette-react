import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/styles';

import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

import MiniPalette from './MiniPalette';

const styles = {
	root: {},
	nav: {
		display: 'flex',
		width: '100%',
		justifyContent: 'space-between',
		padding: '20px 0',
		'& h1': {
			margin: '0px'
		}
	},
	create: {
		color: 'white',
		fontSize: '1rem',
		textDecoration: 'none'
	}
};

class PaletteList extends Component {
	render() {
		const { classes, palettes } = this.props;

		return (
			<Container className={classes.root} fixed maxWidth={'sm'}>
				<nav className={classes.nav}>
					<h1>RCP</h1>
					<Link to="/palette/new" className={classes.create}>
						Create New Palette
					</Link>
				</nav>
				<Grid container spacing={3}>
					{palettes.map(p => <MiniPalette key={p.id} {...p} />)}
				</Grid>
			</Container>
		);
	}
}

export default withStyles(styles)(PaletteList);
