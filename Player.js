class Player extends Entity{
	constructor(x = 2100, y = 1000, hp = 100, defence = 0, hitbox = {x1: -7.5, x2: 7.5, y1: -15, y2: 15}, entityScreen = map, speed = 3){
		super(x, y, hp, defence, hitbox, entityScreen);
		this.moveVectoring = {x: 0, y: 0};
		this.speed = speed;
		this.playerDamageMultiplier = 0;
		this.mousePosition = {x: 0, y: 0};
		this.mouseShift = {x: 0, y: 0}
		this.mouseBox = new Box(this.mousePosition.x, this.mousePosition.y, {x1: -8, x2: 8, y1: -8, y2: 8});
		this.mouseBox.player = this;
		this.xshift = 0;
		this.yshift = 0;
		this.killCount = 0;
		this.inventory = new Inventory(this);
		this.minimap = new Minimap;
		this.activeInterfaces = [];//0 - , 1 - , 2 - , 3 - main, 4 - wiring, 5 - vent
		this.personalInterfaces = [];//реальные объекты интерфейсов у игрока
		this.target = this;
		this.rockets = [];
		this.activeRockets = [];
		this.speedMultipliers = [1, 1, 1];//terminals, ---, cart
		this.weaponSpeedMultipliers = [1, 1];
		this.damageMultipliers = [1, 1];
		this.maxShiftBox = {x1: 200, x2: 400, y1: 200, y2: 400, cameraSpeedMultiplier: 0.05, minimalCameraSpeed: 0.5};
		this.walkAnimationTechnicalities = {stepAnimation: 0, turn: 1, ticksPerStep: 3}
		this.mouseBox.tickPlaceholderMain = function(){
			let list = this.touch();
			if (list.length > 0){
				this.player.target = list[0];
			}
		}
		new HUD(this.inventory, this);
	}

	draw(){
		draw.amogus(this, Math.floor(this.walkAnimationTechnicalities.stepAnimation/this.walkAnimationTechnicalities.ticksPerStep));
	}

	outOfSight(x, y){
		return x + this.map.xshift() < 0 || x + this.map.xshift() > 600 || y + this.map.yshift() < 0 || y + this.map.yshift() > 600;
	}

	movePlaceholder1(){
		this.shiftRefresh();
		if ((this.moveVectoring.x || this.moveVectoring.y) && this.walkAnimationTechnicalities.stepAnimation < 3 * this.walkAnimationTechnicalities.ticksPerStep){
			this.walkAnimationTechnicalities.stepAnimation++;
		} else {
			this.walkAnimationTechnicalities.stepAnimation = 0;
		}
		if (this.moveVectoring.x){
			this.walkAnimationTechnicalities.turn = -this.moveVectoring.x;
		}
		if (this === immediateApi.getPlayer()){
			this.map.manageCursor(this.mousePosition.x, this.mousePosition.y);
		}
		this.mouseBox.tp(this.mousePosition.x - this.map.xshift(), this.mousePosition.y - this.map.yshift());
		this.mouseShift.x = this.mousePosition.x - this.map.xshift() - this.x;
		this.mouseShift.y = this.mousePosition.y - this.map.yshift() - this.y;
		for (let a = 0; a < this.activeRockets.length; a++){
			this.rockets[this.activeRockets[a]].goal = {x: this.mousePosition.x - this.map.xshift(), y: this.mousePosition.y - this.map.yshift()};
		}
		if (this === immediateApi.getPlayer()){
			this.map.manageCursor(this.mousePosition.x, this.mousePosition.y);
		}
	}

	tickPlaceholder1(){
		this.movePlayer(this.moveVectoring.x, this.moveVectoring.y);
		for (let a = 0; a < this.inventory.mainhand.length; a++){
			this.inventory.mainhand[a].tickMove();
		}
		this.map.loadedZone = this.loadingZone;
	}
	
	movePlayer(x, y){
		this.moveDirection(x, y, this.speedGet());
	}

	speedGet(){
		let a = 1;
		for (let b in this.speedMultipliers){
			a *= this.speedMultipliers[b];
		}
		return a * this.speed;
	}

	deathPlaceholder1(){
		alert("Game over!");
	}
	
	upPress(){
		this.moveVectoring.y -= 1;
		if (this.moveVectoring.y < -1){
			this.moveVectoring.y = -1;
		}
	}
	downPress(){
		this.moveVectoring.y += 1;
		if (this.moveVectoring.y > 1){
			this.moveVectoring.y = 1;
		}
	}
	leftPress(){
		this.moveVectoring.x -= 1;
		if (this.moveVectoring.x < -1){
			this.moveVectoring.x = -1;
		}
	}
	rightPress(){
		this.moveVectoring.x += 1;
		if (this.moveVectoring.x > 1){
			this.moveVectoring.x = 1;
		}
	}

	refreshRocketList(){
		this.activeRockets = [];
		for (let a = 0; a < this.rockets.length; a++){
			if (this.rockets[a] === undefined){
				continue;
			}
			this.activeRockets.push(a);
		}
	}

	moveCamera(x, y){
		this.xshift -= x;
		this.yshift -= y;
	}

	shiftRefresh(){
		let screenX = this.x + this.xshift;
		let screenY = this.y + this.yshift;
		if (screenX > this.map.size || screenX < 0 || screenY > this.map.size || screenY < 0){
			this.xshift = -this.x + this.map.size / 2;
			this.yshift = -this.y + this.map.size / 2;
		}
		if (screenX > this.maxShiftBox.x2){
			this.moveCamera(this.maxShiftBox.minimalCameraSpeed + (screenX - this.maxShiftBox.x2) * this.maxShiftBox.cameraSpeedMultiplier, 0)
			//this.xshift = -this.x + this.maxShiftBox.x2;
		} else if (screenX < this.maxShiftBox.x1){
			this.moveCamera(-this.maxShiftBox.minimalCameraSpeed + (screenX - this.maxShiftBox.x1) * this.maxShiftBox.cameraSpeedMultiplier, 0)
			//this.xshift = -this.x + this.maxShiftBox.x1;
		}
		if (screenY > this.maxShiftBox.y2){
			this.moveCamera(0, this.maxShiftBox.minimalCameraSpeed + (screenY - this.maxShiftBox.y2) * this.maxShiftBox.cameraSpeedMultiplier)
			//this.yshift = -this.y + this.maxShiftBox.y2;
		} else if (screenY < this.maxShiftBox.y1){
			this.moveCamera(0, -this.maxShiftBox.minimalCameraSpeed + (screenY - this.maxShiftBox.y1) * this.maxShiftBox.cameraSpeedMultiplier)
			//this.yshift = -this.y + this.maxShiftBox.y1;
		}
	}

	reloadEntityZone(){
		if (Math.floor(this.x / this.map.size) != this.loadingZone.x || Math.floor(this.y / this.map.size) != this.loadingZone.y){
			this.map.entityZones[this.loadingZone.x][this.loadingZone.y][this.zoneId] = undefined;
			this.loadingZone = {x: Math.floor(this.x / this.map.size), y: Math.floor(this.y / this.map.size)};
			this.zoneId = this.map.entityZones[this.loadingZone.x][this.loadingZone.y].push(this) - 1;
			for (let a = 0; a < this.bindedHitboxes.length; a++){
				this.bindedHitboxes[a].reloadLoadingZone();
			}
			this.map.reloadEnemies();
		}
	}
}


