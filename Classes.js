class Box{
	constructor(x = 5, y = 5, hitbox = {x1: -5, x2: 5, y1: -5, y2: 5, radius: 10}, damage = {type: "generic", amount: 1, iFrame: 3000}, life = -1000, boxScreen = map) {
		this.map = boxScreen;
		this.life = life;
		this.parameters = {};
		this.coordinates = {x: x, y: y};
		this.hitbox = hitbox;
		this.hitbox.additional = [];
		this.damage = damage;
		this.id = this.map.boxList.push(this) - 1;
		this.touchedEntities = [];
		this.map.reloadBoxActiveList();
		this.reloadLoadingZone();
		this.damageSetter();
	}

	draw(){
	}

	tickMove(){
		this.tickPlaceholderMain();
		this.tickPlaceholder1();
		this.tickPlaceholder2();
		this.tickPlaceholder3();
	}

	tickPlaceholderMain(){
		this.enableDamage(this.touch());
		this.age();
	}

	tickPlaceholder1(){
	}

	tickPlaceholder2(){
	}
	
	tickPlaceholder3(){
	}

	increasedHitbox(scale){
		let a = this.hitbox;
		a.x1 *= scale;
		a.x2 *= scale;
		a.y1 *= scale;
		a.y2 *= scale;
		return a;
	}
	
	bind(parentEntity){
		this.coordinates = parentEntity;
		parentEntity.bindedHitboxes.push(this);
		this.touchedEntities.push(parentEntity);
		this.map = parentEntity.map;
		this.reloadLoadingZone();
	}

	tp(x = 0, y = 0){
		this.coordinates.x = x;
		this.coordinates.y = y;
		this.reloadLoadingZone();
	}
	
	move(x = 0, y = 0){
		this.coordinates.x += x;
		this.coordinates.y += y;
		this.reloadLoadingZone();
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
				this.damagePlaceholderFunction(list[a]);
			}
		}
	}

	damagePlaceholderFunction(){}

	damageSetter(){
		if (this.damage.type === "generic"){
			this.damageEntity = function(ent){ent.damageGeneric(this.damage.amount, this);};
		} else if (this.damage.type === "piercing"){
			this.damageEntity = function(ent){ent.damagePiercing(this.damage.amount, this);};
		} else if (this.damage.type === "enemy"){
			this.damageEntity = function(ent){ent.damageEnemy(this.damage.amount, this);};
		} else if (this.damage.type === "playerGeneric"){
			this.damageEntity = function(ent){ent.damagePlayer(this.damage.amount, this);};
		} else if (this.damage.type === "fire"){
			this.damageEntity = function(ent){ent.damageFire(this.damage.amount, this);};
		}
	}
	
	contact(){
		let collisionZone = this.map.loadingZones[this.loadingZone.x][this.loadingZone.y];
		let collisionList = [];
		for (let a = 0; a < collisionZone.length; a++){
			let x1 = this.coordinates.x + this.hitbox.x1;
			let x2 = this.coordinates.x + this.hitbox.x2;
			let y1 = this.coordinates.y + this.hitbox.y1;
			let y2 = this.coordinates.y + this.hitbox.y2;
			if (collisionZone[a] === undefined || collisionZone[a].fake){
				continue;
			}
			let objectX1 = collisionZone[a].hitbox.x1 + collisionZone[a].x;
			let objectY1 = collisionZone[a].hitbox.y1 + collisionZone[a].y;
			let objectX2 = collisionZone[a].hitbox.x2 + collisionZone[a].x;
			let objectY2 = collisionZone[a].hitbox.y2 + collisionZone[a].y;
			if (x2 > objectX1 && x1 < objectX2 && y2 > objectY1 && y1 < objectY2) {
				collisionList.push(collisionZone[a]);
			} else {
				for (let b = 0; b < this.hitbox.additional.length; b++){
					x1 = this.coordinates.x + this.hitbox.additional[b].x1;
					x2 = this.coordinates.x + this.hitbox.additional[b].x2;
					y1 = this.coordinates.y + this.hitbox.additional[b].y1;
					y2 = this.coordinates.y + this.hitbox.additional[b].y2;
					objectX1 = collisionZone[a].hitbox.x1 + collisionZone[a].x;
					objectY1 = collisionZone[a].hitbox.y1 + collisionZone[a].y;
					objectX2 = collisionZone[a].hitbox.x2 + collisionZone[a].x;
					objectY2 = collisionZone[a].hitbox.y2 + collisionZone[a].y;
					if (x2 > objectX1 && x1 < objectX2 && y2 > objectY1 && y1 < objectY2) {
						collisionList.push(collisionZone[a]);
						break;
					}
				}
			}
		}
		return collisionList;
	}
	
	contactAnyway(){
		let collisionZone = this.map.loadingZones[this.loadingZone.x][this.loadingZone.y];
		let collisionList = [];
		for (let a = 0; a < collisionZone.length; a++){
			let x1 = this.coordinates.x + this.hitbox.x1;
			let x2 = this.coordinates.x + this.hitbox.x2;
			let y1 = this.coordinates.y + this.hitbox.y1;
			let y2 = this.coordinates.y + this.hitbox.y2;
			if (collisionZone[a] === undefined){
				continue;
			}
			let objectX1 = collisionZone[a].hitbox.x1 + collisionZone[a].x;
			let objectY1 = collisionZone[a].hitbox.y1 + collisionZone[a].y;
			let objectX2 = collisionZone[a].hitbox.x2 + collisionZone[a].x;
			let objectY2 = collisionZone[a].hitbox.y2 + collisionZone[a].y;
			if (x2 > objectX1 && x1 < objectX2 && y2 > objectY1 && y1 < objectY2) {
				collisionList.push(collisionZone[a]);
			} else {
				for (let b = 0; b < this.hitbox.additional.length; b++){
					x1 = this.coordinates.x + this.hitbox.additional[b].x1;
					x2 = this.coordinates.x + this.hitbox.additional[b].x2;
					y1 = this.coordinates.y + this.hitbox.additional[b].y1;
					y2 = this.coordinates.y + this.hitbox.additional[b].y2;
					objectX1 = collisionZone[a].hitbox.x1 + collisionZone[a].x;
					objectY1 = collisionZone[a].hitbox.y1 + collisionZone[a].y;
					objectX2 = collisionZone[a].hitbox.x2 + collisionZone[a].x;
					objectY2 = collisionZone[a].hitbox.y2 + collisionZone[a].y;
					if (x2 > objectX1 && x1 < objectX2 && y2 > objectY1 && y1 < objectY2) {
						collisionList.push(collisionZone[a]);
						break;
					}
				}
			}
		}
		return collisionList;
	}

	touch(){
		let collisionZone = this.map.entityZones[this.loadingZone.x][this.loadingZone.y];
		let overlapList = [];
		for (let a = 0; a < collisionZone.length; a++){
			let x1 = this.coordinates.x + this.hitbox.x1;
			let x2 = this.coordinates.x + this.hitbox.x2;
			let y1 = this.coordinates.y + this.hitbox.y1;
			let y2 = this.coordinates.y + this.hitbox.y2;
			if (collisionZone[a] === undefined){
				continue;
			}
			let mainAdd = true;//true if main didnt overlap
			let objectX1 = collisionZone[a].hitbox.x1 + collisionZone[a].x;
			let objectY1 = collisionZone[a].hitbox.y1 + collisionZone[a].y;
			let objectX2 = collisionZone[a].hitbox.x2 + collisionZone[a].x;
			let objectY2 = collisionZone[a].hitbox.y2 + collisionZone[a].y;
			if (x2 > objectX1 && x1 < objectX2 && y2 > objectY1 && y1 < objectY2) {//checks hitboxes main - main
				overlapList.push(collisionZone[a]);
				mainAdd = false;
			} else {
				for (let c = 0; c < collisionZone[a].hitbox.additional.length; c++){//checks hitboxes main - add
					objectX1 = collisionZone[a].hitbox.additional[c].x1 + collisionZone[a].x;
					objectY1 = collisionZone[a].hitbox.additional[c].y1 + collisionZone[a].y;
					objectX2 = collisionZone[a].hitbox.additional[c].x2 + collisionZone[a].x;
					objectY2 = collisionZone[a].hitbox.additional[c].y2 + collisionZone[a].y;
					if (x2 > objectX1 && x1 < objectX2 && y2 > objectY1 && y1 < objectY2) {
						overlapList.push(collisionZone[a]);
						mainAdd = false;
						break;
					}
				}
			}
			if (mainAdd) {
				for (let b = 0; b < this.hitbox.additional.length; b++){//add1 parameters cycle
					x1 = this.coordinates.x + this.hitbox.additional[b].x1;
					x2 = this.coordinates.x + this.hitbox.additional[b].x2;
					y1 = this.coordinates.y + this.hitbox.additional[b].y1;
					y2 = this.coordinates.y + this.hitbox.additional[b].y2;
					if (x2 >= objectX1 && x1 <= objectX2 && y2 >= objectY1 && y1 <= objectY2) {//checks add - main
						overlapList.push(collisionZone[a]);
						break;
					} else {
						for (let c = 0; c < collisionZone[a].hitbox.additional.length; a++){//checks add - add
							objectX1 = collisionZone[a].hitbox.additional[c].x1 + collisionZone[a].x;
							objectY1 = collisionZone[a].hitbox.additional[c].y1 + collisionZone[a].y;
							objectX2 = collisionZone[a].hitbox.additional[c].x2 + collisionZone[a].x;
							objectY2 = collisionZone[a].hitbox.additional[c].y2 + collisionZone[a].y;
							if (x2 >= objectX1 && x1 <= objectX2 && y2 >= objectY1 && y1 <= objectY2) {
								overlapList.push(collisionZone[a]);
								break;
							}
						}
					break;
					}
				}
			}
		}
		return overlapList;
	}

	reloadLoadingZone(){
		this.loadingZone = {x: Math.floor(this.coordinates.x / this.map.size), y: Math.floor(this.coordinates.y / this.map.size)};
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

	tickMove(){}

	use(ent){
		if (this.cooldown) {
			setTimeout((tool, enti) => {tool.cooldown = true; if (tool.active){tool.use(enti)}}, this.maxCooldown, this, ent);
			this.functionality(ent);
			this.cooldown = false;
		}
	}
}


