loadPage()
createPage()
function loadTable() {
    
    const xhttp = new XMLHttpRequest();
    const uri = "http://localhost:3000/brainstroke";
    xhttp.open("GET", uri);
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var trHTML = "";
            var num = 1;

            const objects = JSON.parse(this.responseText);

            for (let object of objects) {
                trHTML += "<tr>";
                trHTML += "<td>" + num + "</td>";
                trHTML += "<td>" + object["gender"] + "</td>";
                trHTML += "<td>" + object["age"] + "</td>";
                trHTML += "<td>" + object["hypertension"] + "</td>";
                trHTML += "<td>" + object["heart_disease"] + "</td>";
                trHTML += "<td>" + object["ever_married"] + "</td>";
                trHTML += "<td>" + object["work_type"] + "</td>";
                trHTML += "<td>" + object["Residence_type"] + "</td>";
                trHTML += "<td>" + object["avg_glucose_level"] + "</td>";
                trHTML += "<td>" + object["bmi"] + "</td>";
                trHTML += "<td>" + object["smoking_status"] + "</td>";
                trHTML += "<td>" + object["stroke"] + "</td>";
                trHTML += "<td>";
                trHTML += '<a type="button" class="btn btn-outline-secondary me-2" onclick="showStudentUpdateBox(\'' + object["_id"] + '\')"><i class="fas fa-edit"></i></a>';
                trHTML += '<a type="button" class="btn btn-outline-danger" onclick="showStudentDeleteBox(\'' + object["_id"] + '\')"><i class="fas fa-trash"></i></a>';
                trHTML += "<tr>";

                num++;
            }
            document.getElementById("mytable").innerHTML = trHTML;
            document.getElementById("HeadText").innerText = "Brain Stroke Infomation (จำนวน " + (num - 1) + " รายการ)"

            loadGraph(objects);
        }
    };
}

function createPage() {
    const xhttp = new XMLHttpRequest();
    const uri = "http://localhost:3000/brainstroke/count";
    xhttp.open("GET", uri);
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var pageCount = JSON.parse(this.responseText).totaldoc;
            console.log(pageCount)
            var optionHTML =''
            var page = pageCount/200
            for (let i=0; i<=page; i++){
                optionHTML += "<option value=" + (i*200) +">"+"Page "+(i+1)+"</option>"
            }
            document.getElementById("page_select").innerHTML = optionHTML;
        }
    };
}

function loadPage() {
    document.getElementById("mytable").innerHTML = '<tr><th scope="row" colspan="5">Loading...</th></tr>';
    var page_selected = parseInt(document.getElementById("page_select").value);
    //console.log(page_selected)
    const xhttp = new XMLHttpRequest();
    const uri = "http://localhost:3000/brainstroke/page/" + (page_selected);
    console.log(uri)
    xhttp.open("GET", uri);
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var trHTML = "";
            var num = 1;

            const objects = JSON.parse(this.responseText).objects;
            for (let object of objects) {
                trHTML += "<tr>";
                trHTML += "<td>" + num + "</td>";
                trHTML += "<td>" + object["gender"] + "</td>";
                trHTML += "<td>" + object["age"] + "</td>";
                trHTML += "<td>" + object["hypertension"] + "</td>";
                trHTML += "<td>" + object["heart_disease"] + "</td>";
                trHTML += "<td>" + object["ever_married"] + "</td>";
                trHTML += "<td>" + object["work_type"] + "</td>";
                trHTML += "<td>" + object["Residence_type"] + "</td>";
                trHTML += "<td>" + object["avg_glucose_level"] + "</td>";
                trHTML += "<td>" + object["bmi"] + "</td>";
                trHTML += "<td>" + object["smoking_status"] + "</td>";
                trHTML += "<td>" + object["stroke"] + "</td>";
                trHTML += "<td>";
                trHTML += '<a type="button" class="btn btn-outline-secondary me-2" onclick="showStudentUpdateBox(\'' + object["_id"] + '\')"><i class="fas fa-edit"></i></a>';
                trHTML += '<a type="button" class="btn btn-outline-danger" onclick="showStudentDeleteBox(\'' + object["_id"] + '\')"><i class="fas fa-trash"></i></a>';
                trHTML += "<tr>";

                num++;
            }
            document.getElementById("mytable").innerHTML = trHTML;
            document.getElementById("HeadText").innerText = "Brain Stroke Infomation (จำนวน " + (num - 1) + " รายการ)"
        }
    };
}

