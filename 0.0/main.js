

// Output
function log(output) {
	console.log(output);
}

// A useful function for aligning the game and I'll keep it for future use
function drawGrid(){
	var sc = screen.canvas;
	sc.beginPath();
	for(var j = 0; j < screen.tileHeight; j++){
		sc.moveTo(0, j * tile.zoomSize + tile.align);
		sc.lineTo(screen.element.width, j * tile.zoomSize + tile.align); // draw horizontal lines
		for(var i = 0; i < screen.tileWidth; i++){
			// The algorithm for a tile based map is in the nested for loop. i or j * tile.size * screen.zoom + x or y alignment
			// This algorithm supports zoom.
			sc.moveTo(i * tile.zoomSize + tile.align, 0);
			sc.lineTo(i * tile.zoomSize + tile.align, screen.element.height); // draw vertical lines
		}
	}
	sc.strokeStyle = "red";
	sc.lineWidth = 1;
	sc.stroke();
}

function drawInfo(){
	// Messages in an array so I can get the height of the bg box in advance
	var playerX = Math.round(player.x);
	var playerY = Math.round(player.y);
	var messages = [
		'player.x: ' + playerX,
		'player.y: ' + playerY,
		'FPS: ' + game.fps,
		'Map Name: ' + maps[currentMap].name
	];
	var bgHeight = 30;
	var lineHeight = 25;
	for(var i = 0; i < messages.length; i++){
		bgHeight += lineHeight;
	}
	
	var sc = screen.canvas;
	
	//Background
	sc.fillStyle = "rgba(0,0,0,0.7)";
	sc.fillRect(50,50,300,bgHeight);
	sc.strokeStyle = "red";
	sc.lineWidth = 1;
	sc.strokeRect(50,50,300,bgHeight);
	
	//Text
	sc.font = "20px Arial";
	sc.fillStyle = "white";
	var x = 70;
	var y = 80;
	function output(message){
		sc.fillText(message , x, y);
		y += lineHeight;
	}
	for(var i = 0; i < messages.length; i++){
		output(messages[i]);
	}
}

var screen = {};
screen.element = document.getElementById("screen");
screen.canvas = screen.element.getContext("2d");
screen.element.width = window.innerWidth;
screen.element.height = window.innerHeight;
screen.zoom = 2;
screen.adjust = function(){
	screen.element.width = window.innerWidth;
	screen.element.height = window.innerHeight;
	screen.tileWidth = screen.element.width / tile.size / screen.zoom;
	/*if(screen.tileWidth % 2 != 0){ // If number of tile width on screen is odd then it adds 1 to make it even so it can be divided evenly in half
		screen.tileWidth++;
	}*/
	screen.tileHeight = screen.element.height / tile.size / screen.zoom;
	//if(screen.tileHeight % 2 != 0){
		//screen.tileHeight++;
	//}
	screen.canvas.webkitImageSmoothingEnabled = false;
	
	tile.zoomSize = tile.size * screen.zoom; // Setting values for zoom to work
	tile.align = tile.zoomSize / 2
	
	screen.render();
};
screen.render = function(){
	maps[currentMap].draw();
	player.draw();	
	//drawGrid();
	drawInfo();
};
screen.erase = function(){
	screen.canvas.clearRect(0,0,screen.element.width,screen.element.height);
};

var tile = {};
tile.size = 32;
tile.zoomSize;
tile.align;

// Sprites
var sprite = {};
sprite.load = function(file){
	var spriteSheet = new Image();
	spriteSheet.src = "images/" + file;
	return spriteSheet;
};
sprite.sheet = [
	sprite.load("grass.png"), // Has gras and cobble path
	sprite.load("actors.png"), // Has several NPC's
	sprite.load("maptiles.png") // Has signs bushes and other misc objects
];
sprite.image = function(type, cropX, cropY, width, height, sheet, solid){
	this.type = type;
	this.cropX = cropX;
	this.cropY = cropY;
	this.width = width;
	this.height = height;
	this.sheet = sheet;
	this.solid = solid;
};
sprite.images = [
	new sprite.image("air", 0, 0, 0, 0, 0, false), // 0
	new sprite.image("grass",3,0,40,40,0,false), // 1
	new sprite.image("bush",4,6,32,32,2,true), 	// 2
	new sprite.image("oak",6,4,32,32,2,true), 	// 3 Oak Tree Top Left  1/4	3  4 
	new sprite.image("oak",7,4,32,32,2,true), 	// 4 Oak Tree Top Right 1/4 	5  6
	new sprite.image("oak",6,5,32,32,2,true), 	// 5 Oak Tree Bot Left  1/4	 ||
	new sprite.image("oak",7,5,32,32,2,true) 	// 6 Oak Tree Bot Right 1/4
];

