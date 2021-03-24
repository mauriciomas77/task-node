const path = require('path');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();
// Cron import
const cron = require('node-cron');
const Task = require('./models/task');
const passport = require('passport')
const session = require('express-session')
var nodemailer = require('nodemailer');
const flash = require('connect-flash');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
            user: 'mauriciomastonon@gmail.com',   //put your mail here
            pass: 'Mm4626076'              //password here
          }
 });

// cron.schedule('0 */15 * * * *', () => {
//     let html =""
//     const query = Task.where({status: 'true'});
//     query.find(function (err, tasks) {
//         if (err) return handleError(err);
//         if (tasks) {
//             html = "<ul>"
//             tasks.forEach(task => {
//                 html += `<li>${task['title']}</li>`
//             })
//             html += "</ul>"
//         }
//         const mailOptions = { 
//             from: 'mauriciomastonon@gmail.com',       // sender address
//             to: 'mauriciomastonon@gmail.com',          // reciever address
//             subject: 'Meeting Reminder',  
//             html: html
//         };
//         transporter.sendMail(mailOptions, function (err, info) {
//             if(err) 
//             console.log(err);
//             else
//             console.log(info);
//             });
//     });
// })

// Connecting DB
require('./database')
// mongoose.connect('mongodb://localhost/crud-mongo')
//     .then(db => console.log('DB CONNECTED'))
//     .catch(err => console.log(err))

// Import Routes
const indexRoutes = require('./routes/index');
//Initializations
require('./passport/local-auth')
// Settings
app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(session({
    secret: 'mysecretsession',
    resave: false,
    saveUninitialized: false    
}))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())
app.use('/public', express.static(path.join(__dirname, 'public')));


app.use((req, res, next) => {
    app.locals.signupMessage = req.flash('signupMessage');
    app.locals.signinMessage = req.flash('signinMessage')
    app.locals.user = req.user;
    next();
})
// Routes
app.use('/', indexRoutes);
// Starting server
app.listen(app.get('port'), () => {
    console.log(`Escuchando puerto ${app.get('port')}`);
});