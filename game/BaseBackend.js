/*let Formulasjs = require("./Formulas.js");
let Classesjs = require("./Classes.js");
let projections = Formulasjs.projections;
let defenceCount = Formulasjs.defenceCount;
let spreadCounter = Formulasjs.spreadCounter;
let turn = Formulasjs.turn;
let euclidianDistance = Formulasjs.euclidianDistance;
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
*/


class BaseBackend{
	constructor(maP = map){
		this.map = maP;
		this.cells = [];
		this.ventCells = [];
		this.activeCells = [];
		this.heavyDoors = [];
		this.doors = [];//purely server purposes
		this.coolingSystems = [];
		this.wayPoints = [];
		this.glyphids = [];
		this.glyphidsByCell = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
		this.doorEntities = [];
		this.generalPower = true;
		this.rocketLanded = false;
		this.ventDamage = 1;
		this.ventDefence = true;
		this.ventOn = true;
		this.rocketCounter = -1;
		this.rocketExplosionTimer = -1;
		this.fuelConsumptionTimer = 0;
		this.reactorTemperature = 0;
		this.airCondition = 0;
		this.oxygenTick = true;
		this.stopped = false;
		for (let a = 0; a < 20; a++){
			new Cell(this);
		}
		this.cells[19].distance = 100;
		this.cells[19].rarity = 150;
		this.eventLog = "";
		maP.assignIndividualId(this);
	}

	startBackendTicks(){
		setTimeout(() => {
			baseBackend.cells[3].wiringBreakpoints[0].break();////
			immediateApi.getPlayer().tickCounter = 0;
			immediateApi.getPlayer().tickPlaceholder3 = function(){
				if (this.tickCounter % 50 === 0){
					baseBackend.baseTick1();
					if (this.tickCounter % 300 === 0){
						baseBackend.baseTick2();
					}
				}
				this.tickCounter++;
			}
		}, 10);
	}

	operatorBaseFreeze(){
		this.stopped = true
	}

	baseTick1(){
		if (this.stopped){
			return;
		}
		for (let a = 0; a < this.map.api.players.length; a++){
			if (this.map.api.players[a].x > 4260 && this.map.api.players[a].x < 5920 && this.map.api.players[a].y > 3280 && this.map.api.players[a].y < 4760 && this.ventDefence){
				this.map.api.players[a].damageGeneric(this.ventDamage);
			}
			if (this.airCondition > 12){
				this.map.api.players[a].damageGeneric(this.ventDamage / 3);
			}
		}
		if (this.map.entityList.length > 1500){
			this.map.reloadEntityList();
		}
		this.findPlayer();
		this.findPlayer2();
		this.baseTick3();
	}

	baseTick2(){//gets nullified by Client
		if (this.stopped){
			return;
		}
		this.rocketCounter++;
		if (this.rocketCounter % 150 === 0){
			this.rocketInbound();
			this.rocketCounter = 0;
		}
		if (this.rocketExplosionTimer >= 0){
			this.rocketExplosionTimer++;
			if (this.rocketExplosionTimer >= 50){
				immediateApi.endgame();
			}
		}
		if (this.mainTerminal.rocketBayAccess){
			this.cells[9].increaseStatus(7);
		}
		if (((!this.ventOn || !this.generalPower) && this.airCondition < 20) || this.supplies.oxygen <= 0){
			this.airCondition++;
		} else if (this.airCondition > 0){
			this.airCondition--;
		}
		this.glyphidsByCell = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
		for (let a = 0; a < this.glyphids.length; a++){
			if (this.glyphids[a] === undefined){continue}
			this.glyphidsByCell[this.glyphids[a].cell]++;
		}
		for (let a = 0; a < this.cells.length; a++){
			this.cells[a].reactInfestationStatus();
		}
		this.cells[19].status = 100;
		this.systemsTick();
	}

	baseTick3(){//gets nullified by Client
		for (let a = 0; a < this.cells.length; a++){
			this.cells[a].distance = 100;
			this.cells[a].voltage = 100;
			this.cells[a].alreadyCounted = false;
			this.cells[a].increaseStatus(-1);
			this.cells[a].unpower();
			this.cells[a].rollWireBreak();
		}
		if (this.generalPower){this.cells[2].electricSignal(0)};
		this.cells[19].signal(0);
		for (let a in this.activeCells){
			this.activeCells[a].increaseStatus(-2);
		}
	}

	systemsTick(){
		if (this.fuelConsumptionTimer === 10 && this.generalPower){
			this.fuelConsumptionTimer = 0;
			if (this.oxygenTick && this.generalPower){
				this.supplies.oxygen--;
			}
			this.oxygenTick = !this.oxygenTick;
			this.reactorPort.fuel--;
		}
		this.fuelConsumptionTimer++;
		if (this.reactorPort.fuel <= 0){
			this.generalPower = false;
		}
		this.heatReactor((2 - 1 * this.coolingSystems[0].powered - 1 * this.coolingSystems[1].powered) * this.generalPower);
		if (this.reactorTemperature > 15){
			immediateApi.endgame();
		}
	}

	heatReactor(t){
		if (t > 0){
			this.reactorTemperature += t;
			new MeltdownParticle();
			//console.log("!!!meltdown!!!");
		} else if (this.reactorTemperature > 0){
			this.reactorTemperature--;
		}
	}

	activateDoorEntities(){
		for (let a in this.doorEntities){
			this.doorEntities[a].hitbox = {x1: 0, x2: 0, y1: 0, y2: 0, additional: []};
		}
	}

	deactivateDoorEntities(){
		for (let a in this.doorEntities){
			this.doorEntities[a].hitbox = {x1: 10, x2: -10, y1: 10, y2: -10, additional: []}
		}
	}

	bindDoors(){
		this.activateDoorEntities();
		for (let a in this.cells){
			for (let b in this.cells[a].hitboxes){
				for (let c in this.doorEntities){
					if (this.cells[a].hitboxes[b].touchSpecific(this.doorEntities[c])){
						this.doorEntities[c].getOther().bindedCell = this.cells[a];
						this.cells[a].entries.push(this.doorEntities[c]);
						this.cells[a].mechanisms.push(this.doorEntities[c].assignedDoor);
					}
				}
			}
		}
		this.deactivateDoorEntities();
		for (let a in this.cells){
			let bigList = [];
			for (let b in this.cells[a].hitboxes){
				bigList.push(...this.cells[a].hitboxes[b].contactBackground());
			}
			for (let b in bigList){
				if (bigList[b].isVent){
					this.ventCells.push(this.cells[a]);
					this.cells[a].hasVent = true;
					break;
				}
			}
		}
		this.heavyDoors[0].isLocked = true;
		this.heavyDoors[9].isLocked = true;
		this.heavyDoors[10].isLocked = true;
		let a = function(){
			this.moving = true;
			this.isOpen = false;
			setTimeout((obj) => {obj.fake = false; new PushOutBox(20, this, 4); obj.moveTick(obj, 20); obj.moving = false; obj.isLocked = true;}, this.cooldown, this);
		}
		this.heavyDoors[0].close = a;
		this.heavyDoors[9].close = a;
		this.heavyDoors[10].close = a;
	}

	bindWiring(){
		for (let a in this.cells){
			let bigList = [];
			for (let b in this.cells[a].hitboxes){
				bigList.push(...this.cells[a].hitboxes[b].touch());
			}
			for (let c in bigList){
				if (bigList[c].connector && !bigList[c].alreadyCounted){
					this.cells[a].wireEntries.push(bigList[c]);
					bigList[c].other.bindedCell = this.cells[a];
					bigList[c].alreadyCounted = true;
				}
				if (bigList[c].backlink && !bigList[c].alreadyCounted){
					this.cells[a].wiringBreakpoints.push(bigList[c].backlink);
					bigList[c].backlink.bindedCell = this.cells[a];
					bigList[c].alreadyCounted = true;
				}
			}
		}
		for (let a in this.cells){
			let entries = [];
			for (let b in this.cells[a].wireEntries){
				entries.push(this.cells[a].wireEntries[b].bindedCell);
			}
			this.cells[a].wireEntries = [...entries];
		}
	}

