class Glyphid extends Entity{
    constructor(size, hp, damage, defence){
        super(player.map, Math.floor(Math.random() * 600) + 600, Math.floor(Math.random() * 600), hp, defence, {x1: -1 * size, x2: size, y1: -1 * size, y2: size}, undefined, undefined, () => {this.moveToGoal(player.x, player.y, 1)});
        let a = new Box(undefined, undefined, undefined, this.hitbox, {type: "enemy", amount: damage, iFrame: 3000});
        a.bind(this);
        this.enemyDamageMultiplier = 0;
    }
}


class Grunt extends Glyphid{
    constructor(){
        super(10, 10, 2, 20);
    }
}


class Swarmer extends Glyphid{
    constructor(){
        super(6, 3, 1, 0);
    }
}


class Praetorian extends Glyphid{
    constructor(){
        super(20, 30, 3, 100);
    }
}