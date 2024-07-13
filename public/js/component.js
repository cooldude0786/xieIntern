
function generateAndAppendCard(index, moduleName, links) {
    // moduleDiv.innerHTML=""


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
    console.log(index, moduleName);
    console.log(links);
    links.forEach((linkData, index) => {
        // console.log(linkData);
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
    // moduleDiv.innerHTML=""
    moduleDiv.appendChild(cardDiv);
}
function getUrlParams() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const sem = urlParams.get('sem');
    return { sem };
}
function createTeacherCard(uid, imageSrc, title, post, qualification) {
    // Create card elements
    var cardDiv = document.createElement('div');
    cardDiv.classList.add('card', 'fade-in', 'faculty');
    cardDiv.style.width = '18rem';
    cardDiv.id = uid;

    var img = document.createElement('img');
    img.classList.add('card-img-top', 'align-self-center', 'w-50');
    img.src = imageSrc;
    img.alt = 'Card image cap';

    var cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    var titleElement = document.createElement('h1');
    titleElement.classList.add('card-title');
    titleElement.textContent = title;

    var detailsDiv = document.createElement('div');
    detailsDiv.classList.add('detailsDiv')

    var postElement = document.createElement('h4');
    postElement.classList.add('card-text', 'post');
    postElement.textContent = post;

    var qualificationElement = document.createElement('h6');
    qualificationElement.classList.add('card-text');
    qualificationElement.textContent = qualification;

    var btnDiv = document.createElement('div');
    btnDiv.classList.add('d-flex', 'justify-content-between');

    var editbtn = document.createElement('button');
    editbtn.type = 'button';
    editbtn.classList.add('btn', 'btn-primary', 'teacher-edit-btn');
    editbtn.innerHTML = `Edit <i class="fa fa-edit"></i>`;
    editbtn.id = uid

    var deleteBtn = document.createElement('button');
    deleteBtn.type = 'button';
    deleteBtn.classList.add('btn', 'btn-danger', 'teacher-delete-btn');
    deleteBtn.innerHTML = `Delete <i class="fa fa-trash" aria-hidden="true"></i>`;
    deleteBtn.id = uid

    btnDiv.appendChild(editbtn);
    btnDiv.appendChild(deleteBtn);

    detailsDiv.appendChild(postElement);
    detailsDiv.appendChild(qualificationElement);
    detailsDiv.appendChild(btnDiv);

    cardBody.appendChild(titleElement);
    cardBody.appendChild(detailsDiv);
    cardDiv.appendChild(img);
    cardDiv.appendChild(cardBody);

    // Append the created cardDiv to existing facultyDetails container
    var facultyDetails = document.getElementById('facultyDetails');
    facultyDetails.appendChild(cardDiv);
}

function createHodCard(id, imageSrc, name, designation, qualifications) {
    // deleting existing hod cards if present
    deleteHodCards()
    // Create card elements
    var cardDiv = document.createElement('div');
    cardDiv.classList.add('align-items-center', 'order-1', 'rounded-5', 'card', 'col-sm-6', 'd-flex', 'hod', 'justify-content-center', 'p-2');
    cardDiv.id = id

    var rowDiv = document.createElement('div');
    rowDiv.classList.add('row', 'w-100');

    var imgDiv = document.createElement('div');
    imgDiv.classList.add('col-md-4', 'd-flex', 'align-items-center', 'justify-content-center');

    var img = document.createElement('img');
    img.classList.add('img-fluid', 'rounded-start', 'teachericon');
    img.src = imageSrc;
    img.alt = name;
    img.onerror = function () {
        this.src = '../scr/img/maleTeacher.png';
    };

    imgDiv.appendChild(img);

    var textDiv = document.createElement('div');
    textDiv.classList.add('col-md-8');

    var cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    var titleElement = document.createElement('h1');
    titleElement.classList.add('card-title');
    titleElement.textContent = name;

    var postElement = document.createElement('h4');
    postElement.classList.add('card-text');
    postElement.textContent = designation;

    var qualificationElement = document.createElement('h6');
    qualificationElement.classList.add('card-text');
    qualificationElement.textContent = qualifications;

    cardBody.appendChild(titleElement);
    cardBody.appendChild(postElement);
    cardBody.appendChild(qualificationElement);

    textDiv.appendChild(cardBody);

    rowDiv.appendChild(imgDiv);
    rowDiv.appendChild(textDiv);

    cardDiv.appendChild(rowDiv);

    // Append the created cardDiv to wherever you want in your document
    var parentDiv = document.getElementById('teachers-tab'); // Replace with actual parent container ID
    parentDiv.appendChild(cardDiv);
}

function deleteHodCards() {
    var parentDiv = document.getElementById('teachers-tab');
    // console.log(parentDiv);
    if (!parentDiv) {
        console.error('Parent div with id "teacher-tab" not found.');
        return;
    }

    var hodCards = parentDiv.querySelectorAll('.hod');

    // Loop through each hod card and remove it
    hodCards.forEach(function (card) {
        parentDiv.removeChild(card);
    });

    console.log('Deleted all HOD cards.');
}


export { generateAndAppendCard, getUrlParams, createTeacherCard, createHodCard }