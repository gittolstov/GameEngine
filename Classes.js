function projections(a, b, hypothesis){//a, b - расстояния до цели, hyp. - длина шага, возвращает объект с проекциями шага
	y = hypothesis * b / (Math.sqrt(a ** 2 / b ** 2 + 1) * Math.abs(b))
    return {
		x: y * a / b,
		y: y
	}
}


function defenceCount(dmg, defence){
	return dmg * 200 / (defence + 200);
}


class Box{
	constructor(boxScreen = map, x = 5, y = 5, hitbox = {x1: -5, x2: 5, y1: -5, y2: 5, radius: 10}, damage = {type: "generic", amount: 1, iFrame: 3000}, life = 5000, draw = function(){}, tickMove = function(){enableDamage(this.touch())}) {
		this.map = boxScreen;
		this.life = life;
		this.parameters = {};
		this.coordinates = {x: x, y: y};
		this.hitbox = hitbox;
		this.damage = damage;
		this.draw = draw;
		this.tickMove = tickMove;
		this.id = this.map.boxList.push(this) - 1;
		this.loadingZone = {x: Math.floor(this.coordinates.x / this.map.size), y: Math.floor(this.coordinates.y / this.map.size)};
		this.touchedEntities = [];
	}
	
	bind(parentEntity){
		this.coordinates = parentEntity;
		parentEntity.bindedHitboxes.push(this);
		this.touchedEntities.push(parentEntity);
	}
	
	move(x = 0, y = 0){
		this.coordinates.x += x;
		this.coordinates.y += y;
	}

	remove(){
		this.map.boxList.splice(this.id, 1);
	}

	age(){
		if (this.life === 0){
			this.remove();
		}
		this.life--;
	}
	
	iFrameRemover(id, box){
		box.touchedEntities.splice(id, 1)
	}
	
	enableDamage(list){
		for(let a = 0; a < list.length; a++){
			let unTouched = true;
			for (let b = 0; b < this.touchedEntities.length; b++){
				if (list[a] === this.touchedEntities[b])
				unTouched = false;
			}
			if (unTouched){
				let touchedId = this.touchedEntities.push(list[a]) - 1;
				if (this.damage.type === "generic"){
					list[a].damageGeneric(this.damage.amount);
				} else if (this.damage.type === "piercing"){
					list[a].damagePiercing(this.damage.amount);
				}
				setTimeout(this.iFrameRemover, this.damage.iFrame - this.map.framerate / 2, touchedId, this);
			}
		}
	}
	
	contact(){
		let collisionZone = this.map.loadingZones[this.loadingZone.x][this.loadingZone.y];
		let x1 = this.coordinates.x + this.hitbox.x1;
		let x2 = this.coordinates.x + this.hitbox.x2;
		let y1 = this.coordinates.y + this.hitbox.y1;
		let y2 = this.coordinates.y + this.hitbox.y2;
		let collisionList = [];
		for (let a = 0; a < collisionZone.length; a++){
			let objectX1 = collisionZone[a].hitbox.x1 + collisionZone[a].x;
			let objectY1 = collisionZone[a].hitbox.y1 + collisionZone[a].y;
			let objectX2 = collisionZone[a].hitbox.x2 + collisionZone[a].x;
			let objectY2 = collisionZone[a].hitbox.y2 + collisionZone[a].y;
			if (x2 >= objectX1 && x1 <= objectX2 && y2 >= objectY1 && y1 <= objectY2) {
				collisionList.push(collisionZone[a]);
			}
		}
		return collisionList;
	}
	
	touch(){
		let collisionZone = this.map.entityZones[this.loadingZone.x][this.loadingZone.y];
		let x1 = this.coordinates.x + this.hitbox.x1;
		let x2 = this.coordinates.x + this.hitbox.x2;
		let y1 = this.coordinates.y + this.hitbox.y1;
		let y2 = this.coordinates.y + this.hitbox.y2;
		let overlapList = [];
		for (let a = 0; a < collisionZone.length; a++){
			let objectX1 = collisionZone[a].hitbox.x1 + collisionZone[a].x;
			let objectY1 = collisionZone[a].hitbox.y1 + collisionZone[a].y;
			let objectX2 = collisionZone[a].hitbox.x2 + collisionZone[a].x;
			let objectY2 = collisionZone[a].hitbox.y2 + collisionZone[a].y;
			if (x2 >= objectX1 && x1 <= objectX2 && y2 >= objectY1 && y1 <= objectY2) {
				overlapList.push(collisionZone[a]);
			}
		}
		return overlapList;
	}
}


class Tool{
	constructor(user, use = function(){}, meleeDamage = {type: "generic", amount: 1, iFrame: 3000}){
		this.use = use;
		this.user = user;
		this.meleeDamage = meleeDamage;
		this.hitbox = {x1: user.hitbox.x1 * 2, x2: user.hitbox.x2 * 2, y1: user.hitbox.y1 * 2, y2: user.hitbox.y2 * 2}
	}
	
