Meteor.publish('allPosts', function() {
    return Posts.find();
});

Meteor.publish('lastestPosts', function() {
    return Posts.find({}, {sort: {publishedOn: -1},limit: 1});
});

Meteor.publish('singlePost', function(postId) {
    check(postId,String);
    return Posts.find({_id: postId});
});

Meteor.publish('searchPost',function(searchText){
    check(searchText.String);
    if (searchText.length===0 || searchText==="") {
        return [];
    }else{
        var regExp =new RegExp(searchText,"i");
    return Posts.find({title: regExp},{sort: {publishedOn: -1},limit: 5});
    }
})

Meteor.publish('editPost', function(postId) {
    check(postId,String);
     var user = Meteor.users.findOne(this.userId);
    if (user.roles === 'admin') {
        return Posts.find({_id: postId});
    } else {
        return [];
    }

});

//查询包含tagName标签的所有文章
Meteor.publish('tagPosts',function(tagName){
  check(tagName,String);
  return Posts.find({tag: tagName});
});

Meteor.publish('post-comment',function(postId){
    check(postId,String);
    return Comments.find({postId: postId});
});

Meteor.publish('notifications', function(){
    return Notifications.find({userId: this.userId,read: false});
});

Meteor.publish('tags', function(){
    return Tags.find({},{sort: {createdAt: -1}});
});

// Meteor.publish('tagPost',function(tagName){
//   return Tags.find({tagName: tagName});
// });

// Meteor.publish('emojis',function(){
//   return Emojis.find();
// });

Meteor.publish(null, function() {
    if (this.userId) {
        return Meteor.users.find({
            _id: this.userId},
        {fields: {profile: 1, username: 1, emails: 1, roles: 1} });
    } else {
        return null;
    }
});

Meteor.publish('get-users', function() {
    if (!this.userId) {
        return [];
    };
    var user = Meteor.users.findOne(this.userId);
    if (user.roles === 'admin') {
        return Meteor.users.find({});
    } else {
        return Meteor.users.find({
            _id: user.id
        });
    }
});
