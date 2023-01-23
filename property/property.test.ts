namespace $ {

	$mol_test({

		'property key change'() {

			const src = '$hyoo_studio_example $mol_view items null\n'
			const dest = '$hyoo_studio_example $mol_view items* null\n'

			const obj = $hyoo_studio_component.make({})
			obj.source( src )

			const prop = obj.property( 'items' ).as( $hyoo_studio_property )

			prop.key(true)
			$mol_assert_equal( obj.source() , dest )
			
			prop.key(false)
			$mol_assert_equal( obj.source() , src )
		},

		'property next change'() {

			const src = '$hyoo_studio_example $mol_view items null\n'
			const dest = '$hyoo_studio_example $mol_view items? null\n'

			const obj = $hyoo_studio_component.make({})
			obj.source( src )

			const prop = obj.property( 'items' ).as( $hyoo_studio_property )

			prop.next(true)
			$mol_assert_equal( obj.source() , dest )
			
			prop.next(false)
			$mol_assert_equal( obj.source() , src )
		},

		'property title change'() {

			const src = '$hyoo_studio_example $mol_view items null\n'
			const dest = '$hyoo_studio_example $mol_view item null\n'

			const obj = $hyoo_studio_component.make({})
			obj.source( src )

			const prop = obj.property( 'items' )

			prop.title('item')
			$mol_assert_equal( obj.source() , dest )
			
			prop.title('items')
			$mol_assert_equal( obj.source() , src )

			console.log('123', obj.source())
		},

	})

}