class PlaceholderItem{
	constructor(){}

	functionality(){}

	tickMove(){}

	use(){}

	activate(){}

	deactivate(){}
}
class Resource extends PlaceholderItem{
	constructor(amount = 1, type = "bullet"){
		super();
		this.amount = amount;
		this.type = type;
	}
}


class Particle{
	constructor(x = 0, y = 0, life = 12, hitbox = {x1: -40, x2: 0, y1: -20, y2: 20}, particleScreen = map){
		this.coordinates = {x: x, y: y};
		this.hitbox = hitbox;
		this.life = life;
		this.map = particleScreen;
		this.id = particleScreen.particles.push(this) - 1;
		this.particleId = -1;
		draw.startParticle(this);
		this.map.reloadParticleActiveList();
	}

	draw(){
		draw.particle(this);
	}

	tickMove(){
		this.age();
	}

	age(){
		if (this.life <= 0){
			//for (let a = this.id; a < this.map.particles.length - 1; a++){
			//	this.map.particles[a] = this.map.particles[a + 1];
			//}
			//this.map.particles.splice(this.map.particles.length - 1, 1);
			if (this.particleId !== -1){
				this.coordinates.bindedParticles[this.particleId] = undefined;
			}
			this.map.particles[this.id] = undefined;
			this.map.reloadParticleActiveList();
		}
		this.life--;
	}

