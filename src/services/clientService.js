const db = require('../config/postgre');

// Consultar todos os clientes
const getClients = async () => {
    let sql = 'SELECT * FROM client';
    let clients = await db.query(sql);
    return clients.rows;
}

// Consultar cliente por ID
const getClientById = async (params) => {
    let sql = 'SELECT * FROM client WHERE id = $1';
    let client = await db.query(sql, [params.id]);
    return client.rows;
}

// Persistir cliente (edita ou cria)
const persistClient = async (params) => {
    let { cpf, nome, endereco, cidade, uf, email } = params;
    if(params.id){
        let id = params.id;
        let fields = [];
        Object.keys(params).forEach(campo => campo !== 'id' && fields.push(`${campo} = '${params[campo]}'`));
        fields = fields.join(', ');
        const sql = `UPDATE client SET ${fields} WHERE id = ${id} RETURNING *`;
        let insert = await db.query(sql);
        return insert.rows[0];
    } else {
        let sql = `
            INSERT INTO client (cpf, nome, endereco, cidade, uf, email) 
            VALUES ($1, $2, $3, $4, $5, $6) 
            ON CONFLICT (cpf) 
            DO UPDATE SET 
                nome = $2,
                endereco = $3,
                cidade = $4,
                uf = $5,
                email = $6 
            RETURNING id
        `;
        let insert = await db.query(sql, [cpf, nome, endereco, cidade, uf, email]);
        return insert.rows[0];
    }

}

// Deletar cliente
const deleteClient = async (params) => {
    if(/^\d+$/.test(params.id)){
        let sql = `DELETE FROM client WHERE id = ${params.id }`;
        let query = await db.query(sql);
        return query.rowCount ? "Registro deletado com sucesso" : {
            "message": "Nada encontrado com o id "+ params.id
        };
    } else{
        return {
            "message": "Necessário informar um id"
        };
    }
}

module.exports.getClients = getClients;
module.exports.getClientById = getClientById;
module.exports.persistClient = persistClient;
module.exports.deleteClient = deleteClient;
