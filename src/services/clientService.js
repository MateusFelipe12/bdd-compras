const db = require('../config/db');

//consultar o cliente
const pegarClientes = async () => {
    let sql = 'select * from clientes';
    let clientes = await db.query(sql);
    return clientes.rows;
}

const clientesId = async (params) => {

    let sql = `select * from clientes where id = $1`;
    let cliente = await db.query(sql, [params.id]);
    return cliente.rows;
}


const postClientes = async (params) => {
    let {nome, cpf, rg,data_nascimento, id_contato, id_endereco } = params;
    let sql =`insert into clientes 
    (
        nome, 
        cpf, 
        rg, 
        data_nascimento, 
        id_contato, 
        id_endereco
    ) values($1, $2, $3, $4, $5, $6) returning id` ;
    let insert = await db.query(sql, [nome, cpf, rg,data_nascimento, id_contato, id_endereco])
    return insert.rows[0];
}

const patchCliente = async (params) => {
    let fields = [];
    Object.keys(params).forEach(campo => campo !== 'id' && fields.push(`${campo} = '${params[campo]}'`));
    fields = fields.join(', ');
    const sql = `update clientes set ${fields} where id = ${params.id}`;
    await db.query(sql);
}

const deleteCliente = async (params) => {
    let sql = 'delete from clientes where id = $1;';
    let query = await db.query(sql, [params.id]);
    return query.rowCount == 1;
} 

const getClienteInfos = async (params) => {
    let where = params.id != 0 ? 'WHERE c.id = $1' : '';
    let sql = ` 
    SELECT 
        c.id,
        c.nome as cliente,
        e.cidade,
        e.bairro,
        e.rua,
        e.numero,
        co.celular,
        co.telefone,
        co.email
    FROM clientes as c
    JOIN enderecos_clientes as ec ON c.id_endereco = ec.id
    JOIN enderecos as e ON ec.id_enderecos = e.id
    JOIN contatos as co ON c.id_contato = co.id
    ${where}
    `;
    let query = params.id != 0 ? await db.query(sql, [params.id]) : await db.query(sql);
    return query.rows;
}

module.exports.pegarClientes = pegarClientes;
module.exports.clientesId = clientesId;
module.exports.postClientes = postClientes;
module.exports.patchCliente = patchCliente;
module.exports.deleteCliente = deleteCliente;
module.exports.getClienteInfos = getClienteInfos;