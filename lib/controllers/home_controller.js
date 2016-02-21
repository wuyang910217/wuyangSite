HomePageController = RouteController.extend({
    layoutTemplate: 'mainLayout',
    template: 'homePage',
     waitOn: function(){
        return Meteor.subscribe('lastestPosts');
    },
    data: function() {
        return Posts.findOne();
    }
});
 