	bind(parentEntity){
		this.coordinates = parentEntity;
		this.particleId = parentEntity.bindedParticles.push(this) - 1;
	}
}


class StatusEffect{
	constructor(entity, life = 500, perform = function(){
		this.effectTimer++;
		if (this.effectTimer >= this.damage.iFrame){
			this.damageEntity(this.owner);
			this.effectTimer = 0;
		}
		this.age();
	}, damage = {type: "fire", amount: 0.4, iFrame: 10}, id){
		this.id = entity.statusEffects.push(this) - 1;
		this.life = life;
		this.effectTimer = 0;
		this.owner = entity;
		this.damage = damage;
		this.perform = perform;
		this.effectId = id;
		this.owner.activeEffects[this.effectId] = true;
		this.damageSetter();
	}

	damageSetter(){
		if (this.damage.type === "generic"){
			this.damageEntity = function(ent){ent.damageGeneric(this.damage.amount, this);};
		} else if (this.damage.type === "piercing"){
			this.damageEntity = function(ent){ent.damagePiercing(this.damage.amount, this);};
		} else if (this.damage.type === "enemy"){
			this.damageEntity = function(ent){ent.damageEnemy(this.damage.amount, this);};
		} else if (this.damage.type === "playerGeneric"){
			this.damageEntity = function(ent){ent.damagePlayer(this.damage.amount, this);};
		} else if (this.damage.type === "fire"){
			this.damageEntity = function(ent){ent.damageFire(this.damage.amount, this);};
		}
	}

