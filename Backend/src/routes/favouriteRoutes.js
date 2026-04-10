const express = require('express');
const {
    getFavourites,
    addFavourite,
    removeFavourite,
} = require('../controllers/favouriteController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, getFavourites);
router.post('/:propertyId', authMiddleware, addFavourite);
router.delete('/:propertyId', authMiddleware, removeFavourite);

module.exports = router;
