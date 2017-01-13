
// require Node packages //

var express = require('express');
var bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const { escapeRegExp } = require("lodash");
const {paginate} = require('mongoose-paginate');




// Require DB info and model. I know the mongoose.js file works, the model is a crapshoot. //

var {mongoose} = require('./db/mongoose');
var {boxmac} = require('./models/mac');


// uh, this calls express I think, and does something with bodyParser. Fuck if I know what it does //
var app = express();
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(bodyParser.json());

// Inserts information into the database. this actually won't be wired to anything in V1. Probably broken beyond repair in current form //

app.post('/boxmac', (req, res) => {
  var mac = new boxmac({
    ProductName: req.body.ProductName,
    OriginCountry: req.body.OriginCountry,
    StoreBrand: req.body.StoreBrand,
    Type: req.body.Type,
    Pasta: req.body.Pasta,
    ADC: req.body.ADC,
    PastaType: req.body.PastaType,
    Org: req.body.Org,
    Veg: req.body.Veg,
    Mic: req.body.Mic,
    Exp: req.body.Exp,
    PriceRaw: req.body.PriceRaw,
    SauceType: req.body.SauceType,
    BoxSize: req.body.BoxSize,
    EpNo: req.body.EpNo,
    URL: req.body.URL,
    Price: req.body.Price,
    Rating: req.body.Rating,
    Comments: req.body.Comments
  });



  mac.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(404).send(e);
  });
});


// pages. //

app.get('/boxmac/', (req, res) => {
  var page = req.query.page;
  var limit = req.query.limit;


  boxmac.find().skip((parseInt(page)) * 10).limit(parseInt(limit)).then((macdb) => {
    res.send({macdb});
  }, (e) =>  {
    res.status(404).send(e);
    console.log(e);
    console.log(window.json);

  });

});

// returns all fields in the DB. Actually returns the actual number of results now, that only took 6 fucking hours of debugging. This works (as of testing while sober!) //


app.get('/boxmac/', (req, res) => {
  boxmac.find().then((macdb) => {
    res.send({macdb});
  }, (e) =>  {
    res.status(404).send(e);
    console.log(e);

  });
});

// returns item based on ID. This works, I checked it (while sober!) //

app.get('/findID/', (req, res) => {
  var id = req.query.id;



  boxmac.findById(id).then((macdb) => {
    if (!ObjectID.isValid(id)) {
       return res.status(404).send();
     }

    res.send({macdb});
  }).catch((e) => {
    res.status(404).send();
    console.log(e);
  });


});

// returns a specific result based on the field and search param. IE fieldName of ProductName and item of Kraft. Worked while sober. I promise I haven't touched it drunk //

app.get('/result', (req, res) => {
var field = req.query.fieldName;
var item = req.query.item;
var limit = req.query.limit;
var page = req.query.page;



   boxmac.find({ [field]:  { "$regex": escapeRegExp(item),  "$options": "i"  }} ).skip((parseInt(page)) * 10).limit(parseInt(limit)).then((macdb) => {

    res.send({macdb});

  }, (e) => {
    res.status(404).send(e)
    console.log(e);

  });
});

// this works without the .count(), with it it returns an incorrect number of records (2108 instead of 165 as of commenting) //

app.get('/total/', (req, res) => {
var row = req.query.row;
  boxmac.find().distinct(row).then((macdb) => {
    res.send({macdb});
    console.log(macdb.length);
  }, (e) => {
    res.status(404).send(e)
    console.log(e);

  });
});


// starts express server and exports the App... is the module.exports necessary? It's a react thing FWIW //

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});

module.exports = {app};
