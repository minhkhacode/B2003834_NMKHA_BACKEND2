const express = require('express');
const contacts = require('../controllers/contactController');

const router = express.Router();

router.route('/')
    .get(contacts.findAll)
    .post(contacts.create)
    .delete(contacts.deleteAll);

router.route('/:id')
    .get(contacts.findAll)
    .post(contacts.create)
    .delete(contacts.delete);
    
router.route('/favorite')
    .get(contacts.findAllFavorite)
    .delete(contacts.deleteById);

router.route('/favorite/:id')
    .get(contacts.findOne)
    .patch(contacts.update)
    .delete(contacts.delete);


module.exports = router;
