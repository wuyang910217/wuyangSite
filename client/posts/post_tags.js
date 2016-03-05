Template.tagPost.onCreated(function () {
  var tagName= Iron.controller().params.tagName;
  document.title =tagName+' | Wuyang Blog';
});

Template.tagPost.helpers({
  allTagPost: function(){
    var tagName= Iron.controller().params.tagName;
    return Posts.find({tag: tagName},{sort: {publishedOn: -1}});
  },
  postCount: function(){
    var tagName= Iron.controller().params.tagName;
    return Posts.find({tag: tagName}).count();
  },
  noTag: function(){
    var tagName= Iron.controller().params.tagName;
    var count = Posts.find({tag: tagName}).count();
    if (count === 0) {
      return true;
    }
  },
});
