const router = require('express').Router();
const models = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.get('/', (req, res) => {
  const alertMessage = req.flash('alertMessage');
  const alertStatus = req.flash('alertStatus');
  const alert = { message: alertMessage, status: alertStatus};

  models.Event.all({
    where: {
      dueDate: {
        [Op.gte]: Date.now(),
      }
    }
  }).then((events) => {
    res.render('home/index',{events: events,alert: alert});
  }).catch((err) => {

  })

});

router.use('/events', require('./events.js'));

module.exports = router;
