function setup() {
  createCanvas(1200, 600);
}


function draw() {
	background(220);
	//For (var BEGIN; END; INTERVAL){
	//DO SOMETHING }
	for (var i = 0; i < width; i += width / 80) {
		for (var j = 0; j < height; j += height / 40) {
			stroke(0);
			strokeWeight(1);
			line(i, 0, i, height);
			line(0, j, width, j);
		}
	}
}