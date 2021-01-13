const express = require('express');

const Posts = require('./posts-model');

const router = express.Router();

const { validatePostId, validatePost } = require('../middleware/middleware');

router.get('/', (req, res) => {
  Posts.get()
  .then((posts) => {
    res.status(201).json(posts)
  })
  .catch((error) => {
    res.status(500).json({ message: 'error'})
});
});

router.get('/:id', validatePostId, (req, res) => {
  Posts.getById(req.params.id)
  .then((post) => {
    res.status(200).json(post)
  })
  .catch(error => {
    res.status(500).json({ message: 'error'})
  })
});

router.delete('/:id', validatePostId, (req, res) => {
  Posts.remove(req.params.id)
  .then((count) => {
    if (count > 0) {
      res.status(200).json({ message:'The post has been deleted' })
    } else {
      res.status(400).json({ message:'Post not found' })
    }  
  })
  .catch((error) => {
    res.status(500).json({ message: 'error'})
  })
});

router.put('/:id', [validatePost, validatePostId], (req, res) => {
  const { id } = req.params
  Posts.update(id, req.body)
  .then(() => {
    res.status(200).json({ success: "post updated successfully", info: req.body })
  })
  .catch((error) => {
    res.status(500).json({ message: 'error'})
  })
});

module.exports = router;