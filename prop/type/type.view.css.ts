namespace $.$$ {

	const { px } = $mol_style_unit

	$mol_style_define( $.$hyoo_studio_prop_type, {

		Options_content: {
			padding: $mol_gap.space,
		},

		Object_options: {
			flex: 'none',
		},

		position: 'static', //because pop_bubble should be relative to prop card

		Control: {
			border: {
				top: {
					color: $mol_theme.line,
					style: 'solid',
					width: px(1),
				}
			}
		}

	} )

}
