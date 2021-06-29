namespace $.$$ {
	
	type types = "null" | "bool" | "dict" | "locale" | "string" | "get" | "bind" | "put" | "list" | "object" | "number" 
	
	export class $hyoo_studio_value extends $.$hyoo_studio_value {
		
		@ $mol_mem
		type( next? : types ): types {
			
			let val = this.tree()
			
			if( next !== undefined ) {
				
				switch( next ) {
					case 'null' : val = val.struct( 'null' ); break
					case 'bool' : val = val.struct( 'false' ); break
					case 'number' : val = val.struct( val.text() || val.type ); break
					case 'string' : val = val.data( val.text() || val.type ); break
					case 'locale' : val = val.struct( '@' , [ val.data( val.text() || val.type ) ] ); break
					case 'get' : val = val.struct( '<=' , [ val.struct( '?' ) ] ); break
					case 'bind' : val = val.struct( '<=>' , [ val.struct( '?' ) ] ); break
					case 'list' : val = val.struct( '/' ); break
					case 'dict' : val = val.struct( '*' ); break
					case 'object' : val = val.struct( '$mol_view' ); break
					default : $mol_fail( new TypeError( `Unsupported type: ${ next }` ) )
				}
				
				val = this.tree( val )
			}
			
			
			return this.$.$mol_view_tree2_value_type( val )
		}
		
		@ $mol_mem
		value() {
			switch( this.type() ) {
				case 'string': return [ this.Str(), this.Type() ]
				case 'locale': return [ this.Str(), this.Type() ]
				case 'number': return [ this.Numb(), this.Type() ]
				default: return []
			}
		}

		@ $mol_mem
		str( next?: string ) {
			
			return this.tree(
				next === undefined
				? undefined
				: this.tree().data( next )
			).text()
			
		}
		
		@ $mol_mem
		numb( next?: number ) {
			
			return Number( this.tree(
				next === undefined
				? undefined
				: this.tree().struct( String( next ) )
			).type )
			
		}
		
	}
	
}
