SignupController = RouteController.extend({
    layoutTemplate: 'mainLayout',
    template: "signup",
    // onBeforeAction: function(){
    // 	if (Meteor.userId()) {
    // 		Router.go('/');
    // 	} else{
    // 		this.render();
    // 	}
    // },
    onAfterAction: function(){
    	document.title = 'Wuyang Blog | Signup';
    }
})