const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Get all comments
router.get('/', async (req, res) => {
  try {
    const dbCommentData = await Comment.findAll();
    res.json(dbCommentData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error occurred while retrieving comments.', error: err });
  }
});

// Create a new comment
router.post('/', withAuth, async (req, res) => {
  try {
    const dbCommentData = await Comment.create({
      comment_text: req.body.comment_text,
      post_id: req.body.post_id,
      user_id: req.session.user_id
    });
    res.json(dbCommentData);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'An error occurred while creating the comment.', error: err });
  }
});

// Delete a comment by ID
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const dbCommentData = await Comment.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!dbCommentData) {
      res.status(404).json({ message: 'No comment found with this id' });
      return;
    }

    res.json({ message: 'Comment deleted successfully', data: dbCommentData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error occurred while deleting the comment.', error: err });
  }
});

module.exports = router;

