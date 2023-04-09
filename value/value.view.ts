namespace $.$$ {
	
	export class $hyoo_studio_value extends $.$hyoo_studio_value {
		
		@ $mol_mem
		Sub() {

			let obj = this.Unit()

			switch( this.$.$hyoo_studio_type_value(this.tree()) ) {
				case 'text': obj = this.String(); break;
				case 'number': obj = this.Number(); break;
				case 'bind': obj = this.Bound(); break;
				case 'object': obj = this.Object(); break;
				case 'get': obj = this.Bound(); break;
				case 'put': obj = this.Bound(); break;
				case 'list': obj = this.List(); break;
				case 'dict': obj = this.Dict(); break;
			}

			obj.hide_tools = () => this.hide_tools()
			obj.belong_to = () => this.belong_to()
			obj.tree = (next?: any) => this.tree(next)
			obj.props_of = (id: any) => this.props_of(id)
			obj.props_bindable = () => this.props_bindable()
			obj.class_list = () => this.class_list()
			obj.Bound_prop = (id: any) => this.Bound_prop(id)
			obj.head = () => this.head()

			return obj
		}

		@ $mol_mem
		value_tools(): readonly any[] {
			return this.Sub().tools()
		}

		@ $mol_mem
		type(): string {
			return this.Sub().Type().type()
		}

		@ $mol_mem
		selected_obj(): string {
			return this.Sub().Type().selected_obj()
		}
		
	}


	export class $hyoo_studio_value_unit extends $.$hyoo_studio_value_unit {
		
		@ $mol_mem
		visible_tools() {
			return this.hide_tools() ? [] : this.tools()
		}
		
	}
	
}