	activateWaypoints(){
		for (let a in this.wayPoints){
			this.wayPoints[a].find();
		}
		for (let a in this.cells){
			this.cells[a].defineBoundary();
		}
		this.bindDoors();
		this.bindWiring();
	}

	findPlayer(){
		for (let playeR = 0; playeR < immediateApi.players.length; playeR++){
			let closest = undefined;
			let dis = 10000;
			for (let b = 0; b < this.wayPoints.length; b++){
				this.wayPoints[b].distance[playeR] = 100;
			}
			for (let b = 0; b < this.wayPoints.length; b++){
				if (this.wayPoints[b] === undefined){continue}
				if (euclidianDistance(immediateApi.players[playeR].x, immediateApi.players[playeR].y, this.wayPoints[b].x, this.wayPoints[b].y) <= dis){
					closest = this.wayPoints[b];
					dis = euclidianDistance(immediateApi.players[playeR].x, immediateApi.players[playeR].y, this.wayPoints[b].x, this.wayPoints[b].y);
				}
			}
			closest.signal(0, [playeR]);
			let inSight = [];
			for (let b = 0; b < this.wayPoints.length; b++){
				if (this.wayPoints[b].distance[playeR] < 3){
					inSight.push(this.wayPoints[b]);
				}
			}
			for (let b = 0; b < this.wayPoints.length; b++){
				this.wayPoints[b].distance[playeR] = 100;
			}
			for (let b = 0; b < inSight.length; b++){
				if (raycast(inSight[b], 8, immediateApi.players[playeR])){
					inSight[b].signal(0, [playeR]);
				}
			}
		}
	}
	
	findPlayer2(){
		this.activeCells = [];
		for (let a in this.cells){
			this.cells[a].playerIn = false;
			for (let b in this.cells[a].hitboxes){
				this.cells[a].hitboxes[b].checkPlayer();
			}
		}
	}

	checkInPlayer(id){
		for (let a in this.cells){
			if (a == id){
				this.cells[a].playerIn = true;
				this.activeCells.push(this.cells[a]);
			}
		}
	}

	locateClosest(ent){
		let closest = immediateApi.getPlayer();
		let dis = 10000;
		for (let b = 0; b < this.wayPoints.length; b++){
			if (this.wayPoints[b] === undefined){continue}
			if (euclidianDistance(ent.x, ent.y, this.wayPoints[b].x, this.wayPoints[b].y) <= dis && raycast(ent, 8, this.wayPoints[b])){
				closest = this.wayPoints[b];
				dis = euclidianDistance(ent.x, ent.y, this.wayPoints[b].x, this.wayPoints[b].y);
			}
		}
		for (let b = 0; b < immediateApi.players.length; b++){
			if (euclidianDistance(ent.x, ent.y, immediateApi.players[b].x, immediateApi.players[b].y) <= dis && raycast(ent, 8, immediateApi.players[b])){
				closest = immediateApi.players[b];
				dis = euclidianDistance(ent.x, ent.y, immediateApi.players[b].x, immediateApi.players[b].y);
			}
		}
		return closest;
	}

	runDiagnostics(){
		for (let a = 0; a < this.cells.length - 1; a++){
			setTimeout(this.mainTerminal.log, 1000 * a, this.cells[a].getStats(), this.mainTerminal);
		}
	}

	rocketInbound(){
		console.log("rocket inbound!");
		this.rocketIsInbound = true;
		this.rocketExplosionTimer = 0;
	}

	rocketCondition(){
		console.log(this.cells[9].wiringIntegrity + " wiring");
		console.log(this.cells[9].status + " status");
		console.log(this.rocketIsInbound + " rocketIsInbound");
		console.log(this.rocketRefueller + " rocketCargo");
		return this.cells[9].wiringIntegrity && this.cells[9].status < 40 && this.rocketIsInbound && this.rocketRefueller.fuel === 0 && this.rocketRefueller.oxygen === 0 && this.rocketRefueller.water === 0;
	}

	landRocket(){
		if (this.rocketCondition()){
			this.rocketLanded = true;
			this.rocket.fake = false;
			this.rocketRefueller.fuel = 20;
			this.rocketRefueller.water = 10;
			this.rocketRefueller.oxygen = 10;
			this.mainTerminal.log("rocket landed successfully");
			this.foodDispencer.hasFood = true;
			this.rocketExplosionTimer = 0;

		} else {
			this.mainTerminal.log("rocket can't land");
		}
	}
	launchRocket(){
		if (this.rocketCondition()){
			this.rocketLanded = false;
			this.rocket.fake = true;
			this.rocketInbound = false;
			this.rocketExplosionTimer = -1;
			this.mainTerminal.log("rocket launched successfully");
			this.day++;
			if (this.day === 3){
				while (true){
					alert("you win");
				}
			}
		} else {
			this.mainTerminal.log("rocket can't be launched");
		}
	}

	clearEventLog(){
		this.eventLog = "";
	}

	getSaveData(){
		if (this.isTechnical){return ""}
		let parameters = [
			this.individualId,
			this.generalPower,
			this.rocketLanded,
			this.ventDefence,
			this.ventOn,
			this.stopped,
			this.rocketIsInbound,
			this.constructor.name,
			this.ventDamage,//nums
			this.rocketCounter,
			this.rocketExplosionTimer,
			this.fuelConsumptionTimer,
			this.reactorTemperature,
			this.airCondition,
		];
		let saved = parameters.join(" ");
		return saved;
	}

	setSaveData(parameters){
		let parameterNames = ["individualId", "generalPower", "rocketLanded", "ventDefence", "ventOn", "stopped", "rocketIsInbound"];
		for (let a = 1; a < parameterNames.length; a++){
			this[parameterNames[a]] = parameters[a] === "true";
		}
		parameterNames = ["ventDamage", "rocketCounter", "rocketExplosionTimer", "fuelConsumptionTimer", "reactorTemperature", "airCondition"];
		let numberParams = parameters.map(Number);
		for (let a = 0; a < parameterNames.length; a++){
			this[parameterNames[a]] = numberParams[a + 8];
		}
	}
}


class MainTerminal extends ObjectHitbox{
	constructor(x1, x2, y1, y2, numb = 3, inter = new MainTerminalInterface(), maP = map){
		super(x1, x2, y1, y2, undefined, undefined, undefined, maP);
		this.interactive = true;
		this.num = numb;
		this.interface = inter;
	}

	draw(){
		draw.terminal1(this);
	}

	interact(ent){
		if (!ent.activeInterfaces[this.num]){
			ent.activeInterfaces[this.num] = true;
            this.intId = ent.personalInterfaces.push(this.interface) - 1;
            ent.speedMultipliers[0] = 0;
		} else {
			ent.activeInterfaces[this.num] = false;
			ent.personalInterfaces[this.intId] = undefined;
			ent.speedMultipliers[0] = 1;
		}
	}
}


