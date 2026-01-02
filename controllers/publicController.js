const db = require('../config/db');

exports.getHomePage = async (req, res) => {
    try {
        // Get latest 3 events and posts for the home page
        const [events] = await db.query('SELECT * FROM events ORDER BY date_time ASC LIMIT 3');
        const [posts] = await db.query('SELECT * FROM posts ORDER BY created_at DESC LIMIT 3');
        res.render('index', { title: 'Home - Antidrug Club', events, posts });
    } catch (err) {
        console.error(err);
        res.render('index', { title: 'Home - Antidrug Club', events: [], posts: [] });
    }
};

exports.getAboutPage = (req, res) => {
    res.render('about', { title: 'About Us - Antidrug Club' });
};

exports.getContactPage = (req, res) => {
    res.render('contact', { title: 'Contact Us - Antidrug Club' });
};

exports.getEventsPage = async (req, res) => {
    try {
        const [events] = await db.query('SELECT * FROM events ORDER BY date_time ASC');
        res.render('events', { title: 'Events - Antidrug Club', events });
    } catch (err) {
        console.error(err);
        res.render('events', { title: 'Events - Antidrug Club', events: [] });
    }
};

exports.getBlogPage = async (req, res) => {
    try {
        const [posts] = await db.query('SELECT * FROM posts ORDER BY created_at DESC');
        res.render('blog', { title: 'Blog - Antidrug Club', posts });
    } catch (err) {
        console.error(err);
        res.render('blog', { title: 'Blog - Antidrug Club', posts: [] });
    }
};

exports.getResourcesPage = async (req, res) => {
    try {
        const [resources] = await db.query('SELECT * FROM resources ORDER BY created_at DESC');
        res.render('resources', { title: 'Resources - Antidrug Club', resources });
    } catch (err) {
        console.error(err);
        res.render('resources', { title: 'Resources - Antidrug Club', resources: [] });
    }
};

exports.getHelpPage = (req, res) => {
    res.render('get-help', { title: 'Get Help - Antidrug Club' });
};

exports.postContactMessage = (req, res) => {
    // In a real app, you might send an email here
    req.flash('success_msg', 'Thank you for contacting us. We will get back to you soon.');
    res.redirect('/contact');
};

exports.postAnonymousMessage = async (req, res) => {
    const { subject, message_body, sender_email } = req.body;
    try {
        await db.query('INSERT INTO messages (subject, message_body, sender_email) VALUES (?, ?, ?)', 
            [subject, message_body, sender_email]);
        req.flash('success_msg', 'Your message has been sent securely.');
        res.redirect('/get-help');
    } catch (err) {
        console.error(err);
        req.flash('error_msg', 'Something went wrong. Please try again.');
        res.redirect('/get-help');
    }
};
