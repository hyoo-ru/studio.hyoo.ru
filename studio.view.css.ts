namespace $.$$ {
	
	const { rem } = $mol_style_unit
	
	$mol_style_define( $hyoo_mol_studio, {
		
		Edit: {
			flex: {
				shrink: 0,
			},
		},
		
		Edit_form: {
			display: 'flex',
			
			$mol_form_field: {
				margin: $mol_gap.block,
			},
			
		},
		
		Classes: {
			
			flex: {
				wrap: 'wrap',
			},
			
			$mol_form_field: {
				flex: {
					grow: 1,
				},
			},
			
		},
		
		Preview: {
			flex: {
				basis: rem(40),
				shrink: 0,
			},
		},
		
	} )
	
}
