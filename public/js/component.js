
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

function createTeacherCard(uid,imageSrc, title, post, qualification) {
    const teacherInfo = document.getElementById("facultyDetails");

    // Create card elements
    var cardDiv = document.createElement('div');
    cardDiv.classList.add('card','fade-in','faculty');
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

    var postElement = document.createElement('h4');
    postElement.classList.add('card-text');
    postElement.textContent = post;

    var qualificationElement = document.createElement('h6');
    qualificationElement.classList.add('card-text');
    qualificationElement.textContent = qualification;

    var btnDiv = document.createElement('div');
    btnDiv.classList.add('d-flex','justify-content-between');
    
    var editbtn = document.createElement('div');
    editbtn.classList.add('btn','btn-primary','teacher-edit-btn');
    editbtn.innerHTML = `Edit <i class="fa fa-edit"></i>`;
    
    var deleteBtn = document.createElement('div');
    deleteBtn.classList.add('btn','btn-danger','teacher-edit-btn');
    deleteBtn.innerHTML = `Delete <i class="fa fa-trash" aria-hidden="true"></i>`;
    
    btnDiv.appendChild(editbtn);
    btnDiv.appendChild(deleteBtn);

    // Append elements to cardBody
    cardBody.appendChild(titleElement);
    cardBody.appendChild(postElement);
    cardBody.appendChild(qualificationElement);
    cardBody.appendChild(btnDiv);
    // Append img and cardBody to cardDiv
    cardDiv.appendChild(img);
    cardDiv.appendChild(cardBody);

    // Get the parent div where the card will be appended
    var parentDiv = document.getElementById('teacher-info');
    teacherInfo.appendChild(cardDiv);
}


export { generateAndAppendCard, getUrlParams, createTeacherCard }