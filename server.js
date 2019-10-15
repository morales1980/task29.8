const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/nodeappdatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

//=========================== CREATE USERS
//new user Schema
const userSchema = new Schema({
  name: String,
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  admin: Boolean,
  created_at: Date,
  updated_at: Date
});

// Mongoose schema method
userSchema.methods.manify = function(next) {
  this.name = this.name + '-boy';

  return next(null, this.name);
};
//pre-save method
userSchema.pre('save', function(next) {
  const currentDate = new Date();

  this.updated_at = currentDate;

  if(!this.created_at) {
    this.created_at = currentDate;
  }

  next();
});

const User = mongoose.model('User', userSchema);
//
//new User instance
// const kenny = new User({
//   name: 'Kenny',
//   username: 'Kenny_the_boy',
//   password: 'kennys_password'
// });
//
// //calling my custom method
// kenny.manify(function(error, name) {
//   if(error) {
//     throw error;
//   }
//   console.log('Twoje nowe imie to: ' + name);
// });
//
// //calling moongose built in method to save user to database
// kenny.save(function(error) {
//   if(error) {
//     throw error;
//   }
//   console.log('Użytkownik ' + kenny.name + ' zapisany pomyślnie');
// });
//
// const benny = new User({
//   name: 'Benny',
//   username: 'Benny_the_boy',
//   password: 'bennys_password'
// });
//
// benny.manify(function(error, name) {
//   if (error) {
//     throw error;
//   }
//   console.log('Twoje nowe imie to: ' + name);
// });
//
// benny.save(function(error) {
//   if(error) {
//     throw error;
//   }
//   console.log('Użytkownik ' + benny.name + ' zapisany pomyślnie');
// });
//
// const mark = new User({
//   name: 'Mark',
//   username: 'Mark_the_boy',
//   password: 'marks_password'
// });
//
// mark.manify(function(error, name) {
//   if(error) {
//     throw error;
//   }
//   console.log('Twoje nowe imie to: ' + name);
// });
//
// mark.save(function(error) {
//   if(error) {
//     throw error;
//   }
//   console.log('Użytkownik ' + mark.name + ' zapisany pomyślnie');
// });

//=========================== C R U D operations

//CRUD find all users vanillaJS style
//
// User.find({}, function(error, response) {
//   if(error) {
//     throw error;
//   }
//   console.log('VANILLA, W tej chwili w bazie sa zarejestrowane nastepujace rekordy: ' + response);
// })
//
// // CRUD find all users ES6 style
// const query = User.find();
// const promise = query.exec();
// promise.then(function(records) {
//   console.log('ES6, W tej chwili w bazie sa zarejestrowane nastepujace rekordy: ' + records);
// });
// promise.catch(function(error) {
//   console.log('Something went wrong: ', reason);
// })

// CRUD find user "Kenny_the_boy" vanillaJS style
// User.find({username: 'Kenny_the_boy'}).exec(function(error, response) {
//   if (error) throw error;
//   console.log('Record you are looking for is: ' + response);
// });

//CRUD find user "Kenny_the_boy" ES6 style
// const queryKenny = User.find({username: "Kenny_the_boy"});
// const promiseKenny = queryKenny.exec();
// promiseKenny.then(function(records) {
//   console.log('Record you are looking for is: ' + records);
// });
// promiseKenny.catch(function(error) {
//   console.log('Something went wrong: ', reason);
// })

//CRUD change (read, update and save) data to document vanillaJS style
// User.find({username: 'Mark_the_boy'}).exec(function(error, user) {
//   if(error) throw error;
//   console.log('Old password is: ' + user[0].password);
//   user[0].password = 'new_markys_password';
//   console.log('New password is: ' + user[0].password);
//
//   user[0].save(function(error) {
//     if(error) throw error;
//     console.log('New ' + user[0].name + ' Password has been changed at: ' +  user[0].updated_at);
//   });
// });

//CRUD change (read, update and save) data to document ES6 style
// const queryMark = User.find({username: 'Mark_the_boy'});
// const updateMarkPasswordPromise = queryMark.exec();
// updateMarkPasswordPromise
//   .then(function(user) {
//     console.log('Old password is ' + user[0].password);
//     user[0].password = 'new_markys_password';
//     console.log('New password is ' + user[0].password + ' Password has been changed at: ' +  user[0].updated_at);
//   })
//   .catch(function(error) {
//     console.log('Something went wrong ', error);
//   });

