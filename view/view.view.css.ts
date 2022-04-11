namespace $.$$ {
	
	const { rem } = $mol_style_unit
	
	$mol_style_define( $hyoo_studio_view, {

			flex: {
				basis: rem(24),
			},
			
			Body: {
				padding: 0,
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
			
			Base: {
				alignSelf: 'stretch',
			},
			
			Props_controls: {
				padding: $mol_gap.block,
			},
			
			Prop: {
				padding: $mol_gap.block,
			},
	} )

}
