
var tab = document.getElementById('table-students');

function addStudent(){
    var id = document.getElementById('id').value;
    var student_id = document.getElementById('student_id').value;
    var student_name = document.getElementById('student_name').value;
    var student_birthday = document.getElementById('student_birthday').value;
    var student_avata = document.getElementById('student_avata').value;
    axios.post('/student',{
        id:id,
        student_id:student_id,
        student_name: student_name,
        student_birthday: student_birthday,
        student_avata: student_avata
    })
        .then(function(response) {
            console.log(response);
            getStudent();
        })
        .catch(function(error) {
            console.log(error);
        })
}

function updateStudent() {
    var id = document.getElementById('id').value;
    var student_id = document.getElementById('student_id').value;
    var student_name = document.getElementById('student_name').value;
    var student_birthday = document.getElementById('student_birthday').value;
    var student_avata = document.getElementById('student_avata').value;
    axios.put('/student',{
        id:id,
        student_id: student_id,
        student_name: student_name,
        student_birthday: student_birthday,
        student_avata: student_avata
    }).then(function(response){
        console.log(response);
        getStudent();
    }).catch(function(error){
        console.log(error);
    });
}

function  updateForm(id){
    console.log('Select ' + id);
    axios.get('/getstudent/' +id).then(function(response) {
        document.getElementById('id').value = response.data.Item.id;
        document.getElementById('student_id').value = response.data.Item.student_id;
        document.getElementById('student_name').value = response.data.Item.student_name;
        document.getElementById('student_birthday').value = response.data.Item.student_birthday;
        document.getElementById('student_avata').value = response.data.Item.student_avata;
    }).catch(function(error){
        console.log(error);
    }).then(function(){

    });
}

function deleteStudent(id){
    axios.delete('/student/' + id).then(function(response){
        console.log(response);
        getStudent()
    }).catch(function(error){
        console.log(error);
    }).then(function(){

    });
}

async function getStudent(){
    var tab = document.getElementById('table-students');
    var rowCount = tab.rows.length;
    
    for(var x = rowCount - 1; x > 0; x--){
        tab.deleteRow(x);
    }
    try{
        const response =await axios.get('/student');
        const arrUser = response.data;  
        var stt = 0;
        arrUser.forEach(function (item,index){
            var row = tab.insertRow(1);
            var cell0 = row.insertCell(0);
            var cell1 = row.insertCell(1);
            var cell2 = row.insertCell(2);
            var cell3 = row.insertCell(3);
            var cell4 = row.insertCell(4);
            var cell5 = row.insertCell(5);

            cell0.innerHTML = item.id;
            cell1.innerHTML = item.student_id;
            cell2.innerHTML = item.student_name;
            cell3.innerHTML = item.student_birthday;
            cell4.innerHTML = item.student_avata;
            cell5.innerHTML = '<button type="button" onClick="updateForm('+item.id+')">Cập nhật</button> <button type="button" onClick="deleteStudent('+item.id+')">Xóa</button>';
        });
        console.log()
    }catch(error){
        console.error(error);
    }
}
getStudent()