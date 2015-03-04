(function(module) {
	"use strict";
	
	var async = require('async'),
		fs = require('fs'),
		path = require('path'),
		templates = module.parent.require('templates.js');

	var theme = {};
	theme.templates = {};

	function renderReadMore(req, res, next){
		res.render('readmore', {});
	}
	function renderDownload(req, res, next){
		res.render('download', {});
	}

	theme.defineWidgetAreas = function(areas, callback) {
		areas = areas.concat([
			{
				'name': 'Homepage Header',
				'template': 'home.tpl',
				'location': 'header'
			},
			{
				'name': 'Homepage Content',
				'template': 'home.tpl',
				'location': 'content'
			},
			{
				name: "Categories Sidebar",
				template: "categories.tpl",
				location: "sidebar"
			},
			{
				name: "Category Sidebar",
				template: "category.tpl",
				location: "sidebar"
			},
			{
				name: "Topic Sidebar",
				template: "topic.tpl",
				location: "sidebar"
			}
		]);

		callback(null, areas);
	};

	theme.defineWidgets = function(widgets, callback){
		widgets = widgets.concat([
			{
				widget: 'infobox',
				name: 'MIUI Information box',
				description: "The MIUI information box.",
				content: 'infobox'
			},
			{
				widget: 'news',
				name: 'MIUI News Topics',
				description: "The MIUI news topics.",
				content: 'news'
			},
			{
				widget: 'footerinfo',
				name: 'MIUI Footer Information',
				description: "Content for the MIUI footer.",
				content: 'footer'
			}
		]);

		callback(null, widgets);
	};

	theme.renderInfoBox = function(widget, callback) {
		var html = Theme.templates['infobox.tpl'];

		html = templates.parse(html, false);

		callback(null, html);
	};

	theme.renderNews = function(widget, callback) {
		var html = Theme.templates['news.tpl'];

		html = templates.parse(html, false);

		callback(null, html);
	};

	theme.renderFooter = function(widget, callback) {
		var html = Theme.templates['footerinfo.tpl'];

		html = templates.parse(html, false);

		callback(null, html);
	};

	theme.init = function(params, callback) {
		var templatesToLoad = [
			'infobox.tpl',
			'news.tpl',
			'footerinfo.tpl'
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

		params.router.get('/readmore', params.middleware.buildHeader, renderReadMore);
		params.router.get('/templates/readmore.tpl', renderReadMore);
		params.router.get('/api/readmore', renderReadMore);

		params.router.get('/download', params.middleware.buildHeader, renderDownload);
		params.router.get('/templates/download.tpl', renderDownload);
		params.router.get('/api/download', renderDownload);

		app.get('/admin/plugins/miui', middleware.admin.buildHeader, renderAdmin);
		app.get('/api/admin/plugins/miui', renderAdmin);


		callback();
	};

	theme.addAdminNavigation = function(header, callback) {
		header.plugins.push({
			route: '/plugins/category-sections',
			icon: 'fa-folder-open-o',
			name: 'Category Sections'
		});

		callback(null, header);
	};


	function renderAdmin(req, res, next) {
		res.render('admin/plugins/lavender', {});
	}

	module.exports = theme;

}(module));