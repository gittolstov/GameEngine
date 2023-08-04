class BaseBackend{
	constructor(maP = map){
		this.map = maP;
		this.cells = [];
		this.heavyDoors = [];
		this.wayPoints = [];
		this.rocketLanded = false;
		setTimeout(() => {
			setInterval(() => {
				this.findPlayer();
			}, this.map.framerate * 50);
		}, 10);
		for (let a = 0; a < 19; a++){
			new Cell(this);
		}
	}

	activateWaypoints(){
		for (let a in this.wayPoints){
			this.wayPoints[a].find();
		}
		for (let a in this.cells){
			this.cells[a].defineBoundary();
		}
	}

	findPlayer(){
		let closest = undefined;
		let dis = 10000;
		for (let b = 0; b < this.wayPoints.length; b++){
			this.wayPoints[b].distance = 100;
		}
		for (let b = 0; b < this.wayPoints.length; b++){
			if (this.wayPoints[b] === undefined){continue}
			if (euclidianDistance(player.x, player.y, this.wayPoints[b].x, this.wayPoints[b].y) <= dis){
				closest = this.wayPoints[b];
				dis = euclidianDistance(player.x, player.y, this.wayPoints[b].x, this.wayPoints[b].y);
			}
		}
		closest.signal(0);
		let inSight = [];
		for (let b = 0; b < this.wayPoints.length; b++){
			if (this.wayPoints[b].distance < 3){
				inSight.push(this.wayPoints[b]);
			}
		}
		for (let b = 0; b < this.wayPoints.length; b++){
			this.wayPoints[b].distance = 100;
		}
		for (let b = 0; b < inSight.length; b++){
			if (raycast(inSight[b], 8, player)){
				inSight[b].signal(0);
			}
		}
	}

	locateClosest(ent){
		let closest = player;
		let dis = 10000;
		for (let b = 0; b < this.wayPoints.length; b++){
			if (this.wayPoints[b] === undefined){continue}
			if (euclidianDistance(ent.x, ent.y, this.wayPoints[b].x, this.wayPoints[b].y) <= dis && raycast(ent, 8, this.wayPoints[b])){
				closest = this.wayPoints[b];
				dis = euclidianDistance(ent.x, ent.y, this.wayPoints[b].x, this.wayPoints[b].y);
			}
		}
		return closest;
	}

	landRocket(){
		this.rocketLanded = true;
		this.rocket.fake = false;
	}
	launchRocket(){
		this.rocketLanded = false;
		this.rocket.fake = true;
	}
}


class PathfindingPoint extends Entity{
	constructor(x, y, connections, maP){
		super(x, y, -1000, 10000, {x1: 50, x2: -50, y1: 50, y2: -50}, maP);
		this.baseBackend = baseBackend;
		this.isTechnical = true;
		this.distance = 100;
		this.pointsId = this.baseBackend.wayPoints.push(this) - 1;
		this.connections = [];
		this.connum = connections;
	}

	draw(){
		/*draw.entity(this);
		for (let a = 0; a < this.connections.length; a++){
			draw.can.beginPath();
			draw.can.moveTo(this.x + this.map.xshift(), this.y + this.map.yshift());
			draw.can.lineTo(this.connections[a].x + this.map.xshift(), this.connections[a].y + this.map.yshift());
			draw.can.stroke();
		}
		draw.can.fillRect(this.x + this.map.xshift(), this.y + this.map.yshift(), 15, this.distance * 5 + 1);*/
	}

	find(){
		let wayPoints = [...this.baseBackend.wayPoints];
		wayPoints[this.pointsId] = undefined;
		for (let a = 0; a < this.connum; a++){
			let dis = 100000;
			let num = 0;
			let closest = undefined;
			for (let b = 0; b < wayPoints.length; b++){
				if (wayPoints[b] === undefined){continue}
				if (euclidianDistance(this.x, this.y, wayPoints[b].x, wayPoints[b].y) <= dis){
					closest = wayPoints[b];
					num = b;
					dis = euclidianDistance(this.x, this.y, wayPoints[b].x, wayPoints[b].y);
				}
			}
			this.connections[a] = closest;
			wayPoints[num] = undefined;
		}
	}

