Template.comment.onCreated(function () {
  this.error = new ReactiveVar('');
  this.postId = new ReactiveVar(Template.instance().data._id);
  Meteor.subscribe('post-comment',this.postId.curValue);
  // Meteor.subscribe('emojis');
});

Template.comment.helpers({
  error: function() {
    return Template.instance().error.get();
  },
  comments: function(){
  	var post_id = Template.instance().postId.get();
  	return Comments.find({postId: post_id},{sort: {createdAt: -1}});
  }
});

Template.comment.events({
  "click #submit-comment": function(event, template) {
    event.preventDefault();
    template.error.set('');
    var post_id = Template.instance().postId.get();
    var content = $('#textarea').val().trim();
    // var content = content.replace(/\n\t/g, '');
    var commentData = {
    	postId: post_id,
    	content: content,
    };
    Meteor.call('newComment', commentData,function(error) {
      if (error) {
        template.error.set(error.reason);
      }
    });
    document.getElementById("comment").reset();
  },

  "click #delete-comment": function(event,template){
    event.preventDefault();
    var post_id = Template.instance().data._id;
    var commentId = event.target.attributes.data.value;
    // console.log(post_id+commentId);
    Meteor.call('deleteComment',commentId,post_id,function(error){
      if (error) {
 template.error.set(error.reason);
      }
    });
  },

  "click #btn-like": function(event,template){
    event.preventDefault();
    var post_id = Template.instance().postId.get();
    Meteor.call('postLike',post_id);
    Materialize.toast('谢谢，我会继续努力的!',2000);
},
  "click #btn-unlike": function(event,template){
    event.preventDefault();
    var post_id =  Template.instance().postId.get();
     Meteor.call('postUnLike',post_id);
    Materialize.toast('别担心，我不会气馁的!',2000);
}
});
