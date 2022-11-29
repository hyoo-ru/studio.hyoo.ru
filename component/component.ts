namespace $ {

	export class $hyoo_studio_component extends $mol_object {

		@ $mol_mem
		source(next?: string) {
			return next ?? ''
		}

		@ $mol_mem
		tree(next?: $mol_tree2_empty) {
			const source = this.source( next && next.toString() ).replace( /\n?$/, '\n' )
			
			const tree = this.$.$mol_view_tree2_normalize(
				this.$.$mol_tree2_from_string( source )
			).kids[0]
			
			return tree
		}

		@ $mol_mem
		name( next?: string ) {
			const tree = this.tree()
			if( !next ) return tree.type
			
			this.tree(
				tree.struct( next, tree.kids )
			)
			
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

		@ $mol_mem
		prop_names() {
			return this.$.$mol_view_tree2_class_props( this.tree() ).map( tree => this.$.$mol_view_tree2_prop_split( tree ).name.text() )
		}

		@ $mol_mem
		props_tree() {
			return this.tree().list( this.$.$mol_view_tree2_class_props( this.tree() ) )
		}

		@ $mol_mem_key
		prop_tree( name: string, next?: $mol_tree2 | null ) {
			if( next !== undefined ) {
				this.tree( this.tree().insert( next, this.base(), name ) )
				return next
			}
			
			return this.props_tree().select( name ).kids[0] ?? null
		}

		@ $mol_action
		prop_add( name: string ) {
			const tree = this.tree()
			
			this.tree(
				tree.insert(
					tree.struct( name, [
						tree.struct( 'null' ),
					] ),
					null,
					name,
				)
			)
		}

		@ $mol_action
		prop_drop( name: string ) {
			this.prop_tree( name , null )
		}

	}

}
