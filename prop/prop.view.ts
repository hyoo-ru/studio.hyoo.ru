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
			switch (this.Value().type()) {
				case 'object':
				case 'text':
				case 'number':
				case 'list':
				case 'dict':
				case 'bind':
				case 'get':
				case 'put': 
					return [ this.Value() ]
				default: 
					return []
			}
		}
		
		@ $mol_mem
		expandable() {
			switch (this.Value().type()) {
				case 'object':
				case 'text':
				case 'number':
				case 'list':
				case 'dict': 
				case 'bind':
				case 'get':
				case 'put': 
					return true
				default: 
					return false
			}
		}

		@ $mol_mem
		expanded(next?: boolean): boolean {

			if ( next !== undefined ) return next as never

			let expanded: boolean | undefined = $mol_wire_probe( () => this.expanded() )

			const type = this.Value().type()

			if ( !expanded ) {
				switch (type) {
					case 'object': 
					case 'list': 
					case 'dict': 
						return this.value().kids.length > 0 ? false : true
					case 'text': 
						return this.value().text().length > 40 ? false : true
					case 'null' :
					case 'boolean_true' :
					case 'boolean_false' :
					case 'number' :
					case 'number_nan' :
					case 'number_infinity_negative' :
					case 'number_infinity_positive' :
						return true
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
				this.expanded( true )
				return next
			}
			
			return val?.kids[ 0 ]
		}
	}
}
