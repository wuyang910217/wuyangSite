Template.login.onCreated(function() {
    this.error = new ReactiveVar('');

});

Template.login.helpers({
    error: function() {
        return Template.instance().error.get();
    }
});

Template.login.events({
    'click #login': function(event, template) {
        event.preventDefault();
        template.error.set("");
        var email = $('input[name=email]').val();
        var password = $('input[name=password]').val();

        Meteor.loginWithPassword(email, password, function(error) {
            if (error) {
                if (error.reason === 'Incorrect password'){
                template.error.set('密码错误');
                }else if (error.reason === 'Match failed') {
                template.error.set('请输入你的邮箱');
                }else if (error.reason === 'User not found') {
                template.error.set('此邮箱还没有注册');
                } else{
                template.error.set(error.reason);
                }
            } else {
                Router.go('/');
            }
        });
        document.getElementById('login-form').reset();
    }
})
