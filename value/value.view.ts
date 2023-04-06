namespace $.$$ {
	
	export class $hyoo_studio_value extends $.$hyoo_studio_value {
		
		@ $mol_mem
		self() {
			const Head = this.parent_type() == 'object'? [this.Over_prop_name(), this.Type()] : [this.Type()]
			switch( this.type() ) {
				case 'null': return [ ...Head, ]
				case 'boolean_true': return [ ...Head, ]
				case 'boolean_false': return [ ...Head, ]
				case 'number_nan': return [ ...Head, ]
				case 'number_infinity_negative': return [ ...Head, ]
				case 'number_infinity_positive': return [ ...Head, ]
				case 'text': return [ ...Head, this.Str() ]
				case 'number': return [ ...Head, this.Numb(), ]
				case 'bind': return this.bound_expanded() ? [ this.Opened_bound_prop() ] : [ ...Head, this.Bound_prop_name(), this.Bound_prop_expand(), ]
				case 'get': return this.bound_expanded() ? [ this.Opened_bound_prop() ] : [ ...Head, this.Bound_prop_name(), this.Bound_prop_expand() ]
				case 'put': return this.bound_expanded() ? [ this.Opened_bound_prop() ] : [ ...Head, this.Bound_prop_name(), this.Bound_prop_expand(), ]
				case 'list': return [ ...Head, this.Item_type(), this.List_add() ]
				case 'dict': return [ ...Head, ]
				default: return []
			}
		}

		@ $mol_mem
		guid() {
			return $mol_guid()
		}
		
		@ $mol_mem
		Opened_bound_prop() {
			const prop = this.Bound_prop( this.bound_prop_name() + ':' + this.guid() )
			prop.expanded = ( next?: boolean ) => this.bound_expanded( next )
			prop.expander_title = () => ''
			prop.label_sub = () => [
				...(this.parent_type() == 'object'? [this.Over_prop_name()]: []), 
				this.Type(), this.Bound_prop_name(), prop.Trigger(), prop.Prop_tools()
			]
			return prop
		}
		
		@ $mol_mem
		str( next?: string ) {
			
			const val = this.tree()

			if (next !== undefined){
				this.tree( val.type == '@' ? val.struct( '@', [ val.data(next) ] ) : val.data(next) )
				return next
			}

			return val.text()
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
		bound_prop_name( next?: string ) {
			
			const val = this.tree()
			
			if( next === undefined ) {
				return this.$.$mol_view_tree2_prop_split( val.kids[ 0 ] ).name.text() || '...'
			}
			
			this.tree(
				val.insert( val.struct( next ), null )
			)
			
			return next || '...'
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
			return this.type() == 'list' ? this.tree().kids.map( (_,i)=> this.List_value( i ) ) : []
		}
		
		@ $mol_mem
		item_type( next?: string ) {
			
			if( next && /\s/.test( next ) ) {
				$mol_fail( new SyntaxError( `Item type mustn't have any space chars` ) )
			}
			
			const from_tree = this.tree(
				next === undefined
					? undefined
					: this.tree().struct( '/' + next, this.tree().kids )
			).type.slice( 1 )

			const focused = this.Item_type().focused()

			return (from_tree) || (focused? '' : 'any')
			
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
		
		bind_options(): ReturnType<$hyoo_studio_prop_type[ 'bind_options' ]> {
			return { bind: '<=>', get: '<=', put: '=>' }
		}
		
		object_options(): ReturnType<$hyoo_studio_prop_type[ 'object_options' ]> {
			return { text: 'text', list: 'list', dict: 'dict' }
		}
		
	}
	
}
