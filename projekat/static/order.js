window.addEventListener("load", () => {

    const cookies = document.cookie.split("=");
    const token = cookies[cookies.length-1];

    fetch('http://localhost:8090/admin/order/', {method:'GET', headers: {'Authorization': `Bearer ${token}`}})
        .then(response => response.json())
        .then(data => {
            console.log(data);
            updateTable(data);
        });

    document.getElementById("addOrderBtn").addEventListener("click", createCart);

    document.getElementById("btn_dodaj_novu_order").addEventListener("click", function(){
        $("#ordersModal").modal('show');
    });

    document.getElementById("actionCreate").addEventListener("click", function(){
        $("#ordersModal").modal('show');
    });

    document.getElementById("actionEdit").addEventListener("click", function(){
        $("#editOrderModal").modal('show');
    });
});

function createCart(){

    const cookies = document.cookie.split("=");
    const token = cookies[cookies.length - 1];

    $("#ordersModal").modal('show');

    let order = {
        deliveringType: document.getElementById("input_delivering_type").value,
        postCode: document.getElementById("input_post_code").value,
        paymentID: document.getElementById("input_payment_id").value
    }

    order_json = JSON.stringify(order);

    fetch("http://localhost:8090/admin/order/", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: order_json
    })
        .then(response => response.json())
        .then(data => {
            if(data.msg){
                alert(data.msg);
            }else if(data.error){
                alert(data.error);
            }else{
                fetch('http://localhost:8090/admin/order/', {method: "GET", 'Authorization': `Bearer ${token}`})
                    .then(response => response.json())
                    .then(data => updateTable(data));
            }
        });

        document.getElementById("input_delivering_type").value = "";
        document.getElementById("input_post_code").value = "";
        document.getElementById("input_payment_id").value = "";

        $("#ordersModal").modal('hide');

}

function updateTable(data){
    
    const cookies = document.cookie.split("=");
    const token = cookies[cookies.length - 1];

    var tabela = document.getElementById("ordersTable");
    tabela.innerHTML = "";

    for(i in data){
        let redHTML = 
        `<tr data-orderID="` + data[i].id + `"><td>`+data[i].id + `</td><td>` + data[i].deliveringType +
            `</td><td>` + data[i].postCode + `<td></td><td>` + data[i].paymentID + `</td><td>`+ 
            `<button class="btn btn-danger btn-sm btn_obrisi">Obrisi</button>
                <button class="btn btn-warning btn-sm btn_izmeni">Izmeni</button>
            </td>`;

        tabela.innerHTML += redHTML;
    }

    var obrisi_buttons = document.querySelectorAll(".btn_obrisi");

    for(i=0; i < obrisi_buttons.length; i++){
        let id = obrisi_buttons[i].parentNode.parentNode.dataset.orderid;
        obrisi_buttons[i].addEventListener("click", function(e){
            e.preventDefault();
            fetch("http://localhost:8090/admin/order/"+ id, {method: "DELETE", headers: {'Authorization': `Bearer ${token}`}})
                .then(response => response.json())
                .then(data => {
                    if(data.error){
                        alert(data.error);
                    }else if(data.msg){
                        alert(data.msg)
                    }else{
                        fetch("http://localhost:8090/admin/order/", {method:"GET", headers: {'Authorization': `Bearer ${token}`}})
                            .then(response => response.json())
                            .then(data => updateTable(data));
                    }
                });
        });
    }

    var izmeni_buttons = document.querySelectorAll(".btn_izmeni");

    for(i=0; i < izmeni_buttons.length; i++){

        izmeni_buttons[i].addEventListener("click", function(e){
            e.preventDefault();
            $("#editOrderModal").modal('show');

            let order_id = this.parentNode.parentNode.dataset.orderid;

            document.getElementById("editOrderBtn").addEventListener("click", function(e){
                e.preventDefault();
                let edit = {
                    id: order_id,
                    deliveringType: document.getElementById("edit_input_delivering_type").value,
                    postCode: document.getElementById("edit_input_post_code").value,
                    paymentID: document.getElementById("edit_input_payment_id").value
                };
                
                console.log(edit);
                
                http_body = JSON.stringify(edit);

                fetch("http://localhost:8090/admin/order/"+order_id, {
                    method: "PUT",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: http_body
                })
                    .then(response => response.json())
                    .then(data => {
                        if(data.msg){
                            alert(data.msg);
                        }else if(data.error){
                            alert(data.error);
                        }else {
                            fetch("http://localhost:8090/admin/order/", {method: "GET", headers: {'Authorization': `Bearer ${token}`}})
                                .then(response => response.json())
                                .then(tableData => updateTable(tableData));
                        }
                    });

                    document.getElementById("edit_input_delivering_type").value = "";
                    document.getElementById("edit_input_post_code").value = "";
                    document.getElementById("edit_input_payment_id").value = "";

                    $("#editOrderModal").modal('hide');
                    
            })
        });

    }

}