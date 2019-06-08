var express = require('express');
var router = express.Router();

var mtg = require('mtgsdk');

var query_builder = require('../helpers/query_builder.js');


const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mtg-deckbuilder', {useNewUrlParser: true});


const Card = mongoose.model('Card', {
  name: String,
  manaCost: String,
  cmc: Number,
  colors: [String],
  colorIdentity: [String],
  type: String,
  supertypes: [String],
  types: [String],
  subtypes: [String],
  rarity: String,
  set: String,
  setName: String,
  text: String,
  artist: String,
  number: String,
  power: String,
  toughness: String,
  layout: String,
  multiverseid: Number,
  imageUrl: String,
  id: String
});

var log = console.log;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'MTG Deck Builder',
    msg: 'Grabbing Sample Cards'
  });
});

/* GET sample card data. */
router.get('/cards/', function(req, res, next) {
  qo = {
    page: 1,
    pageSize: 20,
    name: '',
    supertypes: '',
    types: '',
    subtypes: '',
    colors: '',
  }
  query_builder(qo).then(results=>{
    for (i = 0; i < results.length; i++) {
      const card = new Card(results[i]);
      Card.find({ 'id': card["id"] }, function (err, docs) {
        if (docs.length === 0){
          card.save().then(() => log(`Saving card: #${results.length}`));
        } else {
          console.log("Card already exists in DB")
        }
      });
    }
    res.json(results);
  })
});

/* POST */
router.post('/cards/', function(req, res, next) {
  // convert req.body to usable strings
  log(req.body);
  var qColors = req.body.colors.join();
  qo = {
    page: 1,
    pageSize: 20,
    name: req.body.name,
    supertypes: req.body.supertypes,
    types: req.body.types,
    subtypes: req.body.subtypes,
    colors: qColors,
    page: 1,
    pageSize: 10
  }
  query_builder(qo).then(results=>{
    for (i = 0; i < results.length; i++) {
      const card = new Card(results[i]);
      Card.find({ 'id': card["id"] }, function (err, docs) {
        if (docs.length === 0){
          card.save().then(() => log(`Saving card: #${results.length}`));
        } else {
          log(`Card already exists in DB: #${results.length}`);
        }
      });
    }
    res.json(results);
  })
});

module.exports = router;
