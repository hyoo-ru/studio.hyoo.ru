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

		Object: {
			flexDirection: 'column',
		},

		Expander: {
			flex: {
				grow: 1,
			},
		},

		Label: {
			position: 'relative', //for type picker bubble positioning
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

		Expander_title: {
			color: $mol_theme.control,
		},

		Prop_tools: {
			flex: {
				shrink: 1,
			},
		},

		Key: {
			marginLeft: 'auto',
		},

	} )

}
