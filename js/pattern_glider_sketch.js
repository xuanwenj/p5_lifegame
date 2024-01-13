let w, columns, rows, board, next, generationNum,  generationNumText, initCoorText, testGeneration, testCoorGeneration;
let isPaused = false;
let initCoor = [];

function setup() {
  // Set simulation framerate to 8 to avoid flickering
  frameRate(2);
  createCanvas(720, 400);
  w = 20;
  externalText = createDiv('Texts in this region are made in P5.js');
  externalText.position(width + 100, 100);
  externalText.style('color', 'black');

  initCoorText = createP("Initial pattern coordinates: ");
  initCoorText.position(width + 100, 200);
    
  generationNumText = createP('Generation:');
  generationNumText.position(width + 100, 370);
  
  coordinatesText = createP('Coordinates:');
  coordinatesText.position(width + 100, 460);

  testGeneration = createP('The coordinates of 20th generation should be: [8, 8],[9, 9],[10, 7],[10, 8],[10, 9]');
  testGeneration.position(width + 100, 400);
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
  printInitCoor();
  let buttonReset = createButton('Reset');
  buttonReset.position(0, 600);
  buttonReset.mousePressed(clearCanvas);

  let buttonPause = createButton('Pause');
  buttonPause.position(90, 600);
  buttonPause.mousePressed(switchPause);

  let buttonSpeed20 = createButton('Speed20');
  buttonSpeed20.position(180, 600);
  buttonSpeed20.mousePressed(changeSpeed);
}
/**
 * Set simulation framerate to 20.
 */
function changeSpeed() {
  frameRate(20);
}
/**
 * Swtich pause and resume condition.
 */
function switchPause() {
  isPaused = !isPaused;
}
/**
 * Draw the canvas with rect(), the draw() function is automatically called by p5.js in a loop, continuously after setup().
 * @returns If pause button click, stop the draw() method.
 */
function draw() {
  if (isPaused) {
    return;
  }
  background(255);
  generate();
  
  printGeneration();
  printCoordinates();

  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      if (board[i][j] == 1) fill(0);
      else fill(255);
      stroke(0);
      //w - 2 means draw the rect with 2 pixel less to show the edge of the rect
      rect(i * w, j * w - 2, w - 2);
    }
  }
}
/*
 * Initialize the canvas with a glider pattern.
 */
function init() {
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      // Clear the board
      board[i][j] = 0;
      next[i][j] = 0;
    }
  }

  // put the init coordinates in an array
  const coordinates = [
    [3, 3],
    [4, 4],
    [5, 2],
    [5, 3],
    [5, 4]
  ];

  for (let i = 0; i < coordinates.length; i++) {
    const [x, y] = coordinates[i];
    board[x][y] = 1;
    initCoor.push(`[${x}, ${y}]`);
      
  }
  generationNum = 0;
}

function generate() {
  // Loop through every spot in our 2D array and check spots neighbors
  for (let x = 0; x < columns; x++) {
    for (let y = 0; y < rows; y++) {
      // Add up all the states in a 3x3 surrounding grid
      let neighbors = 0;
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          //[x+i] [y+j] is to calculate the relative neibours around the current spot
          // use modulo to include the border in the count of neighbors
          let col = (x + i + columns) % columns;
          let row = (y + j + rows) % rows;
          neighbors += board[col][row];
        }
      }

      // A little trick to subtract the current cell's state since
      // we added it in the above loop, delete the cell it self
      neighbors -= board[x][y];
      // Rules of Life
      if (board[x][y] == 1 && neighbors < 2) 
      {
        
        next[x][y] = 0; // Loneliness die

      }
      else if (board[x][y] == 1 && neighbors > 3){
      
        next[x][y] = 0; // Overpopulation die

      }       
      else if (board[x][y] == 0 && neighbors == 3)
        next[x][y] = 1; // Reproduction birth
      else next[x][y] = board[x][y]; // Stasis stable
    }
  }

  let temp = board;
  board = next;
  next = temp;

  generationNum++;
}


function printInitCoor(){
  initCoorText.html('Initial pattern coordinate(0 generation): <br >' + initCoor.join('<br>'))
}


function printGeneration() {
  generationNumText.html('Generation: ' + generationNum);
}
function printCoordinates() {
  //let gliderCoordinates = findGliderCoordinates();
  // Update the paragraph element's content with the coordinates
  coordinatesText.html('Coordinates: ' + getCoordinates());
}

function getCoordinates() {
  let livingCells = [];
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      if (board[i][j] == 1) {
        livingCells.push(`[${i}, ${j}]`);
      }
    }
  }
  if (livingCells.length > 0) {
    return ('Living Cells Coordinates:', livingCells);
  } else {
    return ('No living cells found');
  }
}

/**
 * reset the canvas
 */
function clearCanvas() {
  isPaused = false; 
  init();
  frameRate(2);
  generationNum = 0;

}