	age(){
		if (this.life <= 0){
			this.owner.statusEffects[this.id] = undefined;
			this.owner.activeEffects[this.effectId] = false;
		}
		this.life--;
	}

	particleAdder(){
		let a = new Particle(undefined, undefined, this.life, this.owner.hitbox);
		a.bind(this.owner);
		a.draw = function(){draw.fire(this);};
		a.fireStage = 0;
		a.tickMove = function(){
			this.age();
			this.fireStage += 0.1;
		}
	}
}


class Entity{//создаёт сущность с параметрами, хитбокс - это смещение относительно координат тела
	constructor(x = 100, y = 100, hp = 10, defence = 0, hitbox = {x1: -10, x2: 10, y1: -10, y2: 10}, entityScreen = map, life = 5000){
		this.x = x;
		this.y = y;
		this.life = life;
		this.map = entityScreen;
		this.loadingZone = {x: Math.floor(this.x / this.map.size), y: Math.floor(this.y / this.map.size)};
		this.hitbox = hitbox;
		this.hitbox.additional = [];
		this.hp = hp;
		this.maxHp = hp;
		this.defence = defence;
		this.id = this.map.entityList.push(this) - 1;
		this.bindedHitboxes = [];
		this.bindedParticles = [];
		this.statusEffects = [];
		this.activeEffects = [];
		this.inventory = {mainhand: [], hotbar: []};
		this.zoneId = this.map.entityZones[this.loadingZone.x][this.loadingZone.y].push(this) - 1;
		this.enemyDamageMultiplier = 1;
		this.playerDamageMultiplier = 1;
		this.map.reloadEntityActiveList();
	}

	draw(){
		draw.entity(this);
	}

	tickMove(){
		this.tickPlaceholderMain();
		this.tickPlaceholder1();
		this.tickPlaceholder2();
		this.tickPlaceholder3();
	}

	tickPlaceholderMain(){
		this.effectTick();
	}

	tickPlaceholder1(){
	}

	tickPlaceholder2(){
	}
	
	tickPlaceholder3(){
	}

	increasedHitbox(scale){
		let a = this.hitbox;
		a.x1 *= scale;
		a.x2 *= scale;
		a.y1 *= scale;
		a.y2 *= scale;
		return a;
	}
	
	effectTick(){
		for (let a = 0; a < this.statusEffects.length; a++){
			if (this.statusEffects[a] === undefined){continue;}
			this.statusEffects[a].perform();
		}
	}

	tp(x = 0, y = 0){
		this.x = x;
		this.y = y;
	}

	movePlaceholder1(){}