class MainTerminalInterface extends Interface{
	constructor(backend = baseBackend){
		super(0, 600, 150, 450);
		this.backend = backend;
		this.backend.mainTerminal = this;
		this.rocketBayAccess = false;
		this.elevatorOpen = false;
		this.access = false;
		this.blockLifterGiven = false;
		this.elements[0].draw = function(){
			draw.wiringBg(this);
			draw.terminal(this);
		}
		this.codes = [];
		new Code(this, "grantAccess", "0,5,2,4,1");
		new Code(this, "openBay", "2,3,2,0,1");
		new Code(this, "closeBay", "1,0,2,3,2");
		new Code(this, "diagnostic", "1,1,1");
		new Code(this, "blockLifter", "2,5,2,3,4");
		this.display = new InterfaceElement(this, 0, 0, 0, 0);
		this.display.code = [];
		this.display.draw = function(){
			for (let a = 0; a < this.code.length && a < 5; a++){
				draw.symbol(this.code[a], 235 + 20 * a, 17, 180, 17);
			}
		}
		invisibleButton([261, 283, 305, 261, 283, 305], [219, 219, 219, 243, 243, 243], this);
		let a = new InterfaceButton(423, 403, this, 40, true);
		a.functionality = function(){this.parentInterface.changeElevatorState()}
		a = new InterfaceButton(288, 351, this, 100, true);
		a.functionality = function(){this.parentInterface.power()}
		a.draw = function(){
			draw.lever(this, this.parentInterface.backend.generalPower);
		}
		a = new InterfaceButton(473, 403, this);
		a.functionality = function(){this.parentInterface.briefElevatorOpening()}
		a = new InterfaceButton(28, 206, this);
		a.functionality = function(){this.parentInterface.mainDoor(0)}
		a = new InterfaceButton(79, 206, this);
		a.functionality = function(){this.parentInterface.mainDoor(9)}
		a = new InterfaceButton(128, 206, this);
		a.functionality = function(){this.parentInterface.mainDoor(10)}
		a = new InterfaceButton(523, 403, this);
		a.functionality = function(){this.parentInterface.elevatorOpen2()}
		a = new InterfaceButton(573, 403, this);
		a.functionality = function(){this.parentInterface.elevatorOpen1()}
		a = new InterfaceButton(181, 338, this, 40, true);
		a.functionality = function(){this.parentInterface.vent()}
		a = new InterfaceButton(136, 338, this, 40, true);
		a.functionality = function(){this.parentInterface.ventDef()}
		a = new InterfaceButton(90, 340, this);
		a.functionality = function(){this.parentInterface.lockProtocol()}
		a = new InterfaceButton(40, 340, this);
		a.functionality = function(){this.parentInterface.unlockProtocol()}
		a = new InterfaceButton(180, 205, this);
		a.functionality = function(){this.parentInterface.unlockVault()}
		a = new InterfaceButton(325, 280, this);
		a.functionality = function(){this.parentInterface.confirmCode()}
		a = new InterfaceElement(this, 350, 356, 230, 236);
		a.draw = function(){
			if (this.parentInterface.access){
				draw.can.fillStyle = "green";
			} else {
				draw.can.fillStyle = "red";
			}
			draw.can.fillRect(this.hitbox.x1, this.hitbox.y1, this.hitbox.x2 - this.hitbox.x1, this.hitbox.y2 - this.hitbox.y1);
		}
		this.textDisplay = new InterfaceElement(this, 400, 590, 315, 350);
		this.textDisplay.text = "";
		this.textDisplay.draw = function(){
			draw.text(this);
		}
		backend.map.assignIndividualId(this);
	}

	log(txt, obj = this){
		obj.textDisplay.text = txt;
		setTimeout((obj) => {obj.text = ""}, 975, obj.textDisplay);
	}

	changeElevatorState(){
		let a = baseBackend.heavyDoors[2];
		let b = baseBackend.heavyDoors[3];
		if (this.elevatorOpen){
			if (!a.isLocked && !a.isBlocked && a.powered && a.isOpen){
				a.interact();
			}
			if (!b.isLocked && !b.isBlocked && b.powered && b.isOpen){
				b.interact();
			}
			this.elevatorOpen = false;
		} else {
			if (!a.isLocked && !a.isBlocked && a.powered && !a.isOpen){
				a.interact();
			}
			if (!b.isLocked && !b.isBlocked && b.powered && !b.isOpen){
				b.interact();
			}
			this.elevatorOpen = true;
		}
	}

	briefElevatorOpening(){
		this.changeElevatorState();
		setTimeout((obj) => {obj.changeElevatorState()}, 5000, this);
	}

	elevatorOpen1(){
		let a = baseBackend.heavyDoors[2]
		if (!a.isLocked && !a.isBlocked && a.powered){
			a.interact();
		}
	}

	elevatorOpen2(){
		let a = baseBackend.heavyDoors[3]
		if (!a.isLocked && !a.isBlocked && a.powered){
			a.interact();
		}
	}

	lockProtocol(){
		this.logEvent("lockProtocol");
		for (let a in baseBackend.heavyDoors){
			baseBackend.heavyDoors[a].lock();
		}
	}

	unlockProtocol(){
		this.logEvent("unlockProtocol");
		if (!this.access){
			return;
		}
		for (let a in baseBackend.heavyDoors){
			if (a == 9 || a == 10 || a == 0){continue}
			baseBackend.heavyDoors[a].unlock();
		}
		this.access = false;
	}

	confirmCode(){
		for (let a in this.codes){
			if (this.display.code.toString() === this.codes[a].code){
				this.codes[a].functionality();
				this.display.code = [];
				return;
			}
		}
		this.display.code = [];
		return;
	}

	grantAccess(){
		this.logEvent("grantAccess");
		this.access = true;
		setTimeout((obj) => {obj.access = false}, 5000, this)
	}

	unlockVault(){
		if (!this.access){
			return;
		}
		this.logEvent("unlockVault");
		setTimeout(() => {baseBackend.heavyDoors[7].interact()}, 20000);
		this.access = false;
	}

	power(){
		if (!this.access){
			return;
		}
		this.logEvent("power");
		this.backend.generalPower = !this.backend.generalPower;
		this.access = false;
	}

	vent(){
		this.logEvent("vent");
		this.backend.ventOn = !this.backend.ventOn;
	}

	ventDef(){
		this.logEvent("ventDef");
		this.backend.ventDefence = !this.backend.ventDefence;
	}

	openBay(){
		this.logEvent("openBay");
		this.rocketBayAccess = true;
		if (this.backend.rocketLanded){
			this.backend.launchRocket();
		} else {
			this.backend.landRocket();
		}
	}

	closeBay(){
		this.logEvent("closeBay");
		this.rocketBayAccess = false;
	}

	diagnostic(){//nolog
		this.backend.runDiagnostics();
	}

	mainDoor(num){
		if (!this.access){
			return;
		}
		this.logEvent("mainDoor " + num);
		this.backend.heavyDoors[num].isLocked = false;
		this.access = false;
	}

	blockLifter(){//no log
		let a = false;
		for (let b in this.backend.heavyDoors){
			if (this.backend.heavyDoors[b].isBlocked){
				a = true;
			}
		}
		if (a && !this.blockLifterGiven){
			immediateApi.getPlayer().give(new Resource(1, "blockLifter", undefined, "textures/blockLifter.png"));
		}
	}

	getSaveData(){
		if (this.isTechnical){return ""}
		let parameters = [this.individualId, this.rocketBayAccess, this.elevatorOpen, this.access, this.blockLifterGiven, -1, -1, this.constructor.name];
		let saved = parameters.join(" ");
		saved += ";";
		return saved;
	}

	setSaveData(parameters){
		let parameterNames = ["individualId", "rocketBayAccess", "elevatorOpen", "access", "blockLifterGiven"];
		let numberParams = parameters.map(Number);
		for (let a = 1; a < parameterNames.length - 1; a++){
			if (typeof numberParams[a] !== 'number'){continue}
			this[parameterNames[a]] = parameters[a] === "true";
			/*if (this[parameterNames[a]] !== numberParams[a]){
				console.error("server asyncronization: " + parameterNames[a]);
			}*/
		}
	}

	logEvent(ev){
		this.backend.eventLog += this.individualId + " " + ev + ";";
	}

	forceEvents(data){
		console.log(data);
		let parameters = data.split(" ");
		if (parameters[1] === ""){return}
		if (parameters.length < 3){
			this[parameters[1]]();
			return;
		}
		this[parameters[1]](parameters[2]);
	}
}


class Cell{
	constructor(backend = baseBackend){
		this.status = 0;
		this.enemyCap = 10;
		this.alreadyCounted = false;
		this.boundary = {x1: 100000, y1: 100000, x2: 0, y2: 0};
		this.distance = 100;
		this.hitboxes = [];
		this.entries = [];
		this.vents = [];
		this.mechanisms = [];
		this.wireEntries = [];
		this.wiringBreakpoints = [];
		this.wiringIntegrity = true;
		this.rarity = 50;
		this.backend = backend;
		this.playerIn = false;
		this.id = this.backend.cells.push(this) - 1;
	}

