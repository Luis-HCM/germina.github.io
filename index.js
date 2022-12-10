const sqlite3 = require('sqlite3'),
    express = require('express'),
    users = require('./routes/users'),
    products = require('./routes/products'),
    news = require('./routes/news'),
    register = require('./routes/register'),
    about = require('./routes/about'),
    bodyParser = require("body-parser"),
    login = require('./routes/login'),
    userpage = require('./routes/userpage'),
    session = require('express-session'),
    singlenew = require('./routes/singlenew'),
    PORT = 3000;

const app = express();

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(express.static(__dirname+'/public'))

//BODYPARSER
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.locals.db = new sqlite3.Database('germina.db', (err) => {
    	if (err) {
    	  console.error(err.message);
    	}
    	console.log('Conectado a base de dados');
});

app.use(session({
    secret: "chave criptográfica",
    secure: false,
    resave: false,
    saveUninitialized: false
}));

app.use('/',users);
app.use('/produtos',products);
app.use('/noticias',news);
app.use('/cadastro',register);
app.use('/sobre',about);
app.use('/login',login);
app.use('/userpage',userpage);
app.use('/noticia', singlenew);

app.listen(PORT, function() {
    console.log(`O servidor está escutando na porta ${PORT}!`)
});