class BaseBackend{
	constructor(){
		this.cells = [];
		this.wayPoints = [];
		setTimeout(() => {
			setInterval(() => {
				this.findPlayer();
			}, map.framerate * 50);
		}, 10);
	}

	activateWaypoints(){
		for (let a in this.wayPoints){
			this.wayPoints[a].find();
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
		let closest = undefined;
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
	constructor(){
		this.status = 0;
		this.hitboxes = [];
		this.entrys = [];
		this.vents = [];
		this.mechanisms = [];
	}
}


class BaseDoor extends ObjectHitbox{
	constructor(x1, x2, y1, y2, maP, is){

	}
}


class Mechanism{
	constructor(){}
}


function raycast(source, speed, destination){
	let a = new Entity(source.x, source.y, -1000, 10000, {x1: 0, x2: 0, y1: 0, y2: 0}, source.map, 100);
	a.isTechnical = true;
	let stepProjections = projections(destination.x - source.x, destination.y - source.y, speed);
	while(a.life > 0){
		a.age();
		if (a.moveWithoutRounding(stepProjections.x, stepProjections.y)){
			return false;
		}
		if (euclidianDistance(a.x, a.y, destination.x, destination.y) <= speed){
			break;
		}
	}
	a.kill();
	return true;
}