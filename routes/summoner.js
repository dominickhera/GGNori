const express = require('express');
const router = express.Router();
const summonerController = require('../controllers').summoner;

router.post('/summoner/:summonerName', summonerController.getSummoner);

module.exports = router;