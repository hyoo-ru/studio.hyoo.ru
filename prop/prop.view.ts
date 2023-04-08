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
			switch (this.type()) {
				case 'object': return [ this.Value() ]
				case 'text': return [ this.Value() ]
				case 'number': return [ this.Value() ]
				case 'list': return [ this.Value() ]
				case 'dict': return [ this.Value() ]
				case 'bind': return [ this.Value() ]
				case 'get': return [ this.Value() ]
				case 'put': return [ this.Value() ]
				default: return []
			}
		}
		
		@ $mol_mem
		expandable() {
			switch (this.type()) {
				case 'object': return true
				case 'text': return true
				case 'number': return true
				case 'list': return true
				case 'dict': return true
				default: return false
			}
		}

		@ $mol_mem
		expanded(next?: boolean): boolean {

			if ( next !== undefined ) return next as never

			let expanded: boolean | undefined = $mol_wire_probe( () => this.expanded() )
			const type = this.type()

			if ( !expanded ) {
				switch (type) {
					case 'object': 
					case 'list': 
					case 'dict': 
						return this.value().kids.length > 0 ? false : true
					case 'text': return this.value().text().length > 40 ? false : true
					case 'null' : return true
					case 'boolean_true' : return true
					case 'boolean_false' : return true
					case 'number' : return true
					case 'number_nan' : return true
					case 'number_infinity_negative' : return true
					case 'number_infinity_positive' : return true
				}
				return false
			}

			return expanded
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
		
	}
}
