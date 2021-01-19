module.exports = (plop) => {
	plop.setGenerator("component", {
		description: "创建一个组件",
		prompts: [
			{
				type: "input",
				name: "name",
				message: "组件名称：",
				default: "MyComponent",
			},
		],
		actions: [
			{
                type: "add",
                path:"src/views/{{name}}.vue",
                templateFile:"plop_templates/component.hbs"
            },
		],
    })
 
}