class Inventory extends Interface{
	constructor(entity, slotNumber = 40, lines = 4, rowShift = 5, lineShift = 5, iconSize = 40){
		let rows = Math.ceil(slotNumber / lines);
		let sizeX = rows * (iconSize + rowShift) + rowShift;
		let sizeY = (lines + 1) * (iconSize + lineShift) + lineShift;
		super((entity.map.size - sizeX) / 2, (entity.map.size - sizeX) / 2 + sizeX, (entity.map.size - sizeY) / 2, (entity.map.size - sizeY) / 2 + sizeY);
		this.owner = entity;
		this.mainhand = [];
		this.hotbar = [
			new PlaceholderItem, new PlaceholderItem, new PlaceholderItem, new PlaceholderItem, new PlaceholderItem, new PlaceholderItem, new PlaceholderItem, new PlaceholderItem, new PlaceholderItem, new PlaceholderItem
		];
		this.slots = [];
		this.buffer = new PlaceholderItem;
		for (let a = 0; a < slotNumber; a++){
			this.slots.push(new PlaceholderItem);
		}
		for (let a = 0; a < lines; a++){
			for (let b = 0; b < rows; b++){
				new ItemSlot(
					this,
					(entity.map.size - sizeX) / 2 + rowShift + b * (iconSize + lineShift),
					(entity.map.size - sizeX) / 2 + (b + 1) * (iconSize + lineShift),
					(entity.map.size - sizeY) / 2 + lineShift + (a + 1) * (iconSize + lineShift),
					(entity.map.size - sizeY) / 2 + (a + 2) * (iconSize + lineShift),
					a * rows + b
				);
			}
		}
		for (let a = 0; a < rows; a++){
			new ItemSlotHotbar(
				this,
				(entity.map.size - sizeX) / 2 + rowShift + a * (iconSize + lineShift),
				(entity.map.size - sizeX) / 2 + (a + 1) * (iconSize + lineShift),
				(entity.map.size - sizeY) / 2 + lineShift,
				(entity.map.size - sizeY) / 2 + iconSize + lineShift,
				a
			);
		}
	}
}


