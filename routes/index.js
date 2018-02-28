const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('home/index');
});
router.get('/register', (req, res) => {
  res.render('users/register');

});
module.exports = router;
