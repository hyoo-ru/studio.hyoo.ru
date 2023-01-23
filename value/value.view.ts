namespace $.$$ {
	
	export class $hyoo_studio_value extends $.$hyoo_studio_value {
		
		@ $mol_mem
		self() {
			switch( this.type() ) {
				case 'text': return [ this.Str() ]
				case 'number': return [ this.Numb() ]
				case 'unit': return [ this.Unit(), this.Type() ]
				case 'bind': return [ this.Prop_bind(), this.Prop_name(), this.Type() ]
				case 'list': return [ this.Item_type() ]
				case 'dict': return [ ]
				case 'object': return [ this.Obj(), this.Over_add() ]
				default: return []
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
