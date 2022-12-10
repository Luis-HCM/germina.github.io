const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3');

let db = new sqlite3.Database('germina.db', (err) => {
	if (err) {
	  console.error(err.message);
	}
});

//query para receber os produtos com seus preços
const pesquisaProdutos = require('../public/js/queryProduto.js');
let listaProdutos = [];
pesquisaProdutos.queryProdutos(db, listaProdutos);

router.get('/', function(req, res) {
    req.session.erroLogin = false;
    req.session.returnTo = req.originalUrl;
    //console.log('user: '+res.locals.users);
    res.render('produtos', {user: req.session.nome, produtos: listaProdutos});
});

router.get('/erro', function(req,res){
    //res.send(req.session.returnTo)
    res.render('produtos', {erroLogin: req.session.erroLogin, produtos: listaProdutos})
});
  
module.exports = router;