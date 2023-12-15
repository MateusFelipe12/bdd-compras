const e = require('express');
const db = require('../config/postgre');
const redis = require('../config/redis');

let dataRedis = {
    friend_client: '',
    id_client: '',
    friend_client_name: '',
    client_name: '',
    buy: '',
    valueBuy: '',
};

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
    let { produto, valor, data, id_client, friend_client} = params;
    
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
        
        
        let id = insert?.rows[0] ? insert?.rows[0].codigo : false;

        if( id ) {
            dataRedis.buy = produto;
            dataRedis.id_client = id_client;
            dataRedis.friend_client = friend_client;
            dataRedis.valueBuy = valor;

            const clientesController = require('./clientService');
            friend_client = await clientesController.getClientById({id: friend_client})
            client = await clientesController.getClientById({id: id_client})
            dataRedis.friend_client_name = friend_client[0]?.nome;
            dataRedis.client_name = client[0]?.nome;

            try {
                let res = await redis.setData(id, dataRedis)
            } catch(err) {
                console.log(err)
            }
        }    

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
