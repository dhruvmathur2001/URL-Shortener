const express = require('express');
const { handleGenerateURL, handleGetAnalytics, handleGetURL } = require("../controllers/url");
const router = express.Router();

router.post("/",handleGenerateURL);
router.get('/:shortid',handleGetURL);
router.get('/analytics/:shortId', handleGetAnalytics)
module.exports = router;

