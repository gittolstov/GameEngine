class LevelEditor {
	constructor(owner, size = 20) {
		this.owner = owner;
		this.size = size;
		owner.activeLevelEditor = this;
		this.schematic = [];
		this.inputs = [];
		this.blocks = [this.basicBlock, this.wall, this.tunnelHorizontal, this.tunnelVertical];
		this.selector = this.blocks[0];
		this.selectorNum = 0;
		this.buffer = [];
	}

	ctrlz(){
		for (let a in this.buffer){
			this.buffer[a].remove();
		}
		this.buffer = [];
		this.schematic.splice(this.schematic.length - 1, 1);
	}

	erazer(){
		let a = new Breaker(0, 0, {x1: 0, x2: 0, y1: 0, y2: 0}, 20);
		a.coordinates = player.mouseBox.coordinates;
	}
	
	doSelected(){
		for (let a = 0; a < 6; a++){
			this.inputs.push(1);
		}
		this.selector(this.inputs[0], this.inputs[1], this.inputs[2], this.inputs[3], this.inputs[4], this.inputs[5]);
		this.inputs = [];
	}

	circleSelector(){
		if (this.selectorNum < this.blocks.length - 1){
			this.selectorNum++;
		} else {
			this.selectorNum = 0;
		}
		this.selector = this.blocks[this.selectorNum];
		console.log(this.selector);
	}

	clearInputs(){
		this.inputs = [];
		console.log("cleared inputs");
	}

	logInput(xy){
		this.inputs.push(Math.floor(xy.x / this.size));
		this.inputs.push(Math.floor(xy.y / this.size));
	}

	placeSchematic(schematic){
		for (let c in schematic){
			this.selector = this.blocks[schematic[c][schematic[c].length - 1]];
			this.inputs = schematic[c];
			this.doSelected();
		}
	}
	
	logSchematic(){
		let log = "[";
		for (let a in this.schematic){
			log += "[";
			for (let b in this.schematic[a]){
				log = log + this.schematic[a][b];
				if (b < this.schematic[a].length - 1) {
					log += ", ";
				}
			}
			log += "]";
			if (a < this.schematic.length - 1) {
				log += ", ";
			}
		}
		log += "];";
		console.log(log);
		console.log(this.schematic);
	}

	basicBlock(x, y){
		this.buffer = [];
		this.buffer.push(new WallBlock(x * this.size, (x + 1) * this.size, y * this.size, (y + 1) * this.size, false, undefined, undefined, this.owner.map));
		this.schematic.push([x, y, 0]);
	}

	wall(x1, y1, x2, y2){
		this.buffer = [];
		this.schematic.push([x1, y1, x2, y2, 1]);
		let direction = Math.abs(x2 - x1) > Math.abs(y2 - y1);
		let side = (x2 > x1 && direction) || (y2 > y1 && !direction) 
		let a = Math.min(x1, x2);
		x2 = Math.max(x1, x2);
		x1 = a;
		a = Math.min(y1, y2);
		y2 = Math.max(y1, y2);
		y1 = a;
		this.buffer.push(new WallBlock(x1 * this.size, (x2 + 1) * this.size, y1 * this.size, (y2 + 1) * this.size, false, undefined, undefined, this.owner.map, direction, side));
	}

	tunnelHorizontal(x, y, l, w){
		this.buffer = [];
		this.schematic.push([x, y, l, w, 2]);
		let a = Math.min(x, l);
		l = Math.max(x, l);
		x = a;
		a = Math.min(y, w);
		w = Math.max(y, w);
		y = a;
		this.buffer.push(new WallBlock(x * this.size, (l + 1) * this.size, y * this.size, (y + 2) * this.size, false, undefined, undefined, this.owner.map, true, true));
		this.buffer.push(new WallBlock(x * this.size, (l + 1) * this.size, (w - 1) * this.size, (w + 1) * this.size, false, undefined, undefined, this.owner.map, true, false));
	}

	tunnelVertical(x, y, w, l){
		this.buffer = [];
		this.schematic.push([x, y, l, w, 3]);
		let a = Math.min(x, w);
		w = Math.max(x, w);
		x = a;
		a = Math.min(y, l);
		l = Math.max(y, l);
		y = a;
		this.buffer.push(new WallBlock(x * this.size, (x + 2) * this.size, y * this.size, (l + 1) * this.size, false, undefined, undefined, this.owner.map, false, true));
		this.buffer.push(new WallBlock((w - 1) * this.size, (w + 1) * this.size, y * this.size, (l + 1) * this.size, false, undefined, undefined, this.owner.map, false, false));
	}
}


class GridParticle extends Particle {
	constructor(ent = player, scale = 20) {
		super(Math.floor(-ent.map.xshift() / scale) * scale, Math.floor(-ent.map.yshift() / scale) * scale, 100, undefined, ent.map);
		this.ent = ent;
		this.scale = scale;
	}

	draw(){
		for (let a = 0; a <= this.ent.map.size / this.scale; a++){
			draw.grid1(this.coordinates.x + a * this.scale, this.coordinates.y, this.coordinates.y + this.ent.map.size, this.ent.map);
		}
		for (let a = 0; a <= this.ent.map.size / this.scale; a++){
			draw.grid2(this.coordinates.y + a * this.scale, this.coordinates.x, this.coordinates.x + this.ent.map.size, this.ent.map);
		}	
	}
}

class WallBlock extends ObjectHitbox{
	constructor(x1, x2, y1, y2, isFake, x, y, maP, direction, side, scale = 20){
		super(x1, x2, y1, y2, isFake, x, y, maP);
		this.side = side;
		if (direction) {
			this.draw = this.draw1;
		} else {
			this.draw = this.draw2;
		}
		this.gridScale = scale;
	}

	draw1(){
		let scale = this.gridScale;
		for (let a = 0; a < (this.hitbox.x2 - this.hitbox.x1) / scale; a++) {
			for (let b = 0; b < (this.hitbox.y2 - this.hitbox.y1) / (scale * 2); b++){
				draw.object({x: this.x, y: this.y, map: this.map, hitbox: {x1: this.hitbox.x1 + a * scale, x2: this.hitbox.x1 + (a + 1) * scale, y1: this.hitbox.y1 + b * scale * 2, y2: this.hitbox.y1 + (b + 1) * scale * 2}});
			}
		}
	}

	draw2(){
		let scale = this.gridScale;
		for (let a = 0; a < (this.hitbox.x2 - this.hitbox.x1) / (scale * 2); a++) {
			for (let b = 0; b < (this.hitbox.y2 - this.hitbox.y1) / scale; b++){
				draw.object({x: this.x, y: this.y, map: this.map, hitbox: {x1: this.hitbox.x1 + a * scale * 2, x2: this.hitbox.x1 + (a + 1) * scale * 2, y1: this.hitbox.y1 + b * scale, y2: this.hitbox.y1 + (b + 1) * scale}});
			}
		}
	}
}