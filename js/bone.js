function Bone(name, zIndex) {
    if (name === undefined) {
        this.name = window.utils.generateUUID();
    }
    else {
        this.name = name;
    }

    this.children = new Map();
    
    this.parent = undefined;
    this.x = 0;
    this.y = 0;
    this.girth = 20;
    this.length = 50;
    this.vx = 0;
    this.vy = 0;
    this.rotation = 0;
    this.scaleX = 1;
    this.scaleY = 1;
    this.zIndex = zIndex || 0;
    return this;
};
Bone.prototype.isRoot = function() {
    return this.parent === undefined;
};
Bone.prototype.has = function(childName) {
    return this.children.has(childName);
};
Bone.prototype.pinX = function() {
    return this.x + Math.cos(this.rotation) * this.length;
};
Bone.prototype.pinY = function() {
    return this.y + Math.sin(this.rotation) * this.length;
};
Bone.prototype.getPin = function() {
    return {
        x: this.pinX(),
        y: this.pinY()
    };
};
Bone.prototype.addChild = function(child) {
    this.children.set(child.name, child);
    var tbone = this.children.get(child.name);
    tbone.parent = this;
    //console.log("added " + tbone.name + " to " + this.name + " Size: " + this.children.size);
    tbone.x = this.pinX();
    tbone.y = this.pinY();
    return tbone;
};
Bone.prototype.getChildren = function() {
    return this.children;
};
Bone.prototype.getChild = function(childName) {
    'use strict';
    if(this.name === childName){return this;}
    if (this.children.has(childName)) {
        return this.children.get(childName);
    }
    else {
        var retBone = undefined;
        if (this.children.has(childName)) {
            return this.children.get(childName);
        }
        else {
            this.children.forEach(function(value, key, map) {
                console.log("V: " + value + " K: " + key + " M: " + JSON.stringify(map));
                map.forEach(function(mvalue, mkey, mmap) {
                    console.log("mV: " + mvalue + " mK: " + mkey + " mM: " + JSON.stringify(mmap));
                })
            })
        }




    }
};
Bone.prototype.test = function(fn){
    this.children.forEach(fn);
};
Bone.prototype.addSibling = function(theBone){
    if (this.parent !== undefined){
        this.parent.addChild(theBone);
    }
    return this;
};
Bone.prototype.getChildrenNames = function() {
    return this.children.keys();
};
Bone.prototype.childExists = function(child_key) {
    return this.children.has(child_key);
};
Bone.prototype.childExistsR = function(child_key) {

    var retval = false;
    this.forKeysR(function(key) {

        if (key === child_key) {
            retval = true;
            return;
        }
    })
    return retval;
};
Bone.prototype.removeChild = function(child_key) {
    this.children.delete(child_key);
    return this;
};
Bone.prototype.removeAll = function() {
    this.children.clear();
    return this;
};
Bone.prototype.forEachChild = function(cbFnc) {
    this.children.forEach(cbFnc, this.children);
};
Bone.prototype.forEachChild2 = function(cbFnc, thisValue) {
    this.children.forEach(cbFnc, thisValue);
};
Bone.prototype.forKeys = function(cbFnc) {
    'use strict';
    for (let key of this.children.keys()) {
        cbFnc(key);
    }
    return this;
};
Bone.prototype.forKeysR = function(cbFnc) {
    'use strict';
    for (let key of this.children.keys()) {
        cbFnc(key);
        this.getChild(key).forKeysR(cbFnc);
    }
    return this;
};

Bone.prototype.forValues = function(cbFnc) {
    'use strict';
    for (let value of this.children.values()) {
        cbFnc(value);
    }
    return this;
};
Bone.prototype.forItems = function(cbFnc) {
    'use strict';
    for (let item of this.children) {
        cbFnc(item[0], item[1]);
    }
};
Bone.prototype.translateChildren = function() {
    for (var child of this.children.values()) {
        child.x = this.pinX();
        child.y = this.pinY();
    }
    return this;
};
Bone.prototype.hasChildren = function() {
    return this.children.size > 0;
};
Bone.prototype.reach = function(xPos, yPos) {
    var dx = xPos - this.x,
        dy = yPos - this.y;
    this.rotation = Math.atan2(dx, dy);
    var w = this.pinX() - this.x,
        h = this.pinY() - this.y;
    return {
        x: xPos - w,
        y: yPos - h
    };
    return this;
}
Bone.prototype.log = function() {
    console.log("--");
    if (this.parent !== undefined) {
        console.log(this.name + " parent: " + this.parent.name);
    }
    else {
        console.log(this.name);
    }

    var self = this;
    self.children.forEach(function(value, key) {
        var a = self.children.get(key);
        a.log();

    }, self.children);
    return this;
};

Bone.prototype.draw = function(ctx) {
    var self = this;

    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.scale(this.scaleX, this.scaleY);
    ctx.lineWidth = 1;

    ctx.rect(0, 0 - (this.girth / 2), this.length, this.girth);
    ctx.fillStyle = 'rgba(128,128,128,1)';
    ctx.stroke();
    ctx.fill();

    ctx.fillStyle = "rgba(255,0,0,0.5)";
    ctx.beginPath();
    ctx.arc(0, 0, 2, 0, (Math.PI * 2), true);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();


    ctx.fillStyle = "rgba(0,255,0,0.5)";
    ctx.beginPath();
    ctx.arc(this.length, 0, 2, 0, (Math.PI * 2), true);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();



    self.children.forEach(function(value, key) {
        var a = self.children.get(key);
        a.draw(ctx);

    }, self.children);
    return this;
};
Bone.prototype.pinChildren = function() {
    var self = this;

    self.children.forEach(function(value, key) {
        var a = self.children.get(key);
        if (a.parent !== undefined) {
            a.x = a.parent.pinX();
            a.y = a.parent.pinY();
            a.pinChildren();
        }
    }, self.children);
    return this;
};
Bone.prototype.translate = function(x, y) {
    var self = this;
    self.x = x;
    self.y = y;
    self.pinChildren();
    return this;
};
Bone.prototype.rotate = function(radians) {

};