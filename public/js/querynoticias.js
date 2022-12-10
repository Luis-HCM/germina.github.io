const querynoticias = (banco, listanoticias) => {
	banco.each('SELECT * FROM noticia', function (err, row) {
		if (err) {
			return console.log(err);
		}

		let obj = {};
		for (att in row ) {
			obj[`${att}`] = row[`${att}`];
		}

		listanoticias.push(obj);
	});
}

const querysinglenoticia = async (banco, id) => {
	return new Promise ((resolve, reject) => {
		banco.get(`SELECT * FROM noticia WHERE idNoticia = ?`, [id], (err, row) => {
			if (err) {
				resolve(null);
				return console.log(err);
			}

			let obj = {};
			for (let att in row) {
				obj[`${att}`] = row[`${att}`];
			}

			resolve(obj);
		})
	})
}

module.exports = {querynoticias, querysinglenoticia};