	move(x = 0, y = 0){
		if (this.overlap(x, y)){
			this.x += x;
			this.y += y;
		} else {
			this.contact({x: x, y: y});
		}
		this.reloadEntityZone();
		this.movePlaceholder1();
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
		this.movePlaceholder1();
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
		this.movePlaceholder1();
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

	damageFire(dmg){
		this.hp -= dmg;
		this.checkDeath();
	}
	
	checkDeath(){
		if (this.hp <= 0 && this.hp > -1000){
			this.map.entityList[this.id] = undefined;
			this.map.entityZones[this.loadingZone.x][this.loadingZone.y][this.zoneId] = undefined;
			for (let a = 0; a < this.bindedHitboxes.length; a++){
				if(this.bindedHitboxes[a] === undefined){continue}
				this.bindedHitboxes[a].remove();
			}
			for (let a = 0; a < this.bindedParticles.length; a++){
				if(this.bindedParticles[a] === undefined){continue}
				this.bindedParticles[a].life = 0;
			}
			this.map.reloadEntityActiveList();
			this.deathPlaceholder1();
		}
	}

	deathPlaceholder1(){}

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
		for (let a = 0; a < collisionZone.length; a++){
			let x1 = this.x + this.hitbox.x1 + xshift;
			let x2 = this.x + this.hitbox.x2 + xshift;
			let y1 = this.y + this.hitbox.y1 + yshift;
			let y2 = this.y + this.hitbox.y2 + yshift;
			if (collisionZone[a] === undefined || collisionZone[a].fake){
				continue;
			}
			let objectX1 = collisionZone[a].hitbox.x1 + collisionZone[a].x;
			let objectY1 = collisionZone[a].hitbox.y1 + collisionZone[a].y;
			let objectX2 = collisionZone[a].hitbox.x2 + collisionZone[a].x;
			let objectY2 = collisionZone[a].hitbox.y2 + collisionZone[a].y;
			if (x2 > objectX1 && x1 < objectX2 && y2 > objectY1 && y1 < objectY2){
				return false;
			} else {
				for (let b = 0; b < this.hitbox.additional.length; b++){//add-main
					x1 = this.x + this.hitbox.additional[b].x1 + xshift;
					x2 = this.x + this.hitbox.additional[b].x2 + xshift;
					y1 = this.y + this.hitbox.additional[b].y1 + yshift;
					y2 = this.y + this.hitbox.additional[b].y2 + yshift;
					if (x2 > objectX1 && x1 < objectX2 && y2 > objectY1 && y1 < objectY2) {
						return false;
					}
				}
			}
		}
		return true;
	}

	overlapAnyway(xshift = 0, yshift = 0){
		let collisionZone = this.map.loadingZones[this.loadingZone.x][this.loadingZone.y];
		for (let a = 0; a < collisionZone.length; a++){
			let x1 = this.x + this.hitbox.x1 + xshift;
			let x2 = this.x + this.hitbox.x2 + xshift;
			let y1 = this.y + this.hitbox.y1 + yshift;
			let y2 = this.y + this.hitbox.y2 + yshift;
			if (collisionZone[a] === undefined){
				continue;
			}
			let objectX1 = collisionZone[a].hitbox.x1 + collisionZone[a].x;
			let objectY1 = collisionZone[a].hitbox.y1 + collisionZone[a].y;
			let objectX2 = collisionZone[a].hitbox.x2 + collisionZone[a].x;
			let objectY2 = collisionZone[a].hitbox.y2 + collisionZone[a].y;
			if (x2 > objectX1 && x1 < objectX2 && y2 > objectY1 && y1 < objectY2){
				return false;
			} else {
				for (let b = 0; b < this.hitbox.additional.length; b++){//add-main
					x1 = this.x + this.hitbox.additional[b].x1 + xshift;
					x2 = this.x + this.hitbox.additional[b].x2 + xshift;
					y1 = this.y + this.hitbox.additional[b].y1 + yshift;
					y2 = this.y + this.hitbox.additional[b].y2 + yshift;
					if (x2 > objectX1 && x1 < objectX2 && y2 > objectY1 && y1 < objectY2) {
						return false;
					}
				}
			}
		}
		return true;
	}
	
