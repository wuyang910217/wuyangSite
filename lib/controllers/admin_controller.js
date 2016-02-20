AdminController = RouteController.extend({
    layoutTemplate: 'adminLayout',
    template: 'admin',
    onBeforeAction: function() {
        Pages.unsubscribe();
        if (Meteor.userId() && Meteor.user().roles === 'admin') {
            this.next();
        } else {
            Router.go('/accessDeny');
        }
    },
    waitOn: function(){
        return Meteor.subscribe('allPosts');
    },
    onAfterAction: function(){
        document.title = 'Wuyang Blog | Admin | Dashboard';
    }
});
