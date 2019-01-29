var mysql = require('mysql');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
const multer = require('multer');
const uuidv4 = require('uuid/v4');
const path = require('path');
const fs = require('fs');
var crypt = require('./crypt');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {

    const newFilename = file.fieldname + '-' + Date.now();
    console.log(newFilename);
    cb(null, newFilename);
  },
});

const upload = multer({ storage });

//use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

//use express session to maintain session data
app.use(session({
    secret              : 'cmpe273_kafka_passport_mongo',
    resave              : false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized   : false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration            : 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration      :  5 * 60 * 1000
}));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

//Allow Access Control
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  next();
});

var propertyDetails = [];

// var connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "Hanuman#26",
//   database: 'HomeAway',
//   port : "3306"
// });

var pool = mysql.createPool({
  connectionLimit: 100,
  port: '3306',
  host: 'localhost',
  user: 'root',
  password: 'Hanuman#26',
  database: 'Homeaway'
})

// connection.connect(function(error) {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log("Connected!");
//   }
// });

pool.getConnection(function(err,connection){
  if(err){
     console.log("Error in connection");
  } else {
    console.log("Connected successfully");
  }
});

// app.post('/', upload.array('selectedFile',4), (req, res) => {
//   //console.log("Req : ",req);
//   console.log("Res : ",res.file);
//   res.send();
// });

// app.post('/download/:file(*)',(req, res) => {
// console.log("Inside download file");
// var file = req.params.file;
// var fileLocation = path.join(__dirname + '/uploads',file);
// var img = fs.readFileSync(fileLocation);
// var base64img = new Buffer(img).toString('base64');
// res.writeHead(200, {'Content-Type': 'image/jpg' });
// res.end(base64img);
// });

app.post('/SignIn', function(request, response) {
  console.log("Inside SignIn Request");
  console.log("Req Body : ",request.body);

  pool.getConnection(function(err,connection){
    if(err){
      res.writeHead(400,{
        'Content-Type' : 'text/plain'
      })
      res.end("Could Not Get Connection Object");
    } else {
      var sqlQuery = `SELECT *FROM SignIn WHERE Email='${request.body.emailID}';`;
      console.log('sql', sqlQuery);

      connection.query(sqlQuery, function(error, result, fields) {
        if(!!error) {
          console.log('Error in query');
        } else {
          console.log("Successful query");
          console.log(result[0].Email);
          console.log(result[0].password);
          console.log(request.body.emailID);
          console.log(request.body.password);
    
          if (request.body.emailID == result[0].Email) {
            crypt.compareHash(request.body.password, result[0].password, function (err, isMatch) {
              if (isMatch && !err) {
                response.cookie('cookie',request.body.emailID,{maxAge: 900000, httpOnly: false, path : '/'});
                response.writeHead(200, {
                  'Content-Type':'text/plain'
                });
                response.end();
                console.log("Successful Login");
              } else {
                console.log("Password Not Matched");
              }
            })
          }
        }
      })
    }
  }) 
});

app.post('/SignUpEmail',function(request, response) {
  console.log("Inside SignUp Request");
  console.log("Req Body : ",request.body);
  
  pool.getConnection(function(err,connection){
    if(err){
      res.writeHead(400,{
        'Content-Type' : 'text/plain'
      })
      res.end("Could Not Get Connection Object");
    } else {
      var passwordHash;
      crypt.createHash(request.body.password, function (res) {
        passwordHash = res;
        console.log("Encrypted:", passwordHash);
        var sqlQyery = `INSERT INTO SignUp (firstname, lastname, email, password) VALUES ('${request.body.firstname}', '${request.body.lastname}', '${request.body.emailID}', '${passwordHash}');`;
        connection.query(sqlQyery, function (error, result) {
          if (!!error)
          {
            console.log(error);
            console.log('Error in query');
          } else {
            console.log("1 record inserted");
            console.log("Encrypted:", passwordHash);
            var sqlQuery1 = `INSERT INTO SignIn (Email, password) VALUES ('${request.body.emailID}', '${passwordHash}');`;
            connection.query(sqlQuery1, function (error, result) {
              if(error) {
                console.log(error);
                console.log("Error in SignIn insert");
              } else {
                console.log("1 record inserted");
                response.cookie('cookie',request.body.emailID,{maxAge: 900000, httpOnly: false, path : '/'});
                response.writeHead(200,{
                  'Content-Type':'text/plain'
                });
                response.end()
                console.log("Successful record inserteed");
              }
            })
          }
        })
      })
    }
  })
});

