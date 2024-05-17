window.addEventListener("load", () => {

    const cookies = document.cookie.split("=");
    const token = cookies[cookies.length-1];

    fetch('http://localhost:8090/admin/arena/', {method:'GET', headers: {'Authorization': `Bearer ${token}`}})
        .then(response => response.json())
        .then(data => {
            console.log(data);
            updateTable(data);
        });

    document.getElementById("addArenaBtn").addEventListener("click", createCart);

    document.getElementById("btn_dodaj_novu_arena").addEventListener("click", function(){
        $("#arenasModal").modal('show');
    });

    document.getElementById("actionCreate").addEventListener("click", function(){
        $("#arenasModal").modal('show');
    });

    document.getElementById("actionEdit").addEventListener("click", function(){
        $("#editArenaModal").modal('show');
    });
});

function createCart(){

    const cookies = document.cookie.split("=");
    const token = cookies[cookies.length - 1];

    $("#arenasModal").modal('show');

    let arena = {
        arenaName: document.getElementById("input_arena_name").value,
        capacity: document.getElementById("input_capacity").value,
        locationID: document.getElementById("input_location_id").value
    }

    arena_json = JSON.stringify(arena);

    fetch("http://localhost:8090/admin/arena/", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: arena_json
    })
        .then(response => response.json())
        .then(data => {
            if(data.msg){
                alert(data.msg);
            }else if(data.error){
                alert(data.error);
            }else{
                fetch('http://localhost:8090/admin/arena/', {method: "GET", 'Authorization': `Bearer ${token}`})
                    .then(response => response.json())
                    .then(data => updateTable(data));
            }
        });

        document.getElementById("input_arena_name").value = "";
        document.getElementById("input_capacity").value = "";
        document.getElementById("input_location_id").value = "";

        $("#arenasModal").modal('hide');

}

function updateTable(data){
    
    const cookies = document.cookie.split("=");
    const token = cookies[cookies.length - 1];

    var tabela = document.getElementById("arenasTable");
    tabela.innerHTML = "";

    for(i in data){
        let redHTML = 
        `<tr data-arenaID="` + data[i].id + `"><td>`+data[i].id + `</td><td>` + data[i].arenaName +
            `</td><td>` + data[i].capacity + `</td><td>` + data[i].locationID + `</td><td>`+ 
            `<button class="btn btn-danger btn-sm btn_obrisi">Obrisi</button>
                <button class="btn btn-warning btn-sm btn_izmeni">Izmeni</button>
            </td></tr>`;

        tabela.innerHTML += redHTML;
    }

    var obrisi_buttons = document.querySelectorAll(".btn_obrisi");

    for(i=0; i < obrisi_buttons.length; i++){
        let id = obrisi_buttons[i].parentNode.parentNode.dataset.arenaid;
        obrisi_buttons[i].addEventListener("click", function(e){
            e.preventDefault();
            fetch("http://localhost:8090/admin/arena/"+ id, {method: "DELETE", headers: {'Authorization': `Bearer ${token}`}})
                .then(response => response.json())
                .then(data => {
                    if(data.error){
                        alert(data.error);
                    }else if(data.msg){
                        alert(data.msg)
                    }else{
                        fetch("http://localhost:8090/admin/arena/", {method:"GET", headers: {'Authorization': `Bearer ${token}`}})
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
            $("#editArenaModal").modal('show');

            let arena_id = this.parentNode.parentNode.dataset.arenaid;

            document.getElementById("editArenaBtn").addEventListener("click", function(e){
                e.preventDefault();
                let edit = {
                    id: arena_id,
                    arenaName: document.getElementById("edit_input_arena_name").value,
                    capacity: document.getElementById("edit_input_capacity").value,
                    locationID: document.getElementById("edit_input_location_id").value
                };
                
                console.log(edit);
                
                http_body = JSON.stringify(edit);

                fetch("http://localhost:8090/admin/arena/"+arena_id, {
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
                            fetch("http://localhost:8090/admin/arena/", {method: "GET", headers: {'Authorization': `Bearer ${token}`}})
                                .then(response => response.json())
                                .then(tableData => updateTable(tableData));
                        }
                    });

                    document.getElementById("edit_input_arena_name").value = "";
                    document.getElementById("edit_input_capacity").value = "";
                    document.getElementById("edit_input_location_id").value = "";

                    $("#editArenaModal").modal('hide');
                    
            })
        });

    }

}