	defineBoundary(){
		for (let c in this.hitboxes){
			let box = this.hitboxes[c].getBorders();
			if (box[0] < this.boundary.x1){
				this.boundary.x1 = box[0]
			}
			if (box[1] > this.boundary.x2){
				this.boundary.x2 = box[1]
			}
			if (box[2] < this.boundary.y1){
				this.boundary.y1 = box[2]
			}
			if (box[3] > this.boundary.y2){	
				this.boundary.y2 = box[3]
			}
		}
	}

	highlight(){
		for (let a in this.hitboxes){
			this.hitboxes[a].highlight();
		}
	}

	signal(strength){
		this.signalStrength = strength;
		if (this.signalStrength < this.distance){
			this.distance = this.signalStrength;
			if (!this.alreadyCounted){
				this.increaseStatus(2);
				for (let a = 0; a < this.entries.length; a++){
					if (!this.entries[a].assignedDoor.isOpen){
						this.entries[a].assignedDoor.breachRoll();
					}
				}
				this.alreadyCounted = true;
			}
			if (!this.playerIn && this.status >= 50){
				for (let a = 0; a < this.entries.length; a++){
					if (this.entries[a].assignedDoor.isOpen){
						this.getEntry(a).signal(strength + 1);
					}
				}
			}
		}
	}

	electricSignal(strength){
		this.electroStrength = strength;
		if (this.electroStrength < this.voltage && this.wiringIntegrity){
			this.voltage = this.electroStrength;
			for (let a in this.mechanisms){
				this.mechanisms[a].powered = true;
			}
			for (let a = 0; a < this.wireEntries.length; a++){
				this.wireEntries[a].electricSignal(strength + 1);
			}
		}
	}

	unpower(){
		for (let b in this.mechanisms){
			this.mechanisms[b].powered = false;
		}
	}

	increaseStatus(num){
		if ((this.status > 0 || num > 0) && (this.status < 50 || num < 0)){
			this.status += num;
		}
	}

	reactInfestationStatus(){
		this.rollSpawn();
		this.countGrunts();
	}

	getStats(){
		let electro = "disabled";
		if (this.wiringIntegrity){
			electro = "functional";
		}
		let infest = "clear";
		if (this.status > 25){
			infest = "taken over";
		}
		return "Cell number " + this.id + " is " + infest + ". The wires are " + electro + ".";
	}

	rollSpawn(){
		if (this.backend.glyphidsByCell[this.id] < this.enemyCap && this.status >= 50){
			this.spawnEnemy();
			if (this.hasVent && Math.random() * 100 < 20){
				this.backend.ventCells[Math.floor(Math.random() * this.backend.ventCells.length)].spawnEnemy();
			}
		}
	}

	rollWireBreak(){
		let a = Math.random() * 100;
		if (this.wiringBreakpoints.length > 0 && this.wholeWires() > 0 && a < this.status * 0.4 + 0.0125){
			//console.log(a);
			this.wiringBreakpoints[Math.floor(Math.random() * this.wiringBreakpoints.length)].break();
			//console.log("the wires are cut!!!   " + this.id);
		}
	}

	wholeWires(){
		let num = 0;
		for (let a in this.wiringBreakpoints){
			if (this.wiringBreakpoints[a].whole){
				num++;
			}
		}
		return num;
	}

	tryFixing(){
		for (let a in this.wiringBreakpoints){
			if (!this.wiringBreakpoints[a].whole){
				return;
			}
		}
		this.wiringIntegrity = true;
	}

	spawnEnemy(){
		let b = new Grunt(this.boundary.x1, this.boundary.y1);
		b.cell = 19;
		b.allowSpawn = false;
		let t = true;
		for (let a = 0; a < immediateApi.players; a++){
			if (!immediateApi.players[a].outOfSight(b.x, b.y)){
				t = false;
				break;
			}
		}
		for (let d = 0; d < this.rarity && !(b.overlap(0, 0) && b.allowSpawn && t); d++){
			b.tp(this.boundary.x1 + Math.floor(Math.random() * (this.boundary.x2 - this.boundary.x1) * 10) / 10, this.boundary.y1 + Math.floor(Math.random() * (this.boundary.y2 - this.boundary.y1) * 10) / 10);
			b.reloadEntityZone();
			b.allowSpawn = false;
			for (let c in this.hitboxes){
				this.hitboxes[c].allowSpawn();
			}
		}
		if ((!(b.overlap(0, 0) && b.allowSpawn && t))){
			b.kill();
			return;
		}
		b.cell = this.id;
		b.cellId = this.backend.glyphids.push(b) - 1;
		b.backend = this.backend;
		b.deathPlaceholder2 = function(){
			this.backend.glyphids[this.cellId] = undefined;
		}
	}

	countGrunts(){
		let bigList = [];
		for (let a in this.hitboxes){
			bigList.push(...this.hitboxes[a].touch());
		}
		for (let a in bigList){
			if (!bigList[a].alreadyCounted && bigList[a].glyphid){
				bigList[a].alreadyCounted = true;
				bigList[a].cell = this.id;
			}
		}
	}

	getEntry(num){
		return this.entries[num].bindedCell;
	}

	access(num){
		return this.entries[num].assignedDoor.isOpen	;
	}
}


class CellBox extends Box{
	constructor(x1, x2, y1, y2, cell){
		let x = (x1 + x2) / 2;
		let y = (y1 + y2) / 2;
		super(x, y, {x1: x1 - x, x2: x2 - x, y1: y1 - y, y2: y2 - y, additional: []}, undefined, -1000, cell.backend.map);
		this.cell = cell;
		cell.hitboxes.push(this);
	}

	draw(){
		/*if (this.cell.distance < 3){
			draw.placeholderHitbox(this, this.cell.status * 0.01);
		}*/
	}

	highlight(){
		this.draw = this.draw2;
	}

	checkPlayer(){
		for (let a = 0; a < immediateApi.players.length; a++){
			if (this.touchSpecific(immediateApi.players[a])){
				this.cell.backend.checkInPlayer(this.cell.id);
				return true;
			}
		}
		return false;
	}

	draw2(){
		draw.placeholderHitbox(this);
	}

	tickPlaceholderMain(){}

	allowSpawn(){
		let a = this.touch();
		for (let b in a){
			if (a[b].glyphid){
				a[b].allowSpawn = true;
			}
		}
	}

	getBorders(){
		return [this.coordinates.x + this.hitbox.x1, this.coordinates.x + this.hitbox.x2, this.coordinates.y + this.hitbox.y1, this.coordinates.y + this.hitbox.y2];
	}
}


class PathfindingPoint extends Entity{
	constructor(x, y, connections, maP){
		super(x, y, -1000, 10000, {x1: 50, x2: -50, y1: 50, y2: -50}, maP, undefined, true);
		this.baseBackend = baseBackend;
		this.distance = [100, 100, 100, 100, 100, 100, 100];
		this.pointsId = this.baseBackend.wayPoints.push(this) - 1;
		this.connections = [];
		this.connum = connections;
	}

	draw(){
		/*draw.entity(this);
		for (let a = 0; a < this.connections.length; a++){
			draw.can.beginPath();
			draw.can.moveTo(this.x + this.map.xshift(), this.y + this.map.yshift());
			draw.can.lineTo(this.connections[a].x + this.map.xshift(), this.connections[a].y + this.map.yshift());
			draw.can.stroke();
		}
		draw.can.fillRect(this.x + this.map.xshift(), this.y + this.map.yshift(), 15, this.distance * 5 + 1);*/
	}

