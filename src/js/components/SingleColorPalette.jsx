import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import NavBar from './NavBar';

const styles = {
	root: { height: '100vh' }
};

class SingleColorPalette extends Component {
	render() {
		const { colors, match, classes } = this.props;
		const { params } = match;
		const keys = Object.keys(colors);
		const colorLevels = [];
		for (let i = 1; i < keys.length; i++) {
			const c = colors[keys[i]].filter(c => c.id === params.color);
			colorLevels.push(c[0]);
		}
		console.log(colorLevels);
		return (
			<div className={classes.root}>
				<NavBar />
				{colorLevels.map(l => (
					<div style={{ backgroundColor: l.hex }}>{l.name} </div>
				))}
			</div>
		);
	}
}

export default withStyles(styles)(SingleColorPalette);