	overlapList(){
		let collisionZone = this.map.loadingZones[this.loadingZone.x][this.loadingZone.y];
		let collisionList = [];
		for (let a = 0; a < collisionZone.length; a++){
			let x1 = this.x + this.hitbox.x1;
			let x2 = this.x + this.hitbox.x2;
			let y1 = this.y + this.hitbox.y1;
			let y2 = this.y + this.hitbox.y2;
			if (collisionZone[a] === undefined || collisionZone[a].fake){
				continue;
			}
			let objectX1 = collisionZone[a].hitbox.x1 + collisionZone[a].x;
			let objectY1 = collisionZone[a].hitbox.y1 + collisionZone[a].y;
			let objectX2 = collisionZone[a].hitbox.x2 + collisionZone[a].x;
			let objectY2 = collisionZone[a].hitbox.y2 + collisionZone[a].y;
			if (x2 > objectX1 && x1 < objectX2 && y2 > objectY1 && y1 < objectY2) {//main-main
				collisionList.push(collisionZone[a]);
			} else {
				for (let b = 0; b < this.hitbox.additional.length; b++){//add-main
					x1 = this.x + this.hitbox.additional[b].x1;
					x2 = this.x + this.hitbox.additional[b].x2;
					y1 = this.y + this.hitbox.additional[b].y1;
					y2 = this.y + this.hitbox.additional[b].y2;
					if (x2 > objectX1 && x1 < objectX2 && y2 > objectY1 && y1 < objectY2) {
						collisionList.push(collisionZone[a]);
						break;
					}
				}
			}
		}
		return collisionList;
	}
	
	reloadEntityZone(){
		if (Math.floor(this.x / this.map.size) != this.loadingZone.x || Math.floor(this.y / this.map.size) != this.loadingZone.y){
			this.map.entityZones[this.loadingZone.x][this.loadingZone.y][this.zoneId] = undefined;
			this.loadingZone = {x: Math.floor(this.x / this.map.size), y: Math.floor(this.y / this.map.size)};
			this.zoneId = this.map.entityZones[this.loadingZone.x][this.loadingZone.y].push(this) - 1;
			for (let a = 0; a < this.bindedHitboxes.length; a++){
				this.bindedHitboxes[a].reloadLoadingZone();
			}
		}
	}

	removeProjection(){
		this.map.entityZones[this.loadingZone.x][this.loadingZone.y][this.zoneId] = undefined;
		this.zoneId = 0;
		this.reloadEntityZone = function (){
			if (Math.floor(this.x / this.map.size) != this.loadingZone.x || Math.floor(this.y / this.map.size) != this.loadingZone.y){
				this.loadingZone = {x: Math.floor(this.x / this.map.size), y: Math.floor(this.y / this.map.size)};
				for (let a = 0; a < this.bindedHitboxes.length; a++){
					this.bindedHitboxes[a].reloadLoadingZone();
				}
			}
		}
	}
}


