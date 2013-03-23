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
	var playerX = player.x;
	var playerY = player.y;
	var messages = [
		'FPS: ' + game.fps,
		'player.facing: ' + player.facing,
		'player.gold: ' + player.gold,
		'Map Name: ' + maps[currentMap].name,
		'game.state: ' + game.state,
		'player.colliding: ' + player.colliding
	];
	var bgHeight = 30;
	var lineHeight = 25;
	var windowWidth = 220;
	for(var i = 0; i < messages.length; i++){
		bgHeight += lineHeight;
	}
	
	var sc = screen.canvas;
	
	//Background
	sc.fillStyle = "rgba(0,0,0,0.5)"
	sc.fillRect(60,60,windowWidth,bgHeight);
	sc.fillStyle = "rgba(0,0,128,0.7)";
	sc.fillRect(50,50,windowWidth,bgHeight);
	sc.strokeStyle = "white";
	sc.lineWidth = 3;
	sc.strokeRect(50,50,windowWidth,bgHeight);
	
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
	screen.tileHeight = screen.element.height / tile.size / screen.zoom;
	screen.canvas.webkitImageSmoothingEnabled = false;
	
	tile.zoomSize = tile.size * screen.zoom; // Setting values for zoom to work
	tile.align = tile.zoomSize / 2
	
	screen.render();
};
screen.render = function(){
	// Draw the levels of the map and after level 1 draw the player then the rest of the map above the player
	for(var i = 0; i < maps[currentMap].level.length; i++){
		maps[currentMap].draw(i);
		if(i == 1){
			player.draw();
		}
	}
	
	//drawGrid();
	drawInfo();
	
	if(game.state == "message"){
		message.draw();
	}
};
screen.erase = function(){
	screen.canvas.clearRect(0,0,screen.element.width,screen.element.height);
};

// Tile
var tile = {};
tile.size = 32;
tile.zoomSize;
tile.align;
var Tile = function(image,event){
	this.image = image;
	this.event = event;
};
tile.selected;

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
	sprite.load("maptiles.png"), // Has signs bushes and other misc objects
	sprite.load("chests.png")
];
sprite.image = function(type, cropX, cropY, width, height, sheet, level){
	this.type = type;
	this.cropX = cropX;
	this.cropY = cropY;
	this.width = width;
	this.height = height;
	this.sheet = sheet;
	this.level = level; // This is what level the sprite will be drawn on 
	this.timeline = 0;
};
sprite.images = [
	new sprite.image("air", 0, 0, 0, 0, 0, 0), // 0
	new sprite.image("grass",3,0,40,40,0,0), // 1
	new sprite.image("bush",4,6,32,32,2,1), 	// 2
	new sprite.image("oak",6,4,32,32,2,2), 	// 3 Oak Tree Top Left  1/4	3  4 
	new sprite.image("oak",7,4,32,32,2,2), 	// 4 Oak Tree Top Right 1/4 	5  6
	new sprite.image("oak",6,5,32,32,2,1), 	// 5 Oak Tree Bot Left  1/4	 ||
	new sprite.image("oak",7,5,32,32,2,1), 	// 6 Oak Tree Bot Right 1/4
	new sprite.image("Open Barrel",14,1,32,32,2,1), 	// 7 Open Barrel
	new sprite.image("Sign",1,5,32,32,2,1), 	// 8 Sign
	new sprite.image("Road center",1,1,40,40,0,0), 	// 9 Center of road
	new sprite.image("Road left side",0,1,40,40,0,0), 	// 10 left side of road
	new sprite.image("Road Right side",2,1,40,40,0,0), 	// 11 right side of road
	new sprite.image("Road Top Left",0,0,40,40,0,0), 	// 12 top right side of road
	new sprite.image("Road Top center",1,0,40,40,0,0), 	// 13 top right center of the road
	new sprite.image("Road Top right",2,0,40,40,0,0), 	// 14 
	new sprite.image("crate chest 1",6,4,32,32,3,1),	// 15 
	new sprite.image("crate chest 2",6,4,32,32,3,1) 	// 16
	
];

// Chests
var chest = {};
chest.open = function(){
	if(tile.selected.image.timeline == 10){
		sounds["chest"].play();
	}
	if(tile.selected.image.timeline > 10 && tile.selected.image.timeline < 20){
		tile.selected.image.cropY = 5;
	} else if(tile.selected.image.timeline > 20 && tile.selected.image.timeline < 30) {
		tile.selected.image.cropY = 6;
	} else if(tile.selected.image.timeline > 40 && tile.selected.image.timeline < 50){
		tile.selected.image.cropY = 7;
	}
	tile.selected.image.timeline++;
	if(tile.selected.image.timeline >= 60){
		message.output(['You find 10GP.']);
		player.gold += 10;
	}
};
chest.Crate = function(){
	return new sprite.image("crate chest 2",6,4,32,32,3,1);
};

