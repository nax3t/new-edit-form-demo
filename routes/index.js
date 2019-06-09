const express = require('express');
const router = express.Router();
const Post = require('../models/post');

/* GET home page. */
router.get('/', async (req, res, next) => {
	const posts = await Post.find().sort('-_id').exec();
  res.render('index', { title: 'Express', posts });
});

/* GET posts index page. */
router.get('/posts', (req, res, next) => {
  res.redirect('/');
});

/* GET new post page. */
router.get('/posts/new', (req, res, next) => {
  const post = new Post;
  const action = '/posts';
  res.render('posts/form', { title: 'New Post', action, post });
});

/* POST create post. */
router.post('/posts', async (req, res, next) => {
	await Post.create(req.body);
  res.redirect('/')
});

/* GET edit post page. */
router.get('/posts/:id/edit', async (req, res, next) => {
	const post = await Post.findById(req.params.id);
  const action = `/posts/${ post.id }?_method=PUT`;
  res.render('posts/form', { title: 'Edit Post', action, post });
});

/* PUT update post. */
router.put('/posts/:id', async (req, res, next) => {
	const post = await Post.findByIdAndUpdate(req.params.id, req.body);
  res.redirect('/posts');
});

module.exports = router;
