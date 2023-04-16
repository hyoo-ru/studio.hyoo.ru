namespace $.$$ {
	
	export class $hyoo_studio_value_object extends $.$hyoo_studio_value_object {

		over_prop_add( next: string ) {
			
			if( !next ) return ''
			
			const tree = this.tree()
			
			this.tree(
				tree.clone( [
					...tree.kids,
					tree.struct( next, [
						tree.struct( 'null' ),
					] ),
				] )
			)
			
			return next
		}
		
		@ $mol_mem
		over_prop_options() {
			return this.props_of( this.tree().type ).kids.map( prop => prop.type )
		}

		@ $mol_mem
		prop_name_list() {
			return this.props_bindable().kids.map( prop => prop.type )
		}
	}
	
}
