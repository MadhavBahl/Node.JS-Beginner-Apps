const express = require('express');
const router = express.Router();

//Middleware functions

router.use((req, res, next) => {
    console.log('Hello');
    const err = new Error('Oh no, its a trap!');
    err.status = 500;
    next();
});

router.use((req, res, next) => {
    console.log('world!');
    next();
});

router.get('/', (req, res) => {
    //Setting cookie
    const name = req.cookies.username;
    if (name) {
        res.render('index', { name });
    } else {
        res.redirect('hello');
    }
});

router.post('/goodbye', (req, res) => {
    //Deleting cookie
    res.clearCookie('username', { path: '/' });
    res.redirect('/hello');
});

router.get('/hello', (req, res) => {
    const name = req.cookies.username;
    if (name) {
        res.redirect('/');
    } else {
        res.render('hello');
    }
});

router.post('/hello', (req, res) => {
    res.cookie('username', req.body.username);
    res.redirect('/');
});

module.exports = router;