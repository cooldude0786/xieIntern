// let currentIndex = 0;
var Data = {
    'Module': {
        'chap1': { 'name': 'Introduction', 'data': [{ tittle: 'abcd', link: 'https://www.google.com/', msg: 'good morning' }] },
        'chap2': { 'name': 'Kick Start', 'data': [{ tittle: 'abcd', link: 'www.google.com', msg: 'good morning' }] },
        'chap3': { 'name': 'InterMediate', 'data': [{ tittle: 'abcd', link: 'www.google.com', msg: 'good morning' }] },
    }
}
function changeSlide(div) {
    let arr = ['note', 'QB', 'YT']
    // const sliderContent = document.getElementById('sliderContent');
    // const slides = document.querySelectorAll('.slide');
    // const slideWidth = slides[0].clientWidth;

    // currentIndex = index;

    // sliderContent.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    for (i of arr) {
        console.log(i)
        if (i == div) {
            document.getElementById(i).classList.add('df')
            document.getElementById(i).classList.remove('dN')
        }
        else {
            document.getElementById(i).classList.remove('df')
            document.getElementById(i).classList.add('dN')
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

for (data in Data) {
    // for(chapter in data['Module']){
    // for(i in Data[data]){
    //     // generateAndAppendCard(i)
    //     console.log(i);
    // }
    // }    
    let chapters = Data[data]
    for (chapter in chapters) {
        let ChapterName = chapters[chapter].name
        let li = chapters[chapter].data
        for(i in li){
            title = li[i].tittle
            msg = li[i].msg
            link = li[i].link
            generateAndAppendCard(ChapterName,title,msg,link);
        }
        // console.log(chapters[chapter][0].name);
    }
}
// Example usage:
// generateAndAppendCard(2, "Name of Module 2", "sdfhisafdghsidfbkjasdf asdfas", "https://www.google.com");
