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
  var tagName ="";
  for (var i = 0; i < post.tag.length; i++) {
    tagName = tagName+post.tag[i]+" ";
  }
  $('input[name=tag]').val(tagName);

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
  function getTag(tag){
  var tagArray = tag.split(' ');
  for(var i =0,len=tagArray.length;i<len;i++){
    if (tagArray[i]=="" || !tagArray[i]) {
      tagArray.splice(i,1);
      len--;
      i--;
    }
  }
  for (var i = tagArray.length - 1; i >= 0; i--) {
    tagArray[i]=tagArray[i].slice(0,1).toUpperCase()+tagArray[i].slice(1);
    }

  return tagArray;
  };
Template.editPost.events({
  "click #submit-edit-post": function(event, template) {
    event.preventDefault();
   var post_id = Template.instance().postId.get();
   var category =getCategory();
   var tag=$('input[name=tag]').val().trim();
    var tagArray=getTag(tag);
    var post = {
      title: $('input[name=title').val().trim(),
      tag: tagArray,
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
