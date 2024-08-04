const root = document.documentElement;
const container = document.querySelector('#container');
let color = "black";
let mousePressed = false;

function deleteGrid() {
    const recycledContainer = document.querySelector('#recycledContainer');
    if(recycledContainer) {
        container.removeChild(recycledContainer);
    }

}

function generateGrid(size) {
    deleteGrid();
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
    recycledContainer.addEventListener("contextmenu", (e) => {
        e.preventDefault();
    })
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
    if(mousePressed) {
        colorSquare(e);
    }
}   

container.addEventListener("mouseover", handleMouseOver);

root.addEventListener("mousedown", (e) => {
    mousePressed = true;
    if(e.button == 0) {
        draw = true;
    } else if(e.button == 2) {
        draw = false;
    }
    colorSquare(e);
    
})

root.addEventListener("mouseup", (e) => {
    mousePressed = false;
})

const colourPicker = document.querySelector('#colourPicker');
colourPicker.addEventListener('input', (e) => {
    color = e.target.value;
})

generateGrid(4);