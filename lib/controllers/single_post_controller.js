SinglePostController = RouteController.extend({
    layoutTemplate: 'mainLayout',
    template: 'singlePost',
    data: function() {
      return Posts.findOne(this.params._id);
    },
    waitOn: function(){
        return Meteor.subscribe('singlePost', this.params._id);
    },
    onAfterAction: function() {
        var postFound = this.data();
        document.title = postFound.title +'——Wuyang Blog';
    }
});
