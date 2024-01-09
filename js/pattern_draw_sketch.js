let w;
let columns;
let rows;
let board;
let next;
let mySelect;

let paused = false;

function setup() {
  // Set simulation framerate to 10 to avoid flickering
  frameRate(10);
  createCanvas(720, 400);
  w = 20;
  // Calculate columns and rows
  //floor() is used to round down the result of width / w to the nearest whole number
  columns = floor(width / w); //36
  rows = floor(height / w); //20

  // Wacky way to make a 2D array is JS
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

  let button = createButton('Reset');
  button.position(0, 500);
  button.mousePressed(clearCanvas);
  mouseClicked(setCellState);
}
function setCellState() {
    if (mouseX >= 0 && mouseX < width && mouseY >= 0 && mouseY < height) {
      let x = floor(mouseX / w);
      let y = floor(mouseY / w);
      // Toggle cell state between alive (1) and dead (0)
      board[x][y] = board[x][y] === 1 ? 0 : 1;
    }
}

function draw() {
 
  background(255);
  generate();
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      if (board[i][j] == 1) fill(0);
      else fill(255);
      stroke(0);
      rect(i * w, j * w, w - 1, w - 1);
    }
  }
}

// reset board when mouse is pressed
function mousePressed() {
  init();
}

// Fill board randomly
function init() {
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      // Lining the edges with 0s
      if (i == 0 || j == 0 || i == columns - 1 || j == rows - 1)
        board[i][j] = 0;
      // Filling the rest randomly
      // random(2) return  returns a random number from 0 up to (but not including) 2, which is 0 or 1.
      else board[i][j] = floor(random(2));
      //set next array to 0 for storing the next state
      next[i][j] = 0;
    }
  }
}
function generate() {
  // Loop through every spot in our 2D array and check spots neighbors
  for (let x = 1; x < columns - 1; x++) {
    for (let y = 1; y < rows - 1; y++) {
      // Add up all the states in a 3x3 surrounding grid
      let neighbors = 0;
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          neighbors += board[x + i][y + j];
        }
      }

      // A little trick to subtract the current cell's state since
      // we added it in the above loop
      neighbors -= board[x][y];
      // Rules of Life
      if (board[x][y] == 1 && neighbors < 2) next[x][y] = 0; // Loneliness
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
  clear();
  init();
}
