Template.signup.onCreated(function() {
    this.error = new ReactiveVar('');
});

Template.signup.helpers({
    error: function() {
        return Template.instance().error.get();
    }
});

Template.signup.events({
    'click #register': function(event, template) {
        event.preventDefault();
        template.error.set('');
        var username = $('input[name=user_name]').val().trim();
        var email = $('input[name=email]').val().trim();
        var password = $('input[name=password]').val().trim();
        var profile = {
            name: username
        };
        var roles = 'user';
        var userObj = {
            username: username,
            email: email,
            password: password,
            profile: profile,
            roles: roles,
        };
        document.getElementById('signup-form').reset();
        Meteor.call('addNewUser', userObj, function(error) {
            if (error) {
                // console.log(error.reason);
                if (error.reason === 'Email already exists.') {
                    template.error.set('邮箱已经被注册了');
                }else if (error.reason === 'Need to set a username or email') {
                    template.error.set('请输入你的用户名和邮箱');
                } else{
                    template.error.set(error.reason);
                }
            } else {
                Router.go('/');
            }
        });
    }
})
