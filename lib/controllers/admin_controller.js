AdminController = RouteController.extend({
    layoutTemplate: 'adminLayout',
    template: 'admin',
    onBeforeAction: function() {
        if (Meteor.userId() && Meteor.user().roles === 'admin') {
          Meteor.subscribe('allPosts');
            this.next();
        } else {
            Router.go('/accessDeny');
        }
    },
    onAfterAction: function(){
        document.title = 'Wuyang Blog | 后台管理面板';
    }
});
