namespace $.$$ {

	export class $hyoo_studio_prop_type extends $.$hyoo_studio_prop_type {

		object_options(): Partial<{ text: 'text', list: 'list', dict: 'dict' }> {
			return { text: 'text', list: 'list', dict: 'dict' }
		}

		bind_options(): Partial<{ bind: '<=>', get: '<=', put: '=>' }> {
			return { bind: '<=>', get: '<=', put: '=>' }
		}

		switch_type(next?: string) {
			return this.type(next)
		}

		drop() {
			this.type('')
		}

		bubble_content() {
			return this.obj_select_showed()? this.Obj_bubble_content() : super.bubble_content()
		}

		obj_checked( next?: any ): boolean {
			return this.type() == 'object'? true : false
		}

		@ $mol_mem
		type_display() {
			const type = this.type()

			if (type == 'object') { return this.selected_obj() }
			if (this.unit_options()[type]) return this.unit_options()[type]
			if (this.number_options()[type]) return this.number_options()[type]
			if (this.object_options()[type]) return this.object_options()[type]
			if (this.bind_options()[type]) return this.bind_options()[type]

			return ''
		}

		@ $mol_mem
		type( next? : string ): string {
			
			if( next !== undefined ) {

				switch( next ) {
					case '' : this.tree(null); break
					case 'null' : this.tree( this.tree().struct('null') ); break
					case 'boolean_true' : this.tree( this.tree().struct('true') ); break
					case 'boolean_false' : this.tree( this.tree().struct('false') ); break
					case 'number': this.tree( this.tree().struct('0') ); break
					case 'number_nan': this.tree( this.tree().struct('+NaN') ); break
					case 'number_infinity_negative': this.tree( this.tree().struct('-Infinity') ); break
					case 'number_infinity_positive': this.tree( this.tree().struct('+Infinity') ); break
					case 'text': this.tree( this.tree().data('') ); break
					case 'list': this.tree( this.tree().struct( '/' ) ); break
					case 'dict': this.tree( this.tree().struct( '*' ) ); break
					case 'object': this.tree( this.tree().struct( '$mol_view', [ this.tree().kids[0] ?? this.tree().data( '' ) ] ) ); break
					case 'bind': this.tree( this.tree().struct( '<=>', [ this.tree().kids[0] ?? this.tree().data( '' ) ] ) ); break
					case 'get': this.tree( this.tree().struct( '<=', [ this.tree().kids[0] ?? this.tree().data( '' ) ] ) ); break
					case 'put': this.tree( this.tree().struct( '=>', [ this.tree().kids[0] ?? this.tree().data( '' ) ] ) ); break
					default : $mol_fail( new TypeError( `Unsupported type: ${ next }` ) )
				}

				this.showed(false)			
			}

			const val = this.tree()

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
			if( type === 'get' ) return 'get'
			if( type === 'put' ) return 'put'
			if (type === 'bind') return 'bind'
			
			return type
		}

		show_obj_select() {
			this.obj_select_showed(true)
		}
		
		@ $mol_mem
		selected_obj(next?: string) {

			if ( next !== undefined ) {
				this.showed(false)
				return this.tree(this.tree().struct( next )).type
			}
			
			return this.tree().type
		}

	}

}
