const express = require('express');
const { getProperties } = require('../controllers/propertyController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, getProperties);

module.exports = router;
