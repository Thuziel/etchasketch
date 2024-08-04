const root = document.documentElement;
const container = document.querySelector('#container');
let color = "black";

function deleteGrid() {
    const recycledContainer = document.querySelector('#recycledContainer');
    container.removeChild(recycledContainer);

}

function generateGrid(size) {
    const recycledContainer = document.createElement('div');
    recycledContainer.id = "recycledContainer";
    let id = 0;
    for(let i = 0; i < size; i++) {
        const row = document.createElement('div');
        row.classList.add('row');
        for(let j = 0; j < size; j++) {
            const div = document.createElement('div');
            div.classList.add('square');
            div.id = id;
            row.appendChild(div);
            id+=1;
        }
        recycledContainer.append(row);
    }
    container.appendChild(recycledContainer);
}

function resizeSquares(size) {
    root.style.setProperty("--square-size", size+"px");
}

const gridSizeInput = document.querySelector('#gridSizeInput');
gridSizeInput.addEventListener('input', (e) => {
    deleteGrid();
    generateGrid(e.target.value);
});

const squareSizeInput = document.querySelector('#squareSizeInput');
squareSizeInput.addEventListener('input', (e) => {
    resizeSquares(e.target.value);
})
squareSizeInput.addEventListener('keyup', (e) => {
    resizeSquares(e.target.value);
})

const borderCheckbox = document.querySelector('#borderInput');
borderCheckbox.addEventListener('change', function() {
    if(this.checked) {
        root.style.setProperty("--border-width", "1px");
    } else {
        root.style.setProperty("--border-width", "0px");
    }
})

let draw = true;

function colorSquare(e) {
    if(e.target.classList == 'square') {
        if(draw == true) {
            e.target.style.backgroundColor = color;
        } 
        else if(draw == false) {
            e.target.style.backgroundColor = "white";
        }
    }
}

function handleMouseOver(e) {
    colorSquare(e);
}   

root.addEventListener("mousedown", (e) => {
    const grandparent = e.target.parentElement?.parentElement;
    if(grandparent && grandparent.id == "recycledContainer") {
        console.log(e.target.parentElement.parentElement.id);
        e.preventDefault();
    }
    if(e.button == 0) {
        draw = true;
    } else if(e.button == 2) {
        draw = false
    }
    colorSquare(e);
    container.addEventListener("mouseover", handleMouseOver);
})

root.addEventListener("mouseup", (e) => {
    container.removeEventListener("mouseover", handleMouseOver);
})

root.addEventListener("contextmenu", (e) => {
    e.preventDefault();
})

const colourPicker = document.querySelector('#colourPicker');
colourPicker.addEventListener('input', (e) => {
    color = e.target.value;
})

generateGrid(4);