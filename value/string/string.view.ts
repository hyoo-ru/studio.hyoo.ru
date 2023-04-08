namespace $.$$ {
	
	export class $hyoo_studio_value_string extends $.$hyoo_studio_value_string {

		@ $mol_mem
		str( next?: string ) {
			
			const val = this.tree()

			if (next !== undefined){
				this.tree( val.type == '@' ? val.struct( '@', [ val.data(next) ] ) : val.data(next) )
				return next
			}

			return val.text()
		}

	}
	
}
