class Draw{
	constructor(){
		let canv = document.getElementById("canv");
		this.can = canv.getContext("2d");
		this.murasama = new Image;
		this.shade = new Image;
		this.shade.src = "enemy.png";
		this.murasama.src = "Murasama.jpeg";
	}
	
	entity(ent){
		this.can.fillStyle = "rgb(255,100,100)";
		this.can.drawImage(this.shade, ent.x + ent.hitbox.x1, ent.y + ent.hitbox.y1, ent.hitbox.x2 - ent.hitbox.x1, ent.hitbox.y2 - ent.hitbox.y1);
	}
	
	background1(field){
		this.can.fillStyle = "rgb(200,200,255)";
		this.can.drawImage(this.murasama, 0, 0, field.size, field.size);
	}
}