app.post('/UserProfile',function(request, response) {
  console.log("Inside UserProfile Request");
  console.log("Req Body : ",request.body);

  pool.getConnection(function(err,connection){
    if(err){
      res.writeHead(400,{
        'Content-Type' : 'text/plain'
      })
      res.end("Could Not Get Connection Object");
    } else {
      var sqlQuery = `INSERT INTO UserProfile (firstname, lastname, aboutme, mycountry, company, school, hometown, languages, gender, phonenum, emailID) VALUES ('${request.body.firstname}', '${request.body.lastname}', '${request.body.aboutme}', '${request.body.mycountry}', '${request.body.company}', '${request.body.school}', '${request.body.hometown}', '${request.body.languages}', '${request.body.gender}', '${request.body.phonenum}', '${request.body.emailID}');`;
      console.log(sqlQuery);
      connection.query(sqlQuery, function (err, result) {
        if (!!err)
        {
          console.log('Error in query');
        } else {
          console.log("1 record inserted");
          response.cookie('cookie',request.body.emailID,{maxAge: 900000, httpOnly: false, path : '/'});
          response.writeHead(200,{
            'Content-Type':'text/plain'
          });
          response.end();
        }
      })
    }
  })
});

app.post('/OwnersSignIn', function(request, response) {
  console.log("Inside Owners Login request");
  console.log("Req Body: ", request.body);

  pool.getConnection(function(err,connection){
    if(err){
      res.writeHead(400,{
        'Content-Type' : 'text/plain'
      })
      res.end("Could Not Get Connection Object");
    } else {
      var sqlQuery = `SELECT *FROM OwnersLogin WHERE email='${request.body.emailID}';`;
      console.log(sqlQuery);
      connection.query(sqlQuery, function(err, result) {
        if (!!err)
        {
          console.log("Error in query");
        } else {
          response.cookie('cookie',request.body.emailID,{maxAge: 900000, httpOnly: false, path : '/'});
          response.writeHead(200,{
            'Content-Type':'text/plain'
          });
          response.end();
          console.log("1 record selected");
        }
      }) 
    }
  })
})

app.post('/ListPropertyWelcome', function(request, response) {
  console.log("Inside List Property request");
  console.log("Req Body: ", request.body);

  pool.getConnection(function(err,connection){
    if(err){
      res.writeHead(400,{
        'Content-Type' : 'text/plain'
      })
      res.end("Could Not Get Connection Object");
    } else {
      var sqlQuery = `select MAX(propertyID) AS propertyID from ListProperty;`
      console.log(sqlQuery);
      connection.query(sqlQuery, function(err, result) {
        if (!!err)
        {
          console.log("Error in query");
        } else {
          console.log("Value:", result[0].propertyID);
          var propID = result[0].propertyID;
          propID = propID+1;
          console.log("Incremented property ID:", propID);
      
          var sqlQuery1 = `INSERT INTO ListProperty (address, propertyID) VALUES ('${request.body.address}', ${propID} );`;
          console.log(sqlQuery1);
          connection.query(sqlQuery1, function(err, result) {
            if (!!err)
            {
              console.log("Error in query");
            } else {
              response.cookie('cookie',request.body.emailID,{maxAge: 900000, httpOnly: false, path : '/'});
              response.writeHead(200,{
                'Content-Type':'text/plain'
              });
              response.end();
              console.log("1 record inserted");
            }
          }) 
        }
      })
    }
  })
})

app.post('/ListPropertyDescribe', function(request, response) {
  console.log("Inside List Property request");
  console.log("Req Body: ", request.body);

  pool.getConnection(function(err,connection){
    if(err){
      res.writeHead(400,{
        'Content-Type' : 'text/plain'
      })
      res.end("Could Not Get Connection Object");
    } else {
      var sqlQuery = `select MAX(propertyID) AS propertyID from ListProperty;`
      console.log(sqlQuery);
      connection.query(sqlQuery, function(err, result) {
        if (!!err)
        {
          console.log("Error in query");
        } else {
          console.log("Value:", result[0].propertyID);
          var propID = result[0].propertyID;
      
          var sqlQuery1 = `UPDATE ListProperty SET headline='${request.body.headline}',  propdesc='${request.body.propdesc}', proptype='${request.body.proptype}', noofrooms='${request.body.noofrooms}', accomodates='${request.body.noofpeople}', noofbathrooms='${request.body.noofbathrooms}' WHERE propertyID=${propID};`;

          console.log(sqlQuery1);
          connection.query(sqlQuery1, function(err, result) {
            if (!!err)
            {
              console.log("Error in query");
            } else {
              response.cookie('cookie',request.body.emailID,{maxAge: 900000, httpOnly: false, path : '/'});
              response.writeHead(200,{
                'Content-Type':'text/plain'
              });
              response.end();
              console.log("1 record inserted");
            }
          })
        }
      }) 
    }
  })
})

