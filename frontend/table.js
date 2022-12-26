createPage()

function createPage() {
    const xhttp = new XMLHttpRequest();
    var skippy = parseInt(document.getElementById("list_item").value);
    var page_selected = parseInt(document.getElementById("page_select").value);
    const uri = "http://localhost:3000/brainstroke/createpage";
    xhttp.open("GET", uri);
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var pageCount = JSON.parse(this.responseText).results;
            var optionHTML = ''
            if (skippy > pageCount) {
                page = skippy
                optionHTML += '<option>' + 'Page 1' + '</option>' 
            } else {
                var page = pageCount / skippy
                for (let i = 0; i <= page; i++) {
                    optionHTML += "<option value=" + (i) + ">" + "Page " + (i + 1) + "</option>"
                }
            }
            document.getElementById("page_select").innerHTML = optionHTML;
        }
        if (page_selected<=page){
            ring = document.getElementById("ring")
            ring.style.visibility = 'visible'
            loadPage()
        }else{
            console.log("Out of page it will return to first page")
            loadFirstPageForFix()
        }
        
    };
}

function loadFirstPageForFix() {
    console.log("loadFix")
    page_selected = 0
    var skippy = parseInt(document.getElementById("list_item").value);
    const xhttp = new XMLHttpRequest();
    const uri = "http://localhost:3000/brainstroke/p/" + (page_selected)+"/"+(skippy)
    console.log(uri)
    xhttp.open("GET", uri);
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var trHTML = "";
            var subText = ""
            var num = 1;
            const objects = JSON.parse(this.responseText).objects;
            const documentCount = JSON.parse(this.responseText).documentCount;
            for (let object of objects) {
                trHTML += "<tr onclick='showViewer(\"" + object["_id"] + "\")'>";
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
                // trHTML += "<td>";
                // trHTML += '<a type="button" class="btn btn-outline-secondary me-2" onclick="showUpdateBox(\'' + object["_id"] + '\')"><i class="fas fa-edit"></i></a>';
                // trHTML += '<a type="button" class="btn btn-outline-danger" onclick="showDeleteBox(\'' + object["_id"] + '\')"><i class="fas fa-trash"></i></a>';
                trHTML += "<tr>";

                num++;
            }
            console.log(num)
            if (num == "1") {
                subText += 'ไม่พบข้อมูล'
                document.getElementById("subheadTxt").innerText = subText
                document.getElementById("mytable").innerHTML = '<tr><th scope="row" colspan="5"><div class="spinner-border"></div></th></tr>';
            } else {
                ring = document.getElementById("ring")
                ring.style.visibility = 'visible'
                document.getElementById("mytable").innerHTML = trHTML;
                document.getElementById("subheadTxt").innerText = "แสดงจำนวน " + (num - 1) + " จากทั้งหมด " + documentCount + " รายการ"
            }
        }
    };
}

function loadPage() {
    ring = document.getElementById("ring")
    ring.style.visibility = 'visible'
    var page_selected = parseInt(document.getElementById("page_select").value);
    var skippy = parseInt(document.getElementById("list_item").value);
    const xhttp = new XMLHttpRequest();
    const uri = "http://localhost:3000/brainstroke/p/" + (page_selected)+"/"+(skippy)
    console.log(uri)
    xhttp.open("GET", uri);
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var trHTML = "";
            var subText = ""
            var num = 1;
            const objects = JSON.parse(this.responseText).objects;
            const documentCount = JSON.parse(this.responseText).documentCount;
            for (let object of objects) {
                trHTML += "<tr onclick='showViewer(\"" + object["_id"] + "\")'>";
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
                // trHTML += "<td>";
                // trHTML += '<a type="button" class="btn btn-outline-secondary me-2" onclick="showUpdateBox(\'' + object["_id"] + '\')"><i class="fas fa-edit"></i></a>';
                // trHTML += '<a type="button" class="btn btn-outline-danger" onclick="showDeleteBox(\'' + object["_id"] + '\')"><i class="fas fa-trash"></i></a>';
                trHTML += "<tr>";

                num++;
            }
            console.log(num)
            if (num == "1") {
                subText += 'ไม่พบข้อมูล'
                document.getElementById("subheadTxt").innerText = subText
                document.getElementById("mytable").innerHTML = '<tr><th scope="row" colspan="5"><div class="spinner-border"></div></th></tr>';
            } else {
                ring = document.getElementById("ring")
                ring.style.visibility = 'collapse'
                document.getElementById("mytable").innerHTML = trHTML;
                document.getElementById("subheadTxt").innerText = "แสดงจำนวน " + (num - 1) + " จากทั้งหมด " + documentCount + " รายการ"
            }
        }
    };
}

