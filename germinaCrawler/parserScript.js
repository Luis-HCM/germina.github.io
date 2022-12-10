const htmlparser = require('node-html-parser');
const ejs = require('ejs');

let produto_id = {'boi-gordo': 4, 'acucar': 1, 'arroz': 2, 'bezerro': 3, 'cafe': 5, 'milho': 6, 'soja': 7, 'trigo': 8};

const sqlite3 = require('sqlite3');

let db = new sqlite3.Database('../GERMINAPUCC/germina.db', (err) => {
	if (err) {
	  console.error(err.message);
	}
	console.log('Conectado a base de dados');
});

 function insert(inst) {
    let idP = produto_id[`${inst['produto']}`];
    let insertquery = `INSERT INTO preco(data, valorReal, variacaoDiaria, variacaoMensal, produto) VALUES ('${inst['data']}', ${inst['Valor R$']}, ${inst['Var./Dia']}, ${inst['Var./Mês']}, ${idP})`;
    db.run(insertquery, function(err){
		if (err) {
			return console.log(err.message);
		}
 		console.log(`Insert Query executada com sucesso!`);
	});
}

let arquivo, root, result;
for (let item in produto_id){
    arquivo = ejs.fileLoader(`germinaCrawler/src/output_${item}.html`).toString();
    root = htmlparser.parse(arquivo);
    result = root.getElementsByTagName('table');

    let tabela = [];
    for(let w = 1; w <= 29; w += 2){ //w sao as instancias
        let instance = {'produto': item}; //z sao as colunas
        for(let z = 1; z <= 7; z +=2){
            if (z === 1){ 
                instance['data'] = result[0].childNodes[3].childNodes[w].childNodes[z].text;
                continue;
            } else {
                instance[`${((result[0].childNodes[1].childNodes[1].childNodes[z].text).replace("*", "")).replace("/t", "")}`] = parseFloat((((result[0].childNodes[3].childNodes[w].childNodes[z].text).replace("%", "")).replace(".", "")).replace(",", "."));
            }
        }
        tabela.push(instance);
    }
    tabela.map(instancia => {
        let stringdate = instancia.data.split("/");
        [stringdate[0], stringdate[2]] = [stringdate[2], stringdate[0]];
        instancia.data = stringdate.join("-");
        insert(instancia);
    });
}