class Glyphid extends Entity{
    constructor(size, hp, damage, defence){
        super(Math.floor(Math.random() * 600) + 600, Math.floor(Math.random() * 600), hp, defence, {x1: -1 * size, x2: size, y1: -1 * size, y2: size, additional: []}, player.map);
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
        super(gunner.x, gunner.y, -1000, 1000000, {x1: -5, x2: 5, y1: -5, y2: 5}, gunner.map);
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
        let spread = spreadCounter(ent.mousePosition.x - ent.x - map.xshift(), ent.mousePosition.y - ent.y - map.yshift(), this.spread);
        let a = projections(spread.x, spread.y, ent.map.size * (ent.map.fieldWidth + ent.map.fieldHeight));
        new Bullet(ent, this.gunDamage, {x: a.x, y: a.y});
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
        let b = this.contact();
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
            let a = projections((ent.mousePosition.x - ent.x - map.xshift()), (ent.mousePosition.y - ent.y - map.yshift()), ent.map.size * (ent.map.fieldWidth + ent.map.fieldHeight));
            new Flame(ent, this.gunDamage.amount, {x: a.x, y: a.y});
        });
    }    
}