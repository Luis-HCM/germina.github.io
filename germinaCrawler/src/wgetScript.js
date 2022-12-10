const exec = require('child_process').exec;

let lista_itens = ['boi-gordo', 'acucar', 'arroz', 'bezerro', 'cafe', 'milho', 'soja', 'trigo'];

for (let item of lista_itens){
    exec((`touch "germinaCrawler/src/output_${item}.html"`), function (error, stdout, stderr) {
            console.log('stdout: ' + stdout);
            console.log('stderr: ' + stderr);
            if (error !== null) {
                console.log('exec error: ' + error);
            }
        }
    );

    exec((`wget --user-agent="Chrome" -O "germinaCrawler/src/output_${item}.html" https://www.cepea.esalq.usp.br/br/indicador/${item}.aspx`), function (error, stdout, stderr) {
            console.log('stdout: ' + stdout);
            console.log('stderr: ' + stderr);
            if (error !== null) {
                console.log('exec error: ' + error);
            }
        }
    );
}