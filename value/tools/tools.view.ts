namespace $.$$ {
	
	export class $hyoo_studio_value_tools extends $.$hyoo_studio_value_tools {
		
		@ $mol_mem
		tools() {
			switch( this.type() ) {
				case 'text': return [ this.Locale() ]
				case 'number': return []
				case 'bind': return []
				case 'object': return [ this.Over_prop_add() ]
				case 'get': return []
				case 'put': return []
				case 'list': return [ this.List_items_type(), this.List_item_add() ]
				case 'dict': return [ this.Key_item_add() ]
			}
			return []
		}

		@ $mol_mem
		value( next?: $mol_tree2 ) {

			let val = this.tree()

			if( next !== undefined ) {
				val = this.tree( next && val.clone( [ next ] ) )
				return next
			}
			
			return val?.kids[ 0 ]
		}

		dict_item_add() {
			const tree = this.tree()
			this.tree(
				tree.clone([
					... tree.kids,
					tree.struct('key', [tree.struct('null')]),
				])
			)
		}

		list_item_add() {
			const tree = this.tree()
			this.tree(
				tree.clone([
					... tree.kids,
					tree.struct( 'null' ),
				])
			)
		}
		
		over_prop_add( next: string ) {
			
			if( !next ) return ''
			
			const tree = this.tree()
			
			this.tree(
				tree.clone( [
					...tree.kids,
					tree.struct( next, [
						tree.struct( 'null' ),
					] ),
				] )
			)
			
			return next
		}
		
		@ $mol_mem
		over_prop_options() {
			return this.props_of( this.tree().type ).kids.map( prop => prop.type )
		}

		
		@ $mol_mem
		list_items_type( next?: string ) {
			
			if( next && /\s/.test( next ) ) {
				$mol_fail( new SyntaxError( `Item type mustn't have any space chars` ) )
			}
			
			const from_tree = this.tree(
				next === undefined
					? undefined
					: this.tree().struct( '/' + next, this.tree().kids )
			).type.slice( 1 )

			const focused = this.List_items_type().focused()

			return (from_tree) || (focused? '' : 'any')
			
		}
		
		@ $mol_mem
		locale( next?: boolean ) {
			
			const val = this.tree()
			
			if( next === undefined ) return '@' === val.type
			
			this.tree(
				next
					? val.struct( '@', [
						val.data( val.text() || val.type )
					] )
					: val.data( val.text() || val.type )
			)

			return next
		}
	}
	
}
