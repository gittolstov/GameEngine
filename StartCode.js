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
new LevelEditor(player, 20);
let baseBackend = new BaseBackend();
player.activeLevelEditor.placeSchematic(mainScheme);
baseBackend.activateWaypoints();
let x = new Primary;
x.statMultipliers = [0.8, 1, 0.5, 1, 10, 1, 1, 1, 1, 1];
let f = new WeaponHandle;
f.slots.primaries[0] = x;
player.give(f);
player.give(new Resource(3000, "rifleBullet", "rifleBullet"));
//let u = new CaveGenerator(0, 0, 300, 300, undefined, 20);
//let a = new Breaker(100, 100, {x1: -30, x2: 30, y1: -30, y2: 30}, 10000);
//a.bind(player);