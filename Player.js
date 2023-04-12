class Player extends Entity{
	constructor(x = 100, y = 100, hp = 100, defence = 0, hitbox = {x1: -15, x2: 15, y1: -15, y2: 15}, entityScreen = map, speed = 3){
		super(x, y, hp, defence, hitbox, entityScreen);
		this.moveVectoring = {x: 0, y: 0};
		this.speed = speed;
		this.playerDamageMultiplier = 0;
		this.mousePosition = {x: 0, y: 0};
		this.mouseBox = new Box(this.mousePosition.x, this.mousePosition.y, {x1: -8, x2: 8, y1: -8, y2: 8});
		this.mouseBox.player = this;
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
}