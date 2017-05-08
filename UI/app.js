const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const db = require('diskdb');

app.use(express.static('public'));
app.use(bodyParser.json());
db.connect('private', ['articles', 'users', 'deletedArticles']);

app.get('/checkUser', (req, res) => {
    const userCurrent = req.query.user;
    const passwordCurrent = req.query.password;
    console.log(`${userCurrent} ${passwordCurrent}`);
    if (!userCurrent || !passwordCurrent) {
        console.log('Not right request');
        res.status(400);
        res.json(false);
    } else {
        res.status(200);
        db.users.forEach((f) => {
            if (f.name === userCurrent && f.password === passwordCurrent) {
                res.json(true);
            }
        });
    }
});

app.get('/getUsers', (req, res) => {
    res.json(db.users.find());
});
const activeUser = { username: null };
app.get('/getActiveUser', (req, res) => {
    res.json(activeUser.username);
    res.status(200);
});

app.get('/getArticles', (req, res) => {
    res.json(db.articles.find());
});

app.get('/getArticle/:id', (req, res) => {
    res.json(db.articles.findOne({ id: req.params.id }));
});

app.get('/delete/:id', (req, res) => {
    const article = db.articles.findOne({ id: req.body.id });
    db.deletedArticles.save(article);
    db.articles.remove({ id: req.body.id });
    res.json(article);
});

app.post('/news', (req, res) => {
    const iNickname = req.query.nickname || req.body.nickname;
    if (!iNickname) {
        res.json = ({ verdict: false, explanation: 'Not right request' });
        res.status(400);
    } else {
        activeUser.username = iNickname;
        res.json(true);
        res.status(200);
    }
});

app.put('/putArticle', (req, res) => {
    const article = req.body;
    db.articles.push(article);
    res.json(true);
    res.status(200);
});
app.listen(port);
console.log(`app is listening on port: ${port}`);
