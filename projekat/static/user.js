window.addEventListener("load", () => {

    const cookies = document.cookie.split("=");
    const token = cookies[cookies.length-1];

    fetch('http://localhost:8090/admin/user/', {method:'GET', headers: {'Authorization': `Bearer ${token}`}})
        .then(response => response.json())
        .then(data => {
            console.log(data);
            updateTable(data);
        });

    document.getElementById("addUserBtn").addEventListener("click", createCart);

    document.getElementById("btn_dodaj_novu_user").addEventListener("click", function(){
        $("#usersModal").modal('show');
    });

    document.getElementById("actionCreate").addEventListener("click", function(){
        $("#usersModal").modal('show');
    });

    document.getElementById("actionEdit").addEventListener("click", function(){
        $("#editUserModal").modal('show');
    });
});

function createCart(){

    const cookies = document.cookie.split("=");
    const token = cookies[cookies.length - 1];

    $("#usersModal").modal('show');

    let user = {
        userName: document.getElementById("input_username").value,
        password: document.getElementById("input_password").value,
        email: document.getElementById("input_email").value,
        roleID: document.getElementById("input_role_id").value
    }

    user_json = JSON.stringify(user);

    fetch("http://localhost:8090/admin/user/", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: user_json
    })
        .then(response => response.json())
        .then(data => {
            if(data.msg){
                alert(data.msg);
            }else if(data.error){
                alert(data.error);
            }else{
                fetch('http://localhost:8090/admin/user/', {method: "GET", 'Authorization': `Bearer ${token}`})
                    .then(response => response.json())
                    .then(data => updateTable(data));
            }
        });

        document.getElementById("input_username").value = "";
        document.getElementById("input_password").value = "";
        document.getElementById("input_email").value = "";
        document.getElementById("input_role_id").value = "";

        $("#usersModal").modal('hide');

}

function updateTable(data){
    
    const cookies = document.cookie.split("=");
    const token = cookies[cookies.length - 1];

    var tabela = document.getElementById("usersTable");
    tabela.innerHTML = "";

    for(i in data){
        let redHTML = 
        `<tr data-userID="` + data[i].id + `"><td>`+data[i].id + `</td><td>` + data[i].userName +
            `</td><td>` + data[i].password + `<td></td><td>` + data[i].email + `</td><td>`+ data[i].roleID + `</td><td>`+
            `<button class="btn btn-danger btn-sm btn_obrisi">Obrisi</button>
                <button class="btn btn-warning btn-sm btn_izmeni">Izmeni</button>
            </td>`;

        tabela.innerHTML += redHTML;
    }

    var obrisi_buttons = document.querySelectorAll(".btn_obrisi");

    for(i=0; i < obrisi_buttons.length; i++){
        let id = obrisi_buttons[i].parentNode.parentNode.dataset.userid;
        obrisi_buttons[i].addEventListener("click", function(e){
            e.preventDefault();
            fetch("http://localhost:8090/admin/user/"+ id, {method: "DELETE", headers: {'Authorization': `Bearer ${token}`}})
                .then(response => response.json())
                .then(data => {
                    if(data.error){
                        alert(data.error);
                    }else if(data.msg){
                        alert(data.msg)
                    }else{
                        fetch("http://localhost:8090/admin/user/", {method:"GET", headers: {'Authorization': `Bearer ${token}`}})
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
            $("#editUserModal").modal('show');

            let user_id = this.parentNode.parentNode.dataset.userid;

            document.getElementById("editUserBtn").addEventListener("click", function(e){
                e.preventDefault();
                let edit = {
                    id: user_id,
                    userName: document.getElementById("edit_input_username").value,
                    password: document.getElementById("edit_input_password").value,
                    email: document.getElementById("edit_input_email").value,
                    roleID: document.getElementById("edit_input_role_id").value
                };
                
                console.log(edit);
                
                http_body = JSON.stringify(edit);

                fetch("http://localhost:8090/admin/user/"+user_id, {
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
                            fetch("http://localhost:8090/admin/user/", {method: "GET", headers: {'Authorization': `Bearer ${token}`}})
                                .then(response => response.json())
                                .then(tableData => updateTable(tableData));
                        }
                    });

                    document.getElementById("edit_input_username").value = "";
                    document.getElementById("edit_input_password").value = "";
                    document.getElementById("edit_input_email").value = "";
                    document.getElementById("edit_input_role_id").value = "";

                    $("#editUserModal").modal('hide');
                    
            })
        });

    }

}