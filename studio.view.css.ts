namespace $.$$ {
	
	const { rem, per, px } = $mol_style_unit
	
	$mol_style_define( $hyoo_studio, {
		
		Preview: {
			flex: {
				basis: rem(40),
				shrink: 0,
			},
			minWidth: per(50),
			zIndex: 2,
			box: {
				shadow: [{
					x: 0,
					y: 0,
					blur: 0,
					spread: px(1),
					color: $mol_theme.line,
				}],
			},
			border: {
				radius: 0,
			},
		},
		
	} )
	
}
