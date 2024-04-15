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


class Glyphid extends Entity{
    constructor(size, hp, damage, defence, x = 0, y = 0){
        super(x, y, hp, defence, {x1: -1 * size, x2: size, y1: -1 * size, y2: size, additional: []}, map);
        /*while (true){
            this.x = Math.floor(Math.random() * map.size * map.fieldHeight);
            this.y = Math.floor(Math.random() * map.size * map.fieldHeight);
            this.reloadEntityZone();
            if (this.overlapAnyway() && euclidianDistance(this.x, this.y, immediateApi.getPlayer().x, immediateApi.getPlayer().y) > immediateApi.getPlayer().map.size * 2 && euclidianDistance(this.x, this.y, immediateApi.getPlayer().x, immediateApi.getPlayer().y) < immediateApi.getPlayer().map.size * 4){
                break;
            }
        }*/
        this.box = new MeleeAttackHitbox(this, this.scaledHitbox(2), {type: "enemy", amount: damage, iFrame: 3000}, 400, 600);
        this.speed = 1;
		this.mainAggro = this.pickAggro();
        this.aggro = this.mainAggro;
		this.posCheck = {x: this.x, y: this.y, time: 100};
        this.enemyDamageMultiplier = 0;
		this.glyphid = true;
        this.isPraetorian = false;
    }

    tickPlaceholder1(){
        this.moveToGoal(this.aggro.x, this.aggro.y, this.speed);
        this.side = (this.aggro.x - this.x) / Math.abs(this.aggro.x - this.x) + 0.00001;
    }

	pickAggro(){
		let minimumDist = 1000000;
		let minimum = 0;
		for (let a = 0; a < map.api.players.length; a++){
			if (minimumDist > euclidianDistance(this.x, this.y, map.api.players[a].x, map.api.players[a].y)){
				minimumDist = euclidianDistance(this.x, this.y, map.api.players[a].x, map.api.players[a].y);
				minimum = a;
			}
		}
		return this.map.api.players[minimum];
	}

	minimalDistanceToPlayer(){
		let minimumDist = 1000000;
		for (let a = 0; a < map.api.players.length; a++){
			if (minimumDist > euclidianDistance(this.x, this.y, map.api.players[a].x, map.api.players[a].y)){
				minimumDist = euclidianDistance(this.x, this.y, map.api.players[a].x, map.api.players[a].y);
			}
		}
		return minimumDist;
	}

	repickAggro(){
		let dist = euclidianDistance(this.x, this.y, this.mainAggro, this.mainAggro);
		for (let a = 0; a < map.api.players.length; a++){
			if (dist > euclidianDistance(this.x, this.y, map.api.players[a].x, map.api.players[a].y) * 5){
				this.mainAggro = this.pickAggro();
				return
			}
		}
	}

	tickPlaceholder2(){
		this.posCheck.time--;
		if (this.posCheck.time === 0){
			this.repickAggro();
			this.planRoute();
			this.posCheck.time = 50;
			this.posCheck.x = this.x;
			this.posCheck.y = this.y;
		}
		if (euclidianDistance(this.x, this.y, this.aggro.x, this.aggro.y) < 10){
			if (this.aggro.distance === 0){
				this.aggro = this.mainAggro;
				this.onRoute = 0;
				return;
			}
			if (this.onRoute > 0){
				this.onRoute--;
				return;
			} else {
				this.onRoute = 5;
				this.posCheck.y = 0;
				this.posCheck.x = 0;
			}
			if (this.aggro.connections !== undefined){
				for (let a in this.aggro.connections){
					if (this.aggro.connections[a].distance < this.aggro.distance){
						this.aggro = this.aggro.connections[a];
						break;
					}
				}
			}
		}
	}

    deathPlaceholder1(){
        map.api.getPlayer().killCount++;
		this.deathPlaceholder2();
    }

    deathPlaceholder2(){}

    damagePlaceholder(dmg){
        for (let a = 0; a < dmg; a++){
            new BloodParticle(this);
        }
    }

