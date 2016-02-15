Meteor.publish('allPosts', function() {
    return Posts.find();
});

Meteor.publish('lastestPosts', function() {
    return Posts.find({}, {sort: {publishedOn: -1} });
});

Meteor.publish('singlePost', function(postId) {
    return Posts.find({_id: postId});
});

Meteor.publish('editPost', function(postId) {
     var user = Meteor.users.findOne(this.userId);
    if (user.roles === 'admin') {
        return Posts.find({_id: postId});
    } else {
        return [];
    }
    
});


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
