function delete_all_data_fn() {
    const xhttp = new XMLHttpRequest()
    const uri = "http://localhost:3000/experiment/clean"
    xhttp.open("DELETE", uri)
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
            xhttp.send()
            Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            )
        }
    })
}

function restore_all_data_fn() {
    const xhttp = new XMLHttpRequest()
    const uri = "http://localhost:3000/experiment/restore"
    xhttp.open("GET", uri)
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Restore it!'
    }).then((result) => {
        if (result.isConfirmed) {
            xhttp.send()
            Swal.fire(
                'Restored!',
                'Your file has been restored.',
                'success'
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
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Restore it!'
    }).then((result) => {
        if (result.isConfirmed) {
            xhttp.send()
            Swal.fire(
                'Restored!',
                'Your file has been restored.',
                'success'
            )
        }
    })
}