namespace $.$$ {

	export class $hyoo_studio_home extends $.$hyoo_studio_home {

		class_controls() {
			return [
				this.Class_filter(),
				... this.class_add_allow() ? [ this.Class_add() ] : [],
			]
		}

		class_add_allow() {
			const name = this.class_filter()

			if ( !/^\$\w+$/.test( name ) ) return false

			return !this.class_list().includes( name )
		}
		
		class_add_event() {
			this.class_add( this.class_filter() )
			this.class_filter( '' )
		}

		class_list_filtered() {
			return this.class_list().filter(
				$mol_match_text(
					this.class_filter(),
					name => [ name ],
				)
			)
		}

		class_list_rows() {
			return this.class_list_filtered().map( id => this.Class_link( id ) )
		}

		class_name( id: string ) {
			return id
		}

	}

}
