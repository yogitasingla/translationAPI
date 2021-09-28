const config = require('../common/config-util');
const express = require('express');
const router = express.Router();

const WebhookController = require('../controllers/TranslationCaching-controller');
const webhookController = new WebhookController(config);


router.post('/TranslationCaching',webhookController.TranslationCaching)


// router.post('/showWeather',webhookController.showWeather)




module.exports = router;