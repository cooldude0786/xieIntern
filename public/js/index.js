// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getDatabase, ref, set, child, get, remove, update } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-database.js";
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
const note = document.getElementById('noteBtn')
note.addEventListener('click', () => {
    changeSlide('note')
    getDefaultData()
    // alert('note calls')
})
const qb = document.getElementById('QBBtn')
qb.addEventListener('click', () => {
    changeSlide('QB')
    // alert('qb calls')
})
const yt = document.getElementById('YTBtn')
yt.addEventListener('click', () => {
    changeSlide('YT')
    // alert('yt calls')
})

document.addEventListener('DOMContentLoaded', async function () {
    const { sem } = getUrlParams();
    if (!!!sem) {
        alert('Not Selected the correct semister.\n return to home page')
    }
    else {
        console.log("Semester:", sem);
        // getDefaultData(sem);

    }
});


async function getDefaultData(sem) {
    var resultData = await GetAllDataFromDB(sem);
    if (!resultData.hasOwnProperty('status')) {
        for (let i in resultData) {
            let Module = resultData[i]
            generateAndAppendCard(i, Module.name, Module.data)
        }
        addActionToLi();
    }
    if (!resultData.status) {
        console.log('db message ' + resultData.msg)
        const cardDiv = document.createElement("div");
        cardDiv.classList.add("card");
        cardDiv.style.backgroundColor = 'transparent'
        cardDiv.style.border = 'none'
        const errorHeader = document.createElement('h1');
        errorHeader.innerText = resultData.msg;
        cardDiv.appendChild(errorHeader)
        // Append the card to the module div
        const moduleDiv = document.querySelector('.module');
        moduleDiv.appendChild(cardDiv);
        return
    }

}

function getUrlParams() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const sem = urlParams.get('sem');
    return { sem };
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
function GetAllDataFromDB(sem) {

    // Return the promise here
    return get(child(db, `${sem}/`)).then((snapshot) => {
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


function addActionToLi() {
    // Get all list items with the class 'message'
    const listItems = document.querySelectorAll('.message li');
    // Add a click event listener to each list item
    listItems.forEach(function (item) {
        item.addEventListener('click', function (event) {
            // Prevent the default behavior of the click event
            event.preventDefault();

            // Get the dynamically created anchor tag within the clicked list item
            const anchorTag = item.querySelector('a');

            // Open a new tab with the URL from the anchor tag
            window.open(anchorTag.href, '_blank');
        });
    });





    //sfasx
}
function changeSubject(_id) {
    alert(`called ${_id}`)
}
function expandModule(id_) {
    let parentDiv = id_.parentNode.parentNode
    if (parentDiv.children[1].style.height !== 'auto') {
        parentDiv.children[1].style.height = "auto"
        id_.innerText = 'View Less'
    } else {
        parentDiv.children[1].style.height = "100px"
        id_.innerText = 'View More'
    }
}

function changeSlide(div) {
    let arr = ['note', 'QB', 'YT']
    for (let i of arr) {
        if (i == div) {
            document.getElementById(i).classList.add('d-flex')
            document.getElementById(i).classList.remove('d-none')
        }
        else {
            document.getElementById(i).classList.remove('d-flex')
            document.getElementById(i).classList.add('d-none')
        }
    }
}