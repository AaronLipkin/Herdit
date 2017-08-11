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
	User.findOne({username : req.session.username}, (err,loggedUser) => {
	User.findById(req.params.id, (err, foundUser) => {
		Post.find({ _id : { $in : foundUser.posts }}, (err, posts) => {
		res.render('users/show.ejs', {
			UserObject: loggedUser,
			showUser: foundUser,
			user: req.session.username,
			logged: req.session.logged,
			posts: posts
		})
		})
	})
})
})


module.exports = router