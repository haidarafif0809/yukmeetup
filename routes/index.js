const router = require('express').Router();


router.get('/', (req, res) => {
  res.render('home/index');
});

router.use('/events', require('./events.js'));

module.exports = router;
