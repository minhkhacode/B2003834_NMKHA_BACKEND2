const express = require('express');
const contacts = require('../controllers/contactController');
const { route } = require('../../app');

const router = express.Router();

router.route('/')
    .get(contacts.findAll)
    .post(contacts.create)
    .delete(contacts.deleteAll);

router.route('/favorite')
    .get(contacts.findOne)
    .post(contacts.update)
    .delete(contacts.delete);

router.route('/:id')
    .get(contacts.findByID)
    .put(contacts.updateByID)
    .delete(contacts.deleteById);

module.exports = router;
