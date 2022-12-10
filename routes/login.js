const express = require('express');
const { randomSalt,hashPassword } = require('../public/js/criptografia');

const router = express.Router();

async function usuarioLogado(db,email,password){
    return new Promise(function (resolve,reject){
        db.all('SELECT * FROM usuario WHERE email = ?',[email], function(err, rows) {

            if (!rows.length>0){
                resolve(false);
                return;
            }

            var hash = hashPassword(password, rows[0].salt);
            if(hash != rows[0].password){
                resolve(false);
                return;
            }
            resolve({id: rows[0].idUsuario, nome: rows[0].nome});
        })
    });
};

async function verificaLogin(req,res,next){
    let email = req.body.emailLogin;
    let password = req.body.pswLogin;

    let db = req.app.locals.db;

    let foundUser = await usuarioLogado(db,email,password);
    if(!foundUser){
        req.session.erroLogin = true;
        res.redirect(req.session.returnTo);
    }

    req.session.id = foundUser.id;
    req.session.nome = foundUser.nome;
    next();
}

router.post('/',verificaLogin,function(req,res) {
    res.redirect(req.session.returnTo);
});

module.exports = router;