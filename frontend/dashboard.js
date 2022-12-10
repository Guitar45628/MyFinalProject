google.charts.load("current", {
    packages: ["corechart", "bar"],
});
google.charts.setOnLoadCallback(loadTable);

function loadTable() {
    var genderText = document.getElementById("floatingSelect").value;
    const xhttp = new XMLHttpRequest();
    const uri = "http://localhost:3000/brainstroke/gender/" + genderText;
    xhttp.open("GET", uri);
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var num = 1;
            const objects = JSON.parse(this.responseText).Complaint
            console.log(objects)
            for (let object of objects) {
                num++;
            }
            document.getElementById("subheadTxt").innerText = "Total : " + (num - 1) + " items"
            loadGraph(objects);
        }
    };
}

function loadData() {
    var genderText = document.getElementById("floatingSelect").value;
    console.log(genderText)
    if (genderText != "") {
        const xhttp = new XMLHttpRequest();
        const uri = "http://localhost:3000/brainstroke/gender/" + genderText;
        console.log(uri)
        xhttp.open("GET", uri);
        xhttp.send();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var num = 1;
                const objects = JSON.parse(this.responseText).Complaint;

                for (let object of objects) {
                    num++;
                }
            }
            document.getElementById("subheadTxt").innerText = "Total : " + (num - 1) + " items"
        };
    } else {
        loadGraph(objects)
    }

}

