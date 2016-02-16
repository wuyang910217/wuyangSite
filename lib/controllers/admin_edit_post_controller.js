AdminEditPostController = RouteController.extend({
    layoutTemplate: 'adminLayout',
    template: 'editPost',
    data: function(){
       return Posts.findOne(this.params._id);
    },
    onBeforeAction: function() {
        if (Meteor.userId() && Meteor.user().roles === 'admin') {
            Meteor.subscribe('editPost',this.params._id);
            this.next();
        } else {
            Router.go('/accessDeny');
        }
    }
});