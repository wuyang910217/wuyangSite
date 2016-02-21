Notifications = new Mongo.Collection('notifications');

  createCommentNotification=function(comment) {
        var post = Posts.findOne(comment.postId);
        if (comment.authorId !== post.authorId) {
            Notifications.insert({
                userId: post.authorId,
                postId: post._id,
                title: post.title,
                commentId: comment._id,
                commenterName: comment.authorName,
                createdAt: new Date(),
                read: false
            });
        }
    };