// Template.adminHeader.onRendered(function() {
//     $('.button-collapse').sideNav();
// });

Template.adminHeader.events({
	'click #logout':  function(event){
		event.preventDefault();
		Meteor.logout();
		Router.go('/login');
	}
});