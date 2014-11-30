var express = require('express');
var ObjectID = require('mongoskin').ObjectID;
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

router.get('/data', function(req, res) {
	var categories = req.query.categories;
	var categoriesArray = categories.split(' ');
	var categoriesArrayObjectId = [];
	categoriesArray.forEach(function(entry) {
		var newEntry = new ObjectID(entry);
		categoriesArrayObjectId.push(newEntry);
	});
	var db = req.db;
	db.collection('categories').find({
		_id : { 
			$in : categoriesArrayObjectId
		}
	}).toArray(function (err, items) {
		if (err) {
            console.log(err);
            return;
        }
		res.json(items);
	});
});

router.get('/jsoncategories', function(req,res) {
	var db = req.db;
	db.collection('categories').find().toArray(function (err, items) {
		if (err) {
            console.log(err);
            return;
        }
		res.json(items);
	});
});

router.get('/connectionTest', function(req, res) {
	var db = req.db;
	db.collection('categories').find()
		.toArray(function (err, items) {
			if (err) {
	            console.log(err);
	            return;
	        }
			res.json(items);
		});
});

module.exports = router;
