const isLoggedIn = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.redirect("/auth/spotify")
    }
}
module.exports = isLoggedIn