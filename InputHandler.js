function keyDownHandler(){
    if (event.keyCode === 65){
        player.leftPress();
		player.turn = -1;
    } else if (event.keyCode === 87){
        player.upPress();
    } else if (event.keyCode === 68){
        player.rightPress();
		player.turn = 1;
    } else if (event.keyCode === 83){
        player.downPress();
    } else if (event.keyCode === 32){
        player.useHand();
    } else if (event.keyCode === 49){
        player.unUseHand();
        player.inventory.mainhand[0] = player.inventory.hotbar[0];
    } else if (event.keyCode === 50){
        player.unUseHand();
        player.inventory.mainhand[0] = player.inventory.hotbar[1];
    } else if (event.keyCode === 51){
        player.unUseHand();
        player.inventory.mainhand[0] = player.inventory.hotbar[2];
    } else if (event.keyCode === 69){
        new InteractivityHitbox;
    } else if (event.keyCode === 13){//enter
        if (!player.activeInterfaces[0]){
            player.activeInterfaces[0] = true;
            player.inventoryId = player.map.activeInterfaces.push(player.inventory) - 1;
        } else {
            player.activeInterfaces[0] = false;
            player.map.activeInterfaces[player.inventoryId] = undefined;
        }
    } else if (event.keyCode === 77){//M
        if (!player.activeInterfaces[1]){
            player.activeInterfaces[1] = true;
            player.mapId = player.map.activeInterfaces.push(player.minimap) - 1;
        }
    } else if (event.keyCode === 82){//R
        player.activeLevelEditor.circleSelector();
        player.inventory.mainhand[0].reload();
    } else if (event.keyCode === 81){//Q
        new GridParticle(player, 20);
    } else if (event.keyCode === 84){//T
        player.activeLevelEditor.logInput(player.mouseBox.coordinates);
    } else if (event.keyCode === 67){//C
        player.activeLevelEditor.clearInputs();
    } else if (event.keyCode === 76){//L
        player.activeLevelEditor.logSchematic();
    } else if (event.keyCode === 70){//F
        player.activeLevelEditor.doSelected();
    } else if (event.keyCode === 90){//Z
        player.activeLevelEditor.ctrlz();
    }
}


function keyUpHandler(){
    if (event.keyCode === 65){
        player.rightPress();
    } else if (event.keyCode === 87){
        player.downPress();
    } else if (event.keyCode === 68){
        player.leftPress();
    } else if (event.keyCode === 83){
        player.upPress();
    } else if (event.keyCode === 32){
        player.unUseHand();
    } else if (event.keyCode === 77){
        player.map.activeInterfaces[player.mapId] = undefined;
        player.activeInterfaces[1] = false;
    }
}


function mouseMoveHandler(){
    player.mousePosition = {x: Math.floor(event.layerX * 10) / 10, y: Math.floor(event.layerY * 10) / 10};
    player.mouseBox.tp(player.mousePosition.x - player.map.xshift(), player.mousePosition.y - player.map.yshift());
    player.mouseShift.x = player.mousePosition.x - player.map.xshift() - player.x;
    player.mouseShift.y = player.mousePosition.y - player.map.yshift() - player.y;
    for (let a = 0; a < player.activeRockets.length; a++){
        player.rockets[player.activeRockets[a]].goal = {x: player.mousePosition.x - player.map.xshift(), y: player.mousePosition.y - player.map.yshift()};
    }
    map.manageCursor(event.layerX, event.layerY);
}


function clickHandler(event){
    map.manageClick();
}