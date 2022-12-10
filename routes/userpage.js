const express = require('express');
const router = express.Router();


router.get('/', function(req, res) {
    //req.session.erroLogin = false;
    //req.session.returnTo = req.originalUrl;
    res.render('userpage', {user: req.session.nome});
});

router.get('/sair', function(req,res){
    //res.send(req.originalUrl);
    req.session.destroy();
    res.redirect('/');
})
module.exports = router;