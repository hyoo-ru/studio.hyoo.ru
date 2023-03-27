namespace $.$$ {

	const { px, rem, per } = $mol_style_unit

	$mol_style_define( $hyoo_studio_prop, {
		flex: {
			grow: 1,
		},
		border: {
			radius: $mol_gap.round,
		},
		background: {
			color: $mol_theme.card,
		},

		Value: {
			flex: {
				grow: 1,
			},
		},

		Type: {
			Trigger: {
				color: $mol_theme.special,
			},
		},

		Over_props: {
			gap: $mol_gap.space,
			flex: {
				grow: 1,
			},
			padding: {
				left: $mol_gap.block,
			},
		},

		Over_add: {
			marginLeft: 'auto',
		},

		Object: {
			flexDirection: 'column',
		},

		Expander: {
			flex: {
				grow: 1,
			},
		},

		Label: {
			background: {
				color: $mol_theme.card,
			},
			border: {
				radius: $mol_gap.round,
			},
		},

		Label_content: {
			flex: {
				wrap: 'wrap',
				grow: 1,
			},
		},

		Trigger: {
			flex: {
				grow: 1,
			},
		},

		Prop_tools: {
			marginLeft: 'auto',
		},

		Key: {
			marginLeft: 'auto',
		},

	} )

}
