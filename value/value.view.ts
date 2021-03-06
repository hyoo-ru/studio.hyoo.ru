namespace $.$$ {
	
	type types = "" | "unit" | "dict" | "string" | "bind" | "list" | "object" | "number" 
	
	export class $hyoo_studio_value extends $.$hyoo_studio_value {
		
		@ $mol_mem
		type( next? : types ): types {
			
			let val = this.tree()
			
			if( next !== undefined ) {
				
				switch( next ) {
					case '' : val = null!; break
					case 'unit' : val = val.struct( 'null' ); break
					case 'number' : val = val.struct( Number( val.text() || val.type ).toString() ); break
					case 'string' : val = val.data( val.text() || val.type ); break
					case 'bind' : val = val.struct( '<=' , [ val.data( '' ) ] ); break
					case 'list' : val = val.struct( '/' ); break
					case 'dict' : val = val.struct( '*' ); break
					case 'object' : val = val.struct( '$mol_view' ); break
					default : $mol_fail( new TypeError( `Unsupported type: ${ next }` ) )
				}
				
				val = this.tree( val )
			}
			
			if( !val ) return ''
			
			const type = this.$.$mol_view_tree2_value_type( val )
			
			if( type === 'bool' ) return 'unit'
			if( type === 'null' ) return 'unit'
			if( type === 'locale' ) return 'string'
			if( type === 'get' ) return 'bind'
			if( type === 'put' ) return 'bind'
			
			return type
		}
		
		@ $mol_mem
		self() {
			switch( this.type() ) {
				case 'string': return [ this.Str(), this.Type(), this.Locale() ]
				case 'number': return [ this.Numb(), this.Type() ]
				case 'unit': return [ this.Unit(), this.Type() ]
				case 'bind': return [ this.Prop_bind(), this.Prop_name(), this.Type() ]
				case 'list': return [ this.Item_type(), this.Type(), this.List_add() ]
				case 'dict': return [ this.Type() ]
				case 'object': return [ this.Obj(), this.Type(), this.Over_add() ]
				default: return [ this.Type() ]
			}
		}

		@ $mol_mem
		inner() {
			switch( this.type() ) {
				case 'list': return [ this.List() ]
				case 'object': return [ this.Overs() ]
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
			return this.props_bindable().kids.map( prop => prop.type )
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
		obj( next?: string ) {
			
			return this.tree(
				next === undefined
					? undefined
					: this.tree().struct( next )
			).type
			
		}
		
		@ $mol_mem
		list() {
			return this.tree().kids.map( (_,i)=> this.List_value( i ) )
		}
		
		@ $mol_mem
		overs() {
			return this.tree().kids.map( (_,i)=> this.Over( i ) )
		}
		
		@ $mol_mem
		item_type( next?: string ) {
			
			if( next && /\s/.test( next ) ) {
				$mol_fail( new SyntaxError( `Item type mustn't have any space chars` ) )
			}
			
			return this.tree(
				next === undefined
					? undefined
					: this.tree().struct( '/' + next, this.tree().kids )
			).type.slice( 1 )
			
		}
		
		list_add() {
			const tree = this.tree()
			this.tree(
				tree.clone([
					... tree.kids,
					tree.struct( 'null' ),
				])
			)
		}
		
		@ $mol_mem_key
		list_value( index: number, next?: $mol_tree2 ) {
			let val = this.tree()
			if( next !== undefined ) {
				val = this.tree( val.insert( next, index ) )
			}
			return val.kids[ index ]
		}
		
		@ $mol_mem
		over_prop_options() {
			return this.props_of( this.obj() ).kids.map( prop => prop.type )
		}
		
		@ $mol_mem_key
		over_prop( index: number, next?: string ) {
			let val = this.tree()
			if( next !== undefined ) {
				val = this.tree(
					val.insert( val.struct( next, val.kids[ index ].kids ), index )
				)
			}
			return val.kids[ index ].type
		}
		
		over_add( next: string ) {
			
			if( !next ) return ''
			
			const tree = this.tree()
			
			this.tree(
				tree.clone([
					... tree.kids,
					tree.struct( next, [
						tree.struct( 'null' ),
					] ),
				])
			)
			
			return next
		}
		
		@ $mol_mem_key
		over_value( index: number, next?: $mol_tree2 ) {
			let val = this.tree()
			if( next !== undefined ) {
				val = this.tree(
					val.insert( next && val.kids[ index ].clone([ next ]), index )
				)
			}
			return val.kids[ index ]?.kids[0]
		}
		
	}
	
}
