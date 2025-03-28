const express = require('express');
const { registerDoctor, loginDoctor, logoutDoctor } = require('../controllers/doctorController');

const router = express.Router();

router.post('/register', registerDoctor);
router.post('/login', loginDoctor);
router.get('/logout', logoutDoctor);

module.exports = router;
