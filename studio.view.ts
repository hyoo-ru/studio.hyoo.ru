namespace $.$$ {
	
	export class $hyoo_studio extends $.$hyoo_studio {
		
		preview_show() {
			return this.$.$mol_state_arg.value( 'preview' ) !== null
		}
		
		editor_raw() {
			return this.$.$mol_state_arg.value( 'raw' ) !== null
		}
		
		@ $mol_mem
		pages() {
			return [
				this.Edit(),
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
					base.struct( next, base.kids )
				])
			)
			
			return next
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
		props_of( base: string ) {
			
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
			
			return lib.list( [ ... all.values() ].reverse() )
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
		
		@ $mol_mem
		props() {
			return this.prop_filtered().map( prop => this.Prop( prop.type ) )
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
		
		@ $mol_mem_key
		prop_tree( prop: string, next?: $mol_tree2 ) {
			
			if( next !== undefined ) {
				this.tree( this.tree().insert( next, this.base(), prop ) )
				return next
			}
			
			return this.props_all().select( prop ).kids[0] ?? null
		}
		
		@ $mol_mem
		form_sections() {
			return [
				this.Pack_field(),
				... this.editor_raw()
					? [ this.Source_field() ]
					: [ this.Config() ],
			]
		}
		
	}
	
}
