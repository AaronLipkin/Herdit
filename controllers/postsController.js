const express = require('express');
const router = express.Router();
const Post = require('../models/postsModel.js');
const User = require('../models/usersModel.js')

router.get('/new', (req, res) => {
	res.render('posts/new.ejs')
})

router.post('/new', (req, res) => {
	req.body.user = req.session.username;
	Post.create(req.body, (err, newPost)=> {
		console.log(newPost)
		res.redirect('/posts/' + newPost._id)
	})
})


router.get('/:id', (req, res) => {
	Post.findById(req.params.id, (err, foundPost) => {
		res.render('posts/show.ejs', {
			post: foundPost
		})
	})
})


module.exports = router