let map = new Map(600, 10, 10);
new ShadowRealm(map);
let player = new Player;
let draw = new Draw;
let devKit = new DevKit;
let checker = 0;
let magicConstant1 = -5;
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
player.inventory.mainhand[0] = new PlaceholderItem;
//devKit.swarm());
let swarmAllowed = false;
setInterval(() => {if(swarmAllowed){devKit.swarm();}}, 50000);
devKit.worldBorder();
let u = new caveGenerator(0, 0, 300, 300, undefined, 20);
//let a = new Breaker(100, 100, {x1: -30, x2: 30, y1: -30, y2: 30}, 10000);
//a.bind(player);