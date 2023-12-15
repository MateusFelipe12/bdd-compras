const { connectToMongoDB, ObjectId } = require('../config/mongodb');

// Consultar todos os clientes
const getPerson = async () => {
    try {
        const db = await connectToMongoDB();
        const peopleCollection = db.collection('people');
        const persons = await peopleCollection.find().toArray();
        return persons;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

// Consultar cliente por ID
const getPersonById = async (params) => {
    try {
        const db = await connectToMongoDB();
        const peopleCollection = db.collection('people');
        const person = await peopleCollection.findOne({ _id: new ObjectId(params.id) });
        return person;
    } catch (err) {
        console.log(err)
        throw err;
    }
}

const persistPerson = async (params) => {
    try {
        let { id, cliente_id, friend_client, client_buy, value_buy } = params;
        const db = await connectToMongoDB();
        const peopleCollection = db.collection('people');
        if (id) {
            
            const updatedClient = await peopleCollection.findOneAndUpdate(
                { _id: new ObjectId(id) },
                {
                    $set: {
                        cliente_id,
                        friend_client,
                        // amigos: amigos ? amigos.map(amigoId => new db(amigoId)) : []
                        client_buy,
                        value_buy
                    }
                },
                { returnDocument: 'after' }
            );

            return updatedClient;
        } else {
            // Inserir novo cliente na Base 1 (MongoDB)
            const newClient = await peopleCollection.insertOne({
                cliente_id,
                friend_client,
                // amigos: amigos ? amigos.map(amigoId => new db(amigoId)) : []
                client_buy,
                value_buy
            });

            return newClient.insertedId;
        }
    } catch (err) {
        console.log(err)
        throw err;
    }
};


const deletePerson = async (params) => {
    try {
        const db = await connectToMongoDB();
        if (params.id) {
            const peopleCollection = db.collection('people');
            const deletePerson = await peopleCollection.findOneAndDelete({ _id: new ObjectId(params.id) });
            return deletePerson
                ? "Registro deletado com sucesso"
                : { message: "Nada encontrado com o id " + params.id };
        } else {
            return { message: "Necessário informar um id válido" };
        }
    } catch(err) {
        console.log(err)
    }
};

module.exports.getPerson = getPerson;
module.exports.getPersonById = getPersonById;
module.exports.persistPerson = persistPerson;
module.exports.deletePerson = deletePerson;
