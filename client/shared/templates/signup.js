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
        var username = $('input[name=user_name]').val();
        var email = $('input[name=email]').val();
        var password = $('input[name=password]').val();
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
                template.error.set(error.reason);
            } else {
                Router.go('/');
            }
        });
    }
})
