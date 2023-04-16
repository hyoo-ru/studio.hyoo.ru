namespace $.$$ {
	
	export class $hyoo_studio_value_dict extends $.$hyoo_studio_value_dict {

		@ $mol_mem
		list() {
			return this.tree().kids.map( (_,i)=> this.Item( i ) )
		}

		@ $mol_mem_key
		item_key( index: number, next?: string ) {

			if( next && /\s/.test( next ) ) {
				$mol_fail( new SyntaxError( `Item key mustn't have any space chars` ) )
			}

			let tree = this.tree()

			if( next !== undefined ) {
				tree = this.tree(
					tree.insert( tree.struct( next, tree.kids[ index ].kids ), index )
				)
			}

			return tree.kids[ index ].type
		}
		
		@ $mol_mem_key
		item_value( index: number, next?: $mol_tree2 ) {

			let tree = this.tree()
			
			if( next !== undefined ) {
				tree = this.tree(
					tree.insert( next && tree.kids[ index ].clone( [ next ] ), index )
				)
			}

			return tree.kids[ index ]?.kids[ 0 ]
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
	}
	
}