app.post('/ListPropertyAvailability', function(request, response) {
  console.log("Inside List Property request");
  console.log("Req Body: ", request.body);

  pool.getConnection(function(err,connection){
    if(err){
      res.writeHead(400,{
        'Content-Type' : 'text/plain'
      })
      res.end("Could Not Get Connection Object");
    } else {
      var sqlQuery = `select MAX(propertyID) AS propertyID from ListProperty;`
      console.log(sqlQuery);
      connection.query(sqlQuery, function(err, result) {
        if (!!err)
        {
          console.log("Error in query");
        } else {
          console.log("Value:", result[0].propertyID);
          var propID = result[0].propertyID;
      
          var sqlQuery1 = `UPDATE ListProperty SET startdate = '${request.body.startdate}', enddate = '${request.body.enddate}' WHERE propertyID=${propID};`;
          console.log(sqlQuery1);
          connection.query(sqlQuery1, function(err, result) {
            if (!!err)
            {
              console.log("Error in query");
            } else {
              response.cookie('cookie',request.body.emailID,{maxAge: 900000, httpOnly: false, path : '/'});
              response.writeHead(200,{
                'Content-Type':'text/plain'
              });
              response.end();
              console.log("1 record inserted");
            }
          })
        }
      }) 
    }
  })
})

app.post('/ListPropertyCharges', function(request, response) {
  console.log("Inside List Property request");
  console.log("Req Body: ", request.body);

  pool.getConnection(function(err,connection){
    if(err){
      res.writeHead(400,{
        'Content-Type' : 'text/plain'
      })
      res.end("Could Not Get Connection Object");
    } else {
      var sqlQuery = `select MAX(propertyID) AS propertyID from ListProperty;`
      console.log(sqlQuery);
      connection.query(sqlQuery, function(err, result) {
        if (!!err)
        {
          console.log("Error in query");
        } else {
          console.log("Value:", result[0].propertyID);
          var propID = result[0].propertyID;
      
          var sqlQuery1 = `UPDATE ListProperty SET currency = '${request.body.currency}', baserate = '${request.body.baserate}', minstay = '${request.body.minstay}', cleaningfee = '${request.body.cleaningfee}' WHERE propertyID=${propID};`;
          console.log(sqlQuery1);
          connection.query(sqlQuery1, function(err, result) {
            if (!!err)
            {
              console.log("Error in query");
            } else {
              response.cookie('cookie',request.body.emailID,{maxAge: 900000, httpOnly: false, path : '/'});
              response.writeHead(200,{
                'Content-Type':'text/plain'
              });
              response.end();
              console.log("1 record inserted");
            }
          })
        }
      }) 
    }
  })
})

//var sqlQuery1 = `INSERT INTO ListProperty (address, headline, propdesc, proptype, noofrooms, accomodates, noofbathrooms, startdate, enddate, currency, baserate, minstay, cleaningfee) VALUES ('${request.body.address}', '${request.body.headline}', '${request.body.propdesc}', '${request.body.proptype}', '${request.body.noofrooms}', '${request.body.noofpeople}', '${request.body.noofbathrooms}', '${request.body.startdate}', '${request.body.enddate}', );`;
app.post('/TravLogin', function(request,response){
  console.log("Inside Travel Login");   
  console.log("Req Body: ", request.body);

  pool.getConnection(function(err,connection){
    if(err){
      res.writeHead(400,{
        'Content-Type' : 'text/plain'
      })
      res.end("Could Not Get Connection Object");
    } else {
      var sqlQuery = `SELECT *FROM ListProperty WHERE address LIKE '%${request.body.place}%' AND startdate >= '${request.body.startdate}' AND enddate <= '${request.body.enddate}' AND accomodates >= '${request.body.guests}';`;
      console.log(sqlQuery);
      connection.query(sqlQuery, function(err, result) {
        if (!!err) {
          console.log("Error in query");
        } else {
          response.cookie('cookie',request.body.emailID,{maxAge: 900000, httpOnly: false, path : '/'});
          response.writeHead(200,{
            'Content-Type':'text/plain'
          });
          response.end();
          console.log("1 record queried successfully");
          propertyDetails = JSON.stringify(result);
          console.log("Result : ",propertyDetails);
        }
      })
    }
  })
})

app.get('/DetailsView', function(request,response){
  console.log("Inside DetailsView Login");
  console.log("Property Details within DetailsView :", propertyDetails);
  // var sqlQuery = `SELECT *FROM ListProperty`;
  // console.log("detail", sqlQuery);
  // connection.query(sqlQuery, function(err, result) {
  //     if (!!err) {
  //       console.log("Error in query");
  //     } else {

    pool.getConnection(function(err,connection){
      if(err){
        res.writeHead(400,{
          'Content-Type' : 'text/plain'
        })
        res.end("Could Not Get Connection Object");
      } else {
        response.cookie('cookie',request.body.emailID,{maxAge: 900000, httpOnly: false, path : '/'});
        response.writeHead(200,{
          'Content-Type':'text/plain'
        });
        console.log("Queried successfully");
        response.end(propertyDetails);
      }
    })
     // }
   // })
})

