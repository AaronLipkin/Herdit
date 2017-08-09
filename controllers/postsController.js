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


router.post('/:id/like', (req,res)=> {
	if(req.session.logged) {
		User.findOne({username: req.session.username}, (err,foundUser)=> {
		Post.findById(req.params.id, (err, foundPost) => {
				if(foundUser.likedPosts.indexOf(foundPost._id) !== -1) {
					foundPost.likes--
					foundUser.likedPosts.remove(foundPost._id)
					foundPost.save()
					foundUser.save()
					res.redirect('back')
				}
				else {
					if(foundUser.dislikedPosts.indexOf(foundPost._id) !== -1) {
						foundPost.dislikes--
						foundUser.dislikedPosts.remove(foundPost._id)
					}
					foundPost.likes++
					foundUser.likedPosts.push(foundPost._id)
					foundPost.save()
					foundUser.save()
					res.redirect('back')
				}
			})
		})
	}
	else {
			res.redirect('/sessions/register')
	}
})

router.post('/:id/dislike', (req,res)=> {
		if(req.session.logged) {
		User.findOne({username: req.session.username}, (err,foundUser)=> {
		Post.findById(req.params.id, (err, foundPost) => {
				if(foundUser.dislikedPosts.indexOf(foundPost._id) !== -1) {
					foundPost.dislikes--
					foundUser.dislikedPosts.remove(foundPost._id)
					foundPost.save()
					foundUser.save()
					res.redirect('back')
				}
				else {
					if(foundUser.likedPosts.indexOf(foundPost._id) !== -1) {
						foundPost.likes--
						foundUser.likedPosts.remove(foundPost._id)
					}
					foundPost.dislikes++
					foundUser.dislikedPosts.push(foundPost._id)
					foundPost.save()
					foundUser.save()
					res.redirect('back')
				}
			})
		})
	}
	else {
			res.redirect('/sessions/register')
	}
})




module.exports = router