	planRoute(){
		if (euclidianDistance(this.x, this.y, this.posCheck.x, this.posCheck.y) < this.speed * 20 && euclidianDistance(this.x, this.y, this.aggro.x, this.aggro.y) >= 40){
			this.aggro = baseBackend.locateClosest(this);
		}
	}

    shadowRealmSibasAttempt(){//TODO исправить референс на карту
        if (this.minimalDistanceToPlayer() > immediateApi.getPlayer().map.size * 2){
            this.mapTransfer(this.map.shadowRealm);
        }
    }
    shadowRealmReturnAttempt(){
        if (this.minimalDistanceToPlayer() <= immediateApi.getPlayer().map.size * 2){
            this.mapTransfer(this.map.backLink);
        }
    }
}
		   

class MeleeAttackHitbox extends Box{
    constructor(entity, hitbox, damage, speed, reloadSpeed){
        super(0, 0, hitbox, damage, -1000, entity.map);
        this.bind(entity);
        this.speed = speed;
        this.reloadSpeed = reloadSpeed;
        this.isAttacking = false;
    }

    tickPlaceholderMain(){
		let t = false;
		for (let a = 0; a < this.map.api.players; a++){
			if (this.touchSpecific(this.map.api.players[a])){
				t = true;
				break;
			}
		}
        if (t && !this.isAttacking){
            this.isAttacking = true;
            setTimeout(this.attack, this.speed, this);
            setTimeout(this.reload, this.speed + this.reloadSpeed, this);
        }
        let list = this.touch();
        for (let a = 0; a < list.length; a++){
		    let unTouched = true;
			if (list[a] === this.coordinates || list[a].isTechnical){
    		    unTouched = false;
            }
		    if (unTouched){
                this.coordinates.moveToGoal(list[a].x, list[a].y, -0.4);
		    }
		}
    }

    attack(obj){
        if (obj.coordinates.hp > 0){
            new Box(obj.coordinates.x, obj.coordinates.y, obj.hitbox, obj.damage, 2, obj.map);
            for (let a = 0; a < 4; a++){
                new BloodParticle(obj.coordinates);
            }
        }
    }

    reload(obj){
        obj.isAttacking = false;
    }
}


class Grunt extends Glyphid{
    constructor(x = 0, y = 0){
        super(10, 10, 5, 20, x, y);
    }

    draw(){
        draw.grunt(this);
    }
}


class Swarmer extends Glyphid{
    constructor(){
        super(6, 3, 1, 0);
    }

    draw(){
        draw.swarmer(this);
    }
}


class Praetorian extends Glyphid{
    constructor(){
        super(20, 30, 3, 100);
        this.isPraetorian = true;
        this.box.tickPlaceholderMain = function(){
			let t = false;
			for (let a = 0; a < this.map.api.players; a++){
				if (this.touchSpecific(this.map.api.players[a])){
					t = true;
					break;
				}
			}
            if (t && !this.isAttacking){
                this.isAttacking = true;
                setTimeout(this.attack, this.speed, this);
            }
            let list = this.touch();
            for(let a = 0; a < list.length; a++){
                let unTouched = true;
                if (list[a] === this.coordinates){
                    unTouched = false;
                }
                if (unTouched && list[a].isPraetorian){
                    this.coordinates.moveToGoal(list[a].x, list[a].y, -1);
                }
            }
        }
    }

    draw(){
        draw.praetorian(this);
    }
}


class Bullet extends Entity{
    constructor(gunner, damage, goal, hitboxMultiplier = 1){
        super(gunner.x, gunner.y + magicConstant1, -1000, 1000000, {x1: -5, x2: 5, y1: -5, y2: 5}, gunner.map);
        this.box = new Box(undefined, undefined, this.scaledHitbox(hitboxMultiplier), damage);
        this.speed = 30;
        this.damage = damage;//doesn't affect real damage number
        this.goal = goal;
        this.box.bind(this);
        this.box.damagePlaceholderFunction = function(damaged){
			for (let a = 0; a < this.map.api.players; a++){
				if (damaged == this.map.api.players[a]){
					return;
				}
			}
			this.coordinates.kill();
		};
        this.box.touchedEntities.push(gunner);
        this.removeProjection();
    }

