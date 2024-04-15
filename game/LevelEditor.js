/*let Formulasjs = require("./Formulas.js");
let Classesjs = require("./Classes.js");
let projections = Formulasjs.projections;
let defenceCount = Formulasjs.defenceCount;
let spreadCounter = Formulasjs.spreadCounter;
let turn = Formulasjs.turn;
let euclidianDistance = Formulasjs.euclidianDistance;
let Box = Classesjs.Box;
let Tool = Classesjs.Tool;
let PlaceholderItem = Classesjs.PlaceholderItem;
let Resource = Classesjs.Resource;
let Particle = Classesjs.Particle;
let StatusEffect = Classesjs.StatusEffect;
let Entity = Classesjs.Entity;
let ObjectHitbox = Classesjs.ObjectHitbox;
let BackgroundImage = Classesjs.BackgroundImage;
let Map = Classesjs.Map;
let ShadowRealm = Classesjs.ShadowRealm;
let Interface = Classesjs.Interface;
let InterfaceElement = Classesjs.InterfaceElement;
let InteractivityHitbox = Classesjs.InteractivityHitbox;
let DevKit = Classesjs.DevKit;
*/


class LevelEditor{
	constructor(owner, size = 20) {
		this.owner = owner;
		this.size = size;
		owner.activeLevelEditor = this;
		this.schematic = [];
		this.inputs = [];
		this.blocks = [
			this.basicBlock, this.wall, this.tunnelHorizontal, this.tunnelVertical, this.intersection, this.blackBg, this.entrace, this.ladder, this.floor, this.vent, this.elevator, this.elevButton, this.ventBlock, this.pathfindingPoint, this.door1, this.door2, this.doorTerminal, this.landingPad, this.cellSelector, this.cellBox, this.wiringConnector, this.wiringBreakpoint, this.wire, this.vaultModule, this.waterPort, this.waterTank, this.reactor, this.rock, this.stone
		];
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

	eraser(){
		let a = new Breaker(0, 0, {x1: 0, x2: 0, y1: 0, y2: 0}, 20);
		a.coordinates = immediateApi.getPlayer().mouseBox.coordinates;
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
		let schematic2 = [];
		for (let c in schematic){
			if (schematic[c][schematic[c].length - 1] === 22 || schematic[c][schematic[c].length - 1] === 3 || schematic[c][schematic[c].length - 1] === 2 ||schematic[c][schematic[c].length - 1] === 1 || schematic[c][schematic[c].length - 1] === 7 || schematic[c][schematic[c].length - 1] === 9 || schematic[c][schematic[c].length - 1] === 10 || schematic[c][schematic[c].length - 1] === 11){
				schematic2.push(schematic[c]);
			} else {
				this.selector = this.blocks[schematic[c][schematic[c].length - 1]];
				this.inputs = schematic[c];
				this.doSelected();
			}
		}
		for (let c in schematic2){
			this.selector = this.blocks[schematic2[c][schematic2[c].length - 1]];
			this.inputs = schematic2[c];
			this.doSelected();
		}
		new MainTerminal(2220, 2240, 980, 1020);
		new Cart(900, 3700);
		new VentTerminal(1180, 1260, 840, 920, 3);
		new VentTerminal(2920, 3000, 1420, 1500, 3);
		let a = new ObjectHitbox(2660, 2760, 1400, 1500);
		a.draw = function(){
			draw.oxygenTank(this, baseBackend.supplies.oxygen);
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
		let a = new ObjectHitbox(x * this.size, (x + 2) * this.size, y * this.size, (y + 2) * this.size, false, undefined, undefined, this.owner.map);
		a.draw = function(){
			draw.corner(this);
		}
		this.buffer.push(a);
		this.schematic.push([x, y, 0]);
	}

	wall(x1, y1, x2, y2){
		this.buffer = [];
		this.schematic.push([x1, y1, x2, y2, 1]);
		let direction = Math.abs(x2 - x1) > Math.abs(y2 - y1);
		let side = (x2 > x1 && direction) || (y2 > y1 && !direction);
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
		this.buffer.push(new Floor(x * this.size, (l + 1) * this.size, (y + 2) * this.size, (w - 1) * this.size, this.owner.map));
		this.buffer.push(new WallBlock(x * this.size, (l + 1) * this.size, (w - 1) * this.size, (w + 1) * this.size, false, undefined, undefined, this.owner.map, true, false));
	}

	tunnelVertical(x, y, w, l){
		this.buffer = [];
		this.schematic.push([x, y, w, l, 3]);
		let a = Math.min(x, w);
		w = Math.max(x, w);
		x = a;
		a = Math.min(y, l);
		l = Math.max(y, l);
		y = a;
		this.buffer.push(new WallBlock(x * this.size, (x + 2) * this.size, y * this.size, (l + 1) * this.size, false, undefined, undefined, this.owner.map, false, false));
		this.buffer.push(new Floor((x + 2) * this.size, (w - 1) * this.size, y * this.size, (l + 1) * this.size, this.owner.map));
		this.buffer.push(new WallBlock((w - 1) * this.size, (w + 1) * this.size, y * this.size, (l + 1) * this.size, false, undefined, undefined, this.owner.map, false, true));
	}

	intersection(x1, y1, x2, y2){
		this.buffer = [];
		this.schematic.push([x1, y1, x2, y2, 4]);
		let a = Math.min(x1, x2);
		x2 = Math.max(x1, x2);
		x1 = a;
		a = Math.min(y1, y2);
		y2 = Math.max(y1, y2);
		y1 = a;
		a = new ObjectHitbox(x1 * this.size, (x1 + 2) * this.size, y1 * this.size, (y1 + 2) * this.size, false, undefined, undefined, this.owner.map);
		a.draw = function(){
			draw.corner(this);
		}
		this.buffer.push(a);
		a = new ObjectHitbox((x2 - 1) * this.size, (x2 + 1) * this.size, y1 * this.size, (y1 + 2) * this.size, false, undefined, undefined, this.owner.map);
		a.draw = function(){
			draw.corner(this);
		}
		this.buffer.push(a);
		a = new ObjectHitbox(x1 * this.size, (x1 + 2) * this.size, (y2 - 1) * this.size, (y2 + 1) * this.size, false, undefined, undefined, this.owner.map);
		a.draw = function(){
			draw.corner(this);
		}
		this.buffer.push(a);
		a = new ObjectHitbox((x2 - 1) * this.size, (x2 + 1) * this.size, (y2 - 1) * this.size, (y2 + 1) * this.size, false, undefined, undefined, this.owner.map);
		a.draw = function(){
			draw.corner(this);
		}
		this.buffer.push(a);
		this.buffer.push(new Floor(x1 * this.size, (x2 + 1) * this.size, y1 * this.size, (y2 + 1) * this.size, this.owner.map));
	}

	blackBg(x, y){
		this.buffer = [];
		this.schematic.push([x, y, 5]);
		x *= this.size;
		y *= this.size;
		x = Math.floor(x / this.owner.map.size);
		y = Math.floor(y / this.owner.map.size);
		this.buffer.push(new BackgroundImage(x * this.owner.map.size, (x + 1) * this.owner.map.size, y * this.owner.map.size, (y + 1) * this.owner.map.size, this.owner.map));
	}

	entrace(x1, y1, x2, y2){
		this.buffer = [];
		this.schematic.push([x1, y1, x2, y2, 6]);
		let a = new ObjectHitbox(x1 * this.size, (x1 + 2) * this.size, y1 * this.size, (y1 + 2) * this.size, false, undefined, undefined, this.owner.map);
		a.draw = function(){
			draw.corner(this);
		}
		this.buffer.push(a);
		a = new ObjectHitbox(x2 * this.size, (x2 + 2) * this.size, y2 * this.size, (y2 + 2) * this.size, false, undefined, undefined, this.owner.map);
		a.draw = function(){
			draw.corner(this);
		}
		this.buffer.push(a);
	}

	ladder(x, y, side){
		this.buffer = [];
		this.schematic.push([x, y, side, 7]);
		let a = 0;
		if (side > x){
			a = 1;
		} else {
			a = -1;
		}
		this.buffer.push(new Ladder(x * this.size, (x + 2) * this.size, y * this.size, (y + 2) * this.size, this.owner.map, a, undefined, {x: -60 * a, y: 0}));
	}

	floor(x1, y1, x2, y2){
		this.buffer = [];
		this.schematic.push([x1, y1, x2, y2, 8]);
		let a = Math.min(x1, x2);
		x2 = Math.max(x1, x2);
		x1 = a;
		a = Math.min(y1, y2);
		y2 = Math.max(y1, y2);
		y1 = a;
		a = new Floor(x1 * this.size, (x2 + 1) * this.size, y1 * this.size, (y2 + 1) * this.size, this.owner.map);
	}

	vent(x1, y1, x2, y2){
		this.buffer = [];
		this.schematic.push([x1, y1, x2, y2, 9]);
		let dist = euclidianDistance(x1, y1, x2, y2) > 5;
		let direction = Math.abs(x2 - x1) > Math.abs(y2 - y1);
		this.buffer.push(new VentEntry((x1 - 0.05) * this.size, (x1 + 1.05) * this.size, (y1 - 0.05) * this.size, (y1 + 1.05) * this.size, this.owner.map, undefined, { y: 3000 * dist, x: 3000}, {x: Math.sign(x2 - x1) * direction * 40, y: Math.sign(y2 - y1) * !direction * 40}));
	}

	elevator(x, y){
		this.buffer = [];
		this.schematic.push([x, y, 10]);
		this.buffer.push(new Elevator(x * this.size, (x + 4) * this.size, y * this.size, (y + 4) * this.size, this.owner.map));
	}

	elevButton(x, y){
		this.buffer = [];
		this.schematic.push([x, y, 11]);
		this.buffer.push(new ElevatorButton(x * this.size, (x + 1) * this.size, y * this.size, (y + 1) * this.size, this.owner.map));
	}

	ventBlock(x1, y1, x2, y2){
		this.buffer = [];
		this.schematic.push([x1, y1, x2, y2, 12]);
		let a = Math.min(x1, x2);
		x2 = Math.max(x1, x2);
		x1 = a;
		a = Math.min(y1, y2);
		y2 = Math.max(y1, y2);
		y1 = a;
		a = new ObjectHitbox(x1 * this.size, (x2 + 1) * this.size, y1 * this.size, (y2 + 1) * this.size, false, undefined, undefined, this.owner.map);
		a.draw = function(){
			let scale = 20;
			for (let a = 0; a < (this.hitbox.x2 - this.hitbox.x1) / scale; a++) {
				for (let b = 0; b < (this.hitbox.y2 - this.hitbox.y1) / scale; b++){
					draw.vent2({x: this.x, y: this.y, map: this.map, hitbox: {x1: this.hitbox.x1 + a * scale, x2: this.hitbox.x1 + (a + 1) * scale, y1: this.hitbox.y1 + b * scale, y2: this.hitbox.y1 + (b + 1) * scale}});
				}
			}
		}
		this.buffer.push(a);
	}

	pathfindingPoint(x, y, x2){
		this.buffer = [];
		this.schematic.push([x, y, x2, 13]);
		this.buffer.push(new PathfindingPoint((x + 0.5) * this.size, (y + 0.5) * this.size, x2 - x, this.owner.map));
	}

	door1(x1, y1, x2, y2){
		this.buffer = [];
		this.schematic.push([x1, y1, x2, y2, 14]);
		let a = Math.min(x1, x2);
		x2 = Math.max(x1, x2);
		x1 = a;
		a = Math.min(y1, y2);
		y2 = Math.max(y1, y2);
		y1 = a;
		a = new BaseDoor(x1 * this.size, (x2 + 1) * this.size, y1 * this.size, (y2 + 1) * this.size, this.owner.map);
		this.buffer.push(a);
	}

	door2(x1, y1, x2, y2, x3, y3){
		this.buffer = [];
		this.schematic.push([x1, y1, x2, y2, x3, y3, 15]);
		let a = Math.min(x1, x2);
		x2 = Math.max(x1, x2);
		x1 = a;
		a = Math.min(y1, y2);
		y2 = Math.max(y1, y2);
		y1 = a;
		a = new BaseDoor(x1 * this.size, (x2 + 1) * this.size, y1 * this.size, (y2 + 1) * this.size, this.owner.map, baseBackend, true, x3 * this.size, y3 * this.size);
		this.buffer.push(a);
	}

	doorTerminal(x, y){
		this.schematic.push([x, y, 16]);
		let a = new DoorTerminal(this.buffer[0], x * this.size + 10, y * this.size + 10);
		this.buffer = [];
		this.buffer.push(a);
	}

	landingPad(x1, y1, x2, y2){
		this.buffer = [];
		this.schematic.push([x1, y1, x2, y2, 17]);
		let a = Math.min(x1, x2);
		x2 = Math.max(x1, x2);
		x1 = a;
		a = Math.min(y1, y2);
		y2 = Math.max(y1, y2);
		y1 = a;
		a = new BackgroundImage(x1 * this.size, (x2 + 1) * this.size, y1 * this.size, (y2 + 1) * this.size, this.owner.map);
		a.draw = function(){
			draw.pad1(this);
		}
		this.buffer.push(a);
		a = new ObjectHitbox(x1 * this.size + 30, (x2 + 1) * this.size - 30, y1 * this.size + 30, (y2 + 1) * this.size - 30, true, undefined, undefined, this.owner.map);
		baseBackend.rocket = a;
		a.draw = function(){
			if (!this.fake){
				draw.rocketModule(this);
			}
		}
		this.buffer.push(a);
		a = new CartFiller((x1 + x2) / 2 * this.size, (y2 + 1) * this.size - 30, this.owner.map);
		this.buffer.push(a);
		a = new ObjectHitbox(x1 * this.size, (x2 + 1) * this.size, y1 * this.size + 3000, (y2 + 1) * this.size + 3000, false, undefined, undefined, this.owner.map);
		a.draw = function(){
			if (baseBackend.rocketLanded){
				draw.rocketTop(this);
			} else {
				draw.pad2(this);
			}
		}
		this.buffer.push(a);
	}

	cellSelector(x1, y1, x2){
		this.buffer = [];
		this.schematic.push([x1, y1, x2, 18]);
		this.selectedCell = baseBackend.cells[x2 - x1];
		//console.log("cell number " + (x2 - x1) + " selected");
	}

	cellBox(x1, y1, x2, y2){
		this.buffer = [];
		this.schematic.push([x1, y1, x2, y2, 19]);
		let a = Math.min(x1, x2);
		x2 = Math.max(x1, x2);
		x1 = a;
		a = Math.min(y1, y2);
		y2 = Math.max(y1, y2);
		y1 = a;
		new CellBox(x1 * this.size, (x2 + 1) * this.size, y1 * this.size, (y2 + 1) * this.size, this.selectedCell);
	}

	wiringConnector(x1, y1, x2, y2){
		this.buffer = [];
		this.schematic.push([x1, y1, x2, y2, 20]);
		new WiringConnector((x1 + 0.5) * this.size, (y1 + 0.5) * this.size, (x2 + 0.5) * this.size, (y2 + 0.5) * this.size, this.owner.map);
	}

	wiringBreakpoint(x1, y1, x2, y2){
		this.buffer = [];
		this.schematic.push([x1, y1, x2, y2, 21]);
		let a = new WireBreakpoint(x1 * this.size, y1 * this.size, x2 * this.size, y2 * this.size, this.owner.map);
		this.buffer.push(a);
	}

	wire(x1, y1, x2, y2){
		this.buffer = [];
		this.schematic.push([x1, y1, x2, y2, 22]);
		let a = Math.min(x1, x2);
		x2 = Math.max(x1, x2);
		x1 = a;
		a = Math.min(y1, y2);
		y2 = Math.max(y1, y2);
		y1 = a;
		a = new Wire((x1 + 0.5) * this.size, (x2 + 0.5) * this.size, (y1 + 0.5) * this.size, (y2 + 0.5) * this.size, this.owner.map);
	}

	vaultModule(x1, y1, x2, y2, x3, y3){
		this.buffer = [];
		this.schematic.push([x1, y1, x2, y2, x3, y3, 23]);
		new Vault(x1 * this.size, y1 * this.size, (x2 + 1) * this.size, (y2 + 1) * this.size, (x3 + 1) * this.size, (y3 + 1) * this.size);
		new FoodDispencer((x1 + (x3 + 1)) / 2 * this.size, (y3 + 1) * this.size + 40);
	}

	waterPort(x1, y1, x2, y2){
		this.buffer = [];
		this.schematic.push([x1, y1, x2, y2, 24]);
		let a = Math.min(x1, x2);
		x2 = Math.max(x1, x2);
		x1 = a;
		a = Math.min(y1, y2);
		y2 = Math.max(y1, y2);
		y1 = a;
		a = new ObjectHitbox(x1 * this.size, (x2 + 1) * this.size, y1 * this.size, (y2 + 1) * this.size);
		a.draw = function(){
			draw.O2H2Oport(this);
		}
		new CartFiller((x2 + 1) * this.size, (y1 + y2 + 1) / 2 * this.size, this.owner.map, "waterType");
	}

	waterTank(x1, y1, x2, y2){
		this.buffer = [];
		this.schematic.push([x1, y1, x2, y2, 25]);
		let a = Math.min(x1, x2);
		x2 = Math.max(x1, x2);
		x1 = a;
		a = Math.min(y1, y2);
		y2 = Math.max(y1, y2);
		y1 = a;
		this.buffer.push(new WaterTank(x1 * this.size, y1 * this.size, (x2 + 1) * this.size, (y2 + 1) * this.size));
	}

	reactor(x1, y1, x2, y2){
		this.buffer = [];
		this.schematic.push([x1, y1, x2, y2, 26]);
		let a = Math.min(x1, x2);
		x2 = Math.max(x1, x2);
		x1 = a;
		a = Math.min(y1, y2);
		y2 = Math.max(y1, y2);
		y1 = a;
		a = new ObjectHitbox(x1 * this.size, (x2 + 1) * this.size, y1 * this.size, (y2 + 1) * this.size, undefined, undefined, undefined, this.owner.map);
		a.draw = function(){
			draw.reactor(this);
		}
		this.buffer.push(a);
		new CartFiller((x1 + x2) / 2 * this.size, y1 * this.size, this.owner.map, "reactorType");
	}

	rock(x1, y1, x2, y2){
		this.buffer = [];
		this.schematic.push([x1, y1, x2, y2, 27]);
		let a = Math.min(x1, x2);
		x2 = Math.max(x1, x2);
		x1 = a;
		a = Math.min(y1, y2);
		y2 = Math.max(y1, y2);
		y1 = a;
		a = new Rock(x1 * this.size, (x2 + 1) * this.size, y1 * this.size, (y2 + 1) * this.size, undefined, undefined, undefined, this.owner.map);
		this.buffer.push(a);
	}

	stone(x1, y1, x2, y2){
		this.buffer = [];
		this.schematic.push([x1, y1, x2, y2, 28]);
		let a = Math.min(x1, x2);
		x2 = Math.max(x1, x2);
		x1 = a;
		a = Math.min(y1, y2);
		y2 = Math.max(y1, y2);
		y1 = a;
		a = new Stone(x1 * this.size, (x2 + 1) * this.size, y1 * this.size, (y2 + 1) * this.size, this.owner.map);
		this.buffer.push(a);
	}
}


class GridParticle extends Particle{
	constructor(ent = immediateApi.getPlayer(), scale = 20, bright = false) {
		super(Math.floor(-ent.map.xshift() / scale) * scale, Math.floor(-ent.map.yshift() / scale) * scale, 300, undefined, ent.map);
		this.ent = ent;
		this.bright = bright;
		this.scale = scale;
		console.log(Math.floor(ent.mouseBox.coordinates.x / this.scale) + "  " + Math.floor(ent.mouseBox.coordinates.y / this.scale));
	}

	draw(){
		for (let a = 0; a <= this.ent.map.size * 4 / this.scale; a++){
			for (let b = 0; b < this.bright * 9 + 1; b++){
				draw.grid1(this.coordinates.x + a * this.scale, this.coordinates.y, this.coordinates.y + this.ent.map.size, this.ent.map);
			}
		}
		for (let a = 0; a <= this.ent.map.size * 4 / this.scale; a++){
			for (let b = 0; b < this.bright * 9 + 1; b++){
				draw.grid2(this.coordinates.y + a * this.scale, this.coordinates.x, this.coordinates.x + this.ent.map.size, this.ent.map);
			}
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
				draw.wall1({x: this.x, y: this.y, map: this.map, hitbox: {x1: this.hitbox.x1 + a * scale, x2: this.hitbox.x1 + (a + 1) * scale, y1: this.hitbox.y1 + b * scale * 2, y2: this.hitbox.y1 + (b + 1) * scale * 2}}, this.side);
			}
		}
	}

	draw2(){
		let scale = this.gridScale;
		for (let a = 0; a < (this.hitbox.x2 - this.hitbox.x1) / (scale * 2); a++) {
			for (let b = 0; b < (this.hitbox.y2 - this.hitbox.y1) / scale; b++){
				draw.wall2({x: this.x, y: this.y, map: this.map, hitbox: {x1: this.hitbox.x1 + a * scale * 2, x2: this.hitbox.x1 + (a + 1) * scale * 2, y1: this.hitbox.y1 + b * scale, y2: this.hitbox.y1 + (b + 1) * scale}}, this.side);
			}
		}
	}
}


class Rock extends ObjectHitbox{
	constructor(x1, x2, y1, y2, isFake, x, y, maP, scale = 20){
		super(x1, x2, y1, y2, isFake, x, y, maP);
		this.gridScale = scale;
	}

