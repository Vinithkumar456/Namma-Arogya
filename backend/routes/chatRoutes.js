const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

router.post('/medical-chat', chatController.medicalChat);

module.exports = router;
