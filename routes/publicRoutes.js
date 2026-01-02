const express = require('express');
const router = express.Router();
const publicController = require('../controllers/publicController');

router.get('/', publicController.getHomePage);
router.get('/about', publicController.getAboutPage);
router.get('/contact', publicController.getContactPage);
router.get('/events', publicController.getEventsPage);
router.get('/blog', publicController.getBlogPage);
router.get('/resources', publicController.getResourcesPage);
router.get('/get-help', publicController.getHelpPage);
router.post('/contact', publicController.postContactMessage);
router.post('/get-help', publicController.postAnonymousMessage);

module.exports = router;