	draw(){
		let scale = this.gridScale;
		for (let a = 0; a < (this.hitbox.x2 - this.hitbox.x1) / scale; a++) {
			for (let b = 0; b < (this.hitbox.y2 - this.hitbox.y1) / scale; b++){
				draw.object({x: this.x, y: this.y, map: this.map, hitbox: {x1: this.hitbox.x1 + a * scale, x2: this.hitbox.x1 + (a + 1) * scale, y1: this.hitbox.y1 + b * scale, y2: this.hitbox.y1 + (b + 1) * scale}});
			}
		}
	}
}
class Stone extends BackgroundImage{
	constructor(x1, x2, y1, y2, maP, scale = 20){
		super(x1, x2, y1, y2, maP);
		this.gridScale = scale;
	}

	draw(){
		let scale = this.gridScale;
		for (let a = 0; a < (this.hitbox.x2 - this.hitbox.x1) / scale; a++) {
			for (let b = 0; b < (this.hitbox.y2 - this.hitbox.y1) / scale; b++){
				draw.bgObject({x: this.x, y: this.y, map: this.map, hitbox: {x1: this.hitbox.x1 + a * scale, x2: this.hitbox.x1 + (a + 1) * scale, y1: this.hitbox.y1 + b * scale, y2: this.hitbox.y1 + (b + 1) * scale}});
			}
		}
	}
}


class Floor extends BackgroundImage{
	constructor(x1, x2, y1, y2, maP, scale = 20){
		super(x1, x2, y1, y2, maP);
		this.scale = scale;
	}

