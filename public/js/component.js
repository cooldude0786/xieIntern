
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
    moduleDiv.appendChild(cardDiv);
}

export {generateAndAppendCard}