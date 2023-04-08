namespace $.$$ {
	
	export class $hyoo_studio_value extends $.$hyoo_studio_value {
		
		@ $mol_mem
		Sub() {
			switch( this.type() ) {
				case 'text': return this.String()
				case 'number': return this.Number()
				case 'bind': return this.Bound()
				case 'object': return this.Object()
				case 'get': return this.Bound()
				case 'put': return this.Bound()
				case 'list': return this.List()
				case 'dict': return this.Dict()
			}
			return this.Unit()
		}
		
		bind_options(): ReturnType<$hyoo_studio_type[ 'bind_options' ]> {
			return { bind: '<=>', get: '<=', put: '=>' }
		}
		
	}
	
}