	draw(){
	let scale = this.scale;
		for (let a = 0; a < (this.hitbox.x2 - this.hitbox.x1) / scale; a++) {
			for (let b = 0; b < (this.hitbox.y2 - this.hitbox.y1) / scale; b++){
				draw.floor({x: this.x, y: this.y, map: this.map, hitbox: {x1: this.hitbox.x1 + a * scale, x2: this.hitbox.x1 + (a + 1) * scale, y1: this.hitbox.y1 + b * scale, y2: this.hitbox.y1 + (b + 1) * scale}});
			}
		}
	}
}


class Ladder extends BackgroundImage{
	constructor(x1, x2, y1, y2, maP = map, side = 1, shift = {x: 0, y: 3000}, shift2 = {x: 60, y: 0}, back = false){
		if (back){
			super(x1 + shift.x, x2 + shift.x, y1 + shift.y, y2 + shift.y, maP);
			this.side = side;
			let a = new Box(this.x, this.y, this.hitbox, undefined, -1000, this.map);
			a.shifter = shift;
			a.shifter2 = shift2;
			a.tickPlaceholderMain = function(){
				if (this.touchSpecific(immediateApi.getPlayer())){
					baseBackend.cart.linked = false;
					baseBackend.cart.block.hitbox = {x1: -15, x2: 15, y1: -15, y2: 15};
					immediateApi.getPlayer().speedMultipliers[2] = 1;
					immediateApi.getPlayer().move(-this.shifter.x - this.shifter2.x, -this.shifter.y - this.shifter2.y);
					if (euclidianDistance(this.coordinates.x, this.coordinates.y, baseBackend.cart.x, baseBackend.cart.y) < 30){
						baseBackend.cart.tp(baseBackend.cart.x + this.shifter2.x, baseBackend.cart.y);
					}
				}
				if (this.touchSpecific(baseBackend.cart)){
					baseBackend.cart.linked = false;
					baseBackend.cart.block.hitbox = {x1: -15, x2: 15, y1: -15, y2: 15};
					immediateApi.getPlayer().speedMultipliers[2] = 1;
					immediateApi.getPlayer().move(-this.shifter.x - this.shifter2.x, -this.shifter.y - this.shifter2.y);
					if (euclidianDistance(this.coordinates.x, this.coordinates.y, baseBackend.cart.x, baseBackend.cart.y) < 40){
						baseBackend.cart.tp(baseBackend.cart.x + this.shifter2.x * 1.5, baseBackend.cart.y);
					}
				}
			}
			return;
		}
		super(x1, x2, y1, y2, maP);
		this.side = side;
		let a = new Box(this.x, this.y, this.hitbox, undefined, -1000, this.map);
		a.shifter = shift;
		a.shifter2 = shift2;
		a.tickPlaceholderMain 
		a.tickPlaceholderMain = function(){
			if (this.touchSpecific(immediateApi.getPlayer())){
				baseBackend.cart.linked = false;
				baseBackend.cart.block.hitbox = {x1: -15, x2: 15, y1: -15, y2: 15};
				immediateApi.getPlayer().speedMultipliers[2] = 1;
				immediateApi.getPlayer().move(this.shifter.x + this.shifter2.x, this.shifter.y + this.shifter2.y);
				if (euclidianDistance(this.coordinates.x, this.coordinates.y, baseBackend.cart.x, baseBackend.cart.y) < 30){
					baseBackend.cart.tp(baseBackend.cart.x - this.shifter2.x, baseBackend.cart.y);
				}
			}
			if (this.touchSpecific(baseBackend.cart)){
				baseBackend.cart.linked = false;
				baseBackend.cart.block.hitbox = {x1: -15, x2: 15, y1: -15, y2: 15};
				immediateApi.getPlayer().speedMultipliers[2] = 1;
				immediateApi.getPlayer().move(this.shifter.x + this.shifter2.x, this.shifter.y + this.shifter2.y);
				if (euclidianDistance(this.coordinates.x, this.coordinates.y, baseBackend.cart.x, baseBackend.cart.y) < 40){
					baseBackend.cart.tp(baseBackend.cart.x - this.shifter2.x * 1.5, baseBackend.cart.y);
				}
			}
		}
		new Ladder(x1, x2, y1, y2, maP, -side, shift, shift2, true);
	}

