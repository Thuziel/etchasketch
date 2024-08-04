const root = document.documentElement;
const container = document.querySelector('#container');
let color = "black";

function deleteGrid() {
    const tempContainer = document.querySelector('#tempContainer');
    container.removeChild(tempContainer);

}

function generateGrid(size) {
    const tempContrainer = document.createElement('div');
    tempContrainer.id = "tempContainer";
    let id = 0;
    for(let ii = 0; ii < size; ii++) {
        const row = document.createElement('div');
        row.classList.add('row');
        for(let i = 0; i < size; i++) {
            const div = document.createElement('div');
            div.classList.add('square');
            div.id = id;
            row.appendChild(div);
            id+=1;
        }
        tempContrainer.append(row);
    }
    container.appendChild(tempContrainer);
}

function resizeSquares(size) {
    root.style.setProperty("--square-size", size+"px");
}

const gridSizeInput = document.querySelector('#gridSizeInput');
gridSizeInput.addEventListener('keyup', (e) => {
    deleteGrid();
    generateGrid(e.target.value);
});

const squareSizeInput = document.querySelector('#squareSizeInput');
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
    if(grandparent && grandparent.id == "tempContainer") {
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