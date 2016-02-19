Template.adminHeader.onRendered(function() {
    // $('.button-collapse').sideNav();
    // $('.dropdown-button').dropdown();
    Meteor.subscribe('notifications');
});

Template.adminHeader.helpers({
    notifications: function() {
        return Notifications.find({
            userId: Meteor.userId(),
            read: false
        });
    },
    notificationCount: function() {
        return Notifications.find({
            userId: Meteor.userId(),
            read: false
        }).count();
    }
});

Template.adminHeader.events({
    'click #logout': function(event) {
        event.preventDefault();
        Meteor.logout();
        Materialize.toast('退出成功!',2000)
        Router.go('/');
    },
    'click #notify': function(event) {
        event.preventDefault();
        $('#modal1').openModal();
    },
    'click #clearAllNotify': function(event) {
        event.preventDefault();
        Meteor.call('clearCommentNotification');
        Materialize.toast('已清空!',2000);
    }
});
