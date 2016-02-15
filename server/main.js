
if (Meteor.users.find().count() === 0) {
  var userObj = {
      username: 'admin', 
      email: 'admin@example.com', 
      password: 'admin',
      profile: {name: 'Admin'},
      roles: 'admin',
    };
  Accounts.createUser(userObj);
}
