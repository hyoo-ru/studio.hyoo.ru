namespace $.$$ {

	export class $hyoo_studio_prop_type extends $.$hyoo_studio_prop_type {

		unit(next?: string) {
			return this.type(next)
		}

		number(next?: string) {
			return this.type(next)
		}

		object(next?: string) {
			return this.type(next)
		}

		bind(next?: string) {
			return this.type(next)
		}

		drop() {
			this.type('')
		}

		@ $mol_mem
		type_display() {
			const value = this.type()

			if (this.unit_options()[value]) return this.unit_options()[value]
			if (this.number_options()[value]) return this.number_options()[value]
			if (this.object_options()[value]) return this.object_options()[value]
			if (this.bind_options()[value]) return this.bind_options()[value]

			return ''
		}

		@ $mol_mem
		value( next?: $mol_tree2 ) {
			return this.tree(next)
			// let val = this.tree()
			// if( next !== undefined ) {
			// 	val = this.tree( next && val.clone([ next ]) )
			// 	return next
			// }
			
			// return val?.kids[0]
		}

		@ $mol_mem
		type( next? : string ): string {
			
			if( next !== undefined ) {
				
				switch( next ) {
					case '' : this.tree(null); break
					case 'null' : this.value( this.value().struct('null') ); break
					case 'boolean_true' : this.value( this.value().struct('true') ); break
					case 'boolean_false' : this.value( this.value().struct('false') ); break
					case 'number': this.value( this.value().struct('0') ); break
					case 'number_nan': this.value( this.value().struct('+NaN') ); break
					case 'number_infinity_negative': this.value( this.value().struct('-Infinity') ); break
					case 'number_infinity_positive': this.value( this.value().struct('+Infinity') ); break
					case 'text': this.value( this.value().data('') ); break
					case 'list': this.value( this.value().struct( '/' ) ); break
					case 'dict': this.value( this.value().struct( '*' ) ); break
					case 'object': this.value( this.value().struct( '$mol_view' ) ); break
					// case 'bind' : val = val.struct( '<=' , [ val.data( '' ) ] ); break
					default : $mol_fail( new TypeError( `Unsupported type: ${ next }` ) )
				}
			}

			const val = this.value()

			if( !val ) return ''

			if (val.type === '+NaN') return 'number_nan'
			if (val.type === '+Infinity') return 'number_infinity_positive'
			if (val.type === '-Infinity') return 'number_infinity_negative'

			const type = this.$.$mol_view_tree2_value_type( val )
			
			if (type === 'null') return 'null'
			if (type === 'bool') return val.type === 'true' ? 'boolean_true' : 'boolean_false'
			if (type === 'number') return 'number'
			if( type === 'locale' ) return 'text'
			if (type === 'string') return 'text'
			if( type === 'get' ) return 'hack'
			if( type === 'put' ) return 'alias'
			if (type === 'bind') return 'bind'
			
			return type
		}

	}

}