    draw(){
        draw.bullet(this);
    }

    tickPlaceholder1(){
        this.moveToGoal(this.goal.x, this.goal.y, this.speed / 2);
        this.box.tickMove();
        this.moveToGoal(this.goal.x, this.goal.y, this.speed / 2);
    }

    contact(){
        this.kill();
    }
}


class Weapon extends Tool{
    constructor(dmg, bpm, functionality = function(ent){
        if (ent.ammunitionGetter("shell") > 0){
            let spread = spreadCounter(ent.mousePosition.x - ent.x - ent.map.xshift(), ent.mousePosition.y - ent.y - ent.map.yshift(), this.spread);
            let a = projections(spread.x, spread.y, ent.map.size * (ent.map.fieldWidth + ent.map.fieldHeight));
            new Bullet(ent, this.gunDamage, {x: ent.x + a.x, y: ent.y + a.y});
            ent.ammunitionDecreaser("shell", 1);
        }
    }, spread = 20){
        super(functionality);
        this.isStackable = false;
        this.gunDamage = {type: "playerGeneric", amount: dmg, iFrame: 3000};
        this.spread = spread;
        this.maxCooldown = 60000/bpm;
    }
}


class Flame extends Bullet{
    constructor(gunner, damage, goal){
        super(gunner, {type: "fire", amount: damage, iFrame: 10}, goal);
        this.speed = 10;
        this.life = 75;
        this.hitbox = {x1: -5, x2: 5, y1: -5, y2: 5, additional: []};
        this.fireStage = 0;
        this.box.damagePlaceholderFunction = function(damaged){
            //if (damaged != this.map.api.getPlayer()){
            //    this.coordinates.kill();
            //}
            if (!damaged.activeEffects[0]){
                let c = new StatusEffect(damaged, undefined, undefined, {type: "fire", amount: damage * 3, iFrame: 20}, 0);
                c.particleAdder();
            }
        }
    }

    draw(){
        draw.flame(this);
    }

    tickPlaceholder1(){
        this.moveToGoal(this.goal.x, this.goal.y, this.speed / 2);
        this.fireStage += 0.1;
        if (this.hitbox.x1 > -20){
            this.hitbox.x1 -= 0.5;
            this.hitbox.x2 += 0.5;
            this.hitbox.y1 -= 0.5;
            this.hitbox.y2 += 0.5;
            this.box.hitbox.x1 -= 0.5;
            this.box.hitbox.x2 += 0.5;
            this.box.hitbox.y1 -= 0.5;
            this.box.hitbox.y2 += 0.5;
        }
        this.age();
    }
}   


class Breaker extends Box{
    constructor(x = 5, y = 5, hitbox = {x1: -10, x2: 10, y1: -10, y2: 10}, life = 10){
        super(x, y, hitbox, undefined, life);
    }
    
    tickPlaceholderMain(){
        let b = this.contactAnyway();
        for (let a = 0; a < b.length; a++){
            b[a].remove();
        }
        this.age();
    }
}


class Missile extends Bullet{
    constructor(gunner, damage, goal){
        super(gunner, damage, goal);
        this.speedVectoring = {x: Math.floor(Math.random() * 200 - 100) / 10, y: Math.floor(Math.random() * 200 - 100) / 10};
        this.acceleration = 2;
        this.maxSpeed = 20;
        this.life = 1000;
        this.gunner = gunner;
        this.rocketId = gunner.rockets.push(this) - 1;
        gunner.refreshRocketList();
    }

    tickPlaceholder1(){
        this.age();
        if (this.speedVectoring.x ** 2 + this.speedVectoring.y ** 2 > this.maxSpeed ** 2){
            this.speedVectoring = projections(this.speedVectoring.x, this.speedVectoring.y, this.maxSpeed);
            this.box.tickMove();
            this.speedVectoring = projections(this.speedVectoring.x, this.speedVectoring.y, this.maxSpeed);
        }
        this.move(this.speedVectoring.x, this.speedVectoring.y);
        this.moveToGoal(this.goal.x, this.goal.y, this.maxSpeed / 4);
        let xDistance = this.goal.x - this.x;
        let yDistance = this.goal.y - this.y;
        let accProjections = projections(xDistance, yDistance, this.acceleration);
        this.speedVectoring.x += accProjections.x;
        this.speedVectoring.y += accProjections.y;
    }

