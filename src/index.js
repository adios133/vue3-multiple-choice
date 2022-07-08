import MultipleChoice from "./packages/MultipleChoice.vue"

export {MultipleChoice}
const components = [MultipleChoice];
const install = function(App, options) {
	components.forEach((component) => {
		App.component(component.name,component);
	});
};
export default { install } // 批量的引入*