let map = new Map(600, 10, 10);
new ShadowRealm(map);
let player = new Player;
let draw = new Draw;
let devKit = new DevKit;
let checker = 0;
let magicConstant1 = -5;
player.inventory.hotbar[0] = new Weapon(0.1, 400, function(ent){
    new Missile(ent, this.gunDamage, player.target);
});
player.inventory.mainhand[0] = player.inventory.hotbar[0];
player.inventory.hotbar[1] = new Flamethrower(0.25, 600, undefined, 0);
player.inventory.hotbar[2] = new Weapon(1, 300, function(ent){
    if (ent.ammunitionGetter("shell") > 0){
        for (let b = 0; b < 5; b++){
            let spread = spreadCounter(ent.mousePosition.x - ent.x - map.xshift(), ent.mousePosition.y - ent.y - map.yshift(), this.spread);
            let a = projections(spread.x, spread.y, ent.map.size * (ent.map.fieldWidth + ent.map.fieldHeight));
            new Bullet(ent, this.gunDamage, {x: ent.x + a.x, y: ent.y + a.y});
            ent.ammunitionDecreaser("shell", 1);
        }
    }
}, 15);
map.drawEverything();
setInterval(() => {
    map.tick();
}, map.framerate);
//let a = new InterfaceElement(player.mainInterface, 250, 350, 250, 350);
//a.drawActive = function(){
//    draw.interface2(this);
//}
//a.drawUnactive = function(){
//    draw.interface(this);
//}
//a.functionality = function(){player.inventory.mainhand[0].maxCooldown -= 10}
player.inventoryIsActive = false;
//devKit.swarm());
let swarmAllowed = false;
setInterval(() => {if(swarmAllowed){devKit.swarm();}}, 25000);
devKit.worldBorder();
let u = new caveGenerator(0, 0, 300, 300, undefined, 20);
//let a = new Breaker(100, 100, {x1: -30, x2: 30, y1: -30, y2: 30}, 10000);
//a.bind(player);