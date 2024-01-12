let w, columns, rows, board, next;
let isPaused = false;
let toggleCanvas = true;
let currentInit = 0;
const totalInit = 3;
const buttonNames = ["Test still lifes ", "Test oscillarors.", "Test border neighbors "];
function setup() {

  // Set simulation framerate to 8 to avoid flickering
  frameRate(8);
  createCanvas(720, 400);
  w = 20;
  externalText = createDiv('In still lifes patterns test, the glider pattern is to prove the canvas being continuously refreshed.');
  externalText.position(width + 100, 150); 
  externalText.style('color', 'red'); 
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

  let buttonReset = createButton('Reset');
  buttonReset.position(0, 600);
  buttonReset.mousePressed(clearCanvas);
  
  let buttonPause = createButton('Pause');
  buttonPause.position(90, 600);
  buttonPause.mousePressed(switchPause);

  let buttonSpeed20 = createButton('Speed20');
  buttonSpeed20.position(180,600);
  buttonSpeed20.mousePressed(changeSpeed);
  
}
function toggleInit() {
  currentInit = (currentInit + 1) % buttonNames.length;
  setup(); // Call setup to update the canvas

  // Change the button text based on the current canvas
  const button = document.getElementById("chooseCanvas");
  button.textContent = `${buttonNames[currentInit]}`;
}

function changeSpeed(){
  frameRate(20);
}
/**
 * swtich pause and resume condition
 */
function switchPause() {
  isPaused = !isPaused;
}
/**
 * draw the canvas with rect()
 * @returns
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
      //color of the line
      stroke(0);
      //w - 1 means draw the rect with 2 pixel less to show the edge of the rect
      rect(i * w, j * w, w);
    }
  }

}

function init() {
  if(currentInit === 0){
    // initialize the pattern with still lifes
    for (let i = 0; i < columns; i++) {
      for (let j = 0; j < rows; j++) {
        // Clear the board
        board[i][j] = 0;
        next[i][j] = 0;
      }
    }
  
    board[10][1] = 1;
    board[11][1] = 1;
    board[10][2] = 1;
    board[11][2] = 1;
  
    board[15][1] = 1;
    board[16][1] = 1;
    board[14][2] = 1;
    board[15][3] = 1;
    board[16][3] = 1;
    board[17][2] = 1;
  
    board[21][1] = 1;
    board[22][1] = 1;
    board[20][2] = 1;
    board[23][2] = 1;
    board[21][3] = 1;
    board[23][3] = 1;
    board[22][4] = 1;
  
    board[26][1] = 1;
    board[27][1] = 1;
    board[26][2] = 1;
    board[28][2] = 1;
    board[27][3] = 1;
  
    board[2][4] = 1;
    board[3][5] = 1;
    board[1][6] = 1;
    board[2][6] = 1;
    board[3][6] = 1;


  
  }else if(currentInit === 1){
    //initialize the pattern with oscillarors
      for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
          // Clear the board
          board[i][j] = 0;
          next[i][j] = 0;
        }
      }
    
      board[5][2] = 1;
      board[6][2] = 1;
      board[7][2] = 1;

      board[16][2] = 1;
      board[17][2] = 1;
      board[18][2] = 1;
      board[15][3] = 1;
      board[16][3] = 1;
      board[17][3] = 1;

      board[23][2] = 1;
      board[24][2] = 1;
      board[23][3] = 1;
      board[25][5] = 1;
      board[26][5] = 1;
      board[26][4] = 1;

      board[27][8] = 1;
      board[30][8] = 1;
      board[26][9] = 1;
      board[26][10] = 1;
      board[26][11] = 1;
      board[27][11] = 1;
      board[28][11] = 1;
      board[29][11] = 1; 
      board[30][10] = 1;
  }else if(currentInit === 2){
    
    for (let i = 0; i < columns; i++) {
      for (let j = 0; j < rows; j++) {
        // Clear the board
        board[i][j] = 0;
        next[i][j] = 0;
      }
    }
      board[0][4] = 1;
      board[0][5] = 1;
      board[35][4] = 1;
      board[35][5] = 1;

      board[10][1] = 1;
      board[11][1] = 1;
      board[10][2] = 1;
      board[11][2] = 1;

      board[35][9] = 1;
      board[35][10] = 1;
      board[35][11] = 1;


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
          //[x+i] [y+j] is to calculate the relative neibours around the current spot
          // use modulo to include the border in the count of neighbors
           let col = (x + i + columns) % columns;
           let row = (y + j + rows) % rows;
           neighbors += board[col][row];
          //neighbors += board[x + i][y + j];
        }
      }

      // A little trick to subtract the current cell's state since
      // we added it in the above loop, delete the cell it self
      neighbors -= board[x][y];
      // Rules of Life
      if (board[x][y] == 1 && neighbors < 2) next[x][y] = 0; // Loneliness die
      else if (board[x][y] == 1 && neighbors > 3)
        next[x][y] = 0; // Overpopulation die
      else if (board[x][y] == 0 && neighbors == 3)
        next[x][y] = 1; // Reproduction birth
      else next[x][y] = board[x][y]; // Stasis stable
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
  frameRate(10);
}