	draw(){
		draw.ladder(this);
	}
}


class VentEntry extends BackgroundImage{
	constructor(x1, x2, y1, y2, maP = map, side = 1, shift = {x: 3000, y: 3000}, shift2 = {x: 0, y: 60}, back = false){
		if (back){
			super(x1 + shift.x, x2 + shift.x, y1 + shift.y, y2 + shift.y, maP);
			this.isVent = true;
			this.side = side;
			new VentEntryBox(this.x, this.y, this.hitbox, this.map, -1, shift, shift2);
			return;
		}
		super(x1, x2, y1, y2, maP);
		this.isVent = true;
		this.side = side;
		let a = new VentEntryBox(this.x, this.y, this.hitbox, this.map, 1, shift, shift2);
		new VentEntry(x1, x2, y1, y2, maP, -side, shift, shift2, true);
	}

	draw(){
		draw.vent1(this);
	}
}


class VentEntryBox extends Box{
	constructor(x, y, hitbox, maP, mult, shift, shift2){
		super(x, y, hitbox, undefined, -1000, maP);
		this.mult = mult;
		this.timer = 350;
		this.maxTimer = 350;
		this.shifter = shift;
		this.shifter2 = shift2;
	}

	tickPlaceholderMain(){
		if (immediateApi.getPlayer().inventory.mainhand[0].isWrench && this.touchSpecific(immediateApi.getPlayer())){
			this.timer--;
		} else {
			this.timer = this.maxTimer;
		}
		if (this.timer <= 0 && this.touchSpecific(immediateApi.getPlayer())){
			immediateApi.getPlayer().move((this.shifter.x + this.shifter2.x) * this.mult, (this.shifter.y + this.shifter2.y) * this.mult);
			this.timer = this.maxTimer;
		}
	}
}


class Elevator extends BackgroundImage{
	constructor(x1, x2, y1, y2, maP = map, back = false){
		let shift = {x: 0, y: 3000};
		if (back){
			super(x1 + shift.x, x2 + shift.x, y1 + shift.y, y2 + shift.y, maP);
			this.isActive = false;
			this.box = new ElevatorBox(this.x, this.y, this.hitbox, this.map, {x: -shift.x, y: -shift.y});
			return;
		}
		super(x1, x2, y1, y2, maP);
		this.other = new Elevator(x1, x2, y1, y2, maP, true);
		this.other.other = this;
		this.isActive = true;
		this.moving = false; 
		this.box = new ElevatorBox(this.x, this.y, this.hitbox, this.map, shift);
	}

