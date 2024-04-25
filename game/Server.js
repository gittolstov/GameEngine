/*import {projections, defenceCount, spreadCounter, turn, euclidianDistance} from "./Formulas.js";
import {Draw} from "./Draw.js";
import {keyDownHandler, keyUpHandler, mouseMoveHandler, clickHandler} from "./InputHandler.js";
import {Box, Tool, PlaceholderItem, Resource, Particle, StatusEffect, Entity, ObjectHitbox, BackgroundImage, Map, ShadowRealm, Interface, InterfaceElement, InteractivityHitbox, DevKit} from "./Classes.js";
import {Player, Inventory, HUD, ItemSlot, ItemSlotHotbar, Minimap, MapMarker} from "./Player.js";
import {Glyphid, meleeAttackHitbox, Grunt, Swarmer, Praetorian, Bullet, Weapon, Flame, Breaker, Missile, Flamethrower, CaveGenerator, WeaponEditor, BloodParticle, EletroParticle} from "./Drg.js";
import {WeaponHandle, Primary, ItemSlotWeapon} from "./AdvancedWeaponarySystems.js";
import {LevelEditor, GridParticle, WallBlock, Rock, Stone, Floor, Ladder, VentEntry, VentEntryBox, Elevator, ElevatorBox, ElevatorButton, mainScheme} from "./LevelEditor.js";
import {
	raycast,
	MeltdownParticle,
	PushOutBox,
	Burger,
	FoodDispencer,
	Vault,
	WaterTank,
	CartFiller,
	Cart,
	invisibleButton,
	InterfaceButton,
	Code,
	VentInterface,
	VentTerminal,
	DoorEntity,
	DoorInterface,
	DoorTerminal,
	BaseDoor,
	WiringInterface,
	WireBreakpoint,
	WiringConnector,
	Wire,
	PathfindingPoint,
	CellBox,
	Cell,
	MainTerminalInterface,
	MainTerminal,
	BaseBackend
} from "./BaseBackend.js";*/
/*
let Formulasjs = require("./Formulas.js");
let Drawjs = require("./Draw.js");
let InputHandlerjs = require("./InputHandler.js");
let Classesjs = require("./Classes.js");
let Playerjs = require("./Player.js");
let Drgjs = require("./Drg.js");
let AdvancedWeaponarySystemsjs = require("./AdvancedWeaponarySystems.js");
let LevelEditorjs = require("./LevelEditor.js");
let BaseBackendjs = require("./BaseBackend.js");
let projections = Formulasjs.projections;
let defenceCount = Formulasjs.defenceCount;
let spreadCounter = Formulasjs.spreadCounter;
let turn = Formulasjs.turn;
let euclidianDistance = Formulasjs.euclidianDistance;
let Draw = Drawjs.Draw;
let keyDownHandler = InputHandlerjs.keyDownHandler;
let keyUpHandler = InputHandlerjs.keyUpHandler;
let mouseMoveHandler = InputHandlerjs.mouseMoveHandler;
let clickHandler = InputHandlerjs.clickHandler;
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
let Player = Playerjs.Player;
let Inventory = Playerjs.Inventory;
let HUD = Playerjs.HUD;
let ItemSlot = Playerjs.ItemSlot;
let ItemSlotHotbar = Playerjs.ItemSlotHotbar;
let Minimap = Playerjs.Minimap;
let MapMarker = Playerjs.MapMarker;
let Glyphid = Drgjs.Glyphid;
let meleeAttackHitbox = Drgjs.meleeAttackHitbox;
let Grunt = Drgjs.Grunt;
let Swarmer = Drgjs.Swarmer;
let Praetorian = Drgjs.Praetorian;
let Bullet = Drgjs.Bullet;
let Weapon = Drgjs.Weapon;
let Flame = Drgjs.Flame;
let Breaker = Drgjs.Breaker;
let Missile = Drgjs.Missile;
let Flamethrower = Drgjs.Flamethrower;
let CaveGenerator = Drgjs.CaveGenerator;
let WeaponEditor = Drgjs.WeaponEditor;
let BloodParticle = Drgjs.BloodParticle;
let EletroParticle = Drgjs.EletroParticle;
let WeaponHandle = AdvancedWeaponarySystemsjs.WeaponHandle;
let Primary = AdvancedWeaponarySystemsjs.Primary;
let ItemSlotWeapon = AdvancedWeaponarySystemsjs.ItemSlotWeapon;
let LevelEditor = LevelEditorjs.LevelEditor;
let GridParticle = LevelEditorjs.GridParticle;
let WallBlock = LevelEditorjs.WallBlock;
let Rock = LevelEditorjs.Rock;
let Stone = LevelEditorjs.Stone;
let Floor = LevelEditorjs.Floor;
let Ladder = LevelEditorjs.Ladder;
let VentEntry = LevelEditorjs.VentEntry;
let VentEntryBox = LevelEditorjs.VentEntryBox;
let Elevator = LevelEditorjs.Elevator;
let ElevatorBox = LevelEditorjs.ElevatorBox;
let ElevatorButton = LevelEditorjs.ElevatorButton;
const mainScheme = LevelEditorjs.mainScheme;
let raycast = BaseBackendjs.raycast;
let MeltdownParticle = BaseBackendjs.MeltdownParticle;
let PushOutBox = BaseBackendjs.PushOutBox;
let Burger = BaseBackendjs.Burger;
let FoodDispencer = BaseBackendjs.FoodDispencer;
let Vault = BaseBackendjs.Vault;
let WaterTank = BaseBackendjs.WaterTank;
let CartFiller = BaseBackendjs.CartFiller;
let Cart = BaseBackendjs.Cart;
let invisibleButton = BaseBackendjs.invisibleButton;
let InterfaceButton = BaseBackendjs.InterfaceButton;
let Code = BaseBackendjs.Code;
let VentInterface = BaseBackendjs.VentInterface;
let VentTerminal = BaseBackendjs.VentTerminal;
let DoorEntity = BaseBackendjs.DoorEntity;
let DoorInterface = BaseBackendjs.DoorInterface;
let DoorTerminal = BaseBackendjs.DoorTerminal;
let BaseDoor = BaseBackendjs.BaseDoor;
let WiringInterface = BaseBackendjs.WiringInterface;
let WireBreakpoint = BaseBackendjs.WireBreakpoint;
let WiringConnector = BaseBackendjs.WiringConnector;
let Wire = BaseBackendjs.Wire;
let PathfindingPoint = BaseBackendjs.PathfindingPoint;
let CellBox = BaseBackendjs.CellBox;
let Cell = BaseBackendjs.Cell;
let MainTerminalInterface = BaseBackendjs.MainTerminalInterface;
let MainTerminal = BaseBackendjs.MainTerminal;
let BaseBackend = BaseBackendjs.BaseBackend;*/