	signal(strength){
		this.signalStrength = strength;
		if (this.signalStrength < this.distance){
			this.distance = this.signalStrength;
			for (let a = 0; a < this.connections.length && this.signalStrength < 15; a++){
				this.connections[a].signal(strength + 1);
			}
		}
	}
}


class Cell{
	constructor(backend = baseBackend){
		this.status = 0;
		this.boundary = {x1: 100000, y1: 100000, x2: 0, y2: 0}
		this.hitboxes = [];
		this.entrys = [];
		this.vents = [];
		this.mechanisms = [];
		this.backend = backend;
		this.id = this.backend.cells.push(this) - 1;
	}

	defineBoundary(){
		for (let c in this.hitboxes){
			let box = this.hitboxes[c].getBorders();
			if (box[0] < this.boundary.x1){
				this.boundary.x1 = box[0]
			}
			if (box[1] > this.boundary.x2){
				this.boundary.x2 = box[1]
			}
			if (box[2] < this.boundary.y1){
				this.boundary.y1 = box[2]
			}
			if (box[3] > this.boundary.y2){	
				this.boundary.y2 = box[3]
			}
		}
	}

	highlight(){
		for (let a in this.hitboxes){
			this.hitboxes[a].highlight();
		}
	}

	spawnEnemy(){
		let b = new Grunt(this.boundary.x1, this.boundary.y1);
		b.allowSpawn = false;
		for (let d = 0; d < 100 && !(b.overlap(0, 0) && b.allowSpawn); d++){
			b.tp(this.boundary.x1 + Math.floor(Math.random() * (this.boundary.x2 - this.boundary.x1) * 10) / 10, this.boundary.y1 + Math.floor(Math.random() * (this.boundary.y2 - this.boundary.y1) * 10) / 10);
			b.reloadEntityZone();
			b.allowSpawn = false;
			for (let c in this.hitboxes){
				this.hitboxes[c].allowSpawn();
			}
		}
	}
}


class CellBox extends Box{
	constructor(x1, x2, y1, y2, cell){
		let x = (x1 + x2) / 2;
		let y = (y1 + y2) / 2;
		super(x, y, {x1: x1 - x, x2: x2 - x, y1: y1 - y, y2: y2 - y, additional: []}, undefined, -1000, cell.backend.map);
		this.cell = cell;
		cell.hitboxes.push(this);
	}

	highlight(){
		this.draw = this.draw2;
	}

	draw2(){
		draw.placeholderHitbox(this);
	}

	tickPlaceholderMain(){}

	allowSpawn(){
		let a = this.touch();
		for (let b in a){
			if (a[b].glyphid){
				a[b].allowSpawn = true;
			}
		}
	}

	getBorders(){
		return [this.coordinates.x + this.hitbox.x1, this.coordinates.x + this.hitbox.x2, this.coordinates.y + this.hitbox.y1, this.coordinates.y + this.hitbox.y2];
	}
}


class BaseDoor extends ObjectHitbox{
	constructor(x1, x2, y1, y2, maP, base = baseBackend, isHeavy = false, terminalX, terminalY){
		super(x1, x2, y1, y2, undefined, undefined, undefined, maP);
		let direction = Math.abs(x2 - x1) > Math.abs(y2 - y1);
		this.direction = direction;
		this.isHeavy = isHeavy;
		this.powered = true;
		this.isOpen = false;
		this.isLocked = false;
		this.isBlocked = false;
		this.moving = false;
		this.stage = 20;
		this.entities = [];
		new DoorEntity((x1 + x2) / 2 + (x2 - x1) * 2 * !direction, (y1 + y2) / 2 + (y2 - y1) * 2 * direction, maP, this);
		new DoorEntity((x1 + x2) / 2 - (x2 - x1) * 2 * !direction, (y1 + y2) / 2 - (y2 - y1) * 2 * direction, maP, this);
		if (isHeavy){
			this.cooldown = 2000;
			this.spawnHeavyDoorTerminal(terminalX + 10, terminalY + 10);
			base.heavyDoors.push(this);
		} else {
			this.cooldown = 200;
			this.interactive = true;
		}
	}

