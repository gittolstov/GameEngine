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