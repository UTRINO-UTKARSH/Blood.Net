const express = require('express');
const { signup, login, checkAuth, logout } = require('../controllers/userController');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login)
router.get('/check', checkAuth)
router.post('/logout', logout)
// router.get('/me', provideInfo)
module.exports = router;