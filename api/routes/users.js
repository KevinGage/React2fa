const express = require('express');
const router = express.Router();
const db = require('../controllers/db');
const authorize = require('../controllers/authorization');

/* Anything below this middleware will require the user to be logged in */
router.use(authorize.authorize);

/* Anything below this middleware will require 2fa */
router.use(authorize.authorizeSecondFactor);

/* GET a user by id. */
router.get('/:ID', async(req, res, next) => {
  try {
    const data = await db.users.selectId(req.params.ID);

    const user = data.recordset[0];
    if (!user) {
      return res.status(404).send();
    }
    return res.status(200).json({'data': {
      'id': user.id,
      'email': user.email,
      'firstname': user.firstname,
      'lastname': user.lastname,
      'active': user.active,
      'otp': req.user.otp ? true : false
    }});
  } catch (err) {
    return next(err);
  }
});

module.exports = router;