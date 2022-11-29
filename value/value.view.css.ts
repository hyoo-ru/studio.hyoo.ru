namespace $.$$ {
	
	const { px, rem } = $mol_style_unit
	
	$mol_style_define( $hyoo_studio_value, {
		
		padding: $mol_gap.space,

		Self: {
			justifyContent: 'flex-end',
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
		
		List: {
			flex: {
				grow: 1,
				shrink: 1,
			},
			padding: rem(.75),
			border: {
				radius: $mol_gap.round,
			},
			box: {
				shadow: [{
					x: 0,
					y: 0,
					blur: 0,
					spread: px(1),
					color: $mol_theme.line,
				}],
			}
		},
		
		Item_type: {
			width: rem(10),
		},
		
		Overs: {
			flex: {
				grow: 1,
				shrink: 1,
			},
			padding: rem(.75),
			border: {
				radius: $mol_gap.round,
			},
			box: {
				shadow: [{
					x: 0,
					y: 0,
					blur: 0,
					spread: px(1),
					color: $mol_theme.line,
				}],
			}
		},
		
		Over: {
			padding: $mol_gap.block,
		},
		
		Over_prop: {
			textShadow: '0 0',
		},
		
	} )
	
}
