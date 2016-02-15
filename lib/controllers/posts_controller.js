PostsController = RouteController.extend({
    layoutTemplate: 'mainLayout',
    template: 'allPost',
     waitOn: function(){
        return Meteor.subscribe('allPosts');
    },
     onAfterAction: function(){
        document.title = 'Wuyang Blog |All Posts';
    }
});