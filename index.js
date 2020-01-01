var config = require('./config/config');
const bodyParser = require('body-parser');
const morgan = require('morgan');
//Router
var express = require('express');
var app = express();
var api = express.Router();

var pendingRequests = [];

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, access-token");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, PATCH, OPTIONS");
    next();
});

app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

//app.use(require('./middlewares/ip'));
api.use(require('./middlewares/token'));

app.use('/api', api);
api.use(require('./routes'));
app.use('/signup', require('./routes/signup'));
app.use('/signin', require('./routes/signin'));

app.listen(process.env.PORT || config.server.port, function () {
    console.log(`Listening on 0.0.0.0:${config.server.port} ...`)
});

