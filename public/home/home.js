var imageSources = ['img/3.jpg', 'img/2.jpg', 'img/1.jpg'];

function loadSlidesdata(src,index) {
    var carouselItem = document.createElement('div');
    if (index>0) {
        carouselItem.classList.add('carousel-item');
    } else {
        carouselItem.classList.add('carousel-item','active');// making the first silde having .active class so that carousel begins
    }
    carouselItem.setAttribute('data-interval', '500');

    // Create a new img element
    var img = document.createElement('img');
    img.classList.add('d-block', 'w-100');
    img.src = src;
    img.alt = '...';

    // Append the img to the carousel item
    carouselItem.appendChild(img);

    // Append the carousel item to the carousel inner
    document.getElementById('carouselBody').appendChild(carouselItem);
}

document.addEventListener('DOMContentLoaded', async function () {
    imageSources.forEach((item,index) => {
        loadSlidesdata(item,index);
    })
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
