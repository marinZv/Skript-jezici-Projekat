window.addEventListener("load", () => {

    const cookies = document.cookie.split("=");
    const token = cookies[cookies.length-1];

    fetch('http://localhost:8090/admin/payment/', {method:'GET', headers: {'Authorization': `Bearer ${token}`}})
        .then(response => response.json())
        .then(data => {
            console.log(data);
            updateTable(data);
        });

    document.getElementById("addPaymentBtn").addEventListener("click", createCart);

    document.getElementById("btn_dodaj_novu_payment").addEventListener("click", function(){
        $("#paymentsModal").modal('show');
    });

    document.getElementById("actionCreate").addEventListener("click", function(){
        $("#paymentsModal").modal('show');
    });

    document.getElementById("actionEdit").addEventListener("click", function(){
        $("#editPaymentModal").modal('show');
    });
});

function createCart(){

    const cookies = document.cookie.split("=");
    const token = cookies[cookies.length - 1];

    $("#paymentsModal").modal('show');

    let payment = {
        cardID: document.getElementById("input_card_id").value,
        cardOwner: document.getElementById("input_card_owner").value,
        userID: document.getElementById("input_user_id").value
    }

    payment_json = JSON.stringify(payment);

    fetch("http://localhost:8090/admin/payment/", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: payment_json
    })
        .then(response => response.json())
        .then(data => {
            if(data.msg){
                alert(data.msg);
            }else if(data.error){
                alert(data.error);
            }else{
                fetch('http://localhost:8090/admin/payment/', {method: "GET", 'Authorization': `Bearer ${token}`})
                    .then(response => response.json())
                    .then(data => updateTable(data));
            }
        });

        document.getElementById("input_card_id").value = "";
        document.getElementById("input_card_owner").value = "";
        document.getElementById("input_user_id").value = "";

        $("#paymentsModal").modal('hide');

}

function updateTable(data){
    
    const cookies = document.cookie.split("=");
    const token = cookies[cookies.length - 1];

    var tabela = document.getElementById("paymentsTable");
    tabela.innerHTML = "";

    for(i in data){
        let redHTML = 
        `<tr data-paymentID="` + data[i].id + `"><td>`+data[i].id + `</td><td>` + data[i].cardID +
            `</td><td>` + data[i].cardOwner + `<td></td><td>` + data[i].userID + `</td><td>`+ 
            `<button class="btn btn-danger btn-sm btn_obrisi">Obrisi</button>
                <button class="btn btn-warning btn-sm btn_izmeni">Izmeni</button>
            </td>`;

        tabela.innerHTML += redHTML;
    }

    var obrisi_buttons = document.querySelectorAll(".btn_obrisi");

    for(i=0; i < obrisi_buttons.length; i++){
        let id = obrisi_buttons[i].parentNode.parentNode.dataset.paymentid;
        obrisi_buttons[i].addEventListener("click", function(e){
            e.preventDefault();
            fetch("http://localhost:8090/admin/payment/"+ id, {method: "DELETE", headers: {'Authorization': `Bearer ${token}`}})
                .then(response => response.json())
                .then(data => {
                    if(data.error){
                        alert(data.error);
                    }else if(data.msg){
                        alert(data.msg)
                    }else{
                        fetch("http://localhost:8090/admin/payment/", {method:"GET", headers: {'Authorization': `Bearer ${token}`}})
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
            $("#editPaymentModal").modal('show');

            let payment_id = this.parentNode.parentNode.dataset.paymentid;

            document.getElementById("editPaymentBtn").addEventListener("click", function(e){
                e.preventDefault();
                let edit = {
                    id: payment_id,
                    cardID: document.getElementById("edit_input_card_id").value,
                    cardOwner: document.getElementById("edit_input_card_owner").value,
                    userID: document.getElementById("edit_input_user_id").value
                };
                
                console.log(edit);
                
                http_body = JSON.stringify(edit);

                fetch("http://localhost:8090/admin/payment/"+payment_id, {
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
                            fetch("http://localhost:8090/admin/payment/", {method: "GET", headers: {'Authorization': `Bearer ${token}`}})
                                .then(response => response.json())
                                .then(tableData => updateTable(tableData));
                        }
                    });

                    document.getElementById("edit_input_card_id").value = "";
                    document.getElementById("edit_input_card_owner").value = "";
                    document.getElementById("edit_input_user_id").value = "";

                    $("#editPaymentModal").modal('hide');
                    
            })
        });

    }

}