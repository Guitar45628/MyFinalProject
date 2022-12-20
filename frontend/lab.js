function delete_all_data_fn() {
    const xhttp = new XMLHttpRequest()
    const uri = "http://localhost:3000/experiment/clean"
    xhttp.open("DELETE", uri)
    Swal.fire({
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
                'การลบเสร็จสิ้น!',
                'ข้อมูลต่างๆได้ถูกลบไปหมดแล้ว',
                'เสร็จสมบูรณ์'
            )
        }
    })
}

function restore_all_data_fn() {
    const xhttp = new XMLHttpRequest()
    const uri = "http://localhost:3000/experiment/restore"
    xhttp.open("GET", uri)
    Swal.fire({
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
            Swal.fire(
                'ซ่อมแซมไฟล์เสร็จแล้ว',
                'ข้อมูลต่างๆได้ถูกคืนค่าเป็นชุดข้อมูลดั้งเดิมแล้ว',
                'สำเร็จ'
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
                'Copyed!',
                'Your file has been restored.',
                'success'
            )
        }
    })
}