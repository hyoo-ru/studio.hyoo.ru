namespace $ {

	export class $hyoo_studio_library extends $mol_object {

		@ $mol_mem
		pack(next?: string) {
			return next ?? 'https://mol.hyoo.ru'
		}

		@ $mol_mem
		script_link() {
			return new URL( 'web.js', this.pack() ).toString()
		}

		@ $mol_mem
		tree() {
			const uri = new URL( 'web.view.tree', this.pack() ).toString()
			const str = this.$.$mol_fetch.text( uri )
			const predef = '$mol_view $mol_object\n\tdom_name \\\n\tstyle *\n\tevent *\n\tfield *\n\tattr *\n\tsub /\n\ttitle \\\n'
			const tree = this.$.$mol_tree2_from_string( predef + str )
			const norm = this.$.$mol_view_tree2_normalize( tree )
			return norm
		}

		@ $mol_mem_key
		inherit_chain( cl: string ) {
			const chain = []

			do {
				chain.push(cl)
				
				const tree = this.tree().kids.find(kid => kid.type === cl)
				cl = tree ? this.$.$mol_view_tree2_class_super(tree).type : ''
			} while (cl)
		
			return chain
		}

	}

}
