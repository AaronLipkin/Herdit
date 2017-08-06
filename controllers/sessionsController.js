const express = require('express');
const router  = express.Router();
const User    = require('../models/usersModel');
const bcrypt = require('bcryptjs');

router.get('/login', (req, res, next) =>{

  res.render('users/login.ejs', {message: req.session.message || ''})
})



router.get('/register', (req, res, next) => {
  res.render('users/register.ejs', {})
})

router.post('/login', (req, res, next) => {

  User.findOne({username: req.body.username}, (err, user) => {

      if(user){
                     //now compare hash with the password from the form
            if(bcrypt.compareSync(req.body.password, user.password)){
                req.session.message  = '';
                req.session.username = req.body.username;
                req.session.logged   = true;
                console.log(req.session, req.body)

                res.redirect('/')
            } else {
              console.log('else in bcrypt compare')
              req.session.message = 'Username or password are incorrect';
              res.redirect('/sessions/login')

            }

      } else {

          req.session.message = 'Username or password are incorrect';
          res.redirect('/sessions/login')

      } //end of if user
  });

})



router.post('/register', (req, res, next) => {

  // first we are going to hash the password
  const password = req.body.password;
  const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  // lets create a object for our db entry;
  const userDbEntry = {};
  userDbEntry.username = req.body.username;
  userDbEntry.password = passwordHash

  // lets put the password into the database
  User.create(userDbEntry, (err, user) => {
    console.log(user)

    // lets set up the session in here we can use the same code we created in the login
    req.session.username = user.username;
    req.session.logged   = true;
    res.redirect('/')
  });

})


router.get('/logout', function(req, res){
  req.session.destroy(function(err){
    res.redirect('/')
  })
})




// export the controller
module.exports = router;
