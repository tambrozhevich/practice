const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const users = require('./db.js').users;
const articles = require('./db.js').articles;
const session = require('express-session');
const sessionStore = require('connect-mongo')(session);
const store = new sessionStore({url: 'mongodb://localhost/tanya'});
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    store: store
}));
app.use(passport.initialize());
app.use(passport.session());

function sortByFilter(filter) {
    const filterConfig = {};
    if (filterConfig) {
        if (filter.author) filterConfig.author = filter.author;
        if (filter.createdAt) filterConfig.createdAt = {$gte: new Date(filter.createdAt)};
    }
    return filterConfig;
}

app.put('/getArticles', (req, res) => {
    articles.find(sortByFilter(req.body.filter))
        .sort({createdAt: -1})
        .skip(req.body.skip)
        .limit(req.body.top)
        .exec((err, articles) => {
            !err ? res.json(articles) : res.sendStatus(500)
        });
});

app.get('/getArticle/:_id', (req, res) => {
    articles.findById(req.params._id, (err, article) => {
        if (!article) {
            res.statusCode = 404;
            res.send({error: 'not found'});
        }
        !err ? res.json(article) : res.sendStatus(500);
    });
});

app.get('/delete/:_id', (req, res) => {
    articles.findByIdAndRemove(req.params._id, err => !err ? res.sendStatus(200) : res.sendStatus(500))
});

app.put('/editArticle', (req, res) => {
    articles.findByIdAndUpdate(req.body._id, {$set: req.body}, err => !err ? res.sendStatus(200) : res.sendStatus(500))
});

app.put('/addArticle', (req, res) => {
    new articles(req.body).save(err => !err ? res.sendStatus(200) : res.sendStatus(500));
});

passport.serializeUser((user, done) => done(null, user));

passport.deserializeUser((user, done) => {
    const error = user ? null : new Error('deserialize');
    done(error, user)
});

passport.use('login', new LocalStrategy({
        passReqToCallback: true
    },
    (req, username, password, done) => {
        users.findOne({username}, (err, user) => {
            if (err)
                done(err);
            if (!user) {
                console.log('User Not Found with username ' + username);
                return done(null, false);
            }
            if (password !== user.password) {
                console.log('Invalid Password');
                return done(null, false);
            }
            return done(null, user);
        });
    })
);

app.post('/login', passport.authenticate('login'), (req, res) => res.send(req.user.username));

app.get('/logout', (req, res) => {
    req.logout();
    res.sendStatus(200);
});

app.get('/username', (req, res) => req.user ? res.send(req.user.username) : res.sendStatus(401));

app.listen(port, () => console.log(`app is listening on port: ${port}`));
