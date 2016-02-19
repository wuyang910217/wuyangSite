Template.editPost.onCreated(function () {
  this.error = new ReactiveVar('');
  this.postId = new ReactiveVar(Template.instance().data._id);
});

Template.editPost.onRendered(function() {
  var post = Template.instance().data;
  // $('#summernote').summernote({
  //   height: 350,
  //   focus: true,
  //   codemirror: {mode: 'javascript'}
  // });
  $('input[name=title]').val(post.title);
  $('input[name=tag]').val(post.tag);
  $('#textarea').val(post.body);
  $('#textarea').trigger('autoresize');
  // $('.note-editable').html(post.body);
});

Template.editPost.helpers({
  error: function() {
    return Template.instance().error.get();
  }
});
 
 function getCategory(){
  var categories =$("input[name=category]");
    for (i=0;i<categories.length;i++) {
      if(categories[i].checked){
        return categories[i].value;
      }
    }
  };
  
Template.editPost.events({
  "click #submit-edit-post": function(event, template) {
    event.preventDefault();
   var post_id = Template.instance().postId.get();
   var category =getCategory();
    var post = {
      title: $('input[name=title').val().trim(),
      tag: $('input[name=tag').val().trim(),
      category: category,
      body: $('#textarea').val().trim(),
      // body: $('#summernote').summernote('code')
    }
    Meteor.call('editPost', post_id, post, function(error) {
      if (error) {
        template.error.set(error.reason);
      }else {
            Router.go('singlePost',{_id: post_id});
      }
    });
  }
});
