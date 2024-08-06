const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Get all comments
router.get('/', (req, res) => {
  Comment.findAll()
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'An error occurred while retrieving comments.', error: err });
    });
});

// Create a new comment
router.post('/', withAuth, (req, res) => {
  // Check for a session
  if (req.session) {
    Comment.create({
      comment_text: req.body.comment_text,
      post_id: req.body.post_id,
      user_id: req.session.user_id
    })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
      console.error(err);
      res.status(400).json({ message: 'An error occurred while creating the comment.', error: err });
    });
  }
});

// Delete a comment by ID
router.delete('/:id', withAuth, (req, res) => {
  Comment.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbCommentData => {
    if (!dbCommentData) {
      res.status(404).json({ message: 'No comment found with this id' });
      return;
    }
    res.json({ message: 'Comment deleted successfully', data: dbCommentData });
  })
  .catch(err => {
    console.error(err);
    res.status(500).json({ message: 'An error occurred while deleting the comment.', error: err });
  });
});

module.exports = router;
