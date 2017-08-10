const express = require('express');
const router = express.Router();
const Post = require('../models/postsModel.js');
const User = require('../models/usersModel.js')

router.get('/new', (req, res) => {
	res.render('users/new.ejs')
})

router.post('/new', (req, res) => {
	User.create(req.body, (err, newUser)=> {
		console.log(newUser)
		res.redirect('/users/' + newUser._id)
	})
})


router.get('/:id', (req, res) => {
	User.findById(req.params.id, (err, foundUser) => {
		res.render('users/show.ejs', {
			showuser: foundUser,
			user: req.session.username,
			logged: req.session.logged,
			UserObject: foundUser
		})
	})
})


module.exports = router