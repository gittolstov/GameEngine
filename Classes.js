class Box{
	constructor(boxScreen = map, x = 5, y = 5, hitbox = {x1: -5, x2: 5, y1: -5, y2: 5, radius: 10}, damage = {type: "generic", amount: 1, iFrame: 3000}, life = -1000, draw = function(){}, tickMove = function(){this.enableDamage(this.touch()); this.age();}) {
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
		this.map.reloadBoxActiveList();
		this.damageSetter();
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
		this.map.boxList[this.id] = undefined;
		this.map.reloadBoxActiveList();
	}

	age(){
		if (this.life <= 0 && this.life > -1000){
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
				if (list[a] === this.touchedEntities[b]){
					unTouched = false;
				}
			}
			if (unTouched){
				let touchedId = this.touchedEntities.push(list[a]) - 1;
				this.damageEntity(list[a]);
				setTimeout(this.iFrameRemover, this.damage.iFrame - this.map.framerate / 2, touchedId, this);
				this.damageFunction(list[a]);
			}
		}
	}

	damageFunction(){}

	damageSetter(){
		if (this.damage.type === "generic"){
			this.damageEntity = function(ent){ent.damageGeneric(this.damage.amount, this);};
		} else if (this.damage.type === "piercing"){
			this.damageEntity = function(ent){ent.damagePiercing(this.damage.amount, this);};
		} else if (this.damage.type === "enemy"){
			this.damageEntity = function(ent){ent.damageEnemy(this.damage.amount, this);};
		} else if (this.damage.type === "playerGeneric"){
			this.damageEntity = function(ent){ent.damagePlayer(this.damage.amount, this);};
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
			if (collisionZone[a] === undefined){
				continue;
			}
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
			if (collisionZone[a] === undefined){
				continue;
			}
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
	constructor(functionality = function(ent){this.meleeStrike(ent)}, meleeDamage = {type: "generic", amount: 4, iFrame: 240}){
		this.functionality = functionality;
		this.meleeDamage = meleeDamage;
		this.cooldown = true;
		this.maxCooldown = 500;
		this.active = false;
	}
	
	meleeStrike(user){
		this.hitbox = {x1: user.hitbox.x1 * 2, x2: user.hitbox.x2 * 2, y1: user.hitbox.y1 * 2, y2: user.hitbox.y2 * 2};
		let meleeHitbox = new Box(user.map, user.x, user.y, this.hitbox, this.meleeDamage, this.meleeDamage.iFrame / (2 * user.map.framerate));
		meleeHitbox.bind(user);
	}

	activate(){
		this.active = true;
	}

	deactivate(){
		this.active = false;
	}

	use(ent){
		if (this.cooldown) {
			setTimeout((tool, enti) => {tool.cooldown = true; if (tool.active){tool.use(enti)}}, this.maxCooldown, this, ent);
			this.functionality(ent);
			this.cooldown = false;
		}
	}
}


class Particle{
	constructor(particleScreen = map, x = 0, y = 0, life = 12, drawer = function(){draw.particle(this)}, tick = function(){this.age()}){
		this.coordinates = {x: x, y: y};
		this.hitbox = {x1: -40, x2: 0, y1: -20, y2: 20};
		this.life = life;
		this.map = particleScreen;
		this.id = particleScreen.particles.push(this) - 1;
		this.draw = drawer;
		this.tickMove = tick;
		draw.startParticle(this);
		this.map.reloadParticleActiveList();
	}

	age(){
		if (this.life <= 0){
			//for (let a = this.id; a < this.map.particles.length - 1; a++){
			//	this.map.particles[a] = this.map.particles[a + 1];
			//}
			//this.map.particles.splice(this.map.particles.length - 1, 1);
			this.map.particles[this.id] = undefined;
			this.map.reloadParticleActiveList();
		}
		this.life--;
	}

	bind(parentEntity){
		this.coordinates = parentEntity;
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
		this.enemyDamageMultiplier = 1;
		this.playerDamageMultiplier = 1;
		this.map.reloadEntityActiveList();
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
		let a = 0;
		while (this.overlap(direction.x / 10, direction.y / 10) && a < 10){
			this.moveWithoutRounding(direction.x / 10, direction.y / 10);
			a++;
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

	damageEnemy(dmg){
		this.hp -= (defenceCount(dmg, this.defence) * this.enemyDamageMultiplier);
		this.checkDeath();
	}

	damagePlayer(dmg){
		this.hp -= (defenceCount(dmg, this.defence) * this.playerDamageMultiplier);
		this.checkDeath();
	}
	
	checkDeath(){
		if (this.hp <= 0 && this.hp > -1000){
			this.map.entityList[this.id] = undefined;
			this.map.entityZones[this.loadingZone.x][this.loadingZone.y][this.zoneId] = undefined;
			for (let a = 0; a < this.bindedHitboxes.length; a++){
				this.bindedHitboxes[a].remove();
			}
			this.map.reloadEntityActiveList();
		}
	}

	age(){
		if (this.life <= 0){
			this.hp = 0;
			this.checkDeath();
		}
		this.life--;
	}

	useHand(){
		for (let a = 0; a < this.inventory.mainhand.length; a++) {
			this.inventory.mainhand[a].use(this);
			this.inventory.mainhand[a].activate();
		}
	}

	unUseHand(){
		for (let a = 0; a < this.inventory.mainhand.length; a++) {
			this.inventory.mainhand[a].deactivate();
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
			permission = permission && !(x2 > objectX1 && x1 < objectX2 && y2 > objectY1 && y1 < objectY2)
		}
		return permission;
	}
	
	reloadEntityZone(){
		if (Math.floor(this.x / this.map.size) != this.loadingZone.x || Math.floor(this.y / this.map.size) != this.loadingZone.y){
			this.map.entityZones[this.loadingZone.x][this.loadingZone.y][this.zoneId] = undefined;
			this.loadingZone = {x: Math.floor(this.x / this.map.size), y: Math.floor(this.y / this.map.size)};
			this.zoneId = this.map.entityZones[this.loadingZone.x][this.loadingZone.y].push(this) - 1;
		}
	}

	removeProjection(){
		this.map.entityZones[this.loadingZone.x][this.loadingZone.y][this.zoneId] = undefined;
		this.reloadEntityZone = function (){};
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
		this.entityListActive = [];
		this.boxList = [];
		this.boxListActive = [];
		this.loadingZones = [];
		this.particles = [];
		this.particleListActive = [];
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
			if (this.entityList[a] === undefined){
				continue;
			}
			this.entityList[a].draw();
		}
		for (let a = 0; a < this.loadingZones[this.loadedZone.x][this.loadedZone.y].length; a++){
			if (this.loadingZones[this.loadedZone.x][this.loadedZone.y][a] === undefined){
				continue;
			}
			this.loadingZones[this.loadedZone.x][this.loadedZone.y][a].draw();
		}
		for (let a = 0; a < this.particles.length; a++){
			if (this.particles[a] === undefined){
				continue;
			}
			this.particles[a].draw();
		}
	}
	
	tick(){
		this.drawEverything();
		for (let a = 0; a < this.boxListActive.length; a++){
			this.boxList[this.boxListActive[a]].tickMove();
		}
		for (let a = 0; a < this.entityListActive.length; a++){
			this.entityList[this.entityListActive[a]].tickMove();
		}
		for (let a = 0; a < this.particleListActive.length; a++){
			this.particles[this.particleListActive[a]].tickMove();
		}
	}

	reloadEntityActiveList(){
		this.entityListActive = [];
		for (let a = 0; a < this.entityList.length; a++){
			if (this.entityList[a] === undefined){
				continue;
			}
			map.entityListActive.push(a);
		}
	}

	reloadBoxActiveList(){
		this.boxListActive = [];
		for (let a = 0; a < this.boxList.length; a++){
			if (this.boxList[a] === undefined){
				continue;
			}
			map.boxListActive.push(a);
		}
	}

	reloadParticleActiveList(){
		this.particleListActive = [];
		for (let a = 0; a < this.particles.length; a++){
			if (this.particles[a] === undefined){
				continue;
			}
			map.particleListActive.push(a);
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
		player.inventory.mainhand.push(new Weapon(20, 60));
		//player.inventory.mainhand.push(new Weapon(2, 900));
		map.drawEverything();
		setInterval(() => {
			map.tick();
		}, map.framerate);
	}
	
	mover(){
		setInterval(() => {map.entityList[0].moveToGoal(100, 200, 3)}, 1000);
	}

	swarm(){
		for (let d = 0; d < 50; d++){
			new Grunt();
		}
		for (let b = 0; b < 20; b++){
			new Swarmer();
		}
		for (let c = 0; c < 2; c++){
			new Praetorian();
		}
	}
}