    deathPlaceholder1(){
        let a = new Box(this.x, this.y, {x1: -30, x2: 30, y1: -30, y2: 30}, {type: "playerGeneric", amount: this.damage.amount * 100, iFrame: 3000}, 5);
        a.fireStage = 0;
        a.draw = function(){
            draw.fire(this);
        }
        this.gunner.rockets[this.rocketId] = undefined;
        this.gunner.refreshRocketList();
    }
}


class Flamethrower extends Weapon{
    constructor(dmg, bpm){
        super(dmg / 2, bpm, function(ent){
            if (ent.ammunitionGetter("flame") > 0){
                let a = projections((ent.mousePosition.x - ent.x - ent.map.xshift()), (ent.mousePosition.y - ent.y - ent.map.yshift()), ent.map.size * (ent.map.fieldWidth + ent.map.fieldHeight));
                new Flame(ent, this.gunDamage.amount, {x: ent.x + a.x, y: ent.y + a.y});
                ent.ammunitionDecreaser("flame", 1);
            }
        });
        this.sprite.src = "textures/Flamethrower.png";
        this.toolIcon.src = "textures/Fire.png";
    }    
}


class CaveGenerator{
    constructor(x1, y1, x2, y2, size = 20, roomAmount = 4, maP = map){
        this.rooms = [];
        this.roomsWithoutTunnels = [];
        this.roomsWithTunnels = [];
        this.boundary = {x1: x1 * size, x2: x2 * size, y1: y1 * size, y2: y2 * size};
        for (let a = 0; a < x2 - x1; a++){//creates theRock
            for (let b = 0; b < y2 - y1; b++){
                new ObjectHitbox(a * size, (a + 1) * size, b * size, (b + 1) * size, true, undefined, undefined, maP);
            }
        }
        for (let a = 0; a < roomAmount; a++){
            this.roomCreator();
        }
        this.roomsWithTunnels.push(this.roomsWithoutTunnels[0]);
        this.roomsWithoutTunnels.splice(0, 1);
        while (this.roomsWithoutTunnels.length > 0){
            let range = {x1: maP.fieldHeight * maP.size + maP.fieldWidth * maP.size, y1: maP.fieldHeight * maP.size + maP.fieldWidth * maP.size, x2: 0, y2: 0};
            for (let b = 0; b < this.roomsWithTunnels.length; b++){
                for (let c = 0; c < this.roomsWithoutTunnels.length; c++){
                    let distance = euclidianDistance(this.roomsWithTunnels[b].x, this.roomsWithTunnels[b].y, this.roomsWithoutTunnels[c].x, this.roomsWithoutTunnels[c].y);
                    if (euclidianDistance(range.x1, range.y1, range.x2, range.y2) > distance){
                        range = {x1: this.roomsWithTunnels[b].x, y1: this.roomsWithTunnels[b].y, x2: this.roomsWithoutTunnels[c].x, y2: this.roomsWithoutTunnels[c].y, outerId: c};
                    }
                }
            }
            this.tunnelBore(range);
            this.roomsWithTunnels.push(this.roomsWithoutTunnels[range.outerId]);
            this.roomsWithoutTunnels.splice(range.outerId, 1);
        }
        this.map.api.getPlayer().tp(this.rooms[0].x, this.rooms[0].y);
        //let a = new Breaker(this.map.api.getPlayer().x, this.map.api.getPlayer().y, {x1: -80, x2: 80, y1: -80, y2: 80});
        //a.bind(this.map.api.getPlayer());
    }

