const express = require('express');
const User = require('../core/user');
const pool = require('../core/pool');
const router = express.Router();
const http = require('http');
const fs = require('fs');
var multer = require('multer');
const csv = require('csv-parse');
const upload = multer({ dest: '/uploads' });

const user = new User();

//get index page
router.get('/', (req, res, next) => {
    res.sendFile('index.html', { root: './public/html' });
});

//get sign in page
router.get('/sign%20in', (req, res, next) => {
    res.sendFile('sign in.html', { root: './public/html' });
});

//get sign in page
router.get('/sign%20up', (req, res, next) => {
    res.sendFile('sign up.html', { root: './public/html' });
});

router.post('/campaigns', (req, res, next) => {
    res.sendFile('campaigns.html', { root: './public/html' });
});

/** extract data
 *  function getData() {
    var table = document.getElementById("campaigns");
    var row = table.insertRow(1);

}
*/


/** 
//post login data
router.post('/sign%20in', (req, res, next) => {
    user.login(req.body.username, req.body.password, function (result) {
        if (result) {
            //get campaigns page
                res.sendFile('campaigns.html', { root: './public/html' });
        }
        else
            //failureFlash: true
            console.log('verify login and password...');

    })
});

*/
//post login data
router.post('/sign%20in', function (request, response) {
    var username = request.body.username;
    var password = request.body.password;
    if (username && password) {
        pool.query('SELECT username,password FROM users WHERE username = ? AND password = ?', [username, password], function (error, result, fields) {
            if (result[0] != null) {
                request.session.loggedin = true;
                request.session.username = username;
                response.redirect(307, '/campaigns');
            } else {
                /*var popupS = require('popups');

                popupS.alert({
                    content: 'Hello!',
                    
                });*/
                console.log('verify address and password...');

            }
            response.end();
        });
    } else {
        response.send('Please enter Username and Password!');
        response.end();
    }
});

//upload file
router.post('/fileUpload', upload.single('filetoupload'), function (req, res) {
    var file = req.file;
    //read
    fs.createReadStream(file.path).pipe(csv()).on('data', function (data) {
        data.forEach(function (email) {
            pool.query('INSERT INTO mails (mail_address) VALUES (?) ;',[email],function(err,result){
                if(err){
                    console.log(err);
                }
            });
        });
    });
});




    //post sign up data
    router.post('/sign%up', (req, res, next) => {
        let userInput = {
            username: req.body.username,
            password: req.body.password,
            mail: req.body.mail,
            company: req.body.company,
            city: req.body.company,
            code: req.body.code
        };

        user.create(userInput, function (lastId) {
            if (lastId) {
                res.sendFile('campaigns.html', { root: './public/html' });
            }
            else {
                console.log('Error creating a new user');
            }
        });
    })


    module.exports = router;