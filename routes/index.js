var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'GoldenLine extended' });
});

router.get('/contact', function(req, res) {
  res.render('contact', { title: 'Kontakt' });
});

router.get('/info', function(req, res) {
  res.render('info', { title: 'O projekcie' });
});

router.get('/categories', function(req, res) {
  res.render('categories', { title: 'Kategorie' });
});

module.exports = router;