//CRUD change same as above but faster
// User.findOneAndUpdate(
//   {username: 'Mark_the_boy'},
//   {password: 'yet_another_new_password_again'},
//   {new: true},
//   function(error, user) {
//     if(error) throw error;
//
//     console.log('New password is: ' + user.password + ' Password changed successfully');
//   }
// );

//CRUD remove data from document vanillaJS style
// User.find({username: 'Mark_the_boy'}, function(error, user) {
//   if(error) throw error;
//   user = user[0];
//   user.remove(function(error) {
//     if(error) throw error;
//
//     console.log('User successfully deleted');
//   });
// });

//CRUD remove data from document ES6 style
// const queryBenny = User.find({username: 'Benny_the_boy'});
// const removeBennyPromise = queryBenny.exec();
// removeBennyPromise
//   .then(function(user) {
//     user[0].remove();
//     console.log('User successfully deleted');
//   })
//   .catch(function(error) {
//     if(error) throw error;
//   });

//CRUD remove same as above but faster
// User.findOneAndRemove({username: 'Mark_the_boy'}, function(error) {
//   if(error) throw error;
//
//   console.log('User succesfully deleted!');
// });
//

//=========================== C R U D Using Promise.all

// define user instances
const kenny = new User({
  name: 'Kenny',
  username: 'Kenny_the_boy',
  password: 'password'
});

kenny.manify(function(error, name) {
  if(error) throw error;
  console.log('Your new name is: ' + name);
});

const benny = new User({
  name: 'Benny',
  username: 'Benny_the_boy',
  password: 'password'
});

benny.manify(function(error, name) {
  if(error) throw error;
  console.log('Your new name is: ' + name);
})

const mark = new User({
  name: 'Mark',
  username: 'Mark_the_boy',
  password: 'password'
});

mark.manify(function(error, name) {
  if(error) throw error;
  console.log('Your new name is: ' + name);
})

//define operations on db.users
const findAllUsers = function() {
  //find all users record
  return User.find({}, function(error, response) {
    if(error) throw error;
    console.log('Present database records are: ' + response);
  });
}

const findSpecificRecord = function() {
  //find specific record
  return User.find({username: 'Kenny_the_boy'}, function(error, response) {
    if(error) throw error;
    console.log('User you are looking for is: ' + response);
  });
}

const updateUserPassword = function() {
  //update user pasword
  return User.findOne({username: 'Kenny_the_boy'})
    .then(function(user) {
      console.log('Old password is: ' + user.password);
      console.log('Name ' + user.name);
      user.password = 'newPassword';
      console.log('New password is: ' + user.password);
      return user.save(function(error) {
        if(error) throw error;
        console.log('User ' + user.name + ' has been successfully updated.');
      });
    })
    .catch(function(error) {
      if(error) throw error;
    });
}

const updateUsername = function() {
  // update username
  return User.findOneAndUpdate({ username: 'Benny_the_boy' }, { username: 'Benny_the_man' }, { new: true }, function(error, user) {
      if (error) throw error;
      console.log('User name after update is ' + user.username);
  })
}

const findMarkAndDelete = function() {
  //find specific user and delete
  return User.findOne({username: 'Mark_the_boy'})
    .then(function(user) {
      return user.remove(function() {
        console.log('User ' + user.username + ' has been successfully deleted');
        console.log('User has been successfully deleted');
      });
    });
}

const findKennyAndDelete = function() {
  //find specific user and delete
  return User.findOne({username: 'Kenny_the_boy'})
    .then(function(user) {
      return user.remove(function() {
        console.log('User ' + user.username + ' has been successfully deleted');
        console.log('User has been successfully deleted');
      });
    });
}

const findBennyAndRemove = function() {
  return User.findOneAndRemove({username: 'Benny_the_boy'})
    .then(function(user) {
      return user.remove(function() {
        console.log('User ' + user.username + ' has been successfully deleted');
        console.log('User has been successfully deleted');
      });
    });
}

Promise.all([kenny.save(), mark.save(), benny.save()])
.then(findAllUsers)
.then(findSpecificRecord)
.then(updateUserPassword)
.then(updateUsername)
.then(findMarkAndDelete)
.then(findKennyAndDelete)
.then(findBennyAndRemove)
.catch(console.log.bind(console))
