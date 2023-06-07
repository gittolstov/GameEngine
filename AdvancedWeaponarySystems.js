class WeaponHandle extends Tool{
    constructor(primaries = 1, melee = 1, consumable = 1){
        super();
        this.modificationInterface = new Interface(100, 500, 25, 275);
        this.modificationInterface.elements[0].draw = function(){
            draw.interface(this);
        }
        this.modificationInterface.click = function(){
            this.focus.functionality(player);
        }
        this.functionality = function(ent){
            for (let a in this.slots.primaries){
                let b = this.slots.primaries[a].functionality(ent, {type: this.slots.primaries[a].damage.type, amount: this.damageGetter(ent, a), iFrame: this.slots.primaries[a].damage.iFrame}, this.spreadGetter(a), 1, this.magazine);
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
            this.spread -= this.slots.primaries[0].spreadSpeed * this.slots.primaries[0].cooldown * player.map.framerate * 0.002;
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

    cooldownGetter(user, primary){
        let speed = this.slots.primaries[primary].cooldown;
        for (let a in this.slots.primaries){
            speed *= this.slots.primaries[a].statMultipliers[1];
        }
        for (let a in this.slots.upgrades){
            speed *= this.slots.upgrades[a].statMultipliers[1];
        }
        for (let a in user.weaponSpeedMultipliers){
            speed *= user.weaponSpeedMultipliers[a];
        }
        return 1000 / speed;
    }
    
    damageGetter(user, primary){
        let damage = this.slots.primaries[primary].damage.amount;
        for (let a in this.slots.primaries){
            damage *= this.slots.primaries[a].statMultipliers[0];
        }
        for (let a in this.slots.upgrades){
            damage *= this.slots.upgrades[a].statMultipliers[0];
        }
        for (let a in user.damageMultipliers){
            damage *= user.damageMultipliers[a];
        }
        return damage;
    }

    spreadGetter(primary){
        let spread = this.slots.primaries[primary].spread1;
        let spread2 = this.spread * this.slots.primaries[primary].spread2;
        for (let a in this.slots.primaries){
            spread *= this.slots.primaries[a].statMultipliers[2];
            spread2 *= this.slots.primaries[a].statMultipliers[3];
        }
        for (let a in this.slots.upgrades){
            spread *= this.slots.upgrades[a].statMultipliers[2];
            spread2 *= this.slots.upgrades[a].statMultipliers[3];
        }
        return spread + spread2;
    }
}

class Primary extends Resource{
    constructor(damage = {type: "playerGeneric", amount: 1, iFrame: 10}, pelletNum = 1, spread1 = 1, spread2 = 30, spreadSpeed = 0.08, cooldown = 10, magSize = 30, ammoType = "rifleBullet", reloadTime = 2000){
        super();
        this.damage = damage;
        this.advancedWeaponType = "primary";
        this.pelletNum = pelletNum;
        this.cooldown = cooldown;
        this.spread1 = spread1;
        this.spread2 = spread2;
        this.magSize = magSize;
        this.ammoType = ammoType;
        this.spreadSpeed = spreadSpeed;
		this.isStackable = false;
        this.reloadTime = reloadTime;
        this.ammoConsumption = 1;
        this.statMultipliers = [1, 1, 1, 1];
    }

    functionality(ent, damage, spreaD, hitboxScaling, ammoInMag){
        if (ammoInMag > 0 && ent.ammunitionGetter(this.ammoType) > 0){    
            for (let a = 0; a < this.pelletNum; a++){
                let spread = spreadCounter(ent.mousePosition.x - ent.x - ent.map.xshift(), ent.mousePosition.y - ent.y - ent.map.yshift(), spreaD);
                let b = projections(spread.x, spread.y, ent.map.size * (ent.map.fieldWidth + ent.map.fieldHeight));
                new Bullet(ent, damage, {x: ent.x + b.x, y: ent.y + b.y}, hitboxScaling);
                ent.ammunitionDecreaser(this.ammoType, 1);
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