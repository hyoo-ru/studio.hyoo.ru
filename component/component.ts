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
		prop_fullname( name: string ) {
			if (name.indexOf('*') + name.indexOf('?') + name.indexOf('!') > -3) return name

			for (const tree of this.props_tree().kids) {

				const sign = tree?.type ?? ''
				const meta = [ ... sign.matchAll( $mol_view_tree2_prop_signature ) ][0]?.groups ?? { name: '', key: '', next: '' }

				if (meta.name === name) return `${meta.name}${meta.key || ''}${meta.next || ''}`
			}

			return ''
		}

		@ $mol_mem_key
		prop_tree( name: string, next?: $mol_tree2 | null ) {
			const sign = this.prop_fullname(name)

			if( next !== undefined ) {
				this.tree( this.tree().insert( next, this.base(), sign ) )
				return next
			}
			
			return this.props_tree().select( sign ).kids[0] ?? null
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

		@ $mol_mem_key
		property( name: string ) {
			return $hyoo_studio_property.make({
				name: $mol_const(name),
				tree: next => this.prop_tree( name, next )!,
				component: $mol_const(this),
			})
		}

	}

}
