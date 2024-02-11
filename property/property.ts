namespace $ {

	export class $hyoo_studio_property extends $mol_object {

		name(): string {
			throw new Error('Not defined')
		}

		component(): $hyoo_studio_component {
			throw new Error('Not defined')
		}

		tree(next?: $mol_tree2): $mol_tree2 {
			throw new Error('Not defined')
		}


		as< Prop extends typeof $hyoo_studio_property >( Prop: Prop ) {
			return Prop.make( {
				name: () => this.name(),
				tree: next => this.tree(next)
			} as InstanceType< Prop > )
		}

		@ $mol_mem
		meta( next?: {
			readonly name?: string;
			readonly key?: string;
			readonly next?: string;
		} ) {
			
			const tree = this.tree()
			const sign = tree?.type ?? ''
			
			let meta = [ ... sign.matchAll( $mol_view_tree2_prop_signature ) ][0]?.groups ?? {
				name: '',
				key: '',
				next: '',
			}
			
			if( next ) {

				if (next.name) {
					this.name = ()=> next.name!
					this.component().prop_drop( meta.name )
				}
				
				meta = {
					... meta,
					... next,
				}
				
				// const sign = $mol_view_tree2_prop_signature.generate( meta )!
				const sign = `${meta.name}${meta.key || ''}${meta.next || ''}`
				this.tree( tree.struct( sign, tree.kids ) )
				
			}

			return meta
		}
		
		@ $mol_mem
		title( next?: string ) {
			
			return this.meta(
				next === undefined
				? undefined
				: { name: next }
			).name
			
		}
		
		@ $mol_mem
		key( next?: boolean ) {
			
			return Boolean(
				this.meta(
					next === undefined
					? undefined
					: {
						key: next ? '*' : '',
					}
				).key
			)
			
		}
		
		@ $mol_mem
		next( next?: boolean ) {
			
			return Boolean(
				this.meta(
					next === undefined
					? undefined
					: {
						next: next ? '?' : '',
					}
				).next
			)
			
		}

	}

	export class $hyoo_studio_property_unit extends $hyoo_studio_property {

		

	}

}
