google.charts.load('current', {
    'packages': ['corechart', 'bar']
});
google.charts.setOnLoadCallback(loadTable);

function loadTable() {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost:3000/slist");
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var trHTML = '';
            var num = 1;
            const objects = JSON.parse(this.responseText);
            for (let object of objects) {

                trHTML += '<tr>';
                trHTML += '<td>' + num + '</td>';
                trHTML += '<td>' + object['StudentID'] + '</td>';
                trHTML += '<td>' + object['Title'] + '</td>';
                trHTML += '<td>' + object['Name'] + '</td>';
                trHTML += '<td>' + object['Surname'] + '</td>';
                trHTML += '<td>' + object['Field'] + '</td>';
                trHTML += '<td>' + object['Project'] + '</td>';
                trHTML += '<td>' + object['Savings'] + '</td>';
                trHTML += '<td>' + object['GPA'] + '</td>';
                trHTML += '<td>' + object['Salary'] + '</td>';
                trHTML += '<td>';
                trHTML += '<a type="button" class="btn btn-outline-secondary" onclick="showCompliantEditBox(\'' + object['_id'] + '\')"><i class="fas fa-edit"></i></a>';
                trHTML += '<a type="button" class="btn btn-outline-danger" onclick="compliantDelete(\'' + object['_id'] + '\')"><i class="fas fa-trash"></i></a></td>';
                trHTML += "</tr>";

                num++;
            }
            document.getElementById("mytable").innerHTML = trHTML;
            document.getElementById("counter").innerHTML = "จำนวนรายการ "+(num-1);

            loadGraph();
        }
    };
}

function loadQueryTable() {
    document.getElementById("mytable").innerHTML = "<tr><th scope=\"row\" colspan=\"5\">Loading...</th></tr>";
    const CheckText = document.getElementById('searchTextBox').value;
    if (CheckText == "") {
        loadTable()
    } else {
        console.log("searchText not null")
        const searchText = document.getElementById('searchTextBox').value;

        const xhttp = new XMLHttpRequest();
        xhttp.open("GET", "http://localhost:3000/slist/find/" + searchText);
        xhttp.send();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var trHTML = '';
                var num = 1;
                const objects = JSON.parse(this.responseText).Complaint;
                for (let object of objects) {
                    trHTML += '<tr>';
                    trHTML += '<td>' + num + '</td>';
                    trHTML += '<td>' + object['StudentID'] + '</td>';
                    trHTML += '<td>' + object['Title'] + '</td>';
                    trHTML += '<td>' + object['Name'] + '</td>';
                    trHTML += '<td>' + object['Surname'] + '</td>';
                    trHTML += '<td>' + object['Field'] + '</td>';
                    trHTML += '<td>' + object['Project'] + '</td>';
                    trHTML += '<td>' + object['Savings'] + '</td>';
                    trHTML += '<td>' + object['GPA'] + '</td>';
                    trHTML += '<td>' + object['Salary'] + '</td>';
                    trHTML += '<td>';
                    trHTML += '<a type="button" class="btn btn-outline-secondary" onclick="showCompliantEditBox(\'' + object['_id'] + '\')"><i class="fas fa-edit"></i></a>';
                    trHTML += '<a type="button" class="btn btn-outline-danger" onclick="compliantDelete(\'' + object['_id'] + '\')"><i class="fas fa-trash"></i></a></td>';
                    trHTML += "</tr>";
                    num++;


                }
                console.log(trHTML);
                document.getElementById("mytable").innerHTML = trHTML;
                document.getElementById("counter").innerHTML = "จำนวนรายการ "+(num-1);

            }
        };
    }
}

