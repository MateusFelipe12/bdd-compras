$.toast = (text) => {
    Toastify({
        text: text,
        duration: 2000,
        gravity: "bottom",
        position: "left",
    }).showToast();
    return true;
}



const loadData  = async () =>{
    fetch(`http://localhost:3000/getData`)
    .then(data => data.json())
    .then(data => {
        let html = '';
        data.forEach(e => {
            e = JSON.parse(e)
            html += `
                <tr>
                  <th>#${e.id_client} - ${e.client_name}</th>
                  <th>#${e.friend_client} - ${e.friend_client_name}</th>
                  <td>${e.buy}</td>
                  <td>${e.valueBuy}</td>
                </tr>
            `
            console.log(html)
        });
        $('#table-buys tbody').html(html)
    })
    .catch(error => {
        console.error('Erro ao obter dados do Redis:', error);
    });
}

const onload = function () {
    loadData()
};


$(document).on('DOMContentLoaded', onload);

