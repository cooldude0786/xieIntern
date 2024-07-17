
import { createTeacherCard, createHodCard } from "./component.js";
import { InsertTeacherRecord, getAllTeachersDetails, updateTeacherData, deleteTeacherData } from "./db.js"

let teacherdata;

const teacherInfo = document.getElementById("facultyDetails");

let isFirstCard = true;
// fetch("../js/data.json")
//     .then((response) => response.json())
//     .then((data) => {
//         // teacherInfo.innerHTML = ""; // Clear existing content before adding new cards
//         data.forEach(async (teacherData,index) => {
//             // const result = await InsertTeacherRecord(teacher.position, teacher.profileImage, teacher.name, teacher.position, teacher.education, teacher.gender);
//             // console.log(index,teacher);
//             createTeacherCard(index,
//                 teacherData.profileImage,
//                 teacherData.name, teacherData.position,
//                 teacherData.education,
//                 teacherData.gender
//             )
//         });
//     });
async function loadFacultiyData() {


    document.getElementById('Teacherloadercontain').classList.remove('d-none')
    const result = await getAllTeachersDetails()
    teacherdata = result
    setTimeout(() => {
        // loadFacultiyData()

        teacherInfo.innerHTML = " "
        document.getElementById('Teacherloadercontain').classList.remove('d-none')
        for (let [key, value] of Object.entries(result)) {
            // console.log(key, value.data);
            let teacherData = value.data
            let position = value.post.toLowerCase().split(' ').includes('hod')
            if (!position) {
                createTeacherCard(key,
                    teacherData.profileImage,
                    teacherData.name, teacherData.position,
                    teacherData.education,
                    teacherData.gender
                )
            } else {
                createHodCard(
                    key,
                    teacherData.profileImage,
                    teacherData.name, teacherData.position,
                    teacherData.education,
                    teacherData.gender
                )
            }
        }
        document.getElementById('Teacherloadercontain').classList.add('d-none')
        addEventListnerToAllTeacherBtn()
    }, 1000)

}
document.getElementById('teacher-tab-btn').addEventListener('click', () => {
    console.log('called');
    setTimeout(() => {
        if (document.getElementById('teachers-tab').className.split(' ').includes('active')) {
            console.log('true');
            loadFacultiyData()
        } else {
            console.log(false);
        }

    }, 500)
})
document.addEventListener('DOMContentLoaded', async function () {

    // loadFacultiyData()
});
function addEventListnerToAllTeacherBtn() {
    let btn = document.getElementsByClassName('teacher-edit-btn')
    let i = 0
    while (i < btn.length) {
        btn[i].addEventListener('click', editedTeacherData)
        i++
    }
    btn = document.getElementsByClassName('teacher-delete-btn')
    i = 0
    while (i < btn.length) {
        btn[i].addEventListener('click', deleteProfile)
        i++
    }
}
// Function to handle edit button click
function editedTeacherData() {
    $('#teacherDataUpdateModel').modal('show')
    document.getElementById('teacherId').value = this.id
    console.log("from edit", teacherdata[this.id]);
    let data = teacherdata[this.id]['data']
    document.getElementById('teacherName').value = data['name']
    document.getElementById('teacherEducation').value = data['education']
    document.getElementById('teacherGender').value = data['gender']
    document.getElementById('profileImage').value = data['profileImage']
    document.getElementById('post').value = data['position']
    // document.getElementById('teacherId').value = data['this.id']
}

// Function to handle delete button click
async function deleteProfile() {
    // console.log("from delete", this.id);
    let result = await deleteTeacherData(this.id)
    alert(result)
    loadFacultiyData()
}
document.getElementById('ChangeData').addEventListener('click', async () => {

    let name = document.getElementById('teacherName').value.trim()
    let qaulification = document.getElementById('teacherEducation').value.trim()
    let gender = document.getElementById('teacherGender').value.trim()
    let image = document.getElementById('profileImage').value.trim()
    let positon = document.getElementById('post').value.trim()
    let teacherId = document.getElementById('teacherId').value.trim()
    console.log(name, qaulification, positon, gender, image, teacherId);
    let result = await updateTeacherData(positon,
        image,
        name,
        positon,
        qaulification,
        gender,
        teacherId
    )
    if (result.status) {
        $('#teacherDataUpdateModel').modal('hide')
        loadFacultiyData()
    }
    else {
        console.error(result.err);
    }
})
document.getElementById('NewteacherData').addEventListener('click', async () => {
    let name = document.getElementById('NewTeacherName').value.trim()
    let qaulification = document.getElementById('NewTeacherEducation').value.trim()
    let gender = document.getElementById('NewTeacherGender').value.trim()
    let image = document.getElementById('NewTeacherprofileImage').value.trim()
    let position = document.getElementById('NewTeacherpost').value.trim()

    const result = await InsertTeacherRecord(position,
        image,
        name,
        position,
        qaulification,
        gender);
    alert(result)
    loadFacultiyData();
    $('#teacherNewDataInsert').modal('hide')


})
// teacherName