function loadGraph() {
    var mlCount = 0;
    var fullsCount = 0;
    var sysCount = 0;
    var netwCount = 0;
  
    var mrCount = 0;
    var missCount = 0;
    var drCount = 0;
    var pfCount = 0;
  
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost:3000/slist");
    xhttp.send();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        const objects = JSON.parse(this.responseText);
        for (let object of objects) {
          switch (object["Project"]) {
            case "Machine Learning":
              mlCount = mlCount + 1;
              break;
            case "Fullstack":
              fullsCount = fullsCount + 1;
              break;
  
            case "System Design":
              sysCount = sysCount + 1;
              break;
  
            case "Networks":
              netwCount = netwCount + 1;
              break;
          }
  
          switch (object["Title"]) {
            case "นาย":
              mrCount = mrCount + 1;
              break;
            case "นางสาว":
              missCount = missCount + 1;
              break;
  
            case "ดร.":
              drCount = drCount + 1;
              break;
  
            case "ศ.ดร":
              pfCount = pfCount + 1;
              break;
          }
        }
  
        var TimelyResponseData = google.visualization.arrayToDataTable([
          ["Project", "Field"],
          ["Machine Learning", mlCount],
          ["Fullstack", fullsCount],
          ["System Design", sysCount],
          ["Networks", netwCount],
        ]);
  
        var optionsTimelyResponse = { Titil: "Overall Project Fields" };
        var chartTimelyResponse = new google.visualization.PieChart(document.getElementById("piechartTimelyResponse"));
        chartTimelyResponse.draw(TimelyResponseData, optionsTimelyResponse);
  
        var dataSubmitted = google.visualization.arrayToDataTable([
          [
            "Student Titile",
            "Number",
            {
              role: "style",
            },
            {
              role: "annotation",
            },
          ],
          ["นาย", mrCount, "gold", "นาย"],
          ["นางสาว", missCount, "color: #F65A83", "นางสาว"],
          ["ดร.", drCount, "color: #F9F5EB", "ดร."],
          ["ศ.ดร", pfCount, "color: #607EAA", "ศ.ดร"]
        ]);
  
        var optionSubmitted = {
          title: "Staff' Title",
          legend: { position: "none" },
        };
  
        var chartSubmitted = new google.visualization.BarChart(document.getElementById("barchartSubmitted") );
        chartSubmitted.draw(dataSubmitted, optionSubmitted);
      }
    };
  }
  

function showCompliantCreateBox() {

    var d = new Date();
    const date = d.toISOString().split('T')[0]

    Swal.fire({
        title: 'Create Compliant',
        html: '<input id="Date_received" class="swal2-input" placeholder="Product" type="hidden" value="' + date + '">' +
            '<div class="mb-3"><label for="StudentID" class="form-label">StudentID</label>' +
            '<input class="form-control" id="StudentID" placeholder="Student ID"></div>' +
            '<div class="mb-3"><label for="Title" class="form-label">Title</label>' +
            '<input class="form-control" id="Title" placeholder="Title"></div>' +
            '<div class="mb-3"><label for="Name" class="form-label">Name</label>' +
            '<input class="form-control" id="Name" placeholder="Name"></div>' +
            '<div class="mb-3"><label for="Surname" class="form-label">Surname</label>' +
            '<input class="form-control" id="Surname" placeholder="Surname"></div>' +
            '<div class="mb-3"><label for="Field" class="form-label">Field</label>' +
            '<input class="form-control" id="Field" placeholder="Field"></div>' +
            '<div class="mb-3"><label for="Project" class="form-label">Project</label>' +
            '<input class="form-control" id="Project" placeholder="Project"></div>' +
            '<div class="mb-3"><label for="Savings" class="form-label">Savings</label>' +
            '<input class="form-control" id="Savings" placeholder="Savings"></div>' +
            '<div class="mb-3"><label for="GPA" class="form-label">GPA</label>' +
            '<input class="form-control" id="GPA" placeholder="GPA"></div>' +
            '<div class="mb-3"><label for="Salary" class="form-label">Salary</label>' +
            '<input class="form-control" id="Salary" placeholder="Salary"></div>',

        focusConfirm: false,
        preConfirm: () => {
            compliantCreate();
        }
    });
}

function compliantCreate() {

    const Date_received = document.getElementById("Date_received").value;
    const StudentID = document.getElementById("StudentID").value;
    const Title = document.getElementById("Title").value;
    const Name = document.getElementById("Name").value;
    const Surname = document.getElementById("Surname").value;
    const Field = document.getElementById("Field").value;
    const Project = document.getElementById("Project").value;
    const Savings = document.getElementById("Savings").value;
    const GPA = document.getElementById("GPA").value;
    const Salary = document.getElementById("Salary").value;

    console.log(JSON.stringify({
        'Date received': Date_received,
        'StudentID': StudentID,
        'Title': Title,
        'Name': Name,
        'Surname': Surname,
        'Field': Field,
        'Project': Project,
        'Savings': Savings,
        'GPA': GPA,
        'Salary': Salary
    }));

    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://localhost:3000/slist/create/");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({
        'Date received': Date_received,
        'StudentID': StudentID,
        'Title': Title,
        'Name': Name,
        'Surname': Surname,
        'Field': Field,
        'Project': Project,
        'Savings': Savings,
        'GPA': GPA,
        'Salary': Salary
    }));
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const objects = JSON.parse(this.responseText);
            Swal.fire(
                'Good job!',
                'Create Compliant Successfully!',
                'success'
            );
            loadTable();
        }
    };
}