	meleeStrike(){
		new Box(this.user.map, this.user.x, this.user.y, this.hitbox, this.meleeDamage);
	}
}


class Entity{//создаёт сущность с параметрами, хитбокс - это смещение относительно координат тела
	constructor(entityScreen = map, x = 0, y = 0, hp = 10, defence = 0, hitbox = {x1: -10, x2: 10, y1: -10, y2: 10}, life = 5000, draw = function(){}, tickMove = function(){this.move(1)}, goal = {x: 0, y: 0}){
		this.x = x;
		this.y = y;
		this.life = life;
		this.map = entityScreen;
		this.loadingZone = {x: Math.floor(this.x / this.map.size), y: Math.floor(this.y / this.map.size)};
		this.hitbox = hitbox;
		this.hp = hp;
		this.maxHp = hp;
		this.defence = defence;
		this.draw = draw;
		this.tickMove = tickMove;
		this.id = this.map.entityList.length;
		this.goal = goal;
		this.bindedHitboxes = [];
		this.inventory = {mainhand: []};
		this.map.entityList.push(this);
		this.zoneId = this.map.entityZones[this.loadingZone.x][this.loadingZone.y].push(this) - 1;
	}
	
	move(x = 0, y = 0){
		if (this.overlap(x, y)){
			this.x += x;
			this.y += y;
		} else {
			this.contact({x: x, y: y});
		}
		this.reloadEntityZone();
	}

	moveToGoal(a, b, step){
		let stepProjections = projections(a - this.x, b - this.y, step);
		if (this.overlap(stepProjections.x, stepProjections.y)){
			this.x += Math.round(stepProjections.x * 10) / 10;
			this.y += Math.round(stepProjections.y * 10) / 10;
		} else {
			this.contact(stepProjections);
		}
		this.reloadEntityZone();
	}

	moveDirection(a, b, step){
		let stepProjections = projections(a, b, step);
		if (this.overlap(stepProjections.x, stepProjections.y)){
			this.x += Math.round(stepProjections.x * 10) / 10;
			this.y += Math.round(stepProjections.y * 10) / 10;
		} else {
			this.contact(stepProjections);
		}
		this.reloadEntityZone();
	}
	
	moveWithoutRounding(a, b){
		if (this.overlap(a, b)){
			this.x += a;
			this.y += b;
		}
	}
	
	contact(direction){
		while (this.overlap(direction.x / 10, direction.y / 10)){
			this.moveWithoutRounding(direction.x / 10, direction.y / 10);
		}
		this.x = Math.round(this.x * 10) / 10;
		this.y = Math.round(this.y * 10) / 10;
	}

	kill(){
		this.hp = 0;
		this.checkDeath();
	}

	heal(amount){
		this.hp += amount;
		if (this.hp > this.maxHp){
			this.hp = this.maxHp;
		}
	}
	
	damageGeneric(dmg){
		this.hp -= defenceCount(dmg, this.defence);
		this.checkDeath();
	}
	
	damagePiercing(dmg){
		this.hp -= dmg;
		this.checkDeath();
	}
	
	checkDeath(){
		if (this.hp <= 0){
			this.map.entityList.splice(this.id, 1);
			this.reloadEntityZone();
			this.map.entityZones[this.loadingZone.x][this.loadingZone.y].splice(this.zoneId, 1);
		}
	}

	age(){
		if (this.life === 0){
			this.hp = 0;
			this.checkDeath();
		}
		this.life--;
	}
	
	overlap(xshift = 0, yshift = 0){
		let collisionZone = this.map.loadingZones[this.loadingZone.x][this.loadingZone.y];
		let x1 = this.x + this.hitbox.x1 + xshift;
		let x2 = this.x + this.hitbox.x2 + xshift;
		let y1 = this.y + this.hitbox.y1 + yshift;
		let y2 = this.y + this.hitbox.y2 + yshift;
		let permission = true;
		for (let a = 0; permission && a < collisionZone.length; a++){
			let objectX1 = collisionZone[a].hitbox.x1 + collisionZone[a].x;
			let objectY1 = collisionZone[a].hitbox.y1 + collisionZone[a].y;
			let objectX2 = collisionZone[a].hitbox.x2 + collisionZone[a].x;
			let objectY2 = collisionZone[a].hitbox.y2 + collisionZone[a].y;
			permission = permission && !(x2 >= objectX1 && x1 <= objectX2 && y2 >= objectY1 && y1 <= objectY2)
		}
		return permission;
	}
	
	reloadEntityZone(){
		if (Math.floor(this.x / this.map.size) != this.loadingZone.x || Math.floor(this.y / this.map.size) != this.loadingZone.y){
			this.map.entityZones[this.loadingZone.x][this.loadingZone.y].splice(this.zoneId, 1);
			this.loadingZone = {x: Math.floor(this.x / this.map.size), y: Math.floor(this.y / this.map.size)};
			this.zoneId = this.map.entityZones[this.loadingZone.x][this.loadingZone.y].push(this);
		}
	}
}


