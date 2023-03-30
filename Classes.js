class Box{
	constructor(boxScreen = map, x = 5, y = 5, hitbox = {x1: -5, x2: 5, y1: -5, y2: 5, radius: 10}, damage = {type: "generic", amount: 1, iFrame: 3000}, life = 5000, draw = function(){}, tickMove = function(){this.enableDamage(this.touch()); this.age();}) {
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
		for (let a = this.id; a < this.map.boxList.length - 1; a++){
			this.map.boxList[a] = this.map.boxList[a + 1];
			this.map.boxList[a].id--; 
		}
		this.map.boxList.splice(this.map.boxList.length - 1, 1);
	}

	age(){
		if (this.life === 0){
			this.remove();
		}
		this.life--;
	}
	
	iFrameRemover(id, box){//removes entities with expired iFrame timer from untouchable entity list
		box.touchedEntities[id] = undefined;
	}
	
	enableDamage(list){//list is a list of entities to who the damage is enabled
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
	constructor(use = function(ent){this.meleeStrike(ent)}, meleeDamage = {type: "generic", amount: 1, iFrame: 3000}){
		this.use = use;
		this.meleeDamage = meleeDamage;
	}
	
	meleeStrike(user){
		this.hitbox = {x1: user.hitbox.x1 * 2, x2: user.hitbox.x2 * 2, y1: user.hitbox.y1 * 2, y2: user.hitbox.y2 * 2};
		let meleeHitbox = new Box(user.map, user.x, user.y, this.hitbox, this.meleeDamage, this.meleeDamage.iFrame / (2 * user.map.framerate),);
		meleeHitbox.bind(user);
	}
}


class Entity{//создаёт сущность с параметрами, хитбокс - это смещение относительно координат тела
	constructor(entityScreen = map, x = 0, y = 0, hp = 10, defence = 0, hitbox = {x1: -10, x2: 10, y1: -10, y2: 10}, life = 5000, drawer = function(){draw.entity(this)}, tickMove = function(){}, goal = {x: 0, y: 0}){
		this.x = x;
		this.y = y;
		this.life = life;
		this.map = entityScreen;
		this.loadingZone = {x: Math.floor(this.x / this.map.size), y: Math.floor(this.y / this.map.size)};
		this.hitbox = hitbox;
		this.hp = hp;
		this.maxHp = hp;
		this.defence = defence;
		this.draw = drawer;
		this.tickMove = tickMove;
		this.id = this.map.entityList.push(this) - 1;
		this.goal = goal;
		this.bindedHitboxes = [];
		this.inventory = {mainhand: []};
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
		this.moveWithoutRounding(Math.round(direction.x * 10) / 10, 0);
		this.moveWithoutRounding(0, Math.round(direction.y * 10) / 10);
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
			for (let a = this.id; a < this.map.entityList.length - 1; a++){
				this.map.entityList[a] = this.map.entityList[a + 1];
				this.map.entityList[a].id--; 
			}
			this.map.entityList.splice(this.map.entityList.length - 1, 1);
			this.reloadEntityZone();
			for (let a = this.zoneId; a < this.map.entityZones[this.loadingZone.x][this.loadingZone.y].length - 1; a++){
				this.map.entityZones[this.loadingZone.x][this.loadingZone.y][a] = this.map.entityZones[this.loadingZone.x][this.loadingZone.y][a + 1];
				this.map.entityZones[this.loadingZone.x][this.loadingZone.y][a].zoneId--;
			}
			this.map.entityZones[this.loadingZone.x][this.loadingZone.y].splice(this.map.entityZones[this.loadingZone.x][this.loadingZone.y].length - 1, 1);
		}
	}

	age(){
		if (this.life === 0){
			this.hp = 0;
			this.checkDeath();
		}
		this.life--;
	}

	useHand(){
		for (let a = 0; a < this.inventory.mainhand.length; a++) {
			this.inventory.mainhand[a].use(this);
		}
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
			for (let a = this.zoneId; a < this.map.entityZones[this.loadingZone.x][this.loadingZone.y].length - 1; a++){
				this.map.entityZones[this.loadingZone.x][this.loadingZone.y][a] = this.map.entityZones[this.loadingZone.x][this.loadingZone.y][a + 1];
				this.map.entityZones[this.loadingZone.x][this.loadingZone.y][a].zoneId--;
			}
			this.loadingZone = {x: Math.floor(this.x / this.map.size), y: Math.floor(this.y / this.map.size)};
			this.zoneId = this.map.entityZones[this.loadingZone.x][this.loadingZone.y].push(this);
		}
	}
}


class ObjectHitbox{
	constructor(x1 = 20, x2 = 50, y1 = 0, y2 = 10, x = undefined, y = undefined, objectScreen = map, drawer = function(){draw.object(this)}){
		if (x === undefined || y === undefined){
			this.x = (x1 + x2) / 2;
			this.y = (y1 + y2) / 2;
		} else {
			this.x = x;
			this.y = y;
		}
		this.draw = drawer;
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
		this.loadedZone = {x: 0, y: 0};
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
			this.entityList[a].draw();
		}
		for (let a = 0; a < this.loadingZones[0][0].length; a++){
			this.loadingZones[0][0][a].draw();
		}
	}
	
	tick(){
		this.drawEverything();
		for (let a = 0; a < this.boxList.length; a++){
			map.boxList[a].tickMove();
		}
		for (let a = 0; a < this.entityList.length; a++){
			map.entityList[a].tickMove();
		}
	}
}


class DevKit{
	constructor(){}
	
	spawn(){
		new ObjectHitbox;
		//let a = new Box;
		//a.bind(new Entity);
		new Entity;
		new Entity;
		map.entityList[0].inventory.mainhand.push(new Tool);
		map.drawEverything();
		setInterval(() => {
			map.tick();
		}, map.framerate);
	}
	
	mover(){
		setInterval(() => {map.entityList[0].moveToGoal(100, 200, 3)}, 1000);
	}
}