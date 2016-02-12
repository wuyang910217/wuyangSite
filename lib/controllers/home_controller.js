HomePageController = RouteController.extend({
	layoutTemplate: 'mainLayout',
	template: 'homePage',
	findOptions: function(){
		return {sort: {createAt: -1}};
	},
	waitOn: function(){
		return Meteor.subscribe('allPosts',this.findOptions());
	},
	data: function(){
		return {posts: Posts.find({},this.findOptions())};
	}
});