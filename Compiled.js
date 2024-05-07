
function projections(a, b, hypothesis){//a, b - расстояния до цели, hyp. - длина шага, возвращает объект с проекциями шага
    if (a === 0 && b === 0){
        return {x: 0, y: 0};
    }
    if (a === 0){
        return {x: 0, y: hypothesis * Math.sign(b)};
    }
    if (b === 0){
        return {y: 0, x: hypothesis * Math.sign(a)};
    }
	y = hypothesis * Math.sign(b) / Math.sqrt(a ** 2 / b ** 2 + 1);
    return {
		x: y * a / b,
		y: y
	}
}   


function defenceCount(dmg, defence){
	return dmg * 200 / (defence + 200);
}


function spreadCounter(x, y, spread){
    if (x === 0){return spreadCounter(0.001, y, spread);}
    if (y === 0){return spreadCounter(x, 0.001, spread);}
    let angle = Math.atan(y/x);
    let random = Math.floor(Math.random() * spread - spread / 2) / 180 * Math.PI;
    let angle2 = ((angle + random) + (Math.PI * 2)) % (Math.PI * 2);
    let x2 = x;
    let y2 = Math.abs(Math.tan(angle2)) * y / Math.abs(y/x);
    return {x: x2, y: y2};
}


function turn(x, y){
    return {angle: Math.atan(y/x) * Math.sign(x), side: Math.sign(x + 0.0001), sidey: Math.sign(y + 0.0001)};
}


function euclidianDistance(x1, y1, x2, y2){
    return (Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2));
}


let drawingAllowed = false;
/*module.exports.projections = projections;
module.exports.defenceCount = defenceCount;
module.exports.spreadCounter = spreadCounter;
module.exports.turn = turn;
module.exports.euclidianDistance = euclidianDistance;*/
//export {projections, defenceCount, spreadCounter, turn, euclidianDistance};
class Draw{
	constructor(real = true){
		if (real){
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
			this.ventInterface = new Image;
			this.tube = new Image;
			this.vault = new Image;
			this.mainTerminal = new Image;
			this.dispencer = new Image;
			this.waterPort = new Image;
			this.tank = new Image;
			this.o2 = new Image;
			this.reactorImg = new Image;
			this.ventTerminalImg = new Image;
			this.elevatorButton = new Image;
			this.caveBg = new Image;
			this.blood = new Image;
			this.floorImg = new Image;
			this.wireframe = new Image;
			this.bgStone = new Image;
			this.cornerImg = new Image;
			this.ladderImg = new Image;
			this.vent1img = new Image;
			this.vent2img = new Image;
			this.el1 = new Image;
			this.el2 = new Image;
			this.wire1 = new Image;
			this.wire2 = new Image;
			this.lpad1 = new Image;
			this.lpad2 = new Image;
			this.rocket1 = new Image;
			this.rocket2 = new Image;
			this.terminal2 = new Image;
			this.doorTerm = new Image;
			this.wallImg = [new Image, new Image, new Image, new Image];
			this.symbols = [new Image, new Image, new Image, new Image, new Image, new Image];
			this.doors[0].src = "textures/door1.png";
			this.doors[1].src = "textures/door2.png";
			this.leverImg[0].src = "textures/lever1.png";
			this.leverImg[1].src = "textures/lever2.png";
			this.buttonImg[0].src = "textures/button1.png";
			this.buttonImg[1].src = "textures/button2.png";
			this.buttonImg[2].src = "textures/button3.png";
			this.buttonImg[3].src = "textures/button4.png";
			this.buttonImg[4].src = "textures/button5.png";
			this.buttonImg[5].src = "textures/button6.png";
			this.blood.src = "textures/Blood.png";
			this.shade.src = "textures/enemy.png";
			this.cartFrame.src = "textures/cart.png";
			this.murasama.src = "textures/Murasama.jpeg";
			this.hornet.src = "textures/player.png";
			this.doorTerm.src = "textures/doorTerminal.png";
			this.doomguy.src = "textures/slayer.png";
			this.wiringBackground.src = "textures/wiringBackground.png";
			this.ventInterface.src = "textures/ventInterface.png";
			this.tube.src = "textures/pipe.png";
			this.vault.src = "textures/vault.png";
			this.dispencer.src = "textures/dispencer.png";
			this.o2.src = "textures/o2.png";
			this.ventTerminalImg.src = "textures/ventTerminal.png";
			this.tank.src = "textures/tank.png";
			this.waterPort.src = "textures/waterPort.png";
			this.reactorImg.src = "textures/reactor.png";
			this.wireframe.src = "textures/wireFrame.png";
			this.mainTerminal.src = "textures/mainTerminal.png";
			this.elevatorButton.src = "textures/elevButton.png";
			this.bgStone.src = "textures/BackgroundStone.png";
			this.obstacle.src = "textures/Obstacle.png";
			this.glyphidGrunt.src = "textures/Glyphid_grunt.png";
			this.glyphidSwarmer.src = "textures/Glyphid_swarmer.png";
			this.glyphidPraetorian.src = "textures/Glyphid_praetorian.png";
			this.caveBg.src = "textures/caveBackground1.png";
			this.floorImg.src = "textures/floor.png";
			this.cornerImg.src = "textures/corner.png";
			this.ladderImg.src = "textures/ladder.png";
			this.wire1.src = "textures/wire1.png";
			this.wire2.src = "textures/wire2.png";
			this.vent1img.src = "textures/vent.png";
			this.vent2img.src = "textures/ventFloor.png";
			this.lpad1.src = "textures/landingPad1.png";
			this.lpad2.src = "textures/landingPad2.png";
			this.rocket1.src = "textures/rocket1.png";
			this.rocket2.src = "textures/rocket2.png";
			this.el1.src = "textures/Elevator.png";
			this.el2.src = "textures/NoElevator.png";
			this.terminal2.src = "textures/mainTerminalFrame.png";
			this.fireImg[0].src = "textures/Fire.png";
			this.fireImg[1].src = "textures/Fire2.png";
			this.bulletImg.src = "textures/Bullet.png";
			this.wallImg[0].src = "textures/Wall3.png";
			this.wallImg[1].src = "textures/Wall4.png";
			this.wallImg[2].src = "textures/Wall2.png";
			this.wallImg[3].src = "textures/Wall1.png";
			this.symbols[0].src = "textures/symb1.png";
			this.symbols[1].src = "textures/symb2.png";
			this.symbols[2].src = "textures/symb3.png";
			this.symbols[3].src = "textures/symb4.png";
			this.symbols[4].src = "textures/symb5.png";
			this.symbols[5].src = "textures/symb6.png";
			this.particleImg = [new Image, new Image, new Image, new Image, new Image, new Image];
			this.particleImg[0].src = "textures/Particle1.png";
			this.particleImg[1].src = "textures/Particle2.png";
			this.particleImg[2].src = "textures/Particle3.png";
			this.particleImg[3].src = "textures/Particle4.png";
			this.particleImg[4].src = "textures/Particle5.png";
			this.particleImg[5].src = "textures/Particle6.png";
			this.amogusLegs = [new Image, new Image, new Image, new Image];
			this.amogusLegs[0].src = "textures/AmogusLegs0.png";
			this.amogusLegs[1].src = "textures/AmogusLegs1.png";
			this.amogusLegs[2].src = "textures/AmogusLegs2.png";
			this.amogusLegs[3].src = "textures/AmogusLegs3.png";
		} else {
			this.isFalse = true;
		}
	}

	clearMethods(){
		if (this.isFalse){
			for (let a = 1; a < Object.getOwnPropertyNames(this.constructor.prototype).length - 1; a++){
				this[Object.getOwnPropertyNames(this.constructor.prototype)[a]] = function(){};
			}
			return true;
		} else {
			return false;
		}
	}

	player(ent){
		this.modifyContextMatrix(/*turn(ent.mouseShift.x, ent.mouseShift.y).angle*/0, ent.x + ent.map.xshift(), ent.y + ent.map.yshift(), turn(ent.mouseShift.x, ent.mouseShift.y).side/*ent.turn*/);
		this.can.drawImage(this.doomguy, ent.hitbox.x1, ent.hitbox.y1, ent.hitbox.x2 - ent.hitbox.x1, ent.hitbox.y2 - ent.hitbox.y1);
		this.can.restore();
	}

	amogus(ent, num){
		this.modifyContextMatrix(/*turn(ent.mouseShift.x, ent.mouseShift.y).angle*/0, ent.x + ent.map.xshift(), ent.y + ent.map.yshift(), ent.walkAnimationTechnicalities.turn/*ent.turn*/);
		this.can.drawImage(this.amogusLegs[num], ent.hitbox.x1, ent.hitbox.y1, ent.hitbox.x2 - ent.hitbox.x1, ent.hitbox.y2 - ent.hitbox.y1);
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
		this.can.drawImage(this.obstacle, obj.x + obj.hitbox.x1 + obj.map.xshift(), obj.y + obj.hitbox.y1 + obj.map.yshift(), obj.hitbox.x2 - obj.hitbox.x1, obj.hitbox.y2 - obj.hitbox.y1);
	}

