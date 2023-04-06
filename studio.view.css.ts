namespace $.$$ {

	const { rem, per, px } = $mol_style_unit

	$mol_style_define( $hyoo_studio, {

		Edit: {

			flex: {
				grow: 0,
				shrink: 0,
			},

			Body: {
				padding: 0,
			},

		},

		Edit_form: {
			display: 'flex',
		},

		Classes: {

			flex: {
				wrap: 'wrap',
			},


		},

		$mol_form_field: {
			flex: {
				grow: 1,
			},
		},

		Base: {
			alignSelf: 'stretch',
		},

		Props_controls: {
			padding: $mol_gap.block,
		},

		Props: {
			padding: $mol_gap.block,
			gap: $mol_gap.block,
		},

		Source_page: {
			flex: {
				basis: rem( 40 ),
			},
			Body: {
				flexDirection: 'row',
			},
		},

		Preview: {
			flex: {
				basis: rem( 40 ),
				shrink: 0,
				grow: 10000,
			},
			minWidth: per( 50 ),
			zIndex: 2,
			box: {
				shadow: [ {
					x: 0,
					y: 0,
					blur: 0,
					spread: px( 1 ),
					color: $mol_theme.line,
				} ],
			}
		},

		Inspect: {
			flex: {
				basis: rem( 30 ),
				shrink: 0,
				grow: 1,
			},
		},

	} )

}
