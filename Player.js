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
		this.maxShiftBox = {x1: 200, x2: 400, y1: 200, y2: 400};
		this.mouseBox.tickPlaceholderMain = function(){
			let list = this.touch();
			if (list.length > 0){
				this.player.target = list[0];
			}
		}
		this.target = this;
		this.rockets = [];
		this.activeRockets = [];
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
		this.moveDirection(x, y, this.speed);
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
	constructor(entity, slotNumber = 40, lines = 4, rowShift = 5, lineShift = 5, iconSize = 40, slotBg = function(){draw.placeholderSlot(this)}){
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
				let c = new InterfaceElement(
					this,
					(entity.map.size - sizeX) / 2 + rowShift + b * (iconSize + lineShift),
					(entity.map.size - sizeX) / 2 + (b + 1) * (iconSize + lineShift),
					(entity.map.size - sizeY) / 2 + lineShift + (a + 1) * (iconSize + lineShift),
					(entity.map.size - sizeY) / 2 + (a + 2) * (iconSize + lineShift)
				);
				c.inventorySlotId = a * rows + b;
				c.bgFunction = slotBg;
				c.draw = function(){
					this.bgFunction();
					this.slotGetter().draw(this.hitbox.x1, this.hitbox.x2, this.hitbox.y1, this.hitbox.y2);
				}
				c.functionality = function(){
					let buffer2 = this.parentInterface.buffer;
					this.parentInterface.buffer = this.slotGetter();
					this.slotSetter(buffer2);
				}
				c.slotSetter = function(replacement){
					this.parentInterface.slots[this.inventorySlotId] = replacement;
				}
				c.slotGetter = function(){
					return this.parentInterface.slots[this.inventorySlotId];
				}
			}
		}
		for (let a = 0; a < rows; a++){
			let c = new InterfaceElement(
				this,
				(entity.map.size - sizeX) / 2 + rowShift + a * (iconSize + lineShift),
				(entity.map.size - sizeX) / 2 + (a + 1) * (iconSize + lineShift),
				(entity.map.size - sizeY) / 2 + lineShift,
				(entity.map.size - sizeY) / 2 + iconSize + lineShift
			);
			c.hotbarId = a;
			c.bgFunction = slotBg;
			c.draw = function(){
				this.bgFunction();
				this.slotGetter().draw(this.hitbox.x1, this.hitbox.x2, this.hitbox.y1, this.hitbox.y2);
			}
			c.functionality = function(){
				this.parentInterface.owner.unUseHand();
				let buffer2 = this.parentInterface.buffer;
				this.parentInterface.buffer = this.slotGetter();
				this.slotSetter(buffer2);
				this.parentInterface.mainhand[0] = this.slotGetter();
			};
			c.slotSetter = function(replacement){
				this.parentInterface.hotbar[this.hotbarId] = replacement;
			}
			c.slotGetter = function(){
				return this.parentInterface.hotbar[this.hotbarId];
			}
		}
	}
}