function projections(a, b, hypothesis){//a, b - расстояния до цели, hyp. - длина шага, возвращает объект с проекциями шага
    if (a === 0 && b === 0){
        return {x: 0, y: 0};
    }
    if (a === 0){
        return {x: 0, y: hypothesis * b / Math.abs(b)};
    }
    if (b === 0){
        return {y: 0, x: hypothesis * a / Math.abs(a)};
    }
	y = hypothesis * b / (Math.sqrt(a ** 2 / b ** 2 + 1) * Math.abs(b))
    return {
		x: y * a / b,
		y: y
	}
}   


function defenceCount(dmg, defence){
	return dmg * 200 / (defence + 200);
}


function xshift(map){
    return -map.loadedZone.x * map.size;
}
function yshift(map){
    return -map.loadedZone.y * map.size;
}