class ObjectHitbox{
	constructor(x1 = 20, x2 = 50, y1 = 0, y2 = 10, isFake = false, x = undefined, y = undefined, objectScreen = map){
		if (x === undefined || y === undefined){
			this.x = (x1 + x2) / 2;
			this.y = (y1 + y2) / 2;
		} else {
			this.x = x;
			this.y = y;
		}
		this.hitbox = {x1: x1 - this.x, x2: x2 - this.x, y1: y1 - this.y, y2: y2 - this.y, additional: []};
		this.map = objectScreen;
		this.fake = isFake;
		this.loadingZone = {x: Math.floor(this.x / this.map.size), y: Math.floor(this.y / this.map.size)};
		let minRange = this.map.size / 10;
		let maxRange = this.map.size / 10 * 9;
		let xRangeMin = x1 - this.loadingZone.x * this.map.size;
		let xRangeMax = x2 - this.loadingZone.x * this.map.size;
		let yRangeMin = y1 - this.loadingZone.y * this.map.size;
		let yRangeMax = y2 - this.loadingZone.y * this.map.size;
		this.appearances = [];
		this.listAppearance(this.loadingZone.x, this.loadingZone.y, this.map.loadingZones[this.loadingZone.x][this.loadingZone.y].push(this) - 1);//создаёт дополнительные хитбоксы в соседних ячейках, если необходимо
		if (xRangeMin < minRange){
			this.listAppearance(this.loadingZone.x - 1, this.loadingZone.y, this.map.loadingZones[this.loadingZone.x - 1][this.loadingZone.y].push(this) - 1);
			if (yRangeMin < minRange){
				this.listAppearance(this.loadingZone.x - 1, this.loadingZone.y - 1, this.map.loadingZones[this.loadingZone.x - 1][this.loadingZone.y - 1].push(this) - 1);
			}
		}
		if (yRangeMax > maxRange){
			this.listAppearance(this.loadingZone.x, this.loadingZone.y + 1, this.map.loadingZones[this.loadingZone.x][this.loadingZone.y + 1].push(this) - 1);
			if (xRangeMin < minRange){
				this.listAppearance(this.loadingZone.x - 1, this.loadingZone.y + 1, this.map.loadingZones[this.loadingZone.x - 1][this.loadingZone.y + 1].push(this) - 1);
			}
		}
		if (xRangeMax > maxRange){
			this.listAppearance(this.loadingZone.x + 1, this.loadingZone.y, this.map.loadingZones[this.loadingZone.x + 1][this.loadingZone.y].push(this) - 1);
			if (yRangeMax > maxRange){
				this.listAppearance(this.loadingZone.x + 1, this.loadingZone.y + 1, this.map.loadingZones[this.loadingZone.x + 1][this.loadingZone.y + 1].push(this) - 1);
			}
		}
		if (yRangeMin < minRange){
			this.listAppearance(this.loadingZone.x, this.loadingZone.y - 1, this.map.loadingZones[this.loadingZone.x][this.loadingZone.y - 1].push(this) - 1);
			if (xRangeMax > maxRange){
				this.listAppearance(this.loadingZone.x + 1, this.loadingZone.y - 1, this.map.loadingZones[this.loadingZone.x + 1][this.loadingZone.y - 1].push(this) - 1);
			}
		}
	}

	draw(){
		draw.object(this);
	}

	increasedHitbox(scale){
		let a = this.hitbox;
		a.x1 *= scale;
		a.x2 *= scale;
		a.y1 *= scale;
		a.y2 *= scale;
		return a;
	}

	remove(){
		for (let a = 0; a < this.appearances.length; a++){
			this.map.loadingZones[this.appearances[a].x][this.appearances[a].y][this.appearances[a].id] = undefined;
		}
		this.deathPlaceholder1();
	}

	deathPlaceholder1(){
		let a = new Box(this.x, this.y, this.increasedHitbox(1.1));
		a.tickPlaceholderMain = function(){
			let a = this.contactAnyway();
			for (let b = 0; b < a.length; b++){
				a[b].fake = false;
			}
			this.remove();
		}
		a.tickMove();
	}

	listAppearance(x, y, id){
		this.appearances.push({x: x, y: y, id: id});
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
		this.activeInterfaces = [];
		this.loadedZone = {x: 0, y: 0};
		for (let column = -1; column < height + 2; column++) {
			this.loadingZones[column] = [];
			for (let row = -1; row < width + 2; row++) {
				this.loadingZones[column][row] = [];
			}
		}
		this.entityZones = [];
		for (let column = -1; column < height + 2; column++) {
			this.entityZones[column] = [];
			for (let row = -1; row < width + 2; row++) {
				this.entityZones[column][row] = [];
			}
		}
	}
	
