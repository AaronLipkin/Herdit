const express = require('express');
const router = express.Router();
const Post = require('../models/postsModel.js');
const User = require('../models/usersModel.js')

router.get('/new', (req, res) => {
	res.render('posts/new.ejs', {
		user: req.session.username,
		logged: req.session.logged
	})
})

router.post('/new', (req, res) => {
	User.findOne({username : req.session.username}, (err, foundUser) => {
		req.body.user = foundUser;
		let youtubeId = req.body.link.split('?v=')[1]
		req.body.embed = '<iframe width="560" height="315" src="https://www.youtube.com/embed/' + youtubeId + '" frameborder="0" allowfullscreen></iframe>'
		req.body.posted = Date.now()
		Post.create(req.body, (err, newPost)=> {
			console.log(foundUser)
			foundUser.posts.push(newPost._id)
			foundUser.save((err, data)=>{
                res.redirect('/')
			})
		})
	})
})

router.get('/:id/edit', (req,res) => {
	Post.findById(req.params.id, (err,foundPost)=> {
		res.render('posts/edit.ejs', {
			user: req.session.username,
			logged: req.session.logged,
			post: foundPost
		})
	})
})

router.post('/:id/edit', (req,res) => {
	let youtubeId = req.body.link.split('?v=')[1]
	req.body.embed = '<iframe width="560" height="315" src="https://www.youtube.com/embed/' + youtubeId + '" frameborder="0" allowfullscreen></iframe>'
	req.body.posted = Date.now()
	Post.findByIdAndUpdate(req.params.id,req.body,  (err,foundPost)=> {
		res.redirect('/')
	})
})

router.get('/:id/delete', (req,res) => {
	Post.findByIdAndRemove(req.params.id, (err,data) => {
		res.redirect('back')
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