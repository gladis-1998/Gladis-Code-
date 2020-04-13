
//JAVASCRIPT:

var app = new function () {
    var url = "https://jsonplaceholder.typicode.com/posts";
    Data = [];
    this.FetchAll = function () {
      
        fetch(url)
        .then((response) => {
            Data = response.json();
            // console.log(playlists);
            return Data;

        }).then((Data) => {
            console.log(Data);
            var html = "<table border='1|1'>";
            html += "<th>ID</th>";
            html += "<th>Name</th>";
            html += "<th>Actions</th>";
            for (var i = 0; i < Data.length; i++) {
                html += "<tr>";
                html += "<td>" + Data[i].id + "</td>";
                html += "<td>" + Data[i].title + "</td>";
                html += '<td><button onclick="app.edit(' + Data[i].id + ')">Edit</button></td>';
                html += '<td><button onclick="app.del(' + Data[i].id + ')">Delete</button></td>';
                html += "</tr>";
            }
            html += "</table>";
            document.getElementById("box").innerHTML = html;
        });
    }

    // saveAndUpdate
    this.saveAndUpdate = function () {
        // alert();
        ((document.getElementById('myBtn').innerHTML == "Save") ? this.add() : this.update());
    }

    this.add = function () {
        var id = 0;
        var name = document.getElementById("name").value;


        playlistobj = {};
        playlistobj.id = id;
        playlistobj.name = name;

        alert(JSON.stringify(playlistobj));

        fetch(url, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(playlistobj)
        })
            .then((response) => {

                this.FetchAll();
                document.getElementById('id').value = '';
                document.getElementById('name').value = '';
            });
    }

    // Edit
    this.edit = function (id) {
        alert(id);
        document.getElementById('myBtn').innerHTML = "update";

        fetch(url + "/" + id, { method: 'GET' })
            .then(function (response) {
                if (response.ok) {
                    return response.json();
                }
            })
            .then(function (names) {
                // alert(JSON.stringify(names));
                updateindex = names.id;
                document.getElementById('id').value = names.id;
                document.getElementById('name').value = names.name;

            })
    }

    this.update = function () {
        id = parseInt(document.getElementById('id').value);
        name = document.getElementById('name').value;

        // el1=document.getElementById('id');
        var updateobj = JSON.stringify({ "id": id, "name": name });

        fetch(url + "/" + updateindex, {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=UTF-8'
            },

            body: updateobj
        })
            .then((response) => {

                this.FetchAll();
                document.getElementById('id').value = '';
                document.getElementById('name').value = '';

            });
        updateindex = 0;
        document.getElementById('myBtn').innerHTML = "Save";
    }

    // delete
    this.del = function (deleteid) {
        alert(deleteid);
        url = "https://jsonplaceholder.typicode.com/posts/userId=" + deleteid;
        fetch(url + "/" + deleteid, {
            method: 'delete',
            // mode: 'cors',
            // redirect: 'follow'
        }).then((response) => {

            this.FetchAll();
        });
    }
}

