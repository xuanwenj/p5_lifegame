let w, columns, rows, board, next;
let isPaused = false;
let isStart = false;

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

  // Wacky way to make a 2D array is JS
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
  drawBoard();

  let button = createButton('Reset');
  button.position(0, 630);
  button.mousePressed(clearCanvas);

  let buttonPause = createButton('Pause');
  buttonPause.position(90, 630);
  buttonPause.mousePressed(switchPause);
 
  let buttonStart = createButton('Start');
  buttonStart.position(180, 630);
  buttonStart.mousePressed(startGenerate);

}
function draw() {
  if(isPaused){
    return;
  }
  background(255);
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      fill(board[i][j] ? 0 : 255);
      stroke(0);
      rect(i * w, j * w, w, w);
    }
  }
  if(isStart === true)
  generate();
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      if (board[i][j] == 1) fill(0);
      else fill(255);
      //color of the line
      stroke(0);  
      rect(i * w, j * w, w);
    }
  }

}
function drawBoard() {
  //isPaused = false;
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      // Clear the board
      board[i][j] = 0;
      next[i][j] = 0;
    }
  }
}
function mouseClicked() {
  let col = floor(mouseX / w);
  let row = floor(mouseY / w);
  board[col][row] = 1 - board[col][row];
}

function switchPause() {
  isPaused = !isPaused;
}

function startGenerate() {
  isStart = !isStart; 
}

function generate() {
  // Loop through every spot in our 2D array and check spots neighbors
  // for (let x = 1; x < columns - 1; x++) {
  //   for (let y = 1; y < rows - 1; y++) {
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
          //neighbors += board[x + i][y + j];
        }
      }
   
      // we added it in the above loop
      neighbors -= board[x][y];
      // Rules of Life
      if (board[x][y] == 1 && neighbors < 2) 
      next[x][y] = 0;
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
  isPaused = false;
  isStart = false;
  drawBoard();
  //setup();
}

