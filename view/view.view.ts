namespace $.$$ {

	export class $hyoo_studio_view extends $.$hyoo_studio_view {

		props_all() {
			return this.props_of( this.self() )
		}

		@ $mol_mem
		props_own() {
			const tree = this.tree()
			const props = this.$.$mol_view_tree2_class_props( tree )
			return tree.list( props ).kids
		}

		@ $mol_mem
		prop_all_dict() {
			return this.props_all().kids.reduce( ( dict , prop ) => {
				dict[ prop.type ] = prop.type
				return dict

			} , {} )
		}

		@ $mol_mem
		prop_displayed_list( next?: string[] ) {
			return next ?? this.props_own().map( p => p.type )
		}

		@ $mol_mem
		props() {
			return this.prop_displayed_list().map( prop => this.Prop( prop ) )
		}
		
		@ $mol_mem
		prop_custom_add_allow() {
			
			const query = this.prop_custom_name()
			if( !query.trim() ) return false
			
			const all = this.props_all()
			return all.kids.every( prop => prop.type !== query )
			
		}
		
		prop_custom_add() {
			
			const query = this.prop_custom_name()
			const tree = this.tree()
			
			this.tree(
				tree.insert(
					tree.struct( query, [
						tree.struct( 'null' ),
					] ),
					null,
					query,
				)
			)
			
			this.prop_custom_name( '' )
			
		}
		
		@ $mol_mem_key
		prop_tree( prop: string, next?: $mol_tree2 ) {
			
			if( next !== undefined ) {
				this.tree( this.tree().insert( next, this.base(), prop ) )
				return next
			}
			
			return this.props_all().select( prop ).kids[0] ?? null
		}
		
		@ $mol_mem
		form_sections() {
			return [
				... this.$.$mol_state_arg.value( 'raw' ) !== null
					? [ this.Source_field() ]
					: [ this.Config() ],
				this.Drop(),
			]
		}

		drop() {
			this.$.$mol_state_arg.value( 'view' , null )
			this.$.$mol_state_arg.value( 'preview' , null )
			this.tree( null )
		}

		@ $mol_mem
		self( next?: string ) {
			
			const tree = this.tree()
			if( !next ) return tree.type
			
			this.tree( tree.struct( next, tree.kids ) )
			
			return next
		}
		
		@ $mol_mem
		base( next?: string ) {

			const self = this.tree()
			const base = this.$.$mol_view_tree2_class_super( self )
			if( !next ) return base.type
			
			this.tree(
				self.clone([
					base.struct( next, base.kids )
				])
			)
			
			return next
		}

		base_options_filtered() {
			return this.base_options().filter( base => base !== this.self() )
		}
		
	}

}
