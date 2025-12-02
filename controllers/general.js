const express = require('express');
const router = express.Router();

//home route
router.get('/', (req, res) => {
    res.render('home');
});

router.get('/error', (req, res) => { 
    const error = req.query.error;
    if (error === "internal-server-error") {
       res.status(500).render('error', {code: 500, error: "oops it broke"});
    }
    else {
       res.status(404).render('error', {code: 404, error: "oops wrong spot"});
    }
});

module.exports = router;