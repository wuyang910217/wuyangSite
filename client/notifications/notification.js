Template.notification.events({
	'click #toPath': function(){
		var notificationId = event.target.attributes.data.value;
		Meteor.call('updateCommentNotification',notificationId);
		$('#modal1').closeModal();
		Router.go('singlePost',{_id: this.postId});
	}
});