namespace $.$$ {
	
	export class $hyoo_studio extends $.$hyoo_studio {
		
		preview_show( next?: boolean ) {
			return this.$.$mol_state_arg.value( 'preview', next?.valueOf && ( next ? '' : null ) ) !== null
		}
		
		inspector_show( next?: boolean ) {
			return this.$.$mol_state_arg.value( 'inspect', next?.valueOf && ( next ? '' : null ) ) !== null
		}

		code_show( next?: boolean ) {
			return this.$.$mol_state_arg.value( 'raw', next?.valueOf && ( next ? '' : null ) ) !== null
		}

		readme_show( next?: boolean ) {
			if ( next ) this.readme_selected( this.base() )
			return this.Demo().readme_page( next )
		}
		
		@ $mol_mem
		pages() {
			return [
				this.Edit(),
				... this.readme_show() ? [ this.Readme_page() ] : [],
				... this.code_show() ? [ this.Source_page() ] : [],
				... this.inspector_show() ? [ this.Inspect() ] : [],
				... this.preview_show() ? [ this.Preview() ] : [],
			]
		}
		
		@ $mol_mem
		pack( next?: string ) {
			return this.$.$mol_state_arg.value( 'pack', next ) ?? super.pack()
		}
		
		@ $mol_mem
		source_tree( next?: string ): string {
			return this.$.$mol_state_arg.value( 'source', next ) ?? super.source_tree()
		}

		@ $mol_mem
		source_css( next?: string ): string {
			return this.$.$mol_state_arg.value( 'source_css', next ) ?? '/* Don\'t delete auto-generated comments */\n'
		}

		@ $mol_mem
		source_js( next?: string ): string {
			return this.$.$mol_state_arg.value( 'source_js', next ) ?? super.source_js()
		}

		@ $mol_mem
		preview_html() {
			
			const self = this.self()
			const script = new URL( 'web.js', this.pack() ).toString()
			const theme = this.Theme().theme()
			
			return `
				<html mol_view_root>
					<body mol_view_root>
						<script src="${ script }"></script>
						<script>${ this.self_code() }</script>
						<div mol_view_root="${ self }" mol_theme="${ theme }" style="background:none"></div>
					</body>
				</html>
			`
		}
		
		@ $mol_mem
		preview_window() {
			this.$.$mol_wait_rest()
			this.preview_html()
			this.preview_show()
			return super.preview_window()
		}
		
		@ $mol_mem
		inspect_graph() {
			
			const win = this.preview_window()
			
			try {
				win['$mol_view'].autobind()
				return $mol_wire_graph( win['$mol_view']['autobind()'] )
			} catch( error: any ) {
				if( 'then' in error ) return $mol_fail_hidden( new Promise( ( done, fail )=> error.then( done, fail ) ) )
				$mol_fail_hidden( new Error( error.message ) )
			}
			
		}
		
		@ $mol_mem
		inspect_stat() {
			return this.inspect_graph().group_depth_min.map( nodes => nodes.length )
		}
		
		inspect_stat_depth() {
			return Object.keys( this.inspect_stat() ).map( Number )
		}
		
		readme_selected( next?: string ) {
			return $mol_state_arg.value( 'demo', next ) ?? ''
		}

		@ $mol_mem
		library() {
			const uri = new URL( 'web.view.tree', this.pack() ).toString()
			const str = this.$.$mol_fetch.text( uri )
			const predef = '$mol_view $mol_object\n\tdom_name \\\n\tstyle *\n\tevent *\n\tfield *\n\tattr *\n\tsub /\n\ttitle \\\n'
			const tree = this.$.$mol_tree2_from_string( predef + str )
			const norm = this.$.$mol_view_tree2_normalize( tree )
			return norm
		}
		
		@ $mol_mem
		tree( next?: $mol_tree2 ) {
			
			const source = this.source_tree( next && next.toString() ).replace( /\n?$/, '\n' )
			
			const tree = this.$.$mol_view_tree2_normalize(
				this.$.$mol_tree2_from_string( source )
			).kids[0]
			
			return tree
		}
		
