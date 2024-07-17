// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getDatabase, ref, set, child, get, remove, update, push } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-database.js";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { generateAndAppendCard } from "./component.js";
const firebaseConfig = {
    apiKey: "AIzaSyAV7eZVlKbVzJgF0Leq1CzQZriJVwW9GO4",
    authDomain: "xieresource.firebaseapp.com",
    databaseURL: "https://xieresource-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "xieresource",
    storageBucket: "xieresource.appspot.com",
    messagingSenderId: "624733959118",
    appId: "1:624733959118:web:e1d19e5d58c0184c32b19f",
    measurementId: "G-YT3MV5GCBY"
};


const app = await initializeApp(firebaseConfig);

const db = await ref(getDatabase(app));

function GetAllDataFromDB(sem, SubjectCode) {

    // Return the promise here
    return get(child(db, `${sem}/${SubjectCode}`)).then((snapshot) => {
        if (snapshot.exists()) {
            // Return the value here


            // return { status: false, msg: "No data available" }

            return snapshot.val();
        } else {
            console.log("No data available");
            return { status: false, msg: "No data available" }
        }
    }).catch((error) => {
        console.error(error);
        return { status: false, msg: "Server down error 555" }
    });
}

function getAllSubject(sem) {
    return get(child(db, `${sem}/subject`)).then((sanpshot) => {
        return sanpshot.val();
    }).catch((error) => {
        console.error("error in getting all subject from the given sem \n", error, "\n", error.message)
    })
}






function InsertingLink() {
    const db = getDatabase();

    set(ref(db, '${sem}/'), {
        'test1': a
    }).then(() => {
        console.log('done');
        // Data saved successfully!
    })
        .catch((error) => {
            console.log('failed');
            // The write failed...
        });

}


function GetCount(s) {
    // Return the promise here
    return get(child(db, `${s}`)).then((snapshot) => {
        if (snapshot.exists()) {
            // Return the value here
            return snapshot;
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });
}
function InsertTeacherRecord(post,
    profileImage,
    teacherName,
    teacherPosition,
    qualification,
    gender) {
    const db = getDatabase();

    let path = 'home/faculty/'
    return push(ref(db, `${path}`), {
        post: `${post}`,
        data: {
            "profileImage": `${profileImage}`,
            "name": `${teacherName}`,
            "position": `${teacherPosition}`,
            "education": `${qualification}`,
            "gender": `${gender}`
        }
    })
        .then(() => { return "done" })
        .catch((err) => { return err })
}
function getAllTeachersDetails() {
    const db = getDatabase();

    const path = 'home/faculty'
    return get(ref(db, `${path}`)).then((snapshot) => {
        return snapshot.val()
    })
        .catch((error) => {
            return { status: false, err: err }
        })
}

function updateTeacherData(post,
    profileImage,
    teacherName,
    teacherPosition,
    qualification,
    gender,
    id) {
    const db = getDatabase();

    let path = 'home/faculty/' + id
    return update(ref(db, `${path}`), {
        post: `${teacherPosition}`,
        data: {
            "profileImage": `${profileImage}`,
            "name": `${teacherName}`,
            "position": `${teacherPosition}`,
            "education": `${qualification}`,
            "gender": `${gender}`
        }
    })
        .then((sanpshot) => { return { status: true } })
        .catch((err) => { return { status: false, err: err } })
}
function deleteTeacherData(id) {
    const db = getDatabase();
    let path = 'home/faculty/' + id
    return remove(ref(db, `${path}`)).then((snapshot) => {
        return snapshot
    }).catch((err) => {
        return err
    })
}
export {
    getAllSubject,
    GetAllDataFromDB,
    InsertTeacherRecord,
    getAllTeachersDetails,
    updateTeacherData,
    deleteTeacherData,
}