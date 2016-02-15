Template.admin.onCreated(function () {
  this.error = new ReactiveVar('');
});

Template.admin.onRendered(function() {
  this.deletePostId = new ReactiveVar('');
});

Template.admin.helpers({
  error: function() {
    return Template.instance().error.get();
  }
});

Template.admin.events({
  "click #post-delete": function(event, template) {
    event.preventDefault();
    template.deletePostId.set(event.target.attributes.data.value);
    $('#modal').openModal();
  },
  "click .confirm": function(event,template){
    event.preventDefault();
    var answer=event.target.innerText;
    var postId= template.deletePostId.get();
    if (answer === '确定') {
      Meteor.call('deletePost', postId, function(error) {
      if (error) {
        template.error.set(error.reason);
      }
    });
    }
  }
});

