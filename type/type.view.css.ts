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

		Value: {
			color: $mol_theme.special,
		},

		List_items_type: {
			flex: {
				grow: 0,
			},
			View: {
				Rows: {
					flexDirection: 'row',
					'::after': {
						content: '"[]"',
					},
				},
			},
			Edit: {
				boxShadow: 'none',
			},
			color: $mol_theme.current,
		},

		Control: {
			borderTop: 'solid 1px var(--mol_theme_line)',
		}

	} )

}
