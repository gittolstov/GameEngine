class Glyphid extends Entity{
    constructor(size, hp, damage, defence){
        super(player.map, Math.floor(Math.random() * 600) + 600, Math.floor(Math.random() * 600), hp, defence, {x1: -1 * size, x2: size, y1: -1 * size, y2: size}, undefined, undefined, function(){this.moveToGoal(player.x, player.y, 1)});
        let a = new Box(undefined, undefined, undefined, this.hitbox, {type: "enemy", amount: damage, iFrame: 3000});
        a.bind(this);
        a.tickMove = function(){
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
    }
}


class Grunt extends Glyphid{
    constructor(){
        super(10, 10, 2, 20);
        this.draw = function(){
            draw.grunt(this);
        }
    }
}


class Swarmer extends Glyphid{
    constructor(){
        super(6, 3, 1, 0);
        this.draw = function(){
            draw.swarmer(this);
        }
    }
}


class Praetorian extends Glyphid{
    constructor(){
        super(20, 30, 3, 100);
        this.draw = function(){
            draw.praetorian(this);
        }
    }
}


class Bullet extends Entity{
    constructor(gunner, damage, goal){
        super(gunner.map, gunner.x, gunner.y, -1000, 1000000, {x1: -5, x2: 5, y1: -5, y2: 5}, undefined, undefined, function(){this.moveToGoal(this.goal.x, this.goal.y, this.speed)}, goal);
        let a = new Box(undefined, undefined, undefined, this.hitbox, damage);
        this.speed = 10;
        a.bind(this);
        a.damageFunction = function(damaged){if (damaged != player){this.coordinates.kill();}};
        this.removeProjection();
    }

    contact(){
        this.kill();
    }
}


class Weapon extends Tool{
    constructor(dmg, bpm){
        super(function(ent){new Bullet(ent, this.gunDamage, {x: ent.mousePosition.x + xshift(map), y: ent.mousePosition.y + xshift(map)});});
        this.gunDamage = {type: "playerGeneric", amount: dmg, iFrame: 3000};
        this.maxCooldown = 60000/bpm;
    }
}