app.get('/DetailsMainView', function(request,response){
  console.log("Inside DetailsMainView GET request");
  console.log("Request: ",request.query.id);

  pool.getConnection(function(err,connection){
    if(err){
      res.writeHead(400,{
        'Content-Type' : 'text/plain'
      })
      res.end("Could Not Get Connection Object");
    } else {
      var sqlQuery = `SELECT *FROM ListProperty WHERE propertyID=${request.query.id};`;
      console.log("SQL Query: ", sqlQuery);
      connection.query(sqlQuery, function(err, result) {
        if (!!err) {
          console.log("DetailsMainView: Error in Query");
        } else {
          response.cookie('cookie',request.body.emailID,{maxAge: 900000, httpOnly: false, path : '/'});
          response.writeHead(200,{
            'Content-Type':'text/plain'
          });
          console.log("DetailsMainView: Queried successfully");
          response.end(JSON.stringify(result));
        }
      })
    }
  })
})

app.post('/DetailsMainView', function(request,response){
  console.log("Inside DetailsMainView post request");
  console.log("Request body:", request.body);

  pool.getConnection(function(err,connection){
    if(err){
      res.writeHead(400,{
        'Content-Type' : 'text/plain'
      })
      res.end("Could Not Get Connection Object");
    } else {
      var sqlQuery = `UPDATE ListProperty SET propertybooked = '${request.body.bookedFlag}' WHERE propertyID=${request.body.outputID};`;
      console.log("SQL Query: ", sqlQuery);
      connection.query(sqlQuery, function(err, result) {
        if (!!err) {
          console.log("DetailsMainView: Error in Query");
        } else {
          response.cookie('cookie',request.body.emailID,{maxAge: 900000, httpOnly: false, path : '/'});
          response.writeHead(200,{
            'Content-Type':'text/plain'
          });
          console.log("DetailsMainView: Queried successfully");
          response.end(JSON.stringify(result));
        }
      })
    }
  })
})

app.get('/TravelerDashboard', function(request, response) {
  console.log("Inside TravelerDashboard get request");

  pool.getConnection(function(err,connection){
    if(err){
      res.writeHead(400,{
        'Content-Type' : 'text/plain'
      })
      res.end("Could Not Get Connection Object");
    } else {
      var sqlQuery = `SELECT *FROM ListProperty WHERE propertybooked = 'Booked';`
      console.log("SqlQuery of traveler dash board: ", sqlQuery);

      connection.query(sqlQuery, function(error, result) {
        if (!!error) {
          console.log("Error in query");
        } else {
          response.cookie('cookie',request.body.emailID,{maxAge: 900000, httpOnly: false, path : '/'});
          response.writeHead(200,{
            'Content-Type':'text/plain'
          });
          console.log("Queried successfully");
          response.end(JSON.stringify(result));
          console.log("Result:", result);
        }
      })
    }
  })
})

app.get('/OwnersDashboardBooked', function(request, response) {
  console.log("Inside OwnersDashboardBooked get request");

  pool.getConnection(function(err,connection){
    if(err){
      res.writeHead(400,{
        'Content-Type' : 'text/plain'
      })
      res.end("Could Not Get Connection Object");
    } else {
      var sqlQuery = `SELECT *FROM ListProperty WHERE propertybooked = 'Booked';`
      console.log("SqlQuery of Owners dash board: ", sqlQuery);

      connection.query(sqlQuery, function(error, result) {
        if (!!error) {
          console.log("Error in query");
        } else {
          response.cookie('cookie',request.body.emailID,{maxAge: 900000, httpOnly: false, path : '/'});
          response.writeHead(200,{
            'Content-Type':'text/plain'
          });
          console.log("Queried successfully");
          response.end(JSON.stringify(result));
          console.log("Result:", result);
        }
      })
    }
  })
})

app.get('/OwnersDashboardAll', function(request, response) {
  console.log("Inside OwnersDashboardALL get request");

  pool.getConnection(function(err,connection){
    if(err){
      res.writeHead(400,{
        'Content-Type' : 'text/plain'
      })
      res.end("Could Not Get Connection Object");
    } else {
      var sqlQuery = `SELECT *FROM ListProperty;`
      console.log("SqlQuery of Owners dash board: ", sqlQuery);

      connection.query(sqlQuery, function(error, result) {
        if (!!error) {
          console.log("Error in query");
        } else {
          response.cookie('cookie',request.body.emailID,{maxAge: 900000, httpOnly: false, path : '/'});
          response.writeHead(200,{
            'Content-Type':'text/plain'
          });
          console.log("Queried successfully");
          response.end(JSON.stringify(result));
          console.log("Result:", result);
        }
      })
    }
  })
})
app.listen(3001);
console.log("Server Listening on port 3001");
