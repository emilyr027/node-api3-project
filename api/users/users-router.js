const express = require('express');

const Users = require('./users-model');
const Posts = require('../posts/posts-model');

const router = express.Router();

const { validateUserId, validateUser, validatePost } = require('../middleware/middleware');

router.post('/', validateUser, (req, res) => {
  const userInfo = req.body
  Users.insert(userInfo)
  .then((user) => {
    res.status(201).json(user)
  })
  .catch((error) => {
    res.status(500).json({ message: 'error'})
  })
});

router.get('/', (req, res) => {
  Users.get()
  .then(user => {
    res.status(200).json(user);
  })
  .catch((error) => {
    res.status(500).json({ message: 'error'})
  })
});

router.get('/:id', validateUserId, (req, res) => {
  res.status(200).json(req.user);
});

router.delete('/:id', validateUserId, (req, res,) => {
  try {
    const { id } = req.params
    Users.remove(id)
    res.status(201).json({ message: `User ${id} has been deleted`})
  } catch (error) {
    next(error)
  }
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
  try {
    const { id } = req.params;
    const changes = req.body;
  
    Users.update(id, changes)
    res.status(200).json({ message: 'User has been updated' })
  } catch (error) {
    next(error);
  }
});

router.post('/:id/posts', validateUser, validatePost, (req, res) => {
  try {
    const { id } = req.params; 
    const text = req.body;
    const payload = {...text, user_id:id}    
    Posts.insert(payload)
    res.status(201).json({ message: 'New post has been created' })
  } catch (error) {
    next(error)
  }
});

router.get('/:id/posts', validateUserId, (req, res) => {
  Users.getUserPosts(req.params.id)
  .then(posts => {
    res.status(200).json(posts)
  })
});


// do not forget to export the router
module.exports = router;