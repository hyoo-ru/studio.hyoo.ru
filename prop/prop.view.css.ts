namespace $.$$ {

	const { px, rem, per } = $mol_style_unit

	$mol_style_define( $hyoo_studio_prop, {
		width: per(100),
		flex: {
			grow: 1,
		},
		outline: `solid 1px var(--mol_theme_line)`,
		border: {
			radius: $mol_gap.round,
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

		Expander: {
			flex: {
				grow: 1,
			},
		},

		Label: {
			background: {
				color: $mol_theme.card,
			},
			border: {
				radius: $mol_gap.round,
			},
		},

		Label_content: {
			flex: {
				wrap: 'wrap',
				grow: 1,
			},
			width: rem(24),
		},

		Prop_tools: {
			marginLeft: 'auto',
		},

		Key: {
			marginLeft: 'auto',
		},

	} )

}
