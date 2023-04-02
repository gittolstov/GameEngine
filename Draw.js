class Draw{
	constructor(){
		let canv = document.getElementById("canv");
		this.can = canv.getContext("2d");
		this.murasama = new Image;
		this.shade = new Image;
		this.hornet = new Image;
		this.obstacle = new Image;
		this.glyphidGrunt = new Image;
		this.glyphidSwarmer = new Image;
		this.glyphidPraetorian = new Image;
		this.shade.src = "enemy.png";
		this.murasama.src = "Murasama.jpeg";
		this.hornet.src = "player.png";
		this.obstacle.src = "Obstacle.png";
		this.glyphidGrunt.src = "Glyphid_grunt.png";
		this.glyphidSwarmer.src = "Glyphid_swarmer.png";
		this.glyphidPraetorian.src = "Glyphid_praetorian.png";
		this.particleImg = [new Image, new Image, new Image, new Image, new Image, new Image];
		this.particleImg[0].src = "Particle1.png";
		this.particleImg[1].src = "Particle2.png";
		this.particleImg[2].src = "Particle3.png";
		this.particleImg[3].src = "Particle4.png";
		this.particleImg[4].src = "Particle5.png";
		this.particleImg[5].src = "Particle6.png";
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
		this.can.drawImage(this.particleImg[ptl.animation], ptl.coordinates.x + ptl.hitbox.x1 + xshift(ptl.map), ptl.coordinates.y + ptl.hitbox.y1 + yshift(ptl.map), ptl.hitbox.x2 - ptl.hitbox.x1, ptl.hitbox.y2 - ptl.hitbox.y1)
	}

	grunt(ent){
		this.can.drawImage(this.glyphidGrunt, ent.x + ent.hitbox.x1 + xshift(ent.map), ent.y + ent.hitbox.y1 + yshift(ent.map), ent.hitbox.x2 - ent.hitbox.x1, ent.hitbox.y2 - ent.hitbox.y1);
	}
	
	praetorian(ent){
		this.can.drawImage(this.glyphidPraetorian, ent.x + ent.hitbox.x1 + xshift(ent.map), ent.y + ent.hitbox.y1 + yshift(ent.map), ent.hitbox.x2 - ent.hitbox.x1, ent.hitbox.y2 - ent.hitbox.y1);
	}
	
	swarmer(ent){
		this.can.drawImage(this.glyphidSwarmer, ent.x + ent.hitbox.x1 + xshift(ent.map), ent.y + ent.hitbox.y1 + yshift(ent.map), ent.hitbox.x2 - ent.hitbox.x1, ent.hitbox.y2 - ent.hitbox.y1);
	}
}