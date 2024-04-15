
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
		if (baseBackend.cart.linked){
			baseBackend.cart.linked = false;
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