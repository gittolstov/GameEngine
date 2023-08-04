class Draw{
	constructor(){
		let canv = document.getElementById("canv");
		this.can = canv.getContext("2d");
		this.murasama = new Image;
		this.shade = new Image;
		this.cartFrame = new Image;
		this.doors = [new Image, new Image];
		this.hornet = new Image;
		this.doomguy = new Image;
		this.obstacle = new Image;
		this.fireImg = [new Image, new Image];
		this.leverImg = [new Image, new Image];
		this.buttonImg = [new Image, new Image, new Image, new Image, new Image, new Image];
		this.glyphidGrunt = new Image;
		this.glyphidSwarmer = new Image;
		this.glyphidPraetorian = new Image;
		this.bulletImg = new Image;
		this.wiringBackground = new Image;
		this.caveBg = new Image;
		this.blood = new Image;
		this.floorImg = new Image;
		this.cornerImg = new Image;
		this.ladderImg = new Image;
		this.vent1img = new Image;
		this.vent2img = new Image;
		this.el1 = new Image;
		this.el2 = new Image;
		this.lpad1 = new Image;
		this.lpad2 = new Image;
		this.rocket1 = new Image;
		this.rocket2 = new Image;
		this.terminal2 = new Image;
		this.doorTerm = new Image;
		this.wallImg = [new Image, new Image, new Image, new Image];
		this.symbols = [new Image, new Image, new Image, new Image, new Image, new Image];
		this.doors[0].src = "door1.png";
		this.doors[1].src = "door2.png";
		this.leverImg[0].src = "lever1.png";
		this.leverImg[1].src = "lever2.png";
		this.buttonImg[0].src = "button1.png";
		this.buttonImg[1].src = "button2.png";
		this.buttonImg[2].src = "button3.png";
		this.buttonImg[3].src = "button4.png";
		this.buttonImg[4].src = "button5.png";
		this.buttonImg[5].src = "button6.png";
		this.blood.src = "Blood.png";
		this.shade.src = "enemy.png";
		this.cartFrame.src = "cart.png";
		this.murasama.src = "Murasama.jpeg";
		this.hornet.src = "player.png";
		this.doorTerm.src = "doorTerminal.png";
		this.doomguy.src = "slayer.png";
		this.wiringBackground.src = "wiringBackground.png";
		this.obstacle.src = "Obstacle.png";
		this.glyphidGrunt.src = "Glyphid_grunt.png";
		this.glyphidSwarmer.src = "Glyphid_swarmer.png";
		this.glyphidPraetorian.src = "Glyphid_praetorian.png";
		this.caveBg.src = "caveBackground1.png";
		this.floorImg.src = "floor.png";
		this.cornerImg.src = "corner.png";
		this.ladderImg.src = "ladder.png";
		this.vent1img.src = "vent.png";
		this.vent2img.src = "ventFloor.png";
		this.lpad1.src = "landingPad1.png";
		this.lpad2.src = "landingPad2.png";
		this.rocket1.src = "rocket1.png";
		this.rocket2.src = "rocket2.png";
		this.el1.src = "Elevator.png";
		this.el2.src = "NoElevator.png";
		this.terminal2.src = "mainTerminalFrame.png";
		this.fireImg[0].src = "Fire.png";
		this.fireImg[1].src = "Fire2.png";
		this.bulletImg.src = "Bullet.png";
		this.wallImg[0].src = "Wall3.png";
		this.wallImg[1].src = "Wall4.png";
		this.wallImg[2].src = "Wall2.png";
		this.wallImg[3].src = "Wall1.png";
		this.symbols[0].src = "symb1.png";
		this.symbols[1].src = "symb2.png";
		this.symbols[2].src = "symb3.png";
		this.symbols[3].src = "symb4.png";
		this.symbols[4].src = "symb5.png";
		this.symbols[5].src = "symb6.png";
		this.particleImg = [new Image, new Image, new Image, new Image, new Image, new Image];
		this.particleImg[0].src = "Particle1.png";
		this.particleImg[1].src = "Particle2.png";
		this.particleImg[2].src = "Particle3.png";
		this.particleImg[3].src = "Particle4.png";
		this.particleImg[4].src = "Particle5.png";
		this.particleImg[5].src = "Particle6.png";
	}

	player(ent){
		this.modifyContextMatrix(/*turn(ent.mouseShift.x, ent.mouseShift.y).angle*/0, ent.x + ent.map.xshift(), ent.y + ent.map.yshift(), turn(ent.mouseShift.x, ent.mouseShift.y).side/*ent.turn*/);
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

	door(obj){
		this.modifyContextMatrix(Math.PI * 0.5 * !obj.direction, obj.x + obj.map.xshift(), obj.y + obj.map.yshift());
		this.can.drawImage(this.doors[obj.isHeavy * 1], 0, 0, 10 * Math.max(obj.hitbox.x2 / obj.hitbox.y2, obj.hitbox.y2 / obj.hitbox.x2) * (obj.stage * 0.9 + 2) / 20, 20, Math.max(obj.hitbox.x2, obj.hitbox.y2) * (18 - obj.stage * 0.9) / 20, obj.hitbox.y1 * obj.direction - obj.hitbox.x2 * !obj.direction, Math.max(obj.hitbox.x2, obj.hitbox.y2) * (obj.stage * 0.9 + 2) / 20, Math.min(obj.hitbox.x2, obj.hitbox.y2) - obj.hitbox.y1 * obj.direction + obj.hitbox.x2 * !obj.direction);
		this.can.restore();
		this.modifyContextMatrix(Math.PI * 0.5 * !obj.direction, obj.x + obj.map.xshift(), obj.y + obj.map.yshift(), -1, -1);
		this.can.drawImage(this.doors[obj.isHeavy * 1], 0, 0, 10 * Math.max(obj.hitbox.x2 / obj.hitbox.y2, obj.hitbox.y2 / obj.hitbox.x2) * (obj.stage * 0.9 + 2) / 20, 20, Math.max(obj.hitbox.x2, obj.hitbox.y2) * (18 - obj.stage * 0.9) / 20, obj.hitbox.y1 * obj.direction - obj.hitbox.x2 * !obj.direction, Math.max(obj.hitbox.x2, obj.hitbox.y2) * (obj.stage * 0.9 + 2) / 20, Math.min(obj.hitbox.x2, obj.hitbox.y2) - obj.hitbox.y1 * obj.direction + obj.hitbox.x2 * !obj.direction);
		this.can.restore();
	}

	dark(obj){
		this.can.fillStyle = "black";
		this.can.fillRect(obj.x + obj.hitbox.x1 + obj.map.xshift(), obj.y + obj.hitbox.y1 + obj.map.yshift(), obj.hitbox.x2 - obj.hitbox.x1, obj.hitbox.y2 - obj.hitbox.y1);
	}

	floor(obj){
		this.can.drawImage(this.floorImg, obj.x + obj.hitbox.x1 + obj.map.xshift(), obj.y + obj.hitbox.y1 + obj.map.yshift(), obj.hitbox.x2 - obj.hitbox.x1, obj.hitbox.y2 - obj.hitbox.y1);
		this.can.drawImage(this.floorImg, obj.x + obj.hitbox.x1 + obj.map.xshift(), obj.y + obj.hitbox.y1 + obj.map.yshift(), obj.hitbox.x2 - obj.hitbox.x1, obj.hitbox.y2 - obj.hitbox.y1);
	}

	corner(obj){
		this.can.drawImage(this.cornerImg, obj.x + obj.hitbox.x1 + obj.map.xshift(), obj.y + obj.hitbox.y1 + obj.map.yshift(), obj.hitbox.x2 - obj.hitbox.x1, obj.hitbox.y2 - obj.hitbox.y1);
		this.can.drawImage(this.cornerImg, obj.x + obj.hitbox.x1 + obj.map.xshift(), obj.y + obj.hitbox.y1 + obj.map.yshift(), obj.hitbox.x2 - obj.hitbox.x1, obj.hitbox.y2 - obj.hitbox.y1);
	}

	placeholderHitbox(box){
		this.can.fillStyle = "rgba(255, 0, 0, 0.1)";
		this.can.fillRect(box.coordinates.x + box.hitbox.x1 + box.map.xshift(), box.coordinates.y + box.hitbox.y1 + box.map.yshift(), box.hitbox.x2 - box.hitbox.x1, box.hitbox.y2 - box.hitbox.y1);
	}

	ladder(obj){
		this.modifyContextMatrix(0, obj.x + obj.map.xshift(), obj.y + obj.map.yshift(), obj.side);
		this.can.drawImage(this.ladderImg, obj.hitbox.x1, obj.hitbox.y1, obj.hitbox.x2 - obj.hitbox.x1, obj.hitbox.y2 - obj.hitbox.y1);
		this.can.drawImage(this.ladderImg, obj.hitbox.x1, obj.hitbox.y1, obj.hitbox.x2 - obj.hitbox.x1, obj.hitbox.y2 - obj.hitbox.y1);
		this.can.restore();
	}

	elevator(obj){
		if (obj.isActive){
			this.can.drawImage(this.el1, obj.x + obj.hitbox.x1 + obj.map.xshift(), obj.y + obj.hitbox.y1 + obj.map.yshift(), obj.hitbox.x2 - obj.hitbox.x1, obj.hitbox.y2 - obj.hitbox.y1);
			this.can.drawImage(this.el1, obj.x + obj.hitbox.x1 + obj.map.xshift(), obj.y + obj.hitbox.y1 + obj.map.yshift(), obj.hitbox.x2 - obj.hitbox.x1, obj.hitbox.y2 - obj.hitbox.y1);
		} else {
			this.can.drawImage(this.el2, obj.x + obj.hitbox.x1 + obj.map.xshift(), obj.y + obj.hitbox.y1 + obj.map.yshift(), obj.hitbox.x2 - obj.hitbox.x1, obj.hitbox.y2 - obj.hitbox.y1);
			this.can.drawImage(this.el2, obj.x + obj.hitbox.x1 + obj.map.xshift(), obj.y + obj.hitbox.y1 + obj.map.yshift(), obj.hitbox.x2 - obj.hitbox.x1, obj.hitbox.y2 - obj.hitbox.y1);
		}
	}

	vent1(obj){
		this.modifyContextMatrix(0, obj.x + obj.map.xshift(), obj.y + obj.map.yshift(), obj.side);
		this.can.drawImage(this.vent1img, obj.hitbox.x1, obj.hitbox.y1, obj.hitbox.x2 - obj.hitbox.x1, obj.hitbox.y2 - obj.hitbox.y1);
		this.can.drawImage(this.vent1img, obj.hitbox.x1, obj.hitbox.y1, obj.hitbox.x2 - obj.hitbox.x1, obj.hitbox.y2 - obj.hitbox.y1);
		this.can.restore();
	}

	vent2(obj){
		this.modifyContextMatrix(0, obj.x + obj.map.xshift(), obj.y + obj.map.yshift(), obj.side);
		this.can.drawImage(this.vent2img, obj.hitbox.x1, obj.hitbox.y1, obj.hitbox.x2 - obj.hitbox.x1, obj.hitbox.y2 - obj.hitbox.y1);
		this.can.drawImage(this.vent2img, obj.hitbox.x1, obj.hitbox.y1, obj.hitbox.x2 - obj.hitbox.x1, obj.hitbox.y2 - obj.hitbox.y1);
		this.can.restore();
	}

	pad1(obj){
		this.can.drawImage(this.lpad1, obj.x + obj.hitbox.x1 + obj.map.xshift(), obj.y + obj.hitbox.y1 + obj.map.yshift(), obj.hitbox.x2 - obj.hitbox.x1, obj.hitbox.y2 - obj.hitbox.y1);
	}

	pad2(obj){
		this.can.drawImage(this.lpad2, obj.x + obj.hitbox.x1 + obj.map.xshift(), obj.y + obj.hitbox.y1 + obj.map.yshift(), obj.hitbox.x2 - obj.hitbox.x1, obj.hitbox.y2 - obj.hitbox.y1);
	}

	cart(ent){
		this.can.fillStyle = "black";
		this.can.fillRect(ent.x + ent.hitbox.x1 + ent.map.xshift() + 3, ent.y + ent.hitbox.y1 + ent.map.yshift() + 3, ent.hitbox.x2 - ent.hitbox.x1 - 6, ent.hitbox.y2 - ent.hitbox.y1 - 6);
		this.can.fillStyle = "rgb(100, 255, 0)";
		this.can.fillRect(ent.x + ent.hitbox.x1 + ent.map.xshift() + 4, ent.y + ent.hitbox.y1 + ent.map.yshift() + 23 - ent.fuel, 5, ent.fuel);
		this.can.fillStyle = "rgb(200, 200, 200)";
		this.can.fillRect(ent.x + ent.hitbox.x1 + ent.map.xshift() + 15, ent.y + ent.hitbox.y1 + ent.map.yshift() + 5, ent.oxygen, 4);
		this.can.fillStyle = "rgb(0, 183, 255)";
		this.can.fillRect(ent.x + ent.hitbox.x1 + ent.map.xshift() + 15, ent.y + ent.hitbox.y1 + ent.map.yshift() + 13, ent.water, 4);
		this.can.drawImage(this.cartFrame, ent.x + ent.hitbox.x1 + ent.map.xshift(), ent.y + ent.hitbox.y1 + ent.map.yshift(), ent.hitbox.x2 - ent.hitbox.x1, ent.hitbox.y2 - ent.hitbox.y1);
	}

	rocketModule(obj){
		this.can.drawImage(this.rocket1, obj.x + obj.hitbox.x1 + obj.map.xshift(), obj.y + obj.hitbox.y1 + obj.map.yshift(), obj.hitbox.x2 - obj.hitbox.x1, obj.hitbox.y2 - obj.hitbox.y1);
	}

	rocketTop(obj){
		this.can.drawImage(this.rocket2, obj.x + obj.hitbox.x1 + obj.map.xshift(), obj.y + obj.hitbox.y1 + obj.map.yshift(), obj.hitbox.x2 - obj.hitbox.x1, obj.hitbox.y2 - obj.hitbox.y1);
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

	wiringBg(part){
		this.can.drawImage(this.wiringBackground, part.hitbox.x1, part.hitbox.y1, part.hitbox.x2 - part.hitbox.x1, part.hitbox.y2 - part.hitbox.y1);
	}

	terminal(part){
		this.can.drawImage(this.terminal2, part.hitbox.x1, part.hitbox.y1, part.hitbox.x2 - part.hitbox.x1, part.hitbox.y2 - part.hitbox.y1);
	}

	doorTerminal(obj){
		this.can.drawImage(this.doorTerm, obj.x + obj.hitbox.x1 + obj.map.xshift(), obj.y + obj.hitbox.y1 + obj.map.yshift(), obj.hitbox.x2 - obj.hitbox.x1, obj.hitbox.y2 - obj.hitbox.y1);
	}

	symbol(numb, x1, x2, y1, y2){
		this.can.drawImage(this.symbols[numb], x1, y1, x2, y2);
	}

	lever(part, numb){
		this.can.drawImage(this.leverImg[numb * 1], part.hitbox.x1, part.hitbox.y1, part.hitbox.x2 - part.hitbox.x1, part.hitbox.y2 - part.hitbox.y1);
	}

	button(part, glass, pushed){
		this.can.drawImage(this.buttonImg[glass * 1 + pushed * 2], part.hitbox.x1, part.hitbox.y1, part.hitbox.x2 - part.hitbox.x1, part.hitbox.y2 - part.hitbox.y1);
	}

	button2(part, numb){
		this.can.drawImage(this.buttonImg[4 + numb * 1], part.hitbox.x1, part.hitbox.y1, part.hitbox.x2 - part.hitbox.x1, part.hitbox.y2 - part.hitbox.y1);
	}

	mapBg(part){
		this.can.fillStyle = "rgb(200, 200, 200)";
		this.can.fillRect(part.hitbox.x1, part.hitbox.y1, part.hitbox.x2 - part.hitbox.x1, part.hitbox.y2 - part.hitbox.y1);
	}

	stone(x, y, hitbox){
		this.can.drawImage(this.obstacle, x + hitbox.x1, y + hitbox.y1, hitbox.x2 - hitbox.x1, hitbox.y1 - hitbox.y2);
	}

	marker(x, y, hitbox, maP){
		this.can.drawImage(this.fireImg[0], x + hitbox.x1, y + hitbox.y1, hitbox.x2 - hitbox.x1, hitbox.y1 - hitbox.y2);
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

	backgroundDrg(field){
		this.can.fillStyle = "black";
		this.can.fillRect(0, 0, field.size, field.size);
		//this.can.drawImage(this.caveBg, -field.xshift() % field.size + field.size, -field.yshift() % field.size + field.size, field.size, field.size, 0, 0, field.size, field.size);
	}

	item(icon, x1, x2, y1, y2){
		this.can.drawImage(icon, x1, y1, x2 - x1, y2 - y1);
	}

	tool(sprite, ent, x1, x2, y1, y2){
		this.modifyContextMatrix(turn(ent.mouseShift.x, ent.mouseShift.y).angle, ent.x + ent.map.xshift(), ent.y + ent.map.yshift(), turn(ent.mouseShift.x, ent.mouseShift.y).side/*ent.turn*/);
		this.can.drawImage(sprite, x1, y1, x2 - x1, y2 - y1);
		this.can.restore();
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

	bloodParticle(ptl){
		this.can.drawImage(this.blood, ptl.coordinates.x + ptl.hitbox.x1 + ptl.map.xshift(), ptl.coordinates.y + ptl.hitbox.y1 + ptl.map.yshift(), ptl.hitbox.x2 - ptl.hitbox.x1, ptl.hitbox.y2 - ptl.hitbox.y1)
	}

	grid1(x1, y1, y2, maP){
		this.can.fillStyle = "rgba(0, 200, 0, 0.2)";
		this.can.fillRect(x1 + maP.xshift(), y1 - 2 + maP.yshift(), 2, y2 - y1);
	}

	grid2(y1, x1, x2, maP){
		this.can.fillStyle = "rgba(0, 200, 0, 0.2)";
		this.can.fillRect(x1 + maP.xshift(), y1 - 2 + maP.yshift(), x2 - x1, 2);
	}

	wall1(obj, side){
		if (side){
			this.can.drawImage(this.wallImg[0], obj.x + obj.hitbox.x1 + obj.map.xshift(), obj.y + obj.hitbox.y1 + obj.map.yshift(), obj.hitbox.x2 - obj.hitbox.x1, obj.hitbox.y2 - obj.hitbox.y1);
			this.can.drawImage(this.wallImg[0], obj.x + obj.hitbox.x1 + obj.map.xshift(), obj.y + obj.hitbox.y1 + obj.map.yshift(), obj.hitbox.x2 - obj.hitbox.x1, obj.hitbox.y2 - obj.hitbox.y1);
		} else {
			this.can.drawImage(this.wallImg[1], obj.x + obj.hitbox.x1 + obj.map.xshift(), obj.y + obj.hitbox.y1 + obj.map.yshift(), obj.hitbox.x2 - obj.hitbox.x1, obj.hitbox.y2 - obj.hitbox.y1);
			this.can.drawImage(this.wallImg[1], obj.x + obj.hitbox.x1 + obj.map.xshift(), obj.y + obj.hitbox.y1 + obj.map.yshift(), obj.hitbox.x2 - obj.hitbox.x1, obj.hitbox.y2 - obj.hitbox.y1);
		}
	}

	wall2(obj, side){
		if (side){
			this.can.drawImage(this.wallImg[2], obj.x + obj.hitbox.x1 + obj.map.xshift(), obj.y + obj.hitbox.y1 + obj.map.yshift(), obj.hitbox.x2 - obj.hitbox.x1, obj.hitbox.y2 - obj.hitbox.y1);
			this.can.drawImage(this.wallImg[2], obj.x + obj.hitbox.x1 + obj.map.xshift(), obj.y + obj.hitbox.y1 + obj.map.yshift(), obj.hitbox.x2 - obj.hitbox.x1, obj.hitbox.y2 - obj.hitbox.y1);
		} else {
			this.can.drawImage(this.wallImg[3], obj.x + obj.hitbox.x1 + obj.map.xshift(), obj.y + obj.hitbox.y1 + obj.map.yshift(), obj.hitbox.x2 - obj.hitbox.x1, obj.hitbox.y2 - obj.hitbox.y1);
			this.can.drawImage(this.wallImg[3], obj.x + obj.hitbox.x1 + obj.map.xshift(), obj.y + obj.hitbox.y1 + obj.map.yshift(), obj.hitbox.x2 - obj.hitbox.x1, obj.hitbox.y2 - obj.hitbox.y1);
		}
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
		this.can.rotate(angle);
	}
}