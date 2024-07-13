const passport = require("passport");
const router = require("express").Router();

router.route("/auth/google")
    .get(
        passport.authenticate('google', {
            scope: ['profile', 'email']
        })
    );
router.route("/auth/google/callback")
    .get(
        passport.authenticate('google', { failureRedirect: "/" }),
        (req,res) => {
            res.redirect("/surveys");
        }
    );
router.route("/api/logout")
    .get((req, res) => {
        req.logout();
        res.redirect("/")
    });
router.route("/api/current_user")
    .get((req, res) => {
        res.send(req.user);
    });
module.exports = router;