function loadQueryTable() {
    document.getElementById("mytable").innerHTML = '<tr><th scope="row" colspan="5">Loading...</th></tr>';
    var searchText = document.getElementById("searchTextBox").value;
    if (searchText != "") {
        const xhttp = new XMLHttpRequest();
        const uri = "http://localhost:3000/brainstroke/search/" + searchText;
        xhttp.open("GET", uri);
        xhttp.send();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var trHTML = "";
                var num = 1;
                const objects = JSON.parse(this.responseText).Complaint;
                for (let object of objects) {
                    trHTML += "<tr>";
                    trHTML += "<td>" + num + "</td>";
                    trHTML += "<td>" + object["gender"] + "</td>";
                    trHTML += "<td>" + object["age"] + "</td>";
                    trHTML += "<td>" + object["hypertension"] + "</td>";
                    trHTML += "<td>" + object["heart_disease"] + "</td>";
                    trHTML += "<td>" + object["ever_married"] + "</td>";
                    trHTML += "<td>" + object["work_type"] + "</td>";
                    trHTML += "<td>" + object["Residence_type"] + "</td>";
                    trHTML += "<td>" + object["avg_glucose_level"] + "</td>";
                    trHTML += "<td>" + object["bmi"] + "</td>";
                    trHTML += "<td>" + object["smoking_status"] + "</td>";
                    trHTML += "<td>" + object["stroke"] + "</td>";
                    trHTML += "<td>";
                    trHTML += '<a type="button" class="btn btn-outline-secondary me-2" onclick="showStudentUpdateBox(\'' + object["_id"] + '\')"><i class="fas fa-edit"></i></a>';
                    trHTML += '<a type="button" class="btn btn-outline-danger" onclick="showStudentDeleteBox(\'' + object["_id"] + '\')"><i class="fas fa-trash"></i></a>';
                    trHTML += "<tr>";


                    num++;
                }
                console.log(trHTML);
                document.getElementById("mytable").innerHTML = trHTML;
                document.getElementById("HeadText").innerText = "Brain Stroke Infomation (จำนวน " + (num - 1) + " รายการ)"

                loadGraph(objects);
            }
        };
    } else {
        loadTable()
    }

}

function showStudentCreateBox() {
    var d = new Date();
    const date = d.toISOString().split("T")[0];

    Swal.fire({
        title: "Create Student Transaction",
        html:

            '<div class="mb-3"><label for="gender" class="form-label">Gender</label>' +
            '<input class="form-control" id="gender" placeholder="gender"></div>' +

            '<div class="mb-3"><label for="age" class="form-label">Age</label>' +
            '<input class="form-control" id="age" placeholder="age"></div>' +

            '<div class="mb-3"><label for="hypertension" class="form-label">Hypertension</label>' +
            '<input class="form-control" id="hypertension" placeholder="hypertension (0 or 1)"></div>' +

            '<div class="mb-3"><label for="heart_disease" class="form-label">Heart disease</label>' +
            '<input class="form-control" id="heart_disease" placeholder="heart disease (0 or 1)"></div>' +

            '<div class="mb-3"><label for="ever_married" class="form-label">Ever_married</label>' +
            '<input class="form-control" id="ever_married" placeholder="ever_married (Yes or No)"></div>' +

            '<div class="mb-3"><label for="work_type" class="form-label">Work_type</label>' +
            '<input class="form-control" id="work_type" placeholder="work_type"></div>' +

            '<div class="mb-3"><label for="Residence_type" class="form-label">Residence_type</label>' +
            '<input class="form-control" id="Residence_type" placeholder="Residence_type"></div>' +

            '<div class="mb-3"><label for="avg_glucose_level" class="form-label">avg_glucose_level</label>' +
            '<input class="form-control" id="avg_glucose_level" placeholder="avg_glucose_level"></div>' +

            '<div class="mb-3"><label for="bmi" class="form-label">bmi</label>' +
            '<input class="form-control" id="bmi" placeholder="bmi"></div>' +

            '<div class="mb-3"><label for="smoking_status" class="form-label">smoking_status</label>' +
            '<input class="form-control" id="smoking_status" placeholder="smoking_status"></div>' +

            '<div class="mb-3"><label for="stroke" class="form-label">stroke</label>' +
            '<input class="form-control" id="stroke" placeholder="stroke"></div>',

        focusConfirm: false,
        preConfirm: () => {
            slistCreate();
        },
    });
}

