# Descrição do Projeto

Este projeto é o trabalho final da disciplina de banco de dados e visa a integração de três diferentes bancos de dados: MongoDB, PostgreSQL e Redis. A escolha da implementação foi feita em Node.js, devido à facilidade de conexão com esses três bancos de dados.

## Bases de Dados Utilizadas

1. **MongoDB:**
   - Banco de dados NoSQL orientado a documentos.
   - Armazenamento de dados dos clientes e seus relacionamentos (amigos).
   - Estrutura da coleção: `Pessoa{objectID, nome, cpf, e-mail, amigo: objectID1}`

2. **PostgreSQL:**
   - Banco de dados relacional.
   - Armazenamento de dados dos clientes e suas compras.
   - Estrutura de tabelas:
     - `Cliente(id, cpf, nome, endereco, cidade, uf, e-mail)`
     - `Compras(codigo, produto, valor, data, id_cliente)`

3. **Redis:**
   - Banco de dados chave-valor.
   - Armazenamento de dados combinados das bases MongoDB e PostgreSQL para consulta.
   - Informações recomendadas: `nome do amigo do cliente, nome do cliente, compra do cliente, valor da compra`.

## Estrutura do Projeto

O código-fonte do projeto está organizado nos seguintes diretórios:

- `src/`: Contém o código principal do projeto, nele estão os seguintes diretórios.
    - `config/`: Contém códigos relacionados às conexões com os bancos de dados.
    - `controllers/`: Recebe as requisições das routes e envia para o service como necessário.
    - `routes/`: Arquivo index agrupa todos os demais arquivos de configuração de rota da api.
    - `services/`: Contém códigos com a logica para cada classe, aqui que ocore a interação com o banco de dados.

## Rodar o Projeto

No projeto utilizamos o docker para conteinerizar todos os serviços, é possivel ver as configurações feitas no arquivo `docker-compose.yaml`

Para executar o projeto, utilize o seguinte comando no terminal:

```bash
docker-compose up -d
```

Abra o arquivo `/front/index.html`
Faça inserções de dois clientes na rota `(POST) /cliente`
```
{
	"cpf": Char(11),
 	"nome": Char(255),
	"endereco": Char(255), 
	"cidade":  Char(255),
	"uf": Char(2),
	"email": Char(255)
} 
```
Faça inserções de compras na rota `(POST) /buy`
```
{
	"produto": Char(11),
 	"valor": Decimal(10, 2),
	"endereco": Char(255), 
	"data":  Date(YYYY/MM/DD),
	"id_client": INT,
    "friend_client": INT,
} 
```