const express = require('express');
const router = express.Router();
const db = require('../controllers/db');
const authorize = require('../controllers/authorization');

/* Anything below this middleware will require the user to be logged in */
router.use(authorize);

/* GET a user by id. */
router.get('/:ID', async(req, res, next) => {
  try {
    const data = await db.users.selectId(req.params.ID);

    const user = data.recordset[0];
    if (!user) {
      return res.status(404).send();
    }
    return res.status(200).json({'data':user});
  } catch (err) {
    return next(err);
  }
});

module.exports = router;