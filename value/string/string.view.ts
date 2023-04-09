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

		@ $mol_mem
		locale( next?: boolean ) {
			
			const val = this.tree()
			
			if( next === undefined ) return '@' === val.type
			
			this.tree(
				next
					? val.struct( '@', [
						val.data( val.text() || val.type )
					] )
					: val.data( val.text() || val.type )
			)

			return next
		}
		
		@ $mol_mem
		visible_tools(){
			return this.belong_to() === 'prop'? [] : [ this.Type() ]
		}

	}
	
}
