window.addEventListener("load", () => {

    const cookies = document.cookie.split("=");
    const token = cookies[cookies.length-1];

    fetch('http://localhost:8090/admin/ticket/', {method:'GET', headers: {'Authorization': `Bearer ${token}`}})
        .then(response => response.json())
        .then(data => {
            console.log(data);
            updateTable(data);
        });

    document.getElementById("addTicketBtn").addEventListener("click", createCart);

    document.getElementById("btn_dodaj_novu_ticket").addEventListener("click", function(){
        $("#ticketsModal").modal('show');
    });

    document.getElementById("actionCreate").addEventListener("click", function(){
        $("#ticketsModal").modal('show');
    });

    document.getElementById("actionEdit").addEventListener("click", function(){
        $("#editTicketModal").modal('show');
    });
});

function createCart(){

    const cookies = document.cookie.split("=");
    const token = cookies[cookies.length - 1];

    $("#ticketsModal").modal('show');

    let ticket = {
        price: document.getElementById("input_price").value,
        ticketType: document.getElementById("input_ticket_type").value,
        seatNumber: document.getElementById("input_seat_number").value,
        seatSide: document.getElementById("input_seat_side").value,
        orderItemID: document.getElementById("input_order_item_id").value,
        cartItemID: document.getElementById("input_cart_item_id").value,
        matchID: document.getElementById("input_match_id").value
    }

    ticket_json = JSON.stringify(ticket);

    fetch("http://localhost:8090/admin/ticket/", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: ticket_json
    })
        .then(response => response.json())
        .then(data => {
            if(data.msg){
                alert(data.msg);
            }else if(data.error){
                alert(data.error);
            }else{
                fetch('http://localhost:8090/admin/ticket/', {method: "GET", 'Authorization': `Bearer ${token}`})
                    .then(response => response.json())
                    .then(data => updateTable(data));
            }
        });

        document.getElementById("input_price").value = "";
        document.getElementById("input_ticket_type").value = "";
        document.getElementById("input_seat_number").value = "";
        document.getElementById("input_seat_side").value = "";
        document.getElementById("input_order_item_id").value = "";
        document.getElementById("input_cart_item_id").value = "";
        document.getElementById("input_match_id").value = "";

        $("#ticketsModal").modal('hide');

}

function updateTable(data){
    
    const cookies = document.cookie.split("=");
    const token = cookies[cookies.length - 1];

    var tabela = document.getElementById("ticketsTable");
    tabela.innerHTML = "";

    for(i in data){
        let redHTML = 
        `<tr data-ticketID="` + data[i].id + `"><td>`+data[i].id + `</td><td>` + data[i].price +
            `</td><td>` + data[i].ticketType + `</td><td>` + data[i].seatNumber + `</td><td>`+ 
            `</td><td>` + data[i].seatSide + `</td><td>` + data[i].orderItemID + `</td><td>`+ 
            `</td><td>` + data[i].matchID + `</td><td>` + data[i].cartItemID + `</td><td>`+ 
            `<button class="btn btn-danger btn-sm btn_obrisi">Obrisi</button>
                <button class="btn btn-warning btn-sm btn_izmeni">Izmeni</button>
            </td>`;

        tabela.innerHTML += redHTML;
    }

    var obrisi_buttons = document.querySelectorAll(".btn_obrisi");

    for(i=0; i < obrisi_buttons.length; i++){
        let id = obrisi_buttons[i].parentNode.parentNode.dataset.ticketid;
        obrisi_buttons[i].addEventListener("click", function(e){
            e.preventDefault();
            fetch("http://localhost:8090/admin/ticket/"+ id, {method: "DELETE", headers: {'Authorization': `Bearer ${token}`}})
                .then(response => response.json())
                .then(data => {
                    if(data.error){
                        alert(data.error);
                    }else if(data.msg){
                        alert(data.msg)
                    }else{
                        fetch("http://localhost:8090/admin/ticket/", {method:"GET", headers: {'Authorization': `Bearer ${token}`}})
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
            $("#editTicketModal").modal('show');

            let ticket_id = this.parentNode.parentNode.dataset.ticketid;

            document.getElementById("editTicketBtn").addEventListener("click", function(e){
                e.preventDefault();
                let edit = {
                    id: ticket_id,
                    price: document.getElementById("edit_input_price").value,
                    ticketType: document.getElementById("edit_input_ticket_type").value,
                    seatNumber: document.getElementById("edit_input_seat_number").value,
                    seatSide: document.getElementById("edit_input_seat_side").value,
                    orderItemID: document.getElementById("edit_input_order_item_id").value,
                    matchID: document.getElementById("edit_input_match_id").value,
                    cartItemID: document.getElementById("edit_input_cart_item_id").value
                };
                
                console.log(edit);
                
                http_body = JSON.stringify(edit);

                fetch("http://localhost:8090/admin/ticket/"+ticket_id, {
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
                            fetch("http://localhost:8090/admin/ticket/", {method: "GET", headers: {'Authorization': `Bearer ${token}`}})
                                .then(response => response.json())
                                .then(tableData => updateTable(tableData));
                        }
                    });

                    document.getElementById("edit_input_price").value = "";
                    document.getElementById("edit_input_ticket_type").value = "";
                    document.getElementById("edit_input_seat_number").value = "";
                    document.getElementById("edit_input_seat_side").value = "";
                    document.getElementById("edit_input_order_item_id").value = "";
                    document.getElementById("edit_input_match_id").value = "";
                    document.getElementById("edit_input_cart_item_id").value = "";

                    $("#editTicketModal").modal('hide');
                    
            })
        });

    }

}