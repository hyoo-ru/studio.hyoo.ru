namespace $.$$ {
	
	export class $hyoo_studio_value_number extends $.$hyoo_studio_value_number {

		@ $mol_mem
		numb( next?: number ) {
			
			return Number( this.tree(
				next === undefined
					? undefined
					: this.tree().struct( String( next ) )
			).type )
			
		}

	}
	
}
