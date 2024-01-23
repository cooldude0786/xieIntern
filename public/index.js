 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
 import { getDatabase, ref, child, get  } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-database.js";
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

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
//  const database = getDatabase(app);
//  console.log(database)

const dbRef = ref(getDatabase(app));
get(child(dbRef, `Module`)).then((snapshot) => {
  if (snapshot.exists()) {
    console.log(snapshot.val());
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});



// let currentIndex = 0;
var Data = {
    'Module': {
        'chap1': { 'name': 'Introduction', 'data': [{ tittle: 'abcd', link: 'https://www.google.com/', msg: 'good morning' }] },
        'chap2': { 'name': 'Kick Start', 'data': [{ tittle: 'abcd', link: 'www.google.com', msg: 'good morning' }] },
        'chap3': { 'name': 'InterMediate', 'data': [{ tittle: 'abcd', link: 'www.google.com', msg: 'good morning' }] },
    }
}
for ( let data in Data) {
    // for(chapter in data['Module']){
    // for(i in Data[data]){
    //     // generateAndAppendCard(i)
    //     console.log(i);
    // }
    // }    
    let chapters = Data[data]
    for (let chapter in chapters) {
        let ChapterName = chapters[chapter].name
        let li = chapters[chapter].data
        for (let i in li) {
           let title = li[i].tittle
           let msg = li[i].msg
           let link = li[i].link
            generateAndAppendCard(ChapterName, title, msg, link);
        }
        // console.log(chapters[chapter][0].name);
    }
}
var subjects = {
    'IT0564': { name: 'cns', ref: 'abcd' },
    'IT0565': { name: 'admt', ref: 'abcd' },
    'IT0566': { name: 'SE', ref: 'abcd' }
}
function changeSubject(_id){
alert(`called ${_id}`)
}
function changeSlide(div) {
    let arr = ['note', 'QB']
    // const sliderContent = document.getElementById('sliderContent');
    // const slides = document.querySelectorAll('.slide');
    // const slideWidth = slides[0].clientWidth;

    // currentIndex = index;

    // sliderContent.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    for (let i of arr) {
        console.log(i)
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
const subjectDiv = document.getElementById('subject-List');
for(let subject in subjects){
    let li = document.createElement('li')
    li.textContent = subjects[subject].name;
    li.id = subject;
    // li.addEventListener('click',changeSubject())
    subjectDiv.appendChild(li);
}  
const subjectLis = subjectDiv.querySelectorAll('li')
subjectLis.forEach((iteam)=>{
    iteam.addEventListener("click",()=>{
        event.preventDefault();
        changeSubject(iteam.id)
    })
})
// const chaptersList = document.querySelectorAll('.chapters');

// // Loop through each element and add a click event listener
// chaptersList.forEach(chapter => {
//     chapter.addEventListener('click', () => {
//         // Find the child 'a' element within the clicked 'li' and trigger a click on it
//         const anchor = chapter.querySelector('a');
//         if (anchor) {
//             anchor.click();
//         }
//     });
// });
document.addEventListener('DOMContentLoaded', function () {
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
});


function generateAndAppendCard(moduleName, title, msg, linkUrl) {
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
    h3Element.textContent = `${moduleName}: -`;

    // Ul that contain all the links of chapter
    const ulElement = document.createElement("ul");
    ulElement.classList.add("message", "overflow-auto", "pl-5");

    // li the actual link to the pdf
    const liElement = document.createElement("li");
    // Ttile of the link
    const bElement = document.createElement("b");
    bElement.textContent = title;
    liElement.appendChild(bElement);
    // sub message of the div
    liElement.appendChild(document.createTextNode(` ${msg} `));
    // link of the pdf
    const aElement = document.createElement("a");
    aElement.href = linkUrl;
    aElement.target = "_blank";
    // aElement.rel = "noopener noreferrer";
    aElement.style.display = "none";
    liElement.appendChild(aElement);

    ulElement.appendChild(liElement);
    containerDiv.appendChild(h3Element);
    containerDiv.appendChild(ulElement);
    cardDiv.appendChild(containerDiv);

    // Append the card to the module div
    const moduleDiv = document.querySelector('.module');
    moduleDiv.appendChild(cardDiv);
}


// Example usage:
// generateAndAppendCard(2, "Name of Module 2", "sdfhisafdghsidfbkjasdf asdfas", "https://www.google.com");