	draw(){
		draw.door(this);
		//console.log(this.stage);
	}

	interact(){
		if (!this.moving){
			if (this.fake){
				this.close();
			} else {
				this.open();
			}
		}
	}

	spawnHeavyDoorTerminal(x, y){
		this.interactive = false;
		this.terminal = new DoorTerminal(this, x, y);
	}

	moveTick(obj, dir = undefined){
		if (dir !== undefined){
			obj.dir = dir
		}
		if (obj.stage === obj.dir){
			return;
		}
		obj.stage += Math.sign(obj.dir - obj.stage);
		setTimeout(obj.moveTick, obj.map.framerate, obj);
	}

	open(){
		this.moving = true;
		this.isOpen = true;
		setTimeout((obj) => {obj.fake = true; obj.moveTick(obj, 0); obj.moving = false}, this.cooldown, this);
	}

	close(){
		this.moving = true;
		this.isOpen = false;
		setTimeout((obj) => {obj.fake = false; new PushOutBox(20, this, 4); obj.moveTick(obj, 20); obj.moving = false}, this.cooldown, this);
	}

	lock(){
		this.isLocked = true;
		this.close();
	}

	block(){
		this.isBlocked = true;
		this.close();
	}

	unlock(){
		this.isLocked = false;
	}
}


class DoorTerminal extends ObjectHitbox{
	constructor(connected, x, y){
		super(x, x + 20, y, y + 20, undefined, undefined, undefined, connected.map);
		this.bound = connected;
		this.interactive = true;
		this.interface = new DoorInterface(this);
	}

	draw(){
		draw.doorTerminal(this);
	}

	interact(ent){
		if (!ent.activeInterfaces[2]){
			ent.activeInterfaces[2] = true;
            this.intId = ent.map.activeInterfaces.push(this.interface) - 1;
            player.speedMultipliers[0] = 0;
		} else {
			ent.activeInterfaces[2] = false;
			ent.map.activeInterfaces[this.intId] = undefined;
			player.speedMultipliers[0] = 1;
		}
	}

	leverSwitch(){
		if (!this.bound.isLocked && !this.bound.isBlocked && this.bound.powered){
			this.bound.interact();
		}
	}

	block(){
		this.bound.block();
	}
}


class DoorInterface extends Interface{
	constructor(terminal){
		super(150, 450, 225, 375);
		this.terminal = terminal;
		this.lever = new InterfaceElement(this, 180, 285, 255, 345);
		this.lockdown = new InterfaceElement(this, 315, 420, 255, 345);
		this.elements[0].draw = function(){
			draw.wiringBg(this);
		}
		this.lever.draw = function(){
			draw.lever(this, this.parentInterface.terminal.bound.isOpen);
		}
		this.lockdown.drawActive = function(){
			draw.button(this, true, this.parentInterface.terminal.bound.isBlocked);
		}
		this.lockdown.drawUnactive = function(){
			draw.button(this, false, this.parentInterface.terminal.bound.isBlocked);
		}
		this.lever.functionality = function(){
			this.parentInterface.terminal.leverSwitch();
		}
		this.lockdown.functionality = function(){
			this.parentInterface.terminal.block();
		}
	}
}


class DoorEntity extends Entity{
	constructor(x, y, maP, door){
		super(x, y, -1000, 10000, {x1: 0, x2: 0, y1: 0, y2: 0}, maP);
		this.isTechnical = true;
		this.assignedDoor = door;
		door.entities.push(this);
	}

	//draw(){}

	tickPlaceholderMain(){}
}