	drawEverything(){
		draw.backgroundDrg(this);
		for (let a = 0; a < this.entityListActive.length; a++){
			this.entityList[this.entityListActive[a]].draw();
		}
		let zonesToLoad = [
			{x: -1, y: -1}, {x: 0, y: -1}, {x: 1, y: -1}, {x: -1, y: 0}, {x: 0, y: 0}, {x: 1, y: 0}, {x: -1, y: 1}, {x: 0, y: 1}, {x: 1, y: 1}
		];
		for (let b = 0; b < zonesToLoad.length; b++){
			for (let a = 0; a < this.loadingZones[this.loadedZone.x + zonesToLoad[b].x][this.loadedZone.y + zonesToLoad[b].y].length; a++){
				let loadZone = this.loadingZones[this.loadedZone.x + zonesToLoad[b].x][this.loadedZone.y + zonesToLoad[b].y][a];
				if (loadZone === undefined){continue}
				loadZone.draw();
			}
		}
		for (let a = 0; a < this.particleListActive.length; a++){
			this.particles[this.particleListActive[a]].draw();
		}
		for (let a = 0; a < this.boxListActive.length; a++){
			this.boxList[this.boxListActive[a]].draw();
		}
		for (let a = 0; a < this.activeInterfaces.length; a++){
			if (this.activeInterfaces[a] === undefined){continue}
			this.activeInterfaces[a].draw();
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

	manageCursor(x, y){
		for (let a = 0; a < this.activeInterfaces.length; a++){
			if (this.activeInterfaces[a] === undefined){continue}
			this.activeInterfaces[a].moveCursor(x, y);
		}
	}

	manageClick(){
		for (let a = 0; a < this.activeInterfaces.length; a++){
			if (this.activeInterfaces[a] === undefined){continue}
			this.activeInterfaces[a].click();
		}
	}

	xshift(){
    	//return -this.loadedZone.x * this.size; //camera switches between screens
		//return -player.x + this.size / 2; //camera attached to the player
		return player.xshift;
	}

	yshift(){
    	//return -this.loadedZone.y * this.size;
		//return -player.y + this.size / 2;
		return player.yshift;
	}
}


class Interface{
	constructor(x1 = 100, x2 = 500, y1 = 200, y2 = 400){
		this.cursor = {x: 0, y: 0};
		this.elements = [];
		this.createBackground(x1, x2, y1, y2);
		this.focus = this.elements[0];
		this.moveCursor(x1 + 1, y1 + 1);
	}
	
	draw(){
		for (let a = 0; a < this.elements.length; a++){
			this.elements[a].draw();
		}
	}

	moveCursor(x, y){
		this.cursor.x = x;
		this.cursor.y = y;
		for (let a = 0; a < this.elements.length; a++){
			let elem = this.elements[a].hitbox;
			if (this.cursor.x > elem.x1 && this.cursor.x < elem.x2 && this.cursor.y > elem.y1 && this.cursor.y < elem.y2){
				this.focus.active = false;
				this.focus = this.elements[a];
				this.focus.active = true;
			}
		}
	}

	click(){
		this.focus.functionality();
	}

	createBackground(x1, x2, y1, y2){
		let a = new InterfaceElement(this, x1, x2, y1, y2);
		a.drawActive = function(){
			draw.placeholderInterfaceBackground(this);
		}
		a.drawUnactive = a.drawActive;
	}
}
class InterfaceElement{
	constructor(parentInterface, x1, x2, y1, y2){
		parentInterface.elements.push(this);
		this.parentInterface = parentInterface;
		this.hitbox = {x1: x1, x2: x2, y1: y1, y2: y2};
		this.active = false;
	}

	draw(){
		if (this.active){
			this.drawActive();
		} else {
			this.drawUnactive();
		}
	}

	drawActive(){}

	drawUnactive(){}

	functionality(){
		console.log("click");
	}
}


class DevKit{
	constructor(){}

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

	worldBorder(){
		for (let a = 0; a < map.fieldWidth; a++){
			new ObjectHitbox(a * map.size, (a + 1) * map.size, -30, 0);
			new ObjectHitbox(a * map.size, (a + 1) * map.size, map.size * map.fieldHeight, map.size * map.fieldHeight + 30);
		}
		for (let a = 0; a < map.fieldHeight; a++){
			new ObjectHitbox(-30, 0, a * map.size, (a + 1) * map.size);
			new ObjectHitbox(map.size * map.fieldWidth, map.size * map.fieldWidth + 30, a * map.size, (a + 1) * map.size);
		}
	}
}