	draw(){
		draw.elevator(this);
	}

	activate(obj){
		obj.isActive = !obj.isActive;
		obj.other.isActive = !obj.other.isActive;
		obj.box.activate(obj.isActive);
		obj.moving = false;
	}
}


class ElevatorBox extends Box{
	constructor(x, y, hitbox, maP, shift){
		super(x, y, hitbox, {type: "generic", amount: 25, iFrame: 200}, -1000, maP);
		this.shifter = shift;
	}

	activate(act){
		if (!act){
			let a = this.touch();
			for (let b = 0; b < a.length; b++){
				a[b].move(this.shifter.x, this.shifter.y);
			}
		} else {
			this.enableDamage(this.touch());
		}
	}

	tickPlaceholderMain(){}
}


class ElevatorButton extends ObjectHitbox{
	constructor(x1, x2, y1, y2, maP){
		super(x1, x2, y1, y2, undefined, undefined, undefined, maP);
		this.interactive = true;
		let a = new Box(this.x, this.y, this.scaledHitbox(2), undefined, 1, maP);
		for (let b in a.contactBackground()){
			if (a.contactBackground()[b].activate != undefined){
				this.connected = a.contactBackground()[b];
			}
		}
	}

	draw(){
		draw.elevButton(this);
	}

	interact(){
		if (!this.connected.moving){
			setTimeout(this.connected.activate, 2000, this.connected);
			this.connected.moving = true;
		}
	}
}


const mainScheme = [[90, 60, 119, 93, 4], [108, 56, 101, 61, 4], [90, 64, 90, 70, 6], [96, 42, 113, 57, 4], [79, 64, 73, 70, 6], [75, 64, 80, 69, 8], [73, 46, 73, 52, 6], [73, 46, 78, 53, 8], [54, 40, 68, 59, 4], [67, 46, 67, 52, 6], [59, 58, 54, 62, 6], [61, 60, 59, 62, 6], [56, 60, 58, 61, 8], [61, 62, 0], [54, 46, 54, 52, 6], [49, 46, 42, 53, 4], [42, 35, 48, 29, 6], [42, 31, 47, 36, 8], [48, 81, 42, 87, 6], [44, 81, 49, 86, 8], [57, 75, 78, 95, 4], [57, 81, 57, 87, 6], [101, 42, 107, 42, 6], [101, 31, 108, 38, 4], [92, 38, 85, 31, 4], [79, 37, 73, 31, 6], [75, 33, 80, 38, 8], [77, 3, 99, 25, 4], [85, 24, 91, 24, 6], [121, 38, 114, 31, 4], [109, 10, 130, 25, 4], [114, 24, 120, 24, 6], [118, 66, 0], [126, 56, 139, 76, 4], [126, 60, 126, 66, 6], [132, 56, 0], [132, 45, 139, 52, 4], [123, 45, 123, 51, 6], [132, 37, 138, 31, 6], [132, 33, 137, 38, 8], [142, 45, 149, 52, 4], [142, 56, 154, 76, 4], [148, 56, 0], [142, 39, 0], [154, 39, 154, 45, 6], [144, 41, 155, 44, 8], [79, 22, 0], [96, 192, 113, 207, 4], [101, 206, 107, 206, 6], [101, 192, 107, 192, 6], [127, 195, 127, 201, 6], [123, 195, 116, 202, 4], [124, 197, 124, 200, 8], [122, 214, 116, 219, 6], [118, 214, 123, 218, 8], [133, 220, 152, 196, 4], [133, 214, 0], [90, 233, 114, 215, 4], [135, 224, 150, 240, 4], [139, 219, 146, 225, 4], [137, 224, 147, 224, 6], [135, 232, 113, 224, 6], [101, 215, 107, 215, 6], [77, 175, 99, 153, 4], [75, 174, 75, 169, 6], [77, 169, 0], [92, 174, 0], [83, 172, 0], [101, 183, 107, 183, 6], [92, 177, 98, 177, 6], [92, 177, 108, 184, 8], [81, 170, 83, 170, 6], [64, 177, 57, 184, 4], [57, 208, 77, 229, 4], [59, 208, 59, 212, 6], [65, 208, 0], [59, 199, 57, 199, 6], [63, 195, 65, 195, 6], [59, 195, 64, 200, 8], [51, 177, 51, 183, 6], [52, 171, 37, 197, 4], [102, 50, 102, 47, 12], [103, 47, 107, 47, 12], [107, 48, 107, 51, 12], [102, 200, 102, 197, 12], [103, 197, 107, 197, 12], [107, 198, 107, 201, 12], [81, 171, 83, 171, 12], [83, 172, 83, 173, 12], [80, 23, 80, 21, 12], [82, 21, 81, 21, 12], [58, 210, 58, 211, 12], [60, 212, 58, 212, 12], [61, 60, 61, 61, 12], [59, 62, 61, 62, 12], [137, 224, 138, 225, 12], [147, 224, 148, 225, 12], [93, 84, 92, 84, 12], [228, 231, 225, 231, 12], [225, 232, 225, 236, 12], [226, 211, 223, 211, 12], [223, 210, 223, 205, 12], [226, 210, 226, 205, 12], [225, 237, 245, 237, 12], [245, 236, 245, 231, 12], [244, 231, 231, 231, 12], [213, 193, 216, 193, 12], [213, 192, 213, 187, 12], [216, 192, 216, 190, 12], [214, 187, 226, 187, 12], [79, 21, 79, 21, 12], [230, 170, 230, 167, 12], [226, 170, 226, 167, 12], [226, 171, 230, 171, 12], [226, 166, 226, 164, 12], [227, 164, 233, 164, 12], [233, 165, 233, 178, 12], [236, 181, 240, 181, 12], [240, 182, 240, 186, 12], [233, 179, 233, 181, 12], [234, 181, 235, 181, 12], [230, 172, 230, 187, 12], [227, 187, 229, 187, 12], [236, 184, 233, 184, 12], [250, 191, 240, 191, 12], [240, 187, 240, 190, 12], [247, 194, 247, 195, 12], [248, 195, 251, 195, 12], [251, 194, 251, 191, 12], [270, 184, 274, 184, 12], [274, 183, 274, 179, 12], [273, 179, 270, 179, 12], [279, 225, 273, 225, 12], [279, 224, 279, 221, 12], [278, 221, 273, 221, 12], [295, 213, 295, 207, 12], [294, 207, 291, 207, 12], [294, 213, 291, 213, 12], [286, 217, 290, 217, 12], [290, 218, 290, 221, 12], [289, 221, 280, 221, 12], [285, 217, 285, 218, 12], [282, 218, 282, 210, 12], [285, 216, 285, 213, 12], [286, 213, 290, 213, 12], [291, 208, 291, 210, 12], [290, 210, 283, 210, 12], [286, 218, 286, 218, 12], [264, 216, 260, 216, 12], [260, 217, 260, 220, 12], [261, 220, 270, 220, 12], [270, 221, 270, 225, 12], [272, 225, 271, 225, 12], [281, 218, 273, 218, 12], [273, 222, 275, 222, 12], [273, 217, 273, 216, 12], [272, 216, 267, 216, 12], [269, 179, 267, 179, 12], [267, 180, 267, 202, 12], [270, 185, 270, 202, 12], [267, 215, 267, 205, 12], [268, 205, 270, 205, 12], [270, 203, 270, 204, 12], [264, 215, 264, 205, 12], [266, 202, 247, 202, 12], [236, 185, 236, 194, 12], [237, 194, 244, 194, 12], [244, 195, 244, 202, 12], [233, 185, 233, 190, 12], [232, 190, 226, 190, 12], [226, 191, 226, 204, 12], [217, 190, 223, 190, 12], [223, 204, 223, 191, 12], [247, 196, 247, 201, 12], [245, 205, 263, 205, 12], [243, 202, 242, 202, 12], [242, 203, 242, 219, 12], [241, 219, 228, 219, 12], [228, 220, 228, 230, 12], [231, 230, 231, 222, 12], [232, 222, 245, 222, 12], [245, 221, 245, 206, 12], [139, 196, 145, 196, 6], [139, 183, 145, 177, 6], [139, 179, 144, 184, 8], [45, 33, 46, 13], [46, 50, 49, 13], [45, 84, 47, 13], [46, 68, 48, 13], [61, 85, 62, 13], [56, 50, 58, 13], [67, 50, 69, 13], [76, 50, 79, 13], [76, 42, 78, 13], [76, 55, 78, 13], [76, 66, 78, 13], [82, 35, 85, 13], [89, 24, 90, 13], [95, 35, 98, 13], [105, 44, 108, 13], [104, 36, 107, 13], [110, 51, 112, 13], [100, 53, 103, 13], [104, 55, 107, 13], [111, 35, 113, 13], [118, 30, 121, 13], [118, 21, 119, 13], [125, 35, 127, 13], [134, 35, 136, 13], [134, 49, 137, 13], [145, 49, 146, 13], [134, 63, 136, 13], [122, 64, 124, 13], [105, 64, 108, 13], [113, 64, 115, 13], [96, 66, 99, 13], [97, 76, 98, 13], [86, 68, 88, 13], [79, 168, 80, 13], [87, 168, 89, 13], [95, 174, 98, 13], [103, 180, 106, 13], [88, 180, 90, 13], [81, 182, 83, 13], [71, 181, 73, 13], [60, 181, 63, 13], [46, 181, 47, 13], [60, 193, 62, 13], [63, 203, 65, 13], [63, 215, 64, 13], [104, 190, 107, 13], [99, 199, 101, 13], [110, 199, 112, 13], [104, 204, 107, 13], [104, 211, 106, 13], [104, 219, 106, 13], [108, 228, 110, 13], [122, 229, 124, 13], [137, 229, 139, 13], [143, 223, 145, 13], [140, 207, 143, 13], [131, 217, 133, 13], [128, 229, 130, 13], [124, 216, 126, 13], [119, 215, 121, 13], [119, 207, 120, 13], [140, 199, 142, 13], [142, 189, 144, 13], [140, 181, 142, 13], [124, 181, 126, 13], [112, 181, 114, 13], [139, 217, 142, 13], [115, 229, 117, 13], [44, 39, 47, 39, 14], [44, 52, 47, 52, 14], [58, 83, 58, 86, 14], [91, 66, 91, 69, 14], [118, 62, 118, 65, 14], [133, 47, 133, 50, 14], [144, 57, 147, 57, 14], [87, 24, 90, 24, 14], [141, 219, 144, 219, 14], [141, 197, 144, 197, 14], [94, 178, 97, 178, 14], [59, 183, 62, 183, 14], [103, 206, 106, 206, 14], [103, 193, 106, 193, 14], [43, 34, 42, 31, 44, 30, 15], [74, 48, 73, 51, 74, 44, 15], [70, 51, 16], [103, 43, 106, 42, 102, 40, 15], [103, 57, 106, 56, 106, 58, 15], [142, 47, 143, 50, 140, 46, 15], [147, 48, 16], [118, 215, 121, 214, 117, 217, 15], [117, 211, 16], [92, 179, 93, 182, 96, 182, 15], [88, 178, 16], [51, 179, 52, 182, 50, 175, 15], [116, 31, 119, 32, 112, 32, 15], [115, 28, 16], [116, 24, 119, 24, 14], [129, 15, 130, 20, 128, 12, 15], [83, 7, 92, 16, 17], [98, 44, 98, 18], [98, 44, 111, 55, 19], [103, 38, 104, 18], [103, 37, 106, 41, 19], [87, 25, 89, 29, 19], [90, 25, 90, 29, 19], [87, 30, 89, 32, 19], [90, 30, 90, 32, 19], [89, 33, 75, 36, 19], [90, 33, 119, 36, 19], [120, 33, 137, 36, 19], [134, 37, 137, 59, 19], [128, 58, 133, 59, 19], [128, 60, 137, 74, 19], [119, 62, 127, 65, 19], [138, 47, 141, 50, 19], [75, 37, 78, 59, 19], [75, 60, 78, 69, 19], [79, 66, 90, 69, 19], [104, 62, 106, 18], [103, 58, 106, 59, 19], [92, 60, 117, 89, 19], [92, 90, 117, 91, 19], [44, 44, 47, 18], [44, 40, 47, 51, 19], [48, 48, 55, 51, 19], [56, 42, 59, 57, 19], [56, 58, 58, 59, 19], [56, 60, 58, 61, 19], [60, 42, 66, 57, 19], [67, 48, 72, 51, 19], [61, 210, 75, 227, 19], [59, 214, 59, 227, 19], [60, 214, 60, 227, 19], [60, 184, 64, 209, 19], [59, 184, 59, 198, 19], [44, 53, 48, 18], [44, 53, 47, 59, 19], [44, 60, 47, 86, 19], [48, 83, 57, 86, 19], [59, 81, 64, 18], [59, 77, 59, 89, 19], [59, 90, 59, 93, 19], [60, 90, 76, 93, 19], [60, 77, 76, 89, 19], [36, 42, 42, 18], [44, 31, 47, 38, 19], [120, 54, 127, 18], [153, 41, 150, 44, 19], [149, 41, 144, 44, 19], [144, 45, 147, 56, 19], [154, 41, 155, 44, 150, 40, 15], [143, 63, 151, 18], [144, 58, 149, 59, 19], [150, 58, 152, 59, 19], [150, 60, 152, 74, 19], [144, 60, 149, 74, 19], [79, 17, 88, 18], [77, 170, 80, 173, 19], [79, 155, 89, 169, 19], [85, 170, 89, 173, 19], [90, 155, 97, 173, 19], [94, 174, 97, 177, 19], [79, 17, 89, 20, 19], [83, 21, 89, 23, 19], [90, 17, 97, 23, 19], [93, 5, 97, 16, 19], [79, 5, 82, 16, 19], [100, 30, 110, 18], [116, 30, 119, 30, 19], [116, 25, 119, 29, 19], [103, 20, 114, 18], [111, 12, 119, 23, 19], [120, 12, 128, 23, 19], [120, 49, 132, 18], [127, 47, 132, 50, 19], [118, 197, 119, 200, 19], [120, 197, 124, 200, 19], [120, 201, 121, 209, 19], [118, 210, 119, 213, 19], [120, 210, 121, 213, 19], [90, 199, 103, 18], [98, 194, 101, 205, 19], [108, 194, 111, 205, 19], [102, 202, 107, 205, 19], [102, 194, 107, 196, 19], [90, 204, 104, 18], [103, 207, 106, 209, 19], [103, 210, 106, 216, 19], [92, 217, 112, 231, 19], [113, 226, 119, 231, 19], [120, 226, 136, 231, 19], [137, 226, 148, 238, 19], [141, 220, 144, 225, 19], [127, 218, 142, 18], [118, 216, 119, 218, 19], [120, 216, 134, 218, 19], [135, 198, 149, 209, 19], [135, 210, 149, 218, 19], [150, 210, 150, 218, 19], [150, 198, 150, 209, 19], [126, 191, 142, 18], [141, 180, 144, 196, 19], [120, 180, 140, 182, 19], [120, 179, 144, 179, 19], [94, 179, 119, 179, 19], [94, 180, 119, 182, 19], [103, 183, 106, 192, 19], [68, 182, 86, 18], [90, 180, 91, 182, 19], [89, 179, 60, 179, 19], [60, 180, 89, 182, 19], [53, 179, 59, 179, 19], [53, 180, 59, 182, 19], [34, 190, 51, 18], [39, 173, 50, 179, 19], [39, 180, 50, 195, 19], [85, 58, 104, 18], [30, 30, 41, 35, 19], [29, 30, 16, 35, 19], [131, 13, 149, 22, 19], [150, 22, 163, 13, 19], [156, 39, 179, 46, 19], [104, 63, 104, 54, 20], [93, 69, 70, 82, 20], [61, 79, 45, 69, 20], [45, 56, 59, 50, 20], [115, 68, 146, 64, 20], [99, 200, 99, 50, 20], [109, 203, 138, 211, 20], [99, 195, 98, 180, 20], [96, 180, 95, 176, 20], [93, 20, 118, 20, 20], [118, 20, 118, 27, 20], [54, 50, 46, 35, 20], [148, 61, 145, 46, 20], [81, 64, 89, 71, 2], [80, 63, 73, 54, 3], [72, 46, 69, 53, 2], [53, 46, 50, 53, 2], [42, 45, 49, 37, 3], [49, 80, 42, 54, 3], [50, 81, 56, 88, 2], [101, 39, 108, 41, 3], [93, 31, 100, 38, 2], [73, 45, 80, 39, 3], [81, 31, 84, 38, 2], [85, 26, 92, 30, 3], [109, 31, 113, 38, 2], [114, 26, 121, 30, 3], [120, 60, 125, 67, 2], [125, 45, 131, 52, 2], [132, 53, 139, 55, 3], [132, 39, 139, 44, 3], [122, 31, 131, 38, 2], [140, 45, 141, 52, 2], [142, 53, 149, 55, 3], [116, 203, 123, 213, 3], [124, 220, 132, 214, 2], [115, 233, 134, 224, 2], [101, 208, 108, 214, 3], [101, 185, 108, 191, 3], [92, 176, 99, 176, 3], [100, 177, 100, 184, 2], [91, 177, 65, 184, 2], [57, 185, 64, 194, 3], [66, 207, 59, 201, 3], [56, 177, 53, 184, 2], [139, 185, 146, 195, 3], [138, 177, 109, 184, 2], [101, 59, 102, 58, 1], [108, 58, 107, 59, 1], [92, 60, 100, 61, 1], [109, 60, 117, 61, 1], [117, 92, 92, 93, 1], [90, 63, 91, 62, 1], [90, 91, 91, 72, 1], [100, 56, 98, 57, 1], [96, 55, 97, 44, 1], [111, 56, 109, 57, 1], [73, 69, 74, 64, 1], [80, 70, 75, 71, 1], [79, 46, 80, 53, 1], [67, 42, 68, 45, 1], [67, 54, 68, 57, 1], [56, 40, 66, 41, 1], [66, 58, 61, 59, 1], [58, 62, 56, 63, 1], [55, 61, 54, 60, 1], [54, 45, 55, 42, 1], [54, 57, 55, 54, 1], [42, 51, 43, 48, 1], [48, 31, 49, 36, 1], [42, 29, 47, 30, 1], [42, 86, 43, 81, 1], [49, 87, 44, 88, 1], [57, 80, 58, 77, 1], [59, 76, 76, 75, 1], [77, 77, 78, 93, 1], [76, 94, 59, 95, 1], [58, 93, 57, 89, 1], [98, 42, 100, 43, 1], [109, 42, 111, 43, 1], [103, 31, 106, 32, 1], [90, 37, 87, 38, 1], [73, 38, 74, 33, 1], [75, 31, 80, 32, 1], [84, 25, 79, 24, 1], [97, 24, 93, 25, 1], [78, 23, 77, 5, 1], [79, 4, 97, 3, 1], [98, 5, 99, 23, 1], [119, 37, 116, 38, 1], [112, 44, 113, 55, 1], [113, 25, 111, 24, 1], [109, 23, 110, 12, 1], [111, 11, 128, 10, 1], [128, 24, 122, 25, 1], [129, 12, 130, 14, 1], [130, 21, 129, 23, 1], [118, 68, 119, 91, 1], [126, 59, 127, 58, 1], [126, 74, 127, 68, 1], [137, 75, 128, 76, 1], [139, 58, 138, 74, 1], [128, 56, 131, 57, 1], [123, 50, 124, 47, 1], [139, 33, 138, 38, 1], [132, 31, 137, 32, 1], [142, 74, 143, 58, 1], [153, 58, 154, 74, 1], [152, 75, 144, 76, 1], [150, 57, 152, 56, 1], [149, 47, 148, 50, 1], [142, 44, 143, 41, 1], [153, 45, 150, 46, 1], [144, 39, 153, 40, 1], [97, 205, 96, 194, 1], [112, 194, 113, 205, 1], [100, 206, 98, 207, 1], [111, 206, 109, 207, 1], [98, 193, 100, 192, 1], [109, 193, 111, 192, 1], [127, 197, 128, 200, 1], [124, 196, 126, 195, 1], [126, 201, 124, 202, 1], [117, 200, 116, 197, 1], [116, 218, 117, 214, 1], [123, 219, 118, 220, 1], [118, 196, 121, 195, 1], [134, 213, 133, 198, 1], [112, 232, 92, 233, 1], [91, 231, 90, 217, 1], [140, 223, 139, 221, 1], [145, 221, 146, 223, 1], [138, 219, 135, 220, 1], [150, 219, 147, 220, 1], [149, 226, 150, 238, 1], [148, 239, 137, 240, 1], [136, 238, 135, 234, 1], [113, 217, 114, 223, 1], [109, 216, 112, 215, 1], [92, 216, 100, 215, 1], [151, 198, 152, 218, 1], [76, 173, 75, 171, 1], [78, 168, 77, 155, 1], [91, 174, 79, 175, 1], [98, 155, 99, 173, 1], [79, 154, 97, 153, 1], [101, 177, 108, 178, 1], [99, 183, 92, 184, 1], [58, 227, 57, 210, 1], [75, 228, 59, 229, 1], [76, 210, 77, 227, 1], [67, 209, 75, 208, 1], [65, 197, 66, 200, 1], [57, 198, 58, 195, 1], [59, 177, 62, 178, 1], [52, 185, 51, 195, 1], [50, 196, 39, 197, 1], [38, 195, 37, 173, 1], [39, 172, 50, 171, 1], [51, 173, 52, 176, 1], [145, 179, 146, 184, 1], [139, 178, 144, 177, 1], [135, 197, 138, 196, 1], [147, 197, 150, 196, 1], [59, 60, 58, 7], [125, 47, 126, 7], [125, 49, 126, 7], [64, 42, 64, 33, 9], [76, 84, 85, 84, 9], [94, 84, 84, 84, 9], [128, 74, 120, 74, 9], [144, 60, 135, 60, 9], [122, 33, 122, 25, 9], [98, 44, 98, 37, 9], [79, 20, 72, 20, 9], [81, 22, 89, 7], [103, 48, 10], [102, 51, 11], [102, 201, 11], [39, 195, 36, 195, 9], [75, 210, 75, 207, 9], [88, 182, 88, 184, 9], [138, 218, 138, 221, 9], [112, 217, 114, 217, 9], [92, 84, 77, 84, 22], [77, 84, 77, 76, 22], [77, 76, 58, 76, 22], [58, 76, 58, 82, 22], [58, 82, 48, 82, 22], [48, 82, 48, 52, 22], [48, 47, 48, 30, 22], [48, 30, 43, 30, 22], [48, 47, 55, 47, 22], [55, 47, 55, 41, 22], [55, 41, 61, 41, 22], [107, 61, 107, 56, 22], [107, 56, 112, 56, 22], [112, 56, 112, 50, 22], [112, 200, 112, 193, 22], [112, 193, 107, 193, 22], [102, 193, 102, 183, 22], [102, 178, 98, 178, 22], [98, 178, 98, 173, 22], [118, 72, 126, 72, 22], [139, 72, 143, 72, 22], [143, 72, 143, 57, 22], [148, 57, 148, 45, 22], [148, 45, 154, 45, 22], [117, 215, 114, 215, 22], [112, 207, 112, 200, 22], [117, 215, 117, 219, 22], [117, 219, 140, 219, 22], [145, 219, 151, 219, 22], [151, 219, 151, 207, 22], [96, 20, 115, 20, 20], [117, 20, 118, 28, 20], [115, 31, 115, 24, 22], [115, 24, 98, 24, 22], [115, 27, 117, 27, 21], [112, 24, 112, 22, 21], [51, 47, 51, 49, 21], [48, 43, 46, 43, 21], [48, 46, 46, 46, 21], [48, 35, 46, 35, 21], [48, 58, 46, 58, 21], [48, 65, 46, 65, 21], [48, 68, 46, 68, 21], [48, 78, 46, 78, 21], [52, 82, 52, 84, 21], [77, 81, 73, 81, 21], [61, 41, 67, 41, 22], [67, 41, 67, 47, 22], [67, 47, 73, 47, 22], [143, 72, 145, 72, 21], [143, 62, 146, 62, 21], [148, 52, 146, 52, 21], [148, 54, 146, 54, 21], [120, 219, 120, 217, 21], [126, 219, 126, 217, 21], [131, 219, 131, 217, 21], [151, 218, 148, 216, 21], [102, 190, 104, 190, 21], [102, 183, 104, 181, 21], [102, 186, 104, 186, 21], [98, 174, 95, 174, 21], [46, 178, 94, 169, 20], [93, 174, 51, 174, 22], [39, 173, 46, 176, 40, 184, 23], [135, 213, 137, 215, 24], [141, 231, 148, 238, 25], [98, 70, 112, 84, 26], [41, 29, 17, 30, 27], [41, 35, 28, 36, 27], [27, 36, 17, 37, 27], [16, 29, 14, 36, 27], [41, 30, 30, 35, 28], [29, 30, 16, 35, 28], [156, 39, 176, 40, 27], [156, 45, 176, 46, 27], [177, 39, 182, 40, 27], [177, 45, 182, 46, 27], [156, 41, 179, 44, 28], [180, 41, 182, 44, 28], [183, 39, 184, 46, 27], [131, 21, 149, 22, 27], [150, 21, 165, 22, 27], [164, 15, 165, 20, 27], [165, 13, 150, 14, 27], [149, 13, 131, 14, 27], [131, 14, 149, 21, 28], [150, 14, 163, 21, 28]];


/*module.exports.LevelEditor = LevelEditor;
module.exports.GridParticle = GridParticle;
module.exports.WallBlock = WallBlock;
module.exports.Rock = Rock;
module.exports.Stone = Stone;
module.exports.Floor = Floor;
module.exports.Ladder = Ladder;
module.exports.VentEntry = VentEntry;
module.exports.VentEntryBox = VentEntryBox;
module.exports.Elevator = Elevator;
module.exports.ElevatorBox = ElevatorBox;
module.exports.ElevatorButton = ElevatorButton;
module.exports.mainScheme = mainScheme;*/
//export {LevelEditor, GridParticle, WallBlock, Rock, Stone, Floor, Ladder, VentEntry, VentEntryBox, Elevator, ElevatorBox, ElevatorButton, mainScheme};