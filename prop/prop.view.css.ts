namespace $.$$ {

	const { px } = $mol_style_unit
	
	$mol_style_define( $hyoo_studio_prop, {

		border: {
			radius: $mol_gap.round,
		},

		background: {
			color: $mol_theme.card,
		},
		
		Head: {
			background: {
				color: $mol_theme.card,
			},
			border: {
				radiues: $mol_gap.round,
			},
			justifyContent: 'space-between',
		},

		Self: {
			alignItems: 'center',
		},

		Title: {
			padding: $mol_gap.text,
		},

		margin: px(16),
		
	} )
	
}
