const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Home');
});

router.use('/events', require('./events.js'));

module.exports = router;
