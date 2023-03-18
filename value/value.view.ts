namespace $.$$ {
	
	export class $hyoo_studio_value extends $.$hyoo_studio_value {
		
		@ $mol_mem
		self() {
			switch( this.type() ) {
				case 'null' :  return [ this.Type() ]
				case 'boolean_true' :  return [ this.Type() ]
				case 'boolean_false' :  return [ this.Type() ]
				case 'number_nan':  return [ this.Type() ]
				case 'number_infinity_negative':  return [ this.Type() ]
				case 'number_infinity_positive':  return [ this.Type() ]
				case 'text': return [ this.Str(), this.Type() ]
				case 'number': return [ this.Numb(), this.Type() ]
				case 'bind': return [ this.Prop_name(), this.Type() ]
				case 'hack': return [ this.Prop_name(), this.Type() ]
				case 'alias': return [ this.Prop_name(), this.Type() ]
				case 'list': return [ this.Item_type(), this.Type(), this.List_add() ]
				case 'dict': return [ this.Type() ]
				case 'object': return [ this.Obj(), this.Type(), this.Over_add() ]
				default: return []
			}
		}

		@ $mol_mem
		inner_rows() {
			switch( this.type() ) {
				case 'list': return this.list()
				case 'object': return this.overs()
				default: return []
			}
		}

		@ $mol_mem
		str( next?: string ) {
			if (next !== undefined){
				this.tree(this.tree().data( next ))
				return next
			}
			return this.tree().text()
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
			return this.tree().kids.map( (_,i)=> this.Over_prop( i ) )
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
		over_prop_name( index: number, next?: string ) {
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