function loadQueryTable() {
    document.getElementById("mytable").innerHTML = '<tr><th scope="row" colspan="5"<div class="spinner-border"></div></th></tr>';
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
                const pageCount = JSON.parse(this.responseText).Counter;

                for (let object of objects) {
                    trHTML += "<tr onclick='showViewer(\"" + object["_id"] + "\")'>";
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
                    // trHTML += "<td>";
                    // trHTML += '<a type="button" onclick="showUpdateBox(\'' + object["_id"] + '\')"><i class="fas fa-edit"></i></a>';
                    // trHTML += '<a type="button" onclick="showDeleteBox(\'' + object["_id"] + '\')"><i class="fas fa-trash"></i></a>';
                    trHTML += "<tr>";


                    num++;
                }
                console.log(trHTML);
                //document.getElementById("resetbt").style.visibility = 'visible';
                //document.getElementById("pagebox").remove()
                if (num == "1") {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'No results found!',
                        footer: '<a href="table.html">Reload data</a>'
                    })
                    document.getElementById("tableArea").style.visibility = 'hidden';
                } else {
                    document.getElementById("tableArea").style.visibility = 'visible';
                    document.getElementById("mytable").innerHTML = trHTML;
                    document.getElementById("subheadTxt").innerText = "แสดงจำนวน " + (num - 1) + " จากทั้งหมด " + pageCount + " รายการ"
                    document.getElementById("pagebox").style.visibility = 'hidden';
                    document.getElementById("page_item").style.visibility = 'hidden';
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.addEventListener('mouseenter', Swal.stopTimer)
                            toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                    })
                    Toast.fire({
                        icon: 'success',
                        title: 'พบ ' + searchText + ' จำนวน ' + (num - 1) + ' รายการ'
                    })
                }
            }
        };
    } else {
        document.getElementById("pagebox").style.visibility = 'visible';
        document.getElementById("tableArea").style.visibility = 'visible';
        document.getElementById("page_item").style.visibility = 'visible';
        loadPage()
    }

}

function showStudentCreateBox() {

    Swal.fire({
        title: "Data Creator",
        customClass: 'swal-box',
        html:
            '<div class="align-left" >'+
            '<div class="mb-3"><b><label for="gender" class="form-label">Gender</label></b>' +
            '<select class="form-control" name="gender" id="gender"> <option value="Male">Male</option> <option value="Female">Female</option> </select></div>' +

            '<div class="mb-3"><b><label for="age" class="form-label">Age</label></b></b>' +
            '<input class="form-control" type="number" id="age" placeholder="age"></div>' +

            '<div class="mb-3"><b><label for="hypertension" class="form-label">Hypertension</label></b>' +
            '<select class="form-control" name="hypertension" id="hypertension"> <option value="0">0</option> <option value="1">1</option> </select></div>' +

            '<div class="mb-3"><b><label for="heart_disease" class="form-label">Heart disease</label></b>' +
            '<select class="form-control" name="heart_disease" id="heart_disease"> <option value="0">0</option> <option value="1">1</option> </select></div>' +

            '<div class="mb-3"><b><label for="ever_married" class="form-label">Ever_married</label></b>' +
            '<select class="form-control" name="ever_married" id="ever_married"> <option value="Yes">Yes</option> <option value="No">No</option> </select></div>' +

            '<div class="mb-3"><b><label for="work_type" class="form-label">Work_type</label></b>' +
            '<select class="form-control" name="work_type" id="work_type"> <option value="children">Children</option> <option value="Govtjov">Govtjov</option> <option value="Neverworked">Neverworked</option> <option value="Private">Private</option> <option value="Self-employed">Self-employed</option> </select></div>' +

            '<div class="mb-3"><b><label for="Residence_type" class="form-label">Residence_type</label></b>' +
            '<select class="form-control" name="Residence_type" id="Residence_type"> <option value="Rural">Rural</option> <option value="Urban">Urban</option> </select></div>' +

            '<div class="mb-3"><b><label for="avg_glucose_level" class="form-label">avg_glucose_level</label></b>' +
            '<input class="form-control" id="avg_glucose_level" placeholder="avg_glucose_level"></div>' +

            '<div class="mb-3"><b><label for="bmi" class="form-label">bmi</label></b>' +
            '<input class="form-control" id="bmi" placeholder="bmi"></div>' +

            '<div class="mb-3"><b><label for="smoking_status" class="form-label">smoking_status</label></b>' +
            '<select class="form-control" name="smoking_status" id="smoking_status"> <option value="formerly smoked">Formerly smoked</option> <option value="never smoked">Never smoked</option> <option value="smokes">Smokes</option> <option value="Unknown">Unknown</option> </select></div>' +

            '<div class="mb-3"><b><label for="stroke" class="form-label">stroke</label></b>' +
            '<select class="form-control" name="stroke" id="stroke"> <option value="0">0</option> <option value="1">1</option> </select></div>'+
            '</div>',

        focusConfirm: false,
        preConfirm: () => {
            dataCreate();
        },
    });
}

