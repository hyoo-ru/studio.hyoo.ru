namespace $.$$ {

	const { px, rem } = $mol_style_unit

	$mol_style_define( $hyoo_studio_value, {

		Self: {
			flex: {
				grow: 1,
			},
			alignItems: 'flex-start',
		},

		Type: {
			Trigger: {
				color: $mol_theme.special,
			},
		},


		Numb: {
			flex: {
				grow: 1,
				shrink: 1,
			},
		},

		Str: {
			flex: {
				grow: 1,
				shrink: 1,
			},
			maxWidth: rem(30),
		},

		Item_type: {
			width: 0,
		},

		List_values: {
			flex: {
				grow: 1,
			},
			gap: $mol_gap.space,
			margin: {
				left: $mol_gap.block,
			},
			padding: {
				left: $mol_gap.block,
			},
		},

		List_value: {
			border: {
				radius: $mol_gap.round,
			},
		},

	} )

}
