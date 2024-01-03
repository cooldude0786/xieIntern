// let currentIndex = 0;

function changeSlide(div) {
    let arr = ['note', 'QB', 'YT']
    // const sliderContent = document.getElementById('sliderContent');
    // const slides = document.querySelectorAll('.slide');
    // const slideWidth = slides[0].clientWidth;

    // currentIndex = index;

    // sliderContent.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    for (i of arr) {
        console.log(i)
        if (i == div) { document.getElementById(i).classList.add('df')
        document.getElementById(i).classList.remove('dN') }
        else {
            document.getElementById(i).classList.remove('df')
            document.getElementById(i).classList.add('dN')
        }
    }
}
function expandModule(id_){
    let parentDiv = id_.parentNode.parentNode 
    if(parentDiv.children[1].style.height!== 'auto'){
        parentDiv.children[1].style.height = "auto"
        id_.innerText = 'View Less'
    }else{
        parentDiv.children[1].style.height = "100px"
        id_.innerText = 'View More'
    }
}
const chaptersList = document.querySelectorAll('.chapters');

// Loop through each element and add a click event listener
chaptersList.forEach(chapter => {
    chapter.addEventListener('click', () => {
        // Find the child 'a' element within the clicked 'li' and trigger a click on it
        const anchor = chapter.querySelector('a');
        if (anchor) {
            anchor.click();
        }
    });
});