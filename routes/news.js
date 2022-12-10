const express = require('express');
const sqlite3 = require('sqlite3');
const router = express.Router();

let db = new sqlite3.Database('germina.db', (err) => {
	if (err) {
	  console.error(err.message);
	}
});

//query para receber os produtos com seus preços
const pesquisaProdutos = require('../public/js/queryProduto.js');
let listaProdutos = [];
pesquisaProdutos.queryProdutos(db, listaProdutos);

// query para receber as notícias
const pesquisanoticias = require('../public/js/querynoticias.js');
let listanoticias = [];
pesquisanoticias.querynoticias(db, listanoticias);

// FAZER QUERIES
router.get('/', function(req, res) {
  req.session.erroLogin = false;
  req.session.returnTo = req.originalUrl;
  //console.log('user: '+res.locals.users);
  res.render('noticias', {user: req.session.nome, produtos: listaProdutos, noticias: listanoticias});
});

router.get('/erro', function(req,res){
  //res.send(req.session.returnTo)
  res.render('noticias', {erroLogin: req.session.erroLogin, noticias: listanoticias,produtos: listaProdutos})
});

  
module.exports = router;
