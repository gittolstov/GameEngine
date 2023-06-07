class Player extends Entity{
	constructor(x = 100, y = 100, hp = 100, defence = 0, hitbox = {x1: -7.5, x2: 7.5, y1: -15, y2: 15}, entityScreen = map, speed = 3){
		super(x, y, hp, defence, hitbox, entityScreen);
		this.moveVectoring = {x: 0, y: 0};
		this.speed = speed;
		this.playerDamageMultiplier = 0;
		this.mousePosition = {x: 0, y: 0};
		this.mouseShift = {x: 0, y: 0}
		this.mouseBox = new Box(this.mousePosition.x, this.mousePosition.y, {x1: -8, x2: 8, y1: -8, y2: 8});
		this.mouseBox.player = this;
		this.turn = 1;
		this.xshift = 0;
		this.yshift = 0;
		this.killCount = 0;
		this.inventory = new Inventory(this);
		this.minimap = new Minimap;
		this.activeInterfaces = [];
		this.target = this;
		this.rockets = [];
		this.activeRockets = [];
		this.speedMultipliers = [1, 1];
		this.weaponSpeedMultipliers = [1, 1];
		this.damageMultipliers = [1, 1];
		this.maxShiftBox = {x1: 200, x2: 400, y1: 200, y2: 400};
		this.mouseBox.tickPlaceholderMain = function(){
			let list = this.touch();
			if (list.length > 0){
				this.player.target = list[0];
			}
		}
	}

	draw(){
		draw.player(this);
	}

	movePlaceholder1(){
		this.shiftRefresh();
	}

	tickPlaceholder1(){
		this.movePlayer(this.moveVectoring.x, this.moveVectoring.y);
		for (let a = 0; a < player.inventory.mainhand.length; a++){
			player.inventory.mainhand[a].tickMove();
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

	shiftRefresh(){
		let screenX = this.x + this.xshift;
		let screenY = this.y + this.yshift;
		if (screenX > this.maxShiftBox.x2){
			this.xshift = -this.x + this.maxShiftBox.x2;
		} else if (screenX < this.maxShiftBox.x1){
			this.xshift = -this.x + this.maxShiftBox.x1;
		}
		if (screenY > this.maxShiftBox.y2){
			this.yshift = -this.y + this.maxShiftBox.y2;
		} else if (screenY < this.maxShiftBox.y1){
			this.yshift = -this.y + this.maxShiftBox.y1;
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

	functionality2(user){
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
			new MapMarker(player.x, player.y);
		}
	}
}


class MapMarker{
	constructor(x, y, maP = player.map){
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