	bgObject(obj){
		this.can.drawImage(this.bgStone, obj.x + obj.hitbox.x1 + obj.map.xshift(), obj.y + obj.hitbox.y1 + obj.map.yshift(), obj.hitbox.x2 - obj.hitbox.x1, obj.hitbox.y2 - obj.hitbox.y1);
		this.can.drawImage(this.bgStone, obj.x + obj.hitbox.x1 + obj.map.xshift(), obj.y + obj.hitbox.y1 + obj.map.yshift(), obj.hitbox.x2 - obj.hitbox.x1, obj.hitbox.y2 - obj.hitbox.y1);
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

	placeholderHitbox(box, brightness = 255){
		this.can.fillStyle = "rgba(255, 0, 0, " + brightness + ")";
		this.can.fillRect(box.coordinates.x + box.hitbox.x1 + box.map.xshift(), box.coordinates.y + box.hitbox.y1 + box.map.yshift(), box.hitbox.x2 - box.hitbox.x1, box.hitbox.y2 - box.hitbox.y1);
	}

	wire(obj){
		this.can.fillStyle = "red";
		this.can.fillRect(obj.x + obj.hitbox.x1 + obj.map.xshift(), obj.y + obj.hitbox.y1 + obj.map.yshift(), obj.hitbox.x2 - obj.hitbox.x1, obj.hitbox.y2 - obj.hitbox.y1);
	}

	text(part){
		this.can.fillStyle = "black";
		this.can.fillRect(part.hitbox.x1, part.hitbox.y1, part.hitbox.x2 - part.hitbox.x1, part.hitbox.y2 - part.hitbox.y1);
		this.can.textAlign = "center";
		this.can.fillStyle = "green";
		this.can.font = "15px arial";
		this.can.fillText(part.text, (part.hitbox.x2 + part.hitbox.x1) / 2, (part.hitbox.y2 + part.hitbox.y1) / 2 + 8, part.hitbox.x2 - part.hitbox.x1);
	}

	wireFrame(part){
		this.can.drawImage(this.wireframe, part.hitbox.x1, part.hitbox.y1, part.hitbox.x2 - part.hitbox.x1, part.hitbox.y2 - part.hitbox.y1);
	}

	brokenWire(part){
		if (part.status === 0){
			this.can.drawImage(this.wire1, part.hitbox.x1, part.hitbox.y1, part.hitbox.x2 - part.hitbox.x1, part.hitbox.y2 - part.hitbox.y1);
		} else if (part.status === 2){
			this.can.drawImage(this.wire2, part.hitbox.x1, part.hitbox.y1, part.hitbox.x2 - part.hitbox.x1, part.hitbox.y2 - part.hitbox.y1);
		}
	}

	vaultTube(obj){
		this.can.drawImage(this.tube, obj.x + obj.hitbox.x1 + obj.map.xshift(), obj.y + obj.hitbox.y1 + obj.map.yshift(), obj.hitbox.x2 - obj.hitbox.x1, obj.hitbox.y2 - obj.hitbox.y1);
	}
	
	vaultModule(obj){
		this.can.fillStyle = "black";
		this.can.fillRect(obj.x + obj.hitbox.x1 + obj.map.xshift(), obj.y + obj.hitbox.y1 + obj.map.yshift() + (obj.hitbox.y2 - obj.hitbox.y1) * 0.25, (obj.hitbox.x2 - obj.hitbox.x1), (obj.hitbox.y2 - obj.hitbox.y1) / 2);
		this.can.fillStyle = "rgb(100, 255, 0)";
		this.can.fillRect(obj.x + obj.hitbox.x1 + obj.map.xshift(), obj.y + obj.hitbox.y1 + obj.map.yshift() + (obj.hitbox.y2 - obj.hitbox.y1) * 0.25, (obj.hitbox.x2 - obj.hitbox.x1) / 3, (obj.hitbox.y2 - obj.hitbox.y1) * 0.5 * obj.vault.fuel / 100);
		this.can.fillStyle = "rgb(200, 200, 200)";
		this.can.fillRect(obj.x + obj.hitbox.x1 + obj.map.xshift() + (obj.hitbox.x2 - obj.hitbox.x1) / 3, obj.y + obj.hitbox.y1 + obj.map.yshift() + (obj.hitbox.y2 - obj.hitbox.y1) * 0.25, (obj.hitbox.x2 - obj.hitbox.x1) / 3, (obj.hitbox.y2 - obj.hitbox.y1) * 0.5 * obj.vault.oxygen / 100);
		this.can.fillStyle = "rgb(0, 183, 255)";
		this.can.fillRect(obj.x + obj.hitbox.x1 + obj.map.xshift() + (obj.hitbox.x2 - obj.hitbox.x1) / 3 * 2, obj.y + obj.hitbox.y1 + obj.map.yshift() + (obj.hitbox.y2 - obj.hitbox.y1) * 0.25, (obj.hitbox.x2 - obj.hitbox.x1) / 3, (obj.hitbox.y2 - obj.hitbox.y1) * 0.5 * obj.vault.water / 100);
		this.can.drawImage(this.vault, obj.x + obj.hitbox.x1 + obj.map.xshift(), obj.y + obj.hitbox.y1 + obj.map.yshift(), obj.hitbox.x2 - obj.hitbox.x1, obj.hitbox.y2 - obj.hitbox.y1);
	}

	foodDispencer(obj){
		this.can.drawImage(this.dispencer, obj.x + obj.hitbox.x1 + obj.map.xshift(), obj.y + obj.hitbox.y1 + obj.map.yshift(), obj.hitbox.x2 - obj.hitbox.x1, obj.hitbox.y2 - obj.hitbox.y1);
	}

	terminal1(obj){
		this.can.drawImage(this.mainTerminal, obj.x + obj.hitbox.x1 + obj.map.xshift(), obj.y + obj.hitbox.y1 + obj.map.yshift(), obj.hitbox.x2 - obj.hitbox.x1, obj.hitbox.y2 - obj.hitbox.y1);
	}

	oxygenTank(obj, oxygen){
		this.can.fillStyle = "black";
		this.can.fillRect((obj.x + obj.hitbox.x1 + obj.map.xshift()) + (obj.hitbox.x2 - obj.hitbox.x1) / 3, obj.y + obj.hitbox.y1 + obj.map.yshift() + (obj.hitbox.y2 - obj.hitbox.y1) * 0.25, (obj.hitbox.x2 - obj.hitbox.x1) / 3, (obj.hitbox.y2 - obj.hitbox.y1) * 0.5);
		this.can.fillStyle = "rgb(200, 200, 200)";
		this.can.fillRect((obj.x + obj.hitbox.x1 + obj.map.xshift()) + (obj.hitbox.x2 - obj.hitbox.x1) / 3, obj.y + obj.hitbox.y1 + obj.map.yshift() + (obj.hitbox.y2 - obj.hitbox.y1) * 0.25, (obj.hitbox.x2 - obj.hitbox.x1) / 3, (obj.hitbox.y2 - obj.hitbox.y1) * 0.5 * oxygen / 20);
		this.can.drawImage(this.o2, obj.x + obj.hitbox.x1 + obj.map.xshift(), obj.y + obj.hitbox.y1 + obj.map.yshift(), obj.hitbox.x2 - obj.hitbox.x1, obj.hitbox.y2 - obj.hitbox.y1);
	}
	waterTank(obj, water){
		this.can.fillStyle = "black";
		this.can.fillRect((obj.x + obj.hitbox.x1 + obj.map.xshift()) + (obj.hitbox.x2 - obj.hitbox.x1) / 3, obj.y + obj.hitbox.y1 + obj.map.yshift() + (obj.hitbox.y2 - obj.hitbox.y1) * 0.25, (obj.hitbox.x2 - obj.hitbox.x1) / 3, (obj.hitbox.y2 - obj.hitbox.y1) * 0.5);
		this.can.fillStyle = "rgb(200, 200, 200)";
		this.can.fillRect((obj.x + obj.hitbox.x1 + obj.map.xshift()) + (obj.hitbox.x2 - obj.hitbox.x1) / 3, obj.y + obj.hitbox.y1 + obj.map.yshift() + (obj.hitbox.y2 - obj.hitbox.y1) * 0.25, (obj.hitbox.x2 - obj.hitbox.x1) / 3, (obj.hitbox.y2 - obj.hitbox.y1) * 0.5 * water / 20);
		this.can.drawImage(this.tank, obj.x + obj.hitbox.x1 + obj.map.xshift(), obj.y + obj.hitbox.y1 + obj.map.yshift(), obj.hitbox.x2 - obj.hitbox.x1, obj.hitbox.y2 - obj.hitbox.y1);
	}

	O2H2Oport(obj){
		this.can.drawImage(this.waterPort, obj.x + obj.hitbox.x1 + obj.map.xshift(), obj.y + obj.hitbox.y1 + obj.map.yshift(), obj.hitbox.x2 - obj.hitbox.x1, obj.hitbox.y2 - obj.hitbox.y1);
	}

	reactor(obj){
		this.can.drawImage(this.reactorImg, obj.x + obj.hitbox.x1 + obj.map.xshift(), obj.y + obj.hitbox.y1 + obj.map.yshift(), obj.hitbox.x2 - obj.hitbox.x1, obj.hitbox.y2 - obj.hitbox.y1);
	}

	ventTerminal(obj){
		this.can.drawImage(this.ventTerminalImg, obj.x + obj.hitbox.x1 + obj.map.xshift(), obj.y + obj.hitbox.y1 + obj.map.yshift(), obj.hitbox.x2 - obj.hitbox.x1, obj.hitbox.y2 - obj.hitbox.y1);
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

	elevButton(obj){
		this.can.drawImage(this.elevatorButton, obj.x + obj.hitbox.x1 + obj.map.xshift(), obj.y + obj.hitbox.y1 + obj.map.yshift(), obj.hitbox.x2 - obj.hitbox.x1, obj.hitbox.y2 - obj.hitbox.y1);
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

	HUDBasic(owner){
		this.can.fillStyle = "grey";
		this.can.fillRect(28, 28, 204, 19);
		this.can.fillStyle = "black";
		this.can.fillRect(30, 30, 200, 15);
		this.can.fillStyle = "red";
		this.can.fillRect(30, 30, owner.hp / owner.maxHp * 200, 15);
	}


	ventBg(part){
		this.can.drawImage(this.ventInterface, part.hitbox.x1, part.hitbox.y1, part.hitbox.x2 - part.hitbox.x1, part.hitbox.y2 - part.hitbox.y1);
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
		if (this.clearMethods()){return} else {this.backgroundDrg = function(field){
				this.can.fillStyle = "black";
				this.can.fillRect(0, 0, field.size, field.size);
				//this.can.drawImage(this.caveBg, -field.xshift() % field.size + field.size, -field.yshift() % field.size + field.size, field.size, field.size, 0, 0, field.size, field.size);
			}
		}
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
		this.can.drawImage(this.blood, ptl.coordinates.x + ptl.hitbox.x1 + ptl.map.xshift(), ptl.coordinates.y + ptl.hitbox.y1 + ptl.map.yshift(), ptl.hitbox.x2 - ptl.hitbox.x1, ptl.hitbox.y2 - ptl.hitbox.y1);
	}

	electroParticle(ptl){
		this.can.fillStyle = "lightblue";
		this.can.fillRect(ptl.coordinates.x + ptl.hitbox.x1 + ptl.map.xshift(), ptl.coordinates.y + ptl.hitbox.y1 + ptl.map.yshift(), ptl.hitbox.x2 - ptl.hitbox.x1, ptl.hitbox.y2 - ptl.hitbox.y1);
	}

	meltdownParticle(){
		this.can.fillStyle = "rgba(255, 0, 0, 0.15)";
		this.can.fillRect(0, 0, this.map.size, this.map.size);
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


//export {Draw}
//module.exports.Draw = Draw;
function keyDownHandler(){
	let p = immediateApi.getPlayer();
    if (event.keyCode === 65){
        p.leftPress();
		p.turn = -1;
    } else if (event.keyCode === 87){
        p.upPress();
    } else if (event.keyCode === 68){
        p.rightPress();
		p.turn = 1;
    } else if (event.keyCode === 83){
        p.downPress();
    } else if (event.keyCode === 32){
        p.useHand();
    } else if (event.keyCode === 49){
        p.unUseHand();
        p.inventory.mainhand[0] = p.inventory.hotbar[0];
    } else if (event.keyCode === 50){
        p.unUseHand();
        p.inventory.mainhand[0] = p.inventory.hotbar[1];
    } else if (event.keyCode === 51){
        p.unUseHand();
        p.inventory.mainhand[0] = p.inventory.hotbar[2];
    } else if (event.keyCode === 52){
        p.unUseHand();
        p.inventory.mainhand[0] = p.inventory.hotbar[3];
    } else if (event.keyCode === 53){
        p.unUseHand();
        p.inventory.mainhand[0] = p.inventory.hotbar[4];
    } else if (event.keyCode === 54){
        p.unUseHand();
        p.inventory.mainhand[0] = p.inventory.hotbar[5];
    } else if (event.keyCode === 55){
        p.unUseHand();
        p.inventory.mainhand[0] = p.inventory.hotbar[6];
    } else if (event.keyCode === 56){
        p.unUseHand();
        p.inventory.mainhand[0] = p.inventory.hotbar[7];
    } else if (event.keyCode === 57){
        p.unUseHand();
        p.inventory.mainhand[0] = p.inventory.hotbar[8];
    } else if (event.keyCode === 48){
        p.unUseHand();
        p.inventory.mainhand[0] = p.inventory.hotbar[9];
    } else if (event.keyCode === 69){
		d = false;
		if (baseBackend.cart.linked[immediateApi.activePlayerId]){
			baseBackend.cart.block.interact(immediateApi.getPlayer());
			baseBackend.cart.unstuck();
			baseBackend.cart.block.hitbox = {x1: 15, x2: -15, y1: 15, y2: -15};
			p.speedMultipliers[2] = 1;
			d = true;
		}
		new InteractivityHitbox(p);
		if (d) {
			baseBackend.cart.block.hitbox = {x1: -15, x2: 15, y1: -15, y2: 15};
		}
		d = false;
	} else if (event.keyCode === 13){//enter
		if (!p.activeInterfaces[0]){
			p.activeInterfaces[0] = true;
			p.inventoryId = p.personalInterfaces.push(p.inventory) - 1;
		} else {
			p.activeInterfaces[0] = false;
			p.personalInterfaces[p.inventoryId] = undefined;
		}
	} else if (event.keyCode === 77){//M
		//if (!p.activeInterfaces[1]){
        //    p.activeInterfaces[1] = true;
        //    p.mapId = p.personalInterfaces.push(p.minimap) - 1;
        //}
    } else if (event.keyCode === 82){//R
        //p.activeLevelEditor.circleSelector();
        p.inventory.mainhand[0].reload();
    } else if (event.keyCode === 81){//Q
        //new GridParticle(p, 20);
        //new GridParticle(p, 600, true);
    } else if (event.keyCode === 84){//T
        //p.activeLevelEditor.logInput(p.mouseBox.coordinates);
    } else if (event.keyCode === 67){//C
        //p.activeLevelEditor.clearInputs();
    } else if (event.keyCode === 76){//L
        //p.activeLevelEditor.logSchematic();
    } else if (event.keyCode === 70){//F
        //p.activeLevelEditor.doSelected();
    } else if (event.keyCode === 90){//Z
        //p.activeLevelEditor.ctrlz();
    }
}


function keyUpHandler(){
	let p = immediateApi.getPlayer();
    if (event.keyCode === 65){
        p.rightPress();
    } else if (event.keyCode === 87){
        p.downPress();
    } else if (event.keyCode === 68){
        p.leftPress();
    } else if (event.keyCode === 83){
        p.upPress();
    } else if (event.keyCode === 32){
        p.unUseHand();
    } else if (event.keyCode === 77){
        p.personalInterfaces[p.mapId] = undefined;
        p.activeInterfaces[1] = false;
    }
}


function mouseMoveHandler(){
	let p = immediateApi.getPlayer();
    p.mousePosition = {x: Math.floor(event.offsetX * screenSizeMultiplier * 10) / 10, y: Math.floor(event.offsetY * screenSizeMultiplier * 10) / 10};
    p.mouseBox.tp(p.mousePosition.x - p.map.xshift(), p.mousePosition.y - p.map.yshift());
    p.mouseShift.x = p.mousePosition.x - p.map.xshift() - p.x;
    p.mouseShift.y = p.mousePosition.y - p.map.yshift() - p.y;
    for (let a = 0; a < p.activeRockets.length; a++){
        p.rockets[p.activeRockets[a]].goal = {x: p.mousePosition.x - p.map.xshift(), y: p.mousePosition.y - p.map.yshift()};
    }
    map.manageCursor(event.offsetX * screenSizeMultiplier, event.offsetY * screenSizeMultiplier);
}


function clickHandler(event){
    map.manageClick();
}


/*module.exports.keyDownHandlerlayer = keyDownHandler;
module.exports.keyUpHandler = keyUpHandler;
module.exports.mouseMoveHandler = mouseMoveHandler;
module.exports.clickHandler = clickHandler;*/
//export {keyDownHandler, keyUpHandler, mouseMoveHandler, clickHandler};
class Box{
	constructor(x = 5, y = 5, hitbox = {x1: -5, x2: 5, y1: -5, y2: 5, radius: 10}, damage = {type: "generic", amount: 1, iFrame: 3000}, life = -1000, boxScreen = map) {
		this.map = boxScreen;
		this.life = life;
		this.parameters = {};
		this.coordinates = {x: x, y: y};
		this.hitbox = hitbox;
		this.hitbox.additional = [];
		this.damage = damage;
		this.id = this.map.boxList.push(this) - 1;
		this.touchedEntities = [];
		this.map.reloadBoxActiveList();
		this.reloadLoadingZone();
		this.damageSetter();
		this.map.assignIndividualId(this);
	}

	draw(){
	}

	tickMove(){
		this.tickPlaceholderMain();
		this.tickPlaceholder1();
		this.tickPlaceholder2();
		this.tickPlaceholder3();
	}

	tickPlaceholderMain(){
		this.enableDamage(this.touch());
		this.age();
	}

	tickPlaceholder1(){
	}

	tickPlaceholder2(){
	}
	
	tickPlaceholder3(){
	}

	increasedHitbox(scale){
		let a = this.hitbox;
		a.x1 *= scale;
		a.x2 *= scale;
		a.y1 *= scale;
		a.y2 *= scale;
		return a;
	}

	scaledHitbox(scale){
		let a = {x1: this.hitbox.x1, x2: this.hitbox.x2, y1: this.hitbox.y1, y2: this.hitbox.y2};
		a.x1 *= scale;
		a.x2 *= scale;
		a.y1 *= scale;
		a.y2 *= scale;
		return a;
	}
	
	bind(parentEntity){
		this.coordinates = parentEntity;
		parentEntity.bindedHitboxes.push(this);
		this.touchedEntities.push(parentEntity);
		this.map = parentEntity.map;
		this.reloadLoadingZone();
	}

	tp(x = 0, y = 0){
		this.coordinates.x = x;
		this.coordinates.y = y;
		this.reloadLoadingZone();
	}
	
	move(x = 0, y = 0){
		this.coordinates.x += x;
		this.coordinates.y += y;
		this.reloadLoadingZone();
	}

	moveToGoal(a, b, step){
		let stepProjections = projections(a - this.coordinates.x, b - this.coordinates.y, step);
		this.coordinates.x += Math.round(stepProjections.x * 10) / 10;
		this.coordinates.y += Math.round(stepProjections.y * 10) / 10;
		this.reloadLoadingZone();
	}

	remove(){
		this.map.boxList[this.id] = undefined;
		this.map.reloadBoxActiveList();
	}

	age(){
		if (this.life <= 0 && this.life > -1000){
			this.remove();
		}
		this.life--;
	}
	
	iFrameRemover(id, box){//removes entities with expired iFrame timer from untouchable entity list
		box.touchedEntities[id] = undefined;
	}
	
	enableDamage(list){//list is a list of entities to who the damage is enabled
		for(let a = 0; a < list.length; a++){
			let unTouched = true;
			for (let b = 0; b < this.touchedEntities.length; b++){
				if (list[a] === this.touchedEntities[b]){
					unTouched = false;
				}
			}
			if (unTouched){
				let touchedId = this.touchedEntities.push(list[a]) - 1;
				this.damageEntity(list[a]);
				setTimeout(this.iFrameRemover, this.damage.iFrame - this.map.framerate / 2, touchedId, this);
				this.damagePlaceholderFunction(list[a]);
			}
		}
	}

	damagePlaceholderFunction(){}

	damageSetter(){
		if (this.damage.type === "generic"){
			this.damageEntity = function(ent){ent.damageGeneric(this.damage.amount, this);};
		} else if (this.damage.type === "piercing"){
			this.damageEntity = function(ent){ent.damagePiercing(this.damage.amount, this);};
		} else if (this.damage.type === "enemy"){
			this.damageEntity = function(ent){ent.damageEnemy(this.damage.amount, this);};
		} else if (this.damage.type === "playerGeneric"){
			this.damageEntity = function(ent){ent.damagePlayer(this.damage.amount, this);};
		} else if (this.damage.type === "fire"){
			this.damageEntity = function(ent){ent.damageFire(this.damage.amount, this);};
		}
	}

	overlap(){
		let collisionZone = this.map.loadingZones[this.loadingZone.x][this.loadingZone.y];
		for (let a = 0; a < collisionZone.length; a++){
			if (collisionZone[a] === undefined || collisionZone[a].fake){
				continue;
			}
			let x1 = this.coordinates.x + this.hitbox.x1;
			let x2 = this.coordinates.x + this.hitbox.x2;
			let y1 = this.coordinates.y + this.hitbox.y1;
			let y2 = this.coordinates.y + this.hitbox.y2;
			let objectX1 = collisionZone[a].hitbox.x1 + collisionZone[a].x;
			let objectY1 = collisionZone[a].hitbox.y1 + collisionZone[a].y;
			let objectX2 = collisionZone[a].hitbox.x2 + collisionZone[a].x;
			let objectY2 = collisionZone[a].hitbox.y2 + collisionZone[a].y;
			if (x2 > objectX1 && x1 < objectX2 && y2 > objectY1 && y1 < objectY2) {
				return false;
			} else {
				for (let b = 0; b < this.hitbox.additional.length; b++){
					x1 = this.coordinates.x + this.hitbox.additional[b].x1;
					x2 = this.coordinates.x + this.hitbox.additional[b].x2;
					y1 = this.coordinates.y + this.hitbox.additional[b].y1;
					y2 = this.coordinates.y + this.hitbox.additional[b].y2;
					objectX1 = collisionZone[a].hitbox.x1 + collisionZone[a].x;
					objectY1 = collisionZone[a].hitbox.y1 + collisionZone[a].y;
					objectX2 = collisionZone[a].hitbox.x2 + collisionZone[a].x;
					objectY2 = collisionZone[a].hitbox.y2 + collisionZone[a].y;
					if (x2 > objectX1 && x1 < objectX2 && y2 > objectY1 && y1 < objectY2) {
						return false;
					}
				}
			}
		}
		return true;
	}
	
	contact(){
		let collisionZone = this.map.loadingZones[this.loadingZone.x][this.loadingZone.y];
		let collisionList = [];
		for (let a = 0; a < collisionZone.length; a++){
			if (collisionZone[a] === undefined || collisionZone[a].fake){
				continue;
			}
			let x1 = this.coordinates.x + this.hitbox.x1;
			let x2 = this.coordinates.x + this.hitbox.x2;
			let y1 = this.coordinates.y + this.hitbox.y1;
			let y2 = this.coordinates.y + this.hitbox.y2;
			let objectX1 = collisionZone[a].hitbox.x1 + collisionZone[a].x;
			let objectY1 = collisionZone[a].hitbox.y1 + collisionZone[a].y;
			let objectX2 = collisionZone[a].hitbox.x2 + collisionZone[a].x;
			let objectY2 = collisionZone[a].hitbox.y2 + collisionZone[a].y;
			if (x2 > objectX1 && x1 < objectX2 && y2 > objectY1 && y1 < objectY2) {
				collisionList.push(collisionZone[a]);
			} else {
				for (let b = 0; b < this.hitbox.additional.length; b++){
					x1 = this.coordinates.x + this.hitbox.additional[b].x1;
					x2 = this.coordinates.x + this.hitbox.additional[b].x2;
					y1 = this.coordinates.y + this.hitbox.additional[b].y1;
					y2 = this.coordinates.y + this.hitbox.additional[b].y2;
					objectX1 = collisionZone[a].hitbox.x1 + collisionZone[a].x;
					objectY1 = collisionZone[a].hitbox.y1 + collisionZone[a].y;
					objectX2 = collisionZone[a].hitbox.x2 + collisionZone[a].x;
					objectY2 = collisionZone[a].hitbox.y2 + collisionZone[a].y;
					if (x2 > objectX1 && x1 < objectX2 && y2 > objectY1 && y1 < objectY2) {
						collisionList.push(collisionZone[a]);
						break;
					}
				}
			}
		}
		return collisionList;
	}
	
	contactBackground(){
		let collisionZone = this.map.bgObjectZones[this.loadingZone.x][this.loadingZone.y];
		let collisionList = [];
		for (let a = 0; a < collisionZone.length; a++){
			if (collisionZone[a] === undefined || collisionZone[a].fake){
				continue;
			}
			let x1 = this.coordinates.x + this.hitbox.x1;
			let x2 = this.coordinates.x + this.hitbox.x2;
			let y1 = this.coordinates.y + this.hitbox.y1;
			let y2 = this.coordinates.y + this.hitbox.y2;
			let objectX1 = collisionZone[a].hitbox.x1 + collisionZone[a].x;
			let objectY1 = collisionZone[a].hitbox.y1 + collisionZone[a].y;
			let objectX2 = collisionZone[a].hitbox.x2 + collisionZone[a].x;
			let objectY2 = collisionZone[a].hitbox.y2 + collisionZone[a].y;
			if (x2 > objectX1 && x1 < objectX2 && y2 > objectY1 && y1 < objectY2) {
				collisionList.push(collisionZone[a]);
			} else {
				for (let b = 0; b < this.hitbox.additional.length; b++){
					x1 = this.coordinates.x + this.hitbox.additional[b].x1;
					x2 = this.coordinates.x + this.hitbox.additional[b].x2;
					y1 = this.coordinates.y + this.hitbox.additional[b].y1;
					y2 = this.coordinates.y + this.hitbox.additional[b].y2;
					objectX1 = collisionZone[a].hitbox.x1 + collisionZone[a].x;
					objectY1 = collisionZone[a].hitbox.y1 + collisionZone[a].y;
					objectX2 = collisionZone[a].hitbox.x2 + collisionZone[a].x;
					objectY2 = collisionZone[a].hitbox.y2 + collisionZone[a].y;
					if (x2 > objectX1 && x1 < objectX2 && y2 > objectY1 && y1 < objectY2) {
						collisionList.push(collisionZone[a]);
						break;
					}
				}
			}
		}
		return collisionList;
	}
	
	contactAnyway(){
		let collisionZone = this.map.loadingZones[this.loadingZone.x][this.loadingZone.y];
		let collisionList = [];
		for (let a = 0; a < collisionZone.length; a++){
			if (collisionZone[a] === undefined){
				continue;
			}
			let x1 = this.coordinates.x + this.hitbox.x1;
			let x2 = this.coordinates.x + this.hitbox.x2;
			let y1 = this.coordinates.y + this.hitbox.y1;
			let y2 = this.coordinates.y + this.hitbox.y2;
			let objectX1 = collisionZone[a].hitbox.x1 + collisionZone[a].x;
			let objectY1 = collisionZone[a].hitbox.y1 + collisionZone[a].y;
			let objectX2 = collisionZone[a].hitbox.x2 + collisionZone[a].x;
			let objectY2 = collisionZone[a].hitbox.y2 + collisionZone[a].y;
			if (x2 > objectX1 && x1 < objectX2 && y2 > objectY1 && y1 < objectY2) {
				collisionList.push(collisionZone[a]);
			} else {
				for (let b = 0; b < this.hitbox.additional.length; b++){
					x1 = this.coordinates.x + this.hitbox.additional[b].x1;
					x2 = this.coordinates.x + this.hitbox.additional[b].x2;
					y1 = this.coordinates.y + this.hitbox.additional[b].y1;
					y2 = this.coordinates.y + this.hitbox.additional[b].y2;
					objectX1 = collisionZone[a].hitbox.x1 + collisionZone[a].x;
					objectY1 = collisionZone[a].hitbox.y1 + collisionZone[a].y;
					objectX2 = collisionZone[a].hitbox.x2 + collisionZone[a].x;
					objectY2 = collisionZone[a].hitbox.y2 + collisionZone[a].y;
					if (x2 > objectX1 && x1 < objectX2 && y2 > objectY1 && y1 < objectY2) {
						collisionList.push(collisionZone[a]);
						break;
					}
				}
			}
		}
		return collisionList;
	}

	touch(){
		let collisionZone = this.map.entityZones[this.loadingZone.x][this.loadingZone.y];
		let overlapList = [];
		for (let a = 0; a < collisionZone.length; a++){
			if (collisionZone[a] === undefined){
				continue;
			}
			let x1 = this.coordinates.x + this.hitbox.x1;
			let x2 = this.coordinates.x + this.hitbox.x2;
			let y1 = this.coordinates.y + this.hitbox.y1;
			let y2 = this.coordinates.y + this.hitbox.y2;
			let mainAdd = true;//true if main didnt overlap
			let objectX1 = collisionZone[a].hitbox.x1 + collisionZone[a].x;
			let objectY1 = collisionZone[a].hitbox.y1 + collisionZone[a].y;
			let objectX2 = collisionZone[a].hitbox.x2 + collisionZone[a].x;
			let objectY2 = collisionZone[a].hitbox.y2 + collisionZone[a].y;
			if (x2 > objectX1 && x1 < objectX2 && y2 > objectY1 && y1 < objectY2) {//checks hitboxes main - main
				overlapList.push(collisionZone[a]);
				mainAdd = false;
			} else {
				for (let c = 0; c < collisionZone[a].hitbox.additional.length; c++){//checks hitboxes main - add
					objectX1 = collisionZone[a].hitbox.additional[c].x1 + collisionZone[a].x;
					objectY1 = collisionZone[a].hitbox.additional[c].y1 + collisionZone[a].y;
					objectX2 = collisionZone[a].hitbox.additional[c].x2 + collisionZone[a].x;
					objectY2 = collisionZone[a].hitbox.additional[c].y2 + collisionZone[a].y;
					if (x2 > objectX1 && x1 < objectX2 && y2 > objectY1 && y1 < objectY2) {
						overlapList.push(collisionZone[a]);
						mainAdd = false;
						break;
					}
				}
			}
			if (mainAdd) {
				for (let b = 0; b < this.hitbox.additional.length; b++){//add1 parameters cycle
					x1 = this.coordinates.x + this.hitbox.additional[b].x1;
					x2 = this.coordinates.x + this.hitbox.additional[b].x2;
					y1 = this.coordinates.y + this.hitbox.additional[b].y1;
					y2 = this.coordinates.y + this.hitbox.additional[b].y2;
					if (x2 >= objectX1 && x1 <= objectX2 && y2 >= objectY1 && y1 <= objectY2) {//checks add - main
						overlapList.push(collisionZone[a]);
						break;
					} else {
						for (let c = 0; c < collisionZone[a].hitbox.additional.length; a++){//checks add - add
							objectX1 = collisionZone[a].hitbox.additional[c].x1 + collisionZone[a].x;
							objectY1 = collisionZone[a].hitbox.additional[c].y1 + collisionZone[a].y;
							objectX2 = collisionZone[a].hitbox.additional[c].x2 + collisionZone[a].x;
							objectY2 = collisionZone[a].hitbox.additional[c].y2 + collisionZone[a].y;
							if (x2 >= objectX1 && x1 <= objectX2 && y2 >= objectY1 && y1 <= objectY2) {
								overlapList.push(collisionZone[a]);
								break;
							}
						}
					break;
					}
				}
			}
		}
		return overlapList;
	}

	touchSpecific(ent){
		let x1 = this.coordinates.x + this.hitbox.x1;
		let x2 = this.coordinates.x + this.hitbox.x2;
		let y1 = this.coordinates.y + this.hitbox.y1;
		let y2 = this.coordinates.y + this.hitbox.y2;
		let mainAdd = true;//true if main didnt overlap
		let objectX1 = ent.hitbox.x1 + ent.x;
		let objectY1 = ent.hitbox.y1 + ent.y;
		let objectX2 = ent.hitbox.x2 + ent.x;
		let objectY2 = ent.hitbox.y2 + ent.y;
		if (x2 > objectX1 && x1 < objectX2 && y2 > objectY1 && y1 < objectY2) {//checks hitboxes main - main
			return true;
		} else {
			for (let c = 0; c < ent.hitbox.additional.length; c++){//checks hitboxes main - add
				objectX1 = ent.hitbox.additional[c].x1 + ent.x;
				objectY1 = ent.hitbox.additional[c].y1 + ent.y;
				objectX2 = ent.hitbox.additional[c].x2 + ent.x;
				objectY2 = ent.hitbox.additional[c].y2 + ent.y;
				if (x2 > objectX1 && x1 < objectX2 && y2 > objectY1 && y1 < objectY2) {
					return true;
				}
			}
		}
		if (mainAdd) {
			for (let b = 0; b < this.hitbox.additional.length; b++){//add1 parameters cycle
				x1 = this.coordinates.x + this.hitbox.additional[b].x1;
				x2 = this.coordinates.x + this.hitbox.additional[b].x2;
				y1 = this.coordinates.y + this.hitbox.additional[b].y1;
				y2 = this.coordinates.y + this.hitbox.additional[b].y2;
				if (x2 >= objectX1 && x1 <= objectX2 && y2 >= objectY1 && y1 <= objectY2) {//checks add - main
					return true;
				} else {
					for (let c = 0; c < ent.hitbox.additional.length; a++){//checks add - add
						objectX1 = ent.hitbox.additional[c].x1 + ent.x;
						objectY1 = ent.hitbox.additional[c].y1 + ent.y;
						objectX2 = ent.hitbox.additional[c].x2 + ent.x;
						objectY2 = ent.hitbox.additional[c].y2 + ent.y;
						if (x2 >= objectX1 && x1 <= objectX2 && y2 >= objectY1 && y1 <= objectY2) {
							return true;
						}
					}
				break;
				}
			}
		}
		return false;
	}

	reloadLoadingZone(){
		this.loadingZone = {x: Math.floor(this.coordinates.x / this.map.size), y: Math.floor(this.coordinates.y / this.map.size)};
	}

	mapTransfer(direction){
		this.map.boxList[this.id] = undefined;
		let mappa = this.map;
		this.map = direction;
		this.id = direction.boxList.push(this) - 1;
		direction.reloadBoxActiveList();
		mappa.reloadBoxActiveList();
	}
}


class Tool{
	constructor(functionality = function(ent){this.meleeStrike(ent)}, meleeDamage = {type: "generic", amount: 4, iFrame: 240}, type = "stick", sprite = "toolPlaceholder.png", icon = "toolPlaceholder.png"){
		this.functionality = functionality;
		this.meleeDamage = meleeDamage;
		this.isStackable = false;
		this.cooldown = true;
		this.amount = 1;
		this.type = type;
		this.hitbox = {x1: -40, x2: 40, y1: 5, y2: -15};
		this.maxCooldown = 500;
		this.active = false;
		if (typeof Image !== typeof undefined){
			this.toolIcon = new Image;
			this.toolIcon.src = icon;
			this.sprite = new Image;
			this.sprite.src = sprite;
		} else {
			this.toolIcon = {};
			this.toolIcon.src = icon;
			this.sprite = {};
			this.sprite.src = sprite;
		}
	}

	draw(x1, x2, y1, y2){
		draw.item(this.toolIcon, x1, x2, y1, y2);
	}

	handSprite(ent){
		draw.tool(this.sprite, ent, this.hitbox.x1, this.hitbox.x2, this.hitbox.y1, this.hitbox.y2);
	}
	
	meleeStrike(user){
		let hitbox = {x1: user.hitbox.x1 * 2, x2: user.hitbox.x2 * 2, y1: user.hitbox.y1 * 2, y2: user.hitbox.y2 * 2};
		let meleeHitbox = new Box(user.x, user.y, hitbox, this.meleeDamage, this.meleeDamage.iFrame / (2 * user.map.framerate), user.map);
		meleeHitbox.bind(user);
	}

	activate(){
		this.active = true;
	}

	deactivate(){
		this.active = false;
	}

	tickMove(){}

	use(ent){
		if (this.cooldown) {
			setTimeout((tool, enti) => {tool.cooldown = true; if (tool.active){tool.use(enti)}}, this.maxCooldown, this, ent);
			this.functionality(ent);
			this.cooldown = false;
		}
	}
}


class PlaceholderItem{
	constructor(){
		this.isPlaceholder = true;
		this.statMultipliers = [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0];
	}

	draw(){}

	handSprite(){}

	functionality(){}

	tickMove(){}

	use(){}

	activate(){}

	deactivate(){}
}
class Resource extends PlaceholderItem{
	constructor(amount = 1, type = "stick", ammoType = "NotAmmo", image = "textures/bulletPlaceholder.png"){
		super();
		this.type = type;
		this.amount = amount;
		this.ammoType = ammoType;
		this.isPlaceholder = false;
		if (typeof Image !== typeof undefined){
			this.icon = new Image;
			this.icon.src = image;
		} else {
			this.icon = {};
			this.icon.src = image;
		}
	}

	draw(x1, x2, y1, y2){
		draw.item(this.icon, x1, x2, y1, y2);
	}

	handSprite(){}

	decrease(amount){
		this.amount -= amount;
		let am2 = this.amount;
		if (this.amount <= 0){
			for (let a in this){
				delete this[a];
			}
			let b = new PlaceholderItem;
			Object.assign(this, b);
			this.draw = function(){}
		}
		return am2;
	}
}


class Particle{
	constructor(x = 0, y = 0, life = 12, hitbox = {x1: -40, x2: 0, y1: -20, y2: 20}, particleScreen = map){
		this.coordinates = {x: x, y: y};
		this.hitbox = hitbox;
		this.life = life;
		this.map = particleScreen;
		this.id = particleScreen.particles.push(this) - 1;
		this.particleId = -1;
		draw.startParticle(this);
		this.map.reloadParticleActiveList();
	}

	draw(){
		draw.particle(this);
	}

	move(x = 0, y = 0){
		this.coordinates.x += x;
		this.coordinates.y += y;
	}

	moveDirection(a, b, step){
		let stepProjections = projections(a, b, step);
		this.coordinates.x += Math.round(stepProjections.x * 10) / 10;
		this.coordinates.y += Math.round(stepProjections.y * 10) / 10;
	}

	tickPlaceholderMain(){}

	tickMove(){
		this.age();
		this.tickPlaceholderMain();
	}

	age(){
		if (this.life <= 0){
			//for (let a = this.id; a < this.map.particles.length - 1; a++){
			//	this.map.particles[a] = this.map.particles[a + 1];
			//}
			//this.map.particles.splice(this.map.particles.length - 1, 1);
			if (this.particleId !== -1){
				this.coordinates.bindedParticles[this.particleId] = undefined;
			}
			this.map.particles[this.id] = undefined;
			this.map.reloadParticleActiveList();
		}
		this.life--;
	}

	bind(parentEntity){
		this.coordinates = parentEntity;
		this.particleId = parentEntity.bindedParticles.push(this) - 1;
	}
}


class StatusEffect{
	constructor(entity, life = 500, perform = function(){
		this.effectTimer++;
		if (this.effectTimer >= this.damage.iFrame){
			this.damageEntity(this.owner);
			this.effectTimer = 0;
		}
		this.age();
	}, damage = {type: "fire", amount: 0.4, iFrame: 10}, id){
		this.id = entity.statusEffects.push(this) - 1;
		this.life = life;
		this.effectTimer = 0;
		this.owner = entity;
		this.damage = damage;
		this.perform = perform;
		this.effectId = id;
		this.owner.activeEffects[this.effectId] = true;
		this.damageSetter();
	}

	damageSetter(){
		if (this.damage.type === "generic"){
			this.damageEntity = function(ent){ent.damageGeneric(this.damage.amount, this);};
		} else if (this.damage.type === "piercing"){
			this.damageEntity = function(ent){ent.damagePiercing(this.damage.amount, this);};
		} else if (this.damage.type === "enemy"){
			this.damageEntity = function(ent){ent.damageEnemy(this.damage.amount, this);};
		} else if (this.damage.type === "playerGeneric"){
			this.damageEntity = function(ent){ent.damagePlayer(this.damage.amount, this);};
		} else if (this.damage.type === "fire"){
			this.damageEntity = function(ent){ent.damageFire(this.damage.amount, this);};
		}
	}

	age(){
		if (this.life <= 0){
			this.owner.statusEffects[this.id] = undefined;
			this.owner.activeEffects[this.effectId] = false;
		}
		this.life--;
	}

	particleAdder(){
		let a = new Particle(undefined, undefined, this.life, this.owner.hitbox);
		a.bind(this.owner);
		a.draw = function(){draw.fire(this);};
		a.fireStage = 0;
		a.tickMove = function(){
			this.age();
			this.fireStage += 0.1;
		}
	}
}


class Entity{//создаёт сущность с параметрами, хитбокс - это смещение относительно координат тела
	constructor(x = 100, y = 100, hp = 10, defence = 0, hitbox = {x1: -10, x2: 10, y1: -10, y2: 10}, entityScreen = map, life = 5000, isTechnical = false){
		this.x = x;
		this.y = y;
		this.life = life;
		this.map = entityScreen;
		this.loadingZone = {x: Math.floor(this.x / this.map.size), y: Math.floor(this.y / this.map.size)};
		this.hitbox = hitbox;
		this.hitbox.additional = [];
		this.hp = hp;
		this.maxHp = hp;
		this.defence = defence;
		this.id = this.map.entityList.push(this) - 1;
		this.bindedHitboxes = [];
		this.bindedParticles = [];
		this.statusEffects = [];
		this.activeEffects = [];
		this.inventory = {mainhand: [], hotbar: [], slots: []};
		this.zoneId = this.map.entityZones[this.loadingZone.x][this.loadingZone.y].push(this) - 1;
		this.enemyDamageMultiplier = 1;
		this.playerDamageMultiplier = 1;
		this.map.reloadEntityActiveList();
		this.isTechnical = isTechnical;
		if (!this.isTechnical){
			this.map.assignIndividualId(this);
		}
	}

	draw(){
		draw.entity(this);
	}

	tickMove(){
		this.tickPlaceholderMain();
		this.tickPlaceholder1();
		this.tickPlaceholder2();
		this.tickPlaceholder3();
	}

	tickPlaceholderMain(){
		this.effectTick();
	}

	tickPlaceholder1(){
	}

	tickPlaceholder2(){
	}
	
	tickPlaceholder3(){
	}

	ammunitionGetter(type){
		let ammoCounter = 0;
		for (let d = 0; d < this.inventory.slots.length; d++){
			if (this.inventory.slots[d].ammoType === type){
				ammoCounter += this.inventory.slots[d].amount;
			}
		}
		for (let d = 0; d < this.inventory.hotbar.length; d++){
			if (this.inventory.hotbar[d].ammoType === type){
				ammoCounter += this.inventory.hotbar[d].amount;
			}
		}
		return ammoCounter;
	}

	ammunitionDecreaser(type, amount = 1){
		for (let d = 0; d < this.inventory.hotbar.length; d++){
			if (this.inventory.hotbar[d].ammoType === type){
				let decreased = this.inventory.hotbar[d].decrease(amount);
				if (decreased >= 0){
					return;
				} else {
					amount += decreased;
				}
			}
		}
		for (let d = 0; d < this.inventory.slots.length; d++){
			if (this.inventory.slots[d].ammoType === type){
				let decreased = this.inventory.slots[d].decrease(amount);
				if (decreased >= 0){
					return;
				} else {
					amount += decreased;
				}
			}
		}
	}

	increasedHitbox(scale){
		let a = this.hitbox;
		a.x1 *= scale;
		a.x2 *= scale;
		a.y1 *= scale;
		a.y2 *= scale;
		return a;
	}

	scaledHitbox(scale){
		let a = {x1: this.hitbox.x1, x2: this.hitbox.x2, y1: this.hitbox.y1, y2: this.hitbox.y2};
		a.x1 *= scale;
		a.x2 *= scale;
		a.y1 *= scale;
		a.y2 *= scale;
		return a;
	}
	
	effectTick(){
		for (let a = 0; a < this.statusEffects.length; a++){
			if (this.statusEffects[a] === undefined){continue;}
			this.statusEffects[a].perform();
		}
	}

	tp(x = 0, y = 0){
		this.x = x;
		this.y = y;
	}

	movePlaceholder1(){}

	move(x = 0, y = 0){
		if (this.overlap(x, y)){
			this.x += x;
			this.y += y;
		} else {
			this.contact({x: x, y: y});
		}
		this.reloadEntityZone();
		this.movePlaceholder1();
	}

	moveToGoal(a, b, step){
		let stepProjections = projections(a - this.x, b - this.y, step);
		if (this.overlap(stepProjections.x, stepProjections.y)){
			this.x += Math.round(stepProjections.x * 10) / 10;
			this.y += Math.round(stepProjections.y * 10) / 10;
		} else {
			this.contact(stepProjections);
		}
		this.reloadEntityZone();
		this.movePlaceholder1();
	}

	moveDirection(a, b, step){
		let stepProjections = projections(a, b, step);
		if (this.overlap(stepProjections.x, stepProjections.y)){
			this.x += Math.round(stepProjections.x * 10) / 10;
			this.y += Math.round(stepProjections.y * 10) / 10;
		} else {
			this.contact(stepProjections);
		}
		this.reloadEntityZone();
		this.movePlaceholder1();
	}
	
	moveWithoutRounding(a, b){
		if (this.overlap(a, b)){
			this.x += a;
			this.y += b;
			return false;
		} else {
			return true;
		}
	}
	
	contact(direction){
		if (this.moveWithoutRounding(direction.x, 0)){
			this.moveWithoutRounding(0, Math.sign(direction.y) * (Math.sqrt(direction.x ** 2 + direction.y ** 2) - Math.abs(direction.y)));
		}
		if (this.moveWithoutRounding(0, direction.y)){
			this.moveWithoutRounding(Math.sign(direction.x) * (Math.sqrt(direction.x ** 2 + direction.y ** 2) - Math.abs(direction.x)), 0);
		}
		for (let a = 0; this.overlap(direction.x / 10, direction.y / 10) && a < 10; a++){
			this.moveWithoutRounding(direction.x / 10, direction.y / 10);
		}
		this.x = Math.round(this.x * 10) / 10;
		this.y = Math.round(this.y * 10) / 10;
	}

	kill(){
		this.hp = 0;
		this.checkDeath();
	}

	remove(){
		this.kill();
	}

	heal(amount){
		this.hp += amount;
		if (this.hp > this.maxHp){
			this.hp = this.maxHp;
		}
	}

	give(item){
		for (let d = 0; d < this.inventory.slots.length; d++){
			if (this.inventory.slots[d].isPlaceholder){
				this.inventory.slots[d] = item;
				return;
			} else if (this.inventory.slots[d].type === item.type && item.isStackable) {
				this.inventory.slots[d].amount += item.amount;
				return;
			}
		}
		for (let d = 0; d < this.inventory.hotbar.length; d++){
			if (this.inventory.hotbar[d].isPlaceholder){
				this.inventory.hotbar[d] = item;
				return;
			} else if (this.inventory.hotbar[d].type === item.type) {
				this.inventory.hotbar[d].amount += item.amount;
				return;
			}
		}
	}
	
	damageGeneric(dmg){
		this.hp -= defenceCount(dmg, this.defence);
		this.damagePlaceholder(defenceCount(dmg, this.defence), "damageGeneric");
		this.checkDeath();
	}
	
	damagePiercing(dmg){
		this.hp -= dmg;
		this.damagePlaceholder(dmg, "damagePiercing");
		this.checkDeath();
	}

	damageEnemy(dmg){
		this.hp -= defenceCount(dmg, this.defence) * this.enemyDamageMultiplier;
		this.damagePlaceholder(defenceCount(dmg, this.defence) * this.enemyDamageMultiplier, "damageEnemy");
		this.checkDeath();
	}

	damagePlayer(dmg){
		this.hp -= defenceCount(dmg, this.defence) * this.playerDamageMultiplier;
		this.damagePlaceholder(defenceCount(dmg, this.defence) * this.playerDamageMultiplier, "damagePlayer");
		this.checkDeath();
	}

	damageFire(dmg){
		this.hp -= dmg;
		this.damagePlaceholder(dmg, "damagePlayer");
		this.checkDeath();
	}
	
	checkDeath(){
		if (this.hp <= 0 && this.hp > -1000){
			this.map.entityList[this.id] = undefined;
			this.map.entityZones[this.loadingZone.x][this.loadingZone.y][this.zoneId] = undefined;
			for (let a = 0; a < this.bindedHitboxes.length; a++){
				if(this.bindedHitboxes[a] === undefined){continue}
				this.bindedHitboxes[a].remove();
			}
			for (let a = 0; a < this.bindedParticles.length; a++){
				if(this.bindedParticles[a] === undefined){continue}
				this.bindedParticles[a].life = 0;
			}
			//this.map.removeIndividualId(this);
			this.map.reloadEntityActiveList();
			this.deathPlaceholder1();
		}
	}

	forceRemove(){
		this.map.removeIndividualId(this);
	}

	damagePlaceholder(){}

	deathPlaceholder1(){}

	age(){
		if (this.life <= 0){
			this.hp = 0;
			this.checkDeath();
		}
		this.life--;
	}

	useHand(){
		for (let a in this.inventory.mainhand) {
			this.inventory.mainhand[a].use(this);
			this.inventory.mainhand[a].activate();
		}
	}

	unUseHand(){
		for (let a in this.inventory.mainhand) {
			this.inventory.mainhand[a].deactivate();
		}
	}
	
	overlap(xshift = 0, yshift = 0){
		let collisionZone = this.map.loadingZones[this.loadingZone.x][this.loadingZone.y];
		for (let a = 0; a < collisionZone.length; a++){
			let x1 = this.x + this.hitbox.x1 + xshift;
			let x2 = this.x + this.hitbox.x2 + xshift;
			let y1 = this.y + this.hitbox.y1 + yshift;
			let y2 = this.y + this.hitbox.y2 + yshift;
			if (collisionZone[a] === undefined || collisionZone[a].fake){
				continue;
			}
			let objectX1 = collisionZone[a].hitbox.x1 + collisionZone[a].x;
			let objectY1 = collisionZone[a].hitbox.y1 + collisionZone[a].y;
			let objectX2 = collisionZone[a].hitbox.x2 + collisionZone[a].x;
			let objectY2 = collisionZone[a].hitbox.y2 + collisionZone[a].y;
			if (x2 > objectX1 && x1 < objectX2 && y2 > objectY1 && y1 < objectY2){
				return false;
			} else {
				for (let b = 0; b < this.hitbox.additional.length; b++){//add-main
					x1 = this.x + this.hitbox.additional[b].x1 + xshift;
					x2 = this.x + this.hitbox.additional[b].x2 + xshift;
					y1 = this.y + this.hitbox.additional[b].y1 + yshift;
					y2 = this.y + this.hitbox.additional[b].y2 + yshift;
					if (x2 > objectX1 && x1 < objectX2 && y2 > objectY1 && y1 < objectY2) {
						return false;
					}
				}
			}
		}
		return true;
	}

	overlapAnyway(xshift = 0, yshift = 0){
		let collisionZone = this.map.loadingZones[this.loadingZone.x][this.loadingZone.y];
		for (let a = 0; a < collisionZone.length; a++){
			let x1 = this.x + this.hitbox.x1 + xshift;
			let x2 = this.x + this.hitbox.x2 + xshift;
			let y1 = this.y + this.hitbox.y1 + yshift;
			let y2 = this.y + this.hitbox.y2 + yshift;
			if (collisionZone[a] === undefined){
				continue;
			}
			let objectX1 = collisionZone[a].hitbox.x1 + collisionZone[a].x;
			let objectY1 = collisionZone[a].hitbox.y1 + collisionZone[a].y;
			let objectX2 = collisionZone[a].hitbox.x2 + collisionZone[a].x;
			let objectY2 = collisionZone[a].hitbox.y2 + collisionZone[a].y;
			if (x2 > objectX1 && x1 < objectX2 && y2 > objectY1 && y1 < objectY2){
				return false;
			} else {
				for (let b = 0; b < this.hitbox.additional.length; b++){//add-main
					x1 = this.x + this.hitbox.additional[b].x1 + xshift;
					x2 = this.x + this.hitbox.additional[b].x2 + xshift;
					y1 = this.y + this.hitbox.additional[b].y1 + yshift;
					y2 = this.y + this.hitbox.additional[b].y2 + yshift;
					if (x2 > objectX1 && x1 < objectX2 && y2 > objectY1 && y1 < objectY2) {
						return false;
					}
				}
			}
		}
		return true;
	}
	
	overlapList(){
		let collisionZone = this.map.loadingZones[this.loadingZone.x][this.loadingZone.y];
		let collisionList = [];
		for (let a = 0; a < collisionZone.length; a++){
			let x1 = this.x + this.hitbox.x1;
			let x2 = this.x + this.hitbox.x2;
			let y1 = this.y + this.hitbox.y1;
			let y2 = this.y + this.hitbox.y2;
			if (collisionZone[a] === undefined || collisionZone[a].fake){
				continue;
			}
			let objectX1 = collisionZone[a].hitbox.x1 + collisionZone[a].x;
			let objectY1 = collisionZone[a].hitbox.y1 + collisionZone[a].y;
			let objectX2 = collisionZone[a].hitbox.x2 + collisionZone[a].x;
			let objectY2 = collisionZone[a].hitbox.y2 + collisionZone[a].y;
			if (x2 > objectX1 && x1 < objectX2 && y2 > objectY1 && y1 < objectY2) {//main-main
				collisionList.push(collisionZone[a]);
			} else {
				for (let b = 0; b < this.hitbox.additional.length; b++){//add-main
					x1 = this.x + this.hitbox.additional[b].x1;
					x2 = this.x + this.hitbox.additional[b].x2;
					y1 = this.y + this.hitbox.additional[b].y1;
					y2 = this.y + this.hitbox.additional[b].y2;
					if (x2 > objectX1 && x1 < objectX2 && y2 > objectY1 && y1 < objectY2) {
						collisionList.push(collisionZone[a]);
						break;
					}
				}
			}
		}
		return collisionList;
	}
	
	reloadEntityZone(){
		if (Math.floor(this.x / this.map.size) != this.loadingZone.x || Math.floor(this.y / this.map.size) != this.loadingZone.y){
			this.map.entityZones[this.loadingZone.x][this.loadingZone.y][this.zoneId] = undefined;
			this.loadingZone = {x: Math.floor(this.x / this.map.size), y: Math.floor(this.y / this.map.size)};
			this.zoneId = this.map.entityZones[this.loadingZone.x][this.loadingZone.y].push(this) - 1;
			for (let a = 0; a < this.bindedHitboxes.length; a++){
				this.bindedHitboxes[a].reloadLoadingZone();
			}
		}
	}

	mapTransfer(direction){
		this.map.entityList[this.id] = undefined;
		this.map.entityZones[this.loadingZone.x][this.loadingZone.y][this.zoneId] = undefined;
		for (let a = 0; a < this.bindedHitboxes.length; a++){
			if(this.bindedHitboxes[a] === undefined){continue}
			this.bindedHitboxes[a].mapTransfer(direction);
		}
		for (let a = 0; a < this.bindedParticles.length; a++){
			if(this.bindedParticles[a] === undefined){continue}
			this.bindedParticles[a].life = 0;
		}
		let mappa = this.map;
		this.map = direction;
		this.id = direction.entityList.push(this) - 1;
		this.loadingZone = {x: -1, y: -1};
		this.reloadEntityZone();
		direction.reloadEntityActiveList();
		mappa.reloadEntityActiveList();
	}

	removeProjection(){
		this.map.entityZones[this.loadingZone.x][this.loadingZone.y][this.zoneId] = undefined;
		this.zoneId = 0;
		this.reloadEntityZone = function (){
			if (Math.floor(this.x / this.map.size) != this.loadingZone.x || Math.floor(this.y / this.map.size) != this.loadingZone.y){
				this.loadingZone = {x: Math.floor(this.x / this.map.size), y: Math.floor(this.y / this.map.size)};
				for (let a = 0; a < this.bindedHitboxes.length; a++){
					this.bindedHitboxes[a].reloadLoadingZone();
				}
			}
		}
	}

	getSaveData(){
		if (this.isTechnical){return ""}
		let parameters = [this.individualId, this.x, this.y, this.life, this.hp, this.maxHp, this.defence, this.constructor.name];
		return(parameters.join(" "));
	}

	setSaveData(parameters){
		let parameterNames = ["individualId", "x", "y", "life", "hp", "maxHp", "defence"];
		let numberParams = parameters.map(Number);
		for (let a = 1; a < parameterNames.length - 1; a++){
			if (typeof numberParams[a] !== 'number'){continue}
			this[parameterNames[a]] = numberParams[a];
			if (this[parameterNames[a]] !== numberParams[a]){
				console.error("server asyncronization: " + parameterNames[a]);
			}
		}
	}
}


class ObjectHitbox{
	constructor(x1 = 20, x2 = 50, y1 = 0, y2 = 10, isFake = false, x = undefined, y = undefined, objectScreen = map){
		if (x === undefined || y === undefined){
			this.x = (x1 + x2) / 2;
			this.y = (y1 + y2) / 2;
		} else {
			this.x = x;
			this.y = y;
		}
		this.hitbox = {x1: x1 - this.x, x2: x2 - this.x, y1: y1 - this.y, y2: y2 - this.y, additional: []};
		this.map = objectScreen;
		this.fake = isFake;
		this.appearances = [];
		this.additionalHitboxes();
	}

	draw(){
		draw.object(this);
	}

	additionalHitboxes(){
		for (let a in this.appearances){
			this.map.loadingZones[this.appearances[a].x][this.appearances[a].y][this.appearances[a].id] = undefined;
		}
		this.loadingZone = {x: Math.floor(this.x / this.map.size), y: Math.floor(this.y / this.map.size)};
		let minRange = this.map.size / 10;
		let maxRange = this.map.size / 10 * 9;
		let xRangeMin = this.x + this.hitbox.x1 - this.loadingZone.x * this.map.size;
		let xRangeMax = this.x + this.hitbox.x2 - this.loadingZone.x * this.map.size;
		let yRangeMin = this.y + this.hitbox.y1 - this.loadingZone.y * this.map.size;
		let yRangeMax = this.y + this.hitbox.y2 - this.loadingZone.y * this.map.size;
		this.appearances = [];
		this.listAppearance(this.loadingZone.x, this.loadingZone.y, this.map.loadingZones[this.loadingZone.x][this.loadingZone.y].push(this) - 1);//создаёт дополнительные хитбоксы в соседних ячейках, если необходимо
		if (xRangeMin < minRange){
			this.listAppearance(this.loadingZone.x - 1, this.loadingZone.y, this.map.loadingZones[this.loadingZone.x - 1][this.loadingZone.y].push(this) - 1);
			if (yRangeMin < minRange){
				this.listAppearance(this.loadingZone.x - 1, this.loadingZone.y - 1, this.map.loadingZones[this.loadingZone.x - 1][this.loadingZone.y - 1].push(this) - 1);
			}
		}
		if (yRangeMax > maxRange){
			this.listAppearance(this.loadingZone.x, this.loadingZone.y + 1, this.map.loadingZones[this.loadingZone.x][this.loadingZone.y + 1].push(this) - 1);
			if (xRangeMin < minRange){
				this.listAppearance(this.loadingZone.x - 1, this.loadingZone.y + 1, this.map.loadingZones[this.loadingZone.x - 1][this.loadingZone.y + 1].push(this) - 1);
			}
		}
		if (xRangeMax > maxRange){
			this.listAppearance(this.loadingZone.x + 1, this.loadingZone.y, this.map.loadingZones[this.loadingZone.x + 1][this.loadingZone.y].push(this) - 1);
			if (yRangeMax > maxRange){
				this.listAppearance(this.loadingZone.x + 1, this.loadingZone.y + 1, this.map.loadingZones[this.loadingZone.x + 1][this.loadingZone.y + 1].push(this) - 1);
			}
		}
		if (yRangeMin < minRange){
			this.listAppearance(this.loadingZone.x, this.loadingZone.y - 1, this.map.loadingZones[this.loadingZone.x][this.loadingZone.y - 1].push(this) - 1);
			if (xRangeMax > maxRange){
				this.listAppearance(this.loadingZone.x + 1, this.loadingZone.y - 1, this.map.loadingZones[this.loadingZone.x + 1][this.loadingZone.y - 1].push(this) - 1);
			}
		}
	}

	drawOnMinimap(x1, x2, y1, y2, scale = 4){
		let centerX = (x1 + x2) / 2;
		let centerY = (y1 + y2) / 2;
		if (this.x > (x1 - centerX) * scale - this.map.xshift() + centerX && this.x < (x2 - centerX) * scale - this.map.xshift() + centerX && this.y > (y1 - centerY) * scale - this.map.yshift() + centerY && this.y < (y2 - centerY) * scale - this.map.yshift() + centerY){
			draw.stone((this.x + this.map.xshift() - centerX) / scale + centerX, (this.y + this.map.yshift() - centerY) / scale + centerY, this.scaledHitbox(1 / scale), this.map);
		}
	}

	increasedHitbox(scale){
		let a = this.hitbox;
		a.x1 *= scale;
		a.x2 *= scale;
		a.y1 *= scale;
		a.y2 *= scale;
		return a;
	}

	scaledHitbox(scale){//returns different hitbox
		let a = {x1: this.hitbox.x1, x2: this.hitbox.x2, y1: this.hitbox.y1, y2: this.hitbox.y2};
		a.x1 *= scale;
		a.x2 *= scale;
		a.y1 *= scale;
		a.y2 *= scale;
		return a;
	}

	remove(){
		for (let a = 0; a < this.appearances.length; a++){
			this.map.loadingZones[this.appearances[a].x][this.appearances[a].y][this.appearances[a].id] = undefined;
		}
		this.deathPlaceholder1();
	}

	deathPlaceholder1(){
		let a = new Box(this.x, this.y, this.increasedHitbox(1.1));
		a.tickPlaceholderMain = function(){
			let a = this.contactAnyway();
			for (let b = 0; b < a.length; b++){
				a[b].fake = false;
			}
			this.remove();
		}
		a.tickMove();
	}

	listAppearance(x, y, id){
		this.appearances.push({x: x, y: y, id: id});
	}
}


class BackgroundImage{
	constructor(x1 = 20, x2 = 50, y1 = 0, y2 = 10, objectScreen = map){
		this.x = (x1 + x2) / 2;
		this.y = (y1 + y2) / 2;
		this.map = objectScreen;
		this.loadingZone = {x: Math.floor(this.x / this.map.size), y: Math.floor(this.y / this.map.size)};
		this.id = objectScreen.bgObjectZones[this.loadingZone.x][this.loadingZone.y].push(this) - 1;
		this.hitbox = {x1: x1 - this.x, x2: x2 - this.x, y1: y1 - this.y, y2: y2 - this.y, additional: []};
	}

	draw(){
		draw.dark(this);
	}

	remove(){
		this.map.bgObjectZones[this.loadingZone.x][this.loadingZone.y][this.id] = undefined;
		this.deathPlaceholder1();
	}

	deathPlaceholder1(){}
}


class Map{//size - это размер 1 экрана, width и height - размеры поля в экранах
	constructor(size, width, height, api){
		this.api = api;
		this.pause = false;
		this.framerate = 20;
		this.size = size;
		this.fieldWidth = width;
		this.fieldHeight = height;
		this.renderCenterpoint = {xshift: 0, yshift: 0};
		this.individualObjects = [];//used for server-client data exchange
		this.individualObjectCounter = 1;
		this.entityList = [];
		this.entityListActive = [];
		this.boxList = [];
		this.boxListActive = [];
		this.loadingZones = [];
		this.particles = [];
		this.particleListActive = [];
		this.loadedZone = {x: 0, y: 0};
		this.mapMarkers = [];
		for (let column = -1; column < height + 2; column++) {
			this.loadingZones[column] = [];
			for (let row = -1; row < width + 2; row++) {
				this.loadingZones[column][row] = [];
			}
		}
		this.entityZones = [];
		for (let column = -1; column < height + 2; column++) {
			this.entityZones[column] = [];
			for (let row = -1; row < width + 2; row++) {
				this.entityZones[column][row] = [];
			}
		}
		this.bgObjectZones = [];
		for (let column = -1; column < height + 2; column++) {
			this.bgObjectZones[column] = [];
			for (let row = -1; row < width + 2; row++) {
				this.bgObjectZones[column][row] = [];
			}
		}
	}
	
	drawEverything(ent){
		draw.backgroundDrg(this);
		this.renderCenterpoint = ent;
		let zonesToLoad = [
			{x: -1, y: -1}, {x: 0, y: -1}, {x: 1, y: -1}, {x: -1, y: 0}, {x: 0, y: 0}, {x: 1, y: 0}, {x: -1, y: 1}, {x: 0, y: 1}, {x: 1, y: 1}
		];
		for (let b = 0; b < zonesToLoad.length; b++){
			for (let a = 0; a < this.bgObjectZones[ent.loadingZone.x + zonesToLoad[b].x][ent.loadingZone.y + zonesToLoad[b].y].length; a++){
				let loadZone = this.bgObjectZones[ent.loadingZone.x + zonesToLoad[b].x][ent.loadingZone.y + zonesToLoad[b].y][a];
				if (loadZone === undefined){continue}
				loadZone.draw();
			}
		}
		for (let a = 0; a < this.entityListActive.length; a++){
			this.entityList[this.entityListActive[a]].draw();
			for (let b = 0; b < this.entityList[this.entityListActive[a]].inventory.mainhand.length; b++){
				this.entityList[this.entityListActive[a]].inventory.mainhand[b].handSprite(this.entityList[this.entityListActive[a]]);
			}
		}
		for (let b = 0; b < zonesToLoad.length; b++){
			for (let a = 0; a < this.loadingZones[ent.loadingZone.x + zonesToLoad[b].x][ent.loadingZone.y + zonesToLoad[b].y].length; a++){
				let loadZone = this.loadingZones[ent.loadingZone.x + zonesToLoad[b].x][ent.loadingZone.y + zonesToLoad[b].y][a];
				if (loadZone === undefined){continue}
				loadZone.draw();
			}
		}
		for (let a = 0; a < this.particleListActive.length; a++){
			this.particles[this.particleListActive[a]].draw();
		}
		for (let a = 0; a < this.boxListActive.length; a++){
			this.boxList[this.boxListActive[a]].draw();
		}
		for (let a = 0; a < ent.personalInterfaces.length; a++){
			if (ent.personalInterfaces[a] === undefined){continue}
			ent.personalInterfaces[a].draw();
		}
	}
	
	tick(ent){
		if (this.pause){return}
		this.drawEverything(ent);
		for (let a = 0; a < this.boxListActive.length; a++){
			this.boxList[this.boxListActive[a]].tickMove();
		}
		for (let a = 0; a < this.entityListActive.length; a++){
			this.entityList[this.entityListActive[a]].tickMove();
		}
		for (let a = 0; a < this.particleListActive.length; a++){
			this.particles[this.particleListActive[a]].tickMove();
		}
	}

	reloadBoxList(){
		let boxList = [];
		for (let a in this.boxList){
			if (this.boxList[a] === undefined){continue};
			this.boxList[a].id = boxList.push(this.boxList[a]) - 1;
		}
		this.boxList = boxList;
		this.reloadBoxActiveList();
	}

	reloadEntityList(){
		let entityList = [];
		for (let a in this.entityList){
			if (this.entityList[a] === undefined){continue};
			this.entityList[a].id = entityList.push(this.entityList[a]) - 1;
		}
		this.entityList = entityList;
		this.reloadEntityActiveList();
	}

	reloadParticleList(){
		let particleList = [];
		for (let a in this.particleList){
			if (this.particleList[a] === undefined){continue};
			this.particleList[a].id = particleList.push(this.particleList[a]) - 1;
		}
		this.particleList = particleList;
		this.reloadParticleActiveList();
	}

	reloadEntityActiveList(){
		this.entityListActive = [];
		for (let a = 0; a < this.entityList.length; a++){
			if (this.entityList[a] === undefined){
				continue;
			}
			this.entityListActive.push(a);
		}
	}

	reloadBoxActiveList(){
		this.boxListActive = [];
		for (let a = 0; a < this.boxList.length; a++){
			if (this.boxList[a] === undefined){
				continue;
			}
			this.boxListActive.push(a);
		}
	}

	reloadParticleActiveList(){
		this.particleListActive = [];
		for (let a = 0; a < this.particles.length; a++){
			if (this.particles[a] === undefined){
				continue;
			}
			this.particleListActive.push(a);
		}
	}

	manageCursor(x, y){
		for (let a = 0; a < immediateApi.getPlayer().personalInterfaces.length; a++){
			if (immediateApi.getPlayer().personalInterfaces[a] === undefined){continue}
			immediateApi.getPlayer().personalInterfaces[a].moveCursor(x, y);
		}
	}

	manageClick(){
		for (let a = 0; a < immediateApi.getPlayer().personalInterfaces.length; a++){
			if (immediateApi.getPlayer().personalInterfaces[a] === undefined){continue}
			immediateApi.getPlayer().personalInterfaces[a].click();
		}
	}

	xshift(){
		//return -this.loadedZone.x * this.size; //camera switches between screens
		//return -immediateApi.getPlayer().x + this.size / 2; //camera attached to the immediateApi.getPlayer()
		return this.renderCenterpoint.xshift;
	}

	yshift(){
		//return -this.loadedZone.y * this.size;
		//return -immediateApi.getPlayer().y + this.size / 2;
		return this.renderCenterpoint.yshift;
	}

	reloadEnemies(){
		for (let a = 0; a < this.entityListActive.length; a++){
			if (this.entityList[this.entityListActive[a]] === undefined || this.entityList[this.entityListActive[a]].shadowRealmSibasAttempt === undefined){continue}
			this.entityList[this.entityListActive[a]].shadowRealmSibasAttempt();
		}
		for (let a = 0; a < this.shadowRealm.entityListActive.length; a++){
			if (this.shadowRealm.entityList[this.shadowRealm.entityListActive[a]] === undefined){continue}
			this.shadowRealm.entityList[this.shadowRealm.entityListActive[a]].shadowRealmReturnAttempt();
		}
	}

	checkCounter(){
		if (this.individualObjects[this.individualObjectCounter] !== undefined){
			this.individualObjectCounter++;
			this.checkCounter();
		}
	}

	assignIndividualId(obj){
		this.checkCounter();
		obj.individualId = this.individualObjectCounter;
		this.individualObjects[this.individualObjectCounter] = obj;
		this.individualObjectCounter++;
	}

	reassignIndividualId(obj, id){
		if (this.individualObjects[id] === undefined){
			this.individualObjects[id] = obj;
			obj.individualId = [id];
			return;
		}
		this.individualObjects[obj.individualId] = this.individualObjects[id];
		this.individualObjects[obj.individualId].individualId = obj.individualId;
		obj.individualId = id;
		this.individualObjects[id] = obj;
	}

	removeIndividualId(obj){
		if (obj.individualId === undefined){return}
		this.individualObjects[obj.individualId] = undefined;
		obj.individualId = -obj.individualId;
	}
}


class ShadowRealm extends Map{
    constructor(upper){
        super(upper.size, upper.fieldWidth, upper.fieldHeight);
        this.backLink = upper;
        upper.shadowRealm = this;
    }

    tick(){}
}


class Interface{
	constructor(x1 = 100, x2 = 500, y1 = 200, y2 = 400){
		this.cursor = {x: 0, y: 0};
		this.elements = [];
		this.createBackground(x1, x2, y1, y2);
		this.focus = this.elements[0];
		this.moveCursor(x1 + 1, y1 + 1);
	}
	
	draw(){
		for (let a in this.elements){
			this.elements[a].draw();
		}
	}

	shiftAll(x, y){
		for (let a in this.elements){
			this.elements[a].hitbox.x1 += x;
			this.elements[a].hitbox.x2 += x;
			this.elements[a].hitbox.y1 += y;
			this.elements[a].hitbox.y2 += y;
		}
	}

	moveCursor(x, y){
		this.cursor.x = x;
		this.cursor.y = y;
		let condition = true;
		for (let a in this.elements){
			let elem = this.elements[a].hitbox;
			if (this.cursor.x > elem.x1 && this.cursor.x < elem.x2 && this.cursor.y > elem.y1 && this.cursor.y < elem.y2){
				this.focus.active = false;
				this.focus = this.elements[a];
				this.focus.active = true;
				condition = false;
			}
			if (condition){
				this.focus.active = false;
				this.focus = this.elements[0];
				this.focus.active = true;
			}
		}
	}

	click(){
		this.focus.functionality();
		this.focus.functionality2();
		this.focus.functionality3();
	}

	createBackground(x1, x2, y1, y2){
		let a = new InterfaceElement(this, x1, x2, y1, y2);
		a.drawActive = function(){
			draw.placeholderInterfaceBackground(this);
		}
		a.drawUnactive = a.drawActive;
	}
}
class InterfaceElement{
	constructor(parentInterface, x1, x2, y1, y2){
		parentInterface.elements.push(this);
		this.parentInterface = parentInterface;
		this.hitbox = {x1: x1, x2: x2, y1: y1, y2: y2};
		this.active = false;
	}

	draw(){
		if (this.active){
			this.drawActive();
		} else {
			this.drawUnactive();
		}
	}

	drawActive(){}

	drawUnactive(){}

	functionality(){
		//console.log("click");
	}
	functionality2(){}
	functionality3(){}
}


class InteractivityHitbox extends Box{
	constructor(owner = immediateApi.getPlayer()){
		super(0, 0, owner.scaledHitbox(2));
		this.owner = owner;
		this.bind(owner);
		this.tickMove();
	}

	tickPlaceholder1(){
		let cont = this.contactAnyway();
		for (let a in cont){
			if (cont[a].interactive){
				cont[a].interact(this.owner);
			}
		}
		this.remove();
	}
}


class DevKit{
	constructor(){}

	spawn(){
		let x = new Primary;
		x.statMultipliers = [0.5, 0, 2, 0, 10, 0, 0, 1, 0];
		immediateApi.getPlayer().give(x);
		x.advancedWeaponType = "scope";
		immediateApi.getPlayer().give(new Primary);
		immediateApi.getPlayer().give(new WeaponHandle);
		new WeaponEditor(immediateApi.getPlayer().x + 100, immediateApi.getPlayer().y);
		immediateApi.getPlayer().give(new Resource(3000, "flame", "flame"));
		immediateApi.getPlayer().give(new Resource(3000, "shell", "shell"));
		immediateApi.getPlayer().give(new Resource(3000, "bullet", "rifleBullet"));
		devKit.swarm();
	}

	cheat(){
		immediateApi.getPlayer().inventory.hotbar[2] = new Weapon(1, 300, function(ent){
			if (ent.ammunitionGetter("shell") > 0){
				for (let b = 0; b < 5; b++){
					let spread = spreadCounter(ent.mousePosition.x - ent.x - map.xshift(), ent.mousePosition.y - ent.y - map.yshift(), this.spread);
					let a = projections(spread.x, spread.y, ent.map.size * (ent.map.fieldWidth + ent.map.fieldHeight));
					new Bullet(ent, this.gunDamage, {x: ent.x + a.x, y: ent.y + a.y});
					ent.ammunitionDecreaser("shell", 1);
				}
			}
		}, 15);
		immediateApi.getPlayer().inventory.hotbar[0] = new Weapon(0.1, 400, function(ent){
			new Missile(ent, this.gunDamage, immediateApi.getPlayer().target);
		});
		immediateApi.getPlayer().inventory.mainhand[0] = immediateApi.getPlayer().inventory.hotbar[0];
		immediateApi.getPlayer().inventory.hotbar[1] = new Flamethrower(0.25, 600, undefined, 0);
	}

	god(){
		immediateApi.getPlayer().speed = 10;
		immediateApi.getPlayer().increasedHitbox(-3);
		immediateApi.getPlayer().removeProjection();
	}

	targetDummy(){
		let dummy = new Entity(immediateApi.getPlayer().x, immediateApi.getPlayer().y, 1000000, 0, {x1: -10, x2: 10, y1: -10, y2: 10}, immediateApi.getPlayer().map, -1000);
		dummy.isActive = false;
		dummy.damagePlaceholder = function(){
			if (!this.isActive){
				this.isActive = true;
				console.log("start");
				setTimeout((ent) => {
					console.log((ent.maxHp - ent.hp) / 20 + "");
					ent.heal(1000000);
					ent.isActive = false;
				}, 20000, this);
			}
		}	
	}

	swarm(){
		for (let d = 0; d < 50; d++){
			new Grunt();
		}
		for (let b = 0; b < 20; b++){
			new Swarmer();
		}9
		for (let c = 0; c < 2; c++){
			new Praetorian();
		}
		map.reloadEnemies();
	}

	worldBorder(){
		for (let a = 0; a < map.fieldWidth; a++){
			new ObjectHitbox(a * map.size, (a + 1) * map.size, -30, 0);
			new ObjectHitbox(a * map.size, (a + 1) * map.size, map.size * map.fieldHeight, map.size * map.fieldHeight + 30);
		}
		for (let a = 0; a < map.fieldHeight; a++){
			new ObjectHitbox(-30, 0, a * map.size, (a + 1) * map.size);
			new ObjectHitbox(map.size * map.fieldWidth, map.size * map.fieldWidth + 30, a * map.size, (a + 1) * map.size);
		}
	}
}


/*module.exports.Box = Box;
module.exports.Tool = Tool;
module.exports.PlaceholderItem = PlaceholderItem;
module.exports.Resource = Resource;
module.exports.Particle = Particle;
module.exports.StatusEffect = StatusEffect;
module.exports.Entity = Entity;
module.exports.ObjectHitbox = ObjectHitbox;
module.exports.BackgroundImage = BackgroundImage;
module.exports.Map = Map;
module.exports.ShadowRealm = ShadowRealm;
module.exports.Interface = Interface;
module.exports.InterfaceElement = InterfaceElement;
module.exports.InteractivityHitbox = InteractivityHitbox;
module.exports.DevKit = DevKit;*/
//export {Box, Tool, PlaceholderItem, Resource, Particle, StatusEffect, Entity, ObjectHitbox, BackgroundImage, Map, ShadowRealm, Interface, InterfaceElement, InteractivityHitbox, DevKit};
/*let Formulasjs = require("./Formulas.js");
let Classesjs = require("./Classes.js");
let projections = Formulasjs.projections;
let defenceCount = Formulasjs.defenceCount;
let spreadCounter = Formulasjs.spreadCounter;
let turn = Formulasjs.turn;
let euclidianDistance = Formulasjs.euclidianDistance;
let Box = Classesjs.Box;
let Tool = Classesjs.Tool;
let PlaceholderItem = Classesjs.PlaceholderItem;
let Resource = Classesjs.Resource;
let Particle = Classesjs.Particle;
let StatusEffect = Classesjs.StatusEffect;
let Entity = Classesjs.Entity;
let ObjectHitbox = Classesjs.ObjectHitbox;
let BackgroundImage = Classesjs.BackgroundImage;
let Map = Classesjs.Map;
let ShadowRealm = Classesjs.ShadowRealm;
let Interface = Classesjs.Interface;
let InterfaceElement = Classesjs.InterfaceElement;
let InteractivityHitbox = Classesjs.InteractivityHitbox;
let DevKit = Classesjs.DevKit;
*/


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
		this.previousReceivedState = this.hp;
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
		console.log("game over")
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

	getSaveData(){
		if (this.isTechnical){return ""}
		let parameters = [this.individualId, this.x, this.y, this.life, this.hp, this.maxHp, this.defence, this.constructor.name, this.moveVectoring.x, this.moveVectoring.y];
		return(parameters.join(" "));
	}

	setSaveData(parameters){
		if ((this.map.individualObjects[parseFloat(parameters[0])] !== immediateApi.getPlayer()) || immediateApi.constructor.name === "Server"){
			//console.log("player data edited" + parameters[1]);
			let parameterNames = ["individualId", "x", "y", "life", "hp", "maxHp", "defence"];
			let numberParams = parameters.map(Number);
			for (let a = 1; a < parameterNames.length - 1; a++){
				if (typeof numberParams[a] !== 'number'){continue}
				this[parameterNames[a]] = numberParams[a];
				if (this[parameterNames[a]] !== numberParams[a]){
					console.error("server asyncronization: " + parameterNames[a]);
				}
			}
			this.moveVectoring.x = numberParams[8];
			this.moveVectoring.y = numberParams[9];
			return
		}/* else {
			let a = this.previousReceivedState - parseFloat(parameters[4])
			if (a > 0){
				this.damageGeneric(a);
			}
			this.previousReceivedState = parseFloat(parameters[4]);//only hp can be modified by the server

		}*/
		//console.log("wrong player: this is player № " + this.individualId + " and the player in the data is № " + parameters[0]);
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
			draw.HUDBasic(owner);
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


/*module.exports.Player = Player;
module.exports.Inventory = Inventory;
module.exports.HUD = HUD;
module.exports.ItemSlot = ItemSlot;
module.exports.ItemSlotHotbar = ItemSlotHotbar;
module.exports.Minimap = Minimap;
module.exports.MapMarker = MapMarker;*/
//export {Player, Inventory, HUD, ItemSlot, ItemSlotHotbar, Minimap, MapMarker};
/*let Formulasjs = require("./Formulas.js");
let Classesjs = require("./Classes.js");
let projections = Formulasjs.projections;
let defenceCount = Formulasjs.defenceCount;
let spreadCounter = Formulasjs.spreadCounter;
let turn = Formulasjs.turn;
let euclidianDistance = Formulasjs.euclidianDistance;
let Box = Classesjs.Box;
let Tool = Classesjs.Tool;
let PlaceholderItem = Classesjs.PlaceholderItem;
let Resource = Classesjs.Resource;
let Particle = Classesjs.Particle;
let StatusEffect = Classesjs.StatusEffect;
let Entity = Classesjs.Entity;
let ObjectHitbox = Classesjs.ObjectHitbox;
let BackgroundImage = Classesjs.BackgroundImage;
let Map = Classesjs.Map;
let ShadowRealm = Classesjs.ShadowRealm;
let Interface = Classesjs.Interface;
let InterfaceElement = Classesjs.InterfaceElement;
let InteractivityHitbox = Classesjs.InteractivityHitbox;
let DevKit = Classesjs.DevKit;
*/


class Glyphid extends Entity{
    constructor(size, hp, damage, defence, x = 0, y = 0){
        super(x, y, hp, defence, {x1: -1 * size, x2: size, y1: -1 * size, y2: size, additional: []}, map);
        /*while (true){
            this.x = Math.floor(Math.random() * map.size * map.fieldHeight);
            this.y = Math.floor(Math.random() * map.size * map.fieldHeight);
            this.reloadEntityZone();
            if (this.overlapAnyway() && euclidianDistance(this.x, this.y, immediateApi.getPlayer().x, immediateApi.getPlayer().y) > immediateApi.getPlayer().map.size * 2 && euclidianDistance(this.x, this.y, immediateApi.getPlayer().x, immediateApi.getPlayer().y) < immediateApi.getPlayer().map.size * 4){
                break;
            }
        }*/
        this.box = new MeleeAttackHitbox(this, this.scaledHitbox(2), {type: "enemy", amount: damage, iFrame: 3000}, 400, 600);
        this.speed = 1;
		this.mainAggro = this.pickAggro();
        this.aggro = this.mainAggro;
		this.posCheck = {x: this.x, y: this.y, time: 100};
        this.enemyDamageMultiplier = 0;
		this.glyphid = true;
        this.isPraetorian = false;
    }

    tickPlaceholder1(){
        this.moveToGoal(this.aggro.x, this.aggro.y, this.speed);
        this.side = (this.aggro.x - this.x) / Math.abs(this.aggro.x - this.x) + 0.00001;
    }

	pickAggro(){
		let minimumDist = 1000000;
		let minimum = 0;
		for (let a = 0; a < map.api.players.length; a++){
			if (minimumDist > euclidianDistance(this.x, this.y, map.api.players[a].x, map.api.players[a].y)){
				minimumDist = euclidianDistance(this.x, this.y, map.api.players[a].x, map.api.players[a].y);
				minimum = a;
			}
		}
		return this.map.api.players[minimum];
	}

	minimalDistanceToPlayer(){
		let minimumDist = 1000000;
		for (let a = 0; a < map.api.players.length; a++){
			if (minimumDist > euclidianDistance(this.x, this.y, map.api.players[a].x, map.api.players[a].y)){
				minimumDist = euclidianDistance(this.x, this.y, map.api.players[a].x, map.api.players[a].y);
			}
		}
		return minimumDist;
	}

	repickAggro(){
		let dist = euclidianDistance(this.x, this.y, this.mainAggro, this.mainAggro);
		for (let a = 0; a < map.api.players.length; a++){
			if (dist > euclidianDistance(this.x, this.y, map.api.players[a].x, map.api.players[a].y) * 5){
				this.mainAggro = this.pickAggro();
				return;
			}
		}
	}

	tickPlaceholder2(){
		this.posCheck.time--;
		if (this.posCheck.time === 0){
			this.repickAggro();
			this.planRoute();
			this.posCheck.time = 50;
			this.posCheck.x = this.x;
			this.posCheck.y = this.y;
		}
		if (euclidianDistance(this.x, this.y, this.aggro.x, this.aggro.y) < 10){
			if (this.aggro.distance === 0){
				this.aggro = this.mainAggro;
				this.onRoute = 0;
				return;
			}
			if (this.onRoute > 0){
				this.onRoute--;
				return;
			} else {
				this.onRoute = 5;
				this.posCheck.y = 0;
				this.posCheck.x = 0;
			}
			if (this.aggro.connections !== undefined){
				for (let a in this.aggro.connections){
					if (this.aggro.connections[a].distance < this.aggro.distance){
						this.aggro = this.aggro.connections[a];
						break;
					}
				}
			}
		}
	}

    deathPlaceholder1(){
        map.api.getPlayer().killCount++;
		this.deathPlaceholder2();
    }

    deathPlaceholder2(){}

    damagePlaceholder(dmg, type){
		this.logEvent(type + " " + dmg);
        for (let a = 0; a < dmg; a++){
            new BloodParticle(this);
        }
    }

	planRoute(){
		if (euclidianDistance(this.x, this.y, this.posCheck.x, this.posCheck.y) < this.speed * 20 && euclidianDistance(this.x, this.y, this.aggro.x, this.aggro.y) >= 40){
			this.aggro = baseBackend.locateClosest(this);
		}
	}

    shadowRealmSibasAttempt(){//TODO исправить референс на карту
        if (this.minimalDistanceToPlayer() > immediateApi.getPlayer().map.size * 2){
            this.mapTransfer(this.map.shadowRealm);
        }
    }
    shadowRealmReturnAttempt(){
        if (this.minimalDistanceToPlayer() <= immediateApi.getPlayer().map.size * 2){
            this.mapTransfer(this.map.backLink);
        }
    }

	getSaveData(){
		if (this.isTechnical){return ""}
		let parameters = [this.individualId, this.x, this.y, this.life, this.hp, this.maxHp, this.defence, this.constructor.name];//this.aggro
		let saved = parameters.join(" ");
		if (this.aggro.constructor.name === "PathfindingPoint"){
			saved += " " + this.aggro.pointsId;
		} else {
			saved += " " + -this.aggro.individualId;
		}
		return saved;
	}

	setSaveData(parameters){
		let parameterNames = ["individualId", "x", "y", "life", "hp", "maxHp", "defence"];
		let numberParams = parameters.map(Number);
		for (let a = 1; a < parameterNames.length - 1; a++){
			if (typeof numberParams[a] !== 'number'){continue}
			this[parameterNames[a]] = numberParams[a];
			if (this[parameterNames[a]] !== numberParams[a]){
				console.error("server asyncronization: " + parameterNames[a]);
			}
		}
		if (numberParams[8] < 0){
			this.aggro = map.individualObjects[-numberParams[8]];
			return;
		}
		this.aggro = baseBackend.wayPoints[numberParams[8]];
	}

	logEvent(ev){
		immediateApi.eventLog += this.individualId + " " + ev + ";";
	}

	forceEvents(data){//primarily damage
		console.log(data);
		let parameters = data.split(" ");
		if (parameters[1] === ""){return}
		this[parameters[1]](parameters[2]);
	}
}
		   

class MeleeAttackHitbox extends Box{
    constructor(entity, hitbox, damage, speed, reloadSpeed){
        super(0, 0, hitbox, damage, -1000, entity.map);
        this.bind(entity);
        this.speed = speed;
        this.reloadSpeed = reloadSpeed;
        this.isAttacking = false;
    }

    tickPlaceholderMain(){
		let t = false;
		for (let a = 0; a < this.map.api.players; a++){
			if (this.touchSpecific(this.map.api.players[a])){
				t = true;
				break;
			}
		}
        if (t && !this.isAttacking){
            this.isAttacking = true;
            setTimeout(this.attack, this.speed, this);
            setTimeout(this.reload, this.speed + this.reloadSpeed, this);
        }
        let list = this.touch();
        for (let a = 0; a < list.length; a++){
		    let unTouched = true;
			if (list[a] === this.coordinates || list[a].isTechnical){
    		    unTouched = false;
            }
		    if (unTouched){
                this.coordinates.moveToGoal(list[a].x, list[a].y, -0.4);
		    }
		}
    }

    attack(obj){
        if (obj.coordinates.hp > 0){
            new Box(obj.coordinates.x, obj.coordinates.y, obj.hitbox, obj.damage, 2, obj.map);
            for (let a = 0; a < 4; a++){
                new BloodParticle(obj.coordinates);
            }
        }
    }

    reload(obj){
        obj.isAttacking = false;
    }
}


class Grunt extends Glyphid{
    constructor(x = 0, y = 0){
        super(10, 10, 5, 20, x, y);
    }

    draw(){
        draw.grunt(this);
    }
}


class Swarmer extends Glyphid{
    constructor(){
        super(6, 3, 1, 0);
    }

    draw(){
        draw.swarmer(this);
    }
}


class Praetorian extends Glyphid{
    constructor(){
        super(20, 30, 3, 100);
        this.isPraetorian = true;
        this.box.tickPlaceholderMain = function(){
			let t = false;
			for (let a = 0; a < this.map.api.players; a++){
				if (this.touchSpecific(this.map.api.players[a])){
					t = true;
					break;
				}
			}
            if (t && !this.isAttacking){
                this.isAttacking = true;
                setTimeout(this.attack, this.speed, this);
            }
            let list = this.touch();
            for(let a = 0; a < list.length; a++){
                let unTouched = true;
                if (list[a] === this.coordinates){
                    unTouched = false;
                }
                if (unTouched && list[a].isPraetorian){
                    this.coordinates.moveToGoal(list[a].x, list[a].y, -1);
                }
            }
        }
    }

    draw(){
        draw.praetorian(this);
    }
}


class Bullet extends Entity{
    constructor(gunner, damage, goal, hitboxMultiplier = 1){
        super(gunner.x, gunner.y + magicConstant1, -1000, 1000000, {x1: -5, x2: 5, y1: -5, y2: 5}, gunner.map);
        this.box = new Box(undefined, undefined, this.scaledHitbox(hitboxMultiplier), damage);
        this.speed = 30;
        this.damage = damage;//doesn't affect real damage number
        this.goal = goal;
        this.box.bind(this);
        this.box.damagePlaceholderFunction = function(damaged){
			for (let a = 0; a < this.map.api.players; a++){
				if (damaged == this.map.api.players[a]){
					return;
				}
			}
			this.coordinates.kill();
		};
        this.box.touchedEntities.push(gunner);
        this.removeProjection();
    }

    draw(){
        draw.bullet(this);
    }

    tickPlaceholder1(){
        this.moveToGoal(this.goal.x, this.goal.y, this.speed / 2);
        this.box.tickMove();
        this.moveToGoal(this.goal.x, this.goal.y, this.speed / 2);
    }

    contact(){
        this.kill();
    }
}


class Weapon extends Tool{
    constructor(dmg, bpm, functionality = function(ent){
        if (ent.ammunitionGetter("shell") > 0){
            let spread = spreadCounter(ent.mousePosition.x - ent.x - ent.map.xshift(), ent.mousePosition.y - ent.y - ent.map.yshift(), this.spread);
            let a = projections(spread.x, spread.y, ent.map.size * (ent.map.fieldWidth + ent.map.fieldHeight));
            new Bullet(ent, this.gunDamage, {x: ent.x + a.x, y: ent.y + a.y});
            ent.ammunitionDecreaser("shell", 1);
        }
    }, spread = 20){
        super(functionality);
        this.isStackable = false;
        this.gunDamage = {type: "playerGeneric", amount: dmg, iFrame: 3000};
        this.spread = spread;
        this.maxCooldown = 60000/bpm;
    }
}


class Flame extends Bullet{
    constructor(gunner, damage, goal){
        super(gunner, {type: "fire", amount: damage, iFrame: 10}, goal);
        this.speed = 10;
        this.life = 75;
        this.hitbox = {x1: -5, x2: 5, y1: -5, y2: 5, additional: []};
        this.fireStage = 0;
        this.box.damagePlaceholderFunction = function(damaged){
            //if (damaged != this.map.api.getPlayer()){
            //    this.coordinates.kill();
            //}
            if (!damaged.activeEffects[0]){
                let c = new StatusEffect(damaged, undefined, undefined, {type: "fire", amount: damage * 3, iFrame: 20}, 0);
                c.particleAdder();
            }
        }
    }

    draw(){
        draw.flame(this);
    }

    tickPlaceholder1(){
        this.moveToGoal(this.goal.x, this.goal.y, this.speed / 2);
        this.fireStage += 0.1;
        if (this.hitbox.x1 > -20){
            this.hitbox.x1 -= 0.5;
            this.hitbox.x2 += 0.5;
            this.hitbox.y1 -= 0.5;
            this.hitbox.y2 += 0.5;
            this.box.hitbox.x1 -= 0.5;
            this.box.hitbox.x2 += 0.5;
            this.box.hitbox.y1 -= 0.5;
            this.box.hitbox.y2 += 0.5;
        }
        this.age();
    }
}   


class Breaker extends Box{
    constructor(x = 5, y = 5, hitbox = {x1: -10, x2: 10, y1: -10, y2: 10}, life = 10){
        super(x, y, hitbox, undefined, life);
    }
    
    tickPlaceholderMain(){
        let b = this.contactAnyway();
        for (let a = 0; a < b.length; a++){
            b[a].remove();
        }
        this.age();
    }
}


class Missile extends Bullet{
    constructor(gunner, damage, goal){
        super(gunner, damage, goal);
        this.speedVectoring = {x: Math.floor(Math.random() * 200 - 100) / 10, y: Math.floor(Math.random() * 200 - 100) / 10};
        this.acceleration = 2;
        this.maxSpeed = 20;
        this.life = 1000;
        this.gunner = gunner;
        this.rocketId = gunner.rockets.push(this) - 1;
        gunner.refreshRocketList();
    }

    tickPlaceholder1(){
        this.age();
        if (this.speedVectoring.x ** 2 + this.speedVectoring.y ** 2 > this.maxSpeed ** 2){
            this.speedVectoring = projections(this.speedVectoring.x, this.speedVectoring.y, this.maxSpeed);
            this.box.tickMove();
            this.speedVectoring = projections(this.speedVectoring.x, this.speedVectoring.y, this.maxSpeed);
        }
        this.move(this.speedVectoring.x, this.speedVectoring.y);
        this.moveToGoal(this.goal.x, this.goal.y, this.maxSpeed / 4);
        let xDistance = this.goal.x - this.x;
        let yDistance = this.goal.y - this.y;
        let accProjections = projections(xDistance, yDistance, this.acceleration);
        this.speedVectoring.x += accProjections.x;
        this.speedVectoring.y += accProjections.y;
    }

    deathPlaceholder1(){
        let a = new Box(this.x, this.y, {x1: -30, x2: 30, y1: -30, y2: 30}, {type: "playerGeneric", amount: this.damage.amount * 100, iFrame: 3000}, 5);
        a.fireStage = 0;
        a.draw = function(){
            draw.fire(this);
        }
        this.gunner.rockets[this.rocketId] = undefined;
        this.gunner.refreshRocketList();
    }
}


class Flamethrower extends Weapon{
    constructor(dmg, bpm){
        super(dmg / 2, bpm, function(ent){
            if (ent.ammunitionGetter("flame") > 0){
                let a = projections((ent.mousePosition.x - ent.x - ent.map.xshift()), (ent.mousePosition.y - ent.y - ent.map.yshift()), ent.map.size * (ent.map.fieldWidth + ent.map.fieldHeight));
                new Flame(ent, this.gunDamage.amount, {x: ent.x + a.x, y: ent.y + a.y});
                ent.ammunitionDecreaser("flame", 1);
            }
        });
        this.sprite.src = "textures/Flamethrower.png";
        this.toolIcon.src = "textures/Fire.png";
    }    
}


class CaveGenerator{
    constructor(x1, y1, x2, y2, size = 20, roomAmount = 4, maP = map){
        this.rooms = [];
        this.roomsWithoutTunnels = [];
        this.roomsWithTunnels = [];
        this.boundary = {x1: x1 * size, x2: x2 * size, y1: y1 * size, y2: y2 * size};
        for (let a = 0; a < x2 - x1; a++){//creates theRock
            for (let b = 0; b < y2 - y1; b++){
                new ObjectHitbox(a * size, (a + 1) * size, b * size, (b + 1) * size, true, undefined, undefined, maP);
            }
        }
        for (let a = 0; a < roomAmount; a++){
            this.roomCreator();
        }
        this.roomsWithTunnels.push(this.roomsWithoutTunnels[0]);
        this.roomsWithoutTunnels.splice(0, 1);
        while (this.roomsWithoutTunnels.length > 0){
            let range = {x1: maP.fieldHeight * maP.size + maP.fieldWidth * maP.size, y1: maP.fieldHeight * maP.size + maP.fieldWidth * maP.size, x2: 0, y2: 0};
            for (let b = 0; b < this.roomsWithTunnels.length; b++){
                for (let c = 0; c < this.roomsWithoutTunnels.length; c++){
                    let distance = euclidianDistance(this.roomsWithTunnels[b].x, this.roomsWithTunnels[b].y, this.roomsWithoutTunnels[c].x, this.roomsWithoutTunnels[c].y);
                    if (euclidianDistance(range.x1, range.y1, range.x2, range.y2) > distance){
                        range = {x1: this.roomsWithTunnels[b].x, y1: this.roomsWithTunnels[b].y, x2: this.roomsWithoutTunnels[c].x, y2: this.roomsWithoutTunnels[c].y, outerId: c};
                    }
                }
            }
            this.tunnelBore(range);
            this.roomsWithTunnels.push(this.roomsWithoutTunnels[range.outerId]);
            this.roomsWithoutTunnels.splice(range.outerId, 1);
        }
        this.map.api.getPlayer().tp(this.rooms[0].x, this.rooms[0].y);
        //let a = new Breaker(this.map.api.getPlayer().x, this.map.api.getPlayer().y, {x1: -80, x2: 80, y1: -80, y2: 80});
        //a.bind(this.map.api.getPlayer());
    }

    roomOverlap(hitbox, x, y){
        for (let a = 0; a < this.rooms.length; a++){
			let x1 = x + hitbox.x1;
			let x2 = x + hitbox.x2;
			let y1 = y + hitbox.y1;
			let y2 = y + hitbox.y2;
			if (this.rooms[a] === undefined){
				continue;
			}
			let objectX1 = this.rooms[a].x + this.rooms[a].box.x1 * 1.2;
			let objectY1 = this.rooms[a].y + this.rooms[a].box.y1 * 1.2;
			let objectX2 = this.rooms[a].x + this.rooms[a].box.x2 * 1.2;
			let objectY2 = this.rooms[a].y + this.rooms[a].box.y2 * 1.2;
			if (x2 > objectX1 && x1 < objectX2 && y2 > objectY1 && y1 < objectY2){
				return false;
			}
        }
        return true;
    }

    roomCreator(obj = this, scaling = 600){//
        for (let s = 0; s < 100; s++){
            let rand1 = Math.random() * scaling ** 2 + 10000;
            let rand2 = Math.random() * scaling ** 2 + 10000;
            let xSize = Math.floor(Math.sqrt(Math.abs(rand1)));
            let ySize = Math.floor(Math.sqrt(Math.abs(rand2)));
            let x = obj.boundary.x1 + xSize / 2 + Math.floor(Math.random() * (obj.boundary.x2 - obj.boundary.x1 - xSize));
            let y = obj.boundary.y1 + ySize / 2 + Math.floor(Math.random() * (obj.boundary.y2 - obj.boundary.y1 - ySize));
            let hitbox = {x1: -xSize / 2, y1: -ySize / 2, x2: xSize / 2, y2: ySize / 2};
            if (obj.roomOverlap(hitbox, x, y)){
                let zonesToLoad = [
                    {x: -1, y: -1}, {x: 0, y: -1}, {x: 1, y: -1}, {x: -1, y: 0}, {x: 0, y: 0}, {x: 1, y: 0}, {x: -1, y: 1}, {x: 0, y: 1}, {x: 1, y: 1}
                ];
                let a = new Breaker(x, y, hitbox, 10);
                for (let b = 0; b < zonesToLoad.length; b++){
                    a.loadingZone.x += zonesToLoad[b].x;
                    a.loadingZone.y += zonesToLoad[b].y;
                    a.tickMove();
                    a.loadingZone.x -= zonesToLoad[b].x;
                    a.loadingZone.y -= zonesToLoad[b].y;
                }
                a.tickMove();
                obj.rooms.push({box: hitbox, x: x, y: y});
                obj.roomsWithoutTunnels.push({box: hitbox, x: x, y: y});
                for (let shift = 0; shift < 5; shift++){
                    let size = Math.floor(Math.sqrt(Math.abs(Math.random() * (xSize / 3) ** 2)));
                    let hitbox2 = {x1: -size / 2, x2: size / 2, y1: -size / 2, y2: size / 2};
                    new Breaker(x + hitbox.x1 + shift * xSize / 5, y + hitbox.y1, hitbox2, 2);
                    size = Math.floor(Math.sqrt(Math.abs(Math.random() * (xSize / 5) ** 2)));
                    hitbox2 = {x1: -size / 2, x2: size / 2, y1: -size / 2, y2: size / 2};
                    new Breaker(x + hitbox.x1 + shift * xSize / 5, y + hitbox.y2, hitbox2, 2);
                    size = Math.floor(Math.sqrt(Math.abs(Math.random() * (xSize / 5) ** 2)));
                    hitbox2 = {x1: -size / 2, x2: size / 2, y1: -size / 2, y2: size / 2};
                    new Breaker(x + hitbox.x1, y + hitbox.y1 + shift * ySize / 5, hitbox2, 2);
                    size = Math.floor(Math.sqrt(Math.abs(Math.random() * (xSize / 5) ** 2)));
                    hitbox2 = {x1: -size / 2, x2: size / 2, y1: -size / 2, y2: size / 2};
                    new Breaker(x + hitbox.x2, y + hitbox.y1 + shift * ySize / 5, hitbox2, 2);
                }
                break;
            } else {
                continue;
            }
        }
    }

    tunnelBore(range, size = 60){
        let d = new Breaker(range.x1, range.y1, {x1: -size/2, x2: size/2, y1: -size/2, y2: size/2}, 100000);
        while (euclidianDistance(d.coordinates.x, d.coordinates.y, range.x2, range.y2) > 20){
            d.moveToGoal(range.x2, range.y2, 15);
            d.tickMove();
        }
        d.remove();
        console.log("room achieved");
    }
}


class WeaponEditor extends ObjectHitbox{
    constructor(x, y){
        super(x - 10, x + 10, y - 10, y + 10);
        this.boundInterface = this;
        this.interactive = true;
        this.active = false;
        this.interact = function(owner){
            if (!owner.activeInterfaces[0]){
                owner.activeInterfaces[0] = true;
                owner.inventoryId = owner.map.activeInterfaces.push(owner.inventory) - 1;
            } else {
                owner.activeInterfaces[0] = false;
                owner.map.activeInterfaces[owner.inventoryId] = undefined;
            }
            if (!this.active && this.map.api.getPlayer().inventory.mainhand[0].modificationInterface != undefined){
                this.active = true;
                owner.inventory.shiftAll(0, 100);
                owner.weaponEditId = owner.map.activeInterfaces.push(this.map.api.getPlayer().inventory.mainhand[0].modificationInterface) - 1;
                this.map.api.getPlayer().speedMultipliers[0] = 0;
            } else if (!this.active){
            } else {
                this.active = false;
                owner.inventory.shiftAll(0, -100);
                owner.map.activeInterfaces[owner.weaponEditId] = undefined;
                this.map.api.getPlayer().speedMultipliers[0] = 1;
            }
        }
    }
}


class BloodParticle extends Particle{
    constructor(ent){
        super(ent.x, ent.y, 50, {x1: -2, x2: 2, y1: -2, y2: 2}, ent.map);
        this.speedVectoring = {x: Math.random() * ent.hitbox.x1 * 0.2 - ent.hitbox.x1 * 0.1, y: Math.random() * ent.hitbox.x1 * 0.2 - ent.hitbox.x1 * 0.1};
        this.accVectoring = {x: this.speedVectoring.x / 50, y: this.speedVectoring.y / 50};
    }

    tickPlaceholderMain(){
        this.move(this.speedVectoring.x, this.speedVectoring.y);
        this.speedVectoring.x -= this.accVectoring.x;
        this.speedVectoring.y -= this.accVectoring.y;
    }

    draw(){
        draw.bloodParticle(this);
    }
}


class EletroParticle extends Particle{
    constructor(block){
        super(block.x, block.y, 20, {x1: -1, x2: 1, y1: -1, y2: 1}, block.map);
        this.speedVectoring = {x: Math.random() * block.hitbox.x1 * 0.4 - block.hitbox.x1 * 0.2, y: Math.random() * block.hitbox.x1 * 0.4 - block.hitbox.x1 * 0.2};
        this.accVectoring = {x: this.speedVectoring.x / 50, y: this.speedVectoring.y / 50};
    }

    tickPlaceholderMain(){
        this.move(this.speedVectoring.x, this.speedVectoring.y);
        this.speedVectoring.x -= this.accVectoring.x;
        this.speedVectoring.y -= this.accVectoring.y;
    }

    draw(){
        draw.electroParticle(this);
    }
}


/*module.exports.Glyphid = Glyphid;
module.exports.MeleeAttackHitbox = MeleeAttackHitbox;
module.exports.Grunt = Grunt;
module.exports.Swarmer = Swarmer;
module.exports.Praetorian = Praetorian;
module.exports.Bullet = Bullet;
module.exports.Weapon = Weapon;
module.exports.Flame = Flame;
module.exports.Breaker = Breaker;
module.exports.Missile = Missile;
module.exports.Flamethrower = Flamethrower;
module.exports.CaveGenerator = CaveGenerator;
module.exports.WeaponEditor = WeaponEditor;
module.exports.BloodParticle = BloodParticle;
module.exports.EletroParticle = EletroParticle;*/
//export {Glyphid, MeleeAttackHitbox, Grunt, Swarmer, Praetorian, Bullet, Weapon, Flame, Breaker, Missile, Flamethrower, CaveGenerator, WeaponEditor, BloodParticle, EletroParticle};
/*let Formulasjs = require("./Formulas.js");
let Classesjs = require("./Classes.js");
let projections = Formulasjs.projections;
let defenceCount = Formulasjs.defenceCount;
let spreadCounter = Formulasjs.spreadCounter;
let turn = Formulasjs.turn;
let euclidianDistance = Formulasjs.euclidianDistance;
let Box = Classesjs.Box;
let Tool = Classesjs.Tool;
let PlaceholderItem = Classesjs.PlaceholderItem;
let Resource = Classesjs.Resource;
let Particle = Classesjs.Particle;
let StatusEffect = Classesjs.StatusEffect;
let Entity = Classesjs.Entity;
let ObjectHitbox = Classesjs.ObjectHitbox;
let BackgroundImage = Classesjs.BackgroundImage;
let Map = Classesjs.Map;
let ShadowRealm = Classesjs.ShadowRealm;
let Interface = Classesjs.Interface;
let InterfaceElement = Classesjs.InterfaceElement;
let InteractivityHitbox = Classesjs.InteractivityHitbox;
let DevKit = Classesjs.DevKit;
*/


class WeaponHandle extends Tool{
    constructor(primaries = 1, melee = 1, consumable = 1){
        super();
        this.modificationInterface = new Interface(100, 500, 25, 275);
        this.modificationInterface.elements[0].draw = function(){
            draw.interface(this);
        }
        this.modificationInterface.click = function(){
            this.focus.functionality(immediateApi.getPlayer());
        }
        this.functionality = function(ent){
            for (let a in this.slots.primaries){
                let b = this.slots.primaries[a].functionality(ent, {type: this.slots.primaries[a].damage.type, amount: this.damageGetter(ent, a), iFrame: this.slots.primaries[a].damage.iFrame}, this.spreadGetter(a), this.sizeGetter(a), this.magazine);
                this.magazine -= b;
                if (!b){
                    this.reload();
                }
            }
        }
        this.slots = {primaries: [], melee: [], consumable: [], upgrades: {scope: new PlaceholderItem, butt: new PlaceholderItem, magazine: new PlaceholderItem, barrel: new PlaceholderItem}}
        for (let a = 0; a < primaries; a++){
            this.slots.primaries[a] = new PlaceholderItem;
        }
        for (let a = 0; a < melee; a++){
            this.slots.melee[a] = new PlaceholderItem;
        }
        for (let a = 0; a < consumable; a++){
            this.slots.consumable[a] = new PlaceholderItem;
        }
        let names = [["primary", "primary", "primary"], ["melee", "melee", "melee"], ["consumable", "consumable", "consumable"], ["scope", "butt", "magazine", "barrel"]];
        let c = 0;
        for (let a in this.slots){
            let d = 0;
            for (let b in this.slots[a]){
                new ItemSlotWeapon(this.modificationInterface, 105 + c * 25, 100 + (c + 1) * 25, 30 + d * 25, 25 + (d + 1) * 25, a, b, names[c][d]);
                d++
            }
            c++
        }
        this.modificationInterface.slots = this.slots;
        this.spread = 0;
        this.magazine = 0;
		this.isStackable = false;
    }

	use(ent){
		if (this.cooldown) {
			setTimeout((tool, enti) => {tool.cooldown = true; if (tool.active){tool.use(enti)}}, this.cooldownGetter(ent, 0), this, ent);
			this.functionality(ent);
            if (this.spread < 1){
                this.spread += this.slots.primaries[0].spreadSpeed * 3;
            }
			this.cooldown = false;
		}
	}

    tickMove(){
        if (this.spread > 0){
            this.spread -= this.slots.primaries[0].spreadSpeed * this.slots.primaries[0].cooldown * immediateApi.getPlayer().map.framerate * 0.002;
        }
    }

    reload(){
        if (!this.isReloading){
            this.isReloading = true;
            this.magazine = 0;
            setTimeout((obj) => {
                obj.magazine = obj.slots.primaries[0].magSize;
                this.isReloading = false;
                console.log("reloaded");
            }, this.slots.primaries[0].reloadTime, this);
        }
    }

    damageGetter(user, primary){
        let damage = this.slots.primaries[primary].damage.amount;
        let dmgAdd = 0;
        for (let a in this.slots.primaries){
            damage *= this.slots.primaries[a].statMultipliers[0];
            dmgAdd += this.slots.primaries[a].statMultipliers[1];
        }
        for (let a in this.slots.upgrades){
            damage *= this.slots.upgrades[a].statMultipliers[0];
            dmgAdd += this.slots.upgrades[a].statMultipliers[1];
        }
        for (let a in user.damageMultipliers){
            damage *= user.damageMultipliers[a];
        }
        damage *= dmgAdd;
        return damage;
    }

    cooldownGetter(user, primary){
        let speed = this.slots.primaries[primary].cooldown;
        let speedAdd = 0;
        for (let a in this.slots.primaries){
            speed *= this.slots.primaries[a].statMultipliers[2];
            speedAdd += this.slots.primaries[a].statMultipliers[3];
        }
        for (let a in this.slots.upgrades){
            speed *= this.slots.upgrades[a].statMultipliers[2];
            speedAdd += this.slots.upgrades[a].statMultipliers[3];
        }
        for (let a in user.weaponSpeedMultipliers){
            speed *= user.weaponSpeedMultipliers[a];
        }
        speed *= speedAdd;
        return 1000 / speed;
    }

    spreadGetter(primary){
        let spread = this.slots.primaries[primary].spread1;
        let spreadAdd = 0;
        let spread2 = this.spread * this.slots.primaries[primary].spread2;
        let spreadAdd2 = 0;
        for (let a in this.slots.primaries){
            spread *= this.slots.primaries[a].statMultipliers[4];
            spreadAdd += this.slots.primaries[a].statMultipliers[5];
            spread2 *= this.slots.primaries[a].statMultipliers[6];
            spreadAdd2 += this.slots.primaries[a].statMultipliers[7];
        }
        for (let a in this.slots.upgrades){
            spread *= this.slots.upgrades[a].statMultipliers[4];
            spreadAdd += this.slots.upgrades[a].statMultipliers[5];
            spread2 *= this.slots.upgrades[a].statMultipliers[6];
            spreadAdd2 += this.slots.upgrades[a].statMultipliers[7];
        }
        spread *= spreadAdd;
        spread2 *= spreadAdd2;
        return spread + spread2;
    }

    sizeGetter(primary){
        let size = 1;
        let sizeAdd = 0;
        for (let a in this.slots.primaries){
            size *= this.slots.primaries[a].statMultipliers[8];
            sizeAdd += this.slots.primaries[a].statMultipliers[9];
        }
        for (let a in this.slots.upgrades){
            size *= this.slots.upgrades[a].statMultipliers[8];
            sizeAdd += this.slots.upgrades[a].statMultipliers[9];
        }
        return size * sizeAdd;
    }
}


class Primary extends Resource{
    constructor(damage = {type: "generic", amount: 3, iFrame: 10}, pelletNum = 1, spread1 = 1, spread2 = 30, spreadSpeed = 0.08, cooldown = 10, magSize = 30, ammoNeeded = "rifleBullet", reloadTime = 2000){
        super();
        this.damage = damage;
        this.advancedWeaponType = "primary";
        this.pelletNum = pelletNum;
        this.cooldown = cooldown;
        this.spread1 = spread1;
        this.spread2 = spread2;
        this.magSize = magSize;
        this.ammoNeeded = ammoNeeded;
        this.spreadSpeed = spreadSpeed;
		this.isStackable = false;
        this.reloadTime = reloadTime;
        this.ammoConsumption = 1;
        this.statMultipliers = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];//x damage, + damage, x cooldown, + cooldown, x spread 1, + spread 1, x spread 2, + spread 2, x hitboxScale, + hitboxScale. 
    }

    functionality(ent, damage, spreaD, hitboxScaling, ammoInMag){
        if (ammoInMag > 0 && ent.ammunitionGetter(this.ammoNeeded) > 0){    
            for (let a = 0; a < this.pelletNum; a++){
                let spread = spreadCounter(ent.mousePosition.x - ent.x - ent.map.xshift(), ent.mousePosition.y - ent.y - ent.map.yshift(), spreaD);
                let b = projections(spread.x, spread.y, ent.map.size * (ent.map.fieldWidth + ent.map.fieldHeight));
                new Bullet(ent, damage, {x: ent.x + b.x, y: ent.y + b.y}, hitboxScaling);
                ent.ammunitionDecreaser(this.ammoNeeded, 1);
                return this.ammoConsumption;
            }
        }
        return 0;
    }
}


class ItemSlotWeapon extends InterfaceElement{
	constructor(parentInterface, x1, x2, y1, y2, id1, id2, condition){
		super(parentInterface, x1, x2, y1, y2);
        this.condition = condition;
		this.slotId1 = id1;
		this.slotId2 = id2;
	}

	bgFunction(){
		draw.placeholderSlot(this);
	}

	draw(){
		this.bgFunction();
		this.slotGetter().draw(this.hitbox.x1, this.hitbox.x2, this.hitbox.y1, this.hitbox.y2);
	}

    functionality(user){
        if (user.inventory.buffer.advancedWeaponType === this.condition || user.inventory.buffer.isPlaceholder){
            let buffer2 = user.inventory.buffer;
            user.inventory.buffer = this.slotGetter();
            this.slotSetter(buffer2);
        }
	}
	
	slotSetter(replacement){
		this.parentInterface.slots[this.slotId1][this.slotId2] = replacement;
	}

	slotGetter(){
		return this.parentInterface.slots[this.slotId1][this.slotId2];
	}
}


/*module.exports.WeaponHandle = WeaponHandle;
module.exports.Primary = Primary;
module.exports.ItemSlotWeapon = ItemSlotWeapon;*/
//export {WeaponHandle, Primary, ItemSlotWeapon};
/*let Formulasjs = require("./Formulas.js");
let Classesjs = require("./Classes.js");
let projections = Formulasjs.projections;
let defenceCount = Formulasjs.defenceCount;
let spreadCounter = Formulasjs.spreadCounter;
let turn = Formulasjs.turn;
let euclidianDistance = Formulasjs.euclidianDistance;
let Box = Classesjs.Box;
let Tool = Classesjs.Tool;
let PlaceholderItem = Classesjs.PlaceholderItem;
let Resource = Classesjs.Resource;
let Particle = Classesjs.Particle;
let StatusEffect = Classesjs.StatusEffect;
let Entity = Classesjs.Entity;
let ObjectHitbox = Classesjs.ObjectHitbox;
let BackgroundImage = Classesjs.BackgroundImage;
let Map = Classesjs.Map;
let ShadowRealm = Classesjs.ShadowRealm;
let Interface = Classesjs.Interface;
let InterfaceElement = Classesjs.InterfaceElement;
let InteractivityHitbox = Classesjs.InteractivityHitbox;
let DevKit = Classesjs.DevKit;
*/


class LevelEditor{
	constructor(owner, size = 20) {
		this.owner = owner;
		this.size = size;
		owner.activeLevelEditor = this;
		this.schematic = [];
		this.inputs = [];
		this.blocks = [
			this.basicBlock, this.wall, this.tunnelHorizontal, this.tunnelVertical, this.intersection, this.blackBg, this.entrace, this.ladder, this.floor, this.vent, this.elevator, this.elevButton, this.ventBlock, this.pathfindingPoint, this.door1, this.door2, this.doorTerminal, this.landingPad, this.cellSelector, this.cellBox, this.wiringConnector, this.wiringBreakpoint, this.wire, this.vaultModule, this.waterPort, this.waterTank, this.reactor, this.rock, this.stone
		];
		this.selector = this.blocks[0];
		this.selectorNum = 0;
		this.buffer = [];
	}

	ctrlz(){
		for (let a in this.buffer){
			this.buffer[a].remove();
		}
		this.buffer = [];
		this.schematic.splice(this.schematic.length - 1, 1);
	}

	eraser(){
		let a = new Breaker(0, 0, {x1: 0, x2: 0, y1: 0, y2: 0}, 20);
		a.coordinates = immediateApi.getPlayer().mouseBox.coordinates;
	}
	
	doSelected(){
		for (let a = 0; a < 6; a++){
			this.inputs.push(1);
		}
		this.selector(this.inputs[0], this.inputs[1], this.inputs[2], this.inputs[3], this.inputs[4], this.inputs[5]);
		this.inputs = [];
	}

	circleSelector(){
		if (this.selectorNum < this.blocks.length - 1){
			this.selectorNum++;
		} else {
			this.selectorNum = 0;
		}
		this.selector = this.blocks[this.selectorNum];
		console.log(this.selector);
	}

	clearInputs(){
		this.inputs = [];
		console.log("cleared inputs");
	}

	logInput(xy){
		this.inputs.push(Math.floor(xy.x / this.size));
		this.inputs.push(Math.floor(xy.y / this.size));
	}

	placeSchematic(schematic){
		let schematic2 = [];
		for (let c in schematic){
			if (schematic[c][schematic[c].length - 1] === 22 || schematic[c][schematic[c].length - 1] === 3 || schematic[c][schematic[c].length - 1] === 2 ||schematic[c][schematic[c].length - 1] === 1 || schematic[c][schematic[c].length - 1] === 7 || schematic[c][schematic[c].length - 1] === 9 || schematic[c][schematic[c].length - 1] === 10 || schematic[c][schematic[c].length - 1] === 11){
				schematic2.push(schematic[c]);
			} else {
				this.selector = this.blocks[schematic[c][schematic[c].length - 1]];
				this.inputs = schematic[c];
				this.doSelected();
			}
		}
		for (let c in schematic2){
			this.selector = this.blocks[schematic2[c][schematic2[c].length - 1]];
			this.inputs = schematic2[c];
			this.doSelected();
		}
		new MainTerminal(2220, 2240, 980, 1020);
		new Cart(900, 3700);
		new VentTerminal(1180, 1260, 840, 920, 3);
		new VentTerminal(2920, 3000, 1420, 1500, 3);
		let a = new ObjectHitbox(2660, 2760, 1400, 1500);
		a.draw = function(){
			draw.oxygenTank(this, baseBackend.supplies.oxygen);
		}
	}
	
	logSchematic(){
		let log = "[";
		for (let a in this.schematic){
			log += "[";
			for (let b in this.schematic[a]){
				log = log + this.schematic[a][b];
				if (b < this.schematic[a].length - 1) {
					log += ", ";
				}
			}
			log += "]";
			if (a < this.schematic.length - 1) {
				log += ", ";
			}
		}
		log += "];";
		console.log(log);
		console.log(this.schematic);
	}

	basicBlock(x, y){
		this.buffer = [];
		let a = new ObjectHitbox(x * this.size, (x + 2) * this.size, y * this.size, (y + 2) * this.size, false, undefined, undefined, this.owner.map);
		a.draw = function(){
			draw.corner(this);
		}
		this.buffer.push(a);
		this.schematic.push([x, y, 0]);
	}

	wall(x1, y1, x2, y2){
		this.buffer = [];
		this.schematic.push([x1, y1, x2, y2, 1]);
		let direction = Math.abs(x2 - x1) > Math.abs(y2 - y1);
		let side = (x2 > x1 && direction) || (y2 > y1 && !direction);
		let a = Math.min(x1, x2);
		x2 = Math.max(x1, x2);
		x1 = a;
		a = Math.min(y1, y2);
		y2 = Math.max(y1, y2);
		y1 = a;
		this.buffer.push(new WallBlock(x1 * this.size, (x2 + 1) * this.size, y1 * this.size, (y2 + 1) * this.size, false, undefined, undefined, this.owner.map, direction, side));
	}

	tunnelHorizontal(x, y, l, w){
		this.buffer = [];
		this.schematic.push([x, y, l, w, 2]);
		let a = Math.min(x, l);
		l = Math.max(x, l);
		x = a;
		a = Math.min(y, w);
		w = Math.max(y, w);
		y = a;
		this.buffer.push(new WallBlock(x * this.size, (l + 1) * this.size, y * this.size, (y + 2) * this.size, false, undefined, undefined, this.owner.map, true, true));
		this.buffer.push(new Floor(x * this.size, (l + 1) * this.size, (y + 2) * this.size, (w - 1) * this.size, this.owner.map));
		this.buffer.push(new WallBlock(x * this.size, (l + 1) * this.size, (w - 1) * this.size, (w + 1) * this.size, false, undefined, undefined, this.owner.map, true, false));
	}

	tunnelVertical(x, y, w, l){
		this.buffer = [];
		this.schematic.push([x, y, w, l, 3]);
		let a = Math.min(x, w);
		w = Math.max(x, w);
		x = a;
		a = Math.min(y, l);
		l = Math.max(y, l);
		y = a;
		this.buffer.push(new WallBlock(x * this.size, (x + 2) * this.size, y * this.size, (l + 1) * this.size, false, undefined, undefined, this.owner.map, false, false));
		this.buffer.push(new Floor((x + 2) * this.size, (w - 1) * this.size, y * this.size, (l + 1) * this.size, this.owner.map));
		this.buffer.push(new WallBlock((w - 1) * this.size, (w + 1) * this.size, y * this.size, (l + 1) * this.size, false, undefined, undefined, this.owner.map, false, true));
	}

	intersection(x1, y1, x2, y2){
		this.buffer = [];
		this.schematic.push([x1, y1, x2, y2, 4]);
		let a = Math.min(x1, x2);
		x2 = Math.max(x1, x2);
		x1 = a;
		a = Math.min(y1, y2);
		y2 = Math.max(y1, y2);
		y1 = a;
		a = new ObjectHitbox(x1 * this.size, (x1 + 2) * this.size, y1 * this.size, (y1 + 2) * this.size, false, undefined, undefined, this.owner.map);
		a.draw = function(){
			draw.corner(this);
		}
		this.buffer.push(a);
		a = new ObjectHitbox((x2 - 1) * this.size, (x2 + 1) * this.size, y1 * this.size, (y1 + 2) * this.size, false, undefined, undefined, this.owner.map);
		a.draw = function(){
			draw.corner(this);
		}
		this.buffer.push(a);
		a = new ObjectHitbox(x1 * this.size, (x1 + 2) * this.size, (y2 - 1) * this.size, (y2 + 1) * this.size, false, undefined, undefined, this.owner.map);
		a.draw = function(){
			draw.corner(this);
		}
		this.buffer.push(a);
		a = new ObjectHitbox((x2 - 1) * this.size, (x2 + 1) * this.size, (y2 - 1) * this.size, (y2 + 1) * this.size, false, undefined, undefined, this.owner.map);
		a.draw = function(){
			draw.corner(this);
		}
		this.buffer.push(a);
		this.buffer.push(new Floor(x1 * this.size, (x2 + 1) * this.size, y1 * this.size, (y2 + 1) * this.size, this.owner.map));
	}

	blackBg(x, y){
		this.buffer = [];
		this.schematic.push([x, y, 5]);
		x *= this.size;
		y *= this.size;
		x = Math.floor(x / this.owner.map.size);
		y = Math.floor(y / this.owner.map.size);
		this.buffer.push(new BackgroundImage(x * this.owner.map.size, (x + 1) * this.owner.map.size, y * this.owner.map.size, (y + 1) * this.owner.map.size, this.owner.map));
	}

	entrace(x1, y1, x2, y2){
		this.buffer = [];
		this.schematic.push([x1, y1, x2, y2, 6]);
		let a = new ObjectHitbox(x1 * this.size, (x1 + 2) * this.size, y1 * this.size, (y1 + 2) * this.size, false, undefined, undefined, this.owner.map);
		a.draw = function(){
			draw.corner(this);
		}
		this.buffer.push(a);
		a = new ObjectHitbox(x2 * this.size, (x2 + 2) * this.size, y2 * this.size, (y2 + 2) * this.size, false, undefined, undefined, this.owner.map);
		a.draw = function(){
			draw.corner(this);
		}
		this.buffer.push(a);
	}

	ladder(x, y, side){
		this.buffer = [];
		this.schematic.push([x, y, side, 7]);
		let a = 0;
		if (side > x){
			a = 1;
		} else {
			a = -1;
		}
		this.buffer.push(new Ladder(x * this.size, (x + 2) * this.size, y * this.size, (y + 2) * this.size, this.owner.map, a, undefined, {x: -60 * a, y: 0}));
	}

	floor(x1, y1, x2, y2){
		this.buffer = [];
		this.schematic.push([x1, y1, x2, y2, 8]);
		let a = Math.min(x1, x2);
		x2 = Math.max(x1, x2);
		x1 = a;
		a = Math.min(y1, y2);
		y2 = Math.max(y1, y2);
		y1 = a;
		a = new Floor(x1 * this.size, (x2 + 1) * this.size, y1 * this.size, (y2 + 1) * this.size, this.owner.map);
	}

	vent(x1, y1, x2, y2){
		this.buffer = [];
		this.schematic.push([x1, y1, x2, y2, 9]);
		let dist = euclidianDistance(x1, y1, x2, y2) > 5;
		let direction = Math.abs(x2 - x1) > Math.abs(y2 - y1);
		this.buffer.push(new VentEntry((x1 - 0.05) * this.size, (x1 + 1.05) * this.size, (y1 - 0.05) * this.size, (y1 + 1.05) * this.size, this.owner.map, undefined, { y: 3000 * dist, x: 3000}, {x: Math.sign(x2 - x1) * direction * 40, y: Math.sign(y2 - y1) * !direction * 40}));
	}

	elevator(x, y){
		this.buffer = [];
		this.schematic.push([x, y, 10]);
		this.buffer.push(new Elevator(x * this.size, (x + 4) * this.size, y * this.size, (y + 4) * this.size, this.owner.map));
	}

	elevButton(x, y){
		this.buffer = [];
		this.schematic.push([x, y, 11]);
		this.buffer.push(new ElevatorButton(x * this.size, (x + 1) * this.size, y * this.size, (y + 1) * this.size, this.owner.map));
	}

	ventBlock(x1, y1, x2, y2){
		this.buffer = [];
		this.schematic.push([x1, y1, x2, y2, 12]);
		let a = Math.min(x1, x2);
		x2 = Math.max(x1, x2);
		x1 = a;
		a = Math.min(y1, y2);
		y2 = Math.max(y1, y2);
		y1 = a;
		a = new ObjectHitbox(x1 * this.size, (x2 + 1) * this.size, y1 * this.size, (y2 + 1) * this.size, false, undefined, undefined, this.owner.map);
		a.draw = function(){
			let scale = 20;
			for (let a = 0; a < (this.hitbox.x2 - this.hitbox.x1) / scale; a++) {
				for (let b = 0; b < (this.hitbox.y2 - this.hitbox.y1) / scale; b++){
					draw.vent2({x: this.x, y: this.y, map: this.map, hitbox: {x1: this.hitbox.x1 + a * scale, x2: this.hitbox.x1 + (a + 1) * scale, y1: this.hitbox.y1 + b * scale, y2: this.hitbox.y1 + (b + 1) * scale}});
				}
			}
		}
		this.buffer.push(a);
	}

	pathfindingPoint(x, y, x2){
		this.buffer = [];
		this.schematic.push([x, y, x2, 13]);
		this.buffer.push(new PathfindingPoint((x + 0.5) * this.size, (y + 0.5) * this.size, x2 - x, this.owner.map));
	}

	door1(x1, y1, x2, y2){
		this.buffer = [];
		this.schematic.push([x1, y1, x2, y2, 14]);
		let a = Math.min(x1, x2);
		x2 = Math.max(x1, x2);
		x1 = a;
		a = Math.min(y1, y2);
		y2 = Math.max(y1, y2);
		y1 = a;
		a = new BaseDoor(x1 * this.size, (x2 + 1) * this.size, y1 * this.size, (y2 + 1) * this.size, this.owner.map);
		this.buffer.push(a);
	}

	door2(x1, y1, x2, y2, x3, y3){
		this.buffer = [];
		this.schematic.push([x1, y1, x2, y2, x3, y3, 15]);
		let a = Math.min(x1, x2);
		x2 = Math.max(x1, x2);
		x1 = a;
		a = Math.min(y1, y2);
		y2 = Math.max(y1, y2);
		y1 = a;
		a = new BaseDoor(x1 * this.size, (x2 + 1) * this.size, y1 * this.size, (y2 + 1) * this.size, this.owner.map, baseBackend, true, x3 * this.size, y3 * this.size);
		this.buffer.push(a);
	}

	doorTerminal(x, y){
		this.schematic.push([x, y, 16]);
		let a = new DoorTerminal(this.buffer[0], x * this.size + 10, y * this.size + 10);
		this.buffer = [];
		this.buffer.push(a);
	}

	landingPad(x1, y1, x2, y2){
		this.buffer = [];
		this.schematic.push([x1, y1, x2, y2, 17]);
		let a = Math.min(x1, x2);
		x2 = Math.max(x1, x2);
		x1 = a;
		a = Math.min(y1, y2);
		y2 = Math.max(y1, y2);
		y1 = a;
		a = new BackgroundImage(x1 * this.size, (x2 + 1) * this.size, y1 * this.size, (y2 + 1) * this.size, this.owner.map);
		a.draw = function(){
			draw.pad1(this);
		}
		this.buffer.push(a);
		a = new ObjectHitbox(x1 * this.size + 30, (x2 + 1) * this.size - 30, y1 * this.size + 30, (y2 + 1) * this.size - 30, true, undefined, undefined, this.owner.map);
		baseBackend.rocket = a;
		a.draw = function(){
			if (!this.fake){
				draw.rocketModule(this);
			}
		}
		this.buffer.push(a);
		a = new CartFiller((x1 + x2) / 2 * this.size, (y2 + 1) * this.size - 30, this.owner.map);
		this.buffer.push(a);
		a = new ObjectHitbox(x1 * this.size, (x2 + 1) * this.size, y1 * this.size + 3000, (y2 + 1) * this.size + 3000, false, undefined, undefined, this.owner.map);
		a.draw = function(){
			if (baseBackend.rocketLanded){
				draw.rocketTop(this);
			} else {
				draw.pad2(this);
			}
		}
		this.buffer.push(a);
	}

	cellSelector(x1, y1, x2){
		this.buffer = [];
		this.schematic.push([x1, y1, x2, 18]);
		this.selectedCell = baseBackend.cells[x2 - x1];
		//console.log("cell number " + (x2 - x1) + " selected");
	}

	cellBox(x1, y1, x2, y2){
		this.buffer = [];
		this.schematic.push([x1, y1, x2, y2, 19]);
		let a = Math.min(x1, x2);
		x2 = Math.max(x1, x2);
		x1 = a;
		a = Math.min(y1, y2);
		y2 = Math.max(y1, y2);
		y1 = a;
		new CellBox(x1 * this.size, (x2 + 1) * this.size, y1 * this.size, (y2 + 1) * this.size, this.selectedCell);
	}

	wiringConnector(x1, y1, x2, y2){
		this.buffer = [];
		this.schematic.push([x1, y1, x2, y2, 20]);
		new WiringConnector((x1 + 0.5) * this.size, (y1 + 0.5) * this.size, (x2 + 0.5) * this.size, (y2 + 0.5) * this.size, this.owner.map);
	}

	wiringBreakpoint(x1, y1, x2, y2){
		this.buffer = [];
		this.schematic.push([x1, y1, x2, y2, 21]);
		let a = new WireBreakpoint(x1 * this.size, y1 * this.size, x2 * this.size, y2 * this.size, this.owner.map);
		this.buffer.push(a);
	}

	wire(x1, y1, x2, y2){
		this.buffer = [];
		this.schematic.push([x1, y1, x2, y2, 22]);
		let a = Math.min(x1, x2);
		x2 = Math.max(x1, x2);
		x1 = a;
		a = Math.min(y1, y2);
		y2 = Math.max(y1, y2);
		y1 = a;
		a = new Wire((x1 + 0.5) * this.size, (x2 + 0.5) * this.size, (y1 + 0.5) * this.size, (y2 + 0.5) * this.size, this.owner.map);
	}

	vaultModule(x1, y1, x2, y2, x3, y3){
		this.buffer = [];
		this.schematic.push([x1, y1, x2, y2, x3, y3, 23]);
		new Vault(x1 * this.size, y1 * this.size, (x2 + 1) * this.size, (y2 + 1) * this.size, (x3 + 1) * this.size, (y3 + 1) * this.size);
		new FoodDispencer((x1 + (x3 + 1)) / 2 * this.size, (y3 + 1) * this.size + 40);
	}

	waterPort(x1, y1, x2, y2){
		this.buffer = [];
		this.schematic.push([x1, y1, x2, y2, 24]);
		let a = Math.min(x1, x2);
		x2 = Math.max(x1, x2);
		x1 = a;
		a = Math.min(y1, y2);
		y2 = Math.max(y1, y2);
		y1 = a;
		a = new ObjectHitbox(x1 * this.size, (x2 + 1) * this.size, y1 * this.size, (y2 + 1) * this.size);
		a.draw = function(){
			draw.O2H2Oport(this);
		}
		new CartFiller((x2 + 1) * this.size, (y1 + y2 + 1) / 2 * this.size, this.owner.map, "waterType");
	}

	waterTank(x1, y1, x2, y2){
		this.buffer = [];
		this.schematic.push([x1, y1, x2, y2, 25]);
		let a = Math.min(x1, x2);
		x2 = Math.max(x1, x2);
		x1 = a;
		a = Math.min(y1, y2);
		y2 = Math.max(y1, y2);
		y1 = a;
		this.buffer.push(new WaterTank(x1 * this.size, y1 * this.size, (x2 + 1) * this.size, (y2 + 1) * this.size));
	}

	reactor(x1, y1, x2, y2){
		this.buffer = [];
		this.schematic.push([x1, y1, x2, y2, 26]);
		let a = Math.min(x1, x2);
		x2 = Math.max(x1, x2);
		x1 = a;
		a = Math.min(y1, y2);
		y2 = Math.max(y1, y2);
		y1 = a;
		a = new ObjectHitbox(x1 * this.size, (x2 + 1) * this.size, y1 * this.size, (y2 + 1) * this.size, undefined, undefined, undefined, this.owner.map);
		a.draw = function(){
			draw.reactor(this);
		}
		this.buffer.push(a);
		new CartFiller((x1 + x2) / 2 * this.size, y1 * this.size, this.owner.map, "reactorType");
	}

	rock(x1, y1, x2, y2){
		this.buffer = [];
		this.schematic.push([x1, y1, x2, y2, 27]);
		let a = Math.min(x1, x2);
		x2 = Math.max(x1, x2);
		x1 = a;
		a = Math.min(y1, y2);
		y2 = Math.max(y1, y2);
		y1 = a;
		a = new Rock(x1 * this.size, (x2 + 1) * this.size, y1 * this.size, (y2 + 1) * this.size, undefined, undefined, undefined, this.owner.map);
		this.buffer.push(a);
	}

	stone(x1, y1, x2, y2){
		this.buffer = [];
		this.schematic.push([x1, y1, x2, y2, 28]);
		let a = Math.min(x1, x2);
		x2 = Math.max(x1, x2);
		x1 = a;
		a = Math.min(y1, y2);
		y2 = Math.max(y1, y2);
		y1 = a;
		a = new Stone(x1 * this.size, (x2 + 1) * this.size, y1 * this.size, (y2 + 1) * this.size, this.owner.map);
		this.buffer.push(a);
	}
}


class GridParticle extends Particle{
	constructor(ent = immediateApi.getPlayer(), scale = 20, bright = false) {
		super(Math.floor(-ent.map.xshift() / scale) * scale, Math.floor(-ent.map.yshift() / scale) * scale, 300, undefined, ent.map);
		this.ent = ent;
		this.bright = bright;
		this.scale = scale;
		console.log(Math.floor(ent.mouseBox.coordinates.x / this.scale) + "  " + Math.floor(ent.mouseBox.coordinates.y / this.scale));
	}

	draw(){
		for (let a = 0; a <= this.ent.map.size * 4 / this.scale; a++){
			for (let b = 0; b < this.bright * 9 + 1; b++){
				draw.grid1(this.coordinates.x + a * this.scale, this.coordinates.y, this.coordinates.y + this.ent.map.size, this.ent.map);
			}
		}
		for (let a = 0; a <= this.ent.map.size * 4 / this.scale; a++){
			for (let b = 0; b < this.bright * 9 + 1; b++){
				draw.grid2(this.coordinates.y + a * this.scale, this.coordinates.x, this.coordinates.x + this.ent.map.size, this.ent.map);
			}
		}	
	}
}


class WallBlock extends ObjectHitbox{
	constructor(x1, x2, y1, y2, isFake, x, y, maP, direction, side, scale = 20){
		super(x1, x2, y1, y2, isFake, x, y, maP);
		this.side = side;
		if (direction) {
			this.draw = this.draw1;
		} else {
			this.draw = this.draw2;
		}
		this.gridScale = scale;
	}

	draw1(){
		let scale = this.gridScale;
		for (let a = 0; a < (this.hitbox.x2 - this.hitbox.x1) / scale; a++) {
			for (let b = 0; b < (this.hitbox.y2 - this.hitbox.y1) / (scale * 2); b++){
				draw.wall1({x: this.x, y: this.y, map: this.map, hitbox: {x1: this.hitbox.x1 + a * scale, x2: this.hitbox.x1 + (a + 1) * scale, y1: this.hitbox.y1 + b * scale * 2, y2: this.hitbox.y1 + (b + 1) * scale * 2}}, this.side);
			}
		}
	}

	draw2(){
		let scale = this.gridScale;
		for (let a = 0; a < (this.hitbox.x2 - this.hitbox.x1) / (scale * 2); a++) {
			for (let b = 0; b < (this.hitbox.y2 - this.hitbox.y1) / scale; b++){
				draw.wall2({x: this.x, y: this.y, map: this.map, hitbox: {x1: this.hitbox.x1 + a * scale * 2, x2: this.hitbox.x1 + (a + 1) * scale * 2, y1: this.hitbox.y1 + b * scale, y2: this.hitbox.y1 + (b + 1) * scale}}, this.side);
			}
		}
	}
}


class Rock extends ObjectHitbox{
	constructor(x1, x2, y1, y2, isFake, x, y, maP, scale = 20){
		super(x1, x2, y1, y2, isFake, x, y, maP);
		this.gridScale = scale;
	}

	draw(){
		let scale = this.gridScale;
		for (let a = 0; a < (this.hitbox.x2 - this.hitbox.x1) / scale; a++) {
			for (let b = 0; b < (this.hitbox.y2 - this.hitbox.y1) / scale; b++){
				draw.object({x: this.x, y: this.y, map: this.map, hitbox: {x1: this.hitbox.x1 + a * scale, x2: this.hitbox.x1 + (a + 1) * scale, y1: this.hitbox.y1 + b * scale, y2: this.hitbox.y1 + (b + 1) * scale}});
			}
		}
	}
}
class Stone extends BackgroundImage{
	constructor(x1, x2, y1, y2, maP, scale = 20){
		super(x1, x2, y1, y2, maP);
		this.gridScale = scale;
	}

	draw(){
		let scale = this.gridScale;
		for (let a = 0; a < (this.hitbox.x2 - this.hitbox.x1) / scale; a++) {
			for (let b = 0; b < (this.hitbox.y2 - this.hitbox.y1) / scale; b++){
				draw.bgObject({x: this.x, y: this.y, map: this.map, hitbox: {x1: this.hitbox.x1 + a * scale, x2: this.hitbox.x1 + (a + 1) * scale, y1: this.hitbox.y1 + b * scale, y2: this.hitbox.y1 + (b + 1) * scale}});
			}
		}
	}
}


class Floor extends BackgroundImage{
	constructor(x1, x2, y1, y2, maP, scale = 20){
		super(x1, x2, y1, y2, maP);
		this.scale = scale;
	}

	draw(){
	let scale = this.scale;
		for (let a = 0; a < (this.hitbox.x2 - this.hitbox.x1) / scale; a++) {
			for (let b = 0; b < (this.hitbox.y2 - this.hitbox.y1) / scale; b++){
				draw.floor({x: this.x, y: this.y, map: this.map, hitbox: {x1: this.hitbox.x1 + a * scale, x2: this.hitbox.x1 + (a + 1) * scale, y1: this.hitbox.y1 + b * scale, y2: this.hitbox.y1 + (b + 1) * scale}});
			}
		}
	}
}


class Ladder extends BackgroundImage{
	constructor(x1, x2, y1, y2, maP = map, side = 1, shift = {x: 0, y: 3000}, shift2 = {x: 60, y: 0}, back = false){
		if (back){
			super(x1 + shift.x, x2 + shift.x, y1 + shift.y, y2 + shift.y, maP);
			this.side = side;
			let a = new Box(this.x, this.y, this.hitbox, undefined, -1000, this.map);
			a.shifter = shift;
			a.shifter2 = shift2;
			a.tickPlaceholderMain = function(){
				if (this.touchSpecific(immediateApi.getPlayer())){
					baseBackend.cart.linked = [false, false, false, false, false, false, false, false, false];
					baseBackend.cart.block.hitbox = {x1: -15, x2: 15, y1: -15, y2: 15};
					immediateApi.getPlayer().speedMultipliers[2] = 1;
					immediateApi.getPlayer().move(-this.shifter.x - this.shifter2.x, -this.shifter.y - this.shifter2.y);
					if (euclidianDistance(this.coordinates.x, this.coordinates.y, baseBackend.cart.x, baseBackend.cart.y) < 30){
						baseBackend.cart.tp(baseBackend.cart.x + this.shifter2.x, baseBackend.cart.y);
					}
				}
				if (this.touchSpecific(baseBackend.cart)){
					baseBackend.cart.linked = [false, false, false, false, false, false, false, false, false];
					baseBackend.cart.block.hitbox = {x1: -15, x2: 15, y1: -15, y2: 15};
					immediateApi.getPlayer().speedMultipliers[2] = 1;
					immediateApi.getPlayer().move(-this.shifter.x - this.shifter2.x, -this.shifter.y - this.shifter2.y);
					if (euclidianDistance(this.coordinates.x, this.coordinates.y, baseBackend.cart.x, baseBackend.cart.y) < 40){
						baseBackend.cart.tp(baseBackend.cart.x + this.shifter2.x * 1.5, baseBackend.cart.y);
					}
				}
			}
			return;
		}
		super(x1, x2, y1, y2, maP);
		this.side = side;
		let a = new Box(this.x, this.y, this.hitbox, undefined, -1000, this.map);
		a.shifter = shift;
		a.shifter2 = shift2;
		a.tickPlaceholderMain 
		a.tickPlaceholderMain = function(){
			if (this.touchSpecific(immediateApi.getPlayer())){
				baseBackend.cart.linked = [false, false, false, false, false, false, false, false, false];
				baseBackend.cart.block.hitbox = {x1: -15, x2: 15, y1: -15, y2: 15};
				immediateApi.getPlayer().speedMultipliers[2] = 1;
				immediateApi.getPlayer().move(this.shifter.x + this.shifter2.x, this.shifter.y + this.shifter2.y);
				if (euclidianDistance(this.coordinates.x, this.coordinates.y, baseBackend.cart.x, baseBackend.cart.y) < 30){
					baseBackend.cart.tp(baseBackend.cart.x - this.shifter2.x, baseBackend.cart.y);
				}
			}
			if (this.touchSpecific(baseBackend.cart)){
				baseBackend.cart.linked = [false, false, false, false, false, false, false, false, false];
				baseBackend.cart.block.hitbox = {x1: -15, x2: 15, y1: -15, y2: 15};
				immediateApi.getPlayer().speedMultipliers[2] = 1;
				immediateApi.getPlayer().move(this.shifter.x + this.shifter2.x, this.shifter.y + this.shifter2.y);
				if (euclidianDistance(this.coordinates.x, this.coordinates.y, baseBackend.cart.x, baseBackend.cart.y) < 40){
					baseBackend.cart.tp(baseBackend.cart.x - this.shifter2.x * 1.5, baseBackend.cart.y);
				}
			}
		}
		new Ladder(x1, x2, y1, y2, maP, -side, shift, shift2, true);
	}

	draw(){
		draw.ladder(this);
	}
}


class VentEntry extends BackgroundImage{
	constructor(x1, x2, y1, y2, maP = map, side = 1, shift = {x: 3000, y: 3000}, shift2 = {x: 0, y: 60}, back = false){
		if (back){
			super(x1 + shift.x, x2 + shift.x, y1 + shift.y, y2 + shift.y, maP);
			this.isVent = true;
			this.side = side;
			new VentEntryBox(this.x, this.y, this.hitbox, this.map, -1, shift, shift2);
			return;
		}
		super(x1, x2, y1, y2, maP);
		this.isVent = true;
		this.side = side;
		let a = new VentEntryBox(this.x, this.y, this.hitbox, this.map, 1, shift, shift2);
		new VentEntry(x1, x2, y1, y2, maP, -side, shift, shift2, true);
	}

	draw(){
		draw.vent1(this);
	}
}


class VentEntryBox extends Box{
	constructor(x, y, hitbox, maP, mult, shift, shift2){
		super(x, y, hitbox, undefined, -1000, maP);
		this.mult = mult;
		this.timer = 350;
		this.maxTimer = 350;
		this.shifter = shift;
		this.shifter2 = shift2;
	}

	tickPlaceholderMain(){
		if (immediateApi.getPlayer().inventory.mainhand[0].isWrench && this.touchSpecific(immediateApi.getPlayer())){
			this.timer--;
		} else {
			this.timer = this.maxTimer;
		}
		if (this.timer <= 0 && this.touchSpecific(immediateApi.getPlayer())){
			immediateApi.getPlayer().move((this.shifter.x + this.shifter2.x) * this.mult, (this.shifter.y + this.shifter2.y) * this.mult);
			this.timer = this.maxTimer;
		}
	}
}


class Elevator extends BackgroundImage{
	constructor(x1, x2, y1, y2, maP = map, back = false){
		let shift = {x: 0, y: 3000};
		if (back){
			super(x1 + shift.x, x2 + shift.x, y1 + shift.y, y2 + shift.y, maP);
			this.isActive = false;
			this.box = new ElevatorBox(this.x, this.y, this.hitbox, this.map, {x: -shift.x, y: -shift.y});
			return;
		}
		super(x1, x2, y1, y2, maP);
		this.other = new Elevator(x1, x2, y1, y2, maP, true);
		this.other.other = this;
		this.isActive = true;
		this.moving = false; 
		this.box = new ElevatorBox(this.x, this.y, this.hitbox, this.map, shift);
	}

	draw(){
		draw.elevator(this);
	}

	activate(obj){
		obj.isActive = !obj.isActive;
		obj.other.isActive = !obj.other.isActive;
		obj.box.activate(obj.isActive);
		obj.moving = false;
	}
}


class ElevatorBox extends Box{
	constructor(x, y, hitbox, maP, shift){
		super(x, y, hitbox, {type: "generic", amount: 25, iFrame: 200}, -1000, maP);
		this.shifter = shift;
	}

	activate(act){
		if (!act){
			let a = this.touch();
			for (let b = 0; b < a.length; b++){
				a[b].move(this.shifter.x, this.shifter.y);
			}
		} else {
			this.enableDamage(this.touch());
		}
	}

	tickPlaceholderMain(){}
}


class ElevatorButton extends ObjectHitbox{
	constructor(x1, x2, y1, y2, maP){
		super(x1, x2, y1, y2, undefined, undefined, undefined, maP);
		this.interactive = true;
		let a = new Box(this.x, this.y, this.scaledHitbox(2), undefined, 1, maP);
		for (let b in a.contactBackground()){
			if (a.contactBackground()[b].activate != undefined){
				this.connected = a.contactBackground()[b];
			}
		}
	}

	draw(){
		draw.elevButton(this);
	}

	interact(){
		if (!this.connected.moving){
			setTimeout(this.connected.activate, 2000, this.connected);
			this.connected.moving = true;
		}
	}
}


const mainScheme = [[90, 60, 119, 93, 4], [108, 56, 101, 61, 4], [90, 64, 90, 70, 6], [96, 42, 113, 57, 4], [79, 64, 73, 70, 6], [75, 64, 80, 69, 8], [73, 46, 73, 52, 6], [73, 46, 78, 53, 8], [54, 40, 68, 59, 4], [67, 46, 67, 52, 6], [59, 58, 54, 62, 6], [61, 60, 59, 62, 6], [56, 60, 58, 61, 8], [61, 62, 0], [54, 46, 54, 52, 6], [49, 46, 42, 53, 4], [42, 35, 48, 29, 6], [42, 31, 47, 36, 8], [48, 81, 42, 87, 6], [44, 81, 49, 86, 8], [57, 75, 78, 95, 4], [57, 81, 57, 87, 6], [101, 42, 107, 42, 6], [101, 31, 108, 38, 4], [92, 38, 85, 31, 4], [79, 37, 73, 31, 6], [75, 33, 80, 38, 8], [77, 3, 99, 25, 4], [85, 24, 91, 24, 6], [121, 38, 114, 31, 4], [109, 10, 130, 25, 4], [114, 24, 120, 24, 6], [118, 66, 0], [126, 56, 139, 76, 4], [126, 60, 126, 66, 6], [132, 56, 0], [132, 45, 139, 52, 4], [123, 45, 123, 51, 6], [132, 37, 138, 31, 6], [132, 33, 137, 38, 8], [142, 45, 149, 52, 4], [142, 56, 154, 76, 4], [148, 56, 0], [142, 39, 0], [154, 39, 154, 45, 6], [144, 41, 155, 44, 8], [79, 22, 0], [96, 192, 113, 207, 4], [101, 206, 107, 206, 6], [101, 192, 107, 192, 6], [127, 195, 127, 201, 6], [123, 195, 116, 202, 4], [124, 197, 124, 200, 8], [122, 214, 116, 219, 6], [118, 214, 123, 218, 8], [133, 220, 152, 196, 4], [133, 214, 0], [90, 233, 114, 215, 4], [135, 224, 150, 240, 4], [139, 219, 146, 225, 4], [137, 224, 147, 224, 6], [135, 232, 113, 224, 6], [101, 215, 107, 215, 6], [77, 175, 99, 153, 4], [75, 174, 75, 169, 6], [77, 169, 0], [92, 174, 0], [83, 172, 0], [101, 183, 107, 183, 6], [92, 177, 98, 177, 6], [92, 177, 108, 184, 8], [81, 170, 83, 170, 6], [64, 177, 57, 184, 4], [57, 208, 77, 229, 4], [59, 208, 59, 212, 6], [65, 208, 0], [59, 199, 57, 199, 6], [63, 195, 65, 195, 6], [59, 195, 64, 200, 8], [51, 177, 51, 183, 6], [52, 171, 37, 197, 4], [102, 50, 102, 47, 12], [103, 47, 107, 47, 12], [107, 48, 107, 51, 12], [102, 200, 102, 197, 12], [103, 197, 107, 197, 12], [107, 198, 107, 201, 12], [81, 171, 83, 171, 12], [83, 172, 83, 173, 12], [80, 23, 80, 21, 12], [82, 21, 81, 21, 12], [58, 210, 58, 211, 12], [60, 212, 58, 212, 12], [61, 60, 61, 61, 12], [59, 62, 61, 62, 12], [137, 224, 138, 225, 12], [147, 224, 148, 225, 12], [93, 84, 92, 84, 12], [228, 231, 225, 231, 12], [225, 232, 225, 236, 12], [226, 211, 223, 211, 12], [223, 210, 223, 205, 12], [226, 210, 226, 205, 12], [225, 237, 245, 237, 12], [245, 236, 245, 231, 12], [244, 231, 231, 231, 12], [213, 193, 216, 193, 12], [213, 192, 213, 187, 12], [216, 192, 216, 190, 12], [214, 187, 226, 187, 12], [79, 21, 79, 21, 12], [230, 170, 230, 167, 12], [226, 170, 226, 167, 12], [226, 171, 230, 171, 12], [226, 166, 226, 164, 12], [227, 164, 233, 164, 12], [233, 165, 233, 178, 12], [236, 181, 240, 181, 12], [240, 182, 240, 186, 12], [233, 179, 233, 181, 12], [234, 181, 235, 181, 12], [230, 172, 230, 187, 12], [227, 187, 229, 187, 12], [236, 184, 233, 184, 12], [250, 191, 240, 191, 12], [240, 187, 240, 190, 12], [247, 194, 247, 195, 12], [248, 195, 251, 195, 12], [251, 194, 251, 191, 12], [270, 184, 274, 184, 12], [274, 183, 274, 179, 12], [273, 179, 270, 179, 12], [279, 225, 273, 225, 12], [279, 224, 279, 221, 12], [278, 221, 273, 221, 12], [295, 213, 295, 207, 12], [294, 207, 291, 207, 12], [294, 213, 291, 213, 12], [286, 217, 290, 217, 12], [290, 218, 290, 221, 12], [289, 221, 280, 221, 12], [285, 217, 285, 218, 12], [282, 218, 282, 210, 12], [285, 216, 285, 213, 12], [286, 213, 290, 213, 12], [291, 208, 291, 210, 12], [290, 210, 283, 210, 12], [286, 218, 286, 218, 12], [264, 216, 260, 216, 12], [260, 217, 260, 220, 12], [261, 220, 270, 220, 12], [270, 221, 270, 225, 12], [272, 225, 271, 225, 12], [281, 218, 273, 218, 12], [273, 222, 275, 222, 12], [273, 217, 273, 216, 12], [272, 216, 267, 216, 12], [269, 179, 267, 179, 12], [267, 180, 267, 202, 12], [270, 185, 270, 202, 12], [267, 215, 267, 205, 12], [268, 205, 270, 205, 12], [270, 203, 270, 204, 12], [264, 215, 264, 205, 12], [266, 202, 247, 202, 12], [236, 185, 236, 194, 12], [237, 194, 244, 194, 12], [244, 195, 244, 202, 12], [233, 185, 233, 190, 12], [232, 190, 226, 190, 12], [226, 191, 226, 204, 12], [217, 190, 223, 190, 12], [223, 204, 223, 191, 12], [247, 196, 247, 201, 12], [245, 205, 263, 205, 12], [243, 202, 242, 202, 12], [242, 203, 242, 219, 12], [241, 219, 228, 219, 12], [228, 220, 228, 230, 12], [231, 230, 231, 222, 12], [232, 222, 245, 222, 12], [245, 221, 245, 206, 12], [139, 196, 145, 196, 6], [139, 183, 145, 177, 6], [139, 179, 144, 184, 8], [45, 33, 46, 13], [46, 50, 49, 13], [45, 84, 47, 13], [46, 68, 48, 13], [61, 85, 62, 13], [56, 50, 58, 13], [67, 50, 69, 13], [76, 50, 79, 13], [76, 42, 78, 13], [76, 55, 78, 13], [76, 66, 78, 13], [82, 35, 85, 13], [89, 24, 90, 13], [95, 35, 98, 13], [105, 44, 108, 13], [104, 36, 107, 13], [110, 51, 112, 13], [100, 53, 103, 13], [104, 55, 107, 13], [111, 35, 113, 13], [118, 30, 121, 13], [118, 21, 119, 13], [125, 35, 127, 13], [134, 35, 136, 13], [134, 49, 137, 13], [145, 49, 146, 13], [134, 63, 136, 13], [122, 64, 124, 13], [105, 64, 108, 13], [113, 64, 115, 13], [96, 66, 99, 13], [97, 76, 98, 13], [86, 68, 88, 13], [79, 168, 80, 13], [87, 168, 89, 13], [95, 174, 98, 13], [103, 180, 106, 13], [88, 180, 90, 13], [81, 182, 83, 13], [71, 181, 73, 13], [60, 181, 63, 13], [46, 181, 47, 13], [60, 193, 62, 13], [63, 203, 65, 13], [63, 215, 64, 13], [104, 190, 107, 13], [99, 199, 101, 13], [110, 199, 112, 13], [104, 204, 107, 13], [104, 211, 106, 13], [104, 219, 106, 13], [108, 228, 110, 13], [122, 229, 124, 13], [137, 229, 139, 13], [143, 223, 145, 13], [140, 207, 143, 13], [131, 217, 133, 13], [128, 229, 130, 13], [124, 216, 126, 13], [119, 215, 121, 13], [119, 207, 120, 13], [140, 199, 142, 13], [142, 189, 144, 13], [140, 181, 142, 13], [124, 181, 126, 13], [112, 181, 114, 13], [139, 217, 142, 13], [115, 229, 117, 13], [44, 39, 47, 39, 14], [44, 52, 47, 52, 14], [58, 83, 58, 86, 14], [91, 66, 91, 69, 14], [118, 62, 118, 65, 14], [133, 47, 133, 50, 14], [144, 57, 147, 57, 14], [87, 24, 90, 24, 14], [141, 219, 144, 219, 14], [141, 197, 144, 197, 14], [94, 178, 97, 178, 14], [59, 183, 62, 183, 14], [103, 206, 106, 206, 14], [103, 193, 106, 193, 14], [43, 34, 42, 31, 44, 30, 15], [74, 48, 73, 51, 74, 44, 15], [70, 51, 16], [103, 43, 106, 42, 102, 40, 15], [103, 57, 106, 56, 106, 58, 15], [142, 47, 143, 50, 140, 46, 15], [147, 48, 16], [118, 215, 121, 214, 117, 217, 15], [117, 211, 16], [92, 179, 93, 182, 96, 182, 15], [88, 178, 16], [51, 179, 52, 182, 50, 175, 15], [116, 31, 119, 32, 112, 32, 15], [115, 28, 16], [116, 24, 119, 24, 14], [129, 15, 130, 20, 128, 12, 15], [83, 7, 92, 16, 17], [98, 44, 98, 18], [98, 44, 111, 55, 19], [103, 38, 104, 18], [103, 37, 106, 41, 19], [87, 25, 89, 29, 19], [90, 25, 90, 29, 19], [87, 30, 89, 32, 19], [90, 30, 90, 32, 19], [89, 33, 75, 36, 19], [90, 33, 119, 36, 19], [120, 33, 137, 36, 19], [134, 37, 137, 59, 19], [128, 58, 133, 59, 19], [128, 60, 137, 74, 19], [119, 62, 127, 65, 19], [138, 47, 141, 50, 19], [75, 37, 78, 59, 19], [75, 60, 78, 69, 19], [79, 66, 90, 69, 19], [104, 62, 106, 18], [103, 58, 106, 59, 19], [92, 60, 117, 89, 19], [92, 90, 117, 91, 19], [44, 44, 47, 18], [44, 40, 47, 51, 19], [48, 48, 55, 51, 19], [56, 42, 59, 57, 19], [56, 58, 58, 59, 19], [56, 60, 58, 61, 19], [60, 42, 66, 57, 19], [67, 48, 72, 51, 19], [61, 210, 75, 227, 19], [59, 214, 59, 227, 19], [60, 214, 60, 227, 19], [60, 184, 64, 209, 19], [59, 184, 59, 198, 19], [44, 53, 48, 18], [44, 53, 47, 59, 19], [44, 60, 47, 86, 19], [48, 83, 57, 86, 19], [59, 81, 64, 18], [59, 77, 59, 89, 19], [59, 90, 59, 93, 19], [60, 90, 76, 93, 19], [60, 77, 76, 89, 19], [36, 42, 42, 18], [44, 31, 47, 38, 19], [120, 54, 127, 18], [153, 41, 150, 44, 19], [149, 41, 144, 44, 19], [144, 45, 147, 56, 19], [154, 41, 155, 44, 150, 40, 15], [143, 63, 151, 18], [144, 58, 149, 59, 19], [150, 58, 152, 59, 19], [150, 60, 152, 74, 19], [144, 60, 149, 74, 19], [79, 17, 88, 18], [77, 170, 80, 173, 19], [79, 155, 89, 169, 19], [85, 170, 89, 173, 19], [90, 155, 97, 173, 19], [94, 174, 97, 177, 19], [79, 17, 89, 20, 19], [83, 21, 89, 23, 19], [90, 17, 97, 23, 19], [93, 5, 97, 16, 19], [79, 5, 82, 16, 19], [100, 30, 110, 18], [116, 30, 119, 30, 19], [116, 25, 119, 29, 19], [103, 20, 114, 18], [111, 12, 119, 23, 19], [120, 12, 128, 23, 19], [120, 49, 132, 18], [127, 47, 132, 50, 19], [118, 197, 119, 200, 19], [120, 197, 124, 200, 19], [120, 201, 121, 209, 19], [118, 210, 119, 213, 19], [120, 210, 121, 213, 19], [90, 199, 103, 18], [98, 194, 101, 205, 19], [108, 194, 111, 205, 19], [102, 202, 107, 205, 19], [102, 194, 107, 196, 19], [90, 204, 104, 18], [103, 207, 106, 209, 19], [103, 210, 106, 216, 19], [92, 217, 112, 231, 19], [113, 226, 119, 231, 19], [120, 226, 136, 231, 19], [137, 226, 148, 238, 19], [141, 220, 144, 225, 19], [127, 218, 142, 18], [118, 216, 119, 218, 19], [120, 216, 134, 218, 19], [135, 198, 149, 209, 19], [135, 210, 149, 218, 19], [150, 210, 150, 218, 19], [150, 198, 150, 209, 19], [126, 191, 142, 18], [141, 180, 144, 196, 19], [120, 180, 140, 182, 19], [120, 179, 144, 179, 19], [94, 179, 119, 179, 19], [94, 180, 119, 182, 19], [103, 183, 106, 192, 19], [68, 182, 86, 18], [90, 180, 91, 182, 19], [89, 179, 60, 179, 19], [60, 180, 89, 182, 19], [53, 179, 59, 179, 19], [53, 180, 59, 182, 19], [34, 190, 51, 18], [39, 173, 50, 179, 19], [39, 180, 50, 195, 19], [85, 58, 104, 18], [30, 30, 41, 35, 19], [29, 30, 16, 35, 19], [131, 13, 149, 22, 19], [150, 22, 163, 13, 19], [156, 39, 179, 46, 19], [104, 63, 104, 54, 20], [93, 69, 70, 82, 20], [61, 79, 45, 69, 20], [45, 56, 59, 50, 20], [115, 68, 146, 64, 20], [99, 200, 99, 50, 20], [109, 203, 138, 211, 20], [99, 195, 98, 180, 20], [96, 180, 95, 176, 20], [93, 20, 118, 20, 20], [118, 20, 118, 27, 20], [54, 50, 46, 35, 20], [148, 61, 145, 46, 20], [81, 64, 89, 71, 2], [80, 63, 73, 54, 3], [72, 46, 69, 53, 2], [53, 46, 50, 53, 2], [42, 45, 49, 37, 3], [49, 80, 42, 54, 3], [50, 81, 56, 88, 2], [101, 39, 108, 41, 3], [93, 31, 100, 38, 2], [73, 45, 80, 39, 3], [81, 31, 84, 38, 2], [85, 26, 92, 30, 3], [109, 31, 113, 38, 2], [114, 26, 121, 30, 3], [120, 60, 125, 67, 2], [125, 45, 131, 52, 2], [132, 53, 139, 55, 3], [132, 39, 139, 44, 3], [122, 31, 131, 38, 2], [140, 45, 141, 52, 2], [142, 53, 149, 55, 3], [116, 203, 123, 213, 3], [124, 220, 132, 214, 2], [115, 233, 134, 224, 2], [101, 208, 108, 214, 3], [101, 185, 108, 191, 3], [92, 176, 99, 176, 3], [100, 177, 100, 184, 2], [91, 177, 65, 184, 2], [57, 185, 64, 194, 3], [66, 207, 59, 201, 3], [56, 177, 53, 184, 2], [139, 185, 146, 195, 3], [138, 177, 109, 184, 2], [101, 59, 102, 58, 1], [108, 58, 107, 59, 1], [92, 60, 100, 61, 1], [109, 60, 117, 61, 1], [117, 92, 92, 93, 1], [90, 63, 91, 62, 1], [90, 91, 91, 72, 1], [100, 56, 98, 57, 1], [96, 55, 97, 44, 1], [111, 56, 109, 57, 1], [73, 69, 74, 64, 1], [80, 70, 75, 71, 1], [79, 46, 80, 53, 1], [67, 42, 68, 45, 1], [67, 54, 68, 57, 1], [56, 40, 66, 41, 1], [66, 58, 61, 59, 1], [58, 62, 56, 63, 1], [55, 61, 54, 60, 1], [54, 45, 55, 42, 1], [54, 57, 55, 54, 1], [42, 51, 43, 48, 1], [48, 31, 49, 36, 1], [42, 29, 47, 30, 1], [42, 86, 43, 81, 1], [49, 87, 44, 88, 1], [57, 80, 58, 77, 1], [59, 76, 76, 75, 1], [77, 77, 78, 93, 1], [76, 94, 59, 95, 1], [58, 93, 57, 89, 1], [98, 42, 100, 43, 1], [109, 42, 111, 43, 1], [103, 31, 106, 32, 1], [90, 37, 87, 38, 1], [73, 38, 74, 33, 1], [75, 31, 80, 32, 1], [84, 25, 79, 24, 1], [97, 24, 93, 25, 1], [78, 23, 77, 5, 1], [79, 4, 97, 3, 1], [98, 5, 99, 23, 1], [119, 37, 116, 38, 1], [112, 44, 113, 55, 1], [113, 25, 111, 24, 1], [109, 23, 110, 12, 1], [111, 11, 128, 10, 1], [128, 24, 122, 25, 1], [129, 12, 130, 14, 1], [130, 21, 129, 23, 1], [118, 68, 119, 91, 1], [126, 59, 127, 58, 1], [126, 74, 127, 68, 1], [137, 75, 128, 76, 1], [139, 58, 138, 74, 1], [128, 56, 131, 57, 1], [123, 50, 124, 47, 1], [139, 33, 138, 38, 1], [132, 31, 137, 32, 1], [142, 74, 143, 58, 1], [153, 58, 154, 74, 1], [152, 75, 144, 76, 1], [150, 57, 152, 56, 1], [149, 47, 148, 50, 1], [142, 44, 143, 41, 1], [153, 45, 150, 46, 1], [144, 39, 153, 40, 1], [97, 205, 96, 194, 1], [112, 194, 113, 205, 1], [100, 206, 98, 207, 1], [111, 206, 109, 207, 1], [98, 193, 100, 192, 1], [109, 193, 111, 192, 1], [127, 197, 128, 200, 1], [124, 196, 126, 195, 1], [126, 201, 124, 202, 1], [117, 200, 116, 197, 1], [116, 218, 117, 214, 1], [123, 219, 118, 220, 1], [118, 196, 121, 195, 1], [134, 213, 133, 198, 1], [112, 232, 92, 233, 1], [91, 231, 90, 217, 1], [140, 223, 139, 221, 1], [145, 221, 146, 223, 1], [138, 219, 135, 220, 1], [150, 219, 147, 220, 1], [149, 226, 150, 238, 1], [148, 239, 137, 240, 1], [136, 238, 135, 234, 1], [113, 217, 114, 223, 1], [109, 216, 112, 215, 1], [92, 216, 100, 215, 1], [151, 198, 152, 218, 1], [76, 173, 75, 171, 1], [78, 168, 77, 155, 1], [91, 174, 79, 175, 1], [98, 155, 99, 173, 1], [79, 154, 97, 153, 1], [101, 177, 108, 178, 1], [99, 183, 92, 184, 1], [58, 227, 57, 210, 1], [75, 228, 59, 229, 1], [76, 210, 77, 227, 1], [67, 209, 75, 208, 1], [65, 197, 66, 200, 1], [57, 198, 58, 195, 1], [59, 177, 62, 178, 1], [52, 185, 51, 195, 1], [50, 196, 39, 197, 1], [38, 195, 37, 173, 1], [39, 172, 50, 171, 1], [51, 173, 52, 176, 1], [145, 179, 146, 184, 1], [139, 178, 144, 177, 1], [135, 197, 138, 196, 1], [147, 197, 150, 196, 1], [59, 60, 58, 7], [125, 47, 126, 7], [125, 49, 126, 7], [64, 42, 64, 33, 9], [76, 84, 85, 84, 9], [94, 84, 84, 84, 9], [128, 74, 120, 74, 9], [144, 60, 135, 60, 9], [122, 33, 122, 25, 9], [98, 44, 98, 37, 9], [79, 20, 72, 20, 9], [81, 22, 89, 7], [103, 48, 10], [102, 51, 11], [102, 201, 11], [39, 195, 36, 195, 9], [75, 210, 75, 207, 9], [88, 182, 88, 184, 9], [138, 218, 138, 221, 9], [112, 217, 114, 217, 9], [92, 84, 77, 84, 22], [77, 84, 77, 76, 22], [77, 76, 58, 76, 22], [58, 76, 58, 82, 22], [58, 82, 48, 82, 22], [48, 82, 48, 52, 22], [48, 47, 48, 30, 22], [48, 30, 43, 30, 22], [48, 47, 55, 47, 22], [55, 47, 55, 41, 22], [55, 41, 61, 41, 22], [107, 61, 107, 56, 22], [107, 56, 112, 56, 22], [112, 56, 112, 50, 22], [112, 200, 112, 193, 22], [112, 193, 107, 193, 22], [102, 193, 102, 183, 22], [102, 178, 98, 178, 22], [98, 178, 98, 173, 22], [118, 72, 126, 72, 22], [139, 72, 143, 72, 22], [143, 72, 143, 57, 22], [148, 57, 148, 45, 22], [148, 45, 154, 45, 22], [117, 215, 114, 215, 22], [112, 207, 112, 200, 22], [117, 215, 117, 219, 22], [117, 219, 140, 219, 22], [145, 219, 151, 219, 22], [151, 219, 151, 207, 22], [96, 20, 115, 20, 20], [117, 20, 118, 28, 20], [115, 31, 115, 24, 22], [115, 24, 98, 24, 22], [115, 27, 117, 27, 21], [112, 24, 112, 22, 21], [51, 47, 51, 49, 21], [48, 43, 46, 43, 21], [48, 46, 46, 46, 21], [48, 35, 46, 35, 21], [48, 58, 46, 58, 21], [48, 65, 46, 65, 21], [48, 68, 46, 68, 21], [48, 78, 46, 78, 21], [52, 82, 52, 84, 21], [77, 81, 73, 81, 21], [61, 41, 67, 41, 22], [67, 41, 67, 47, 22], [67, 47, 73, 47, 22], [143, 72, 145, 72, 21], [143, 62, 146, 62, 21], [148, 52, 146, 52, 21], [148, 54, 146, 54, 21], [120, 219, 120, 217, 21], [126, 219, 126, 217, 21], [131, 219, 131, 217, 21], [151, 218, 148, 216, 21], [102, 190, 104, 190, 21], [102, 183, 104, 181, 21], [102, 186, 104, 186, 21], [98, 174, 95, 174, 21], [46, 178, 94, 169, 20], [93, 174, 51, 174, 22], [39, 173, 46, 176, 40, 184, 23], [135, 213, 137, 215, 24], [141, 231, 148, 238, 25], [98, 70, 112, 84, 26], [41, 29, 17, 30, 27], [41, 35, 28, 36, 27], [27, 36, 17, 37, 27], [16, 29, 14, 36, 27], [41, 30, 30, 35, 28], [29, 30, 16, 35, 28], [156, 39, 176, 40, 27], [156, 45, 176, 46, 27], [177, 39, 182, 40, 27], [177, 45, 182, 46, 27], [156, 41, 179, 44, 28], [180, 41, 182, 44, 28], [183, 39, 184, 46, 27], [131, 21, 149, 22, 27], [150, 21, 165, 22, 27], [164, 15, 165, 20, 27], [165, 13, 150, 14, 27], [149, 13, 131, 14, 27], [131, 14, 149, 21, 28], [150, 14, 163, 21, 28]];


/*module.exports.LevelEditor = LevelEditor;
module.exports.GridParticle = GridParticle;
module.exports.WallBlock = WallBlock;
module.exports.Rock = Rock;
module.exports.Stone = Stone;
module.exports.Floor = Floor;
module.exports.Ladder = Ladder;
module.exports.VentEntry = VentEntry;
module.exports.VentEntryBox = VentEntryBox;
module.exports.Elevator = Elevator;
module.exports.ElevatorBox = ElevatorBox;
module.exports.ElevatorButton = ElevatorButton;
module.exports.mainScheme = mainScheme;*/
//export {LevelEditor, GridParticle, WallBlock, Rock, Stone, Floor, Ladder, VentEntry, VentEntryBox, Elevator, ElevatorBox, ElevatorButton, mainScheme};
/*let Formulasjs = require("./Formulas.js");
let Classesjs = require("./Classes.js");
let projections = Formulasjs.projections;
let defenceCount = Formulasjs.defenceCount;
let spreadCounter = Formulasjs.spreadCounter;
let turn = Formulasjs.turn;
let euclidianDistance = Formulasjs.euclidianDistance;
let Box = Classesjs.Box;
let Tool = Classesjs.Tool;
let PlaceholderItem = Classesjs.PlaceholderItem;
let Resource = Classesjs.Resource;
let Particle = Classesjs.Particle;
let StatusEffect = Classesjs.StatusEffect;
let Entity = Classesjs.Entity;
let ObjectHitbox = Classesjs.ObjectHitbox;
let BackgroundImage = Classesjs.BackgroundImage;
let Map = Classesjs.Map;
let ShadowRealm = Classesjs.ShadowRealm;
let Interface = Classesjs.Interface;
let InterfaceElement = Classesjs.InterfaceElement;
let InteractivityHitbox = Classesjs.InteractivityHitbox;
let DevKit = Classesjs.DevKit;
*/


class BaseBackend{
	constructor(maP = map){
		this.map = maP;
		this.cells = [];
		this.ventCells = [];
		this.activeCells = [];
		this.heavyDoors = [];
		this.doors = [];//purely server purposes
		this.coolingSystems = [];
		this.wayPoints = [];
		this.glyphids = [];
		this.glyphidsByCell = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
		this.doorEntities = [];
		this.generalPower = true;
		this.rocketLanded = false;
		this.ventDamage = 1;
		this.ventDefence = true;
		this.ventOn = true;
		this.rocketCounter = -1;
		this.rocketExplosionTimer = -1;
		this.fuelConsumptionTimer = 0;
		this.reactorTemperature = 0;
		this.airCondition = 0;
		this.oxygenTick = true;
		this.stopped = false;
		for (let a = 0; a < 20; a++){
			new Cell(this);
		}
		this.cells[19].distance = 100;
		this.cells[19].rarity = 150;
		this.eventLog = "";
		maP.assignIndividualId(this);
	}

	startBackendTicks(){
		setTimeout(() => {
			baseBackend.cells[3].wiringBreakpoints[0].break();////
			immediateApi.getPlayer().tickCounter = 0;
			immediateApi.getPlayer().tickPlaceholder3 = function(){
				if (this.tickCounter % 50 === 0){
					baseBackend.baseTick1();
					if (this.tickCounter % 300 === 0){
						baseBackend.baseTick2();
					}
				}
				this.tickCounter++;
			}
		}, 10);
	}

	operatorBaseFreeze(){
		this.stopped = true
	}

	baseTick1(){
		if (this.stopped){
			return;
		}
		for (let a = 0; a < this.map.api.players.length; a++){
			if (this.map.api.players[a].x > 4260 && this.map.api.players[a].x < 5920 && this.map.api.players[a].y > 3280 && this.map.api.players[a].y < 4760 && this.ventDefence){
				this.map.api.players[a].damageGeneric(this.ventDamage);
			}
			if (this.airCondition > 12){
				this.map.api.players[a].damageGeneric(this.ventDamage / 3);
			}
		}
		if (this.map.entityList.length > 1500){
			this.map.reloadEntityList();
		}
		this.findPlayer();
		this.findPlayer2();
		this.baseTick3();
	}

	baseTick2(){//gets nullified by Client
		if (this.stopped){
			return;
		}
		this.rocketCounter++;
		if (this.rocketCounter % 150 === 0){
			this.rocketInbound();
			this.rocketCounter = 0;
		}
		if (this.rocketExplosionTimer >= 0){
			this.rocketExplosionTimer++;
			if (this.rocketExplosionTimer >= 50){
				immediateApi.endgame();
			}
		}
		if (this.mainTerminal.rocketBayAccess){
			this.cells[9].increaseStatus(7);
		}
		if (((!this.ventOn || !this.generalPower) && this.airCondition < 20) || this.supplies.oxygen <= 0){
			this.airCondition++;
		} else if (this.airCondition > 0){
			this.airCondition--;
		}
		this.glyphidsByCell = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
		for (let a = 0; a < this.glyphids.length; a++){
			if (this.glyphids[a] === undefined){continue}
			this.glyphidsByCell[this.glyphids[a].cell]++;
		}
		for (let a = 0; a < this.cells.length; a++){
			this.cells[a].reactInfestationStatus();
		}
		this.cells[19].status = 100;
		this.systemsTick();
	}

	baseTick3(){//gets nullified by Client
		for (let a = 0; a < this.cells.length; a++){
			this.cells[a].distance = 100;
			this.cells[a].voltage = 100;
			this.cells[a].alreadyCounted = false;
			this.cells[a].increaseStatus(-1);
			this.cells[a].unpower();
			this.cells[a].rollWireBreak();
		}
		if (this.generalPower){this.cells[2].electricSignal(0)};
		this.cells[19].signal(0);
		for (let a in this.activeCells){
			this.activeCells[a].increaseStatus(-2);
		}
	}

	systemsTick(){
		if (this.fuelConsumptionTimer === 10 && this.generalPower){
			this.fuelConsumptionTimer = 0;
			if (this.oxygenTick && this.generalPower){
				this.supplies.oxygen--;
			}
			this.oxygenTick = !this.oxygenTick;
			this.reactorPort.fuel--;
		}
		this.fuelConsumptionTimer++;
		if (this.reactorPort.fuel <= 0){
			this.generalPower = false;
		}
		this.heatReactor((2 - 1 * this.coolingSystems[0].powered - 1 * this.coolingSystems[1].powered) * this.generalPower);
		if (this.reactorTemperature > 15){
			immediateApi.endgame();
		}
	}

	heatReactor(t){
		if (t > 0){
			this.reactorTemperature += t;
			new MeltdownParticle();
			//console.log("!!!meltdown!!!");
		} else if (this.reactorTemperature > 0){
			this.reactorTemperature--;
		}
	}

	activateDoorEntities(){
		for (let a in this.doorEntities){
			this.doorEntities[a].hitbox = {x1: 0, x2: 0, y1: 0, y2: 0, additional: []};
		}
	}

	deactivateDoorEntities(){
		for (let a in this.doorEntities){
			this.doorEntities[a].hitbox = {x1: 10, x2: -10, y1: 10, y2: -10, additional: []}
		}
	}

	bindDoors(){
		this.activateDoorEntities();
		for (let a in this.cells){
			for (let b in this.cells[a].hitboxes){
				for (let c in this.doorEntities){
					if (this.cells[a].hitboxes[b].touchSpecific(this.doorEntities[c])){
						this.doorEntities[c].getOther().bindedCell = this.cells[a];
						this.cells[a].entries.push(this.doorEntities[c]);
						this.cells[a].mechanisms.push(this.doorEntities[c].assignedDoor);
					}
				}
			}
		}
		this.deactivateDoorEntities();
		for (let a in this.cells){
			let bigList = [];
			for (let b in this.cells[a].hitboxes){
				bigList.push(...this.cells[a].hitboxes[b].contactBackground());
			}
			for (let b in bigList){
				if (bigList[b].isVent){
					this.ventCells.push(this.cells[a]);
					this.cells[a].hasVent = true;
					break;
				}
			}
		}
		this.heavyDoors[0].isLocked = true;
		this.heavyDoors[9].isLocked = true;
		this.heavyDoors[10].isLocked = true;
		let a = function(){
			this.moving = true;
			this.isOpen = false;
			setTimeout((obj) => {obj.fake = false; new PushOutBox(20, this, 4); obj.moveTick(obj, 20); obj.moving = false; obj.isLocked = true;}, this.cooldown, this);
		}
		this.heavyDoors[0].close = a;
		this.heavyDoors[9].close = a;
		this.heavyDoors[10].close = a;
	}

	bindWiring(){
		for (let a in this.cells){
			let bigList = [];
			for (let b in this.cells[a].hitboxes){
				bigList.push(...this.cells[a].hitboxes[b].touch());
			}
			for (let c in bigList){
				if (bigList[c].connector && !bigList[c].alreadyCounted){
					this.cells[a].wireEntries.push(bigList[c]);
					bigList[c].other.bindedCell = this.cells[a];
					bigList[c].alreadyCounted = true;
				}
				if (bigList[c].backlink && !bigList[c].alreadyCounted){
					this.cells[a].wiringBreakpoints.push(bigList[c].backlink);
					bigList[c].backlink.bindedCell = this.cells[a];
					bigList[c].alreadyCounted = true;
				}
			}
		}
		for (let a in this.cells){
			let entries = [];
			for (let b in this.cells[a].wireEntries){
				entries.push(this.cells[a].wireEntries[b].bindedCell);
			}
			this.cells[a].wireEntries = [...entries];
		}
	}

	activateWaypoints(){
		for (let a in this.wayPoints){
			this.wayPoints[a].find();
		}
		for (let a in this.cells){
			this.cells[a].defineBoundary();
		}
		this.bindDoors();
		this.bindWiring();
	}

	findPlayer(){
		for (let playeR = 0; playeR < immediateApi.players.length; playeR++){
			let closest = undefined;
			let dis = 10000;
			for (let b = 0; b < this.wayPoints.length; b++){
				this.wayPoints[b].distance[playeR] = 100;
			}
			for (let b = 0; b < this.wayPoints.length; b++){
				if (this.wayPoints[b] === undefined){continue}
				if (euclidianDistance(immediateApi.players[playeR].x, immediateApi.players[playeR].y, this.wayPoints[b].x, this.wayPoints[b].y) <= dis){
					closest = this.wayPoints[b];
					dis = euclidianDistance(immediateApi.players[playeR].x, immediateApi.players[playeR].y, this.wayPoints[b].x, this.wayPoints[b].y);
				}
			}
			closest.signal(0, [playeR]);
			let inSight = [];
			for (let b = 0; b < this.wayPoints.length; b++){
				if (this.wayPoints[b].distance[playeR] < 3){
					inSight.push(this.wayPoints[b]);
				}
			}
			for (let b = 0; b < this.wayPoints.length; b++){
				this.wayPoints[b].distance[playeR] = 100;
			}
			for (let b = 0; b < inSight.length; b++){
				if (raycast(inSight[b], 8, immediateApi.players[playeR])){
					inSight[b].signal(0, [playeR]);
				}
			}
		}
	}
	
	findPlayer2(){
		this.activeCells = [];
		for (let a in this.cells){
			this.cells[a].playerIn = false;
			for (let b in this.cells[a].hitboxes){
				this.cells[a].hitboxes[b].checkPlayer();
			}
		}
	}

	checkInPlayer(id){
		for (let a in this.cells){
			if (a == id){
				this.cells[a].playerIn = true;
				this.activeCells.push(this.cells[a]);
			}
		}
	}

	locateClosest(ent){
		let closest = immediateApi.getPlayer();
		let dis = 10000;
		for (let b = 0; b < this.wayPoints.length; b++){
			if (this.wayPoints[b] === undefined){continue}
			if (euclidianDistance(ent.x, ent.y, this.wayPoints[b].x, this.wayPoints[b].y) <= dis && raycast(ent, 8, this.wayPoints[b])){
				closest = this.wayPoints[b];
				dis = euclidianDistance(ent.x, ent.y, this.wayPoints[b].x, this.wayPoints[b].y);
			}
		}
		for (let b = 0; b < immediateApi.players.length; b++){
			if (euclidianDistance(ent.x, ent.y, immediateApi.players[b].x, immediateApi.players[b].y) <= dis && raycast(ent, 8, immediateApi.players[b])){
				closest = immediateApi.players[b];
				dis = euclidianDistance(ent.x, ent.y, immediateApi.players[b].x, immediateApi.players[b].y);
			}
		}
		return closest;
	}

	runDiagnostics(){
		for (let a = 0; a < this.cells.length - 1; a++){
			setTimeout(this.mainTerminal.log, 1000 * a, this.cells[a].getStats(), this.mainTerminal);
		}
	}

	rocketInbound(){
		console.log("rocket inbound!");
		this.rocketIsInbound = true;
		this.rocketExplosionTimer = 0;
	}

	rocketCondition(){
		console.log(this.cells[9].wiringIntegrity + " wiring");
		console.log(this.cells[9].status + " status");
		console.log(this.rocketIsInbound + " rocketIsInbound");
		console.log(this.rocketRefueller + " rocketCargo");
		return this.cells[9].wiringIntegrity && this.cells[9].status < 40 && this.rocketIsInbound && this.rocketRefueller.fuel === 0 && this.rocketRefueller.oxygen === 0 && this.rocketRefueller.water === 0;
	}

	landRocket(){
		if (this.rocketCondition()){
			this.rocketLanded = true;
			this.rocket.fake = false;
			this.rocketRefueller.fuel = 20;
			this.rocketRefueller.water = 10;
			this.rocketRefueller.oxygen = 10;
			this.mainTerminal.log("rocket landed successfully");
			this.foodDispencer.hasFood = true;
			this.rocketExplosionTimer = 0;

		} else {
			this.mainTerminal.log("rocket can't land");
		}
	}
	launchRocket(){
		if (this.rocketCondition()){
			this.rocketLanded = false;
			this.rocket.fake = true;
			this.rocketInbound = false;
			this.rocketExplosionTimer = -1;
			this.mainTerminal.log("rocket launched successfully");
			this.day++;
			if (this.day === 3){
				while (true){
					alert("you win");
				}
			}
		} else {
			this.mainTerminal.log("rocket can't be launched");
		}
	}

	clearEventLog(){
		this.eventLog = "";
	}

	getSaveData(){
		if (this.isTechnical){return ""}
		let parameters = [
			this.individualId,
			this.generalPower,
			this.rocketLanded,
			this.ventDefence,
			this.ventOn,
			this.stopped,
			this.rocketIsInbound,
			this.constructor.name,
			this.ventDamage,//nums
			this.rocketCounter,
			this.rocketExplosionTimer,
			this.fuelConsumptionTimer,
			this.reactorTemperature,
			this.airCondition,
		];
		let saved = parameters.join(" ");
		return saved;
	}

	setSaveData(parameters){
		let parameterNames = ["individualId", "generalPower", "rocketLanded", "ventDefence", "ventOn", "stopped", "rocketIsInbound"];
		for (let a = 1; a < parameterNames.length; a++){
			this[parameterNames[a]] = parameters[a] === "true";
		}
		parameterNames = ["ventDamage", "rocketCounter", "rocketExplosionTimer", "fuelConsumptionTimer", "reactorTemperature", "airCondition"];
		let numberParams = parameters.map(Number);
		for (let a = 0; a < parameterNames.length; a++){
			this[parameterNames[a]] = numberParams[a + 8];
		}
	}
}


class MainTerminal extends ObjectHitbox{
	constructor(x1, x2, y1, y2, numb = 3, inter = new MainTerminalInterface(), maP = map){
		super(x1, x2, y1, y2, undefined, undefined, undefined, maP);
		this.interactive = true;
		this.num = numb;
		this.interface = inter;
	}

	draw(){
		draw.terminal1(this);
	}

	interact(ent){
		if (!ent.activeInterfaces[this.num]){
			ent.activeInterfaces[this.num] = true;
            this.intId = ent.personalInterfaces.push(this.interface) - 1;
            ent.speedMultipliers[0] = 0;
		} else {
			ent.activeInterfaces[this.num] = false;
			ent.personalInterfaces[this.intId] = undefined;
			ent.speedMultipliers[0] = 1;
		}
	}
}


class MainTerminalInterface extends Interface{
	constructor(backend = baseBackend){
		super(0, 600, 150, 450);
		this.backend = backend;
		this.backend.mainTerminal = this;
		this.rocketBayAccess = false;
		this.elevatorOpen = false;
		this.access = false;
		this.blockLifterGiven = false;
		this.elements[0].draw = function(){
			draw.wiringBg(this);
			draw.terminal(this);
		}
		this.codes = [];
		new Code(this, "grantAccess", "0,5,2,4,1");
		new Code(this, "openBay", "2,3,2,0,1");
		new Code(this, "closeBay", "1,0,2,3,2");
		new Code(this, "diagnostic", "1,1,1");
		new Code(this, "blockLifter", "2,5,2,3,4");
		this.display = new InterfaceElement(this, 0, 0, 0, 0);
		this.display.code = [];
		this.display.draw = function(){
			for (let a = 0; a < this.code.length && a < 5; a++){
				draw.symbol(this.code[a], 235 + 20 * a, 17, 180, 17);
			}
		}
		invisibleButton([261, 283, 305, 261, 283, 305], [219, 219, 219, 243, 243, 243], this);
		let a = new InterfaceButton(423, 403, this, 40, true);
		a.functionality = function(){this.parentInterface.changeElevatorState()}
		a = new InterfaceButton(288, 351, this, 100, true);
		a.functionality = function(){this.parentInterface.power()}
		a.draw = function(){
			draw.lever(this, this.parentInterface.backend.generalPower);
		}
		a = new InterfaceButton(473, 403, this);
		a.functionality = function(){this.parentInterface.briefElevatorOpening()}
		a = new InterfaceButton(28, 206, this);
		a.functionality = function(){this.parentInterface.mainDoor(0)}
		a = new InterfaceButton(79, 206, this);
		a.functionality = function(){this.parentInterface.mainDoor(9)}
		a = new InterfaceButton(128, 206, this);
		a.functionality = function(){this.parentInterface.mainDoor(10)}
		a = new InterfaceButton(523, 403, this);
		a.functionality = function(){this.parentInterface.elevatorOpen2()}
		a = new InterfaceButton(573, 403, this);
		a.functionality = function(){this.parentInterface.elevatorOpen1()}
		a = new InterfaceButton(181, 338, this, 40, true);
		a.functionality = function(){this.parentInterface.vent()}
		a = new InterfaceButton(136, 338, this, 40, true);
		a.functionality = function(){this.parentInterface.ventDef()}
		a = new InterfaceButton(90, 340, this);
		a.functionality = function(){this.parentInterface.lockProtocol()}
		a = new InterfaceButton(40, 340, this);
		a.functionality = function(){this.parentInterface.unlockProtocol()}
		a = new InterfaceButton(180, 205, this);
		a.functionality = function(){this.parentInterface.unlockVault()}
		a = new InterfaceButton(325, 280, this);
		a.functionality = function(){this.parentInterface.confirmCode()}
		a = new InterfaceElement(this, 350, 356, 230, 236);
		a.draw = function(){
			if (this.parentInterface.access){
				draw.can.fillStyle = "green";
			} else {
				draw.can.fillStyle = "red";
			}
			draw.can.fillRect(this.hitbox.x1, this.hitbox.y1, this.hitbox.x2 - this.hitbox.x1, this.hitbox.y2 - this.hitbox.y1);
		}
		this.textDisplay = new InterfaceElement(this, 400, 590, 315, 350);
		this.textDisplay.text = "";
		this.textDisplay.draw = function(){
			draw.text(this);
		}
		backend.map.assignIndividualId(this);
	}

	log(txt, obj = this){
		obj.textDisplay.text = txt;
		setTimeout((obj) => {obj.text = ""}, 975, obj.textDisplay);
	}

	changeElevatorState(){
		let a = baseBackend.heavyDoors[2];
		let b = baseBackend.heavyDoors[3];
		if (this.elevatorOpen){
			if (!a.isLocked && !a.isBlocked && a.powered && a.isOpen){
				a.interact();
			}
			if (!b.isLocked && !b.isBlocked && b.powered && b.isOpen){
				b.interact();
			}
			this.elevatorOpen = false;
		} else {
			if (!a.isLocked && !a.isBlocked && a.powered && !a.isOpen){
				a.interact();
			}
			if (!b.isLocked && !b.isBlocked && b.powered && !b.isOpen){
				b.interact();
			}
			this.elevatorOpen = true;
		}
	}

	briefElevatorOpening(){
		this.changeElevatorState();
		setTimeout((obj) => {obj.changeElevatorState()}, 5000, this);
	}

	elevatorOpen1(){
		let a = baseBackend.heavyDoors[2]
		if (!a.isLocked && !a.isBlocked && a.powered){
			a.interact();
		}
	}

	elevatorOpen2(){
		let a = baseBackend.heavyDoors[3]
		if (!a.isLocked && !a.isBlocked && a.powered){
			a.interact();
		}
	}

	lockProtocol(){
		this.logEvent("lockProtocol");
		for (let a in baseBackend.heavyDoors){
			baseBackend.heavyDoors[a].lock();
		}
	}

	unlockProtocol(){
		this.logEvent("unlockProtocol");
		if (!this.access){
			return;
		}
		for (let a in baseBackend.heavyDoors){
			if (a == 9 || a == 10 || a == 0){continue}
			baseBackend.heavyDoors[a].unlock();
		}
		this.access = false;
	}

	confirmCode(){
		for (let a in this.codes){
			if (this.display.code.toString() === this.codes[a].code){
				this.codes[a].functionality();
				this.display.code = [];
				return;
			}
		}
		this.display.code = [];
		return;
	}

	grantAccess(){
		this.logEvent("grantAccess");
		this.access = true;
		setTimeout((obj) => {obj.access = false}, 5000, this)
	}

	unlockVault(){
		if (!this.access){
			return;
		}
		this.logEvent("unlockVault");
		setTimeout(() => {baseBackend.heavyDoors[7].interact()}, 20000);
		this.access = false;
	}

	power(){
		if (!this.access){
			return;
		}
		this.logEvent("power");
		this.backend.generalPower = !this.backend.generalPower;
		this.access = false;
	}

	vent(){
		this.logEvent("vent");
		this.backend.ventOn = !this.backend.ventOn;
	}

	ventDef(){
		this.logEvent("ventDef");
		this.backend.ventDefence = !this.backend.ventDefence;
	}

	openBay(){
		this.logEvent("openBay");
		this.rocketBayAccess = true;
		if (this.backend.rocketLanded){
			this.backend.launchRocket();
		} else {
			this.backend.landRocket();
		}
	}

	closeBay(){
		this.logEvent("closeBay");
		this.rocketBayAccess = false;
	}

	diagnostic(){//nolog
		this.backend.runDiagnostics();
	}

	mainDoor(num){
		if (!this.access){
			return;
		}
		this.logEvent("mainDoor " + num);
		this.backend.heavyDoors[num].isLocked = false;
		this.access = false;
	}

	blockLifter(){//no log
		let a = false;
		for (let b in this.backend.heavyDoors){
			if (this.backend.heavyDoors[b].isBlocked){
				a = true;
			}
		}
		if (a && !this.blockLifterGiven){
			immediateApi.getPlayer().give(new Resource(1, "blockLifter", undefined, "textures/blockLifter.png"));
		}
	}

	getSaveData(){
		if (this.isTechnical){return ""}
		let parameters = [this.individualId, this.rocketBayAccess, this.elevatorOpen, this.access, this.blockLifterGiven, -1, -1, this.constructor.name];
		let saved = parameters.join(" ");
		saved += ";";
		return saved;
	}

	setSaveData(parameters){
		let parameterNames = ["individualId", "rocketBayAccess", "elevatorOpen", "access", "blockLifterGiven"];
		let numberParams = parameters.map(Number);
		for (let a = 1; a < parameterNames.length - 1; a++){
			if (typeof numberParams[a] !== 'number'){continue}
			this[parameterNames[a]] = parameters[a] === "true";
			/*if (this[parameterNames[a]] !== numberParams[a]){
				console.error("server asyncronization: " + parameterNames[a]);
			}*/
		}
	}

	logEvent(ev){
		this.backend.eventLog += this.individualId + " " + ev + ";";
	}

	forceEvents(data){
		console.log(data);
		let parameters = data.split(" ");
		if (parameters[1] === ""){return}
		if (parameters.length < 3){
			this[parameters[1]]();
			return;
		}
		this[parameters[1]](parameters[2]);
	}
}


class Cell{
	constructor(backend = baseBackend){
		this.status = 0;
		this.enemyCap = 10;
		this.alreadyCounted = false;
		this.boundary = {x1: 100000, y1: 100000, x2: 0, y2: 0};
		this.distance = 100;
		this.hitboxes = [];
		this.entries = [];
		this.vents = [];
		this.mechanisms = [];
		this.wireEntries = [];
		this.wiringBreakpoints = [];
		this.wiringIntegrity = true;
		this.rarity = 50;
		this.backend = backend;
		this.playerIn = false;
		this.id = this.backend.cells.push(this) - 1;
	}

	defineBoundary(){
		for (let c in this.hitboxes){
			let box = this.hitboxes[c].getBorders();
			if (box[0] < this.boundary.x1){
				this.boundary.x1 = box[0]
			}
			if (box[1] > this.boundary.x2){
				this.boundary.x2 = box[1]
			}
			if (box[2] < this.boundary.y1){
				this.boundary.y1 = box[2]
			}
			if (box[3] > this.boundary.y2){	
				this.boundary.y2 = box[3]
			}
		}
	}

	highlight(){
		for (let a in this.hitboxes){
			this.hitboxes[a].highlight();
		}
	}

	signal(strength){
		this.signalStrength = strength;
		if (this.signalStrength < this.distance){
			this.distance = this.signalStrength;
			if (!this.alreadyCounted){
				this.increaseStatus(2);
				for (let a = 0; a < this.entries.length; a++){
					if (!this.entries[a].assignedDoor.isOpen){
						this.entries[a].assignedDoor.breachRoll();
					}
				}
				this.alreadyCounted = true;
			}
			if (!this.playerIn && this.status >= 50){
				for (let a = 0; a < this.entries.length; a++){
					if (this.entries[a].assignedDoor.isOpen){
						this.getEntry(a).signal(strength + 1);
					}
				}
			}
		}
	}

	electricSignal(strength){
		this.electroStrength = strength;
		if (this.electroStrength < this.voltage && this.wiringIntegrity){
			this.voltage = this.electroStrength;
			for (let a in this.mechanisms){
				this.mechanisms[a].powered = true;
			}
			for (let a = 0; a < this.wireEntries.length; a++){
				this.wireEntries[a].electricSignal(strength + 1);
			}
		}
	}

	unpower(){
		for (let b in this.mechanisms){
			this.mechanisms[b].powered = false;
		}
	}

	increaseStatus(num){
		if ((this.status > 0 || num > 0) && (this.status < 50 || num < 0)){
			this.status += num;
		}
	}

	reactInfestationStatus(){
		this.rollSpawn();
		this.countGrunts();
	}

	getStats(){
		let electro = "disabled";
		if (this.wiringIntegrity){
			electro = "functional";
		}
		let infest = "clear";
		if (this.status > 25){
			infest = "taken over";
		}
		return "Cell number " + this.id + " is " + infest + ". The wires are " + electro + ".";
	}

	rollSpawn(){
		if (this.backend.glyphidsByCell[this.id] < this.enemyCap && this.status >= 50){
			this.spawnEnemy();
			if (this.hasVent && Math.random() * 100 < 20){
				this.backend.ventCells[Math.floor(Math.random() * this.backend.ventCells.length)].spawnEnemy();
			}
		}
	}

	rollWireBreak(){
		let a = Math.random() * 100;
		if (this.wiringBreakpoints.length > 0 && this.wholeWires() > 0 && a < this.status * 0.4 + 0.0125){
			//console.log(a);
			this.wiringBreakpoints[Math.floor(Math.random() * this.wiringBreakpoints.length)].break();
			//console.log("the wires are cut!!!   " + this.id);
		}
	}

	wholeWires(){
		let num = 0;
		for (let a in this.wiringBreakpoints){
			if (this.wiringBreakpoints[a].whole){
				num++;
			}
		}
		return num;
	}

	tryFixing(){
		for (let a in this.wiringBreakpoints){
			if (!this.wiringBreakpoints[a].whole){
				return;
			}
		}
		this.wiringIntegrity = true;
	}

	spawnEnemy(){
		let b = new Grunt(this.boundary.x1, this.boundary.y1);
		b.cell = 19;
		b.allowSpawn = false;
		let t = true;
		for (let a = 0; a < immediateApi.players; a++){
			if (!immediateApi.players[a].outOfSight(b.x, b.y)){
				t = false;
				break;
			}
		}
		for (let d = 0; d < this.rarity && !(b.overlap(0, 0) && b.allowSpawn && t); d++){
			b.tp(this.boundary.x1 + Math.floor(Math.random() * (this.boundary.x2 - this.boundary.x1) * 10) / 10, this.boundary.y1 + Math.floor(Math.random() * (this.boundary.y2 - this.boundary.y1) * 10) / 10);
			b.reloadEntityZone();
			b.allowSpawn = false;
			for (let c in this.hitboxes){
				this.hitboxes[c].allowSpawn();
			}
		}
		if ((!(b.overlap(0, 0) && b.allowSpawn && t))){
			b.kill();
			return;
		}
		b.cell = this.id;
		b.cellId = this.backend.glyphids.push(b) - 1;
		b.backend = this.backend;
		b.deathPlaceholder2 = function(){
			this.backend.glyphids[this.cellId] = undefined;
		}
	}

	countGrunts(){
		let bigList = [];
		for (let a in this.hitboxes){
			bigList.push(...this.hitboxes[a].touch());
		}
		for (let a in bigList){
			if (!bigList[a].alreadyCounted && bigList[a].glyphid){
				bigList[a].alreadyCounted = true;
				bigList[a].cell = this.id;
			}
		}
	}

	getEntry(num){
		return this.entries[num].bindedCell;
	}

	access(num){
		return this.entries[num].assignedDoor.isOpen	;
	}
}


class CellBox extends Box{
	constructor(x1, x2, y1, y2, cell){
		let x = (x1 + x2) / 2;
		let y = (y1 + y2) / 2;
		super(x, y, {x1: x1 - x, x2: x2 - x, y1: y1 - y, y2: y2 - y, additional: []}, undefined, -1000, cell.backend.map);
		this.cell = cell;
		cell.hitboxes.push(this);
	}

	draw(){
		/*if (this.cell.distance < 3){
			draw.placeholderHitbox(this, this.cell.status * 0.01);
		}*/
	}

	highlight(){
		this.draw = this.draw2;
	}

	checkPlayer(){
		for (let a = 0; a < immediateApi.players.length; a++){
			if (this.touchSpecific(immediateApi.players[a])){
				this.cell.backend.checkInPlayer(this.cell.id);
				return true;
			}
		}
		return false;
	}

	draw2(){
		draw.placeholderHitbox(this);
	}

	tickPlaceholderMain(){}

	allowSpawn(){
		let a = this.touch();
		for (let b in a){
			if (a[b].glyphid){
				a[b].allowSpawn = true;
			}
		}
	}

	getBorders(){
		return [this.coordinates.x + this.hitbox.x1, this.coordinates.x + this.hitbox.x2, this.coordinates.y + this.hitbox.y1, this.coordinates.y + this.hitbox.y2];
	}
}


class PathfindingPoint extends Entity{
	constructor(x, y, connections, maP){
		super(x, y, -1000, 10000, {x1: 50, x2: -50, y1: 50, y2: -50}, maP, undefined, true);
		this.baseBackend = baseBackend;
		this.distance = [100, 100, 100, 100, 100, 100, 100];
		this.pointsId = this.baseBackend.wayPoints.push(this) - 1;
		this.connections = [];
		this.connum = connections;
	}

	draw(){
		/*draw.entity(this);
		for (let a = 0; a < this.connections.length; a++){
			draw.can.beginPath();
			draw.can.moveTo(this.x + this.map.xshift(), this.y + this.map.yshift());
			draw.can.lineTo(this.connections[a].x + this.map.xshift(), this.connections[a].y + this.map.yshift());
			draw.can.stroke();
		}
		draw.can.fillRect(this.x + this.map.xshift(), this.y + this.map.yshift(), 15, this.distance * 5 + 1);*/
	}

	find(){
		let wayPoints = [...this.baseBackend.wayPoints];
		wayPoints[this.pointsId] = undefined;
		for (let a = 0; a < this.connum; a++){
			let dis = 100000;
			let num = 0;
			let closest = undefined;
			for (let b = 0; b < wayPoints.length; b++){
				if (wayPoints[b] === undefined){continue}
				if (euclidianDistance(this.x, this.y, wayPoints[b].x, wayPoints[b].y) <= dis){
					closest = wayPoints[b];
					num = b;
					dis = euclidianDistance(this.x, this.y, wayPoints[b].x, wayPoints[b].y);
				}
			}
			this.connections[a] = closest;
			wayPoints[num] = undefined;
		}
	}

	signal(strength, player){
		this.signalStrength = strength;
		if (this.signalStrength < this.distance[player]){
			this.distance[player] = this.signalStrength;
			for (let a = 0; a < this.connections.length && this.signalStrength < 15; a++){
				this.connections[a].signal(strength + 1, player);
			}
		}
	}
}


class Wire extends ObjectHitbox{
	constructor(x1, x2, y1, y2, backend){
		super(x1 - 2, x2 + 2, y1 - 2, y2 + 2, true, undefined, undefined, backend.map);
		for (let a in this.appearances){
			this.map.loadingZones[this.appearances[a].x][this.appearances[a].y][this.appearances[a].id] = undefined;
		}
		let zonesToLoad = [
			{x: -1, y: -1}, {x: 0, y: -1}, {x: 1, y: -1}, {x: -1, y: 0}, {x: 0, y: 0}, {x: 1, y: 0}, {x: -1, y: 1}, {x: 0, y: 1}, {x: 1, y: 1}
		];
		for (let a in zonesToLoad){
			this.listAppearance(this.loadingZone.x + zonesToLoad[a].x, this.loadingZone.y + zonesToLoad[a].x, this.map.loadingZones[this.loadingZone.x + zonesToLoad[a].x][this.loadingZone.y + zonesToLoad[a].x].push(this) - 1);
		}
	}

	draw(){
		draw.wire(this)
	}
}


class WiringConnector{
	constructor(x1, y1, x2, y2, maP = map){
		let a = new Entity(x2, y2, -1000, 10000, {x1: 0, y1: 0, x2: 0, y2: 0}, maP, 50, true);
		a.tickMove = function(){this.age()};
		let b = new Entity(x1, y1, -1000, 10000, {x1: 0, y1: 0, x2: 0, y2: 0}, maP, 50, true);
		b.tickMove = function(){this.age()};
		a.other = b;
		b.other = a;
		a.connector = true;
		b.connector = true;
		a.bindedCell = [x1 / 20 - 0.5, y1 / 20 - 0.5];
		b.bindedCell = [x2 / 20 - 0.5, y2 / 20 - 0.5];
	}
}


class WireBreakpoint extends ObjectHitbox{
	constructor(x, y, x2, y2, maP = map){
		super(x + 5, x + 15, y + 5, y + 15, true, undefined, undefined, maP);
		let a = new Entity(x2, y2, -1000, 10000, {x1: 2, y1: 2, x2: 2, y2: 2}, maP, 20, true);
		a.tickMove = function(){this.age()};
		a.backlink = this;
		this.whole = true;
		this.interactive = true;
		this.interface = new WiringInterface(this);
		maP.assignIndividualId(this);
	}

	interact(ent){
		if (ent.secondTime){
			delete ent.secondTime;
			return;
		}
		if ((this.whole && !ent.activeInterfaces[4]) || (ent.touchingWires && !this.touched)){
			return;
		}
		ent.touchingWires = true;
		if (!ent.activeInterfaces[4]){
			ent.activeInterfaces[4] = true;
			this.touched = true;
            this.intId = ent.personalInterfaces.push(this.interface) - 1;
            ent.speedMultipliers[0] = 0;
		} else {
			ent.activeInterfaces[4] = false;
			this.touched = false;
			ent.personalInterfaces[this.intId] = undefined;
			ent.speedMultipliers[0] = 1;
			delete ent.touchingWires;
		}
		ent.secondTime = true;
		new InteractivityHitbox(ent);
	}

	draw(){
		if (!this.whole){
			new EletroParticle(this);
		}
	}

	break(){
		this.bindedCell.wiringIntegrity = false;
		this.interface.brokenWire.status = 0;
		this.whole = false;
	}

	fix(){
		this.whole = true;
		this.bindedCell.tryFixing();
	}

	getSaveData(){
		if (this.isTechnical){return ""}
		let parameters = [this.individualId, this.whole, this.interface.brokenWire.status, undefined, undefined, undefined, undefined, this.constructor.name];
		return(parameters.join(" "));
	}

	setSaveData(parameters){
		this.whole = parameters[1] === "true";
		this.interface.brokenWire.status = parseFloat(parameters[2]);
	}

	logEvent(ev){
		baseBackend.eventLog += this.individualId + " " + ev + ";";
	}

	forceEvents(data){
		let parameters = data.split(" ");
		this.interface.brokenWire.status = parseFloat(parameters[1]);
		if (parameters[1] === "2"){
			this.fix();
		}
	}
}


class WiringInterface extends Interface{
	constructor(point){
		super(150, 450, 225, 375);
		this.point = point;
		let bg = new InterfaceElement(this, 150, 450, 225, 375);
		this.brokenWire = new InterfaceElement(this, 200, 400, 275, 325);
		this.brokenWire.status = 0;
		this.elements[0].draw = function(){
			draw.wiringBg(this);
		}
		bg.draw = function(){
			draw.wireFrame(this);
		}
		this.brokenWire.draw = function(){
			draw.brokenWire(this);
		}
		this.brokenWire.functionality = function(){
			if (immediateApi.getPlayer().inventory.mainhand[0].type === "wirecutters" && this.status === 0){
				this.status = 1;
				this.parentInterface.point.logEvent("1");
			}
			if (immediateApi.getPlayer().inventory.mainhand[0].type === "replacementWire" && this.status === 1){
				this.parentInterface.fix();
				this.parentInterface.point.logEvent("2");
			}
		}
	}

	fix(){
		this.brokenWire.status = 2;
		this.point.fix();
	}
}


class BaseDoor extends ObjectHitbox{
	constructor(x1, x2, y1, y2, maP, base = baseBackend, isHeavy = false, terminalX, terminalY){
		super(x1, x2, y1, y2, undefined, undefined, undefined, maP);
		let direction = Math.abs(x2 - x1) > Math.abs(y2 - y1);
		this.dir = 0;
		this.direction = direction;
		this.backend = base;
		this.isHeavy = isHeavy;
		this.powered = true;
		this.isOpen = false;
		this.isLocked = false;
		this.isBlocked = false;
		this.integrity = 1;
		this.moving = false;
		this.stage = 20;
		this.entities = [];
		new DoorEntity((x1 + x2) / 2 + (x2 - x1) * !direction, (y1 + y2) / 2 + (y2 - y1) * direction, maP, this);
		new DoorEntity((x1 + x2) / 2 - (x2 - x1) * !direction, (y1 + y2) / 2 - (y2 - y1) * direction, maP, this);
		if (isHeavy){
			this.cooldown = 2000;
			this.spawnHeavyDoorTerminal(terminalX + 10, terminalY + 10);
			base.heavyDoors.push(this);
		} else {
			this.cooldown = 200;
			this.interactive = true;
		}
		base.doors.push(this);
		this.map.assignIndividualId(this);
	}

	draw(){
		draw.door(this);
		//console.log(this.stage);
	}

	interact(){
		if (!this.moving){
			this.logEvent("interact");
			this.moving = true;
			if (this.fake){
				this.close();
			} else {
				this.open();
			}
		}
	}

	spawnHeavyDoorTerminal(x, y){
		this.interactive = false;
		this.terminal = new DoorTerminal(this, x, y);
	}

	moveTick(obj, dir = undefined){
		if (dir !== undefined){
			obj.dir = dir;
		}
		if (obj.stage === obj.dir){
			return;
		}
		obj.stage += Math.sign(obj.dir - obj.stage);
		setTimeout(obj.moveTick, obj.map.framerate, obj);
	}

	leverSwitch(){
		if ((!this.isLocked && !this.isBlocked && this.powered)){
			if (immediateApi.constructor.name === "Client"){
				this.logEvent("leverSwitch");
				return;
			}
			this.interact();
			return;
		}
		if (immediateApi.constructor.name === "Client" && (!this.powered && !this.isLocked && !this.isBlocked && immediateApi.getPlayer().inventory.mainhand[0].type === "crowbar")){
			this.interact();
			return;
		}
	}

	open(){
		this.moving = true;
		this.isOpen = true;
		setTimeout((obj) => {obj.fake = true; obj.moveTick(obj, 0); obj.moving = false}, this.cooldown, this);
	}

	close(){
		this.moving = true;
		this.isOpen = false;
		setTimeout((obj) => {obj.fake = false; new PushOutBox(20, this, 4); obj.moveTick(obj, 20); obj.moving = false}, this.cooldown, this);
	}

	lock(){
		this.isLocked = true;
		this.close();
	}

	block(){
		this.logEvent("block");
		this.isBlocked = true;
		this.close();
	}

	unlock(){
		this.isLocked = false;
	}

	unblock(){
		this.isBlocked = false;
	}

	breachRoll(){
		let a = Math.random() * 100;
		let chance = 0.06;
		if (this.isHeavy){
			chance *= 4 * !this.powered + 1;
			chance *= -0.5 * (this.isLocked && this.powered) + 1;
		} else {
			chance = 2;
		}
		if (this.isBlocked){
			chance = 0.03;
		}
		if (a < chance){
			this.breach();
		}
		//console.log("rolled for breach: " + a + " out of " + chance);
	}

	breach(){
		this.isBlocked = true;
		console.log("!!!door breached!!!");
		this.open();
	}	

	getSaveData(){
		if (this.isTechnical){return ""}
		let parameters = [this.individualId, this.powered, this.isOpen, this.isLocked, this.isBlocked, this.stage, this.integrity, this.constructor.name, this.moving, this.fake, this.dir];
		return(parameters.join(" "));
	}

	setSaveData(parameters){
		let parameterNames = ["individualId", "powered", "isOpen", "isLocked", "isBlocked", "stage", "integrity"];
		let numberParams = parameters.map(Number);
		for (let a = 1; a < parameterNames.length; a++){
			if (isNaN(numberParams[a])){
				this[parameterNames[a]] = parameters[a] === "true";
				continue;
			}
			this[parameterNames[a]] = numberParams[a];
			if (this[parameterNames[a]] !== numberParams[a]){
				console.error("server asyncronization: " + parameterNames[a]);
			}
		}
		this.moving = parameters[8] == "true";
		this.fake = parameters[9] == "true";
		this.dir = parseFloat(parameters[10]);
	}

	logEvent(ev){
		this.backend.eventLog += this.individualId + " " + ev + ";";
	}

	forceEvents(data){//one event
		let parameters = data.split(" ");
		if (parameters[1] === ""){return}
		this[parameters[1]]();
	}
}


class DoorTerminal extends MainTerminal{
	constructor(connected, x, y){
		let a = new DoorInterface();
		super(x, x + 20, y, y + 20, 2, a, connected.map);
		this.bound = connected;
		a.terminal = this;
	}

	draw(){
		draw.doorTerminal(this);
	}

	leverSwitch(){
		this.bound.leverSwitch();
	}

	block(){
		this.bound.block();
	}
}


class DoorInterface extends Interface{
	constructor(terminal){
		super(150, 450, 225, 375);
		this.terminal = terminal;
		this.lever = new InterfaceElement(this, 180, 285, 255, 345);
		this.lockdown = new InterfaceElement(this, 315, 420, 255, 345);
		this.elements[0].draw = function(){
			draw.wiringBg(this);
		}
		this.lever.draw = function(){
			draw.lever(this, this.parentInterface.terminal.bound.isOpen);
		}
		this.lockdown.drawActive = function(){
			draw.button(this, true, this.parentInterface.terminal.bound.isBlocked);
		}
		this.lockdown.drawUnactive = function(){
			draw.button(this, false, this.parentInterface.terminal.bound.isBlocked);
		}
		this.lever.functionality = function(){
			this.parentInterface.terminal.leverSwitch();
		}
		this.lockdown.functionality = function(){
			this.parentInterface.terminal.block();
			if (this.parentInterface.terminal.bound.isBlocked && immediateApi.getPlayer().inventory.mainhand[0].type === "blockLifter"){
				this.parentInterface.terminal.bound.unblock();
				immediateApi.getPlayer().inventory.mainhand[0].decrease(1);
				this.parentInterface.terminal.bound.backend.mainTerminal.blockLifterGiven = false;
			}
		}
	}
}


class DoorEntity extends Entity{
	constructor(x, y, maP, door, backend = baseBackend){
		super(x + 1, y + 1, -1000, 10000, {x1: 10, x2: -10, y1: 10, y2: -10}, maP, undefined, true);
		this.backend = backend;
		this.backend.doorEntities.push(this);
		this.assignedDoor = door;
		this.doorId = door.entities.push(this) - 1;
	}

	getOther(){
		return(this.assignedDoor.entities[!this.doorId * 1]);
	}

	draw(){}

	tickPlaceholderMain(){}
}


class VentTerminal extends MainTerminal{
	constructor(x1, x2, y1, y2, cell, maP = map, backend = baseBackend){
		let a = new VentInterface(backend);
		super(x1, x2, y1, y2, 5, a, maP);
		backend.cells[cell].mechanisms.push(this);
		backend.coolingSystems.push(this);
		a.terminal = this;
	}

	draw(){
		draw.ventTerminal(this);
	}
}


class VentInterface extends Interface{
	constructor(backend){
		super(150, 450, 225, 375);
		this.backend = backend;
		this.elements[0].draw = function(){
			draw.ventBg(this);
		}
		let a = new InterfaceElement(this, 238, 242, 238, 242);
		a.draw = function(){
			if (this.parentInterface.backend.ventDefence){
				draw.can.fillStyle = "green";
			} else {
				draw.can.fillStyle = "red";
			}
			draw.can.fillRect(this.hitbox.x1, this.hitbox.y1, this.hitbox.x2 - this.hitbox.x1, this.hitbox.y2 - this.hitbox.y1);
		}
		a = new InterfaceButton(240, 300, this, 100, true);
		a.functionality = function(){this.parentInterface.defence()}
		a = new InterfaceButton(360, 300, this, 100, true);
		a.functionality = function(){this.parentInterface.vent()}
	}

	defence(){
		this.backend.ventDefence = !this.backend.ventDefence;
	}

	vent(){
		this.backend.ventOn = !this.backend.ventOn;
	}
}


class Code{
	constructor(inter, funct, code){
		inter.codes.push(this);
		this.inter = inter;
		this.funct = funct;
		this.code = code;
	}

	functionality(){
		this.inter[this.funct]();
	}
}


class InterfaceButton extends InterfaceElement{
	constructor(x, y, parent, size = 60, lever = false){
		super(parent, x - size / 2, x + size / 2, y - size / 2, y + size / 2);
		this.isPushed = false;
		if (lever){
			this.draw = function(){
				draw.lever(this, this.isPushed);
			}
			this.functionality2 = function(){
				this.isPushed = !this.isPushed;
			}
		} else {
			this.functionality2 = function(){
				this.isPushed = true;
				setTimeout((obj) => {obj.isPushed = false}, 400, this);
			}
			this.draw = function(){
				draw.button2(this, this.isPushed);
			}
		}
	}
}
function invisibleButton(xs, ys, inter){
	for (let a in xs){
		let b = new InterfaceButton(xs[a], ys[a], inter, 15);
		b.draw = function(){}
		b.symbol = parseInt(a);
		b.functionality = function(){
			if (this.parentInterface.display.code.length < 5){
				this.parentInterface.display.code.push([this.symbol]);
			}
		}
	}
}


class Cart extends Entity{
	constructor(x, y, maP = map, backend = baseBackend){
		super(x, y, -1000, 10000, {x1: -15, x2: 15, y1: -15, y2: 15}, maP);
		this.backend = backend;
		this.backend.cart = this;
		this.linked = [false, false, false, false, false, false, false, false, false];
		this.fuel = 0;
		this.oxygen = 0;
		this.water = 0;
		this.spacing = {x: 0, y: 0};
		this.block = new ObjectHitbox(this.x + this.hitbox.x1, this.x + this.hitbox.x2, this.y + this.hitbox.y1, this.y + this.hitbox.y2, false, this.x, this.y, this.map);
		this.block.draw = function(){}
		maP.assignIndividualId(this.block);
		this.block.backlink = this;
		this.block.interactive = true;
		this.block.forceEvents = function(data){//only interact
			let parameters = data.split(" ");
			if (parameters[1] === ""){return}
			this[parameters[1]](this.backlink.backend.map.individualObjects[parameters[2]], parameters[3], parameters[4]);
		}
		this.block.interact = function(ent, x = immediateApi.getPlayer().x, y = immediateApi.getPlayer().y){
			if (!this.backlink.linked[immediateApi.players.indexOf(ent)] && this.backlink.getIfLinked()){return}
			this.backlink.backend.eventLog += this.individualId + " interact " + immediateApi.getPlayer().individualId + " " + x + " " + y + ";";
			this.backlink.linked[immediateApi.players.indexOf(ent)] = !this.backlink.linked[immediateApi.players.indexOf(ent)];
			if (this.backlink.linked[immediateApi.players.indexOf(ent)]){
				this.backlink.spacing.x = this.x - x;
				this.backlink.spacing.y = this.y - y;
				this.hitbox = {x1: -11.5, x2: 11.5, y1: -11.5, y2: 11.5};
				immediateApi.getPlayer().speedMultipliers[2] = 0.8;
			} else {
				this.hitbox = {x1: -15, x2: 15, y1: -15, y2: 15};
				immediateApi.getPlayer().speedMultipliers[2] = 1;
			}
		}
	}

	getIfLinked(){
		let t = false;
		for (let a in this.linked){
			t = this.linked[a] || t;
		}
		return t;
	}

	draw(){
		draw.cart(this);
	}

	tickPlaceholderMain(){
		for (let a in immediateApi.players){
			if (this.linked[a]){
				this.tp(immediateApi.players[a].x + this.spacing.x, immediateApi.players[a].y + this.spacing.y);
				return;
			}
			if (this.x - this.backend.heavyDoors[7].x > 0 && this.x - this.backend.heavyDoors[7].x < 60 && Math.abs(this.y - this.backend.heavyDoors[7].y) < 20 && !this.backend.heavyDoors[7].isOpen){
				this.backend.heavyDoors[7].interact();
			}
		}
	}

	tp(x, y){
		this.block.fake = true;
		if (this.overlap(x - this.x, y - this.y)){
			this.x = x;
			this.y = y;
		} else {
			immediateApi.getPlayer().movePlayer(-immediateApi.getPlayer().moveVectoring.x, -immediateApi.getPlayer().moveVectoring.y);//TODO костыль исправить
		}
		if (!this.overlap(0, 0)){
			this.hitbox = {x1: 15, x2: -15, y1: 15, y2: -15, additional: []};
			this.tp(immediateApi.getPlayer().x + this.spacing.x, immediateApi.getPlayer().y + this.spacing.y);
			this.hitbox = {x1: -15, x2: 15, y1: -15, y2: 15, additional: []};
		}
		this.block.fake = false;
		this.reloadEntityZone();
		this.block.x = this.x;
		this.block.y = this.y;
		this.block.additionalHitboxes();
	}

	move(x = 0, y = 0){
		this.block.fake = true;
		if (this.overlap(x, y)){
			this.x += x;
			this.y += y;
		} else {
			this.contact({x: x, y: y});
		}
		this.block.fake = false;
		this.reloadEntityZone();
		this.block.x = this.x;
		this.block.y = this.y;
		this.block.additionalHitboxes();
	}

	unstuck(){
		if (immediateApi.getPlayer().overlapList().indexOf(this.block) >= 0){
			immediateApi.getPlayer().move(20, 0);
			immediateApi.getPlayer().move(-20, 0);
			immediateApi.getPlayer().move(0, 20);
			immediateApi.getPlayer().move(0, -20);
		}
	}

	getSaveData(){
		if (this.isTechnical){return ""}
		let parameters = [this.individualId, this.x, this.y, this.life, this.hp, this.block.hitbox.x1, this.linked.join("#"), this.constructor.name, this.fuel, this.oxygen, this.water];
		return(parameters.join(" "));
	}

	setSaveData(parameters){
		let parameterNames = ["individualId", "x", "y", "life", "hp", "hitbox", "linked"];
		let b = parameters[6].split("#");
		for (let a in b){
			this[parameterNames[6]][a] = b[a] === "true";
			if (this.linked === false || this.linked === true){
				console.error("critical pizdets");
			}
		}
		if (parameters[5] <= -15){
			this.block.hitbox = {x1: -15, x2: 15, y1: -15, y2: 15, additional: []};
		} else {
			this.block.hitbox = {x1: -11.5, x2: 11.5, y1: -11.5, y2: 11.5};
		}
		let numberParams = parameters.map(Number);
		for (let a = 1; a < parameterNames.length - 3; a++){
			if (typeof numberParams[a] !== 'number'){continue}
			this[parameterNames[a]] = numberParams[a];
			if (this[parameterNames[a]] !== numberParams[a]){
				console.error("server asyncronization: " + parameterNames[a]);
			}
		}
		parameterNames = ["fuel", "oxygen", "water"];
		for (let a = 0; a < parameterNames.length; a++){
			this[parameterNames[a]] = numberParams[a + 8];
		}
		this.tp(parseFloat(parameters[1]), parseFloat(parameters[2]));
	}
}


class CartFiller extends Box{
	constructor(x, y, maP = map, type = "rocketType", backend = baseBackend){
		super(x, y, {x1: -10, x2: 10, y1: -10, y2: 10}, undefined, -1000, maP);
		this.type = type;
		this.ready = 0;
		this.backend = backend;
		this.fuel = 0;
		this.water = 0;
		this.oxygen = 0;
		this[this.type]();
		maP.assignIndividualId(this);
	}

	rocketType(){
		this.backend.rocketRefueller = this;
		this.tickPlaceholderMain = this.tick1;
	}

	reactorType(){
		this.backend.reactorPort = this;
		this.fuel = 20;
		this.tickPlaceholderMain = this.tick2;
	}

	vaultType1(){
		this.tickPlaceholderMain = this.tick3;
	}

	vaultType2(){
		this.tickPlaceholderMain = this.tick4;
	}

	waterType(){
		this.oxygen = 20;
		this.water = 20;
		this.tickPlaceholderMain = this.tick5;
		this.backend.supplies = this;
	}

	tickPlaceholderMain(){}

	tick1(){
		if (this.ready === 10 && this.touchSpecific(this.backend.cart)){
			if (this.fuel > 0 && this.backend.cart.fuel < 20){
				this.fuel--;
				this.backend.cart.fuel++;
			}
			if (this.water > 0 && this.backend.cart.water < 10){
				this.water--;
				this.backend.cart.water++;
			}
			if (this.oxygen > 0 && this.backend.cart.oxygen < 10){
				this.oxygen--;
				this.backend.cart.oxygen++;
			}
		}
		this.ready++
		if (this.ready > 10){
			this.ready = 0;
		}
	}

	tick2(){
		if (this.ready === 10 && this.touchSpecific(this.backend.cart) && this.fuel < 40 && this.backend.cart.fuel > 0){
			this.backend.cart.fuel--;
			this.fuel++;
		}
		this.ready++
		if (this.ready > 10){
			this.ready = 0;
		}
	}

	tick3(){
		if (this.ready === 10 && this.touchSpecific(this.backend.cart) && this.backend.vault[this.reductionType] < 100 && this.backend.cart[this.reductionType] > 0){
			this.backend.cart[this.reductionType]--;
			this.backend.vault[this.reductionType]++;
		}
		this.ready++
		if (this.ready > 10){
			this.ready = 0;
		}
	}

	tick4(){
		if (this.ready === 10 && this.touchSpecific(this.backend.cart) && this.backend.vault[this.reductionType] > 0 && (this.backend.cart[this.reductionType] < 20 && this.reductionType === "fuel" || this.backend.cart[this.reductionType] < 10 && this.reductionType !== "fuel")){
			this.backend.cart[this.reductionType]++;
			this.backend.vault[this.reductionType]--;
		}
		this.ready++
		if (this.ready > 10){
			this.ready = 0;
		}
	}

	tick5(){
		console.log(this.water, this.backend.cart.water);
		if (this.ready === 10 && this.touchSpecific(this.backend.cart)){
			if (this.water < 20 && this.backend.cart.water > 0){
				this.water++;
				this.backend.cart.water--;
			}
			if (this.oxygen < 20 && this.backend.cart.oxygen > 0){
				this.oxygen++;
				this.backend.cart.oxygen--;
			}
		}
		this.ready++
		if (this.ready > 10){
			this.ready = 0;
		}
	}

	getSaveData(){
		if (this.isTechnical){return ""}
		let parameters = [this.individualId, this.fuel, this.oxygen, this.water, undefined, undefined, undefined, this.constructor.name];
		return(parameters.join(" "));
	}

	setSaveData(parameters){
		console.log("savedata edited");
		let parameterNames = ["individualId", "fuel", "oxygen", "water"];
		let numberParams = parameters.map(Number);
		for (let a = 1; a < parameterNames.length - 3; a++){
			if (typeof numberParams[a] !== 'number'){continue}
			this[parameterNames[a]] = numberParams[a];
			if (this[parameterNames[a]] !== numberParams[a]){
				console.error("server asyncronization: " + parameterNames[a]);
			}
		}
	}
}


class WaterTank extends ObjectHitbox{
	constructor(x1, y1, x2,y2){
		super(x1, x2, y1, y2);
		this.interactive = true;
		this.map.assignIndividualId(this);
	}

	draw(){
		draw.waterTank(this, baseBackend.supplies.water);
	}

	interact(){
		if (immediateApi.constructor.name === "Server"){
			baseBackend.supplies.water -= 20;
			return;
		}//TODO inventory sync
		if (immediateApi.getPlayer().inventory.mainhand[0].type === "unHydratedBurger" && baseBackend.supplies.water >= 20){
			this.logEvent("interact");
			baseBackend.supplies.water -= 20;
			immediateApi.getPlayer().inventory.mainhand[0].hydrate();
		}
	}

	logEvent(ev){
		baseBackend.eventLog += this.individualId + " " + ev + ";";
	}

	forceEvents(data){
		console.log(data);
		let parameters = data.split(" ");
		if (parameters[1] === ""){return}
		if (parameters.length < 3){
			this[parameters[1]]();
			return;
		}
		console.log(parameters[1]);
		this[parameters[1]]();
	}
}


class Vault{
	constructor(x1, y1, x2, y2, x3, y3, maP = map, backend = baseBackend){
		this.backend = backend;
		this.backend.vault = this;
		this.fuel = 0;
		this.oxygen = 0;
		this.water = 0;
		this.mainBody = new ObjectHitbox(x1, x2, y1, y2, undefined, undefined, undefined, maP);
		this.mainBody.vault = this;
		this.mainBody.draw = function(){
			draw.vaultModule(this);
		}
		this.tube = new ObjectHitbox(x1, x3, y2, y3, undefined, undefined, undefined, maP);
		this.tube.draw = function(){
			draw.vaultTube(this);
		}
		let a = new CartFiller(x3, (y3 - y2) / 8 * 3 + y2, maP, "vaultType1");
		a.reductionType = "oxygen";
		a = new CartFiller(x3, (y3 - y2) / 8 * 5 + y2, maP, "vaultType1");
		a.reductionType = "water";
		a = new CartFiller(x3, (y3 - y2) / 8 * 7 + y2, maP, "vaultType1");
		a.reductionType = "fuel";
		a = new CartFiller((x2 - x3) / 6 * 3 + x1, y2, maP, "vaultType2");
		a.reductionType = "oxygen";
		a = new CartFiller((x2 - x3) / 6 * 5 + x1, y2, maP, "vaultType2");
		a.reductionType = "water";
		a = new CartFiller((x2 - x3) / 6 * 7 + x1, y2, maP, "vaultType2");
		a.reductionType = "fuel";
	}
}


class FoodDispencer extends ObjectHitbox{
	constructor(x, y){
		super(x - 20, x + 20, y - 20, y + 20);
		this.interactive = true;
		this.hasFood = false;
		baseBackend.foodDispencer = this;
	}

	draw(){
		draw.foodDispencer(this);
	}

	interact(){
		if (this.hasFood){
			immediateApi.getPlayer().give(new Burger);
			this.hasFood = false;
		}
	}
}


class Burger extends Resource{
	constructor(){
		super(1, "unHydratedBurger", undefined, "textures/burger1.png");
	}

	hydrate(){
		this.type = "burger";
		this.icon.src = "textures/burger2.png";
	}

	use(){
		if (this.type === "burger"){
			this.decrease(1);
			immediateApi.getPlayer().heal(100);
		}
	}
}


class PushOutBox extends Box{
	constructor(life, boundWith, force = 3){
		super(boundWith.x, boundWith.y, boundWith.hitbox, undefined, life, boundWith.map);
		this.force = force;
		this.bound = boundWith;
	}

	tickPlaceholderMain(){
		this.bound.fake = true;
		let contacts = this.touch();
		for (let a in contacts){
			contacts[a].move(this.force * !this.bound.direction * Math.sign(contacts[a].x - this.coordinates.x), this.force * this.bound.direction * Math.sign(contacts[a].y - this.coordinates.y));
		}
		this.bound.fake = false;
		this.age();
	}
}


class MeltdownParticle extends Particle{
	constructor(maP = map){
		super(0, 0, 100, undefined, maP);
	}

	draw(){
		draw.meltdownParticle();
	}
}


function raycast(source, speed, destination){
	let a = new Entity(source.x, source.y, -1000, 10000, {x1: 0, x2: 0, y1: 0, y2: 0}, source.map, 100, true);
	let stepProjections = projections(destination.x - source.x, destination.y - source.y, speed);
	while(a.life > 0){
		a.age();
		if (a.moveWithoutRounding(stepProjections.x, stepProjections.y)){
			a.kill();
			return false;
		}
		if (euclidianDistance(a.x, a.y, destination.x, destination.y) <= speed){
			break;
		}
	}
	a.kill();
	return true;
}


/*module.exports.BaseBackend = BaseBackend;
module.exports.MainTerminal = MainTerminal;
module.exports.MainTerminalInterface = MainTerminalInterface;
module.exports.Cell = Cell;
module.exports.CellBox = CellBox;
module.exports.PathfindingPoint = PathfindingPoint;
module.exports.Wire = Wire;
module.exports.WiringConnector = WiringConnector;
module.exports.WireBreakpoint = WireBreakpoint;
module.exports.WiringInterface = WiringInterface;
module.exports.BaseDoor = BaseDoor;
module.exports.DoorTerminal = DoorTerminal;
module.exports.DoorInterface = DoorInterface;
module.exports.DoorEntity = DoorEntity;
module.exports.VentTerminal = VentTerminal;
module.exports.VentInterface = VentInterface;
module.exports.Code = Code;
module.exports.InterfaceButton = InterfaceButton;
module.exports.invisibleButton = invisibleButton;
module.exports.Cart = Cart;
module.exports.CartFiller = CartFiller;
module.exports.WaterTank = WaterTank;
module.exports.Vault = Vault;
module.exports.FoodDispencer = FoodDispencer;
module.exports.Burger = Burger;
module.exports.PushOutBox = PushOutBox;
module.exports.MeltdownParticle = MeltdownParticle;
module.exports.raycast = raycast;*/
/*export {
	raycast,
	MeltdownParticle,
	PushOutBox,
	Burger,
	FoodDispencer,
	Vault,
	WaterTank,
	CartFiller,
	Cart,
	invisibleButton,
	InterfaceButton,
	Code,
	VentInterface,
	VentTerminal,
	DoorEntity,
	DoorInterface,
	DoorTerminal,
	BaseDoor,
	WiringInterface,
	WireBreakpoint,
	WiringConnector,
	Wire,
	PathfindingPoint,
	CellBox,
	Cell,
	MainTerminalInterface,
	MainTerminal,
	BaseBackend
}*/
/*import {projections, defenceCount, spreadCounter, turn, euclidianDistance} from "./Formulas.js";
import {Draw} from "./Draw.js";
import {keyDownHandler, keyUpHandler, mouseMoveHandler, clickHandler} from "./InputHandler.js";
import {Box, Tool, PlaceholderItem, Resource, Particle, StatusEffect, Entity, ObjectHitbox, BackgroundImage, Map, ShadowRealm, Interface, InterfaceElement, InteractivityHitbox, DevKit} from "./Classes.js";
import {Player, Inventory, HUD, ItemSlot, ItemSlotHotbar, Minimap, MapMarker} from "./Player.js";
import {Glyphid, meleeAttackHitbox, Grunt, Swarmer, Praetorian, Bullet, Weapon, Flame, Breaker, Missile, Flamethrower, CaveGenerator, WeaponEditor, BloodParticle, EletroParticle} from "./Drg.js";
import {WeaponHandle, Primary, ItemSlotWeapon} from "./AdvancedWeaponarySystems.js";
import {LevelEditor, GridParticle, WallBlock, Rock, Stone, Floor, Ladder, VentEntry, VentEntryBox, Elevator, ElevatorBox, ElevatorButton, mainScheme} from "./LevelEditor.js";
import {
	raycast,
	MeltdownParticle,
	PushOutBox,
	Burger,
	FoodDispencer,
	Vault,
	WaterTank,
	CartFiller,
	Cart,
	invisibleButton,
	InterfaceButton,
	Code,
	VentInterface,
	VentTerminal,
	DoorEntity,
	DoorInterface,
	DoorTerminal,
	BaseDoor,
	WiringInterface,
	WireBreakpoint,
	WiringConnector,
	Wire,
	PathfindingPoint,
	CellBox,
	Cell,
	MainTerminalInterface,
	MainTerminal,
	BaseBackend
} from "./BaseBackend.js";*/
/*
let Formulasjs = require("./Formulas.js");
let Drawjs = require("./Draw.js");
let InputHandlerjs = require("./InputHandler.js");
let Classesjs = require("./Classes.js");
let Playerjs = require("./Player.js");
let Drgjs = require("./Drg.js");
let AdvancedWeaponarySystemsjs = require("./AdvancedWeaponarySystems.js");
let LevelEditorjs = require("./LevelEditor.js");
let BaseBackendjs = require("./BaseBackend.js");
let projections = Formulasjs.projections;
let defenceCount = Formulasjs.defenceCount;
let spreadCounter = Formulasjs.spreadCounter;
let turn = Formulasjs.turn;
let euclidianDistance = Formulasjs.euclidianDistance;
let Draw = Drawjs.Draw;
let keyDownHandler = InputHandlerjs.keyDownHandler;
let keyUpHandler = InputHandlerjs.keyUpHandler;
let mouseMoveHandler = InputHandlerjs.mouseMoveHandler;
let clickHandler = InputHandlerjs.clickHandler;
let Box = Classesjs.Box;
let Tool = Classesjs.Tool;
let PlaceholderItem = Classesjs.PlaceholderItem;
let Resource = Classesjs.Resource;
let Particle = Classesjs.Particle;
let StatusEffect = Classesjs.StatusEffect;
let Entity = Classesjs.Entity;
let ObjectHitbox = Classesjs.ObjectHitbox;
let BackgroundImage = Classesjs.BackgroundImage;
let Map = Classesjs.Map;
let ShadowRealm = Classesjs.ShadowRealm;
let Interface = Classesjs.Interface;
let InterfaceElement = Classesjs.InterfaceElement;
let InteractivityHitbox = Classesjs.InteractivityHitbox;
let DevKit = Classesjs.DevKit;
let Player = Playerjs.Player;
let Inventory = Playerjs.Inventory;
let HUD = Playerjs.HUD;
let ItemSlot = Playerjs.ItemSlot;
let ItemSlotHotbar = Playerjs.ItemSlotHotbar;
let Minimap = Playerjs.Minimap;
let MapMarker = Playerjs.MapMarker;
let Glyphid = Drgjs.Glyphid;
let meleeAttackHitbox = Drgjs.meleeAttackHitbox;
let Grunt = Drgjs.Grunt;
let Swarmer = Drgjs.Swarmer;
let Praetorian = Drgjs.Praetorian;
let Bullet = Drgjs.Bullet;
let Weapon = Drgjs.Weapon;
let Flame = Drgjs.Flame;
let Breaker = Drgjs.Breaker;
let Missile = Drgjs.Missile;
let Flamethrower = Drgjs.Flamethrower;
let CaveGenerator = Drgjs.CaveGenerator;
let WeaponEditor = Drgjs.WeaponEditor;
let BloodParticle = Drgjs.BloodParticle;
let EletroParticle = Drgjs.EletroParticle;
let WeaponHandle = AdvancedWeaponarySystemsjs.WeaponHandle;
let Primary = AdvancedWeaponarySystemsjs.Primary;
let ItemSlotWeapon = AdvancedWeaponarySystemsjs.ItemSlotWeapon;
let LevelEditor = LevelEditorjs.LevelEditor;
let GridParticle = LevelEditorjs.GridParticle;
let WallBlock = LevelEditorjs.WallBlock;
let Rock = LevelEditorjs.Rock;
let Stone = LevelEditorjs.Stone;
let Floor = LevelEditorjs.Floor;
let Ladder = LevelEditorjs.Ladder;
let VentEntry = LevelEditorjs.VentEntry;
let VentEntryBox = LevelEditorjs.VentEntryBox;
let Elevator = LevelEditorjs.Elevator;
let ElevatorBox = LevelEditorjs.ElevatorBox;
let ElevatorButton = LevelEditorjs.ElevatorButton;
const mainScheme = LevelEditorjs.mainScheme;
let raycast = BaseBackendjs.raycast;
let MeltdownParticle = BaseBackendjs.MeltdownParticle;
let PushOutBox = BaseBackendjs.PushOutBox;
let Burger = BaseBackendjs.Burger;
let FoodDispencer = BaseBackendjs.FoodDispencer;
let Vault = BaseBackendjs.Vault;
let WaterTank = BaseBackendjs.WaterTank;
let CartFiller = BaseBackendjs.CartFiller;
let Cart = BaseBackendjs.Cart;
let invisibleButton = BaseBackendjs.invisibleButton;
let InterfaceButton = BaseBackendjs.InterfaceButton;
let Code = BaseBackendjs.Code;
let VentInterface = BaseBackendjs.VentInterface;
let VentTerminal = BaseBackendjs.VentTerminal;
let DoorEntity = BaseBackendjs.DoorEntity;
let DoorInterface = BaseBackendjs.DoorInterface;
let DoorTerminal = BaseBackendjs.DoorTerminal;
let BaseDoor = BaseBackendjs.BaseDoor;
let WiringInterface = BaseBackendjs.WiringInterface;
let WireBreakpoint = BaseBackendjs.WireBreakpoint;
let WiringConnector = BaseBackendjs.WiringConnector;
let Wire = BaseBackendjs.Wire;
let PathfindingPoint = BaseBackendjs.PathfindingPoint;
let CellBox = BaseBackendjs.CellBox;
let Cell = BaseBackendjs.Cell;
let MainTerminalInterface = BaseBackendjs.MainTerminalInterface;
let MainTerminal = BaseBackendjs.MainTerminal;
let BaseBackend = BaseBackendjs.BaseBackend;*/


class Server{
	constructor(route = true){
		if (route){
			const http = require("http");
			var fs = require('fs');
			var path = require('path');
			http.createServer(function(request,response){
				//console.log("request started: " + request.url);
				var filePath = "." + request.url;
				if (filePath.startsWith("./game")) {
					var extname = path.extname(filePath);
					var contentType = 'text/html';
					switch (extname) {
						case '.js':
							contentType = 'text/javascript';
							break;
						case '.css':
							contentType = 'text/css';
							break;
						case '.json':
							contentType = 'application/json';
							break;
						case '.png':
							contentType = 'image/png';
							break;      
						case '.jpg':
							contentType = 'image/jpg';
							break;
						case '.wav':
							contentType = 'audio/wav';
							break;
					}

					fs.readFile(filePath, function(error, content) {
						if (error) {
							if(error.code == 'ENOENT'){
								fs.readFile('./404.html', function(error, content) {
									response.writeHead(200, { 'Content-Type': contentType });
									response.end(content, 'utf-8');
								});
							}
							else {
								response.writeHead(500);
								response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
								response.end(); 
							}
						}
						else {
							response.writeHead(200, { 'Content-Type': contentType });
							response.end(content, 'utf-8');
						}
					});
				} else {
				
					/*response.setHeader('Access-Control-Allow-Origin', '*');
					response.setHeader('Access-Control-Request-Method', '*');
					response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
					response.setHeader('Access-Control-Allow-Headers', '*');*/
					if (request.method === "POST"){
						let body = [];
						request
						.on('data', chunk => {
							body.push(chunk);
						})
						.on('end', () => {
							body = Buffer.concat(body).toString();// at this point, `body` has the entire request body stored in it as a string
							immediateApi.clientInfo[parseInt(Array.from('some string')[0])] = body;
							//console.log(body);
						});
						response.end();
					} else {
						//console.log("data sent to client");
						response.end(immediateApi.savedState);
					}
				}
			}).listen(3000, "0.0.0.0");
		}
		this.devKit = new DevKit;
		this.activePlayerId = 0;
		this.savedState = "";
		this.clientInfo = [];
		this.syncCounter = 0;
		this.summoningCircle = {
			Grunt: function(id, x, y, useless1, useless2, useless3, useless4){
				let a = new Grunt(x, y);
				a.map.reassignIndividualId(a, id);
			},
			Player: function(id, useless1, useless2, useless3, useless4, useless5, useless6, useless7 = undefined){},
			BaseDoor: function(id, useless1, useless2, useless3, useless4, useless5, useless6, useless7 = undefined){},
			MainTerminalInterface: function(id, useless1, useless2, useless3, useless4, useless5, useless6, useless7 = undefined){},
			BaseBackend: function(id, useless1, useless2, useless3, useless4, useless5, useless6, useless7 = undefined){},
			CartFiller: function(id, useless1, useless2, useless3, useless4, useless5, useless6, useless7 = undefined){},
			WireBreakpoint: function(id, useless1, useless2, useless3, useless4, useless5, useless6, useless7 = undefined){},
			WaterTank: function(id, useless1, useless2, useless3, useless4, useless5, useless6, useless7 = undefined){},
			Cart: function(id, useless1, useless2, useless3, useless4, useless5, useless6, useless7 = undefined){}
		}
		this.defaultConstNameId = 7;//7 is id of constructor name by default
	}

	start(){
		map = new Map(600, 10, 10, this);//document.getElementById("canv").width
		this.map = map;
		baseBackend = new BaseBackend(map);
		this.players = [new Player, new Player];
		//let a = new InterfaceElement(this.getPlayer().mainInterface, 250, 350, 250, 350);
		//a.drawActive = function(){
		//    draw.interface2(this);
		//}
		//a.drawUnactive = function(){
		//    draw.interface(this);
		//}
		//a.functionality = function(){this.getPlayer().inventory.mainhand[0].maxCooldown -= 10}
		//devKit.swarm());
		//let swarmAllowed = false;
		//setInterval(() => {if(swarmAllowed){devKit.swarm();}}, 50000);
		//let u = new CaveGenerator(0, 0, 300, 300, undefined, 20);
		//let a = new Breaker(100, 100, {x1: -30, x2: 30, y1: -30, y2: 30}, 10000);
		//a.bind(this.getPlayer());
		this.devKit.worldBorder();
		new LevelEditor(this.getPlayer(), 20);
		this.getPlayer().activeLevelEditor.placeSchematic(mainScheme);
		let x = new Primary;
		x.statMultipliers = [0.8, 1, 0.5, 1, 10, 1, 1, 1, 1, 1];
		let f = new WeaponHandle;
		f.toolIcon.src = "textures/rifle2.png";
		f.sprite.src = "textures/Rifle.png";
		f.slots.primaries[0] = x;
		this.getPlayer().give(f);
		this.getPlayer().give(new Resource(3000, "rifleBullet", "rifleBullet"));
		let a = new Tool(undefined, undefined, "crowbar");
		a.toolIcon.src = "textures/crowbar2.png";
		a.sprite.src = "textures/Crowbar.png";
		a.isWrench = true;
		this.getPlayer().give(a);
		a = new Resource(1, "replacementWire", undefined, "textures/replacementWire.png");
		this.getPlayer().give(a);
		a = new Resource(1, "wirecutters", undefined, "textures/wirecutters.png");
		this.getPlayer().give(a);
		this.getPlayer().inventoryIsActive = false;
		this.getPlayer().inventory.mainhand[0] = new PlaceholderItem;
		this.players[1].inventory.mainhand[0] = new PlaceholderItem;
		this.inGameTime();
	}

	summonObject(parameters){
		let objectData = parameters.map(Number);
		this.summoningCircle[parameters[this.defaultConstNameId]](objectData[0], objectData[1], objectData[2], objectData[3], objectData[4], objectData[5], objectData[6]);
	}

	inGameTime(){
		setInterval((obj) => {
			map.tick(obj.getPlayer());
			obj.sync();
		}, map.framerate, this);
	}

	sync(){
		if (this.syncCounter >= 2){
			for (let a in this.clientInfo){
				this.correctGameData(a);//id in clientInfo
			}
			this.savedState = this.sendServerData();
			this.syncCounter = 0;
			//console.log("tick: " + this.savedState);
			return;
		}
		this.syncCounter++;
	}

	sendServerData(){
		let saved = "";
		for (let a in this.map.entityListActive){
			saved += this.map.entityList[this.map.entityListActive[a]].getSaveData();
			saved += ";";
		}
		saved += baseBackend.mainTerminal.getSaveData(); + ";";
		for (let a in baseBackend.doors){
			saved += baseBackend.doors[a].getSaveData();
			saved += ";";
		}
		saved += baseBackend.getSaveData() + ";";
		saved += baseBackend.rocketRefueller.getSaveData() + ";";
		saved += baseBackend.reactorPort.getSaveData() + ";";
		saved += baseBackend.supplies.getSaveData() + ";";
		for (let a in baseBackend.cells){
			for (let b in baseBackend.cells[a].wiringBreakpoints){
				saved += baseBackend.cells[a].wiringBreakpoints[b].getSaveData() + ";";
			}
		}
		return saved;
	}

	correctGameData(num){
		let data = this.clientInfo[num];
		let parsedData = data.split("	");
		let parsedEntityData = parsedData[1].split(";");
		for (let a in parsedEntityData){
			if (parsedEntityData[a] === ""){continue}
			let parsedParams = parsedEntityData[a].split(" ");//пробел для разделения параметров внутри объекта
			if (this.map.individualObjects[parseFloat(parsedParams[0])] === undefined){
				if (parseFloat(parsedParams[0]) < 0){
					try {
						this.map.individualObjects[-parseFloat(parsedParams[0])].kill();
						console.log("DEATH!!!");
						continue;
					} catch {
						console.error(-parseFloat(parsedParams[0]));
					}
				}
				console.error("no such object: " + parsedParams[0]);
				continue;
			}
			this.map.individualObjects[parseFloat(parsedParams[0])].setSaveData(parsedParams);
		}
		try{
		var parsedEvents = parsedData[2].split(";");//events handled by individual ids
		} catch {console.error("empty package")}
		for (let a in parsedEvents){
			//console.log(parsedEvents[a]);
			if (parsedEvents[a] === "") {continue}
			let parsedParams = parsedEvents[a].split(" ");-
			this.map.individualObjects[parseFloat(parsedParams[0])].forceEvents(parsedEvents[a]);
		}
		parsedData[2] = "";
		this.clientInfo[num] = parsedData.join("	");
	}

	endgame(){
		for (let a = 0; a < this.map.api.players; a++){
			this.map.api.players[a].kill();
		}
	}

	getPlayer(){
		return this.players[this.activePlayerId];
	}
}


class Client extends Server{
	constructor(){
		super(false);
		this.previousObjects = [];
		setTimeout(() => {
				baseBackend.baseTick3 = function(){}
				baseBackend.baseTick2 = function(){}
			}, 5
		);
		this.clientNumber = -1;
		this.eventLog = "";
	}

	inGameTime(){
		setInterval((obj) => {
			map.tick(obj.getPlayer());
			obj.sync();
		}, map.framerate, this);
	}

	sync(){
		if (this.syncCounter >= 5){
			this.sendClientData();
			this.getServerData();
			this.handleNewObjects(this.savedState);
			this.correctGameData(this.savedState);
			this.syncCounter = 0;
			return;
		}
		this.syncCounter++;
	}

	handleNewObjects(data){
		let parsedData = data.split("	");
		let parsedEntityData = parsedData[0].split(";");
		let counter = 0;
		for (let a in parsedEntityData){
			if (parsedEntityData[a] === ""){continue}
			let b = parseInt(parsedEntityData[a].split(" ")[0]);
			if (b === this.previousObjects[counter]){
				counter++;
			} else {
				let c = this.previousObjects.indexOf(b);
				if (c === -1){
					console.log("1 less obj than needed");
					this.summonObject(parsedEntityData[a].split(" "));
				} else {
					if (c > counter){
						for (let d = counter; d < c; d++){
							let toKill = this.map.individualObjects[this.previousObjects[d]];
							toKill.remove();
							toKill.forceRemove();
						}
						counter = c + 1;
					} else {
						console.error("FUCKING FUCKS");
					}
				}
			}
		}
		this.previousObjects = [];
		for (let a in parsedEntityData){
			if (parsedEntityData[a] === ""){continue}
			let b = parseInt(parsedEntityData[a].split(" ")[0]);
			this.previousObjects.push(b);
		}
	}

	sendClientData(){
		let saved = this.activePlayerId + "	";
		saved += this.getPlayer().getSaveData();
		if (this.getPlayer().isDead){
			saved = "";
		}
		if (saved.startsWith("-")){
			this.getPlayer().isDead = true;
			console.log("sending last player package: " + saved);
		}
		saved += "	";
		saved += baseBackend.eventLog;
		saved += this.eventLog;
		this.clearEventLog();
		baseBackend.clearEventLog();
		//console.log(saved);
		this.sendDataToServer(saved);
	}

	getServerData(){
		let url = '/';
		fetch(url)
		.then(function(response){
			let a = response.text();
			return a;
		})
		.then(function(text){
			immediateApi.savedState = text;
			console.log("data from server received");
		})
	}

	sendDataToServer(data){
		let url = '/';
		fetch(url, {
			method: "post",
			headers: {
			'Accept': 'application/text',
			'Content-Type': 'application/text'
			},
			body: data
		})
	}

	correctGameData(data){
		let parsedData = data.split("	");
		let parsedEntityData = parsedData[0].split(";");
		for (let a in parsedEntityData){
			if (parsedEntityData[a] === ""){continue}
			let parsedParams = parsedEntityData[a].split(" ");//пробел для разделения параметров внутри объекта
			if (this.map.individualObjects[parseFloat(parsedParams[0])] === undefined){
				if (parseFloat(parsedParams[0]) < 0){
					try {
						this.map.individualObjects[-parseFloat(parsedParams[0])].kill();
						console.log("DEATH!!!");
						continue;
					} catch {
						console.error(-parseFloat(parsedParams[0]));
					}
				}
				console.error("no such object: " + parsedParams[0]);
				continue;
			}
			this.map.individualObjects[parseFloat(parsedParams[0])].setSaveData(parsedParams);
		}
	}

	clearEventLog(){
		this.eventLog = "";
	}
}


let map
let baseBackend
const screenSizeMultiplier = 0.6;//document.getElementById("canv").height / parseInt(document.getElementById("wrapper").style.height.slice(0, document.getElementById("wrapper").style.height.length - 2));
let immediateApi = new Server();
immediateApi.start();


baseBackend.activateWaypoints();
baseBackend.startBackendTicks();
new ShadowRealm(map);
let draw = new Draw(drawingAllowed);

let magicConstant1 = -5;