    roomOverlap(hitbox, x, y){
        for (let a = 0; a < this.rooms.length; a++){
			let x1 = x + hitbox.x1;
			let x2 = x + hitbox.x2;
			let y1 = y + hitbox.y1;
			let y2 = y + hitbox.y2;
			if (this.rooms[a] === undefined){
				continue;
			}
			let objectX1 = this.rooms[a].x + this.rooms[a].box.x1 * 1.2;
			let objectY1 = this.rooms[a].y + this.rooms[a].box.y1 * 1.2;
			let objectX2 = this.rooms[a].x + this.rooms[a].box.x2 * 1.2;
			let objectY2 = this.rooms[a].y + this.rooms[a].box.y2 * 1.2;
			if (x2 > objectX1 && x1 < objectX2 && y2 > objectY1 && y1 < objectY2){
				return false;
			}
        }
        return true;
    }

    roomCreator(obj = this, scaling = 600){//
        for (let s = 0; s < 100; s++){
            let rand1 = Math.random() * scaling ** 2 + 10000;
            let rand2 = Math.random() * scaling ** 2 + 10000;
            let xSize = Math.floor(Math.sqrt(Math.abs(rand1)));
            let ySize = Math.floor(Math.sqrt(Math.abs(rand2)));
            let x = obj.boundary.x1 + xSize / 2 + Math.floor(Math.random() * (obj.boundary.x2 - obj.boundary.x1 - xSize));
            let y = obj.boundary.y1 + ySize / 2 + Math.floor(Math.random() * (obj.boundary.y2 - obj.boundary.y1 - ySize));
            let hitbox = {x1: -xSize / 2, y1: -ySize / 2, x2: xSize / 2, y2: ySize / 2};
            if (obj.roomOverlap(hitbox, x, y)){
                let zonesToLoad = [
                    {x: -1, y: -1}, {x: 0, y: -1}, {x: 1, y: -1}, {x: -1, y: 0}, {x: 0, y: 0}, {x: 1, y: 0}, {x: -1, y: 1}, {x: 0, y: 1}, {x: 1, y: 1}
                ];
                let a = new Breaker(x, y, hitbox, 10);
                for (let b = 0; b < zonesToLoad.length; b++){
                    a.loadingZone.x += zonesToLoad[b].x;
                    a.loadingZone.y += zonesToLoad[b].y;
                    a.tickMove();
                    a.loadingZone.x -= zonesToLoad[b].x;
                    a.loadingZone.y -= zonesToLoad[b].y;
                }
                a.tickMove();
                obj.rooms.push({box: hitbox, x: x, y: y});
                obj.roomsWithoutTunnels.push({box: hitbox, x: x, y: y});
                for (let shift = 0; shift < 5; shift++){
                    let size = Math.floor(Math.sqrt(Math.abs(Math.random() * (xSize / 3) ** 2)));
                    let hitbox2 = {x1: -size / 2, x2: size / 2, y1: -size / 2, y2: size / 2};
                    new Breaker(x + hitbox.x1 + shift * xSize / 5, y + hitbox.y1, hitbox2, 2);
                    size = Math.floor(Math.sqrt(Math.abs(Math.random() * (xSize / 5) ** 2)));
                    hitbox2 = {x1: -size / 2, x2: size / 2, y1: -size / 2, y2: size / 2};
                    new Breaker(x + hitbox.x1 + shift * xSize / 5, y + hitbox.y2, hitbox2, 2);
                    size = Math.floor(Math.sqrt(Math.abs(Math.random() * (xSize / 5) ** 2)));
                    hitbox2 = {x1: -size / 2, x2: size / 2, y1: -size / 2, y2: size / 2};
                    new Breaker(x + hitbox.x1, y + hitbox.y1 + shift * ySize / 5, hitbox2, 2);
                    size = Math.floor(Math.sqrt(Math.abs(Math.random() * (xSize / 5) ** 2)));
                    hitbox2 = {x1: -size / 2, x2: size / 2, y1: -size / 2, y2: size / 2};
                    new Breaker(x + hitbox.x2, y + hitbox.y1 + shift * ySize / 5, hitbox2, 2);
                }
                break;
            } else {
                continue;
            }
        }
    }