class HUD extends Interface{
	constructor(inventory = immediateApi.getPlayer().inventory, owner){
		super(0, 0, 0, 0);
		owner.personalInterfaces.push(this);
		this.elements[0].draw = function(){
			draw.can.fillStyle = "grey";
			draw.can.fillRect(28, 28, 204, 19);
			draw.can.fillStyle = "black";
			draw.can.fillRect(30, 30, 200, 15);
			draw.can.fillStyle = "red";
			draw.can.fillRect(30, 30, owner.hp / owner.maxHp * 200, 15);
		}
		this.inventory = inventory;
		for (let a = 0; a < inventory.hotbar.length; a++){
			this.elements.push({...inventory.elements[a + inventory.slots.length + 1]});
			this.elements[a + 1].draw = function(){
				draw.placeholderSlot(this);
				this.parentInterface.hotbar[this.inventorySlotId].draw(this.hitbox.x1, this.hitbox.x2, this.hitbox.y1, this.hitbox.y2);
			}
			this.elements[a + 1].hitbox = {...inventory.elements[a + inventory.slots.length + 1].hitbox};
			this.elements[a + 1].hitbox.y1 += 350;
			this.elements[a + 1].hitbox.y2 += 350;
		}
	}
}


class ItemSlot extends InterfaceElement{
	constructor(parentInterface, x1, x2, y1, y2, id){
		super(parentInterface, x1, x2, y1, y2);
		this.inventorySlotId = id;
	}

	bgFunction(){
		draw.placeholderSlot(this);
	}

	draw(){
		this.bgFunction();
		this.slotGetter().draw(this.hitbox.x1, this.hitbox.x2, this.hitbox.y1, this.hitbox.y2);
	}

	functionality(){
		let buffer2 = this.parentInterface.buffer;
		this.parentInterface.buffer = this.slotGetter();
		this.slotSetter(buffer2);
	}

	functionalityX(user){
		let buffer2 = user.inventory.buffer;
		user.inventory.buffer = this.slotGetter();
		this.slotSetter(buffer2);
	}
	
