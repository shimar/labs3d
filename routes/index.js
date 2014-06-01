var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'labs3d' });
});

/* GET timeline page. */
router.get('/timeline', function(req, res) {
  res.render('timeline', { title: 'Timeline - labs3d' });
});

/* GET particlesystem page. */
router.get('/particlesystem', function(req, res) {
  res.render('particlesystem', { title: 'Particle System - labs3d' });
});

module.exports = router;
