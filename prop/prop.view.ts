namespace $.$$ {
	
	export class $hyoo_studio_prop extends $.$hyoo_studio_prop {
		
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
				
				meta = {
					... meta,
					... next,
				}
				
				const sign = $mol_view_tree2_prop_signature.generate( meta )!
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
						key: next ? '!key' : '',
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
						next: next ? '?next' : '',
					}
				).next
			)
			
		}

		@ $mol_mem
		value( next?: $mol_tree2 ) {
			let val = this.tree()
			if( next !== undefined ) {
				val = this.tree( next && val.clone([ next ]) )
				return next
			}
			
			return val?.kids[0]
		}

		@ $mol_mem
		localized( next?: boolean ) {
			
			const val = this.value()
			
			if( next === undefined ) return '@' === val.type 
			
			this.value(
				next
					? val.struct( '@', [
						val.data( val.text() || val.type )
					] )
					: val.data( val.text() || val.type )
			)
			
			return next
		}

		@ $mol_action
		list_item_add() {
			const value = this.value()
			this.value(
				value.clone([
					... value.kids,
					value.struct( 'null' ),
				])
			)
		}

		@ $mol_mem
		config_sub() {
			return [
				... this.type() === 'list' || this.type() === 'dict' ? [ this.List_item_add() ] : [],
				... this.type() === 'object' ? [ this.Over_add() ] : [],
				... this.type() === 'text' ? [ this.Localized() ] : [],
				this.Type(),
			]
		}

		@ $mol_mem
		rows() {
			const have_value_types = ['number', 'text', 'list', 'dict'] as string[]

			return [
				this.Head(),
				... have_value_types.findIndex( type => type === this.type() ) !== -1 ? [ this.Value() ] : []
			]
		}
			
	}
	
}
