const root = document.documentElement;
const container = document.querySelector('#container');

function deleteGrid() {
    const tempContainer = document.querySelector('#tempContainer');
    container.removeChild(tempContainer);

}

function generateGrid(size) {
    const tempContrainer = document.createElement('div');
    tempContrainer.id = "tempContainer";
    for(let ii = 0; ii < size; ii++) {
        const row = document.createElement('div');
        row.classList.add('row');
        for(let i = 0; i < size; i++) {
            const div = document.createElement('div');
            div.classList.add('square');
            row.appendChild(div);
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

generateGrid(4);