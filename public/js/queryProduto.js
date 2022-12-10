const queryProdutos = (banco, listaProdutos) => {
	banco.each('SELECT * FROM produto', function ( err, row ) {
		let obj = {};

		for( att in row ) {
			obj[`${att}`] = row[`${att}`];
		}

		obj['precos'] = new Array();
		listaProdutos.push(obj);
	});
	

	banco.each('SELECT * FROM preco', function ( err, row ) {
		let stringdate = row.data.split("-");
		[stringdate[2], stringdate[0]] = [stringdate[0], stringdate[2]];
		row.data = stringdate.join("/")
		for (let produto of listaProdutos) {
			if(row.produto == produto.idProduto) {
				produto['precos'].push(row);
			}
		}
	});
}

module.exports = {queryProdutos};