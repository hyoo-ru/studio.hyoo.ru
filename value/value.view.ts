namespace $.$$ {
	
	type types = "unit" | "dict" | "string" | "get" | "bind" | "put" | "list" | "object" | "number" 
	
	export class $hyoo_studio_value extends $.$hyoo_studio_value {
		
		@ $mol_mem
		type( next? : types ): types {
			
			let val = this.tree()
			
			if( next !== undefined ) {
				
				switch( next ) {
					case 'unit' : val = val.struct( 'null' ); break
					case 'number' : val = val.struct( val.text() || val.type ); break
					case 'string' : val = val.data( val.text() || val.type ); break
					case 'get' : val = val.struct( '<=' , [ val.struct( '?' ) ] ); break
					case 'bind' : val = val.struct( '<=>' , [ val.struct( '?' ) ] ); break
					case 'list' : val = val.struct( '/' ); break
					case 'dict' : val = val.struct( '*' ); break
					case 'object' : val = val.struct( '$mol_view' ); break
					default : $mol_fail( new TypeError( `Unsupported type: ${ next }` ) )
				}
				
				val = this.tree( val )
			}
			
			const type = this.$.$mol_view_tree2_value_type( val )
			
			if( type === 'bool' ) return 'unit'
			if( type === 'null' ) return 'unit'
			if( type === 'locale' ) return 'string'
			
			return type
		}
		
		@ $mol_mem
		value() {
			switch( this.type() ) {
				case 'string': return [ this.Str(), this.Locale(), this.Type() ]
				case 'number': return [ this.Numb(), this.Type() ]
				case 'unit': return [ this.Unit(), this.Type() ]
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
		
		@ $mol_mem
		numb( next?: number ) {
			
			return Number( this.tree(
				next === undefined
					? undefined
					: this.tree().struct( String( next ) )
			).type )
			
		}
		
		@ $mol_mem
		unit( next?: string ) {
			
			return this.tree(
				next === undefined
					? undefined
					: this.tree().struct( next )
			).type
			
		}
		
	}
	
}
