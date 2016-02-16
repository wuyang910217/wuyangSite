Template.editPost.onCreated(function () {
  this.error = new ReactiveVar('');
});

Template.editPost.onRendered(function() {
  var post = Template.instance().data;
  $('#summernote').summernote({
    height: 350,
    focus: true,
    codemirror: {mode: 'javascript'}
  });
  $('input[name=title]').val(post.title);
  $('input[name=tag]').val(post.tag);
  $('.note-editable').html(post.body);
  // $('#summernote').summernote('code').val(post.body);
});

Template.editPost.helpers({
  error: function() {
    return Template.instance().error.get();
  }
});
 
Template.editPost.events({
  "click #submit-edit-post": function(event, template) {
    event.preventDefault();
    var id = template.data._id;
    var post = {
      title: $('input[name=title').val().trim(),
      tag: $('input[name=tag').val().trim(),
      body: $('#summernote').summernote('code')
    }
    Meteor.call('editPost', id, post, function(error) {
      if (error) {
        template.error.set(error.reason);
      }else {
            Router.go('singlePost',{_id: id});
      }
    });
  }
});
