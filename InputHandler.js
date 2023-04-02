function keyDownHandler(){
    if (event.keyCode === 65){
        player.leftPress();
    } else if (event.keyCode === 87){
        player.upPress();
    } else if (event.keyCode === 68){
        player.rightPress();
    } else if (event.keyCode === 83){
        player.downPress();
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
        a = new Particle();
        a.bind(player);
        player.useHand();
        new Bullet(player, 5, {x: player.mousePosition.x + xshift(map), y: player.mousePosition.y + xshift(map)});
    }
}

function mouseMoveHandler(){
    player.mousePosition = {x: Math.floor(event.layerX * 10) / 10, y: Math.floor(event.layerY * 10) / 10}
}