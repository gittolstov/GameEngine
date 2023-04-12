let map = new Map(600, 20, 20);
let player = new Player;
let draw = new Draw;
let devKit = new DevKit;
player.inventory.hotbar.push(new Weapon(0.1, 400, function(ent){
    new Missile(ent, this.gunDamage, player.target);
}));
player.inventory.mainhand[0] = player.inventory.hotbar[0];
player.inventory.hotbar.push(new Flamethrower(0.25, 600, undefined, 0));
player.inventory.hotbar.push(new Weapon(1, 300, function(ent){
    for (let b = 0; b < 5; b++){
        let spread = spreadCounter(ent.mousePosition.x - ent.x - xshift(map), ent.mousePosition.y - ent.y - yshift(map), this.spread);
        let a = projections(spread.x, spread.y, ent.map.size * (ent.map.fieldWidth + ent.map.fieldHeight));
        new Bullet(ent, this.gunDamage, {x: a.x, y: a.y});
    }
}, 15));
map.drawEverything();
setInterval(() => {
    map.tick();
}, map.framerate);
player.mainInterface = new Interface;
let a = new InterfaceElement(player.mainInterface, 250, 350, 250, 350);
a.drawActive = function(){
    draw.interface2(this);
}
a.drawUnactive = function(){
    draw.interface(this);
}
a.functionality = function(){player.inventory.mainhand[0].maxCooldown -= 10}
player.activeWeaponEditor = false;
devKit.swarm();
//setInterval(devKit.swarm, 9000);
devKit.worldBorder();