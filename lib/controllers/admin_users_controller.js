AdminUserController = RouteController.extend({
    layoutTemplate: 'adminLayout',
    template: 'adminUser',
    onBeforeAction: function() {
        if (Meteor.userId() && Meteor.user().roles === 'admin') {
            Meteor.subscribe('get-users');
            this.next();
        } else {
            Router.go('accessDeny');
        }
    },
    // 此时不能用waitOn，因为它先执行，而后才执行验证程序，导致你不想显示的默认模板渲染了出来，
    // 而不是直接跳转到没有权限页面,所以要放在验证成功的程序里
    // waitOn: function() {
    //     return Meteor.subscribe('get-users');
    // },
    onAfterAction: function() {
        document.title = 'Wuyang Blog | 后台 | 管理所有用户';
    }
});
