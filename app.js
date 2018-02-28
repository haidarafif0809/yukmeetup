const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const router = require('./routes/index');
const users = require('./routes/users');

app.use(cookieParser('keyboard cat'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());

app.set('views', __dirname+'/views/');
app.set('view engine', 'ejs');

//body parser
app.use(bodyParser.urlencoded({
  extended: false
}))


app.use(function(req, res, next) {
  res.locals.user = req.session.user;
  next();
});

//routes
app.use('/', router);

app.use('/users', users);


const port = 3000;

app.listen(port, function() {
  console.log(`Server Starts on ${port}`);
});
