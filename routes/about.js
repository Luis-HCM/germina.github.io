const express = require('express');

const router = express.Router();

router.get('/', function(req, res) {
    req.session.erroLogin = false;
    req.session.returnTo = req.originalUrl;
    res.render('sobre', {user: req.session.nome});
});

router.get('/erro', function(req,res){
    res.render('sobre', {erroLogin: req.session.erroLogin })
})

module.exports = router;