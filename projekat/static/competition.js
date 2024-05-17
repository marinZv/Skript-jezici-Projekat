window.addEventListener("load", () => {

    const cookies = document.cookie.split("=");
    const token = cookies[cookies.length-1];

    fetch('http://localhost:8090/admin/competition/', {method:'GET', headers: {'Authorization': `Bearer ${token}`}})
        .then(response => response.json())
        .then(data => {
            console.log(data);
            updateTable(data);
        });

    document.getElementById("addCompetitionBtn").addEventListener("click", createCart);

    document.getElementById("btn_dodaj_novu_competition").addEventListener("click", function(){
        $("#competitionsModal").modal('show');
    });

    document.getElementById("actionCreate").addEventListener("click", function(){
        $("#competitionsModal").modal('show');
    });

    document.getElementById("actionEdit").addEventListener("click", function(){
        $("#editCompetitionModal").modal('show');
    });
});

function createCart(){

    const cookies = document.cookie.split("=");
    const token = cookies[cookies.length - 1];

    $("#competitionsModal").modal('show');

    let competition = {
        competitionName: document.getElementById("input_competition_name").value,
        system: document.getElementById("input_system").value,
    }

    competition_json = JSON.stringify(competition);

    fetch("http://localhost:8090/admin/competition/", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: location_json
    })
        .then(response => response.json())
        .then(data => {
            if(data.msg){
                alert(data.msg);
            }else if(data.error){
                alert(data.error);
            }else{
                fetch('http://localhost:8090/admin/competition/', {method: "GET", 'Authorization': `Bearer ${token}`})
                    .then(response => response.json())
                    .then(data => updateTable(data));
            }
        });

        document.getElementById("input_competition_name").value = "";
        document.getElementById("input_system").value = "";

        $("#competitionsModal").modal('hide');

}

function updateTable(data){
    
    const cookies = document.cookie.split("=");
    const token = cookies[cookies.length - 1];

    var tabela = document.getElementById("competitionsTable");
    tabela.innerHTML = "";

    for(i in data){
        let redHTML = 
        `<tr data-competitionID="` + data[i].id + `"><td>`+data[i].id + `</td><td>` + data[i].competitionName +
            `</td><td>` + data[i].system + `<td></td><td>`+ 
            `<button class="btn btn-danger btn-sm btn_obrisi">Obrisi</button>
                <button class="btn btn-warning btn-sm btn_izmeni">Izmeni</button>
            </td>`;

        tabela.innerHTML += redHTML;
    }

    var obrisi_buttons = document.querySelectorAll(".btn_obrisi");

    for(i=0; i < obrisi_buttons.length; i++){
        let id = obrisi_buttons[i].parentNode.parentNode.dataset.competitionid;
        obrisi_buttons[i].addEventListener("click", function(e){
            e.preventDefault();
            fetch("http://localhost:8090/admin/competition/"+ id, {method: "DELETE", headers: {'Authorization': `Bearer ${token}`}})
                .then(response => response.json())
                .then(data => {
                    if(data.error){
                        alert(data.error);
                    }else if(data.msg){
                        alert(data.msg)
                    }else{
                        fetch("http://localhost:8090/admin/competition/", {method:"GET", headers: {'Authorization': `Bearer ${token}`}})
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
            $("#editCompetitionModal").modal('show');

            let competition_id = this.parentNode.parentNode.dataset.competitionid;

            document.getElementById("editCompetitionBtn").addEventListener("click", function(e){
                e.preventDefault();
                let edit = {
                    id: competition_id,
                    competitionName: document.getElementById("edit_input_competition_name").value,
                    system: document.getElementById("edit_input_system").value,
                };
                
                console.log(edit);
                
                http_body = JSON.stringify(edit);

                fetch("http://localhost:8090/admin/competition/"+competition_id, {
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
                            fetch("http://localhost:8090/admin/competition/", {method: "GET", headers: {'Authorization': `Bearer ${token}`}})
                                .then(response => response.json())
                                .then(tableData => updateTable(tableData));
                        }
                    });

                    document.getElementById("edit_input_competition_name").value = "";
                    document.getElementById("edit_input_system").value = "";

                    $("#editCompetitionModal").modal('hide');
                    
            })
        });

    }

}