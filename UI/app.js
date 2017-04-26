var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = 3000;
var db = require('diskdb');

app.use(express.static('public'));
app.use(bodyParser.json());
db.connect('private', ['articles', 'users', 'deletedArticles']);

app.get('/checkUser', function (req, res) {
    var userCurrent = req.query.user;
    var passwordCurrent = req.query.password;
    console.log(userCurrent + " " + passwordCurrent);
    if (!userCurrent || !passwordCurrent) {
        console.log("Not right request");
        res.status(400);
        res.json(false);
    }
    else {
        res.status(200);
        result = db.users.forEach(function (f) {
            if (f.name === userCurrent && f.password === passwordCurrent) {
                res.json(true);
            }
        });
    }
});

app.get('/getUsers', function (req, res) {
    res.json(db.users.find());
});

app.get('/getActiveUser', function (req, res) {
    res.json(activeUser.username);
    res.status(200);
});

app.get('/getArticles', function (req, res) {
    res.json(db.articles.find());
});

app.get('/getArticle/:id',function (req, res) {
    res.json(db.articles.findOne({id: req.params.id}));
});

app.get('/delete/:id', function (req, res) {
    var article = db.articles.findOne({id: req.body.id});
    db.deletedArticles.save(article);
    db.articles.remove({id: req.body.id});
    res.json(article);
});

app.post('/post', function (req, res) {
    var iNickname = req.query.nickname || req.body.nickname;
    if (!iNickname) {
        res.json = ({verdict: false, explanation: "Not right request"});
        res.status(400);
    }
    else {
        activeUser.username = iNickname;
        res.json(true);
        res.status(200);
    }
});

app.put('/putArticle', function (req, res) {
    var article = req.body;
    db.articles.push(article);
    res.json(true);
    res.status(200);
});

var activeUser = {username: null};

app.listen(port);
console.log("app is listening on port: " + port);