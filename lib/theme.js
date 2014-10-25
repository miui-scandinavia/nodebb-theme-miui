(function(module) {
	"use strict";

	var async = require('async'),
		fs = require('fs'),
		path = require('path'),
		templates = module.parent.require('templates.js');

	var Theme = {};
	Theme.templates = {};

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
		widgets = widgets.concat([
			{
				widget: 'news',
				name: 'MIUI News Topics',
				description: "The MIUI news topics.",
				content: 'news'
			}
		]);

		callback(null, widgets);
	};

	Theme.renderNews = function(widget, callback) {
		var html = Theme.templates['news.tpl'];

		html = templates.parse(html, false);

		callback(null, html);
	};

	Theme.init = function(app, middleware, controllers, callback) {
		var templatesToLoad = [
			'news.tpl'
		];

		function loadTemplate(template, next) {
			fs.readFile(path.resolve(__dirname, '../templates/' + template), function (err, data) {
				if (err) {
					console.log(err.message);
					return next(err);
				}
				Theme.templates[template] = data.toString();
				next(null);
			});
		}

		async.each(templatesToLoad, loadTemplate);

		callback();
	};

	module.exports = Theme;

}(module));