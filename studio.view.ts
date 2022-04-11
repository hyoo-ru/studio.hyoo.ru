namespace $.$$ {
	
	export class $hyoo_studio extends $.$hyoo_studio {

		arg( id: 'setup' | 'view' | 'preview' | 'source', value?: string ) {
			return this.$.$mol_state_arg.value( id , value )
		}
		
		@ $mol_mem
		pages() {
			return [
				this.Home(),
				... this.arg( 'setup' ) !== null ? [ this.Setup() ] : [],
				... this.arg( 'view' ) ? [ this.View( this.arg( 'view' ) ) ] : [],
				... this.arg( 'preview' ) ? [ this.Preview( this.arg( 'view' ) ) ] : [],
			]
		}

		@ $mol_mem
		pack( next?: string ) {
			return this.$.$mol_state_arg.value( 'pack', next ) ?? super.pack()
		}

		@ $mol_mem
		source( next?: string ) {
			return this.arg( 'source' , next ) ?? super.source()
		}

		@ $mol_mem_key
		source_class( id: string, next?: string ) {

			if ( next !== undefined ) {
				const source = next.replace( /\n?$/, '\n' )
				
				const tree = this.$.$mol_view_tree2_normalize(
					this.$.$mol_tree2_from_string( source )
				).kids[0]

				return this.tree_class( id , tree ).toString()
			}

			return this.tree_class( id ).toString()
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
			)
			
			return tree
		}

		@ $mol_mem
		tree_class_list() {
			return this.tree().kids.map( cl => cl.type )
		}

		@ $mol_mem_key
		tree_class( id: string , next?: $mol_tree2 ) {

			if( next !== undefined ) {
				this.tree( this.tree().insert( next, id ) )
				return next
			}
			
			return this.tree().select( id ).kids[0] ?? null
		}

		class_add( id: string ) {
			const tree = this.$.$mol_tree2_from_string( `${id} $mol_view\n` )
			this.tree_class( id , tree.kids[0] )
		}

		@ $mol_mem
		united() {
			const lib = this.library()
			return lib.clone([
				... lib.kids,
				... this.tree().kids,
			])
		}
		
		@ $mol_mem_key
		preview_html( id: string ) {
			
			const script = new URL( 'web.js', this.pack() ).toString()
			const theme = this.Theme().theme()
			
			return `
				<html style="height:100%;width:100%">
					<body style="margin:0;height:100%;width:100%">
						<script src="${ script }"></script>
						<script>${ this.all_code() }</script>
						<div mol_view_root="${ id }" mol_theme="${ theme }" style="background:none"></div>
						<script>setTimeout( ()=> $mol_view.autobind(null), 500 )</script>
					</body>
				</html>
			`
			
		}
		
		@ $mol_mem_key
		self_code( id: string ) {
			
			const tree = this.tree_class( id )
			
			const code = this.$.$mol_tree2_text_to_string_mapped_js(
				this.$.$mol_tree2_js_to_text(
					this.$.$mol_view_tree2_to_js(
						tree.list([ tree ])
					)
				)
			)
			
			return `
				$.${ id } = ${ code };
			`
		}

		@ $mol_mem
		all_code() {
			return this.tree_class_list().map( id => this.self_code( id ) ).join( '\n' )
		}

		@ $mol_mem
		base_options() {
			return this.united().kids.map( cl => cl.type ).reverse()
		}
		
		@ $mol_mem
		class_list() {
			return this.united().kids.map( cl => cl.type )
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
			
	}
	
}