function compliantDelete(id) {
    console.log("Delete: ", id);
    const xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "http://localhost:3000/slist/delete");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({
        "_id": id
    }));
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            const objects = JSON.parse(this.responseText);
            Swal.fire(
                'Good job!',
                'Delete Compliant Successfully!',
                'success'
            );
            loadTable();
        }
    };
}

function showCompliantEditBox(id) {

    console.log("edit", id);
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost:3000/slist/" + id);
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const object = JSON.parse(this.responseText).object;
            console.log("showCompliantEditBox", object);
            Swal.fire({
                title: 'Edit Compliant',
                html: '<input id="id" class="swal2-input" type="hidden" value="' + object['_id'] + '"><br>' +
                    '<div class="mb-3"><label for="StudentID"  class="form-label">StudentID</label>' +
                    '<input class="form-control" id="StudentID" value="' + object['StudentID'] + '" placeholder="Student ID"></div>' +
                    '<div class="mb-3"><label for="Title" class="form-label">Title</label>' +
                    '<input class="form-control" id="Title" value="' + object['Title'] + '" placeholder="Title"></div>' +
                    '<div class="mb-3"><label for="Name" class="form-label">Name</label>' +
                    '<input class="form-control" id="Name" value="' + object['Name'] + '" placeholder="Name"></div>' +
                    '<div class="mb-3"><label for="Surname" class="form-label">Surname</label>' +
                    '<input class="form-control" id="Surname" value="' + object['Surname'] + '" placeholder="Surname"></div>' +
                    '<div class="mb-3"><label for="Field" class="form-label">Field</label>' +
                    '<input class="form-control" id="Field" value="' + object['Field'] + '" placeholder="Field"></div>' +
                    '<div class="mb-3"><label for="Project" class="form-label">Project</label>' +
                    '<input class="form-control" id="Project" value="' + object['Project'] + '" placeholder="Project"></div>' +
                    '<div class="mb-3"><label for="Savings" class="form-label">Savings</label>' +
                    '<input class="form-control" id="Savings" value="' + object['Savings'] + '" placeholder="Savings"></div>' +
                    '<div class="mb-3"><label for="GPA" class="form-label">GPA</label>' +
                    '<input class="form-control" id="GPA" value="' + object['GPA'] + '" placeholder="GPA"></div>' +
                    '<div class="mb-3"><label for="Salary" class="form-label">Salary</label>' +
                    '<input class="form-control" id="Salary" value="' + object['Salary'] + '" placeholder="Salary"></div>',


                focusConfirm: false,
                preConfirm: () => {
                    userEdit();
                }
            });
        }
    };
}

function userEdit() {
    const id = document.getElementById("id").value;
    const StudentID = document.getElementById("StudentID").value;
    const Title = document.getElementById("Title").value;
    const Name = document.getElementById("Name").value;
    const Surname = document.getElementById("Surname").value;
    const Field = document.getElementById("Field").value;
    const Project = document.getElementById("Project").value;
    const Savings = document.getElementById("Savings").value;
    const GPA = document.getElementById("GPA").value;
    const Salary = document.getElementById("Salary").value;

    console.log(JSON.stringify({
        "_id": id,
        'StudentID': StudentID,
        'Title': Title,
        'Name': Name,
        'Surname': Surname,
        'Field': Field,
        'Project': Project,
        'Savings': Savings,
        'GPA': GPA,
        'Salary': Salary
    }));

    const xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "http://localhost:3000/slist/update/");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({
        "_id": id,
        'StudentID': StudentID,
        'Title': Title,
        'Name': Name,
        'Surname': Surname,
        'Field': Field,
        'Project': Project,
        'Savings': Savings,
        'GPA': GPA,
        'Salary': Salary
    }));
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const objects = JSON.parse(this.responseText);
            Swal.fire(
                'Good job!',
                'Update Compliant Successfully!',
                'success'
            )
            loadTable();
        }
    };
}
