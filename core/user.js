const pool = require('./pool');
const bcrypt = require('bcrypt');

function User() { };
User.prototype = {

    //find user data by id or username
    /* find: function (user = null, callback) {
         //if user= number return field=id , if user=string return field=username
         if (user) {
             var field = Number.isInteger(user) ? 'id' : 'username';
         }
 
         let sql = 'SELECT * FROM users WHERE ${field}=?';
 
         pool.query(sql, user, function (err, result) {
             if (err) throw err;
             callback(result);
         });
     },*/

    create: function (body, callback) {
        let pwd = body.password;
        body.password = bcrypt.hashSync(pwd, 10);
        var bind = [];

        for (prop in body) {
            bind.push(prop);
        }

        let sql = 'INSERT INTO users(username,password) VALUES(?,?)';

        pool.query(sql, bind, function (err, lastId) {
            if (err) throw err;
            callback(lastId);
        });
    }

    
}

module.exports = User;



