let w, columns, rows, board, next;
let isPaused = false;

/**
 * set up the canvas and data structures for drawing
 */
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

  let button = createButton('Reset');
  button.position(0, 600);
  button.mousePressed(clearCanvas);

  let buttonPause = createButton('Pause');
  buttonPause.position(90, 600);
  buttonPause.mousePressed(switchPause);
  print('press button');
}

function switchPause() {
  isPaused = !isPaused;
  print('pause');
}
/**
 *draw function in p5.js is called continuously after setup()
 */
function draw() {
  if (isPaused) {
    return;
  }
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

// Fill board randomly
function init() {
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      // Lining the edges with 0s
      if (i == 0 || j == 0 || i == columns - 1 || j == rows - 1)
        board[i][j] = 0;
      // Filling the rest randomly
      // random(2) return  returns a random number from 0 up to (but not including) 2, which is 0 or 1.
      else 
      // board[34][14] = 1;
      // board[35][14] = 1;
      // board[0][14] = 1;
      board[i][j] = floor(random(2));
      //set next array to 0 for storing the next state
      next[i][j] = 0;
    }
  }
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
      //Any live cell with fewer than two live neighbours dies, as if by underpopulation.
      //Any live cell with two or three live neighbours lives on to the next generation.
      //Any live cell with more than three live neighbours dies, as if by overpopulation.
      //Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
      // A little trick to subtract the current cell's state since
      // we added it in the above loop
      neighbors -= board[x][y];
      // Rules of Life
      if (board[x][y] == 1 && neighbors < 2) 
      next[x][y] = 0; // Loneliness
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
  clear();
  init();
}