var currentMap = 1;
var maps = []; // Stores the maps
var Map = function(name,spawnX,spawnY,facing){
	this.name = name;
	this.spawnX = spawnX;
	this.spawnY = spawnY;
	this.facing = facing;
	this.sprites = [];
	this.level = [];
	this.width;
	this.height;
	this.draw = function(){
		var alignX = screen.tileWidth * tile.zoomSize / 2 - tile.zoomSize;
		var alignY = screen.tileHeight * tile.zoomSize / 2 - tile.zoomSize;
		for(var z = 0; z < this.level.length; z++){ // Layers
			for(y = 0; y < this.level[z].length; y++ ){ // Tile Rows
				for(x = 0; x < this.level[z][y].length; x++){ // Tiles
					if(this.level[z][y][x].type != 'air'){
						var currentTile = this.level[z][y][x];
						screen.canvas.drawImage(
							sprite.sheet[currentTile.sheet],
							currentTile.cropX * currentTile.width,
							currentTile.cropY * currentTile.height,
							currentTile.width,
							currentTile.height,
							x * tile.zoomSize + tile.align + player.x * -tile.zoomSize + alignX,
							y * tile.zoomSize + tile.align + player.y * -tile.zoomSize + alignY,
							tile.zoomSize,
							tile.zoomSize
						);
					}
				}
			}
		}
	};
	this.getBlock = function(x,y,z){
		return this.level[z][y][x];
	}
};

