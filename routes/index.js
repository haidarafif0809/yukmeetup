const router = require('express').Router();
const models = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.get('/', (req, res) => {
  const alertMessage = req.flash('alertMessage');
  const alertStatus = req.flash('alertStatus');
  const alert = { message: alertMessage, status: alertStatus};
  const host = req.headers.host;

  models.Event.all({
    where: {
      dueDate: {
        [Op.gte]: Date.now(),
      }
    },include:[{model:models.Attendee},{model:models.Like}]
  }).then((events) => {
    res.render('home/index',{events: events,alert: alert,host:host});
  }).catch((err) => {

  })

});

router.use('/events', require('./events.js'));

module.exports = router;
