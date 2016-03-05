AdminNewPostController = RouteController.extend({
    layoutTemplate: 'adminLayout',
    template: 'newPost',
    onBeforeAction: function() {
        if (Meteor.userId() && Meteor.user().roles === 'admin') {
            this.next();
        } else {
            Router.go('/accessDeny');
        }
    },
    onAfterAction: function(){
        document.title = 'Wuyang Blog | 写文章';
    }
});
