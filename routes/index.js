const router = require('express').Router();
const models = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.get('/', (req, res) => {

  models.Event.all({
    where: {
      dueDate: {
        [Op.gte]: Date.now(),
      }
    }
  }).then((events) => {
    res.render('home/index',{events: events});
  }).catch((err) => {

  })

});

router.use('/events', require('./events.js'));

module.exports = router;
