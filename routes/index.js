var express = require('express');
var router = express.Router();

var mtg = require('mtgsdk');

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

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'MTG Deck Builder',
    msg: 'Grabbing Sample Cards'
  });
});

/* GET sample card data. */
router.get('/cards/', function(req, res, next) {
  mtg.card.where({
    name: '',
    supertypes: '',
    types: '',
    subtypes: '',
    colors: ''
  })
  .then(results => {
    for (i = 0; i < results.length; i++) {
      const card = new Card(results[i]);
      Card.find({ 'id': card["id"] }, function (err, docs) {
        if (docs.length === 0){
          card.save().then(() => console.log('saving card'));
        } else {
          console.log("Card already exists in DB");
        }
      });
    }
    res.json(results)
  })
});

/* POST */
router.post('/cards/', function(req, res, next) {

  // convert req.body to usable strings
  console.log(req.body);
  var qColors = req.body.colors.join();

  // make call to API
  mtg.card.where({
    name: req.body.name,
    supertypes: req.body.supertypes,
    types: req.body.types,
    subtypes: req.body.subtypes,
    colors: qColors
  })
  .then(results => {
    for (i = 0; i < results.length; i++) {
      const card = new Card(results[i]);
      Card.find({ 'id': card["id"] }, function (err, docs) {
        if (docs.length === 0){
          card.save().then(() => console.log('saving card'));
        } else {
          console.log("Card already exists in DB")
        }
      });
    }
    res.json(results)
  })
});

module.exports = router;