var player = {
	width: tile.size,
	height: tile.size,
	x: 0,
	y: 0,
	speed: 1,
	cropX: 32,
	cropY: 0,
	timeline: 0,
	facing: "down"
};
player.frame = function(x,y){
	player.cropX = x;
	player.cropY = y;
};
player.animation = {};
player.animation.walking = function(row){
	var standX = 32;
	var standY = 32 * row;
	var leftX = 0;
	var leftY = 32 * row;
	var rightX = 32 * 2;
	var rightY = 32 * row;
	
	player.timeline++;
	
	if(player.timeline < 15 && player.timeline > 0){
		player.frame(standX,standY);
	} else if (player.timeline < 30 && player.timeline >= 15){
		player.frame(leftX,leftY);
	} else if (player.timeline < 45 && player.timeline >= 30){
		player.frame(standX,standY);
	} else if (player.timeline < 60 && player.timeline >= 45){
		player.frame(rightX, rightY);
	} else {
		player.timeline = 0;
	}
};
player.draw = function(){
	var cropWidth = tile.size;
	var cropHeight = tile.size;
	var alignX = tile.zoomSize / 2; // Change register to center point of player
	var alignY = tile.zoomSize / 2; // Change register to center point of player
	var playerX = screen.tileWidth / 2 * tile.zoomSize - alignX;
	var playerY = screen.tileHeight / 2 * tile.zoomSize - alignY;
	screen.canvas.drawImage(
		sprite.sheet[1], 
		player.cropX, 
		player.cropY, 
		cropWidth, 
		cropHeight,
		playerX,
		playerY, 
		tile.zoomSize, 
		tile.zoomSize
	);
};
player.collision = function(){
			var speed = player.speed * screen.zoom / tile.zoomSize;
			switch(player.lastKeyPressed){
				case 37: // Left
					var currentBlock = maps[currentMap].getBlock(Math.floor(player.x),Math.round(player.y),1);
					if(currentBlock.solid){ 
						player.stop(37); 
						player.x += speed;
					}
					break;
				case 38: // Up
					var currentBlock = maps[currentMap].getBlock(Math.round(player.x),Math.floor(player.y),1);
					if(currentBlock.solid){ 
						player.stop(38); 
						player.y += speed;
					}
					break;
				case 39: // Right
					var currentBlock = maps[currentMap].getBlock(Math.ceil(player.x),Math.round(player.y),1);
					if(currentBlock.solid){
						player.stop(39); 
						player.x -= speed;
					}
					break;
				case 40: // Down
					var currentBlock = maps[currentMap].getBlock(Math.round(player.x),Math.ceil(player.y),1);
					if(currentBlock.solid){ 
						player.stop(40); 
						player.y -= speed;
					}
					break;
			}
};
player.position = function(){
	var speed = player.speed * screen.zoom / tile.zoomSize;
		switch(true){
			case player.keyDown[37]: // Move Left 
				if(player.x > 0 ){
					player.animation.walking(1);
					player.x -= speed;
				} else {
					player.frame(32,32);
				}
				break;
			
			case player.keyDown[38] && player.keyDown[39] == false: // Move Up
				if(player.y > 0){
					player.animation.walking(3);
					player.y -= speed;
				} else {
					player.frame(32,32 * 3);
				}
				break;
			case player.keyDown[39]: // Move Right
				if(player.x < maps[currentMap].width - 1){
					player.animation.walking(2);
					player.x += speed;
				} else {
					player.frame(32,32*2);	
				}
				break;
			case player.keyDown[40]: // Move Down		
				if(player.y < maps[currentMap].height - 1){
					player.animation.walking(0);
					player.y += speed;
				} else {
					player.frame(32,0);
				}
				break;
		}
	
};
player.keyHandler = function(e){
	// Movement Controls
	if( // Only set keys to true that we use for the game so there is no wasted memory.
		e.keyCode == 37 || // Left Arrow
		e.keyCode == 38 || // Up Arrow
		e.keyCode == 39 || // Right Arrow
		e.keyCode == 40 // Down Arrow
	) {
		if(player.keyDown[37] == false && player.keyDown[38] == false && player.keyDown[39] == false && player.keyDown[40] == false){
			player.keyDown[e.keyCode] = true;
			player.lastKeyPressed = e.keyCode;
		}
	}
	
	// Other single button commands
	switch(e.keyCode){
		case 187:
			screen.zoom += 1;
			screen.adjust();
			break;
		case 189:
			if(screen.zoom > 1){
				screen.zoom -= 1;
				screen.adjust();
			}
			break;
		case 49: // 1 
			currentMap = 0;
			game.load();
			break;
		case 50: // 2
			currentMap = 1;
			game.load();
			break;
	}
};
player.keyDown = {
	37: false, 	// left
	38: false,	// Up
	39: false, 	// Right
	40: false 	// Down
};
player.lastKeyPressed = 0;
player.stop = function(keycode){
	switch(keycode){
		case 37:
			player.frame(32,32);
			break;
		case 38:
			player.frame(32,32 * 3);
			break;
		case 39:
			player.frame(32,32*2);
			break;
		case 40:
			player.frame(32,0);
			break;
	}
};
addEventListener('keydown', player.keyHandler, false);
addEventListener('keyup', function(e){
	player.keyDown[e.keyCode] = false;
	player.stop(e.keyCode);
},false);

var game = {};
game.load = function(){
	// Wait for images to Load
	var imageCount = 0;
	for(var i = 0; i < sprite.sheet.length; i++){
		sprite.sheet[i].onload = function(){
			imageCount++;
			if(imageCount == sprite.sheet.length){
				screen.render();
			}
		};
	}
	
	// Load Map
	maps[currentMap].width = maps[currentMap].level[0][0].length; //Current Map width
	maps[currentMap].height = maps[currentMap].level[0].length; // Current Map height
	
	// Spawn Player
	player.x = maps[currentMap].spawnX;
	player.y = maps[currentMap].spawnY;
	switch(maps[currentMap].facing){
		case "left":
			player.stop(37);
			break;
		case "up":
			player.stop(38);
			break;
		case "right":
			player.stop(39);
			break;
		case "down":
			player.stop(40);
			break;
			
	}
	
	// Adjust screen to fit window
	screen.adjust(); 
};
game.update = function(){
	player.position();
	player.collision();
}
game.fps;
game.time = Date.now();
game.loop = function(){
	// FPS
	var now = Date.now();
	game.fps = Math.round(1000 / (now - game.time));
	
	game.update();
	screen.erase();
	screen.render();	
	
	game.time = now;
};

window.onload = game.load;

window.onresize = screen.adjust;

setInterval(game.loop,1000 / 59);