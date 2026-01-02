module.exports = {
    ensureAuthenticated: function(req, res, next) {
        if (req.session.user) {
            return next();
        }
        req.flash('error_msg', 'Please log in to view that resource');
        res.redirect('/auth/login');
    },
    ensureAdmin: function(req, res, next) {
        if (req.session.user && req.session.user.role === 'admin') {
            return next();
        }
        req.flash('error_msg', 'Access denied. Admins only.');
        res.redirect('/'); // Or redirect to a 403 page
    }
};
