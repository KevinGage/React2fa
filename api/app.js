var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require("express-session");

/* import passport authentication package */
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

/* import database controller */
const db = require('./controllers/db');

/* define routers */
const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');

/* intialize web server */
var app = express();

/* logger settings */
app.use(logger('dev'));

/* configure passport authentication middleware */
let strategy = new localStrategy(
  async function(email, password, done) {
    let user;
    try {
      user = await db.users.login(email, password);

      if (!user) {
        return done(null, false, {message: 'Invalid Credentials'});
      }
    } catch (e) {
      return done(e);
    }

    return done(null, user);
  }
);

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const data = await db.users.selectId(id);
    const user = data.recordset[0];
    if (!user) {
      return done(new Error('User Not Found'));
    }
    done(null, user);
  } catch (e) {
    done(e);
  }
});

/* Generate randon cookie secret */
const generateRandomString = (length) => (Array(length).fill(0).map(x => Math.random().toString(36).charAt(2)).join(''))
const cookieSecret = generateRandomString(32)

/* initialize middleware */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: cookieSecret }));
app.use(passport.initialize());
app.use(passport.session());

/* initialize routers */
app.use('/auth', authRouter);
app.use('/users', usersRouter);

module.exports = app;