class MainTerminal extends ObjectHitbox{
	constructor(x, y, numb = 3, inter = new MainTerminalInterface(), maP = map){
		super(x, x + 20, y, y + 40, undefined, undefined, undefined, maP);
		this.interactive = true;
		this.num = numb;
		this.interface = inter;
	}

	interact(ent){
		if (!ent.activeInterfaces[this.num]){
			ent.activeInterfaces[this.num] = true;
            this.intId = ent.map.activeInterfaces.push(this.interface) - 1;
            player.speedMultipliers[0] = 0;
		} else {
			ent.activeInterfaces[this.num] = false;
			ent.map.activeInterfaces[this.intId] = undefined;
			player.speedMultipliers[0] = 1;
		}
	}
}


class MainTerminalInterface extends Interface{
	constructor(){
		super(0, 600, 150, 450);
		this.elevatorOpen = false;
		this.access = false;
		this.elements[0].draw = function(){
			draw.wiringBg(this);
			draw.terminal(this);
		}
		this.codes = [];
		new Code(this, "grantAccess", "0,5,2,4,1");
		this.display = new InterfaceElement(this, 0, 0, 0, 0);
		this.display.code = [];
		this.display.draw = function(){
			for (let a = 0; a < this.code.length && a < 5; a++){
				draw.symbol(this.code[a], 235 + 20 * a, 17, 180, 17);
			}
		}
		invisibleButton([261, 283, 305, 261, 283, 305], [219, 219, 219, 243, 243, 243], this);
		let a = new InterfaceButton(423, 403, this, 40, true);
		a.functionality = function(){this.parentInterface.changeElevatorState()}
		a = new InterfaceButton(288, 351, this, 100, true);
		a.functionality = function(){this.parentInterface.power()}
		a = new InterfaceButton(473, 403, this);
		a.functionality = function(){this.parentInterface.briefElevatorOpening()}
		a = new InterfaceButton(523, 403, this);
		a.functionality = function(){this.parentInterface.elevatorOpen2()}
		a = new InterfaceButton(573, 403, this);
		a.functionality = function(){this.parentInterface.elevatorOpen1()}
		a = new InterfaceButton(90, 340, this);
		a.functionality = function(){this.parentInterface.lockProtocol()}
		a = new InterfaceButton(40, 340, this);
		a.functionality = function(){this.parentInterface.unlockProtocol()}
		a = new InterfaceButton(180, 205, this);
		a.functionality = function(){this.parentInterface.unlockVault()}
		a = new InterfaceButton(325, 280, this);
		a.functionality = function(){this.parentInterface.confirmCode()}
		a = new InterfaceElement(this, 350, 356, 230, 236);
		a.draw = function(){
			if (this.parentInterface.access){
				draw.can.fillStyle = "green";
			} else {
				draw.can.fillStyle = "red";
			}
			draw.can.fillRect(this.hitbox.x1, this.hitbox.y1, this.hitbox.x2 - this.hitbox.x1, this.hitbox.y2 - this.hitbox.y1);
		}
	}

	changeElevatorState(){
		let a = baseBackend.heavyDoors[2];
		let b = baseBackend.heavyDoors[3];
		if (this.elevatorOpen){
			if (!a.isLocked && !a.isBlocked && a.powered && a.isOpen){
				a.interact();
			}
			if (!b.isLocked && !b.isBlocked && b.powered && b.isOpen){
				b.interact();
			}
			this.elevatorOpen = false;
		} else {
			if (!a.isLocked && !a.isBlocked && a.powered && !a.isOpen){
				a.interact();
			}
			if (!b.isLocked && !b.isBlocked && b.powered && !b.isOpen){
				b.interact();
			}
			this.elevatorOpen = true;
		}
	}

	briefElevatorOpening(){
		this.changeElevatorState();
		setTimeout((obj) => {obj.changeElevatorState()}, 5000, this);
	}