class Player extends Entity{
	constructor(entityScreen = map, x = 0, y = 0, hp = 100, defence = 0, hitbox = {x1: -5, x2: 5, y1: -5, y2: 5}, id = 0, draw = drawer.drawPlayer, speed = 3){
		super(entityScreen, x, y, hp, defence, hitbox, id, draw);
		this.moveVectoring = {x: 0, y: 0};
	}
	
	movePlayer(x, y){
		this.moveDirection(x, y, speed);
	}
	
	upPress(){
		this.moveVectoring.y += 1;
	}
	downPress(){
		this.moveVectoring.y -= 1;
	}
	leftPress(){
		this.moveVectoring.x -= 1;
	}
	rightPress(){
		this.moveVectoring.x += 1;
	}
}


class ObjectHitbox{
	constructor(x1 = 20, x2 = 50, y1 = 0, y2 = 10, x = undefined, y = undefined, objectScreen = map){
		if (x === undefined || y === undefined){
			this.x = (x1 + x2) / 2;
			this.y = (y1 + y2) / 2;
		} else {
			this.x = x;
			this.y = y;
		}
		this.hitbox = {x1: x1 - this.x, x2: x2 - this.x, y1: y1 - this.y, y2: y2 - this.y};
		this.map = objectScreen;
		this.loadingZone = {x: Math.floor(this.x / this.map.size), y: Math.floor(this.y / this.map.size)};
		let minRange = this.map.size / 10;
		let maxRange = this.map.size / 10 * 9;
		let xRangeMin = x1 - this.loadingZone.x * this.map.size;
		let xRangeMax = x2 - this.loadingZone.x * this.map.size;
		let yRangeMin = y1 - this.loadingZone.x * this.map.size;
		let yRangeMax = y2 - this.loadingZone.x * this.map.size;
		this.map.loadingZones[this.loadingZone.x][this.loadingZone.y].push(this);//создаёт дополнительные хитбоксы в соседних ячейках, если необходимо
		if (xRangeMin < minRange && this.loadingZone.x > 0){
			this.map.loadingZones[this.loadingZone.x - 1][this.loadingZone.y].push(this);
			if (yRangeMin < minRange && this.loadingZone.y > 0){
				this.map.loadingZones[this.loadingZone.x - 1][this.loadingZone.y - 1].push(this);
			}
		}
		if (yRangeMax > maxRange && this.loadingZone.y <= this.map.fieldHeight){
			this.map.loadingZones[this.loadingZone.x][this.loadingZone.y + 1].push(this);
			if (xRangeMin < minRange && this.loadingZone.y > 0){
				this.map.loadingZones[this.loadingZone.x - 1][this.loadingZone.y + 1].push(this);
			}
		}
		if (xRangeMax > maxRange && this.loadingZone.x <= this.map.fieldWidth){
			this.map.loadingZones[this.loadingZone.x + 1][this.loadingZone.y].push(this);
			if (yRangeMax > maxRange && this.loadingZone.y <= this.map.fieldHeight){
				this.map.loadingZones[this.loadingZone.x + 1][this.loadingZone.y + 1].push(this);
			}
		}
		if (yRangeMin < minRange && this.loadingZone.y > 0){
			this.map.loadingZones[this.loadingZone.x][this.loadingZone.y - 1].push(this);
			if (xRangeMax > maxRange && this.loadingZone.x <= this.map.fieldWidth){
				this.map.loadingZones[this.loadingZone.x + 1][this.loadingZone.y - 1].push(this);
			}
		}
	}
}


class Map{//size - это размер 1 экрана, width и height - размеры поля в экранах
	constructor(size, width, height){
		this.framerate = 20;
		this.size = size;
		this.fieldWidth = width;
		this.fieldHeight = height;
		this.entityList = [];
		this.boxList = [];
		this.loadingZones = [];
		for (let column = 0; column < height; column++) {
			this.loadingZones[column] = [];
			for (let row = 0; row < width; row++) {
				this.loadingZones[column][row] = [];
			}
		}
		this.entityZones = [];
		for (let column = 0; column < height; column++) {
			this.entityZones[column] = [];
			for (let row = 0; row < width; row++) {
				this.entityZones[column][row] = [];
			}
		}
	}
	
	drawEverything(){
		draw.background1(this);
		for (let a = 0; a < this.entityList.length; a++){
			draw.entity(this.entityList[a]);
		}
	}
	
	tick(){
		this.drawEverything();
		map.boxList[0].enableDamage(map.boxList[0].touch());
		console.log(map.entityList[0].hp);
		console.log(map.entityList[1].hp);
	}
}


class DevKit{
	constructor(){}
	
	spawn(){
		new ObjectHitbox;
		let a = new Box;
		a.bind(new Entity);
		new Entity;
		map.drawEverything();
	}
	
	mover(){
		setInterval(() => {map.entityList[0].moveToGoal(100, 200, 3)}, 1000);
	}
	
	damageHitbox(){
		setInterval(() => {
			map.tick();
		}, map.framerate);
	}
}

let devKit = new DevKit;
let map = new Map(600, 20, 20);
let draw = new Draw;