    tunnelBore(range, size = 60){
        let d = new Breaker(range.x1, range.y1, {x1: -size/2, x2: size/2, y1: -size/2, y2: size/2}, 100000);
        while (euclidianDistance(d.coordinates.x, d.coordinates.y, range.x2, range.y2) > 20){
            d.moveToGoal(range.x2, range.y2, 15);
            d.tickMove();
        }
        d.remove();
        console.log("room achieved");
    }
}


class WeaponEditor extends ObjectHitbox{
    constructor(x, y){
        super(x - 10, x + 10, y - 10, y + 10);
        this.boundInterface = this;
        this.interactive = true;
        this.active = false;
        this.interact = function(owner){
            if (!owner.activeInterfaces[0]){
                owner.activeInterfaces[0] = true;
                owner.inventoryId = owner.map.activeInterfaces.push(owner.inventory) - 1;
            } else {
                owner.activeInterfaces[0] = false;
                owner.map.activeInterfaces[owner.inventoryId] = undefined;
            }
            if (!this.active && this.map.api.getPlayer().inventory.mainhand[0].modificationInterface != undefined){
                this.active = true;
                owner.inventory.shiftAll(0, 100);
                owner.weaponEditId = owner.map.activeInterfaces.push(this.map.api.getPlayer().inventory.mainhand[0].modificationInterface) - 1;
                this.map.api.getPlayer().speedMultipliers[0] = 0;
            } else if (!this.active){
            } else {
                this.active = false;
                owner.inventory.shiftAll(0, -100);
                owner.map.activeInterfaces[owner.weaponEditId] = undefined;
                this.map.api.getPlayer().speedMultipliers[0] = 1;
            }
        }
    }
}


class BloodParticle extends Particle{
    constructor(ent){
        super(ent.x, ent.y, 50, {x1: -2, x2: 2, y1: -2, y2: 2}, ent.map);
        this.speedVectoring = {x: Math.random() * ent.hitbox.x1 * 0.2 - ent.hitbox.x1 * 0.1, y: Math.random() * ent.hitbox.x1 * 0.2 - ent.hitbox.x1 * 0.1};
        this.accVectoring = {x: this.speedVectoring.x / 50, y: this.speedVectoring.y / 50};
    }

    tickPlaceholderMain(){
        this.move(this.speedVectoring.x, this.speedVectoring.y);
        this.speedVectoring.x -= this.accVectoring.x;
        this.speedVectoring.y -= this.accVectoring.y;
    }

    draw(){
        draw.bloodParticle(this);
    }
}


class EletroParticle extends Particle{
    constructor(block){
        super(block.x, block.y, 20, {x1: -1, x2: 1, y1: -1, y2: 1}, block.map);
        this.speedVectoring = {x: Math.random() * block.hitbox.x1 * 0.4 - block.hitbox.x1 * 0.2, y: Math.random() * block.hitbox.x1 * 0.4 - block.hitbox.x1 * 0.2};
        this.accVectoring = {x: this.speedVectoring.x / 50, y: this.speedVectoring.y / 50};
    }

    tickPlaceholderMain(){
        this.move(this.speedVectoring.x, this.speedVectoring.y);
        this.speedVectoring.x -= this.accVectoring.x;
        this.speedVectoring.y -= this.accVectoring.y;
    }

    draw(){
        draw.electroParticle(this);
    }
}


/*module.exports.Glyphid = Glyphid;
module.exports.MeleeAttackHitbox = MeleeAttackHitbox;
module.exports.Grunt = Grunt;
module.exports.Swarmer = Swarmer;
module.exports.Praetorian = Praetorian;
module.exports.Bullet = Bullet;
module.exports.Weapon = Weapon;
module.exports.Flame = Flame;
module.exports.Breaker = Breaker;
module.exports.Missile = Missile;
module.exports.Flamethrower = Flamethrower;
module.exports.CaveGenerator = CaveGenerator;
module.exports.WeaponEditor = WeaponEditor;
module.exports.BloodParticle = BloodParticle;
module.exports.EletroParticle = EletroParticle;*/
//export {Glyphid, MeleeAttackHitbox, Grunt, Swarmer, Praetorian, Bullet, Weapon, Flame, Breaker, Missile, Flamethrower, CaveGenerator, WeaponEditor, BloodParticle, EletroParticle};