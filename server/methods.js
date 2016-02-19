Meteor.methods({
    newPost: function(postData) {
        var user = Meteor.user();
        check(postData, {
            title: String,
            category: String,
            tag: String,
            body: String
        });
        if (!postData.title) {
            throw new Meteor.Error('not-title', '没有标题的文章不是好的作家 。。。');
        };
        if (postData.title.length < 5) {
            throw new Meteor.Error('less-title', '这么少的标题你准备糊弄谁呢,至少5个字啊');
        };
        var isTitleExist = Posts.findOne({
            title: postData.title
        });
        if (isTitleExist) {
            throw new Meteor.Error('exist-title', '已经有这样的标题了,换一个吧');
        };
        if (!postData.tag) {
            throw new Meteor.Error('not-tag', '没有标签的文章不是好的程序员。。。');
        };
        if (!postData.body) {
            throw new Meteor.Error('not-body', '没有内容的文章不是好的诗人。。。');
        };
        postData.authorId = user._id;
        postData.authorName = user.username;
        postData.publishedOn = new Date().getTime();
        postData.commentsCount = 0;
        postData.likesCount = 0;
        postData.unlikesCount = 0;
        // postData.summary = postData.body.substring(0, 60).trim();
        if (user && user.roles === 'admin') {
            var postId = Posts.insert(postData);
            return {
                _id: postId
            };
        }
    },

    editPost: function(postId, postData) {
        var user = Meteor.user();
        check(postData, {
            title: String,
            category: String,
            tag: String,
            body: String
        });
        if (!postData.title) {
            throw new Meteor.Error('not-title', '没有标题的文章不是好的作家。。。');
        };
        if (postData.title.length < 5) {
            throw new Meteor.Error('less-title', '这么少的标题你准备糊弄谁呢,至少5个字啊');
        };
        if (!postData.tag) {
            throw new Meteor.Error('not-tag', '没有标签的文章不是好的程序员。。。');
        };
        if (!postData.body) {
            throw new Meteor.Error('not-body', '没有内容的文章不是好的诗人。。。');
        };
        // postData.authorId = user._id;
        // postData.authorName = user.username;
        postData.publishedOn = new Date().getTime();
        // postData.summary = postData.body.substring(0, 60).trim();
        if (user && user.roles === 'admin') {
            Posts.update(postId, {
                $set: postData
            });
        }
    },

    deletePost: function(PostId) {
        var user = Meteor.user();
        check(PostId, String);
        var post = Posts.findOne({
            _id: PostId
        });
        if (post.authorId === user._id && user.roles === 'admin') {
            Posts.remove({
                _id: PostId
            });
            Comments.remove({
                postId: PostId
            });
            Notifications.remove({
                postId: PostId
            });
        }
    },

    postLike: function(postId) {
        check(postId, String);
        Posts.update(postId, {
            $inc: {
                likesCount: 1
            }
        });
    },
    postUnLike: function(postId) {
        check(postId, String);
        Posts.update(postId, {
            $inc: {
                unlikesCount: 1
            }
        });
    },

    newComment: function(commentData) {
        var currentUser = Meteor.user();
        check(commentData, {
            content: String,
            postId: String
        });
        if (!commentData.content) {
            throw new Meteor.Error('not-content', '没有内容的评论不是好的评论');
        };
        commentData.authorId = currentUser._id;
        commentData.authorName = currentUser.username;
        commentData.createdAt = new Date().getTime();
        if (currentUser) {
            Posts.update(commentData.postId, {
                $inc: {
                    commentsCount: 1
                }
            });
            commentData._id = Comments.insert(commentData);
            createCommentNotification(commentData);
        };
    },

    deleteComment: function(commentId, PostId) {
        var user = Meteor.user();
        if (user && user.roles === 'admin') {
            Posts.update(PostId, {
                $inc: {
                    commentsCount: -1
                }
            });
            Comments.remove({
                _id: commentId
            });
            Notifications.remove({
               commentId: commentId
            });
        }
    },

    updateCommentNotification: function(notifyId) {
        Notifications.update(notifyId, {
            $set: {
                read: true
            }
        });
    },
    clearCommentNotification: function() {
        Notifications.remove({
            read: false
        });
    },

    addNewUser: function(user) {
        Accounts.createUser(user);
    },

    deleteUser: function(userID) {
        var currentUser = Meteor.user();
        if (currentUser && currentUser._id !== userID) {
            Meteor.users.remove(userID);
        } else {
            throw new Meteor.Error('not-allowed', 'Cannot remove logged in user.');
        }
    }
});

 createCommentNotification=function(comment) {
        var post = Posts.findOne(comment.postId);
        if (comment.authorId !== post.authorId) {
            Notifications.insert({
                userId: post.authorId,
                postId: post._id,
                commentId: comment._id,
                commenterName: comment.authorName,
                createdAt: new Date(),
                read: false
            });
        }
    };

Accounts.validateNewUser(function(user) {
    if (!user.username)
        throw new Meteor.Error('wrong-username', '请输入用户名');
    if (!isNaN(user.username))
        throw new Meteor.Error('wrong-username', '请不要单纯地输入数字');
    return true;
});

Accounts.onCreateUser(function(options, user) {
    if (options.roles)
        user.roles = options.roles;
    if (options.profile)
        user.profile = options.profile;
    if (!options.email)
        throw new Meteor.Error('wrong-email', '请输入你的邮箱');
    if (options.password.length <= 5)
        throw new Meteor.Error('wrong-password', '大神，你的密码太短了');
    return user;
});
