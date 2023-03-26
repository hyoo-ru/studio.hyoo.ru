namespace $.$$ {

	const { px, rem } = $mol_style_unit

	$mol_style_define( $hyoo_studio_prop, {
		flex: {
			grow: 1,
		},
		border: {
			radius: $mol_gap.round,
			color: $mol_theme.line,
			style: 'solid',
			width: px( 1 ),
		},
		backgroundColor: 'hsl( var( --mol_theme_hue), calc( var(--mol_theme_satur) * 39% ), calc( 55% + 41% * var(--mol_theme_luma) ) )',

		Value: {
			flex: {
				grow: 1,
			},
			padding: $mol_gap.space,
		},

		Type: {
			Trigger: {
				color: $mol_theme.special,
			},
		},

		Inner: {
			padding: $mol_gap.space,
		},

		Over_props: {
			gap: $mol_gap.space,
			flex: {
				grow: 1,
			},
			padding: {
				left: $mol_gap.block,
			},
		},

		Over_add: {
			marginLeft: 'auto',
		},

		Object: {
			flexDirection: 'column',
		},

		Head: {
			Label: {
				background: {
					color: $mol_theme.card,
				},
				border: {
					radius: $mol_gap.round,
				},
				justifyContent: 'space-between',
			}
		},

		Key: {
			marginLeft: 'auto',
		},

	} )

}
