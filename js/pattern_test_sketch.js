let w,
  columns,
  rows,
  board,
  next,
  generationNum,
  generationNumText,
  initCoorText,
  coordinatesText,
  buttonReset,
  buttonPause,
  buttonSpeed20;
let isPaused = false;
let currentInit = 0;
const totalInit = 3;
let initCoor = [];
const buttonNames = [
  'Test still lifes ',
  'Test oscillators & spaceship',
  'Test border neighbors ',
];
function setup() {
  // Set simulation framerate to 8 to avoid flickering
  frameRate(8);
  createCanvas(720, 400);
  w = 20;
  externalText = createDiv('Texts in this region are made in P5.js');
  externalText.position(width + 100, 100);
  externalText.style('color', 'red');
  // Calculate columns and rows

  initCoorText = createP('Initial pattern coordinates: ');
  initCoorText.position(width + 100, 200);

  generationNumText = createP('Generation:');
  generationNumText.position(width + 100, 370);

  coordinatesText = createP('Coordinates:');
  coordinatesText.position(width + 100, 400);

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

  buttonReset = createButton('Reset');
  buttonReset.position(0, 600);
  buttonReset.mousePressed(clearCanvas);

  buttonPause = createButton('Pause');
  buttonPause.position(90, 600);
  buttonPause.mousePressed(switchPause);

  buttonSpeed20 = createButton('Speed20');
  buttonSpeed20.position(180, 600);
  buttonSpeed20.mousePressed(changeSpeed);
}

/**
 * Change initialized pattern with one button by using modulo.
 */
function toggleInit() {
  currentInit = (currentInit + 1) % buttonNames.length;
  initCoorText.html('');
  generationNumText.html('');
  coordinatesText.html('');
  buttonPause.remove();
  setup(); // Call setup to update the canvas
  

  // Change the button text, the text index is in line with the sequence of the initialized pattern
  const button = document.getElementById('chooseCanvas');
  button.textContent = `${buttonNames[currentInit]}`;
}

function changeSpeed() {
  frameRate(20);
}
/**
 * swtich pause and resume condition
 */
function switchPause() {
  isPaused = !isPaused;
  if(isPaused){
    buttonPause.html('Start');
  } else {
    buttonPause.html('Pause');
  }
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

  initCoorText.html('');
  generationNumText.html('');
  coordinatesText.html('');

  printInitCoor();
  printGeneration();
  printCoordinates();

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
  initCoor = []; // Clear the array
  initCoorText.html(''); // Clear the content of the element
  if (currentInit === 0) {
    //set isPaused false, otherwise if the pattern is paused,
    //the canvas won't show when changing the init pattern.
    //because the draw() is stopped
    isPaused = false;
   

    for (let i = 0; i < columns; i++) {
      for (let j = 0; j < rows; j++) {
        // Clear the board
        board[i][j] = 0;
        next[i][j] = 0;
      }
    }
 // initialize the pattern with still lifes
    const coordinates = [
      [10, 1],
      [11, 1],
      [10, 2],
      [11, 2],
      [15, 1],
      [16, 1],
      [14, 2],
      [15, 3],
      [16, 3],
      [17, 2],
      [21, 1],
      [22, 1],
      [20, 2],
      [23, 2],
      [21, 3],
      [23, 3],
      [22, 4],
      [26, 1],
      [27, 1],
      [26, 2],
      [28, 2],
      [27, 3],
    ];
    for (let i = 0; i < coordinates.length; i++) {
      const [x, y] = coordinates[i];
      board[x][y] = 1;
      initCoor.push(`[${x}, ${y}]`);
    }
    generationNum = 0;

  }
  else if (currentInit === 1) {
  
    isPaused = false;
    clear();
    for (let i = 0; i < columns; i++) {
      for (let j = 0; j < rows; j++) {
        // Clear the board
        board[i][j] = 0;
        next[i][j] = 0;
      }
    }
  //initialize the pattern with oscillarors
    const coordinates = [
      [5, 2],
      [6, 2],
      [7, 2],
      [16, 2],
      [17, 2],
      [18, 2],
      [15, 3],
      [16, 3],
      [17, 3],
      [23, 2],
      [24, 2],
      [23, 3],
      [25, 5],
      [26, 5],
      [26, 4],

      [27, 8],
      [30, 8],
      [26, 9],
      [26, 10],
      [26, 11],
      [27, 11],
      [28, 11],
      [29, 11],
      [30, 10],

    ]

    for (let i = 0; i < coordinates.length; i++) {
      const [x, y] = coordinates[i];
      board[x][y] = 1;
      initCoor.push(`[${x}, ${y}]`);
    }
    generationNum = 0;

   }
  else if (currentInit === 2) {
    isPaused = false;
    for (let i = 0; i < columns; i++) {
      for (let j = 0; j < rows; j++) {
        // Clear the board
        board[i][j] = 0;
        next[i][j] = 0;
      }
    }
    //initialize the pattern with bondary pattern
    const coordinates = [
      [0, 4],
      [0, 5],
      [35, 4],
      [35, 5],
      [10, 1],
      [11, 1],
      [10, 2],
      [11, 2],
      [35, 9],
      [35, 10],
      [35, 11],
    ];

    for (let i = 0; i < coordinates.length; i++) {
      const [x, y] = coordinates[i];
      board[x][y] = 1;
      initCoor.push(`[${x}, ${y}]`);
    }
    generationNum = 0;
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

  generationNum++;
}
function printInitCoor() {
  initCoorText.html(
    'Initial pattern coordinate(0 generation): <br >' + initCoor
  );
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
    return 'Living Cells Coordinates:', livingCells;
  } else {
    return 'No living cells found';
  }
}
/**
 * reset the canvas
 */
function clearCanvas() {
  isPaused = false;
  buttonPause.html('Pause');
  init();
  frameRate(8);
  generationNum = 0;
}
