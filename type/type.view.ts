namespace $.$$ {

	export class $hyoo_studio_type extends $.$hyoo_studio_type {

		belong_to(): 'prop' | 'subprop' | 'list' | 'dict' | string  {
			return 'prop'
		}

		bind_options(): Partial<{ bind: '<=>', get: '<=', put: '=>' }> {
			switch (this.belong_to()) {
				case 'prop': return { bind: '<=>', get: '<=', put: '=>' }
				case 'subprop': return { bind: '<=>', get: '<=', put: '=>' }
				case 'list': return { get: '<='}
				case 'dict': return { get: '<='}
				default: return { bind: '<=>', get: '<=', put: '=>' }
			}
		}

		other_options(): Partial<{ text: 'text', dict: 'dict', list: 'list' }> {
			return { 
				text: 'text', dict: 'dict', 
				...(this.list_type_showed() ? {} : {list: 'list'}) 
			}
		}

		@ $mol_mem
		other_options_group(){
			return [ 
				this.Other_options(),
				...(this.list_type_showed() ? [this.List_items_type()] : []),
				...(this.belong_to() === 'prop'? [this.Object_option()] : []),
			]
		}

		@ $mol_mem
		list_type_showed() {
			return this.type() === 'list' ? true : false
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
			return this.type() === 'object'? true : false
		}

		bind_option_label(bind_option: keyof ReturnType<$hyoo_studio_type["bind_options"]>){
			switch (bind_option) {
				case 'bind': return [ this.Take_put_hack_option() ]
				case 'get': return [ this.Take_hack_option() ]
				case 'put': return [ this.Alias_option() ]
			}
			return []
		}

		bind_option_label_display(bind_option: keyof ReturnType<$hyoo_studio_type["bind_options"]>){
			switch (bind_option) {
				case 'bind': return [ this.Take_put_hack_icon() ]
				case 'get': return [ this.Take_hack_icon() ]
				case 'put': return [ this.Alias_icon() ]
			}
			return []
		}

		trigger_content(){
			const type = this.type()

			const bind_option = this.bind_options()[type as keyof ReturnType<$hyoo_studio_type["bind_options"]>]

			return bind_option ? 
				this.bind_option_label_display(type as keyof ReturnType<$hyoo_studio_type["bind_options"]>) : 
				[ this.Value() ]
		}

		@ $mol_mem
		type_display(): string {
			const type = this.type()

			if (type === 'list') { 
				return `${this.list_items_type() === 'any'? '': this.list_items_type()} list` 
			}
			if (type === 'object') { return this.selected_class() }
			if (this.unit_options()[type as keyof ReturnType<$hyoo_studio_type["unit_options"]>]) 
				return this.unit_options()[type as keyof ReturnType<$hyoo_studio_type["unit_options"]>]
			if (this.number_options()[type as keyof ReturnType<$hyoo_studio_type["number_options"]>]) 
				return this.number_options()[type as keyof ReturnType<$hyoo_studio_type["number_options"]>]
			if (this.other_options()[type as keyof ReturnType<$hyoo_studio_type["other_options"]>]) 
				return this.other_options()[type as keyof ReturnType<$hyoo_studio_type["other_options"]>] || ''

			return ''
		}



		@ $mol_mem
		type( next? : string ) {
			const tree = this.tree()
			if (! tree) return ''
			if (next === undefined) return $hyoo_studio_type_value(tree)

			let val

			switch( next ) {
				case '' : val = null; break
				case 'null' : val = tree.struct('null'); break
				case 'boolean_true' : val = tree.struct('true'); break
				case 'boolean_false' : val = tree.struct('false'); break
				case 'number': val = tree.struct('0'); break
				case 'number_nan': val = tree.struct('+NaN'); break
				case 'number_infinity_negative': val = tree.struct('-Infinity'); break
				case 'number_infinity_positive': val = tree.struct('+Infinity'); break
				case 'text': val = tree.data(''); break
				case 'list': val = tree.struct( '/' ); break
				case 'dict': val = tree.struct( '*' ); break
				case 'object': val = tree.struct( '$mol_view', [ tree.kids[0] ?? tree.data( '' ) ] ); break
				case 'bind': val = tree.struct( '<=>', [ tree.kids[0] ?? tree.struct( `undefined`, [tree.data('')] ) ] ); break
				case 'get': val = tree.struct( '<=', [ tree.kids[0] ?? tree.struct( `undefined`, [tree.data('')] ) ] ); break
				case 'put': val = tree.struct( '=>', [ tree.kids[0] ?? tree.struct( `undefined`, [tree.data('')] ) ] ); break
			}

			if (val === undefined) $mol_fail( new TypeError( `Unsupported type: ${ next }` ) )

			const next_tree = this.tree(val)!
			this.showed(false)

			return $hyoo_studio_type_value(next_tree)
		}

		show_obj_select() {
			this.obj_select_showed(true)
		}
		
		@ $mol_mem
		selected_class(next?: string) {

			if ( next !== undefined ) {
				this.showed(false)
				return this.tree(this.tree()?.struct( next ))?.type ?? super.selected_class()
			}
			
			return this.tree()?.type ?? super.selected_class()
		}
		
		@ $mol_mem
		list_items_type(next?: string) {

			if( next && /\s/.test( next ) ) {
				$mol_fail( new SyntaxError( `Item type mustn't have any space chars` ) )
			}
			
			const from_tree = this.tree(
				next === undefined
					? undefined
					: this.tree()?.struct( '/' + next, this.tree()?.kids ?? []) ?? null
			)?.type.slice( 1 )

			const focused = this.List_items_type().focused()

			return (from_tree) || (focused? '' : 'any')
		}

	}

	export function $hyoo_studio_type_value(val: $mol_tree2_empty) {
		if( !val ) return ''

		switch( val.type ) {
			case '=': return '' //todo
			case '+NaN': return 'number_nan'
			case '+Infinity': return 'number_infinity_positive'
			case '-Infinity': return 'number_infinity_negative'
		}

		const type = $$.$mol_view_tree2_value_type( val )

		switch( type ) {
			case 'bool':
				return val.type === 'true' ? 'boolean_true' : 'boolean_false'
			
			case 'locale':
			case 'string':
				return 'text'
		}
		
		return type
	}

}
