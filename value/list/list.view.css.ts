namespace $.$$ {

	const { px, rem } = $mol_style_unit

	$mol_style_define( $hyoo_studio_value_list, {

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
		
		Self: {
			flex: {
				grow: 1,
			},
			alignItems: 'flex-start',
			position: 'relative', //for type picker bubble positioning
		},

	} )

}
