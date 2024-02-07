// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getDatabase, ref, set, child, get, remove, update } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-database.js";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

document.addEventListener('DOMContentLoaded', async function () {
    // deleteSubjectKey('ITL605');
    InsertingLink();

    var resultData = await GetAllDataFromDB();
    // console.log(a);
    for (let i in resultData) {
        // inside the specfic Module. 
        let Module = resultData[i]
        for (let Chapters in Module) {
            // Looping throught the chapters
            let chapter = Module[Chapters]
            console.log(chapter.name, chapter.data);
            generateAndAppendCard(Chapters[Chapters.length - 1], chapter.name, chapter.data)
        }
    }
});
function InsertingLink() {
    const db = getDatabase();
    update(ref(db, 'sem6/Module/chap1/data'), {
        // name: 'Data Warehouse (DWH) Fundamentals with Introduction to Data Mining',
        // data: {
            // 0: {
            //     link: 'www.google.com',
            //     msg: 'Basic ',
            //     title: 'DWH characteristics'
            // },
            3: {
                link: 'www.google.com',
                msg: 'All types od Dimensional model',
                title: 'Dimensional modeling'
            },
        // }
    });
}
function GetAllDataFromDB() {
    // Return the promise here
    return get(child(db, `sem6`)).then((snapshot) => {
        if (snapshot.exists()) {
            // Return the value here
            return snapshot.val();
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
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

function generateAndAppendCard(index, moduleName, links) {
    // Create card element
    // Outer div block
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");
    // inner Div Block
    const containerDiv = document.createElement("div");
    containerDiv.classList.add("align-items-lg-start", "container", "flex-column", "h-100");

    // Header of the div. The title of the div
    const h3Element = document.createElement("div");
    h3Element.classList.add("h3");
    h3Element.textContent = `${index}:- ${moduleName}: -`;

    // Ul that contain all the links of chapter
    const ulElement = document.createElement("ul");
    ulElement.classList.add("message", "overflow-auto", "pl-5", "w-100");
    links.forEach((linkData, index) => {
        console.log(linkData);
        let i = 0;
        const liElement = document.createElement("li");
        // Title of the link
        const bElement = document.createElement("b");
        bElement.textContent = `${index + 1} ${linkData.title}`; // Example: Title 1, Title 2, ...
        liElement.appendChild(bElement);
        // Sub message of the div
        liElement.appendChild(document.createTextNode(` ${linkData.msg} `));
        // Link to the PDF
        const aElement = document.createElement("a");
        aElement.href = linkData.link;
        aElement.target = "_blank";
        // aElement.rel = "noopener noreferrer";
        aElement.style.display = "none";
        liElement.appendChild(aElement);

        ulElement.appendChild(liElement);
    })
    // Create and append 5 li elements

    containerDiv.appendChild(h3Element);
    containerDiv.appendChild(ulElement);
    cardDiv.appendChild(containerDiv);

    // Append the card to the module div
    const moduleDiv = document.querySelector('.module');
    moduleDiv.appendChild(cardDiv);
}


// Example usage:
// generateAndAppendCard(2, "Name of Module 2", "sdfhisafdghsidfbkjasdf asdfas", "https://www.google.com");
