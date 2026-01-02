const express = require('express');
const router = express.Router();
const { ensureAuthenticated, ensureAdmin } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const adminController = require('../controllers/adminController');

// Protect all admin routes
router.use(ensureAuthenticated);
router.use(ensureAdmin);

router.get('/dashboard', adminController.getDashboard);
router.get('/members', adminController.getMembers);
router.post('/members/approve/:id', adminController.approveMember);
router.post('/members/ban/:id', adminController.banMember);

// Event Routes
router.get('/events/create', adminController.getCreateEventPage);
router.post('/events/create', upload.single('image'), adminController.createEvent);

// Blog Post Routes
router.get('/posts/create', adminController.getCreatePostPage);
router.post('/posts/create', upload.single('image'), adminController.createPost);

module.exports = router;
