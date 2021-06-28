namespace $.$$ {
	
	export class $hyoo_mol_studio extends $.$hyoo_mol_studio {
		
		@ $mol_mem
		pack( next?: string ) {
			return this.$.$mol_state_arg.value( 'pack', next ) ?? super.pack()
		}
		
		@ $mol_mem
		source( next?: string ): string {
			return this.$.$mol_state_arg.value( 'source', next ) ?? super.source()
		}
		
		@ $mol_mem
		tree( next?: $mol_tree2 ) {
			const source = this.source( next && next.toString() ).replace( /\n?$/, '\n' )
			return this.$.$mol_view_tree2_classes(
				this.$.$mol_tree2_from_string( source )
			).kids[0]
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
		
	}
	
}