	find(){
		let wayPoints = [...this.baseBackend.wayPoints];
		wayPoints[this.pointsId] = undefined;
		for (let a = 0; a < this.connum; a++){
			let dis = 100000;
			let num = 0;
			let closest = undefined;
			for (let b = 0; b < wayPoints.length; b++){
				if (wayPoints[b] === undefined){continue}
				if (euclidianDistance(this.x, this.y, wayPoints[b].x, wayPoints[b].y) <= dis){
					closest = wayPoints[b];
					num = b;
					dis = euclidianDistance(this.x, this.y, wayPoints[b].x, wayPoints[b].y);
				}
			}
			this.connections[a] = closest;
			wayPoints[num] = undefined;
		}
	}

	signal(strength, player){
		this.signalStrength = strength;
		if (this.signalStrength < this.distance[player]){
			this.distance[player] = this.signalStrength;
			for (let a = 0; a < this.connections.length && this.signalStrength < 15; a++){
				this.connections[a].signal(strength + 1, player);
			}
		}
	}
}


class Wire extends ObjectHitbox{
	constructor(x1, x2, y1, y2, backend){
		super(x1 - 2, x2 + 2, y1 - 2, y2 + 2, true, undefined, undefined, backend.map);
		for (let a in this.appearances){
			this.map.loadingZones[this.appearances[a].x][this.appearances[a].y][this.appearances[a].id] = undefined;
		}
		let zonesToLoad = [
			{x: -1, y: -1}, {x: 0, y: -1}, {x: 1, y: -1}, {x: -1, y: 0}, {x: 0, y: 0}, {x: 1, y: 0}, {x: -1, y: 1}, {x: 0, y: 1}, {x: 1, y: 1}
		];
		for (let a in zonesToLoad){
			this.listAppearance(this.loadingZone.x + zonesToLoad[a].x, this.loadingZone.y + zonesToLoad[a].x, this.map.loadingZones[this.loadingZone.x + zonesToLoad[a].x][this.loadingZone.y + zonesToLoad[a].x].push(this) - 1);
		}
	}

	draw(){
		draw.wire(this)
	}
}


class WiringConnector{
	constructor(x1, y1, x2, y2, maP = map){
		let a = new Entity(x2, y2, -1000, 10000, {x1: 0, y1: 0, x2: 0, y2: 0}, maP, 50, true);
		a.tickMove = function(){this.age()};
		let b = new Entity(x1, y1, -1000, 10000, {x1: 0, y1: 0, x2: 0, y2: 0}, maP, 50, true);
		b.tickMove = function(){this.age()};
		a.other = b;
		b.other = a;
		a.connector = true;
		b.connector = true;
		a.bindedCell = [x1 / 20 - 0.5, y1 / 20 - 0.5];
		b.bindedCell = [x2 / 20 - 0.5, y2 / 20 - 0.5];
	}
}


class WireBreakpoint extends ObjectHitbox{
	constructor(x, y, x2, y2, maP = map){
		super(x + 5, x + 15, y + 5, y + 15, true, undefined, undefined, maP);
		let a = new Entity(x2, y2, -1000, 10000, {x1: 2, y1: 2, x2: 2, y2: 2}, maP, 20, true);
		a.tickMove = function(){this.age()};
		a.backlink = this;
		this.whole = true;
		this.interactive = true;
		this.interface = new WiringInterface(this);
		maP.assignIndividualId(this);
	}

	interact(ent){
		if (ent.secondTime){
			delete ent.secondTime;
			return;
		}
		if ((this.whole && !ent.activeInterfaces[4]) || (ent.touchingWires && !this.touched)){
			return;
		}
		ent.touchingWires = true;
		if (!ent.activeInterfaces[4]){
			ent.activeInterfaces[4] = true;
			this.touched = true;
            this.intId = ent.personalInterfaces.push(this.interface) - 1;
            ent.speedMultipliers[0] = 0;
		} else {
			ent.activeInterfaces[4] = false;
			this.touched = false;
			ent.personalInterfaces[this.intId] = undefined;
			ent.speedMultipliers[0] = 1;
			delete ent.touchingWires;
		}
		ent.secondTime = true;
		new InteractivityHitbox(ent);
	}

	draw(){
		if (!this.whole){
			new EletroParticle(this);
		}
	}

	break(){
		this.bindedCell.wiringIntegrity = false;
		this.interface.brokenWire.status = 0;
		this.whole = false;
	}

	fix(){
		this.whole = true;
		this.bindedCell.tryFixing();
	}

	getSaveData(){
		if (this.isTechnical){return ""}
		let parameters = [this.individualId, this.whole, this.interface.brokenWire.status, undefined, undefined, undefined, undefined, this.constructor.name];
		return(parameters.join(" "));
	}

	setSaveData(parameters){
		this.whole = parameters[1] === "true";
		this.interface.brokenWire.status = parseFloat(parameters[2]);
	}

	logEvent(ev){
		baseBackend.eventLog += this.individualId + " " + ev + ";";
	}

	forceEvents(data){
		let parameters = data.split(" ");
		this.interface.brokenWire.status = parseFloat(parameters[1]);
		if (parameters[1] === "2"){
			this.fix();
		}
	}
}


class WiringInterface extends Interface{
	constructor(point){
		super(150, 450, 225, 375);
		this.point = point;
		let bg = new InterfaceElement(this, 150, 450, 225, 375);
		this.brokenWire = new InterfaceElement(this, 200, 400, 275, 325);
		this.brokenWire.status = 0;
		this.elements[0].draw = function(){
			draw.wiringBg(this);
		}
		bg.draw = function(){
			draw.wireFrame(this);
		}
		this.brokenWire.draw = function(){
			draw.brokenWire(this);
		}
		this.brokenWire.functionality = function(){
			if (immediateApi.getPlayer().inventory.mainhand[0].type === "wirecutters" && this.status === 0){
				this.status = 1;
				this.parentInterface.point.logEvent("1");
			}
			if (immediateApi.getPlayer().inventory.mainhand[0].type === "replacementWire" && this.status === 1){
				this.parentInterface.fix();
				this.parentInterface.point.logEvent("2");
			}
		}
	}

	fix(){
		this.brokenWire.status = 2;
		this.point.fix();
	}
}


class BaseDoor extends ObjectHitbox{
	constructor(x1, x2, y1, y2, maP, base = baseBackend, isHeavy = false, terminalX, terminalY){
		super(x1, x2, y1, y2, undefined, undefined, undefined, maP);
		let direction = Math.abs(x2 - x1) > Math.abs(y2 - y1);
		this.dir = 0;
		this.direction = direction;
		this.backend = base;
		this.isHeavy = isHeavy;
		this.powered = true;
		this.isOpen = false;
		this.isLocked = false;
		this.isBlocked = false;
		this.integrity = 1;
		this.moving = false;
		this.stage = 20;
		this.entities = [];
		new DoorEntity((x1 + x2) / 2 + (x2 - x1) * !direction, (y1 + y2) / 2 + (y2 - y1) * direction, maP, this);
		new DoorEntity((x1 + x2) / 2 - (x2 - x1) * !direction, (y1 + y2) / 2 - (y2 - y1) * direction, maP, this);
		if (isHeavy){
			this.cooldown = 2000;
			this.spawnHeavyDoorTerminal(terminalX + 10, terminalY + 10);
			base.heavyDoors.push(this);
		} else {
			this.cooldown = 200;
			this.interactive = true;
		}
		base.doors.push(this);
		this.map.assignIndividualId(this);
	}

	draw(){
		draw.door(this);
		//console.log(this.stage);
	}

	interact(){
		if (!this.moving){
			this.logEvent("interact");
			this.moving = true;
			if (this.fake){
				this.close();
			} else {
				this.open();
			}
		}
	}

	spawnHeavyDoorTerminal(x, y){
		this.interactive = false;
		this.terminal = new DoorTerminal(this, x, y);
	}

	moveTick(obj, dir = undefined){
		if (dir !== undefined){
			obj.dir = dir;
		}
		if (obj.stage === obj.dir){
			return;
		}
		obj.stage += Math.sign(obj.dir - obj.stage);
		setTimeout(obj.moveTick, obj.map.framerate, obj);
	}

