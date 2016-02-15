LoginController = RouteController.extend({
    layoutTemplate: 'mainLayout',
    template: "login",
    onBeforeAction: function(){
    	if (Meteor.userId()) {
    		Router.go('/');
    	} else{
    		this.render();
    	}
    },
    onAfterAction: function(){
    	document.title = 'Wuyang Blog | Login';
    }
})
