namespace $.$$ {
	
	export class $hyoo_studio_prop extends $.$hyoo_studio_prop {

		@ $mol_mem
		multiple( next?: any ): boolean {
			
			const sign_obj = [ ...this.sign().matchAll( $mol_view_tree2_prop_signature ) ][ 0 ]?.groups ?? {
				name: '',
				key: '',
				next: '',
			}
			
			if( next !== undefined ) {
				const new_sign = $mol_view_tree2_prop_signature.generate( { ...sign_obj, key: next ? '*' : '' } )!
				console.log( new_sign )
				this.sign( new_sign )
				return next
			}
			
			return Boolean( sign_obj.key )
		}
		
		@ $mol_mem
		changeable( next?: any ): boolean {
			const sign_obj = [ ...this.sign().matchAll( $mol_view_tree2_prop_signature ) ][ 0 ]?.groups ?? {
				name: '',
				key: '',
				next: '',
			}
			if( next !== undefined ) {
				const new_sign = $mol_view_tree2_prop_signature.generate( { ...sign_obj, next: next ? '?' : '' } )!
				this.sign( new_sign )
				return next
			}
			return Boolean( sign_obj.next )
		}
		
		prop_content() {
			return this.type() == 'object' ? [ this.Object() ] : [ this.Value() ]
		}
		
		@ $mol_mem
		value( next?: $mol_tree2 ) {
			let val = this.tree()
			if( next !== undefined ) {
				val = this.tree( next && val.clone( [ next ] ) )
				return next
			}
			
			return val?.kids[ 0 ]
		}
		
		@ $mol_mem
		prop_name_list() {
			return this.props_bindable().kids.map( prop => prop.type )
		}
		
		@ $mol_mem
		obj( next?: string ) {
			return this.value(
				next === undefined
					? undefined
					: this.value().struct( next )
			).type
		}

		@ $mol_mem
		overs() {
			return this.value().kids.map( ( _, i ) => this.Over_prop( i ) )
		}
		
		@ $mol_mem
		over_prop_options() {
			return this.props_of( this.obj() ).kids.map( prop => prop.type )
		}
		
		@ $mol_mem_key
		over_prop_name( index: number, next?: string ) {
			let val = this.value()
			if( next !== undefined ) {
				val = this.value(
					val.insert( val.struct( next, val.kids[ index ].kids ), index )
				)
			}
			return val.kids[ index ].type
		}
		
		over_add( next: string ) {
			
			if( !next ) return ''
			
			const tree = this.value()
			
			this.value(
				tree.clone( [
					...tree.kids,
					tree.struct( next, [
						tree.struct( 'null' ),
					] ),
				] )
			)
			
			return next
		}

		@ $mol_mem_key
		over_value( index: number, next?: $mol_tree2 ) {
			let val = this.value()
			if( next !== undefined ) {
				val = this.value(
					val.insert( next && val.kids[ index ].clone( [ next ] ), index )
				)
			}
			return val.kids[ index ]?.kids[ 0 ]
		}

	}
}
