namespace $.$$ {

	const { px, rem } = $mol_style_unit

	$mol_style_define( $hyoo_studio_value, {

		Self: {
			flex: {
				grow: 1,
			},
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
		},

		Obj: {
			flex: {
				grow: 1,
				shrink: 1,
			},
		},

		Prop_name: {
			flex: {
				grow: 1,
				shrink: 1,
			},
		},

		Inner: {
			margin: {
				left: $mol_gap.block,
			},
			padding: {
				left: $mol_gap.block,
			},
			boxShadow: 'inset 1px 0 0 0 var(--mol_theme_line)',
		},

		List_value: {
			border: {
				radius: $mol_gap.round,
			},
		},

		Over_prop: {
			gap: 0,
			padding: 0,
			border: {
				radius: $mol_gap.round,
			},
		},

	} )

}
