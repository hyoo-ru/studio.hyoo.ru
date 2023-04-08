namespace $.$$ {

	const { px, rem } = $mol_style_unit

	$mol_style_define( $hyoo_studio_value_object, {

		Key_values: {
			flex: {
				grow: 1,
			},
			gap: $mol_gap.space,
			margin: {
				left: $mol_gap.block,
			},
		},

		Item_name: {
			alignSelf: 'center',
			color: $mol_theme.shade,
			padding: {
				left: $mol_gap.block,
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
