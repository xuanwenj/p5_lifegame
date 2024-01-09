
let w, columns, rows, board, next;
let isPaused = false;
function setup() {
  // Set simulation framerate to 10 to avoid flickering
  frameRate(5);
  createCanvas(720, 400);
  w = 20;
  // Calculate columns and rows
  //floor() is used to round down the result of width / w to the nearest whole number
  columns = floor(width / w);//36
  rows = floor(height / w);//20

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

  let buttonReset = createButton('Reset');
  buttonReset.position(0, 500);
  buttonReset.mousePressed(clearCanvas);
  let buttonPause = createButton('Pause');
  buttonPause.position(90,500);
  buttonPause.mousePressed(switchPause);
}
/**
 * swtich pause and resume condition 
 */
function switchPause(){
  isPaused = !isPaused; 
}
/**
 * draw the canvas with rect()
 * @returns 
 */
function draw() {
  if(isPaused){
    return;
  }
  background(255);
  generate();
  for ( let i = 0; i < columns; i++) {
    for ( let j = 0; j < rows; j++) {
      if ((board[i][j] == 1)) fill(0);
      else fill(255);
      //color of the line
      stroke(0);
      //w - 1 means draw the rect with 2 pixel less to show the edge of the rect  
      rect(i * w, j * w-2, w-2, );
    }
  }
 }


function init() {
    for (let i = 0; i < columns; i++) {
      for (let j = 0; j < rows; j++) {
        // Clear the board
        board[i][j] = 0;
        next[i][j] = 0;
      }
    }

    board[3][3] = 1; 
    board[4][4] = 1;
    board[5][2] = 1;
    board[5][3] = 1;
    board[5][4] = 1;
  }
  function generate() {

	// Loop through every spot in our 2D array and check spots neighbors
	for (let x = 1; x < columns - 1; x++) {
	  for (let y = 1; y < rows - 1; y++) {
		// Add up all the states in a 3x3 surrounding grid
		let neighbors = 0;
		for (let i = -1; i <= 1; i++) {
		  for (let j = -1; j <= 1; j++) {
        //[x+i] [y+j] is to calculate the relative neibours around the current spot
			neighbors += board[x+i][y+j];
		  }
		} 
  
		// A little trick to subtract the current cell's state since
		// we added it in the above loop, delete the cell it self
		neighbors -= board[x][y];
		// Rules of Life
		if      ((board[x][y] == 1) && (neighbors <  2)) next[x][y] = 0;           // Loneliness die
		else if ((board[x][y] == 1) && (neighbors >  3)) next[x][y] = 0;           // Overpopulation die
		else if ((board[x][y] == 0) && (neighbors == 3)) next[x][y] = 1;           // Reproduction birth
		else                                             next[x][y] = board[x][y]; // Stasis stable
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