		@ $mol_mem
		united() {
			const lib = this.library()
			return lib.clone([
				... lib.kids,
				this.tree(),
			])
		}
		
		@ $mol_mem
		self( next?: string ) {
			
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
					self.struct( next )
				])
			)
			
			return this.readme_selected( next )
		}

		@ $mol_mem
		self_code() {
			
			const tree = this.tree()
			
			const code = this.$.$mol_tree2_text_to_string_mapped_js(
				this.$.$mol_tree2_js_to_text(
					this.$.$mol_view_tree2_to_js(
						tree.list([ tree ])
					)
				)
			)
			
			return `
				$.$mol_wire_auto = parent.$mol_wire_auto
				$.${ this.self() } = ${ code }
				$.${ this.self() } = ${this.source_js().replaceAll('{self}', this.self())}
				;${ this.source_js_decorators() };
				$.$mol_style_attach(${ this.self() }, \`${ this.source_css().replaceAll('{self}', this.self().slice(1)) }\`)
			`
		}
		
		@ $mol_mem
		base_options() {
			return this.library().kids.map( cl => cl.type ).reverse()
		}
		
		@ $mol_mem
		class_list() {
			return this.library().kids.map( cl => cl.type )
		}
		
		@ $mol_mem_key
		prop_sign( prop_name: string, next?: string ) {
			if( next !== undefined ) {
				const tree = this.prop_tree( prop_name )
				this.prop_tree( prop_name, tree.struct( next, tree.kids ) )
				return next
			}
			return this.props_map( this.self() ).get( prop_name )?.type || ''
		}

		@ $mol_mem_key
		props_map( base: string ) {
			
			const lib = this.united()
			const all = new Map< string, $mol_tree2 >()
			
			const add = ( prop: $mol_tree2 )=> {
				const name = this.$.$mol_view_tree2_prop_split( prop ).name.text()
				all.set( name, prop )
			}

			const collect = ( cl: string )=> {
				
				const sup = lib.select( cl, null ).kids[0]
				if( !sup ) return
				
				collect( sup.type )
				
				for( const prop of sup.kids ) add( prop )
				
			}

			collect( base )

			return all
		}
		
		@ $mol_mem_key
		props_of( base: string ) {
			const lib = this.united()
			return lib.list( [ ...this.props_map( base ).values() ].reverse() )
		}
		
		props_all() {
			return this.props_of( this.self() )
		}
		
		@ $mol_mem
		prop_filtered() {
			return this.props_all().kids.filter(
				$mol_match_text(
					this.prop_filter(),
					prop => [ prop.type ],
				)
			)
		}
		
		@ $mol_mem_key
		prop_name( prop_name: string ) {
			return prop_name
		}
		
		@ $mol_mem
		props() {
			const props = this.prop_filtered().map( prop => {
				const name = this.$.$mol_view_tree2_prop_split( prop ).name.text()
				return this.Prop( name )
			} )
			return props
		}
		
		@ $mol_mem
		prop_add_allow() {
			
			const query = this.prop_filter()
			if( !query.trim() ) return false
			
			const all = this.props_all()
			return all.kids.every( prop => prop.type !== query )
			
		}
		
		prop_add() {
			
			const query = this.prop_filter()
			const tree = this.tree()
			
			this.tree(
				tree.insert(
					tree.struct( query, [
						tree.struct( 'null' ),
					] ),
					null,
					query,
				)
			)
			
			this.prop_filter( '' )
			
		}
		
		@ $mol_mem
		props_controls() {
			return [
				this.Prop_filter(),
				... this.prop_add_allow() ? [ this.Prop_add() ] : [],
			]
		}
		
		@$mol_mem_key
		Bound_prop( id: string ) {
			const name = id.split( ':' )[ 0 ]
			const obj = new this.$.$hyoo_studio_prop()
			obj.name = () => this.prop_name( name )
			obj.sign = ( next?: string ) => this.prop_sign( name, next )
			obj.tree = ( next?: any ) => this.prop_tree( name, next )
			obj.props_of = ( klass: any ) => this.props_of( klass )
			obj.props_bindable = () => this.props_all()
			obj.class_list = () => this.class_list()
			obj.Bound_prop = ( id: any ) => this.Bound_prop( id )
			return obj
		}
		
		@ $mol_mem_key
		prop_tree( prop_name: string, next?: $mol_tree2 ) {
			
			const sign = this.prop_sign( prop_name ) || prop_name
			
			if( next !== undefined ) {
				this.tree( this.tree().insert( next, this.base(), sign ) )
				return next
			}
			
			return this.props_all().select( sign ).kids[0] ?? null
		}

		@ $mol_mem
		soure_type_current( next?: string ) {
			const options = Object.entries(this.Source_type().switch_options())
			if (next === undefined) {
				const title = this.$.$mol_state_arg.value('raw_type')
				const [value] = options.find(([value, label]) => label === title) ?? ['0']
				return value
			}

			const next_title = options[Number(next)]?.[1]
			this.$.$mol_state_arg.value('raw_type', next_title ?? options[0][1])
			return next
		}

		@ $mol_mem_key
		source_css_prop( prop_name: string, next?: string ) {
			const tag = `/*${prop_name}*/`
			const [before = '', prop_styles = '', after = ''] = this.source_css().split(tag)

			if (next === undefined) {
				return prop_styles.trim() || `[{self}_${prop_name.toLowerCase()}] {\n\t\n}`
			}

			const all = [before, tag, next.trim(), tag, after].join('\n').trim().replaceAll(/\n{2,}/g, '\n\n')
			this.source_css(all)
			return next.trim()
		}

		@ $mol_mem
		source_css_switch( next?: string ) {
			const prop_name = this.$.$mol_state_arg.value('raw_prop')

			if (!prop_name) return this.source_css(next)

			return this.source_css_prop(prop_name, next)
		}

		@ $mol_mem
		source_js_decorators() {
			const list = new Array<string>()

			const add = (prop_name: string, key: boolean, next: boolean) => {
				if (!key && !next) return
				if (!this.source_js().includes(`/*${prop_name}*/`)) return

				list.push(`($mol_mem${key ? '_key' : ''}(($.${ this.self() }.prototype), "${ prop_name }"));`)
			}

			this.props().forEach(prop => add(prop.name(), prop.multiple(), prop.changeable()))

			return list.join('\n')
		}

		@ $mol_mem_key
		source_js_prop( prop_name: string, next?: string ) {
			const lines = this.source_js().split('\n')
			const class_begin = lines.shift()
			const class_end = lines.pop()

			const tag = `/*${prop_name}*/`
			const [before = '', prop_js = '', after = ''] = lines.join('\n').split(tag)

			const multiple = this.Prop(prop_name).multiple()
			const changeable = this.Prop(prop_name).changeable()
			const params = [...multiple ? ['key'] : [], ...changeable ? ['next'] : []].join(', ')
			if (next === undefined) {
				return prop_js.trim().replace(new RegExp(`${prop_name}\\s*\\(.*\\)`), `${prop_name} (${params})`) || `${prop_name} (${params}) {\n\t\n}`
			}

			const all = [class_begin, before, tag, next.trim(), tag, after, class_end].join('\n').trim().replaceAll(/\n{2,}/g, '\n\n')
			this.source_js(all)
			return next.trim()
		}

		@ $mol_mem
		source_js_switch( next?: string ) {
			const prop_name = this.$.$mol_state_arg.value('raw_prop')

			if (!prop_name) return this.source_js(next)

			return this.source_js_prop(prop_name, next)
		}

		source_prop_name() {
			return super.source_prop_name().replaceAll('{prop_name}', this.$.$mol_state_arg.value('raw_prop')!)
		}

		@ $mol_action
		source_prop_exit() {
			this.$.$mol_state_arg.value('raw_prop', null)
		}

		@ $mol_mem
		source_page_body() {
			const show = this.$.$mol_state_arg.value('raw_prop') !== null && this.$.$mol_state_arg.value('raw_type') !== 'view.tree'
			return [
				... show ? [this.Source_prop_switch()] : [],
				this.Source_type(),
			]
		}
	}
}
