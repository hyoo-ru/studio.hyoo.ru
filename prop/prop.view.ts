namespace $.$$ {
	
	type types = "" | "null" | "bool" | "dict" | "locale" | "string" | "get" | "bind" | "put" | "list" | "object" | "number" 
	
	export class $hyoo_studio_prop extends $.$hyoo_studio_prop {
		
		@ $mol_mem
		meta( next?: {
			readonly name?: string;
			readonly key?: string;
			readonly next?: string;
		} ) {
			
			const tree = this.tree()
			const sign = tree?.type ?? ''
			
			let meta = [ ... sign.matchAll( $mol_view_tree2_prop_signature ) ][0]?.groups ?? {
				name: '',
				key: '',
				next: '',
			}
			
			if( next ) {
				
				meta = {
					... meta,
					... next,
				}
				
				const sign = $mol_view_tree2_prop_signature.generate( meta )!
				this.tree( tree.struct( sign, tree.kids ) )
				
			}
			
			return meta
		}
		
		@ $mol_mem
		title( next?: string ) {
			
			return this.meta(
				next === undefined
				? undefined
				: { name: next }
			).name
			
		}
		
		@ $mol_mem
		key( next?: boolean ) {
			
			return Boolean(
				this.meta(
					next === undefined
					? undefined
					: {
						key: next ? '!key' : '',
					}
				).key
			)
			
		}
		
		@ $mol_mem
		next( next?: boolean ) {
			
			return Boolean(
				this.meta(
					next === undefined
					? undefined
					: {
						next: next ? '?next' : '',
					}
				).next
			)
			
		}
		
		@ $mol_mem
		value( next?: $mol_tree2 ) {
			
			let val = this.tree()
			if( next !== undefined ) {
				val = this.tree( next && val.clone([ next ]) )
			}
			
			return val?.kids[0]
		}
		
	}
	
}