	leverSwitch(){
		if ((!this.isLocked && !this.isBlocked && this.powered)){
			if (immediateApi.constructor.name === "Client"){
				this.logEvent("leverSwitch");
				return;
			}
			this.interact();
			return;
		}
		if (immediateApi.constructor.name === "Client" && (!this.powered && !this.isLocked && !this.isBlocked && immediateApi.getPlayer().inventory.mainhand[0].type === "crowbar")){
			this.interact();
			return;
		}
	}

	open(){
		this.moving = true;
		this.isOpen = true;
		setTimeout((obj) => {obj.fake = true; obj.moveTick(obj, 0); obj.moving = false}, this.cooldown, this);
	}

	close(){
		this.moving = true;
		this.isOpen = false;
		setTimeout((obj) => {obj.fake = false; new PushOutBox(20, this, 4); obj.moveTick(obj, 20); obj.moving = false}, this.cooldown, this);
	}

	lock(){
		this.isLocked = true;
		this.close();
	}

	block(){
		this.logEvent("block");
		this.isBlocked = true;
		this.close();
	}

	unlock(){
		this.isLocked = false;
	}

	unblock(){
		this.isBlocked = false;
	}

	breachRoll(){
		let a = Math.random() * 100;
		let chance = 0.06;
		if (this.isHeavy){
			chance *= 4 * !this.powered + 1;
			chance *= -0.5 * (this.isLocked && this.powered) + 1;
		} else {
			chance = 2;
		}
		if (this.isBlocked){
			chance = 0.03;
		}
		if (a < chance){
			this.breach();
		}
		//console.log("rolled for breach: " + a + " out of " + chance);
	}

	breach(){
		this.isBlocked = true;
		console.log("!!!door breached!!!");
		this.open();
	}	

	getSaveData(){
		if (this.isTechnical){return ""}
		let parameters = [this.individualId, this.powered, this.isOpen, this.isLocked, this.isBlocked, this.stage, this.integrity, this.constructor.name, this.moving, this.fake, this.dir];
		return(parameters.join(" "));
	}

	setSaveData(parameters){
		let parameterNames = ["individualId", "powered", "isOpen", "isLocked", "isBlocked", "stage", "integrity"];
		let numberParams = parameters.map(Number);
		for (let a = 1; a < parameterNames.length; a++){
			if (isNaN(numberParams[a])){
				this[parameterNames[a]] = parameters[a] === "true";
				continue;
			}
			this[parameterNames[a]] = numberParams[a];
			if (this[parameterNames[a]] !== numberParams[a]){
				console.error("server asyncronization: " + parameterNames[a]);
			}
		}
		this.moving = parameters[8] == "true";
		this.fake = parameters[9] == "true";
		this.dir = parseFloat(parameters[10]);
	}

	logEvent(ev){
		this.backend.eventLog += this.individualId + " " + ev + ";";
	}

	forceEvents(data){//one event
		let parameters = data.split(" ");
		if (parameters[1] === ""){return}
		this[parameters[1]]();
	}
}


class DoorTerminal extends MainTerminal{
	constructor(connected, x, y){
		let a = new DoorInterface();
		super(x, x + 20, y, y + 20, 2, a, connected.map);
		this.bound = connected;
		a.terminal = this;
	}

	draw(){
		draw.doorTerminal(this);
	}

	leverSwitch(){
		this.bound.leverSwitch();
	}

	block(){
		this.bound.block();
	}
}


class DoorInterface extends Interface{
	constructor(terminal){
		super(150, 450, 225, 375);
		this.terminal = terminal;
		this.lever = new InterfaceElement(this, 180, 285, 255, 345);
		this.lockdown = new InterfaceElement(this, 315, 420, 255, 345);
		this.elements[0].draw = function(){
			draw.wiringBg(this);
		}
		this.lever.draw = function(){
			draw.lever(this, this.parentInterface.terminal.bound.isOpen);
		}
		this.lockdown.drawActive = function(){
			draw.button(this, true, this.parentInterface.terminal.bound.isBlocked);
		}
		this.lockdown.drawUnactive = function(){
			draw.button(this, false, this.parentInterface.terminal.bound.isBlocked);
		}
		this.lever.functionality = function(){
			this.parentInterface.terminal.leverSwitch();
		}
		this.lockdown.functionality = function(){
			this.parentInterface.terminal.block();
			if (this.parentInterface.terminal.bound.isBlocked && immediateApi.getPlayer().inventory.mainhand[0].type === "blockLifter"){
				this.parentInterface.terminal.bound.unblock();
				immediateApi.getPlayer().inventory.mainhand[0].decrease(1);
				this.parentInterface.terminal.bound.backend.mainTerminal.blockLifterGiven = false;
			}
		}
	}
}


class DoorEntity extends Entity{
	constructor(x, y, maP, door, backend = baseBackend){
		super(x + 1, y + 1, -1000, 10000, {x1: 10, x2: -10, y1: 10, y2: -10}, maP, undefined, true);
		this.backend = backend;
		this.backend.doorEntities.push(this);
		this.assignedDoor = door;
		this.doorId = door.entities.push(this) - 1;
	}

	getOther(){
		return(this.assignedDoor.entities[!this.doorId * 1]);
	}

	draw(){}

	tickPlaceholderMain(){}
}


class VentTerminal extends MainTerminal{
	constructor(x1, x2, y1, y2, cell, maP = map, backend = baseBackend){
		let a = new VentInterface(backend);
		super(x1, x2, y1, y2, 5, a, maP);
		backend.cells[cell].mechanisms.push(this);
		backend.coolingSystems.push(this);
		a.terminal = this;
	}

	draw(){
		draw.ventTerminal(this);
	}
}


class VentInterface extends Interface{
	constructor(backend){
		super(150, 450, 225, 375);
		this.backend = backend;
		this.elements[0].draw = function(){
			draw.ventBg(this);
		}
		let a = new InterfaceElement(this, 238, 242, 238, 242);
		a.draw = function(){
			if (this.parentInterface.backend.ventDefence){
				draw.can.fillStyle = "green";
			} else {
				draw.can.fillStyle = "red";
			}
			draw.can.fillRect(this.hitbox.x1, this.hitbox.y1, this.hitbox.x2 - this.hitbox.x1, this.hitbox.y2 - this.hitbox.y1);
		}
		a = new InterfaceButton(240, 300, this, 100, true);
		a.functionality = function(){this.parentInterface.defence()}
		a = new InterfaceButton(360, 300, this, 100, true);
		a.functionality = function(){this.parentInterface.vent()}
	}

	defence(){
		this.backend.ventDefence = !this.backend.ventDefence;
	}

	vent(){
		this.backend.ventOn = !this.backend.ventOn;
	}
}


class Code{
	constructor(inter, funct, code){
		inter.codes.push(this);
		this.inter = inter;
		this.funct = funct;
		this.code = code;
	}

	functionality(){
		this.inter[this.funct]();
	}
}


class InterfaceButton extends InterfaceElement{
	constructor(x, y, parent, size = 60, lever = false){
		super(parent, x - size / 2, x + size / 2, y - size / 2, y + size / 2);
		this.isPushed = false;
		if (lever){
			this.draw = function(){
				draw.lever(this, this.isPushed);
			}
			this.functionality2 = function(){
				this.isPushed = !this.isPushed;
			}
		} else {
			this.functionality2 = function(){
				this.isPushed = true;
				setTimeout((obj) => {obj.isPushed = false}, 400, this);
			}
			this.draw = function(){
				draw.button2(this, this.isPushed);
			}
		}
	}
}
function invisibleButton(xs, ys, inter){
	for (let a in xs){
		let b = new InterfaceButton(xs[a], ys[a], inter, 15);
		b.draw = function(){}
		b.symbol = parseInt(a);
		b.functionality = function(){
			if (this.parentInterface.display.code.length < 5){
				this.parentInterface.display.code.push([this.symbol]);
			}
		}
	}
}


