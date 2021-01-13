const postsModel = require("../posts/posts-model");
const usersModel = require("../users/users-model");

function validateUserId(req, res, next) {
  const { id } = req.params
  usersModel.getById(id)
  .then((user) => {
    if (user) {
      req.user = user
      next()
    } else {
      res.status(404).json({ message: "user not found" })
    }
  })
  // .catch((error) => {
  //   res.status(500).json()
  // } )
}

function validateUser(req, res, next) {
  if(!req.body) {
    res.status(400).json({ message: "missing user data" })
  } else if (!req.body.name) {
    res.status(400).json({ message: "missing required name field" })
  } else {
    next()
  }
}

function validatePostId(req, res, next) {
  const { id } = req.params
  postsModel.getById(id)
  .then((post) => {
    if (post) {
      req.post = post
      next()
    } else {
      res.status(404).json({ message: "post not found" })
    }
  })
}

function validatePost(req, res, next) {
  if(!req.body) {
    res.status(400).json({ message: "missing post data" })
  } else if (!req.body.text) {
    res.status(400).json({ message: "missing required name field" })
  } else {
    next()
  }
}

// do not forget to expose these functions to other modules
module.exports = { validateUserId, validateUser, validatePostId, validatePost }