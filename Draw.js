class Draw{
	constructor(){
		let canv = document.getElementById("canv");
		this.can = canv.getContext("2d");
		this.murasama = new Image;
		this.shade = new Image;
		this.hornet = new Image;
		this.obstacle = new Image;
		this.shade.src = "enemy.png";
		this.murasama.src = "Murasama.jpeg";
		this.hornet.src = "player.png";
		this.obstacle.src = "Obstacle.png";
	}

	player(ent){
		this.can.drawImage(this.hornet, ent.x + ent.hitbox.x1 + xshift(ent.map), ent.y + ent.hitbox.y1 + yshift(ent.map), ent.hitbox.x2 - ent.hitbox.x1, ent.hitbox.y2 - ent.hitbox.y1);
	}
	
	entity(ent){
		this.can.drawImage(this.shade, ent.x + ent.hitbox.x1 + xshift(ent.map), ent.y + ent.hitbox.y1 + yshift(ent.map), ent.hitbox.x2 - ent.hitbox.x1, ent.hitbox.y2 - ent.hitbox.y1);
	}

	object(obj){
		this.can.drawImage(this.obstacle, obj.x + obj.hitbox.x1 + xshift(obj.map), obj.y + obj.hitbox.y1 + yshift(obj.map), obj.hitbox.x2 - obj.hitbox.x1, obj.hitbox.y2 - obj.hitbox.y1);
	}
	
	background1(field){
		this.can.drawImage(this.murasama, 0, 0, field.size, field.size);
	}
}