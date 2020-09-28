import React from 'react';
import { withStyles } from '@material-ui/styles';

const styles = {
	root: {
		backgroundColor: 'purple',
		border: '3px solid teal'
	}
};

function MiniPalette(props) {
	const { classes } = props;
	return <div className={classes.root}>MiniPalette</div>;
}

export default withStyles(styles)(MiniPalette);
