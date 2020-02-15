const express = require('express');
const db = require('../data/db');
const router = express.Router({ mergeParams: true });

router.post('/', (req, res) => {
  const { id } = req.params;
  const { text } = req.body;

  if (!text) {
    return res
      .status(400)
      .json({ message: 'Please provide text for the comment.' });
  }
  const comment = {
    post_id: id,
    text: text,
  };
  db.insertComment(comment)
    .then(newComment => {
      res.status(201).json(newComment);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: 'There was an error while saving the comment to the database',
      });
    });
});

router.get('/', (req, res) => {
  const { id } = req.params;
  db.findPostComments(id)
    .then(comment => {
      if (comment) {
        res.status(200).json(comment);
      } else {
        res
          .status(404)
          .json({ message: 'The post with the specified ID does not exist.' });
      }
    })
    .catch(error => {
      res.status(500).json({
        error: 'The comments information could not be retrieved.',
      });
    });
});

module.exports = router;
