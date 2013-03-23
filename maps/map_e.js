// Map events
events[3] = new Event(); 
events[3].commands = function(){
	game.state = "chest opening";
	this.switch = true;
}; 

// maps stores the new map
var mapId = maps.length;
maps[mapId] = new Map('Map E',4,5,"down");
maps[mapId].level = [
	[ // Layer 0
		[new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[12],false),new Tile(sprite.images[13],false),new Tile(sprite.images[14],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false)],
		[new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[10],false),new Tile(sprite.images[9],false),new Tile(sprite.images[11],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false)],
		[new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[10],false),new Tile(sprite.images[9],false),new Tile(sprite.images[11],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false)],
		[new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[10],false),new Tile(sprite.images[9],false),new Tile(sprite.images[11],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false)],
		[new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[10],false),new Tile(sprite.images[9],false),new Tile(sprite.images[11],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false)],
		[new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[10],false),new Tile(sprite.images[9],false),new Tile(sprite.images[11],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false)],
		[new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[10],false),new Tile(sprite.images[9],false),new Tile(sprite.images[11],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false)],
		[new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[10],false),new Tile(sprite.images[9],false),new Tile(sprite.images[11],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false)],
		[new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[10],false),new Tile(sprite.images[9],false),new Tile(sprite.images[11],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false)]
	],[ // Layer 1
		[new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false)],
		[new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(new chest.Crate(),events[3]),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false)],
		[new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false)],
		[new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false)],
		[new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false), new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false)],
		[new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false)],
		[new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false)],
		[new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false)],
		[new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false)]
	]
];