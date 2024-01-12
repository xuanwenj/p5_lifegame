let w, columns, rows, board, next, buttonReset, buttonStart;
//let isPaused = false;
let isStart = false;
let ;

/**
 * set up the canvas and data structures for drawing
 */
function setup() {
  frameRate(8);
  createCanvas(720, 400);
  w = 20;
  // Calculate columns and rows
  //floor() is used to round down the result of width / w to the nearest whole number
  columns = floor(width / w); //36
  rows = floor(height / w); //20

  // Wacky way to make a 2D array is JS:
  // make an array represents colunms,
  // for loop the array while adding a new array represents row and assign it to the colunm[i]
  board = new Array(columns);
  for (let i = 0; i < columns; i++) {
    board[i] = new Array(rows);
  }
  // Going to use multiple 2D arrays and swap them
  next = new Array(columns);
  for (i = 0; i < columns; i++) {
    next[i] = new Array(rows);
  }
  init();

  buttonReset = createButton('Reset');
  buttonReset.position(0, 630);
  buttonReset.mousePressed(clearCanvas);

  buttonStart = createButton('Start');
  buttonStart.position(180, 630);
  buttonStart.mousePressed(startGenerate);
}
/**
 * The draw() function is automatically called by p5.js in a loop, continuously after setup().
 * @returns If pause button click, stop the draw() method.
 */
function draw() {
  background(255);

  if (isStart === true) generate();
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      if (board[i][j] == 1) fill(0);
      else fill(255);
      stroke(0);
      rect(i * w, j * w, w);
    }
  }
}
/*
 * Initialize a blank canvas.
 */

function init() {
  //isPaused = false;
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      // Clear the board
      board[i][j] = 0;
      next[i][j] = 0;
    }
  }
}

/**
 * Click mouse to choose cells and mark them as live lifes.
 */
function mouseClicked() {
  let col = floor(mouseX / w);
  let row = floor(mouseY / w);
  board[col][row] = 1 - board[col][row];
}


function startGenerate() {
  isStart = !isStart;
  if(isStart){
    buttonStart.html('Pause');
  } else {
    buttonStart.html('Start');
  }
}

function generate() {
  // Loop through every spot in our 2D array and check spots neighbors
  for (let x = 0; x < columns; x++) {
    for (let y = 0; y < rows; y++) {
      // Add up all the states in a 3x3 surrounding grid
      let neighbors = 0;
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          // use modulo to include the border in the count of neighbors
          let col = (x + i + columns) % columns;
          let row = (y + j + rows) % rows;
          neighbors += board[col][row];
        }
      }

      // we added it in the above loop
      neighbors -= board[x][y];
      // Rules of Life
      if (board[x][y] == 1 && neighbors < 2) next[x][y] = 0;
      // Loneliness
      else if (board[x][y] == 1 && neighbors > 3)
        next[x][y] = 0; // Overpopulation
      else if (board[x][y] == 0 && neighbors == 3)
        next[x][y] = 1; // Reproduction
      else next[x][y] = board[x][y]; // Stasis
    }
  }

  let temp = board;
  board = next;
  next = temp;
}

/**
 * reset the canvas
 */
function clearCanvas() {
  //isPaused = false;
  isStart = false;
  init();
  frameRate(8);
}
