class Glyphid extends Entity{
    constructor(size, hp, damage, defence){
        super(0, 0, hp, defence, {x1: -1 * size, x2: size, y1: -1 * size, y2: size, additional: []}, player.map);
        while (true){
            this.x = Math.floor(Math.random() * player.map.size * player.map.fieldHeight);
            this.y = Math.floor(Math.random() * player.map.size * player.map.fieldHeight);
            this.reloadEntityZone();
            if (this.overlapAnyway()){
                break;
            } else {
                this.x = Math.floor(Math.random() * player.map.size * player.map.fieldHeight);
                this.y = Math.floor(Math.random() * player.map.size * player.map.fieldHeight);
            }
        }
        this.box = new Box( undefined, undefined, this.hitbox, {type: "enemy", amount: damage, iFrame: 3000});
        this.box.bind(this);
        this.speed = 1;
        this.box.tickMove = function(){
            let list = this.touch();
            this.enableDamage(list);
            this.age();
		    for(let a = 0; a < list.length; a++){
			    let unTouched = true;
				if (list[a] === this.coordinates){
    			    unTouched = false;
                }
			    if (unTouched){
                    this.coordinates.moveToGoal(list[a].x, list[a].y, -1);
			    }
		    }
        }
        this.enemyDamageMultiplier = 0;
        this.isPraetorian = false;
    }

    tickPlaceholder1(){
        this.moveToGoal(player.x, player.y, this.speed);
        this.side = (player.x - this.x) / Math.abs(player.x - this.x);
    }
}


class Grunt extends Glyphid{
    constructor(){
        super(10, 10, 2, 20);
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
            let list = this.touch();
            this.enableDamage(list);
            this.age();
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
    constructor(gunner, damage, goal){
        super(gunner.x, gunner.y + magicConstant1, -1000, 1000000, {x1: -5, x2: 5, y1: -5, y2: 5}, gunner.map);
        this.box = new Box(undefined, undefined, this.hitbox, damage);
        this.speed = 30;
        this.damage = damage;//doesn't affect real damage number
        this.goal = goal;
        this.box.bind(this);
        this.box.damagePlaceholderFunction = function(damaged){if (damaged != player){this.coordinates.kill();}};
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
            //if (damaged != player){
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
        this.sprite.src = "Flamethrower.png";
        this.toolIcon.src = "Fire.png";
    }    
}


class caveGenerator{
    constructor(x1, y1, x2, y2, size = 20, roomAmount = 4, maP = map){
        this.rooms = [];
        this.boundary = {x1: x1 * size, x2: x2 * size, y1: y1 * size, y2: y2 * size};
        for (let a = 0; a < x2 - x1; a++){
            for (let b = 0; b < y2 - y1; b++){
                new ObjectHitbox(a * size, (a + 1) * size, b * size, (b + 1) * size, true, undefined, undefined, maP);
            }
        }
        for (let a = 0; a < roomAmount; a++){
            this.roomCreator();
        }
        let a = new Breaker(player.x, player.y, {x1: -80, x2: 80, y1: -80, y2: 80});
        a.bind(player);
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

    roomCreator(scaling = 600){
        while (true){
            let rand1 = Math.random() * scaling ** 2 + 10000;
            let rand2 = Math.random() * scaling ** 2 + 10000;
            let xSize = Math.floor(Math.sqrt(Math.abs(rand1)));
            let ySize = Math.floor(Math.sqrt(Math.abs(rand2)));
            let x = this.boundary.x1 + xSize / 2 + Math.floor(Math.random() * (this.boundary.x2 - this.boundary.x1 - xSize));
            let y = this.boundary.y1 + ySize / 2 + Math.floor(Math.random() * (this.boundary.y2 - this.boundary.y1 - ySize));
            let hitbox = {x1: -xSize / 2, y1: -ySize / 2, x2: xSize / 2, y2: ySize / 2};
            if (this.roomOverlap(hitbox, x, y)){
                new Breaker(x, y, hitbox);
                this.rooms.push({box: hitbox, x: x, y: y});
                break;
            } else {
                continue;
            }
        }
    }
}