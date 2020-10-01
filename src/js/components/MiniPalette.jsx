import React from 'react';
import { withStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import { lineHeight } from '@material-ui/system';

const styles = {
	root: {
		padding: '6px !important'
	},
	card: {
		backgroundColor: 'white',
		borderRadius: '5px',
		padding: '0.5rem',
		'&:hover': {
			cursor: 'pointer'
		}
		// height: '150px',
	},
	colors: {
		display: 'flex',
		flexWrap: 'wrap',
		height: '150px',
		borderRadius: '5px !important',
		backgroundColor: 'grey',
		overflow: 'hidden'
	},
	color: {
		height: '25%',
		width: '20%'
	},
	'div.color :first-child': {
		color: 'red'
	},
	title: {
		display: 'flex',
		justifyContent: 'space-between',
		margin: '0',
		paddingTop: '0.5rem'
		// color: '#2c1515'
	},
	link: {
		textDecoration: 'none',
		fontSize: '.75rem'
	},
	emoji: {
		fontSize: '1rem',
		lineHeight: '15px',
		textShadow: '1px 2px black'
	}
};

function MiniPalette(props) {
	const { classes, id, paletteName, emoji, colors } = props;
	return (
		<Grid className={classes.root} id={id} item xs={12} sm={4}>
			<Link className={classes.link} to={`/palette/${id}`}>
				<div className={classes.card}>
					<div className={classes.colors}>
						{colors.map((c, idx) => (
							<div
								className={classes.color}
								item
								xs={3}
								style={{ backgroundColor: c.color }}
								key={idx}
							/>
						))}
					</div>
					<h5 className={classes.title}>
						{paletteName} <span className="emoji">{emoji}</span>
					</h5>
				</div>
			</Link>
		</Grid>
	);
}

export default withStyles(styles)(MiniPalette);
