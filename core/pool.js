const util= require('util');
const mysql=require('mysql');
/**
 * Connection to the database
 */
const pool=mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: "",
    database:"mailingplatform"
});

pool.getConnection((err, Connection)=>{
    if(err)
    console.error("Something went wrong connecting the database");
    if(Connection){
        Connection.release();
        console.log('connected to the database!');
    }
    return;
});

pool.query= util.promisify(pool.query);
module.exports= pool;

