namespace $.$$ {
	
	export class $hyoo_studio_value_list extends $.$hyoo_studio_value_list {
		
		@ $mol_mem
		list() {
			return this.tree().kids.map( (_,i)=> this.List_value( i ) )
		}
		
		@ $mol_mem_key
		list_value( index: number, next?: $mol_tree2 ) {

			let tree = this.tree()
			if( next !== undefined ) {
				tree = this.tree( tree.insert( next, index ) )
			}
			
			return tree.kids[ index ]
		}
		
		bind_options(): ReturnType<$hyoo_studio_type[ 'bind_options' ]> {
			return { bind: '<=>', get: '<=', put: '=>' }
		}
		
	}
	
}
