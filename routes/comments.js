const express = require('express');
const db = require('../data/db');
const router = express.Router({ mergeParams: true });

router.get('/', (req, res) => {
  const { id } = req.params;
  db.findCommentById(id)
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
