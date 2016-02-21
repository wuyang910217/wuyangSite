
Template.searchPost.helpers({
	getPost: function(){
		var queryText = Session.get('searchText');
		var regExp =new RegExp(queryText,"i");
		return Posts.find({title: regExp},{sort: {publishedOn: -1},limit: 3});
	},
	getCount: function(){
		var queryText = Session.get('searchText');
		var regExp =new RegExp(queryText,"i");
		return Posts.find({title: regExp}).count();
	}
});

Template.searchPost.onRendered(function(){
	$('#showRes').css('display','none');
});

Template.searchPost.events({
	'keyup #search': function(event,template){
		event.preventDefault();
		var queryText = $(event.target).val().trim();
		Session.set('searchText',queryText);
		Meteor.subscribe('searchPost',queryText);
	},
	'focus #search': function(event){
		event.preventDefault();
		$('#showRes').show();
	},
	'blur #search': function(event){
		event.preventDefault();
		$('#search').val("");
		$('#showRes').delay(200).queue(function(){
			$(this).hide().dequeue();});
	}
})