	elevatorOpen1(){
		let a = baseBackend.heavyDoors[2]
		if (!a.isLocked && !a.isBlocked && a.powered){
			a.interact();
		}
	}

	elevatorOpen2(){
		let a = baseBackend.heavyDoors[3]
		if (!a.isLocked && !a.isBlocked && a.powered){
			a.interact();
		}
	}

	lockProtocol(){
		for (let a in baseBackend.heavyDoors){
			baseBackend.heavyDoors[a].lock();
		}
	}

	unlockProtocol(){
		if (!this.access){
			return;
		}
		for (let a in baseBackend.heavyDoors){
			baseBackend.heavyDoors[a].unlock();
		}
		this.access = false;
	}

	confirmCode(){
		for (let a in this.codes){
			if (this.display.code.toString() === this.codes[a].code){
				this.codes[a].functionality();
				this.display.code = [];
				return;
			}
		}
		this.display.code = [];
		return;
	}

	grantAccess(){
		this.access = true;
		setTimeout((obj) => {obj.access = false}, 5000, this)
	}

	unlockVault(){
		if (!this.access){
			return;
		}
		setTimeout(() => {baseBackend.heavyDoors[7].interact()}, 20000);
		this.access = false;
	}

	power(){

	}
}


class Code{
	constructor(inter, funct, code){
		inter.codes.push(this);
		this.inter = inter;
		this.funct = funct;
		this.code = code;
	}

	functionality(){
		this.inter[this.funct]();
	}
}


class InterfaceButton extends InterfaceElement{
	constructor(x, y, parent, size = 60, lever = false){
		super(parent, x - size / 2, x + size / 2, y - size / 2, y + size / 2);
		this.isPushed = false;
		if (lever){
			this.draw = function(){
				draw.lever(this, this.isPushed);
			}
			this.functionality2 = function(){
				this.isPushed = !this.isPushed;
			}
		} else {
			this.functionality2 = function(){
				this.isPushed = true;
				setTimeout((obj) => {obj.isPushed = false}, 400, this);
			}
			this.draw = function(){
				draw.button2(this, this.isPushed);
			}
		}
	}
}
function invisibleButton(xs, ys, inter){
	for (let a in xs){
		let b = new InterfaceButton(xs[a], ys[a], inter, 15);
		b.draw = function(){}
		b.symbol = parseInt(a);
		b.functionality = function(){
			if (this.parentInterface.display.code.length < 5){
				this.parentInterface.display.code.push([this.symbol]);
			}
		}
	}
}


class Cart extends Entity{
	constructor(x, y, maP = map, backend = baseBackend){
		super(x, y, -1000, 10000, {x1: -15, x2: 15, y1: -15, y2: 15}, maP);
		this.backend = backend;
		this.backend.cart = this;
		this.linked = false;
		this.fuel = 20;
		this.oxygen = 10;
		this.water = 10;
		this.spacing = {x: 0, y: 0};
		this.block = new ObjectHitbox(this.x + this.hitbox.x1, this.x + this.hitbox.x2, this.y + this.hitbox.y1, this.y + this.hitbox.y2, false, this.x, this.y, this.map);
		this.block.draw = function(){}
		this.block.backlink = this;
		this.block.interactive = true;
		this.block.interact = function(ent){
			this.backlink.linked = !this.backlink.linked;
			if (this.backlink.linked){
				this.backlink.spacing.x = this.x - ent.x;
				this.backlink.spacing.y = this.y - ent.y;
				this.hitbox = {x1: -11.5, x2: 11.5, y1: -11.5, y2: 11.5};
				player.speedMultipliers[2] = 0.6;
			} else {
				this.hitbox = {x1: -15, x2: 15, y1: -15, y2: 15};
				player.speedMultipliers[2] = 1;
			}
		}
	}

	draw(){
		draw.cart(this);
	}

	tickPlaceholderMain(){
		if (this.linked){
			this.tp(player.x + this.spacing.x, player.y + this.spacing.y);
		}
	}

