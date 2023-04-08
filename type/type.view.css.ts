namespace $.$$ {

	const { px } = $mol_style_unit

	$mol_style_define( $.$hyoo_studio_type, {

		flex: {
			grow: 0,
		},

		Options_content: {
			padding: $mol_gap.space,
		},

		Other_options: {
			flex: 'none',
		},

		position: 'static', //because pop_bubble should be relative to prop card

		Value: {
			color: $mol_theme.special,
		},

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
