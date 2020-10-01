<Card className={classes.card}>
	<Link className={classes.link} to={`/palette/${id}`}>
		{/* <div className={classes.colors}> */}
		<Grid className={classes.colors} container>
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
		{/* </div> */}
		<h5 className={classes.title}>
			<span>{paletteName}</span>{' '}
			<span className={classes.emoji}>{emoji}</span>
		</h5>
	</Link>
</Card>;
