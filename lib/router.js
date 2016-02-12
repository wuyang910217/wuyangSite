Router.configure({
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound'
});

Router.route('/',{
	name: 'root',
	controller: 'HomePageController'
});

Router.route('/new',{
	name: 'newPost',
	controller: 'NewPostController'
});

Router.route('/admin', {
             name: 'admin',
	controller: 'AdminController'
});

Router.route('/login', {
  name: 'login',
  controller: 'LoginController'
});

Router.route('/signup', {
  name: 'signup',
  controller: 'SignupController'
});

