const root = document.documentElement;
const container = document.querySelector('#container');
let color = "black";
let color2 = "white";
let mousePressed = false;
let ctrlPressed = null;
let squareSize = 50;

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
    if(size > 0) {
        root.style.setProperty("--square-size", size+"px");
        squareSize = parseInt(size);    
        squareSizeInput.value = squareSize;
        squareSizeRange.value = squareSize;
    } 
}

const gridSizeInput = document.querySelector('#gridSizeInput');
gridSizeInput.addEventListener('input', (e) => {
    deleteGrid();
    generateGrid(e.target.value);
});
gridSizeInput.addEventListener('keypress', (e) => {
    if(e.key !== "e" && e.key !== "-"){
        deleteGrid();
        generateGrid(e.target.value);
    } else {
        e.preventDefault();
    }
})

const squareSizeInput = document.querySelector('#squareSizeInput');
const squareSizeRange = document.querySelector('#squareSizeRange');
squareSizeInput.addEventListener('input', (e) => {
    resizeSquares(e.target.value);
})
squareSizeInput.addEventListener('keypress', (e) => {
    if(e.key !== "e" && e.key !== "-"){
        resizeSquares(e.target.value);
    } else {
        e.preventDefault();
        console.log(e.key)
    }
    
})

squareSizeRange.addEventListener('input', (e) => {
    resizeSquares(e.target.value);
    squareSizeInput.value = e.target.value;
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
        e.preventDefault();
        if(draw == true) {
            e.target.style.backgroundColor = color;
        } 
        else if(draw == false) {
            e.target.style.backgroundColor = color2;
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

const colourPicker2 = document.querySelector('#colourPicker2');
colourPicker2.addEventListener('input', (e) => {
    color2 = e.target.value;
})

let tempMousePosX = null;
let tempSquareSize = null;
root.addEventListener('mousemove', (e) => {
    if(ctrlPressed == true) {
        if(tempMousePosX == null && tempSquareSize == null) {
            tempMousePosX = e.clientX;
            tempSquareSize = squareSize;
        }
        
            resizeSquares(tempSquareSize + ((tempMousePosX - e.clientX)*-1));
            console.log(squareSize);
    }
})

root.addEventListener('keydown', (e) => {
    if(e.key == "Control") {
        ctrlPressed = true;
    }
})

root.addEventListener('keyup', (e) => {
    if(e.key == "Control") {
        ctrlPressed = false;
        tempMousePosX = null;
        tempSquareSize = null;
    }
})

generateGrid(4);

//alert("Hold control and move your mouse to zoom in and out.")