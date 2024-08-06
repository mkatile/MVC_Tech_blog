const express = require('express');
const router = express.Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Get all posts for the logged-in user
router.get('/', withAuth, (req, res) => {
  Post.findAll({
    where: {
      user_id: req.session.user_id
    },
    attributes: ['id', 'title', 'post_text', 'created_at'],
    order: [['created_at', 'DESC']],
    include: [
      {
        model: User,
        attributes: ['username']
      },
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      }
    ]
  })
  .then(dbPostData => {
    // Serialize the data before passing to the template
    const posts = dbPostData.map(post => post.get({ plain: true }));
    res.render('dashboard', { posts, loggedIn: req.session.loggedIn });
  })
  .catch(err => {
    console.error(err);
    res.status(500).json(err);
  });
});

// Get a single post for editing
router.get('/edit/:id', withAuth, (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
      user_id: req.session.user_id // Ensure the post belongs to the logged-in user
    },
    attributes: ['id', 'title', 'post_text', 'created_at'],
    include: [
      {
        model: User,
        attributes: ['username']
      },
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      }
    ]
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      // Serialize the data
      const post = dbPostData.get({ plain: true });
      // Pass to the template
      res.render('edit-post', {
        post,
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json(err);
    });
});

// Render form to create a new post
router.get('/new', withAuth, (req, res) => {
  res.render('new-post', { loggedIn: req.session.loggedIn });
});

module.exports = router;
