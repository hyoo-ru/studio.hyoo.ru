namespace $.$$ {

	const { px, rem } = $mol_style_unit

	$mol_style_define( $hyoo_studio_value_dict, {

		Key_values: {
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

		Item_name: {
			flex: {
				grow: 0,
			},
		},
		
		Self: {
			flex: {
				grow: 1,
			},
			alignItems: 'flex-start',
			position: 'relative', //for type picker bubble positioning
		},

		Item: {
			flex: {
				grow: 1,
			},
			alignItems: 'flex-start',
			position: 'relative', //for type picker bubble positioning
		},

	} )

}