	slotSetter(replacement){
		this.parentInterface.slots[this.inventorySlotId] = replacement;
	}

	slotGetter(){
		return this.parentInterface.slots[this.inventorySlotId];
	}
}
class ItemSlotHotbar extends ItemSlot{
	constructor(parentInterface, x1, x2, y1, y2, id){
		super(parentInterface, x1, x2, y1, y2, id);
	}

	functionality(){
		this.parentInterface.owner.unUseHand();
		let buffer2 = this.parentInterface.buffer;
		this.parentInterface.buffer = this.slotGetter();
		this.slotSetter(buffer2);
		this.parentInterface.mainhand[0] = this.slotGetter();
	}
	
	slotSetter(replacement){
		this.parentInterface.hotbar[this.inventorySlotId] = replacement;
	}

	slotGetter(){
		return this.parentInterface.hotbar[this.inventorySlotId];
	}
}


class Minimap extends Interface{
	constructor(size = 2, maP = map){
		super(150, 450, 150, 450);
		this.map = maP;
		this.elements[0].draw = function(){
			draw.mapBg(this);
			let zonesToLoad = [];
			for (let a = -size; a <= size; a++){	
				for (let b = -size; b <= size; b++){
					zonesToLoad.push({x: a, y: b});
				}
			}
			for (let b = 0; b < zonesToLoad.length; b++){
				if (this.parentInterface.map.loadingZones[this.parentInterface.map.loadedZone.x + zonesToLoad[b].x] === undefined){continue}
				if (this.parentInterface.map.loadingZones[this.parentInterface.map.loadedZone.x + zonesToLoad[b].x][this.parentInterface.map.loadedZone.y + zonesToLoad[b].y] === undefined){continue}
				for (let a = 0; a < this.parentInterface.map.loadingZones[this.parentInterface.map.loadedZone.x + zonesToLoad[b].x][this.parentInterface.map.loadedZone.y + zonesToLoad[b].y].length; a++){
					let loadZone = this.parentInterface.map.loadingZones[this.parentInterface.map.loadedZone.x + zonesToLoad[b].x][this.parentInterface.map.loadedZone.y + zonesToLoad[b].y][a];
					if (loadZone === undefined){continue}
					loadZone.drawOnMinimap(this.hitbox.x1, this.hitbox.x2, this.hitbox.y1, this.hitbox.y2, size * 2.5);
				}
			}
			for (let a = 0; a < this.parentInterface.map.mapMarkers.length; a++){
				let loadZone = this.parentInterface.map.mapMarkers[a];
				if (loadZone === undefined){continue}
				loadZone.drawOnMinimap(this.hitbox.x1, this.hitbox.x2, this.hitbox.y1, this.hitbox.y2, size * 2.5);
			}
		}
		this.elements[0].functionality = function(){	
			new MapMarker(immediateApi.getPlayer().x, immediateApi.getPlayer().y);
		}
	}
}


class MapMarker{
	constructor(x, y, maP = immediateApi.getPlayer().map){
		this.map = maP;
		this.id = maP.mapMarkers.push(this) - 1;
		this.x = x;
		this.y = y;
	}

	drawOnMinimap(x1, x2, y1, y2, scale = 4){
		let centerX = (x1 + x2) / 2;
		let centerY = (y1 + y2) / 2;
		if (this.x > (x1 - centerX) * scale - this.map.xshift() + centerX && this.x < (x2 - centerX) * scale - this.map.xshift() + centerX && this.y > (y1 - centerY) * scale - this.map.yshift() + centerY && this.y < (y2 - centerY) * scale - this.map.yshift() + centerY){
			draw.marker((this.x + this.map.xshift() - centerX) / scale + centerX, (this.y + this.map.yshift() - centerY) / scale + centerY, {x1: -5, x2: 5, y1: -5, y2: 5}, this.map);
		}
	}
}