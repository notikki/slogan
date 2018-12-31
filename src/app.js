const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');
const morgan  = require('morgan');
const session = require('express-session');
const hbs = require('express-handlebars');
const passport = require('passport');
const expressValidator = require('express-validator');


const indexRoute = require('./routes');
const keys = require('./api/secure/keys');

const mongoose = require('mongoose');
mongoose.connect(keys.mongoURL, {useNewUrlParser: true});

app.set('views', path.join(__dirname, './views'));
app.engine('hbs', hbs({
    defaultLayout: 'layout',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    extname: 'hbs'
}));

app.set('view engine', '.hbs');
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(expressValidator());
app.use(cookieParser());
app.use(bodyParser.json());

app.use(session({
    secret: keys.secretKey,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: new Date(Date.now() + 300000)
    }
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/javascript', express.static('javascripts'));
app.use('/stylesheets', express.static('stylesheets'));
app.use('/images', express.static('images'));

app.use('/', indexRoute);

// Set port
app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), () => console.log('Server is running on port: ' + app.get('port')));