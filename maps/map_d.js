// Map events
events[1] = new Event(); 
events[1].commands = function(){
	message.output(
		[
		'Welcome to Map D Town.',
		'To the east is grass.',
		'To the west is also grass',
		'And if you travel south you will see our grass.',
		'But to the north watch out for the grass!'
		]
	);
}; 

// maps stores the new map
var mapId = maps.length;
maps[mapId] = new Map('Map D',4,5,"up");
maps[mapId].level = [
	[ // Layer 0
		[new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false)],
		[new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false)],
		[new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false)],
		[new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false)],
		[new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false)],
		[new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false)],
		[new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false)],
		[new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false)],
		[new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false),new Tile(sprite.images[1],false)]
	],[ // Layer 1
		[new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false)],
		[new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false)],
		[new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false)],
		[new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false)],
		[new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[8],events[1]), new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false)],
		[new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false)],
		[new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false)],
		[new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false)],
		[new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false),new Tile(sprite.images[0],false)]
	]
];