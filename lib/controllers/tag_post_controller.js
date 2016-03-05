tagPostController = RouteController.extend({
    layoutTemplate: 'mainLayout',
    template: 'tagPost',
    waitOn: function(){
        return Meteor.subscribe('tagPosts', this.params.tagName);
    }
});
