Template.newPost.onCreated(function () {
  this.error = new ReactiveVar('');
});

// Template.newPost.onRendered(function() {
  // $('#summernote').summernote({
  //   height: 350,
  //   focus: true,
  //   codemirror: {mode: 'javascript'}
  // });
// });

Template.newPost.helpers({
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

Template.newPost.events({
  "click #submit-post": function(event,template) {
    event.preventDefault();
    template.error.set('');
    var category =getCategory();
    var tag=$('input[name=tag]').val().trim();
    var tagArray=getTag(tag);
    var post = {
      title: $('input[name=title]').val().trim(),
      category: category,
      tag: tagArray,
      body: $('#textarea').val().trim(),
      // body: $('#summernote').summernote('code')
    };
    Meteor.call('newPost', post, function(error,result) {
      if (error) {
        template.error.set(error.reason);
      }else {
            Router.go('singlePost',{_id: result._id});
      }
    });
  }
});

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
