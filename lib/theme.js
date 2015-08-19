(function(module) {
	"use strict";

        var theme = {},
			meta = module.parent.require('./meta'),
			path = module.parent.require('path'),
			nconf = module.parent.require('nconf'),
			async = require('async'),
			fs = require('fs'),
			templates = require.main.require('templates.js');

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
		var html = theme.templates['infobox.tpl'];

		html = templates.parse(html, false);

		callback(null, html);
	};

	theme.renderNews = function(widget, callback) {
		var html = theme.templates['news.tpl'];

		html = templates.parse(html, false);

		callback(null, html);
	};

	theme.renderFooter = function(widget, callback) {
		var html = theme.templates['footerinfo.tpl'];

		html = templates.parse(html, false);

		callback(null, html);
	}

	theme.preinit = function(params, callback) {
		nconf.set('base_templates_path', path.join(nconf.get('themes_path'), 'nodebb-theme-vanilla/templates'));

		callback();
	};

	theme.init = function(params, callback) {
		var app = params.router,
			middleware = params.middleware;

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
				theme.templates[template] = data.toString();
				next(null);
			});
		}

		async.each(templatesToLoad, loadTemplate);

		app.get('/readmore', params.middleware.buildHeader, renderReadMore);
		app.get('/templates/readmore.tpl', renderReadMore);
		app.get('/api/readmore', renderReadMore);

		app.get('/download', params.middleware.buildHeader, renderDownload);
		app.get('/templates/download.tpl', renderDownload);
		app.get('/api/download', renderDownload);

		app.get('/admin/plugins/miui', middleware.admin.buildHeader, renderAdmin);
		app.get('/api/admin/plugins/miui', renderAdmin);


		callback();
	};

	theme.addAdminNavigation = function(header, callback) {
		header.plugins.push({
			route: '/plugins/miui',
			icon: 'fa-paint-brush',
			name: 'MIUI Theme'
		});

		callback(null, header);
	};

	theme.getConfig = function(config, callback) {
		config.disableMasonry = !!parseInt(meta.config.disableMasonry, 10);
		callback(false, config);
	};

	function renderAdmin(req, res, next) {
		res.render('admin/plugins/lavender', {});
	}

	module.exports = theme;

}(module));