class Server{
	constructor(route = true){
		if (route){
			const http = require("http");
			var fs = require('fs');
			var path = require('path');
			http.createServer(function(request,response){
				//console.log("request started: " + request.url);
				var filePath = "." + request.url;
				if (filePath.startsWith("./game")) {
					var extname = path.extname(filePath);
					var contentType = 'text/html';
					switch (extname) {
						case '.js':
							contentType = 'text/javascript';
							break;
						case '.css':
							contentType = 'text/css';
							break;
						case '.json':
							contentType = 'application/json';
							break;
						case '.png':
							contentType = 'image/png';
							break;      
						case '.jpg':
							contentType = 'image/jpg';
							break;
						case '.wav':
							contentType = 'audio/wav';
							break;
					}

					fs.readFile(filePath, function(error, content) {
						if (error) {
							if(error.code == 'ENOENT'){
								fs.readFile('./404.html', function(error, content) {
									response.writeHead(200, { 'Content-Type': contentType });
									response.end(content, 'utf-8');
								});
							}
							else {
								response.writeHead(500);
								response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
								response.end(); 
							}
						}
						else {
							response.writeHead(200, { 'Content-Type': contentType });
							response.end(content, 'utf-8');
						}
					});
				} else {
				
					/*response.setHeader('Access-Control-Allow-Origin', '*');
					response.setHeader('Access-Control-Request-Method', '*');
					response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
					response.setHeader('Access-Control-Allow-Headers', '*');*/
					if (request.method === "POST"){
						let body = [];
						request
						.on('data', chunk => {
							body.push(chunk);
						})
						.on('end', () => {
							body = Buffer.concat(body).toString();// at this point, `body` has the entire request body stored in it as a string
							immediateApi.clientInfo[parseInt(Array.from('some string')[0])] = body;
							//console.log(body);
						});
						response.end();
					} else {
						//console.log("data sent to client");
						response.end(immediateApi.savedState);
					}
				}
			}).listen(3000, "0.0.0.0");
		}
		this.devKit = new DevKit;
		this.activePlayerId = 0;
		this.savedState = "";
		this.clientInfo = [];
		this.syncCounter = 0;
		this.summoningCircle = {
			Grunt: function(id, x, y, useless1, useless2, useless3, useless4){
				let a = new Grunt(x, y);
				a.map.reassignIndividualId(a, id);
			},
			Player: function(id, useless1, useless2, useless3, useless4, useless5, useless6, useless7 = undefined){},
			BaseDoor: function(id, useless1, useless2, useless3, useless4, useless5, useless6, useless7 = undefined){},
			Cart: function(id, useless1, useless2, useless3, useless4, useless5, useless6, useless7 = undefined){}
		}
		this.defaultConstNameId = 7;//7 is id of constructor name by default
	}

