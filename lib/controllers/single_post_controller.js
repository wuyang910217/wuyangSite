SinglePostController = RouteController.extend({
    layoutTemplate: 'mainLayout',
    template: 'singlePost',
     waitOn: function(){
        return Meteor.subscribe('singlePost',this.params._id);
    },
    data: function(){
    	return Posts.findOne();
    },
    onBeforeAction: function () {
    var postFound = this.data();
    if ( !postFound || postFound === undefined) {
      Router.go('/notFound');
    }
  }
});
