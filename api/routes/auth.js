const express = require('express');
const router = express.Router();
const passport = require('passport');
const authorize = require('../controllers/authorization');
const db = require('../controllers/db');

/* Route to attempt login and create session */
router.post('/login', async(req, res, next) => {
  passport.authenticate('local', async (err, user, info) => {
    if (err) { return next(err); }
    if (!user) { return res.status(401).send(); }

    req.logIn(user, async (err) => {
      if (err) { return next(err); }

      return res.redirect('/auth/user');
    });
  })(req, res, next);
});

/* Anything below this middleware will require the user to be logged in */
router.use(authorize);

/* Route to return currently loged in user details */
router.get('/user', async(req, res, next) => {
  return res.status(200).json({'data':req.user});
})

/* Route to log out current users session */
router.get('/logout', async (req, res, next) => {
  req.logout();

  return res.status(200).send({'data': 'logout succesful'})
});

module.exports = router;