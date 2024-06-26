window.addEventListener("load", () => {

    const cookies = document.cookie.split("=");
    const token = cookies[cookies.length-1];

    fetch('http://localhost:8090/admin/cartitem/', {method:'GET', headers: {'Authorization': `Bearer ${token}`}})
        .then(response => response.json())
        .then(data => {
            console.log(data);
            updateTable(data);
        });

    document.getElementById("addCartItemBtn").addEventListener("click", createCart);

    document.getElementById("btn_dodaj_novu_cart_item").addEventListener("click", function(){
        $("#cartItemsModal").modal('show');
    });

    document.getElementById("actionCreate").addEventListener("click", function(){
        $("#cartItemsModal").modal('show');
    });

    document.getElementById("actionEdit").addEventListener("click", function(){
        $("#editCartItemModal").modal('show');
    });
});

function createCart(){

    const cookies = document.cookie.split("=");
    const token = cookies[cookies.length - 1];

    $("#cartItemsModal").modal('show');

    let cartItem = {
        cartID: document.getElementById("input_cart_item_id").value,
    }

    cartItem_json = JSON.stringify(cartItem);

    fetch("http://localhost:8090/admin/cartitem/", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: cartItem_json
    })
        .then(response => response.json())
        .then(data => {
            if(data.msg){
                alert(data.msg);
            }else if(data.error){
                alert(data.error);
            }else{
                fetch('http://localhost:8090/admin/cartitem/', {method: "GET", 'Authorization': `Bearer ${token}`})
                    .then(response => response.json())
                    .then(data => updateTable(data));
            }
        });

        document.getElementById("input_cart_item_id").value = "";

        $("#cartItemsModal").modal('hide');

}

function updateTable(data){
    
    const cookies = document.cookie.split("=");
    const token = cookies[cookies.length - 1];

    var tabela = document.getElementById("cartItemsTable");
    tabela.innerHTML = "";

    for(i in data){
        let redHTML = 
        `<tr data-cartitemID="` + data[i].id + `"><td>`+data[i].id + `</td><td>` + data[i].cartID +
            `</td><td>`+ 
            `<button class="btn btn-danger btn-sm btn_obrisi">Obrisi</button>
                <button class="btn btn-warning btn-sm btn_izmeni">Izmeni</button>
            </td>`;

        tabela.innerHTML += redHTML;
    }

    var obrisi_buttons = document.querySelectorAll(".btn_obrisi");

    for(i=0; i < obrisi_buttons.length; i++){
        let id = obrisi_buttons[i].parentNode.parentNode.dataset.cartitemid;
        obrisi_buttons[i].addEventListener("click", function(e){
            e.preventDefault();
            fetch("http://localhost:8090/admin/cartitem/"+ id, {method: "DELETE", headers: {'Authorization': `Bearer ${token}`}})
                .then(response => response.json())
                .then(data => {
                    if(data.error){
                        alert(data.error);
                    }else if(data.msg){
                        alert(data.msg)
                    }else{
                        fetch("http://localhost:8090/admin/cartitem/", {method:"GET", headers: {'Authorization': `Bearer ${token}`}})
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
            $("#editCartItemModal").modal('show');

            let cart_item_id = this.parentNode.parentNode.dataset.cartitemid;

            document.getElementById("editCartItemBtn").addEventListener("click", function(e){
                e.preventDefault();
                let edit = {
                    id: cart_item_id,
                    cartID: document.getElementById("edit_input_cart_id").value,
                };
                
                console.log(edit);
                
                http_body = JSON.stringify(edit);

                fetch("http://localhost:8090/admin/cartitem/"+cart_item_id, {
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
                            fetch("http://localhost:8090/admin/cartitem/", {method: "GET", headers: {'Authorization': `Bearer ${token}`}})
                                .then(response => response.json())
                                .then(tableData => updateTable(tableData));
                        }
                    });

                    document.getElementById("edit_input_cart_id").value = "";

                    $("#editCartItemModal").modal('hide');
                    
            })
        });

    }

}