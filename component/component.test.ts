namespace $.$$ {

	function t(strings: TemplateStringsArray) {
		return strings[0].replace(/#/g, '$')
	}

	$mol_test({

		'component name change'() {

			const obj = $hyoo_studio_component.make({})

			obj.source( t`#name #mol_view\n` )
			$mol_assert_equal( obj.name(), t`#name` )

			obj.name( t`#changed` )
			$mol_assert_equal( obj.source(), t`#changed #mol_view\n` )

		},

		'base class name changed'() {

			const obj = $hyoo_studio_component.make({})

			obj.source( t`#name #mol_view\n` )
			$mol_assert_equal( obj.base(), t`#mol_view` )

			obj.base( t`#mol_object` )
			$mol_assert_equal( obj.source(), t`#name #mol_object\n` )

		},

		'property add'() {

			const src = t`#mol_number #mol_view\n\tvalue? NaN\n`
			const dest = t`#mol_number #mol_view\n\tvalue? NaN\n\titems null\n`

			const obj = $hyoo_studio_component.make({})
			obj.source(src)
			obj.prop_add( 'items' )

			$mol_assert_equal( obj.source(), dest )

		},

		'property drop'() {

			const src = t`#mol_number #mol_view\n\tvalue? NaN\n\titems null\n`
			const dest = t`#mol_number #mol_view value? NaN\n`

			const obj = $hyoo_studio_component.make({})
			obj.source(src)
			obj.prop_drop( 'items' )

			$mol_assert_equal( obj.source(), dest )

		},

		'property name list'() {

			const obj = $hyoo_studio_component.make({})
			obj.source( t`#mol_number #mol_view\n\tvalue? NaN\n\titems null\n` )

			$mol_assert_like( obj.prop_names(), ['value', 'items'] )

		},

		'find property by name part'() {
			const src = `
				$hyoo_studio_example $mol_view
					a null
					b? null
					c* null
					d*? null
			`

			const obj = $hyoo_studio_component.make({})
			obj.source( src )

			$mol_assert_equal( obj.prop_fullname('a'), 'a' )
			$mol_assert_equal( obj.prop_fullname('b'), 'b?' )
			$mol_assert_equal( obj.prop_fullname('c'), 'c*' )
			$mol_assert_equal( obj.prop_fullname('d'), 'd*?' )
		},

		'property change'() {

			const src = t`#mol_number #mol_view\n\tvalue? NaN\n\titems null\n`
			const dest = t`#mol_number #mol_view\n\tvalue? true\n\titems null\n`

			const obj = $hyoo_studio_component.make({})
			obj.source( src )

			const val = obj.prop_tree( 'value' )
			const next = val?.struct( 'true' )!
			obj.prop_tree( 'value', val?.clone([ next ]) )

			$mol_assert_equal( obj.source(), dest )

		}

	})

}