// Map
var currentMap = 4;
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
	this.draw = function(layer){
		var alignX = screen.tileWidth * tile.zoomSize / 2 - tile.zoomSize;
		var alignY = screen.tileHeight * tile.zoomSize / 2 - tile.zoomSize;
		for(y = 0; y < this.level[layer].length; y++ ){ // Tile Rows
			for(x = 0; x < this.level[layer][y].length; x++){ // Tiles
				if(this.level[layer][y][x].image.type != 'air'){
					var currentTile = this.level[layer][y][x];
					screen.canvas.drawImage(
						sprite.sheet[currentTile.image.sheet],
						currentTile.image.cropX * currentTile.image.width,
						currentTile.image.cropY * currentTile.image.height,
						currentTile.image.width,
						currentTile.image.height,
						x * tile.zoomSize + tile.align + player.x * -tile.zoomSize + alignX,
						y * tile.zoomSize + tile.align + player.y * -tile.zoomSize + alignY,
						tile.zoomSize,
						tile.zoomSize
					);
				}
			}
		}
	};
	this.getBlock = function(x,y,z){
		return this.level[z][Math.round(y)][Math.round(x)];
	}
};

// Events
function Event(){ 
	this.graphic;
	this.switch = false;
	this.commands;
}
var events = [];

var changeGold = function(amount){
	return player.gold += amount;
}

// Message Window
var message = {};
message.output = function(messageArray){
	game.state = "message";   
	currentMessage = messageArray;
};
message.draw = function(){
	var windowHeight = 25;
	var lineHeight = 25;
	for(var i = 0; i < currentMessage.length; i++){
		windowHeight += lineHeight;
	}
	
	var sc = screen.canvas;
	
	var screenWidth = screen.element.width;
	var screenHeight = screen.element.height;
	var windowWidth = 600;
	
	var bgX = screenWidth / 2 - windowWidth / 2 + 10;
	var bgY = 50 + 10;
	var windowX = screenWidth / 2 - windowWidth / 2;
	var windowY = 50;
	
	//Background
	sc.fillStyle = "rgba(0,0,0,0.5)"
	sc.fillRect(bgX,bgY,windowWidth,windowHeight);
	sc.fillStyle = "rgba(0,0,128,0.7)";
	sc.fillRect(windowX,windowY,windowWidth,windowHeight);
	sc.strokeStyle = "white";
	sc.lineWidth = 3;
	sc.strokeRect(windowX,windowY,windowWidth,windowHeight);
	
	//Text
	sc.font = "20px Arial";
	sc.fillStyle = "white";
	var x = windowX + 20;
	var y = windowY + 30;
	function output(currentMessage){
		sc.fillText(currentMessage , x, y);
		y += lineHeight;
	}
	for(var i = 0; i < currentMessage.length; i++){
		output(currentMessage[i]);
	}
};
var currentMessage = [];

// Items
function Item(name){
	this.name = name;
}

// Sounds
function Sound(src){
	var sound = document.createElement('audio');
	sound.setAttribute('src', 'audio/sound effects/' + src);
	return sound;
}
var sounds = [];
sounds['chest'] = new Sound('chest.wav');

