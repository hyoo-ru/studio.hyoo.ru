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
			return this.$.$mol_state_arg.value( 'readme', next?.valueOf && ( next ? '' : null ) ) !== null
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
		source( next?: string ): string {
			return this.$.$mol_state_arg.value( 'source', next ) ?? super.source()
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
		
		@ $mol_mem
		readme_module( next?: any ) {
			
			const split = this.readme_module_name().split('_')

			return split.slice(1)
		}

		@ $mol_mem
		base_class_readme( next?: any ) {
			this.readme_module_name(this.base())
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
			
			const source = this.source( next && next.toString() ).replace( /\n?$/, '\n' )
			
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
			
			return next
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
			obj.focus_class = ( next?: any ) => this.readme_module_name( next )
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
	}
}
