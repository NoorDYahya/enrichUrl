const express = require('express');
const router = express.Router();
const urlController = require('../controllers/urlController');

// Define the POST and GET routes
router.post('/urls/saveEnrichedUrl', urlController.postUrl);
router.get('/urls/getEnrichedUrl', urlController.getUrl);

module.exports = router;
