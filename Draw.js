class Draw{
	constructor(){
		let canv = document.getElementById("canv");
		this.can = canv.getContext("2d");
		this.murasama = new Image;
		this.shade = new Image;
		this.hornet = new Image;
		this.doomguy = new Image;
		this.obstacle = new Image;
		this.fireImg = [new Image, new Image];
		this.glyphidGrunt = new Image;
		this.glyphidSwarmer = new Image;
		this.glyphidPraetorian = new Image;
		this.bulletImg = new Image;
		this.shade.src = "enemy.png";
		this.murasama.src = "Murasama.jpeg";
		this.hornet.src = "player.png";
		this.doomguy.src = "slayer.png";
		this.obstacle.src = "Obstacle.png";
		this.glyphidGrunt.src = "Glyphid_grunt.png";
		this.glyphidSwarmer.src = "Glyphid_swarmer.png";
		this.glyphidPraetorian.src = "Glyphid_praetorian.png";
		this.fireImg[0].src = "Fire.png";
		this.fireImg[1].src = "Fire2.png";
		this.bulletImg.src = "Bullet.png";
		this.particleImg = [new Image, new Image, new Image, new Image, new Image, new Image];
		this.particleImg[0].src = "Particle1.png";
		this.particleImg[1].src = "Particle2.png";
		this.particleImg[2].src = "Particle3.png";
		this.particleImg[3].src = "Particle4.png";
		this.particleImg[4].src = "Particle5.png";
		this.particleImg[5].src = "Particle6.png";
	}

	player(ent){
		this.modifyContextMatrix(0, ent.x + ent.map.xshift(), ent.y + ent.map.yshift(), ent.turn);
		this.can.drawImage(this.doomguy, ent.hitbox.x1, ent.hitbox.y1, ent.hitbox.x2 - ent.hitbox.x1, ent.hitbox.y2 - ent.hitbox.y1);
		this.can.restore();
	}
	
	entity(ent){
		this.can.drawImage(this.shade, ent.x + ent.hitbox.x1 + ent.map.xshift(), ent.y + ent.hitbox.y1 + ent.map.yshift(), ent.hitbox.x2 - ent.hitbox.x1, ent.hitbox.y2 - ent.hitbox.y1);
	}
	
	bullet(ent){
		this.can.drawImage(this.bulletImg, ent.x + ent.hitbox.x1 / 5 + ent.map.xshift(), ent.y + ent.hitbox.y1 / 5 + ent.map.yshift(), ent.hitbox.x2 - ent.hitbox.x1 / 5, ent.hitbox.y2 - ent.hitbox.y1 / 5);
	}

	object(obj){
		this.can.drawImage(this.obstacle, obj.x + obj.hitbox.x1 + obj.map.xshift(), obj.y + obj.hitbox.y1 + obj.map.yshift(), obj.hitbox.x2 - obj.hitbox.x1, obj.hitbox.y2 - obj.hitbox.y1);
	}

	interface(part){
		this.can.fillStyle = "red";
		this.can.fillRect(part.hitbox.x1, part.hitbox.y1, part.hitbox.x2 - part.hitbox.x1, part.hitbox.y2 - part.hitbox.y1);
	}
	interface2(part){
		this.can.fillStyle = "pink";
		this.can.fillRect(part.hitbox.x1, part.hitbox.y1, part.hitbox.x2 - part.hitbox.x1, part.hitbox.y2 - part.hitbox.y1);
	}

	placeholderInterfaceBackground(part){
		this.can.fillStyle = "rgba(0, 128, 0, 0.5)";
		this.can.fillRect(part.hitbox.x1, part.hitbox.y1, part.hitbox.x2 - part.hitbox.x1, part.hitbox.y2 - part.hitbox.y1);
	}

	placeholderSlot(part){
		this.can.fillStyle = "rgba(128, 128, 128, 0.5)";
		this.can.fillRect(part.hitbox.x1, part.hitbox.y1, part.hitbox.x2 - part.hitbox.x1, part.hitbox.y2 - part.hitbox.y1);
	}
	
	background1(field){
		//this.can.drawImage(this.murasama, 0, 0, field.size, field.size);
		this.can.fillStyle = "lightgrey"
		this.can.fillRect(0, 0, field.size, field.size);
	}

	startParticle(ptl){
		ptl.animation = 0;
		for (let a = 1; a < this.particleImg.length; a++){
			setTimeout((ptl) => {if (ptl.animation < draw.particleImg.length){ptl.animation++;}}, ptl.map.framerate * 2 * a, ptl);
		}
	}

	particle(ptl){
		this.can.drawImage(this.particleImg[ptl.animation], ptl.coordinates.x + ptl.hitbox.x1 + ptl.map.xshift(), ptl.coordinates.y + ptl.hitbox.y1 + ptl.map.yshift(), ptl.hitbox.x2 - ptl.hitbox.x1, ptl.hitbox.y2 - ptl.hitbox.y1)
	}

	fire(ptl){
		this.can.drawImage(this.fireImg[Math.floor(ptl.fireStage) % 2], ptl.coordinates.x + ptl.hitbox.x1 + ptl.map.xshift(), ptl.coordinates.y + ptl.hitbox.y1 + ptl.map.yshift(), ptl.hitbox.x2 - ptl.hitbox.x1, ptl.hitbox.y2 - ptl.hitbox.y1)
	}

	flame(ent){
		this.can.drawImage(this.fireImg[Math.floor(ent.fireStage) % 2], ent.x + ent.hitbox.x1 + ent.map.xshift(), ent.y + ent.hitbox.y1 + ent.map.yshift(), ent.hitbox.x2 - ent.hitbox.x1, ent.hitbox.y2 - ent.hitbox.y1)
	}

	grunt(ent){
		this.modifyContextMatrix(0, ent.x + ent.map.xshift(), ent.y + ent.map.yshift(), -ent.side);
		this.can.drawImage(this.glyphidGrunt, ent.hitbox.x1, ent.hitbox.y1, ent.hitbox.x2 - ent.hitbox.x1, ent.hitbox.y2 - ent.hitbox.y1);
		this.can.restore();
	}
	
	praetorian(ent){
		this.modifyContextMatrix(0, ent.x + ent.map.xshift(), ent.y + ent.map.yshift(), -ent.side);
		this.can.drawImage(this.glyphidPraetorian, ent.hitbox.x1, ent.hitbox.y1, ent.hitbox.x2 - ent.hitbox.x1, ent.hitbox.y2 - ent.hitbox.y1);
		this.can.restore();
	}
	
	swarmer(ent){
		this.modifyContextMatrix(0, ent.x + ent.map.xshift(), ent.y + ent.map.yshift(), -ent.side);
		this.can.drawImage(this.glyphidSwarmer, ent.hitbox.x1, ent.hitbox.y1, ent.hitbox.x2 - ent.hitbox.x1, ent.hitbox.y2 - ent.hitbox.y1);
		this.can.restore();
	}

	modifyContextMatrix(angle, xShift, yShift, xTurn = 1, yTurn = 1){
		this.can.save();
		this.can.setTransform(xTurn, 0, 0, yTurn, xShift, yShift);
		this.can.rotate(angle / 180 * Math.PI);
	}
}