	start(){
		map = new Map(600, 10, 10, this);//document.getElementById("canv").width
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

	summonObject(parameters){
		let objectData = parameters.map(Number);
		this.summoningCircle[parameters[this.defaultConstNameId]](objectData[0], objectData[1], objectData[2], objectData[3], objectData[4], objectData[5], objectData[6]);
	}

	inGameTime(){
		setInterval((obj) => {
			map.tick(obj.getPlayer());
			obj.sync();
		}, map.framerate, this);
	}

	sync(){
		if (this.syncCounter >= 2){
			for (let a in this.clientInfo){
				this.correctGameData(this.clientInfo[a]);
			}
			this.savedState = this.sendServerData();
			this.syncCounter = 0;
			//console.log("tick: " + this.savedState);
			return;
		}
		this.syncCounter++;
	}

	sendServerData(){
		let saved = "";
		for (let a in this.map.entityListActive){
			saved += this.map.entityList[this.map.entityListActive[a]].getSaveData();
			saved += ";";
		}
		for (let a in baseBackend.doors){
			saved += baseBackend.doors[a].getSaveData();
			saved += ";";
		}
		return saved;
	}

	correctGameData(data){
		let parsedData = data.split("	");
		let parsedEntityData = parsedData[1].split(";");
		for (let a in parsedEntityData){
			if (parsedEntityData[a] === ""){continue}
			let parsedParams = parsedEntityData[a].split(" ");//пробел для разделения параметров внутри объекта
			if (this.map.individualObjects[parseFloat(parsedParams[0])] === undefined){
				if (parseFloat(parsedParams[0]) < 0){
					try {
						this.map.individualObjects[-parseFloat(parsedParams[0])].kill();
						console.log("DEATH!!!");
						continue;
					} catch {
						console.error(-parseFloat(parsedParams[0]));
					}
				}
				console.error("no such object: " + parsedParams[0]);
				continue;
			}
			this.map.individualObjects[parseFloat(parsedParams[0])].setSaveData(parsedParams);
		}
		try{
		var parsedEvents = parsedData[2].split(";");
		} catch {console.error("empty package")}
		for (let a in parsedEvents){
			let parsedParams = parsedEvents[a].split(" ");
			if (parsedEvents[a] === "") {continue}
			this.map.individualObjects[parseFloat(parsedParams[0])].forceEvents(parsedEvents[a]);
		}
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


class Client extends Server{
	constructor(){
		super(false);
		this.previousObjects = [];
		setTimeout(() => {
				baseBackend.baseTick3 = function(){}
				baseBackend.baseTick2 = function(){}
			}, 5
		);
		this.clientNumber = -1;
	}

	inGameTime(){
		setInterval((obj) => {
			map.tick(obj.getPlayer());
			obj.sync();
		}, map.framerate, this);
	}

	sync(){
		if (this.syncCounter >= 5){
			this.sendClientData();
			this.getServerData();
			this.handleNewObjects(this.savedState);
			this.correctGameData(this.savedState);
			this.syncCounter = 0;
			return;
		}
		this.syncCounter++;
	}

	handleNewObjects(data){
		let parsedData = data.split("	");
		let parsedEntityData = parsedData[0].split(";");
		let counter = 0;
		for (let a in parsedEntityData){
			if (parsedEntityData[a] === ""){continue}
			let b = parseInt(parsedEntityData[a].split(" ")[0]);
			if (b === this.previousObjects[counter]){
				counter++;
			} else {
				let c = this.previousObjects.indexOf(b);
				if (c === -1){
					console.log("1 less obj than needed");
					this.summonObject(parsedEntityData[a].split(" "));
				} else {
					if (c > counter){
						for (let d = counter; d < c; d++){
							let toKill = this.map.individualObjects[this.previousObjects[d]];
							toKill.remove();
						}
						counter = c + 1;
					} else {
						console.error("FUCKING FUCKS");
					}
				}
			}
		}
		this.previousObjects = [];
		for (let a in parsedEntityData){
			if (parsedEntityData[a] === ""){continue}
			let b = parseInt(parsedEntityData[a].split(" ")[0]);
			this.previousObjects.push(b);
		}
	}

	sendClientData(){
		let saved = this.activePlayerId + "	";
		saved += this.getPlayer().getSaveData();
		if (this.getPlayer().isDead){
			saved = "";
		}
		if (saved.startsWith("-")){
			this.getPlayer().isDead = true;
			console.log("sending last player package: " + saved);
		}
		saved += "	";
		for (let a in baseBackend.doors){
			saved += baseBackend.doors[a].clientEvents;
			baseBackend.doors[a].clearLog();
			saved += ";";
		}
		this.sendDataToServer(saved);
	}

	getServerData(){
		let url = '/';
		fetch(url)
		.then(function(response){
			let a = response.text();
			return a;
		})
		.then(function(text){
			immediateApi.savedState = text;
			console.log("data from server received");
		})
	}

	sendDataToServer(data){
		let url = '/';
		fetch(url, {
			method: "post",
			headers: {
			'Accept': 'application/text',
			'Content-Type': 'application/text'
			},
			body: data
		})
	}

	correctGameData(data){
		let parsedData = data.split("	");
		let parsedEntityData = parsedData[0].split(";");
		for (let a in parsedEntityData){
			if (parsedEntityData[a] === ""){continue}
			let parsedParams = parsedEntityData[a].split(" ");//пробел для разделения параметров внутри объекта
			if (this.map.individualObjects[parseFloat(parsedParams[0])] === undefined){
				if (parseFloat(parsedParams[0]) < 0){
					try {
						this.map.individualObjects[-parseFloat(parsedParams[0])].kill();
						console.log("DEATH!!!");
						continue;
					} catch {
						console.error(-parseFloat(parsedParams[0]));
					}
				}
				console.error("no such object: " + parsedParams[0]);
				continue;
			}
			this.map.individualObjects[parseFloat(parsedParams[0])].setSaveData(parsedParams);
		}
	}
}


let map
let baseBackend
const screenSizeMultiplier = 0.6;//document.getElementById("canv").height / parseInt(document.getElementById("wrapper").style.height.slice(0, document.getElementById("wrapper").style.height.length - 2));