class Cart extends Entity{
	constructor(x, y, maP = map, backend = baseBackend){
		super(x, y, -1000, 10000, {x1: -15, x2: 15, y1: -15, y2: 15}, maP);
		this.backend = backend;
		this.backend.cart = this;
		this.linked = [false, false, false, false, false, false, false, false, false];
		this.fuel = 0;
		this.oxygen = 0;
		this.water = 0;
		this.spacing = {x: 0, y: 0};
		this.block = new ObjectHitbox(this.x + this.hitbox.x1, this.x + this.hitbox.x2, this.y + this.hitbox.y1, this.y + this.hitbox.y2, false, this.x, this.y, this.map);
		this.block.draw = function(){}
		maP.assignIndividualId(this.block);
		this.block.backlink = this;
		this.block.interactive = true;
		this.block.forceEvents = function(data){//only interact
			let parameters = data.split(" ");
			if (parameters[1] === ""){return}
			this[parameters[1]](this.backlink.backend.map.individualObjects[parameters[2]], parameters[3], parameters[4]);
		}
		this.block.interact = function(ent, x = immediateApi.getPlayer().x, y = immediateApi.getPlayer().y){
			if (!this.backlink.linked[immediateApi.players.indexOf(ent)] && this.backlink.getIfLinked()){return}
			this.backlink.backend.eventLog += this.individualId + " interact " + immediateApi.getPlayer().individualId + " " + x + " " + y + ";";
			this.backlink.linked[immediateApi.players.indexOf(ent)] = !this.backlink.linked[immediateApi.players.indexOf(ent)];
			if (this.backlink.linked[immediateApi.players.indexOf(ent)]){
				this.backlink.spacing.x = this.x - x;
				this.backlink.spacing.y = this.y - y;
				this.hitbox = {x1: -11.5, x2: 11.5, y1: -11.5, y2: 11.5};
				immediateApi.getPlayer().speedMultipliers[2] = 0.8;
			} else {
				this.hitbox = {x1: -15, x2: 15, y1: -15, y2: 15};
				immediateApi.getPlayer().speedMultipliers[2] = 1;
			}
		}
	}

	getIfLinked(){
		let t = false;
		for (let a in this.linked){
			t = this.linked[a] || t;
		}
		return t;
	}

	draw(){
		draw.cart(this);
	}

	tickPlaceholderMain(){
		for (let a in immediateApi.players){
			if (this.linked[a]){
				this.tp(immediateApi.players[a].x + this.spacing.x, immediateApi.players[a].y + this.spacing.y);
				return;
			}
			if (this.x - this.backend.heavyDoors[7].x > 0 && this.x - this.backend.heavyDoors[7].x < 60 && Math.abs(this.y - this.backend.heavyDoors[7].y) < 20 && !this.backend.heavyDoors[7].isOpen){
				this.backend.heavyDoors[7].interact();
			}
		}
	}

	tp(x, y){
		this.block.fake = true;
		if (this.overlap(x - this.x, y - this.y)){
			this.x = x;
			this.y = y;
		} else {
			immediateApi.getPlayer().movePlayer(-immediateApi.getPlayer().moveVectoring.x, -immediateApi.getPlayer().moveVectoring.y);//TODO костыль исправить
		}
		if (!this.overlap(0, 0)){
			this.hitbox = {x1: 15, x2: -15, y1: 15, y2: -15, additional: []};
			this.tp(immediateApi.getPlayer().x + this.spacing.x, immediateApi.getPlayer().y + this.spacing.y);
			this.hitbox = {x1: -15, x2: 15, y1: -15, y2: 15, additional: []};
		}
		this.block.fake = false;
		this.reloadEntityZone();
		this.block.x = this.x;
		this.block.y = this.y;
		this.block.additionalHitboxes();
	}

	move(x = 0, y = 0){
		this.block.fake = true;
		if (this.overlap(x, y)){
			this.x += x;
			this.y += y;
		} else {
			this.contact({x: x, y: y});
		}
		this.block.fake = false;
		this.reloadEntityZone();
		this.block.x = this.x;
		this.block.y = this.y;
		this.block.additionalHitboxes();
	}

	unstuck(){
		if (immediateApi.getPlayer().overlapList().indexOf(this.block) >= 0){
			immediateApi.getPlayer().move(20, 0);
			immediateApi.getPlayer().move(-20, 0);
			immediateApi.getPlayer().move(0, 20);
			immediateApi.getPlayer().move(0, -20);
		}
	}

	getSaveData(){
		if (this.isTechnical){return ""}
		let parameters = [this.individualId, this.x, this.y, this.life, this.hp, this.block.hitbox.x1, this.linked.join("#"), this.constructor.name, this.fuel, this.oxygen, this.water];
		return(parameters.join(" "));
	}

	setSaveData(parameters){
		let parameterNames = ["individualId", "x", "y", "life", "hp", "hitbox", "linked"];
		let b = parameters[6].split("#");
		for (let a in b){
			this[parameterNames[6]][a] = b[a] === "true";
			if (this.linked === false || this.linked === true){
				console.error("critical pizdets");
			}
		}
		if (parameters[5] <= -15){
			this.block.hitbox = {x1: -15, x2: 15, y1: -15, y2: 15, additional: []};
		} else {
			this.block.hitbox = {x1: -11.5, x2: 11.5, y1: -11.5, y2: 11.5};
		}
		let numberParams = parameters.map(Number);
		for (let a = 1; a < parameterNames.length - 3; a++){
			if (typeof numberParams[a] !== 'number'){continue}
			this[parameterNames[a]] = numberParams[a];
			if (this[parameterNames[a]] !== numberParams[a]){
				console.error("server asyncronization: " + parameterNames[a]);
			}
		}
		parameterNames = ["fuel", "oxygen", "water"];
		for (let a = 0; a < parameterNames.length; a++){
			this[parameterNames[a]] = numberParams[a + 8];
		}
		this.tp(parseFloat(parameters[1]), parseFloat(parameters[2]));
	}
}


class CartFiller extends Box{
	constructor(x, y, maP = map, type = "rocketType", backend = baseBackend){
		super(x, y, {x1: -10, x2: 10, y1: -10, y2: 10}, undefined, -1000, maP);
		this.type = type;
		this.ready = 0;
		this.backend = backend;
		this.fuel = 0;
		this.water = 0;
		this.oxygen = 0;
		this[this.type]();
		maP.assignIndividualId(this);
	}

	rocketType(){
		this.backend.rocketRefueller = this;
		this.tickPlaceholderMain = this.tick1;
	}

	reactorType(){
		this.backend.reactorPort = this;
		this.fuel = 20;
		this.tickPlaceholderMain = this.tick2;
	}

	vaultType1(){
		this.tickPlaceholderMain = this.tick3;
	}

	vaultType2(){
		this.tickPlaceholderMain = this.tick4;
	}

	waterType(){
		this.oxygen = 20;
		this.water = 20;
		this.tickPlaceholderMain = this.tick5;
		this.backend.supplies = this;
	}

	tickPlaceholderMain(){}

	tick1(){
		if (this.ready === 10 && this.touchSpecific(this.backend.cart)){
			if (this.fuel > 0 && this.backend.cart.fuel < 20){
				this.fuel--;
				this.backend.cart.fuel++;
			}
			if (this.water > 0 && this.backend.cart.water < 10){
				this.water--;
				this.backend.cart.water++;
			}
			if (this.oxygen > 0 && this.backend.cart.oxygen < 10){
				this.oxygen--;
				this.backend.cart.oxygen++;
			}
		}
		this.ready++
		if (this.ready > 10){
			this.ready = 0;
		}
	}

	tick2(){
		if (this.ready === 10 && this.touchSpecific(this.backend.cart) && this.fuel < 40 && this.backend.cart.fuel > 0){
			this.backend.cart.fuel--;
			this.fuel++;
		}
		this.ready++
		if (this.ready > 10){
			this.ready = 0;
		}
	}

	tick3(){
		if (this.ready === 10 && this.touchSpecific(this.backend.cart) && this.backend.vault[this.reductionType] < 100 && this.backend.cart[this.reductionType] > 0){
			this.backend.cart[this.reductionType]--;
			this.backend.vault[this.reductionType]++;
		}
		this.ready++
		if (this.ready > 10){
			this.ready = 0;
		}
	}

