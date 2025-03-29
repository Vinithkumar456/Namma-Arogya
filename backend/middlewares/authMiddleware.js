exports.isAuthenticated = (req, res, next) => {
    if (req.session.user || req.session.doctor) {
        return next();
    }
    res.status(401).json({ error: "Unauthorized access" });
};
