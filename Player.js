class Player extends Entity{
	constructor(entityScreen = map, x = 0, y = 0, hp = 100, defence = 0, hitbox = {x1: -15, x2: 15, y1: -15, y2: 15}, drawer = function(){draw.player(this)}, speed = 3){
		super(entityScreen, x, y, hp, defence, hitbox, undefined, drawer, function(){
			this.movePlayer(this.moveVectoring.x, this.moveVectoring.y);
		});
		this.moveVectoring = {x: 0, y: 0};
		this.speed = speed;
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
}