function slistCreate() {
    const gender = document.getElementById("gender").value;
    const age = document.getElementById("age").value;
    const hypertension = document.getElementById("hypertension").value;
    const heart_disease = document.getElementById("heart_disease").value;
    const ever_married = document.getElementById("ever_married").value;
    const work_type = document.getElementById("work_type").value;
    const Residence_type = document.getElementById("Residence_type").value;
    const avg_glucose_level = document.getElementById("avg_glucose_level").value;
    const bmi = document.getElementById("bmi").value;
    const smoking_status = document.getElementById("smoking_status").value;
    const stroke = document.getElementById("stroke").value;

    console.log(
        JSON.stringify({
            gender: gender,
            age: age,
            hypertension: hypertension,
            heart_disease: heart_disease,
            ever_married: ever_married,
            work_type: work_type,
            Residence_type: Residence_type,
            avg_glucose_level: avg_glucose_level,
            bmi: bmi,
            smoking_status: smoking_status,
            stroke: stroke,
        })
    );

    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://localhost:3000/brainstroke/create");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(
        JSON.stringify({
            gender: gender,
            age: age,
            hypertension: hypertension,
            heart_disease: heart_disease,
            ever_married: ever_married,
            work_type: work_type,
            Residence_type: Residence_type,
            avg_glucose_level: avg_glucose_level,
            bmi: bmi,
            smoking_status: smoking_status,
            stroke: stroke,
        })
    );

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const objects = JSON.parse(this.responseText);
            Swal.fire(
                "Good job!",
                "Create Student Information Successfully!",
                "success"
            );
            loadTable();
        }
    };
}

function showStudentDeleteBox(id) {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            studentDelete(id);
            Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            )
        }
    })

}

function studentDelete(id) {
    console.log("Delete: ", id);
    const xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "http://localhost:3000/brainstroke/delete");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(
        JSON.stringify({
            _id: id,
        })
    );
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            const objects = JSON.parse(this.responseText);
            Swal.fire(
                "Good job!",
                "Delete Student Information Successfully!",
                "success"
            );
            loadTable();
        }
    };
}

