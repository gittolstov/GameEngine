function keyDownHandler(){
    if (event.keyCode === 65){
        player.leftPress();
    } else if (event.keyCode === 87){
        player.upPress();
    } else if (event.keyCode === 68){
        player.rightPress();
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
        if (!player.activeWeaponEditor){
            player.activeWeaponEditor = true;
            player.weaponEditorId = player.map.activeInterfaces.push(player.mainInterface) - 1;
        } else {
            player.activeWeaponEditor = false;
            player.map.activeInterfaces[player.weaponEditorId] = undefined;
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
    player.mousePosition = {x: Math.floor(event.layerX * 10) / 10, y: Math.floor(event.layerY * 10) / 10}
    player.mouseBox.tp(player.mousePosition.x - xshift(player.map), player.mousePosition.y - yshift(player.map));
    for (let a = 0; a < player.activeRockets.length; a++){
        player.rockets[player.activeRockets[a]].goal = {x: player.mousePosition.x - xshift(map), y: player.mousePosition.y - yshift(map)};
    }
    map.manageCursor(event.layerX, event.layerY);
}

function clickHandler(){
    map.manageClick();
}