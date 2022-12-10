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

// query para receber as notícias
const pesquisanoticia = require('../public/js/querynoticias.js');

router.get('/:id', async function(req, res) {
    req.session.erroLogin = false;
    req.session.returnTo = req.originalUrl;
    //console.log('user: '+res.locals.users);
    
    let noticiaX = await pesquisanoticia.querysinglenoticia(db, req.params.id);
    res.render('noticia', {user: req.session.nome, noticia: noticiaX, produtos: listaProdutos});
});

router.get('/erro', function(req,res){
    //res.send(req.session.returnTo)
    res.render('noticia', {erroLogin: req.session.erroLogin, noticia: teste[0], produtos: listaProdutos})
});
  
module.exports = router;
