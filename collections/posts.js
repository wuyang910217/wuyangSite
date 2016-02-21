Posts = new Mongo.Collection('posts');

Pages = new Meteor.Pagination(Posts, {
	router: 'iron-router',
	homeRoute: '/posts/',
	routerTemplate: 'allPost',
	itemTemplate: 'itemPost',
	route: '/posts/page',
	templateName: 'allPost',
	perPage: 10,
	routerLayout: 'mainLayout',
	sort: {publishedOn: -1},
});

