const express = require('express');
const app = express();
const path = require('path')
const fetch = require('node-fetch');
const bodyparser = require('body-parser')


//establish connection on the web or localhost 5000
const PORT = process.env.PORT || 5000;


//log is created when server starts
app.listen(PORT, () => console.log(`server started on port ${PORT}`));

//get request for website
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'))
// })

//static folder
app.use(express.static(path.join(__dirname, 'public')))

//necessary for mysql
var mysql = require('mysql');
const { RSA_NO_PADDING } = require('constants');
const { runInNewContext } = require('vm');

//amazon AWS database connection information
const db = mysql.createConnection({
  host     : 'nickdbtest.cxkqmpzoak7c.us-west-1.rds.amazonaws.com',
  user     : 'root',
  password : '1234test',
  port     : '3306',
  database : 'nickschema'
});

// MUST HAVE to read JSON
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(bodyparser.json())

//establish a connection with the MySQL database hosted on Amazon AWS
db.connect(function(err) {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to database.');
});

//all queries are routed through /getrequest
app.post('/getrequest', (req, res) => {
  let sql = '';
  console.log(req.body.queryString)
  //checks for 'view all' condition
  if (req.body.queryString == 'view all') {
    sql = `SELECT * from vhscol;`
    // else, return only relevant content
  } else {
  sql = `
  SELECT *
  FROM vhscol
  WHERE series_title LIKE '%${req.body.queryString}%' or release_title LIKE '%${req.body.queryString}%' or release_year LIKE '%${req.body.queryString}%' or tags LIKE '%${req.body.queryString}%' or summary LIKE '%${req.body.queryString}%';`
  }
  //send query to the database
db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result)
    res.send(result)
  })
})

// //all queries are routed through /getrequest
// app.post('/getrequest', (req, res) => {
//   let sql = '';
//   console.log(req.body.queryString)
//   //checks for 'view all' condition
//   if (req.body.queryString == 'view all') {
//     sql = `SELECT * from vhscol;`
//     // else, return only relevant content
//   } else {
//   sql = `SELECT * from vhscol where series_title = '${req.body.queryString}';`
//   }
//   //send query to the database
// db.query(sql, (err, result) => {
//     if(err) throw err;
//     console.log(result)
//     res.send(result)
//   })
// })