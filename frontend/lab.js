function delete_all_data_fn() {
    const xhttp = new XMLHttpRequest()
    const uri = "http://localhost:3000/experiment/clean"
    xhttp.open("DELETE", uri)
    Swal.fire({
        customClass:'swal-box-lab',
        title: 'ดำเนินการต่อหรือไม่?',
        text: "การดำเนินการนี้จะเปลี่ยนแปลงข้อมูลทั้งหมด!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ใช่, ลบเลย!',
        cancelButtonText: 'ยกเลิก',
    }).then((result) => {
        if (result.isConfirmed) {
            xhttp.send()
            Swal.fire(
                {
                    customClass:'swal-box-lab',
                    title:'การลบเสร็จสิ้น!',
                text:'ข้อมูลต่างๆได้ถูกลบไปหมดแล้ว'}
                
            )
        }
    })
}

function restore_all_data_fn() {
    const xhttp = new XMLHttpRequest()
    const uri = "http://localhost:3000/experiment/restore"
    xhttp.open("GET", uri)
    Swal.fire({
        customClass:'swal-box-lab',
        title: 'ดำเนินการต่อหรือไม่?',
        text: "การดำเนินการนี้จะเปลี่ยนแปลงข้อมูลทั้งหมด!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ใช่, ดำเนินการต่อ!',
        cancelButtonText: 'ยกเลิก',
    }).then((result) => {
        if (result.isConfirmed) {
            xhttp.send()
            Swal.fire({customClass:'swal-box-lab',
                title:'ซ่อมแซมไฟล์เสร็จแล้ว',
                text:'ข้อมูลต่างๆได้ถูกคืนค่าเป็นชุดข้อมูลดั้งเดิมแล้ว'}
            )
        }
    })
}

function duplicate_data_fn() {
    var round = document.getElementById("formCount").value;
    const xhttp = new XMLHttpRequest()
    const uri = "http://localhost:3000/experiment/duplicate/" + parseInt(round)
    xhttp.open("GET", uri)
    Swal.fire({
        customClass:'swal-box-lab',
        title: 'ดำเนินการต่อหรือไม่?',
        text: "การดำเนินการนี้จะเปลี่ยนแปลงข้อมูลทั้งหมด!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Restore it!',
        cancelButtonText: 'ยกเลิก',
    }).then((result) => {
        if (result.isConfirmed) {
            xhttp.send()
            Swal.fire(
                {customClass:'swal-box-lab',
                title:'ทำซ้ำข้อมูลเสร็จแล้ว',
                text:'ข้อมูลได้ถูกทำซ้ำเรียบร้อยแล้ว'}
            )
        }
    })
}

function counting_data_fn() {
    const xhttp = new XMLHttpRequest();
    const uri = "http://localhost:3000/brainstroke/createpage";
    xhttp.open("GET", uri);
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var documentCount = JSON.parse(this.responseText).results;
            console.log(documentCount)
            Swal.fire({
                customClass:'swal-box-lab',
                icon: 'info',
                title: 'จำนวนเอกสารที่พบ!',
                text: 'จำนวน '+(documentCount)+' รายการ'}
            )
            
        }
        
    };
}