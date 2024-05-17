window.addEventListener("load", () => {

    const cookies = document.cookie.split("=");
    const token = cookies[cookies.length-1];

    fetch('http://localhost:8090/admin/match/', {method:'GET', headers: {'Authorization': `Bearer ${token}`}})
        .then(response => response.json())
        .then(data => {
            console.log(data);
            updateTable(data);
        });

    document.getElementById("addMatchBtn").addEventListener("click", createCart);

    document.getElementById("btn_dodaj_novu_match").addEventListener("click", function(){
        $("#matchesModal").modal('show');
    });

    document.getElementById("actionCreate").addEventListener("click", function(){
        $("#matchesModal").modal('show');
    });

    document.getElementById("actionEdit").addEventListener("click", function(){
        $("#editMatchModal").modal('show');
    });
});

function createCart(){

    const cookies = document.cookie.split("=");
    const token = cookies[cookies.length - 1];

    $("#matchesModal").modal('show');

    let match = {
        refereeName: document.getElementById("input_referee_name").value,
        competitionID: document.getElementById("input_competition_id").value,
        arenaID: document.getElementById("input_arena_id").value
    }

    match_json = JSON.stringify(match);

    fetch("http://localhost:8090/admin/match/", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: match_json
    })
        .then(response => response.json())
        .then(data => {
            if(data.msg){
                alert(data.msg);
            }else if(data.error){
                alert(data.error);
            }else{
                fetch('http://localhost:8090/admin/match/', {method: "GET", 'Authorization': `Bearer ${token}`})
                    .then(response => response.json())
                    .then(data => updateTable(data));
            }
        });

        document.getElementById("input_referee_name").value = "";
        document.getElementById("input_competition_id").value = "";
        document.getElementById("input_arena_id").value = "";

        $("#matchesModal").modal('hide');

}

function updateTable(data){
    
    const cookies = document.cookie.split("=");
    const token = cookies[cookies.length - 1];

    var tabela = document.getElementById("matchesTable");
    tabela.innerHTML = "";

    for(i in data){
        let redHTML = 
        `<tr data-matchID="` + data[i].id + `"><td>`+data[i].id + `</td><td>` + data[i].refereeName +
            `</td><td>` + data[i].competitionID + `</td><td>` + data[i].arenaID + `</td><td>`+ 
            `<button class="btn btn-danger btn-sm btn_obrisi">Obrisi</button>
                <button class="btn btn-warning btn-sm btn_izmeni">Izmeni</button>
            </td>`;

        tabela.innerHTML += redHTML;
    }

    var obrisi_buttons = document.querySelectorAll(".btn_obrisi");

    for(i=0; i < obrisi_buttons.length; i++){
        let id = obrisi_buttons[i].parentNode.parentNode.dataset.matchid;
        obrisi_buttons[i].addEventListener("click", function(e){
            e.preventDefault();
            fetch("http://localhost:8090/admin/match/"+ id, {method: "DELETE", headers: {'Authorization': `Bearer ${token}`}})
                .then(response => response.json())
                .then(data => {
                    if(data.error){
                        alert(data.error);
                    }else if(data.msg){
                        alert(data.msg)
                    }else{
                        fetch("http://localhost:8090/admin/match/", {method:"GET", headers: {'Authorization': `Bearer ${token}`}})
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
            $("#editMatchModal").modal('show');

            let match_id = this.parentNode.parentNode.dataset.matchid;

            document.getElementById("editMatchBtn").addEventListener("click", function(e){
                e.preventDefault();
                let edit = {
                    id: match_id,
                    refereeName: document.getElementById("edit_input_referee_name").value,
                    competitionID: document.getElementById("edit_input_competition_id").value,
                    arenaID: document.getElementById("edit_input_arena_id").value
                };
                
                console.log(edit);
                
                http_body = JSON.stringify(edit);

                fetch("http://localhost:8090/admin/match/"+match_id, {
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
                            fetch("http://localhost:8090/admin/match/", {method: "GET", headers: {'Authorization': `Bearer ${token}`}})
                                .then(response => response.json())
                                .then(tableData => updateTable(tableData));
                        }
                    });

                    document.getElementById("edit_input_referee_name").value = "";
                    document.getElementById("edit_input_competition_id").value = "";
                    document.getElementById("edit_input_arena_id").value = "";

                    $("#editMatchModal").modal('hide');
                    
            })
        });

    }

}