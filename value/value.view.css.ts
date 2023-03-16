namespace $.$$ {

	const { px, rem } = $mol_style_unit

	$mol_style_define( $hyoo_studio_value, {

		Self: {
			justifyContent: 'flex-end',
			flex: {
				grow: 1,
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
			padding: {
				left: $mol_gap.block,
			},
			border: {
				radius: $mol_gap.round,
			},
		},

		List_value: {
			box: {
				shadow: [ {
					x: px( -1 ),
					y: px( -1 ),
					blur: 0,
					spread: 0,
					color: $mol_theme.line,
				} ],
			},
			border: {
				radius: $mol_gap.round,
			},
		},

		Item_type: {
			width: rem( 10 ),
		},

		Prop: {
			padding: 0
		},

		Over_prop: {
			gap: 0,
			padding: 0,
			box: {
				shadow: [ {
					x: px( -1 ),
					y: px( -1 ),
					blur: 0,
					spread: 0,
					color: $mol_theme.line,
				} ],
			},
			border: {
				radius: $mol_gap.round,
			},
		},

	} )

}