function showStudentUpdateBox(id) {
    console.log("edit", id);
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost:3000/brainstroke/" + id);
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const object = JSON.parse(this.responseText).Complaint;
            console.log("showStudentUpdateBox", object);
            Swal.fire({
                title: "Update Student Transaction",
                html:
                    '<div class="mb-3"><label for="id" class="form-label">id</label>' +
                    '<input class="form-control" id="id" placeholder="id" value="' + object["_id"] + '" readonly></div>' +

                    '<div class="mb-3"><label for="gender" class="form-label">Gender</label>' +
                    '<input class="form-control" id="gender" placeholder="gender" value="' + object["gender"] + '"></div>' +

                    '<div class="mb-3"><label for="age" class="form-label">Age</label>' +
                    '<input class="form-control" id="age" placeholder="age" value="' + object["age"] + '"></div>' +

                    '<div class="mb-3"><label for="hypertension" class="form-label">Hypertension</label>' +
                    '<input class="form-control" id="hypertension" placeholder="hypertension (0 or 1)" value="' + object["hypertension"] + '"></div>' +

                    '<div class="mb-3"><label for="heart_disease" class="form-label">Heart disease</label>' +
                    '<input class="form-control" id="heart_disease" placeholder="heart disease (0 or 1)" value="' + object["heart_disease"] + '"></div>' +

                    '<div class="mb-3"><label for="ever_married" class="form-label">Ever_married</label>' +
                    '<input class="form-control" id="ever_married" placeholder="ever_married (Yes or No)" value="' + object["ever_married"] + '"></div>' +

                    '<div class="mb-3"><label for="work_type" class="form-label">Work_type</label>' +
                    '<input class="form-control" id="work_type" placeholder="work_type" value="' + object["work_type"] + '"></div>' +

                    '<div class="mb-3"><label for="Residence_type" class="form-label">Residence_type</label>' +
                    '<input class="form-control" id="Residence_type" placeholder="Residence_type" value="' + object["Residence_type"] + '"></div>' +

                    '<div class="mb-3"><label for="avg_glucose_level" class="form-label">avg_glucose_level</label>' +
                    '<input class="form-control" id="avg_glucose_level" placeholder="avg_glucose_level" value="' + object["avg_glucose_level"] + '"></div>' +

                    '<div class="mb-3"><label for="bmi" class="form-label">bmi</label>' +
                    '<input class="form-control" id="bmi" placeholder="bmi" value="' + object["bmi"] + '"></div>' +

                    '<div class="mb-3"><label for="smoking_status" class="form-label">smoking_status</label>' +
                    '<input class="form-control" id="smoking_status" placeholder="smoking_status" value="' + object["smoking_status"] + '"></div>' +

                    '<div class="mb-3"><label for="stroke" class="form-label">stroke</label>' +
                    '<input class="form-control" id="stroke" placeholder="stroke" value="' + object["stroke"] + '"></div>',

                focusConfirm: false,
                preConfirm: () => {
                    studentUpdate();
                },
            });
        }
    };
}

function studentUpdate() {
    const id = document.getElementById("id").value;
    const gender = document.getElementById("gender").value;
    const age = document.getElementById("age").value;
    const hypertension = document.getElementById("hypertension").value;
    const heart_disease = document.getElementById("heart_disease").value;
    const ever_married = document.getElementById("ever_married").value;
    const work_type = document.getElementById("work_type").value;
    const Residence_type = document.getElementById("Residence_type").value;
    const avg_glucose_level = document.getElementById("avg_glucose_level").value;
    const bmi = document.getElementById("bmi").value;
    const smoking_status = document.getElementById("smoking_status").value;
    const stroke = document.getElementById("stroke").value;

    console.log(
        JSON.stringify({
            _id: id,
            gender: gender,
            age: age,
            hypertension: hypertension,
            heart_disease: heart_disease,
            ever_married: ever_married,
            work_type: work_type,
            Residence_type: Residence_type,
            avg_glucose_level: avg_glucose_level,
            bmi: bmi,
            smoking_status: smoking_status,
            stroke: stroke,
        })
    );

    const xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "http://localhost:3000/brainstroke/update");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(
        JSON.stringify({
            _id: id,
            gender: gender,
            age: age,
            hypertension: hypertension,
            heart_disease: heart_disease,
            ever_married: ever_married,
            work_type: work_type,
            Residence_type: Residence_type,
            avg_glucose_level: avg_glucose_level,
            bmi: bmi,
            smoking_status: smoking_status,
            stroke: stroke,
        })
    );

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const objects = JSON.parse(this.responseText);
            Swal.fire(
                "Good job!",
                "Update Student Information Successfully!",
                "success"
            );
            loadTable();
        }
    };
}
