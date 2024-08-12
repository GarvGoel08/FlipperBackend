const express = require('express');
const { createFlipCard, getFlipCardsByUser, updateFlipCard, deleteFlipCard } = require('../controllers/flipCardController')
const { protect } = require('../middlewares/auth')
const router = express.Router();

router.use(protect);

router.post('/', createFlipCard);
router.get('/', getFlipCardsByUser);
router.put('/:id', updateFlipCard);
router.delete('/:id', deleteFlipCard);

module.exports = router;
