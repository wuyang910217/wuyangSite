AdminEditPostController = RouteController.extend({
    layoutTemplate: 'adminLayout',
    template: 'editPost',
     waitOn: function(){
        return Meteor.subscribe('editPost',this.params._id);
    },
    data: function(){
        return Posts.findOne();
    },
    onBeforeAction: function() {
        if (Meteor.userId() && Meteor.user().roles === 'admin') {
            this.next();
        } else {
            Router.go('/accessDeny');
        }
    },
    onAfterAction: function(){
        document.title = 'Wuyang Blog | Admin | Edit Post';
        var postFound = this.data();
    if ( !postFound || postFound === undefined) {
      Router.go('/notFound');
    }
    }
});