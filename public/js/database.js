// https://github.com/TryGhost/node-sqlite3/wiki/API

// Importando o pacote para o manuseio do sqlite3
const { text } = require('express');
const sqlite3 = require('sqlite3');

// A função database aceita um ou mais modos de abrir uma base
// sqlite3.OPEN_READONLY: abre a base de dados apenas para leitura
// sqlite3.OPEN_READWRITE : abre a base de dados para leitura e escrita
// sqlite3.OPEN_CREATE: abre a base de dados, caso ela não exista, cria ela.
// Como padrão a função Database usa sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE
let db = new sqlite3.Database('germina.db', (err) => {
	if (err) {
	  console.error(err.message);
	}
});


// Criação das tabelas
const tblNoticia = `
CREATE TABLE IF NOT EXISTS "noticia" (
	"idNoticia"	INTEGER NOT NULL,
	"titulo"	TEXT NOT NULL,
	"data"	TEXT NOT NULL,
	"autor"	TEXT,
	"conteudo" TEXT,
	"imagem" TEXT,
	PRIMARY KEY("idNoticia")
);`;

const tblTipo = `
CREATE TABLE IF NOT EXISTS "tipo" (
	"idTipo"	INTEGER NOT NULL,
	"nome"	TEXT NOT NULL,
	PRIMARY KEY("idTipo")
);`;

const tblProduto = `
CREATE TABLE IF NOT EXISTS "produto" (
	"idProduto"	INTEGER NOT NULL,
	"nome"	TEXT NOT NULL,
	"tipo"	INTEGER,
	"Descricao" TEXT,
	"path_img" TEXT,
	PRIMARY KEY("idProduto"),
	FOREIGN KEY("tipo") REFERENCES "tipo"("idTipo")
);`;

const tblPreco = `
CREATE TABLE IF NOT EXISTS "preco" (
	"idPreco"	INTEGER NOT NULL,
	"data"	TEXT NOT NULL,
	"valorReal"	REAL NOT NULL,
	"variacaoDiaria"	REAL,
	"variacaoMensal"	REAL,
	"produto"	INTEGER NOT NULL,
	PRIMARY KEY("idPreco"),
	FOREIGN KEY("produto") REFERENCES "produto"("idProduto")
);`;

const tblUsuario = `
CREATE TABLE IF NOT EXISTS "usuario" (
	"idUsuario"	INTEGER NOT NULL,
	"nome"	TEXT NOT NULL,
	"sobrenome" TEXT NOT NULL,
	"password"	TEXT NOT NULL,
	"salt"	TEXT NOT NULL UNIQUE,
	"email"	TEXT NOT NULL UNIQUE,
	PRIMARY KEY("idUsuario")
);`;



const tabelas = [tblNoticia,tblTag,tblNoticiaTag,tblTipo,tblProduto,tblPreco,tblUsuario,tblUsuarioNoticia];
const query1 = "INSERT INTO tipo(nome) VALUES ('Grãos'), ('Pecuária'), ('Hortifruti'), ('Commodity'), ('Cerais');"
const query2 = "INSERT INTO produto(nome, tipo, Descricao, path_img) VALUES ('Açúcar', 4, 'Reais por saca de 50 kg', 'imagens/produtos/acucar.jpg'), ('Arroz', 5, 'Reais por saca de 50 kg', 'imagens/produtos/arroz.jpg'),('Bezerro', 2, 'valor por unidade', 'imagens/produtos/bezerro.jpg'),('Boi-gordo', 2, 'Valor por arroba de 15 kg', 'imagens/produtos/boi-gordo.jpg'),('Café', 1, 'Reais por saca de 60 kg líquido', 'imagens/produtos/cafe.jpg'),('Milho', 5, 'Reais por saca de 60 kg', 'imagens/produtos/milho.jpg'),('Soja', 1, 'Reais por saca de 60 kg', 'imagens/produtos/soja.jpg'),('Trigo', 5, 'Preço por tonelada', 'imagens/produtos/trigo.jpg')"


