import { createTeacherCard, createHodCard } from "./component.js";
import {  getAllTeachersDetails,} from "./db.js"
let teacherdata;


function loadSlidesdata(src, index) {
    var carouselItem = document.createElement('div');
    carouselItem.classList.add('carousel-item', 'h-100');
    carouselItem.setAttribute('data-interval', '1000'); // Set the interval

    if (index === 0) {
        carouselItem.classList.add('active'); // Make the first slide active
    }

    var img = document.createElement('img');
    img.src = src;
    img.classList.add('d-block', 'w-100');
    img.style.maxHeight = '-webkit-fill-available';

    // Append the img to the carousel item
    carouselItem.appendChild(img);

    // Append the carousel item to the carousel inner
    document.querySelector('.carousel-inner').appendChild(carouselItem);
}
const imageSources = [
    'scr/img/1.jpg',
    'https://lh3.googleusercontent.com/u/0/drive-viewer/AKGpihY9PzdylaZFEBhNYa94PW2vndLFk0KCLWAKwOxdCte3kUIDcmeC3MBprFrLfSyF9bBEJyqOHxhAH0PTJEC-YOREceCg8GF8iDY=w1920-h912-rw-v1',
    // Add more image URLs here
];

document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('.carousel-inner').innerHTML = ""
    imageSources.forEach((src, index) => {
        loadSlidesdata(src, index);
    });
    loadFacultiyData()  
});


// Define subjects for each year
const subjects = {
    FE: ['Maths', 'Physics', 'Chemistry'],
    SE: ['Computer Science', 'Electronics', 'Mechanical'],
    TE: ['Data Structures', 'Algorithms', 'Database Management'],
    BE: ['Artificial Intelligence', 'Machine Learning', 'Robotics']
};

// Function to render the subjectContainer with select options based on the selected year
function renderSubjects() {
    // Get the selected year
    var selectedYear = document.getElementById('yearSelect').value;

    // Create a div for the subjectContainer
    var subjectContainerDiv = document.createElement('div');
    subjectContainerDiv.id = 'subjectContainer';
    subjectContainerDiv.classList.add('w-100', 'py-5', 'rounded', 'px-3');

    // Append a label for the selected year
    var yearLabel = document.createElement('label');
    yearLabel.textContent = `Select Subject for ${selectedYear}`;
    subjectContainerDiv.appendChild(yearLabel);

    // Create a select element for the subjects of the selected year
    var select = document.createElement('select');
    select.classList.add('form-control', 'form-control-lg');

    // Loop through the subjects of the selected year and create an option element for each
    subjects[selectedYear].forEach(subject => {
        var option = document.createElement('option');
        option.textContent = subject;
        select.appendChild(option);
    });

    // Append the select element to the subjectContainer div
    subjectContainerDiv.appendChild(select);

    // Get the yearSelectContainer div
    var yearSelectContainer = document.getElementById('yearSelectContainer');

    // Replace any existing subjectContainer with the new one
    var existingSubjectContainer = document.getElementById('subjectContainer');
    if (existingSubjectContainer) {
        yearSelectContainer.replaceChild(subjectContainerDiv, existingSubjectContainer);
    } else {
        yearSelectContainer.appendChild(subjectContainerDiv);
    }
}

const teacherInfo = document.querySelector(".teacherinfo");
const hod = document.getElementById("hod");

const cardTemplate = document.getElementById("card-template");
for (let i = 0; i < 9; i++) {
    const clonedTemplate = cardTemplate.content.cloneNode(true);
    teacherInfo.appendChild(clonedTemplate);
}

// fetch("./js/data.json")
//     .then((response) => response.json())
//     .then((data) => {
//         teacherInfo.innerHTML = ""; // Clear existing content before adding new cards
//         data.forEach((teacher) => {
//             addTeacherCard(teacher.profileImage, teacher.name, teacher.position, teacher.education);
//         });
//     });

    let isFirstCard = true;

    function addTeacherCard(profileImage, name, position, education) {
        const div = document.createElement("div");
        div.className = "card mb-3 mx-auto";
        div.style.maxWidth = "90%";
    
        if (!isFirstCard) {
            // Change structure for subsequent cards
            div.className = "card flex-item";
            div.style.width = "22rem";
            div.innerHTML = `
                <img src="${profileImage}" class="card-img-top" alt="${name}">
                <div class="card-body">
                    <h1 class="card-title">${name}</h1>
                    <h4 class="card-text">${position}</h4>
                    <h7 class="card-text">${education}</h7>
                </div>
            `;
        } else {
            // Original structure for the first card
            div.innerHTML = `
                <div class="row g-0">
                    <div class="col-md-4">
                        <img class="img-fluid rounded-start teachericon" src="${profileImage}" alt="${name}">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h1 class="card-title">${name}</h1>
                            <h4 class="card-text">${position}</h4>
                            <h7 class="card-text">${education}</h7>
                        </div>
                    </div>
                </div>
            `;
            isFirstCard = false;
        }
    
        div.querySelectorAll('.teachericon, .card-img-top, .card-title, .card-text').forEach(element => {
            element.classList.remove('skeleton');
        });
    
        teacherInfo.appendChild(div);
    }
    




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
                    createTeacherCard('123',
                        teacherData.profileImage,
                        teacherData.name, teacherData.position,
                        teacherData.education,
                        teacherData.gender
                    )
                } else {
                    createHodCard(
                        '123',
                        teacherData.profileImage,
                        teacherData.name, teacherData.position,
                        teacherData.education,
                        teacherData.gender
                    )
                }
            }
            // document.getElementById('Teacherloadercontain').classList.add('d-none')
            // addEventListnerToAllTeacherBtn()
        }, 1000)
    
    }

// Images to be added
// var imageSources = ['img/3.jpg', 'img/2.jpg', 'img/1.jpg'];

// // Get the carousel inner element
// var carouselInner = document.getElementById('carouselBody');

// // Loop through each image source and create corresponding carousel items
// imageSources.forEach(function(src) {
//     // Create a new carousel item div
//     var carouselItem = document.createElement('div');
//     carouselItem.classList.add('carousel-item','active');
//     carouselItem.setAttribute('data-interval', '500');
    
//     // Create a new img element
//     var img = document.createElement('img');
//     img.classList.add('d-block', 'w-100');
//     img.src = src;
//     img.alt = '...';
    
//     // Append the img to the carousel item
//     carouselItem.appendChild(img);
    
//     // Append the carousel item to the carousel inner
//     carouselInner.appendChild(carouselItem);
// });
