namespace $.$$ {

	const { px, rem } = $mol_style_unit

	$mol_style_define( $hyoo_studio_prop, {

		Value: {
			padding: $mol_gap.space,
		},

		Type: {
			Trigger: {
				color: $mol_theme.special,
			},
		},

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
				radius: $mol_gap.round,
			},
			justifyContent: 'space-between',
		},

		Self: {
			alignItems: 'center',
		},

		Title: {
			padding: $mol_gap.text,
		},

		margin: $mol_gap.block,

	} )

}
