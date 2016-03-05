HomePageController = RouteController.extend({
    layoutTemplate: 'mainLayout',
    template: 'homePage',
     waitOn: function(){
        return [Meteor.subscribe('lastestPosts'),Meteor.subscribe('tags')];
    },
    data: function() {
        return Posts.findOne();
    },
    onAfterAction: function(){
        document.title = '王俊涛（wuyang）的个人博客';
    }
});
