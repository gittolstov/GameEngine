class Server{
	constructor(){
		this.devKit = new DevKit;
		this.activePlayerId = 0;
	}

	start(){
		map = new Map(document.getElementById("canv").width, 10, 10, this);
		this.map = map;
		baseBackend = new BaseBackend(map);
		this.players = [new Player, new Player];
		//let a = new InterfaceElement(this.getPlayer().mainInterface, 250, 350, 250, 350);
		//a.drawActive = function(){
		//    draw.interface2(this);
		//}
		//a.drawUnactive = function(){
		//    draw.interface(this);
		//}
		//a.functionality = function(){this.getPlayer().inventory.mainhand[0].maxCooldown -= 10}
		//devKit.swarm());
		//let swarmAllowed = false;
		//setInterval(() => {if(swarmAllowed){devKit.swarm();}}, 50000);
		//let u = new CaveGenerator(0, 0, 300, 300, undefined, 20);
		//let a = new Breaker(100, 100, {x1: -30, x2: 30, y1: -30, y2: 30}, 10000);
		//a.bind(this.getPlayer());
		this.devKit.worldBorder();
		new LevelEditor(this.getPlayer(), 20);
		this.getPlayer().activeLevelEditor.placeSchematic(mainScheme);
		let x = new Primary;
		x.statMultipliers = [0.8, 1, 0.5, 1, 10, 1, 1, 1, 1, 1];
		let f = new WeaponHandle;
		f.toolIcon.src = "textures/rifle2.png";
		f.sprite.src = "textures/Rifle.png";
		f.slots.primaries[0] = x;
		this.getPlayer().give(f);
		this.getPlayer().give(new Resource(3000, "rifleBullet", "rifleBullet"));
		let a = new Tool(undefined, undefined, "crowbar");
		a.toolIcon.src = "textures/crowbar2.png";
		a.sprite.src = "textures/Crowbar.png";
		a.isWrench = true;
		this.getPlayer().give(a);
		a = new Resource(1, "replacementWire", undefined, "textures/replacementWire.png");
		this.getPlayer().give(a);
		a = new Resource(1, "wirecutters", undefined, "textures/wirecutters.png");
		this.getPlayer().give(a);
		this.getPlayer().inventoryIsActive = false;
		this.getPlayer().inventory.mainhand[0] = new PlaceholderItem;
		this.players[1].inventory.mainhand[0] = new PlaceholderItem;
		this.inGameTime();
	}

	inGameTime(){
		setInterval((obj) => {
			map.tick(obj.getPlayer());
		}, map.framerate, this);
	}

	endgame(){
		for (let a = 0; a < this.map.api.players; a++){
			this.map.api.players[a].kill();
		}
	}

	getPlayer(){
		return this.players[this.activePlayerId];
	}
}


let map
let baseBackend
const screenSizeMultiplier = document.getElementById("canv").height / parseInt(document.getElementById("wrapper").style.height.slice(0, document.getElementById("wrapper").style.height.length - 2));


let immediateApi = new Server();
immediateApi.start();


baseBackend.activateWaypoints();
baseBackend.startBackendTicks();
new ShadowRealm(map);
let draw = new Draw;


let magicConstant1 = -5;



