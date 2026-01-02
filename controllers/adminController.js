const db = require('../config/db');

exports.getDashboard = async (req, res) => {
    try {
        const [memberCount] = await db.query('SELECT COUNT(*) as count FROM users WHERE role = "student"');
        const [pendingCount] = await db.query('SELECT COUNT(*) as count FROM users WHERE status = "pending"');
        const [eventCount] = await db.query('SELECT COUNT(*) as count FROM events');
        
        res.render('admin/dashboard', { 
            title: 'Admin Dashboard',
            memberCount: memberCount[0].count,
            pendingCount: pendingCount[0].count,
            eventCount: eventCount[0].count
        });
    } catch (err) {
        console.error(err);
        res.redirect('/');
    }
};

exports.getMembers = async (req, res) => {
    try {
        const [members] = await db.query('SELECT * FROM users WHERE role != "admin" ORDER BY created_at DESC');
        res.render('admin/members', { title: 'Manage Members', members });
    } catch (err) {
        console.error(err);
        res.redirect('/admin/dashboard');
    }
};

exports.approveMember = async (req, res) => {
    try {
        await db.query('UPDATE users SET status = "active" WHERE id = ?', [req.params.id]);
        req.flash('success_msg', 'Member approved');
        res.redirect('/admin/members');
    } catch (err) {
        console.error(err);
        req.flash('error_msg', 'Error approving member');
        res.redirect('/admin/members');
    }
};

exports.banMember = async (req, res) => {
    try {
        await db.query('UPDATE users SET status = "banned" WHERE id = ?', [req.params.id]);
        req.flash('success_msg', 'Member banned');
        res.redirect('/admin/members');
    } catch (err) {
        console.error(err);
        req.flash('error_msg', 'Error banning member');
        res.redirect('/admin/members');
    }
};

exports.getCreateEventPage = (req, res) => {
    res.render('admin/create-event', { title: 'Create Event' });
};

exports.createEvent = async (req, res) => {
    const { title, description, date_time, venue } = req.body;
    const image_url = req.file ? `/uploads/${req.file.filename}` : null;
    const created_by = req.session.user.id;

    try {
        await db.query('INSERT INTO events (title, description, date_time, venue, image_url, created_by) VALUES (?, ?, ?, ?, ?, ?)', 
            [title, description, date_time, venue, image_url, created_by]);
        req.flash('success_msg', 'Event created successfully');
        res.redirect('/admin/dashboard');
    } catch (err) {
        console.error(err);
        req.flash('error_msg', 'Error creating event');
        res.redirect('/admin/events/create');
    }
};

exports.getCreatePostPage = (req, res) => {
    res.render('admin/create-post', { title: 'Create Blog Post' });
};

exports.createPost = async (req, res) => {
    const { title, content, category } = req.body;
    const image_url = req.file ? `/uploads/${req.file.filename}` : null;
    const author_id = req.session.user.id;

    try {
        await db.query('INSERT INTO posts (title, content, category, image_url, author_id) VALUES (?, ?, ?, ?, ?)', 
            [title, content, category, image_url, author_id]);
        req.flash('success_msg', 'Blog post published successfully');
        res.redirect('/admin/dashboard');
    } catch (err) {
        console.error(err);
        req.flash('error_msg', 'Error creating post');
        res.redirect('/admin/posts/create');
    }
};
