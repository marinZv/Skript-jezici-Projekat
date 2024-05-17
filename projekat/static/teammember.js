window.addEventListener("load", () => {

    const cookies = document.cookie.split("=");
    const token = cookies[cookies.length-1];

    fetch('http://localhost:8090/admin/teammember/', {method:'GET', headers: {'Authorization': `Bearer ${token}`}})
        .then(response => response.json())
        .then(data => {
            console.log(data);
            updateTable(data);
        });

    document.getElementById("addTeamMemberBtn").addEventListener("click", createCart);

    document.getElementById("btn_dodaj_novu_team_member").addEventListener("click", function(){
        $("#teamMembersModal").modal('show');
    });

    document.getElementById("actionCreate").addEventListener("click", function(){
        $("#teamMembersModal").modal('show');
    });

    document.getElementById("actionEdit").addEventListener("click", function(){
        $("#editTeamMemberModal").modal('show');
    });
});

function createCart(){

    const cookies = document.cookie.split("=");
    const token = cookies[cookies.length - 1];

    $("#teamMembersModal").modal('show');

    let teamMember = {
        teamMemberName: document.getElementById("input_team_member_name").value,
        teamRole: document.getElementById("input_team_role").value,
        trophiesNumber: document.getElementById("input_trophies_number").value,
        countryID: document.getElementById("input_country_id").value,
        clubID: document.getElementById("input_club_id").value
    }

    teamMember_json = JSON.stringify(teamMember);

    fetch("http://localhost:8090/admin/teammember/", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: teamMember_json
    })
        .then(response => response.json())
        .then(data => {
            if(data.msg){
                alert(data.msg);
            }else if(data.error){
                alert(data.error);
            }else{
                fetch('http://localhost:8090/admin/teammember/', {method: "GET", 'Authorization': `Bearer ${token}`})
                    .then(response => response.json())
                    .then(data => updateTable(data));
            }
        });

        document.getElementById("input_team_member_name").value = "";
        document.getElementById("input_team_role").value = "";
        document.getElementById("input_trophies_number").value = "";
        document.getElementById("input_country_id").value = "";
        document.getElementById("input_club_id").value = "";

        $("#teamMembersModal").modal('hide');

}

function updateTable(data){
    
    const cookies = document.cookie.split("=");
    const token = cookies[cookies.length - 1];

    var tabela = document.getElementById("teamMembersTable");
    tabela.innerHTML = "";

    for(i in data){
        let redHTML = 
        `<tr data-teammemberID="` + data[i].id + `"><td>`+data[i].id + `</td><td>` + data[i].teamMemberName +
            `</td><td>` + data[i].teamRole + `<td></td><td>` + data[i].trophiesNumber + `</td><td>`+ data[i].countryID + `</td><td>`+ 
            `<button class="btn btn-danger btn-sm btn_obrisi">Obrisi</button>
                <button class="btn btn-warning btn-sm btn_izmeni">Izmeni</button>
            </td>`;

        tabela.innerHTML += redHTML;
    }

    var obrisi_buttons = document.querySelectorAll(".btn_obrisi");

    for(i=0; i < obrisi_buttons.length; i++){
        let id = obrisi_buttons[i].parentNode.parentNode.dataset.teammemberid;
        obrisi_buttons[i].addEventListener("click", function(e){
            e.preventDefault();
            fetch("http://localhost:8090/admin/teammember//"+ id, {method: "DELETE", headers: {'Authorization': `Bearer ${token}`}})
                .then(response => response.json())
                .then(data => {
                    if(data.error){
                        alert(data.error);
                    }else if(data.msg){
                        alert(data.msg)
                    }else{
                        fetch("http://localhost:8090/admin/teammember/", {method:"GET", headers: {'Authorization': `Bearer ${token}`}})
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
            $("#editTeamMemberModal").modal('show');

            let teamMember_id = this.parentNode.parentNode.dataset.teammemberid;

            document.getElementById("editTeamMemberBtn").addEventListener("click", function(e){
                e.preventDefault();
                let edit = {
                    id: teamMember_id,
                    teamMemberName: document.getElementById("edit_team_member_name").value,
                    teamRole: document.getElementById("edit_input_team_role").value,
                    trophiesNumber: document.getElementById("edit_trophies_number").value,
                    countryID: document.getElementById("edit_input_country_id").value,
                    clubID: document.getElementById("edit_input_club_id").value
                };
                
                console.log(edit);
                
                http_body = JSON.stringify(edit);

                fetch("http://localhost:8090/admin/teammember/"+teamMember_id, {
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
                            fetch("http://localhost:8090/admin/teammember/", {method: "GET", headers: {'Authorization': `Bearer ${token}`}})
                                .then(response => response.json())
                                .then(tableData => updateTable(tableData));
                        }
                    });

                    document.getElementById("edit_team_member_name").value,
                    document.getElementById("edit_input_team_role").value,
                    document.getElementById("edit_trophies_number").value,
                    document.getElementById("edit_input_country_id").value,
                    document.getElementById("edit_input_club_id").value

                    $("#editTeamMemberModal").modal('hide');
                    
            })
        });

    }

}