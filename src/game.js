
let grid;
let cols;
let rows;
const resoluçao = 10;

function façaGrid(cols, rows) {
    return Array(cols).fill(null).map(() => Array(rows));
}

function calculeVizinhos(grid, x, y) {

    let vizinhosSoma = 0;
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            let col = (x + i + cols) % cols;
            let row = (y + j + rows) % rows;
            vizinhosSoma += grid[col][row];
        }
    }

    vizinhosSoma -= grid[x][y];

    return vizinhosSoma
}

function setup() {
    createCanvas(600, 600);
    cols = width / resoluçao;
    rows = height / resoluçao;
    grid = façaGrid(cols, rows);

    for (let col = 0; col < cols; col++) {
        for (let row = 0; row < rows; row++) {
            grid[col][row] = floor(random(2));
        }
    }

}

function draw() {

    background(0);
    frameRate(10);

    let proximaGeraçao = façaGrid(cols, rows);

    for (let col = 0; col < cols; col++) {
        for (let row = 0; row < rows; row++) {
            let x = col * resoluçao;
            let y = row * resoluçao;

            (grid[col][row] === 1) ? rect(x, y, resoluçao - 1, resoluçao - 1) : null


            const ambienteAtual = grid[col][row];

            let vizinhos = calculeVizinhos(grid, col, row);


            // Se tiver menos que dois vizinhos morre
            if ((ambienteAtual === 1) && (vizinhos < 2)) proximaGeraçao[col][row] = 0;
            // Se tiver mais que 3 vizinhos morre
            else if ((ambienteAtual === 1) && (vizinhos > 3)) proximaGeraçao[col][row] = 0;
            // Se não existir e houver 3 vizinhos, reproduzem
            else if ((ambienteAtual === 0) && (vizinhos === 3)) proximaGeraçao[col][row] = 1;
            // Ou então permanece
            else proximaGeraçao[col][row] = ambienteAtual;


        }
    }

    grid = proximaGeraçao;
}