// NOTÍCIAS
const querynoticias = `
INSERT INTO noticia (idNoticia, titulo, data, autor, conteudo, imagem)
VALUES
	(1, 'A farsa da república do café-com-leite', '2022/11/26', 'Breno Coltro da Costa', 'A Primeira República do Brasil passou um período cognominado de "Café-com-leite" pela suposta hegemonia política e econômica dos Estados de São Paulo e Minas Gerais, que se revezariam no poder, malgrado as intenções dos demais entes federativos...', 'imagens/noticias/noticia01.jpg'),
	(2, 'Guera na Ucrânia despenca preços de passagens aéreas turcas', '2022/11/27', 'Luis Henrique Crepaldi Molas', 'A Turquia, país multicontinental, historicamente conecta três núcleos geopolíticos: a Europa Oriental pelos Bálcãs, a Rússia pelo Mar Negro e o Oriente Médio pelos Estreitos de Bósforo e Dardanelos. Uma vez que o país passou por forte emigração nos últimos anos e a recessão foi agravada pela guerra russa, pouco turismo ou comércio tem passado pela região, condições ideias para quem gostaria de visitar o país a preços baixos.', 'imagens/noticias/noticia02.jpg'),
	(3, 'Fernão ou Fernando? Conheça um pouco mais da etimologia desses nomes!', '2022/11/28', 'Fernando de Facio Rosseti', 'Fernão de Magalhães, o português que, à serviço da Coroa Castelhana, liderou a primeira expedição que deu a volta ao mundo, responsável pela descoberta da passagem austral do continente americano e falecido nas Molucas, talvez seja um dos poucos conhecidos por esse primeira nome, enquanto...', 'imagens/noticias/noticia03.jpg'),
	(4, 'Giordano Bruno: entenda sua contribuição para a humanidade', '2022/11/29', 'Giovane Bruno Nardari', 'Giordano Bruno pode ser um nome conhecido por poucos na atualidade, sobretudo num país com heranças culturais tão diversas. Contudo, na Itália, sua terra natal, sua figura está longe de ser esquecida...', 'imagens/noticias/noticia04.jpg'),
	(5, 'Consultoria estrangeira avalia GERMINA!', '2022/11/30', 'اكريبالديكريبالديلمككريبالديكريبالديكريبالديكريبالديسكريبالديكريبالديكريبالديكريبالديرات' ,'كريبالدي', 'imagens/noticias/noticia05.jpg'),
	(6, 'Agrofloresta: a revolução da agricultura sustentável', '2022/12/01', 'Breno Coltro da Costa', 'Estamos acostumados ao modelo latifundiário de produção monocultora: grandes cafezais, canaviais, soja e milho até não se ver mais. Contudo, na onda sustentável que vem tomando o mundo hoje, alternativas menos agressivas para o meio-ambiente, no uso dos recursos hídricos, do solo e de preservação do ecossistema nativo, propõem repensar o modelo tradicional de cultivo...', 'imagens/noticias/noticia06.jpg'),
	(7, 'Produção de orgânicos: saiba como rentabilizar nesse nicho crescente', '2022/12/02', 'Breno Coltro da Costa', 'A população brasileira vem consumindo cada vez mais alimentos que escapem do uso de agrotóxicos em busca de uma alimentação mais saudável. Apesar de uma colheita comparativamente menor, o produtor pode adquirir bons rendimentos se investir nesse nicho do mercado se...', 'imagens/noticias/noticia07.jpg');`;
	
// db.run(querynoticias, function(err){
//     if (err) {
//         return console.log(err.message);
//     }
//     console.log(Query realizada com sucesso!);
// });

const texto = `
Primeiro parágrafo. Primeiro parágrafo. Primeiro parágrafo. Primeiro parágrafo. Primeiro parágrafo. Primeiro parágrafo. Primeiro parágrafo. Primeiro parágrafo. Primeiro parágrafo. Primeiro parágrafo. Primeiro parágrafo. Primeiro parágrafo. Primeiro parágrafo. Primeiro parágrafo. Primeiro parágrafo. Primeiro parágrafo. Primeiro parágrafo. Primeiro parágrafo. Primeiro parágrafo. Primeiro parágrafo. Primeiro parágrafo.
Segundo parágrafo mais extenso. Segundo parágrafo mais extenso. Segundo parágrafo mais extenso. Segundo parágrafo mais extenso. Segundo parágrafo mais extenso. Segundo parágrafo mais extenso. Segundo parágrafo mais extenso. Segundo parágrafo mais extenso. Segundo parágrafo mais extenso. Segundo parágrafo mais extenso. Segundo parágrafo mais extenso. Segundo parágrafo mais extenso. Segundo parágrafo mais extenso. Segundo parágrafo mais extenso. Segundo parágrafo mais extenso. Segundo parágrafo mais extenso. Segundo parágrafo mais extenso. Segundo parágrafo mais extenso. Segundo parágrafo mais extenso. Segundo parágrafo mais extenso. Segundo parágrafo mais extenso. Segundo parágrafo mais extenso. Segundo parágrafo mais extenso. Segundo parágrafo mais extenso. Segundo parágrafo mais extenso. Segundo parágrafo mais extenso. Segundo parágrafo mais extenso. Segundo parágrafo mais extenso. Segundo parágrafo mais extenso. Segundo parágrafo mais extenso.
Terceiro parágrafo um pouco menor. Terceiro parágrafo um pouco menor. Terceiro parágrafo um pouco menor. Terceiro parágrafo um pouco menor. Terceiro parágrafo um pouco menor. Terceiro parágrafo um pouco menor. Terceiro parágrafo um pouco menor. Terceiro parágrafo um pouco menor. 
`;

const queryconteudo = `
SELECT conteudo, idNoticia
FROM noticia
`;

const querytexto = `
UPDATE noticia AS noticia1
SET conteudo = ?
WHERE idNoticia = ?
`;

// db.all(queryconteudo, [], (err, rows) => {
//     if (err) {
//         return console.error(err.message);
//     }
//     rows.forEach((row) => {
//         db.run(querytexto, [row['conteudo'] + texto, row['idNoticia']], (err) => {
//             if (err) {
//                 return console.error(err.message);
//             }
//             // console.log(Row(s) updated: ${this.changes});
//         });
//         // console.log(row['conteudo']);
//     })
// });

db.all(queryconteudo, [], (err, rows) => {
	if (err) {
		return console.error(err.message);
	}
	rows.forEach((row) => {
		console.log(row['conteudo']);
	})
});


// Fechar conexão com base de dados
db.close();