	tick4(){
		if (this.ready === 10 && this.touchSpecific(this.backend.cart) && this.backend.vault[this.reductionType] > 0 && (this.backend.cart[this.reductionType] < 20 && this.reductionType === "fuel" || this.backend.cart[this.reductionType] < 10 && this.reductionType !== "fuel")){
			this.backend.cart[this.reductionType]++;
			this.backend.vault[this.reductionType]--;
		}
		this.ready++
		if (this.ready > 10){
			this.ready = 0;
		}
	}

	tick5(){
		console.log(this.water, this.backend.cart.water);
		if (this.ready === 10 && this.touchSpecific(this.backend.cart)){
			if (this.water < 20 && this.backend.cart.water > 0){
				this.water++;
				this.backend.cart.water--;
			}
			if (this.oxygen < 20 && this.backend.cart.oxygen > 0){
				this.oxygen++;
				this.backend.cart.oxygen--;
			}
		}
		this.ready++
		if (this.ready > 10){
			this.ready = 0;
		}
	}

	getSaveData(){
		if (this.isTechnical){return ""}
		let parameters = [this.individualId, this.fuel, this.oxygen, this.water, undefined, undefined, undefined, this.constructor.name];
		return(parameters.join(" "));
	}

	setSaveData(parameters){
		console.log("savedata edited");
		let parameterNames = ["individualId", "fuel", "oxygen", "water"];
		let numberParams = parameters.map(Number);
		for (let a = 1; a < parameterNames.length - 3; a++){
			if (typeof numberParams[a] !== 'number'){continue}
			this[parameterNames[a]] = numberParams[a];
			if (this[parameterNames[a]] !== numberParams[a]){
				console.error("server asyncronization: " + parameterNames[a]);
			}
		}
	}
}


class WaterTank extends ObjectHitbox{
	constructor(x1, y1, x2,y2){
		super(x1, x2, y1, y2);
		this.interactive = true;
		this.map.assignIndividualId(this);
	}

	draw(){
		draw.waterTank(this, baseBackend.supplies.water);
	}

	interact(){
		if (immediateApi.constructor.name === "Server"){
			baseBackend.supplies.water -= 20;
			return;
		}//TODO inventory sync
		if (immediateApi.getPlayer().inventory.mainhand[0].type === "unHydratedBurger" && baseBackend.supplies.water >= 20){
			this.logEvent("interact");
			baseBackend.supplies.water -= 20;
			immediateApi.getPlayer().inventory.mainhand[0].hydrate();
		}
	}

	logEvent(ev){
		baseBackend.eventLog += this.individualId + " " + ev + ";";
	}

	forceEvents(data){
		console.log(data);
		let parameters = data.split(" ");
		if (parameters[1] === ""){return}
		if (parameters.length < 3){
			this[parameters[1]]();
			return;
		}
		console.log(parameters[1]);
		this[parameters[1]]();
	}
}


class Vault{
	constructor(x1, y1, x2, y2, x3, y3, maP = map, backend = baseBackend){
		this.backend = backend;
		this.backend.vault = this;
		this.fuel = 0;
		this.oxygen = 0;
		this.water = 0;
		this.mainBody = new ObjectHitbox(x1, x2, y1, y2, undefined, undefined, undefined, maP);
		this.mainBody.vault = this;
		this.mainBody.draw = function(){
			draw.vaultModule(this);
		}
		this.tube = new ObjectHitbox(x1, x3, y2, y3, undefined, undefined, undefined, maP);
		this.tube.draw = function(){
			draw.vaultTube(this);
		}
		let a = new CartFiller(x3, (y3 - y2) / 8 * 3 + y2, maP, "vaultType1");
		a.reductionType = "oxygen";
		a = new CartFiller(x3, (y3 - y2) / 8 * 5 + y2, maP, "vaultType1");
		a.reductionType = "water";
		a = new CartFiller(x3, (y3 - y2) / 8 * 7 + y2, maP, "vaultType1");
		a.reductionType = "fuel";
		a = new CartFiller((x2 - x3) / 6 * 3 + x1, y2, maP, "vaultType2");
		a.reductionType = "oxygen";
		a = new CartFiller((x2 - x3) / 6 * 5 + x1, y2, maP, "vaultType2");
		a.reductionType = "water";
		a = new CartFiller((x2 - x3) / 6 * 7 + x1, y2, maP, "vaultType2");
		a.reductionType = "fuel";
	}
}


class FoodDispencer extends ObjectHitbox{
	constructor(x, y){
		super(x - 20, x + 20, y - 20, y + 20);
		this.interactive = true;
		this.hasFood = false;
		baseBackend.foodDispencer = this;
	}

	draw(){
		draw.foodDispencer(this);
	}

	interact(){
		if (this.hasFood){
			immediateApi.getPlayer().give(new Burger);
			this.hasFood = false;
		}
	}
}


class Burger extends Resource{
	constructor(){
		super(1, "unHydratedBurger", undefined, "textures/burger1.png");
	}

	hydrate(){
		this.type = "burger";
		this.icon.src = "textures/burger2.png";
	}

	use(){
		if (this.type === "burger"){
			this.decrease(1);
			immediateApi.getPlayer().heal(100);
		}
	}
}


class PushOutBox extends Box{
	constructor(life, boundWith, force = 3){
		super(boundWith.x, boundWith.y, boundWith.hitbox, undefined, life, boundWith.map);
		this.force = force;
		this.bound = boundWith;
	}

	tickPlaceholderMain(){
		this.bound.fake = true;
		let contacts = this.touch();
		for (let a in contacts){
			contacts[a].move(this.force * !this.bound.direction * Math.sign(contacts[a].x - this.coordinates.x), this.force * this.bound.direction * Math.sign(contacts[a].y - this.coordinates.y));
		}
		this.bound.fake = false;
		this.age();
	}
}


class MeltdownParticle extends Particle{
	constructor(maP = map){
		super(0, 0, 100, undefined, maP);
	}

	draw(){
		draw.meltdownParticle();
	}
}


function raycast(source, speed, destination){
	let a = new Entity(source.x, source.y, -1000, 10000, {x1: 0, x2: 0, y1: 0, y2: 0}, source.map, 100, true);
	let stepProjections = projections(destination.x - source.x, destination.y - source.y, speed);
	while(a.life > 0){
		a.age();
		if (a.moveWithoutRounding(stepProjections.x, stepProjections.y)){
			a.kill();
			return false;
		}
		if (euclidianDistance(a.x, a.y, destination.x, destination.y) <= speed){
			break;
		}
	}
	a.kill();
	return true;
}


/*module.exports.BaseBackend = BaseBackend;
module.exports.MainTerminal = MainTerminal;
module.exports.MainTerminalInterface = MainTerminalInterface;
module.exports.Cell = Cell;
module.exports.CellBox = CellBox;
module.exports.PathfindingPoint = PathfindingPoint;
module.exports.Wire = Wire;
module.exports.WiringConnector = WiringConnector;
module.exports.WireBreakpoint = WireBreakpoint;
module.exports.WiringInterface = WiringInterface;
module.exports.BaseDoor = BaseDoor;
module.exports.DoorTerminal = DoorTerminal;
module.exports.DoorInterface = DoorInterface;
module.exports.DoorEntity = DoorEntity;
module.exports.VentTerminal = VentTerminal;
module.exports.VentInterface = VentInterface;
module.exports.Code = Code;
module.exports.InterfaceButton = InterfaceButton;
module.exports.invisibleButton = invisibleButton;
module.exports.Cart = Cart;
module.exports.CartFiller = CartFiller;
module.exports.WaterTank = WaterTank;
module.exports.Vault = Vault;
module.exports.FoodDispencer = FoodDispencer;
module.exports.Burger = Burger;
module.exports.PushOutBox = PushOutBox;
module.exports.MeltdownParticle = MeltdownParticle;
module.exports.raycast = raycast;*/
/*export {
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
}*/