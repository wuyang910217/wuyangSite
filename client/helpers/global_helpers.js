Template.registerHelper('isAdmin', function(user) {
    if (user && user.roles === 'admin') {
        return true;
    }
});
Template.registerHelper('noPost', function(){
    if (Posts.find().count()===0) {
      return  true;
  } 
});

Template.registerHelper('allPosts', function(){
    return Posts.find( {}, {sort: {publishedOn: -1} } );
});

Template.registerHelper('formatDate', function(d) {
    var date = new Date(d);
    date = date.toLocaleDateString() + " " + date.toLocaleTimeString();
    return date;
});

Template.registerHelper('today', function() {
    var date = new Date();
    date = date.toLocaleDateString() + " 星期" + ('天一二三四五六'.charAt(date.getDay()));
    return date;
});

Template.registerHelper('currentTime', function() {
    var createTime = Math.round(new Date(Date.UTC(2016, 0, 1, 0, 0, 0)).getTime() / 1000);
    var timestamp = Math.round((new Date().getTime() + 8 * 3600 * 1000) / 1000);
    current = secondToDate((timestamp - createTime));
    if (current[0] != '0') {
        currentHtml = current[0] + '年' + current[1] + '天';
    } else {
        currentHtml = current[1] + '天';
    }
    return currentHtml;
});

function secondToDate(second) {
    if (!second) {
        return 0;
    };
    var time = new Array(0, 0, 0, 0, 0);
    if (second >= 365 * 24 * 3600) {
        time[0] = parseInt(second / (365 * 24 * 3600));
        second %= 365 * 24 * 3600;
    };
    if (second >= 24 * 3600) {
        time[1] = parseInt(second / (24 * 3600));
        second %= 24 * 3600;
    };
    if (second >= 3600) {
        time[2] = parseInt(second / 3600);
        second %= 3600;
    };
    if (second >= 60) {
        time[3] = parseInt(second / 60);
        second %= 60;
    };
    if (second > 0) {
        time[4] = second;
    };
    return time;
}

Template.registerHelper('userCount', function() {
    return Meteor.users.find().count();

});

Template.registerHelper('postCount', function() {
    return Posts.find().count();
});
