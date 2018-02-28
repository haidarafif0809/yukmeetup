const router = require('express').Router();
const models = require('../models');
const auth = require('../helpers/auth');


router.get('/register', (req, res) => {
  const alertMessage = req.flash('alertMessage');
  const alertStatus = req.flash('alertStatus');
  const alert = { message: alertMessage, status: alertStatus};
  let data = {
    name: req.flash('name'),
    email: req.flash('email'),
  };
  res.render('users/register',{data: data, alert: alert});
});

router.post('/register', (req, res) => {
  let input = req.body;
  models.User.build({
    email: input.email,
    name: input.name,
    password: input.password
  }).save().then((user) => {

    req.session.isLogin = true;
    req.session.user =  {
      id: user.id,
      email: user.email,
      name: user.name
    }
    res.redirect('/');
  }).catch((err) => {
    req.flash('alertMessage', err.message);
    req.flash('alertStatus', 'danger');
    req.flash('email',req.body.email);
    req.flash('name',req.body.name);
    res.redirect('/users/register');
  })

});
router.get('/login', (req, res) => {

  const alertMessage = req.flash('alertMessage');
  const alertStatus = req.flash('alertStatus');
  const alert = { message: alertMessage, status: alertStatus};
  let data = {
    email: req.flash('email')
  };
  res.render('users/login',{data: data, alert: alert});
});

router.post('/login', (req, res) => {
  models.User.findOne({
    where: {
      email: req.body.email,
      password: req.body.password
    }
  }).then((user) => {
    if (user == null) {
      req.flash('alertMessage', 'User Not Found');
      req.flash('alertStatus', 'danger');
      req.flash('email',req.body.email);
      res.redirect('/users/login');
    } else {
      req.session.user = {
        id: user.id,
        email: user.email,
        name: user.name
      }
      res.redirect('/');
    }
  }).catch((err) => {
    req.flash('alertMessage', err.message);
    req.flash('alertStatus', 'danger');
    req.flash('email',req.body.email);
    res.redirect('/users/login');

  });

});

router.get('/profile', auth.isLogin, (req, res) => {

  const alertMessage = req.flash('alertMessage');
  const alertStatus = req.flash('alertStatus');
  const alert = { message: alertMessage, status: alertStatus};
  let data = {
    email: req.flash('email')
  };
  res.render('users/profile',{data: data, alert: alert});
});

router.post('/profile', auth.isLogin, (req, res) => {
  let input = req.body;
  models.User.findById(req.session.user.id).then((user) => {
    return user.update(req.body);
  }).then((user) => {
    req.flash('alertMessage', 'Success Update Profile');
    req.flash('alertStatus', 'success');
    req.session.isLogin = true;
    req.session.user =  {
      id: user.id,
      email: user.email,
      name: user.name
    }
    res.redirect('/users/profile');
  }).catch((err) => {
    req.flash('alertMessage', err.message);
    req.flash('alertStatus', 'danger');
    res.redirect('/users/profile');
  });
});

router.get('/logout', auth.isLogin,(req, res) => {
  req.session.destroy()
  res.redirect('/');
});

router.get('/delete',auth.isLogin, (req, res) => {
  models.User.findById(req.session.user.id).then((user) => {
    return user.destroy();
  }).then((user) => {
    req.session.destroy()
    res.redirect('/');
  }).catch((err) => {
    req.flash('alertMessage', err.message);
    req.flash('alertStatus', 'danger');
    res.redirect('/users/profile');
  });
});
module.exports = router;