function loadGraph(objects) {
    var [maleCount, femaleCount] = [0, 0] //ประกาศตัวแปรเก็บจำนวนสำหรับ genderChart
    var [neversmokeCount, formerlysmokeCount, unknownCount, normalsmoke] = [0, 0, 0, 0] //ประกาศตัวแปรเก็บจำนวนสำหรับ smokingChart
    var [marriedCount, nomarriedCount] = [0, 0] //ประกาศตัวแปรเก็บจำนวนสำหรับ marriageChart
    var freeCount = 0 //ประกาศตัวแปรเก็บจำนวนว่างๆ
    var [m_hypertensionCount, f_hypertensionCount, m_heartdiseaseCount, f_heartdiseaseCount, m_strokeCount, f_strokeCount] = [0, 0, 0, 0, 0, 0] //ประกาศตัวแปรเก็บจำนวนสำหรับ diseaseChart
    var [urbanCount, ruralCount] = [0, 0] //ประกาศตัวแปรเก็บจำนวนสำหรับ residenceChart
    var [privateCount, selfCount, govtCount, childrenworkCount] = [0, 0, 0, 0] //ประกาศตัวแปรเก็บจำนวนสำหรับ workChart

    for (let object of objects) {
        switch (object["smoking_status"]) {
            case "formerly smoked":
                formerlysmokeCount = formerlysmokeCount + 1
                break
            case "never smoked":
                neversmokeCount = neversmokeCount + 1
                break
            case "Unknown":
                unknownCount = unknownCount + 1
                break
            case "smokes":
                normalsmoke = normalsmoke + 1
                break
        }

        switch (object["gender"]) {
            case "Male":
                maleCount = maleCount + 1
                break
            case "Female":
                femaleCount = femaleCount + 1
                break
        }

        switch (object["ever_married"]) {
            case "Yes":
                marriedCount += 1
                break
            case "No":
                nomarriedCount += 1
                break
        }

        if (object["gender"] == "Male") {
            switch (object["hypertension"]) {
                case "1":
                    m_hypertensionCount = m_hypertensionCount + 1
                    break
            }
            switch (object["heart_disease"]) {
                case "1":
                    m_heartdiseaseCount += 1
                    break
            }
            switch (object["stroke"]) {
                case "1":
                    m_strokeCount += 1
                    break
            }
        } else if (object["gender"] == "Female") {
            switch (object["hypertension"]) {
                case "1":
                    f_hypertensionCount = f_hypertensionCount + 1
                    break
            }
            switch (object["heart_disease"]) {
                case "1":
                    f_heartdiseaseCount += 1
                    break
            }
            switch (object["stroke"]) {
                case "1":
                    f_strokeCount += 1
                    break
            }
        }

        switch (object["Residence_type"]) {
            case "Urban":
                urbanCount += 1
                break
            case "Rural":
                ruralCount += 1
                break
        }

        switch (object["work_type"]) {
            case "children":
                childrenworkCount += 1
                break
            case "Govt_job":
                govtCount += 1
                break
            case "Private":
                privateCount += 1
                break
            case "Self-employed":
                selfCount += 1
                break
        }
    }
    var dataGender = google.visualization.arrayToDataTable([
        ["Project", "Field"],
        ["Male", maleCount],
        ["Female", femaleCount]
    ]);

    var optionsGender = {
        title: "Gender",
        titleFontSize: 20,
        legentFontSize: 15,
        fontSize: 12,
        titleFontSize: 15,
        tooltipFontSize: 15,
        is3D: true,
    };
    var genderChart = new google.visualization.PieChart(
        document.getElementById("genderChart")
    );
    genderChart.draw(dataGender, optionsGender);

    //กราฟ 2
    var dataMarriage = google.visualization.arrayToDataTable([
        ["Married", "Other"],
        ["22", freeCount], ["22", freeCount],
        ["Married", marriedCount],
        ["Other", nomarriedCount]
    ]);

    var optionsMarriage = {
        title: "Marriage",
        titleFontSize: 20,
        legentFontSize: 15,
        fontSize: 12,
        titleFontSize: 15,
        tooltipFontSize: 15,
        is3D: true
    };
    var marriageChart = new google.visualization.PieChart(
        document.getElementById("marriageChart")
    );
    marriageChart.draw(dataMarriage, optionsMarriage);

    //กราฟ smoke
    var dataSmoking = google.visualization.arrayToDataTable([
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
        ["Formerly", formerlysmokeCount, "gold", "formerly"],
        ["Smokes", normalsmoke, "color: #F65A83", "Smokes"],
        ["Never.", neversmokeCount, "color: #ff6f00", "Never."],
        ["Unknown", unknownCount, "color: #607EAA", "Unknown"],
    ]);

    var optionsSmoking = {
        title: "Smoking",
        legend: { position: "none" },
        legentFontSize: 15,
        fontSize: 15,
        titleFontSize: 15,
        tooltipFontSize: 15,
    };

    var smokingChart = new google.visualization.BarChart(
        document.getElementById("smokingChart")
    );
    smokingChart.draw(dataSmoking, optionsSmoking);

    //กราฟ Disease
    var dataDisease = google.visualization.arrayToDataTable([
        ['', 'Male', 'Female', { role: 'annotation' }],
        ['Hypertension', m_hypertensionCount, f_hypertensionCount, ''],
        ['Heart Disease', m_heartdiseaseCount, f_heartdiseaseCount, ''],
        ['Stroke', m_strokeCount, f_strokeCount, ''],

    ]);

    var optionsDisease = {
        title: "Disease",
        titleFontSize: 20,
        legend: { position: 'top', maxLines: 3 },
        bar: { groupWidth: '65%' },
        isStacked: true,
        legentFontSize: 15,
        fontSize: 15,
        titleFontSize: 15,
        tooltipFontSize: 15,
    };

    var diseaseChart = new google.charts.Bar(document.getElementById('diseaseChart'));

    diseaseChart.draw(dataDisease, google.charts.Bar.convertOptions(optionsDisease));

    //กราฟ Residence
    var dataResidence = google.visualization.arrayToDataTable([
        ['Urban', 'Rural'],
        ['', freeCount], ['', freeCount], ['', freeCount], ['', freeCount],
        ['Urban', urbanCount],
        ['Rural', ruralCount],

    ]);

    var optionsResidence = {
        pieHole: 0.1,
        title: "Residence Type",
        titleFontSize: 20,
        legentFontSize: 15,
        fontSize: 12,
        titleFontSize: 15,
        tooltipFontSize: 15,
    };

    var residenceChart = new google.visualization.PieChart(document.getElementById('residenceChart'));
    residenceChart.draw(dataResidence, optionsResidence);

    //กราฟ work
    var dataWork = google.visualization.arrayToDataTable([
        ['Work Type', 'Total'],
        ['Private', privateCount],
        ['Self-Employed', selfCount],
        ['Govt-Job', govtCount],
        ['Children', childrenworkCount],
    ]);

    var optionsWork = {
        title: 'Work Type',
        pieSliceText: 'label',
        titleFontSize: 20,
        legentFontSize: 15,
        fontSize: 12,
        titleFontSize: 15,
        tooltipFontSize: 15,
        slices: {
            1: { offset: 0.1 },
            2: { offset: 0.1 },
            //3: { offset: 0.1 },
            4: { offset: 0.1 }
        },
    };

    var workChart = new google.visualization.PieChart(document.getElementById('workChart'));
    workChart.draw(dataWork, optionsWork);

}
