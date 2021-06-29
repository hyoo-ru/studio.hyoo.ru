namespace $.$$ {
	
	export class $hyoo_studio extends $.$hyoo_studio {
		
		preview_show() {
			return true
			// return this.$.$mol_state_arg.value( 'preview' ) !== null
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
			const tree = this.$.$mol_tree2_from_string( str )
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
			
			return `
				<html style="height:100%;width:100%">
					<body style="margin:0;height:100%;width:100%">
						<script src="${ script }"></script>
						<script>${ this.self_code() }</script>
						<div mol_view_root="${ self }" style="background:none"></div>
						<script>setTimeout( ()=> $mol_view.autobind(), 1000 )</script>
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
			const win = this.Preview().window()
			return Object.keys( win )
				.filter( name => typeof win[name] === 'function' )
				.filter( name => win[name].prototype instanceof win['$mol_view'] )
		}
		
		@ $mol_mem_key
		props_derived( base_name: string ) {
			
			const lib = this.library()
			const all = new Map< string, $mol_tree2 >()

			const collect = ( name: string )=> {
				
				const sup = lib.select( name, null ).kids[0]
				if( !sup ) return
				
				collect( sup.type )
				
				for( const prop of sup.kids ) all.set( prop.type, prop )
				
			}

			collect( base_name )
			
			return lib.list([ ... all.values() ])
		}
		
		@ $mol_mem
		prop_indexes_filtered() {
			const all = this.$.$mol_view_tree2_class_props( this.tree() )
			return all.map( (_,i)=> i).filter(
				$mol_match_text(
					this.prop_filter(),
					i => [ all[i].type ],
				)
			)
		}
		
		@ $mol_mem
		props() {
			return this.prop_indexes_filtered().map( index => this.Prop( index ) )
		}
		
		@ $mol_mem_key
		prop_tree( index: number, next?: $mol_tree2 ) {
			
			let tree = this.tree()
			
			if( next !== undefined ) {
				tree = this.tree( tree.insert( next, this.base(), index ) )
			}
			
			return tree.select( this.base(), index ).kids[0]
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
