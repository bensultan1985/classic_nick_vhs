const express = require('express');
const app = express();
const path = require('path')
const fetch = require('node-fetch');
const bodyparser = require('body-parser')

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));

//get request for website
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'))
// })

//static folder
app.use(express.static(path.join(__dirname, 'public')))

app.get('/mysql/tapes', (req, res) => {
    res.json(tapeInfo);
})

var mysql = require('mysql');
const { RSA_NO_PADDING } = require('constants');

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

db.connect(function(err) {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to database.');
});

// app.get('/getrequest', (req, res) => {
//   console.log(req)
//   let sql = `SELECT * from vhscol where release_year = ${req.query};`
// db.query(sql, (err, result) => {
//     // if(err) throw err;
//     res.send(result)
//   })
// })

app.post('/getrequest', (req, res) => {
  console.log(req.body.queryString)
  let sql = `SELECT * from vhscol where series_title = '${req.body.queryString}';`
db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result)
    res.send(result)
  })
})

  // app.post('/getrequest', async (req, res) => {
  //   console.log(req.method)
  //   console.log(req.body.queryString)
  //   let sql = `SELECT * from vhscol where release_year = ${req.body.queryString};`
  //   let response = await db.query(sql, (err, result) => {console.log('querying...')}).then(res => res.json());
  //   await res.send(response);
  //   })

// db.end();