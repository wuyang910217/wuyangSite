Router.configure({
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound'
});

Router.route('/',{
	name: 'root',
	controller: 'HomePageController'
});

Router.route('/accessDeny',{
	name: 'accessDeny',
	template: 'accessDeny',
	onAfterAction: function(){
        document.title = 'Wuyang Blog |Access Deny';
    }
});

Router.route('/about',{
	 layoutTemplate: 'mainLayout',
	name: 'about',
	template: 'about',
	onAfterAction: function(){
        document.title = 'Wuyang Blog |About me';
    }
});

Router.route('/posts', {
             name: 'allPosts',
	controller: 'PostsController'
});
Router.route('/posts/:_id', {
             name: 'singlePost',
	controller: 'SinglePostController'
});

Router.route('/admin/edit/:_id', {
             name: 'editPost',
	controller: 'AdminEditPostController'
});


Router.route('/admin/new-post', {
             name: 'newPost',
	controller: 'AdminNewPostController'
});

Router.route('/admin', {
             name: 'admin',
	controller: 'AdminController'
});

Router.route('/admin/user', {
             name: 'users',
	controller: 'AdminUserController'
});


Router.route('/login', {
  name: 'login',
  controller: 'LoginController'
});

Router.route('/signup', {
  name: 'signup',
  controller: 'SignupController'
});