// Player
var player = {
	width: tile.size,
	height: tile.size,
	x: 0,
	y: 0,
	speed: 1,
	cropX: 32,
	cropY: 0,
	timeline: 0,
	facing: "down",
	gold: 0,
	state: "standing"
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
	
	var topLeftX = Math.floor(player.x); 
	var topLeftY = Math.floor(player.y); 
	var topRightX = Math.ceil(player.x); 
	var topRightY = Math.floor(player.y); 
	var botLeftX = Math.floor(player.x); 
	var botLeftY = Math.ceil(player.y); 
	var botRightX = Math.ceil(player.x); 
	var botRightY = Math.ceil(player.y); 
	
	var topLeftBlock = maps[currentMap].getBlock(topLeftX,topLeftY,1);
	var topRightBlock = maps[currentMap].getBlock(topRightX,topRightY,1);
	var botLeftBlock = maps[currentMap].getBlock(botLeftX,botLeftY,1);
	var botRightBlock = maps[currentMap].getBlock(botRightX,botRightY,1);
	
	function collision(){
		if(topLeftBlock.image.level == 1 || topRightBlock.image.level == 1 || botLeftBlock.image.level == 1 || botRightBlock.image.level == 1){
			player.colliding = true;
			return true; 
		} else {
			player.colliding = false;
			return false;
		}
	}
	
	var speed = player.speed * screen.zoom / tile.zoomSize;
	
	function disableControls(){
		player.state = "collision";
		player.keyDown[65] = false;
		player.keyDown[37] = false;
		player.keyDown[87] = false;
		player.keyDown[38] = false;
		player.keyDown[68] = false;
		player.keyDown[39] = false;
		player.keyDown[83] = false;
		player.keyDown[40] = false;
	}
	switch(player.lastKeyPressed){
		case 65:
		case 37: // Left
			if(collision()){
				disableControls();
				player.stop(37); 
				player.x += speed;
			}
			break;
		case 87:
		case 38: // Up
			if(collision()){ 
				disableControls();
				player.stop(38); 
				player.y += speed;
			}
			break;
		case 68:
		case 39: // Right
			if(collision()){
				disableControls();
				player.stop(39); 
				player.x -= speed;
			}
			break;
		case 83:
		case 40: // Down
			if(collision()){ 
				disableControls();
				player.stop(40); 
				player.y -= speed;
			}
			break;
		default:
			break;
	}
};
player.colliding = false;
player.position = function(){
	var speed = player.speed * screen.zoom / tile.zoomSize; // Modifying player.speed to work with the screen.zoom
	function walk(dir){
		player.facing = dir;
		player.state = "walking";
		switch(dir){
			case 'left':
				if(player.x > 0){
					player.animation.walking(1);
					player.x -= speed;
				} else {
					player.stop(37);
				}
				break;
			case 'up':
				if(player.y > 0){
					player.animation.walking(3);
					player.y -= speed;
				} else {
					player.stop(38);
				}
				break;
			case 'right':
				if(player.x < maps[currentMap].width - 1) {
					player.animation.walking(2);
					player.x += speed;
				} else {
					player.stop(39);
				}
				break;
			case 'down':
				if(player.y < maps[currentMap].height - 1) {
					player.animation.walking(0);
					player.y += speed;
				} else {
					player.stop(40);
				}
				break;
		}
	}
	switch(true){
		case player.keyDown[65]:
		case player.keyDown[37]: // Move Left 
			walk('left');
			break;
		case player.keyDown[87]:
		case player.keyDown[38]: // Move Up
			walk('up');
			break;
		case player.keyDown[68]:
		case player.keyDown[39]: // Move Right
			walk('right');
			break;
		case player.keyDown[83]:
		case player.keyDown[40]: // Move Down		
			walk('down');
			break;
		default: // If no key is pressed stop
			player.stop(player.lastKeyPressed);
			break;
	}
};
player.keyHandler = function(e){
	// Movement Controls
	if( // Only set keys to true that we use for the game so there is no wasted memory.
		e.keyCode == 37 || 	// Left Arrow
		e.keyCode == 38 || 	// Up Arrow
		e.keyCode == 39 || 	// Right Arrow
		e.keyCode == 40 ||	// Down Arrow
		e.keyCode == 65 || 	// a
		e.keyCode == 87 ||	// w
		e.keyCode == 68 ||	// d
		e.keyCode == 83	// s
		) 
	{
		if(player.colliding == false){
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
		case 32: // Spacebar
			if(game.state == "message"){
				game.state = "map";
				//player.confirm();
			} else {
				player.use();
			}
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
		case 65:
		case 37:
			player.frame(32,32);
			break;
		case 87:
		case 38:
			player.frame(32,32 * 3);
			break;
		case 68:
		case 39:
			player.frame(32,32*2);
			break;
		case 83:
		case 40:
			player.frame(32,0);
			break;
	}
	player.state = "standing";
};
player.use = function(){
	switch(player.facing){
		case "left":
			var useX = Math.ceil(player.x - 1);
			var useY = Math.round(player.y);			
			break;
		case "up":
			var useX = Math.round(player.x);
			var useY = Math.ceil(player.y - 1);
			break;
		case "right":
			var useX = Math.floor(player.x + 1);
			var useY = Math.round(player.y);
			break;
		case "down":
			var useX = Math.round(player.x);
			var useY = Math.floor(player.y + 1);
			break;
	}
	tile.selected = maps[currentMap].getBlock(useX,useY,1);
	if(tile.selected.event && tile.selected.event.switch == false){
		tile.selected.event.commands();
	}
};

// Enemy
var enemy = {};
enemy.encounter = function(){
	var chance = Math.random() * 100 * tile.zoomSize;
	if(chance < 33){
		log('Enemy Encouter');
	}
};

// Game
var game = {
	state: "loading"
};
game.load = function(){ // Don't forget to debug in here so the message is displayed once
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
	player.facing = maps[currentMap].facing;
	player.x = maps[currentMap].spawnX;
	player.y = maps[currentMap].spawnY;
	switch(player.facing){
		case "left":
			player.facing = "left";
			break;
		case "up":
			player.facing = "up";
			break;
		case "right":
			player.facing = "right";
			break;
		case "down":
			player.facing = "down";
			break;
	}
	
	// Adjust screen to fit window
	screen.adjust(); 
	
	game.state = "map";
};
var temp = 0;
game.update = function(){
	switch(game.state){
		case "map":
			player.position();
			player.collision();
			if(player.state == 'walking'){
				enemy.encounter();
			}
			break;
		case "message":
			break;
		case "chest opening":
			chest.open();
			break;
	}
}
game.fps;
game.time = Date.now();
game.loop = function(){
	// FPS
	var now = Date.now();
	game.fps = Math.round(1000 / (now - game.time));
	game.time = now;
	
	game.update();
	screen.erase();
	screen.render();	
};
game.pause = false;

// Listeners
addEventListener('keydown', player.keyHandler, false);
addEventListener('keyup', function(e){
	player.keyDown[e.keyCode] = false;
},false);
window.onload = game.load;
window.onresize = screen.adjust;

// Main Game Loop
setInterval(game.loop,1000 / 59);