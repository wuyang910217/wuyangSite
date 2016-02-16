Meteor.methods({
    newPost: function(postData) {
    var user = Meteor.user();
    postData.authorId = user._id;
    postData.authorName = user.username;
    postData.publishedOn = new Date().getTime();
    postData.summary = postData.body.substring(0, 60).trim();
    if ( user && user.roles==='admin' ) {
      var postId= Posts.insert(postData);
      return {_id: postId};
    }
  },

  editPost: function(postId,postData) {
    var user = Meteor.user();
    postData.authorId = user._id;
    postData.authorName = user.username;
    postData.publishedOn = new Date().getTime();
    postData.summary = postData.body.substring(0, 60).trim();
    if ( user && user.roles==='admin' ) {
      Posts.update(postId, {$set: postData});
    }
  },

  deletePost: function(PostId) {
    var user = Meteor.user();
    var post = Posts.findOne({_id: PostId});
    if ( post.authorId === user._id && user.roles === 'admin' ) {
      Posts.remove({ _id: PostId});
    } 
  },

    addNewUser: function(user) {
        Accounts.createUser(user);
    },

    deleteUser: function(userID) {
    var currentUser = Meteor.user();
    if ( currentUser && currentUser._id !== userID ) {
      Meteor.users.remove(userID);
    } else {
      throw new Meteor.Error('not-allowed', 'Cannot remove logged in user.');
    }
  }
});

Accounts.validateNewUser(function(user) {
    if (user.username.length>=1)
        return true;
    throw new Meteor.Error('wrong-username', 'username too short.');
});

Accounts.onCreateUser(function(options, user) {
    if (options.roles) 
        user.roles = options.roles;
    if (options.profile) 
        user.profile = options.profile;
    return user;
});
