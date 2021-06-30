namespace $.$$ {
	
	type types = "unit" | "dict" | "string" | "bind" | "list" | "object" | "number" 
	
	export class $hyoo_studio_value extends $.$hyoo_studio_value {
		
		@ $mol_mem
		type( next? : types ): types {
			
			let val = this.tree()
			
			if( next !== undefined ) {
				
				switch( next ) {
					case 'unit' : val = val.struct( 'null' ); break
					case 'number' : val = val.struct( val.text() || val.type ); break
					case 'string' : val = val.data( val.text() || val.type ); break
					case 'bind' : val = val.struct( '<=' , [ val.data( '' ) ] ); break
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
			if( type === 'get' ) return 'bind'
			if( type === 'put' ) return 'bind'
			
			return type
		}
		
		@ $mol_mem
		controls() {
			switch( this.type() ) {
				case 'string': return [ this.Str(), this.Locale(), this.Type() ]
				case 'number': return [ this.Numb(), this.Type() ]
				case 'unit': return [ this.Unit(), this.Type() ]
				case 'bind': return [ this.Prop_bind(), this.Prop_name(), this.Type() ]
				case 'list': return [ this.List(), this.Type() ]
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
		prop_bind( next?: '<=' | '<=>' | '=>' ) {
			
			const val = this.tree()
			
			if( next === undefined ) return val.type 
			
			this.tree(
				val.struct( next, val.kids )
			)
			
			return next
		}
		
		@ $mol_mem
		prop_name_list() {
			return this.props_all().kids.map( prop => prop.type )
		}
				
		@ $mol_mem
		prop_name( next?: string ) {
			
			const val = this.tree()
			
			if( next === undefined ) return val.kids[0].type
			
			this.tree(
				val.insert( val.struct( next ), null )
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
		
		@ $mol_mem
		list() {
			return this.tree().kids.map( (_,i)=> this.Value( i ) )
		}
		
		value( index: number ) {
			return this.tree().kids[ index ]
		}
		
	}
	
}
