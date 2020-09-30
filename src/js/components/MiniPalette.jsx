import React from 'react';
import { withStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import { lineHeight } from '@material-ui/system';

const styles = {
	root: {},
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
		height: '200px',
		borderRadius: '5px',
		backgroundColor: 'grey'
	},
	color: {
		height: '40px'
	},
	title: {
		display: 'flex',
		justifyContent: 'space-between',
		margin: '1rem 0'
		// color: '#2c1515'
	},
	link: {
		textDecoration: 'none',
		fontSize: '1.5rem'
	},
	emoji: {
		fontSize: '1.75rem',
		lineHeight: '22px',
		textShadow: '1px 2px black'
	}
};

function MiniPalette(props) {
	const { classes, id, paletteName, emoji, colors } = props;
	return (
		<Grid className={classes.root} id={id} item xs={12} sm={6} md={4}>
			<Card className={classes.card}>
				<Link className={classes.link} to={`/palette/${id}`}>
					<div className={classes.colors}>
						<Grid container>
							{colors.map((c, idx) => (
								<Grid
									className={classes.color}
									item
									xs={3}
									style={{ backgroundColor: c.color }}
									key={idx}
								/>
							))}
						</Grid>
					</div>
					<h5 className={classes.title}>
						<span>{paletteName}</span>{' '}
						<span className={classes.emoji}>{emoji}</span>
					</h5>
				</Link>
			</Card>
		</Grid>
	);
}

export default withStyles(styles)(MiniPalette);