	tp(x, y){
		this.block.fake = true;
		if (this.overlap(x - this.x, y - this.y)){
			this.x = x;
			this.y = y;
		} else {
			player.movePlayer(-player.moveVectoring.x, -player.moveVectoring.y);
		}
		if (!this.overlap(0, 0)){
			this.hitbox = {x1: 15, x2: -15, y1: 15, y2: -15, additional: []};
			this.tp(player.x + this.spacing.x, player.y + this.spacing.y);
			this.hitbox = {x1: -15, x2: 15, y1: -15, y2: 15, additional: []};
		}
		this.block.fake = false;
		this.reloadEntityZone();
		this.block.x = this.x;
		this.block.y = this.y;
		this.block.additionalHitboxes();
	}

	move(x = 0, y = 0){
		this.block.fake = true;
		if (this.overlap(x, y)){
			this.x += x;
			this.y += y;
		} else {
			this.contact({x: x, y: y});
		}
		this.block.fake = false;
		this.reloadEntityZone();
		this.block.x = this.x;
		this.block.y = this.y;
		this.block.additionalHitboxes();
	}
}


class CartFiller extends Box{
	constructor(x, y, maP = map, type = "rocketType", backend = baseBackend){
		super(x, y, {x1: -10, x2: 10, y1: -10, y2: 10}, undefined, -1000, maP);
		this.type = type;
		this.ready = 0;
		this.backend = backend;
		this[this.type]();
		this.fuel = 0;
		this.water = 0;
		this.oxygen = 0;
	}

	rocketType(){
		this.backend.rocketRefueller = this;
		this.tickPlaceholderMain = this.tick1;
	}

	reactorType(){
		this.backend.reactorPort = this;
		this.tickPlaceholderMain = this.tick2;
	}

	tickPlaceholderMain(){}

	tick1(){
		if (this.ready === 10 && this.touchSpecific(this.backend.cart)){
			if (this.fuel > 0 && this.backend.cart.fuel < 20){
				this.fuel--;
				this.backend.cart.fuel++;
			}
			if (this.water > 0 && this.backend.cart.water < 10){
				this.water--;
				this.backend.cart.water++;
			}
			if (this.oxygen > 0 && this.backend.cart.oxygen < 10){
				this.oxygen--;
				this.backend.cart.oxygen++;
			}
		}
		this.ready++
		if (this.ready > 10){
			this.ready = 0;
		}
	}

	tick2(){
		if (this.ready === 10 && this.touchSpecific(this.backend.cart) && this.fuel < 40 && this.backend.cart.fuel > 0){
			this.backend.cart.fuel--;
			this.fuel++;
		}
		this.ready++
		if (this.ready > 10){
			this.ready = 0;
		}
	}
}


class PushOutBox extends Box{
	constructor(life, boundWith, force = 3){
		super(boundWith.x, boundWith.y, boundWith.hitbox, undefined, life, boundWith.map);
		this.force = force;
		this.bound = boundWith;
	}

	tickPlaceholderMain(){
		this.bound.fake = true;
		let contacts = this.touch();
		for (let a in contacts){
			contacts[a].move(this.force * !this.bound.direction * Math.sign(contacts[a].x - this.coordinates.x), this.force * this.bound.direction * Math.sign(contacts[a].y - this.coordinates.y));
		}
		this.bound.fake = false;
		this.age();
	}
}


function raycast(source, speed, destination){
	let a = new Entity(source.x, source.y, -1000, 10000, {x1: 0, x2: 0, y1: 0, y2: 0}, source.map, 100);
	a.isTechnical = true;
	let stepProjections = projections(destination.x - source.x, destination.y - source.y, speed);
	while(a.life > 0){
		a.age();
		if (a.moveWithoutRounding(stepProjections.x, stepProjections.y)){
			a.kill();
			return false;
		}
		if (euclidianDistance(a.x, a.y, destination.x, destination.y) <= speed){
			break;
		}
	}
	a.kill();
	return true;
}