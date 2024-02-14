const express = require('express');
const { signup, login, changepassword, createpost, getpost, deletepost, increaselike, addcomment, imagekitauth, userinfo } = require('../user-controller/controller.js')
const router = express.Router();

router.post('/signup', signup)
router.post('/login', login)
router.post('/login/change', changepassword)
router.get('/posts', getpost)
router.get('/auth', imagekitauth)
router.post('/user', userinfo)
router.post('/posts/comments', addcomment)
router.post('/posts/create', createpost)
router.post('/posts/like', increaselike)
router.delete('/posts/delete', deletepost)


module.exports = router;