function dataCreate() {
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
            const Toast = Swal.mixin({
                toast: true,
                position: 'top',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })
            Toast.fire({
                icon: 'success',
                title: 'Create successfully!'
            })
            loadPage();
        }
    };
}

function showDeleteBox(id) {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        customClass: 'swal-box-delete',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
        if (result.isConfirmed) {
            dataDelete(id);
            const Toast = Swal.mixin({
                toast: true,
                position: 'top',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })
            Toast.fire({
                icon: 'success',
                title: 'Delete Successfully.'
            })
            
        }
    })
}

function dataDelete(id) {
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
            loadPage();
        }
    };
}

function showUpdateBox(id) {
    console.log("edit", id);
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost:3000/brainstroke/" + id);
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const object = JSON.parse(this.responseText).Complaint;
            console.log("showUpdateBox", object);
            Swal.fire({
                title: "Data Editor",
                customClass: 'swal-box',
                html:

                    '<input class="form-control" type="hidden" id="id" placeholder="id" value="' + object["_id"] + '" readonly></div>' +

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
            const Toast = Swal.mixin({
                toast: true,
                position: 'top',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })
            Toast.fire({
                icon: 'success',
                title: 'Update Successfully.'
            })
            loadPage();
        }
    };
}

/* Experimental */
function showViewer(id){
    console.log("Click", id);
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost:3000/brainstroke/" + id);
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const object = JSON.parse(this.responseText).Complaint;
            console.log("showUpdateBox", object);
            text = 
                    '<div class="align-left">'+
                    '<input readonly  type="hidden" id="id" placeholder="id" value="' + object["_id"] + '" readonly>' +

                    '<div class="mb-3"><label for="gender" class="form-label">Gender</label>' +
                    '<input readonly class="form-control" id="gender" placeholder="gender" value="' + object["gender"] + '"></div>' +

                    '<div class="mb-3"><label for="age" class="form-label">Age</label>' +
                    '<input readonly class="form-control" id="age" placeholder="age" value="' + object["age"] + '"></div>' +

                    '<div class="mb-3"><label for="hypertension" class="form-label">Hypertension</label>' +
                    '<input readonly class="form-control" id="hypertension" placeholder="hypertension (0 or 1)" value="' + object["hypertension"] + '"></div>' +

                    '<div class="mb-3"><label for="heart_disease" class="form-label">Heart disease</label>' +
                    '<input readonly class="form-control" id="heart_disease" placeholder="heart disease (0 or 1)" value="' + object["heart_disease"] + '"></div>' +

                    '<div class="mb-3"><label for="ever_married" class="form-label">Ever_married</label>' +
                    '<input readonly class="form-control" id="ever_married" placeholder="ever_married (Yes or No)" value="' + object["ever_married"] + '"></div>' +

                    '<div class="mb-3"><label for="work_type" class="form-label">Work_type</label>' +
                    '<input readonly class="form-control" id="work_type" placeholder="work_type" value="' + object["work_type"] + '"></div>' +

                    '<div class="mb-3"><label for="Residence_type" class="form-label">Residence_type</label>' +
                    '<input readonly class="form-control" id="Residence_type" placeholder="Residence_type" value="' + object["Residence_type"] + '"></div>' +

                    '<div class="mb-3"><label for="avg_glucose_level" class="form-label">avg_glucose_level</label>' +
                    '<input readonly class="form-control" id="avg_glucose_level" placeholder="avg_glucose_level" value="' + object["avg_glucose_level"] + '"></div>' +

                    '<div class="mb-3"><label for="bmi" class="form-label">bmi</label>' +
                    '<input readonly class="form-control" id="bmi" placeholder="bmi" value="' + object["bmi"] + '"></div>' +

                    '<div class="mb-3"><label for="smoking_status" class="form-label">smoking_status</label>' +
                    '<input readonly class="form-control" id="smoking_status" placeholder="smoking_status" value="' + object["smoking_status"] + '"></div>' +

                    '<div class="mb-3"><label for="stroke" class="form-label">stroke</label>' +
                    '<input readonly class="form-control" id="stroke" placeholder="stroke" value="' + object["stroke"] + '"></div>'+
                    '</div>'

            Swal.fire({
                title: 'Data Viewer',
                customClass: 'swal-box',
                html: text,
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: 'Edit',
                denyButtonText: `Delete`,
                //grow:"false",
              }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                  showUpdateBox(id)
                } else if (result.isDenied) {
                  showDeleteBox(id)
                }
              })
        }
    };
}