const redis = require('../config/redis');

let dataRedis = {
    friend_client: '',
    id_client: '',
    friend_client_name: '',
    client_name: '',
    buy: '',
    valueBuy: '',
};

const getData = async () => {
    let data = [];
    let allKeys = await redis.client.keys('*');

    data = await Promise.all(allKeys.map(async function(e) {
        let res = await redis.getData(e);
        return res;
    }));


    return data;
};


// const getData = async () => {
//     console.log('service')
//     let data = [];
//     let allKeys = await redis.client.keys('*')

//     data = allKeys.map( async function(e) {
//         let res = await redis.getData(e)
//         return res;
//     })

//     console.log(data)

//     return data;
// }


module.exports.getData = getData;
