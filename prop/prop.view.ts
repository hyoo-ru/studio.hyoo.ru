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
			let meta = [ ... tree.type.matchAll( $mol_view_tree2_prop_signature ) ][0].groups!
			
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
		type( next? : types ): types {
			
			let prop = this.tree()
			
			if( next !== undefined ) {
				
				let val
				
				switch( next ) {
					case '' : this.tree( null ); return ''
					case 'null' : val = prop.struct( 'null' ); break
					case 'bool' : val = prop.struct( 'false' ); break
					case 'number' : val = prop.struct( 'NaN' ); break
					case 'string' : val = prop.data(''); break
					case 'locale' : val = prop.struct( '@' , [ prop.data('') ] ); break
					case 'get' : val = prop.struct( '<=' , [ prop.struct( '?' ) ] ); break
					case 'bind' : val = prop.struct( '<=>' , [ prop.struct( '?' ) ] ); break
					case 'list' : val = prop.struct( '/' ); break
					case 'dict' : val = prop.struct( '*' ); break
					case 'object' : val = prop.struct( '$mol_view' ); break
					default : $mol_fail( new TypeError( `Unsupported type: ${ next }` ) )
				}
				
				prop = this.tree( prop.clone([ val ]) )
			}
			
			
			return this.$.$mol_view_tree2_value_type( prop.kids[0] )
		}
		
		@ $mol_mem
		value() {
			switch( this.type() ) {
				case 'string': return [ this.Str() ]
				case 'locale': return [ this.Str() ]
				default: return []
			}
		}
		
		str( next?: string ) {
			
			let prop = this.tree()
			if( next !== undefined ) {
				prop = this.tree( prop.insert( prop.data( next ), 0 ) )
			}
			
			return prop.kids[0].text()
		}
		
	}
	
}
