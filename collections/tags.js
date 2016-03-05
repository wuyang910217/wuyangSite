Tags = new Mongo.Collection('tags');

createPostTag=function(postId) {
  var post = Posts.findOne({_id: postId});
  for (var i = 0; i <post.tag.length; i++) {
    var tag = Tags.findOne({tagName: post.tag[i]});
    if (tag) {
      Tags.update({_id: tag._id},{$push: {postIdArray: postId},$inc: {count: 1}});
    }else {
      Tags.insert({
         postIdArray: [postId],
         count: 1,
         createdAt: new Date(),
         tagName: post.tag[i]
      });
    }
  }
};

deletePostTag = function(post){
  for (var i = 0; i < post.tag.length; i++) {
    var tag = Tags.findOne({tagName: post.tag[i]});
    if (tag.count == 1) {
      Tags.remove({_id: tag._id});
    }else{
      Tags.update({_id: tag._id},{$pull: {postIdArray: post._id},$inc: {count: -1}});
    }
  }
};

editPostTag=function(postId,newTag) {
  var post = Posts.findOne({_id: postId});
  //先全部删除当前文章中的标签
  deletePostTag(post);
  //重新插入新输入的标签
  for (var i = 0; i <newTag.length; i++) {
    var tag = Tags.findOne({tagName: newTag[i]});
    if (tag) {
      Tags.update({_id: tag._id},{$push: {postIdArray: postId},$inc: {count: 1}});
    }else {
      Tags.insert({
         postIdArray: [postId],
         count: 1,
         createdAt: new Date(),
         tagName: newTag[i]
      });
    }
  }
};
