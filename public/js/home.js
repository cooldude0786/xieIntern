import { generateAndAppendCard,getUrlParams } from "./component.js";
import { getAllSubject,GetAllDataFromDB } from "./db.js";

const note = document.getElementById('noteBtn')
note.addEventListener('click', () => {
    changeSlide('note')
    // getDefaultData()
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
        // console.log()
        displaySubject(await getAllSubject(sem));
        // getDefaultData(sem);

    }
});


function displaySubject(jsonData) {
    // Reference to the <ul> element
    var ul = document.getElementById('subject-List');

    // Clear existing content in <ul>
    ul.innerHTML = '';

    // Check if jsonData is empty
    if (Object.keys(jsonData).length === 0) {
        var li = document.createElement('li');
        li.textContent = "No data found";
        ul.appendChild(li);
    } else {
        // Iterate over each key-value pair in JSON data
        Object.keys(jsonData).forEach(function (key) {
            // Create a new <li> element
            var li = document.createElement('li');

            // Set the ID of the <li> to the key from JSON data
            li.id = key;

            // Set the text content of the <li> to the value from JSON data
            li.textContent = jsonData[key];

            // Append the <li> to the <ul> element
            ul.appendChild(li);
            setupClickHandlers();

        });
    }
}


function setupClickHandlers() {
    var lis = document.querySelectorAll('#subject-List li');

    lis.forEach(function (li) {
        li.addEventListener('click', function () {
            // console.log('Clicked on:', li.id.trim());
            const moduleDiv = document.querySelector('.module');

            moduleDiv.innerHTML = `<div class="h2 p-4"> Module Notes</div>`
            getDefaultData(getUrlParams().sem, li.id.trim());
            // You can perform additional actions here as needed
        });
    });
}

// Call setupClickHandlers function after DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    setupClickHandlers();
});
async function getDefaultData(sem, SubjectCode) {
    var resultData = await GetAllDataFromDB(sem, SubjectCode);
    if (!resultData.hasOwnProperty('status')) {
        console.log(resultData['Module']);
        let data = resultData['Module']

        try {


            for (let i in data) {
                let d = data[i]
                console.log('=>', d.data);
                generateAndAppendCard(i, d.name, d.data)
            }
            changeSlide('note')

            // for (let i in resultData['Module']) {
            //     let Module = resultData[i]
            //     console.log(Module,'\n');
            // }
            // addActionToLi();            
        } catch (error) {
            console.log('errorrrrrr ', error);
        }

    }
    else if (!resultData.status) {
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
    ``
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