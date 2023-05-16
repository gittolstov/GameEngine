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
    } else if (event.keyCode === 13){
        if (!player.inventoryIsActive){
            player.inventoryIsActive = true;
            player.inventoryId = player.map.activeInterfaces.push(player.inventory) - 1;
        } else {
            player.inventoryIsActive = false;
            player.map.activeInterfaces[player.inventoryId] = undefined;
        }
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


function clickHandler(){
    map.manageClick();
}