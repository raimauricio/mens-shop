const express = require('express');
const responder = require('../middlewares/responder');
const router = express.Router();

router.get('/products', responder('products'));
router.post('/user', responder('user'));
router.post('/compra', responder('compra'));

module.exports = router;
