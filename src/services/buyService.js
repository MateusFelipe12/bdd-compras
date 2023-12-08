const e = require('express');
const db = require('../config/db');

const getBuy = async () => {
    let sql = 'SELECT * FROM buy';
    let buys = await db.query(sql);
    return buys.rows;
}

const getBuyById = async (params) => {
    let sql = 'SELECT * FROM buy WHERE codigo = $1';
    let buy = await db.query(sql, [params.codigo]);
    return buy.rows;
}
// Persistir compra (edita ou cria)
const persistBuy = async (params) => {
    let { produto, valor, data, id_client } = params;
    if (params.codigo) {
        let codigo = params.codigo;
        let fields = [];
        Object.keys(params).forEach(campo => campo !== 'codigo' && fields.push(`${campo} = '${params[campo]}'`));
        fields = fields.join(', ');
        const sql = `UPDATE buy SET ${fields} WHERE codigo = ${codigo} RETURNING *`;
        let update = await db.query(sql);
        return update.rows[0];
    } else {
        let sql = `
            INSERT INTO buy (produto, valor, data, id_client) 
            VALUES ($1, $2, $3, $4) 
            RETURNING *
        `;
        let insert = await db.query(sql, [produto, valor, data, id_client]);
        return insert.rows[0];
    }
}

// Deletar compra
const deleteBuy = async (params) => {
    if (/^\d+$/.test(params.codigo)) {
        let sql = `DELETE FROM buy WHERE codigo = ${params.codigo}`;
        let query = await db.query(sql);
        console.log(query.rowCount)
        console.log(query.rowCount > 0)
        return (query.rowCount > 0 ? "Registro deletado com sucesso" : {
            "message": "Nada encontrado com o código " + params.codigo
        });
    } else {
        return {
            "message": "Necessário informar um código"
        };
    }
}



module.exports.getBuy = getBuy;
module.exports.getBuyById = getBuyById;
module.exports.persistBuy = persistBuy;
module.exports.deleteBuy = deleteBuy;
