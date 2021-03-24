const express = require('express');
const { authenticate } = require('passport');
const passport = require('passport');
const router = express.Router();
const Task = require('../models/task');
const User = require('../models/user');

router.get('/', isAuthenticate, async (req, res) => {
    const tasks = await Task.find({ user: req.user });
    res.render('index', {
        tasks // lo mismo que tasks: tasks
    });
})

router.get('/profile', isAuthenticate, async (req, res) => {
    const user = await User.findById(req.user._id)
    res.render('profile', {user: user})
})

router.post('/add', async (req, res) => {
    console.log(req.body)
    const task = new Task({
        title: req.body.title,
        description: req.body.description,
        user: req.user
    });
    await task.save();
    res.redirect('/')
})

router.get('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const task = await Task.findById(id);
    res.render('edit', {
        task
    })
})

router.post('/edit/:id', async (req, res) => {
    const { id } = req.params;
    await Task.updateOne({_id: id}, req.body)
    res.redirect('/');
})

router.get('/done/:id', async (req, res) => {
    const { id } = req.params;
    const task = await Task.findById(id);
    task.status = !task.status;
    await task.save();
    res.redirect('/');
})

router.get('/delete/:id', async (req, res) => {
    const { id } = req.params;
    await Task.deleteOne({_id: id})
    res.redirect('/');
})

router.get('/signin', (req, res) => {
    res.render('signin')    
})

router.post('/signin', passport.authenticate('local-signin', {
    successRedirect: '/',
    failureRedirect: '/signin',
    passReqToCallback: true
}));


router.get('/signup', (req, res) => {
    res.render('signup')    
})

router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/signup',
    passReqToCallback: true
}));

router.get('/logout', (req, res, next) => {
    req.logOut();
    res.redirect('/')
})

function isAuthenticate(req, res, next) {
    if(req.isAuthenticated()) {
        return next()
    }
    res.redirect('/signin')
}

module.exports = router;