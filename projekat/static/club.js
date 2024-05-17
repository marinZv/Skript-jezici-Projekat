window.addEventListener("load", () => {

    const cookies = document.cookie.split("=");
    const token = cookies[cookies.length-1];

    fetch('http://localhost:8090/admin/club/', {method:'GET', headers: {'Authorization': `Bearer ${token}`}})
        .then(response => response.json())
        .then(data => {
            console.log(data);
            updateTable(data);
        });

    document.getElementById("addClubBtn").addEventListener("click", createCart);

    document.getElementById("btn_dodaj_novu_club").addEventListener("click", function(){
        $("#clubsModal").modal('show');
    });

    document.getElementById("actionCreate").addEventListener("click", function(){
        $("#clubsModal").modal('show');
    });

    document.getElementById("actionEdit").addEventListener("click", function(){
        $("#editClubModal").modal('show');
    });
});

function createCart(){

    const cookies = document.cookie.split("=");
    const token = cookies[cookies.length - 1];

    $("#clubsModal").modal('show');

    let club = {
        clubName: document.getElementById("input_club_name").value,
        clubTrophies: document.getElementById("input_club_trophies").value,
        competitionID: document.getElementById("input_competition_id").value,
        locationID: document.getElementById("input_location_id").value,
        
    }

    club_json = JSON.stringify(club);

    fetch("http://localhost:8090/admin/club/", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: club_json
    })
        .then(response => response.json())
        .then(data => {
            if(data.msg){
                alert(data.msg);
            }else if(data.error){
                alert(data.error);
            }else{
                fetch('http://localhost:8090/admin/club/', {method: "GET", 'Authorization': `Bearer ${token}`})
                    .then(response => response.json())
                    .then(data => updateTable(data));
            }
        });

        document.getElementById("input_club_name").value = "";
        document.getElementById("input_club_trophies").value = "";
        document.getElementById("input_competition_id").value = "";
        document.getElementById("input_location_id").value = "";

        $("#clubsModal").modal('hide');

}

function updateTable(data){
    
    const cookies = document.cookie.split("=");
    const token = cookies[cookies.length - 1];

    var tabela = document.getElementById("clubsTable");
    tabela.innerHTML = "";

    for(i in data){
        let redHTML = 
        `<tr data-clubID="` + data[i].id + `"><td>`+data[i].id + `</td><td>` + data[i].clubName +
            `</td><td>` + data[i].clubTrophies + `<td></td><td>` + data[i].competitionID + `</td><td>`+ data[i].locationID + `</td><td>`+
            `<button class="btn btn-danger btn-sm btn_obrisi">Obrisi</button>
                <button class="btn btn-warning btn-sm btn_izmeni">Izmeni</button>
            </td>`;

        tabela.innerHTML += redHTML;
    }

    var obrisi_buttons = document.querySelectorAll(".btn_obrisi");

    for(i=0; i < obrisi_buttons.length; i++){
        let id = obrisi_buttons[i].parentNode.parentNode.dataset.clubid;
        obrisi_buttons[i].addEventListener("click", function(e){
            e.preventDefault();
            fetch("http://localhost:8090/admin/club/"+ id, {method: "DELETE", headers: {'Authorization': `Bearer ${token}`}})
                .then(response => response.json())
                .then(data => {
                    if(data.error){
                        alert(data.error);
                    }else if(data.msg){
                        alert(data.msg)
                    }else{
                        fetch("http://localhost:8090/admin/club/", {method:"GET", headers: {'Authorization': `Bearer ${token}`}})
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
            $("#editClubModal").modal('show');

            let club_id = this.parentNode.parentNode.dataset.clubid;

            document.getElementById("editClubBtn").addEventListener("click", function(e){
                e.preventDefault();
                let edit = {
                    id: club_id,
                    clubName: document.getElementById("edit_input_club_name").value,
                    clubTrophies: document.getElementById("edit_input_club_trophies").value,
                    competitionID: document.getElementById("edit_input_competition_id").value,
                    locationID: document.getElementById("edit_input_location_id").value
                };
                
                console.log(edit);
                
                http_body = JSON.stringify(edit);

                fetch("http://localhost:8090/admin/club/"+club_id, {
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
                            fetch("http://localhost:8090/admin/club/", {method: "GET", headers: {'Authorization': `Bearer ${token}`}})
                                .then(response => response.json())
                                .then(tableData => updateTable(tableData));
                        }
                    });

                    document.getElementById("edit_input_club_name").value = "";
                    document.getElementById("edit_input_club_trophies").value = "";
                    document.getElementById("edit_input_competition_id").value = "";
                    document.getElementById("edit_input_location_id").value = "";

                    $("#editClubModal").modal('hide');
                    
            })
        });

    }

}