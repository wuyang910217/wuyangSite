// Template.allTags.onRendered(function(){
//   Meteor.subscribe('tags');
// });

Template.allTags.helpers({
  allTags: function(){
    return Tags.find({},{sort: {createdAt: -1}});
  }
});
