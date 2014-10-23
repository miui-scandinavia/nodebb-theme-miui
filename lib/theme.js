(function(module) {
	"use strict";

	var Theme = {};

	Theme.defineWidgetAreas = function(areas, callback) {
		areas = areas.concat([
			{
				'name': 'Homepage Header',
				'template': 'home.tpl',
				'location': 'header'
			},
			{
				'name': 'Homepage Sidebar',
				'template': 'home.tpl',
				'location': 'sidebar'
			},
			{
				'name': 'Category Sidebar',
				'template': 'category.tpl',
				'location': 'sidebar'
			}
		]);

		callback(null, areas);
	};

	Theme.defineWidgets = function(widgets, callback){
		callback(null, widgets);
	};

	Theme.init = function(app, middleware, controllers, callback) {
		callback();
	};

	module.exports = Theme;

}(module));