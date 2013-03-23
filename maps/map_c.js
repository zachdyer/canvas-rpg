// Map Events
events[0] =  new Event();
events[0].commands = function(){
	changeGold(10);
	message.output(["You found 10gp!"]);
	this.switch = true;
}

// maps stores the new map
var mapId = maps.length;
maps[mapId] = new Map('Map C',4,5,"up");
maps[mapId].level = [
	[ // Layer 0
		[new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false)],
		[new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false)],
		[new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false)],
		[new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false)],
		[new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false)],
		[new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false)],
		[new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false)],
		[new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false)],
		[new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false)]
	],[ // Layer 1
		[new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false)],
		[new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false)],
		[new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false)],
		[new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false)],
		[new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[7],events[0]), new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false)],
		[new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false)],
		[new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false)],
		[new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false)],
		[new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false)]
	]
];