const World     = require("./world.js");
const Misc_math = require("./misc_math.js");

//airplane prototype... i had to make that joke.
//base class for all airplanes in the game, includes all basic functionality
function Airplane(x, y, ai) {
    this.x = x; this.y = y;
    this.motion = {x: 0, y: 0.3333};
    
    this.orientation = Math.PI / 2;
    this.rotation    = "neutral";
    
    this.stored_data = {};
    
    //default ai
    this.ai = ai || this.simple_ai;
    
    this.active = true;
}

Airplane.prototype.thrust  = 0.003;
Airplane.prototype.inertia = 0.009;
Airplane.prototype.turning = (2 * Math.PI / 3) / 1000; // 120 degrees per second turning

Airplane.prototype.simple_ai = function(me) {
    //fly in a circle
    me.turn("left");
};

Airplane.prototype.get_data = function() {
    var a = this;
    return {
        get x() { return a.x; },
        get y() { return a.y; },
        get angle() { return a.orientation; },
        
        //turn left and right
        turn: function(direction) {
            a.rotation = direction;
        },
        
        //action!
        fire: function() {
            a.fire();
        },
        
        store: function(key, data) {
            a.stored_data[key] = data;
        }
    };
};

Airplane.prototype.keep_in_bounds = function() {
    if (this.x < 0) {
        this.orientation = 0;
    }
    
    if (this.y < 0) {
        this.orientation = Math.PI / 2;
    }
    
    if (this.x > World.width) {
        this.orientation = Math.PI;
    }
    
    if (this.y > World.height) {
        this.orientation = Math.PI * 3 / 2;
    }
};

Airplane.prototype.update = function(lapse) {
    //give the ai a chance to update
    this.ai(this.get_data());
    //update the direction based on what the ai did
    if (this.rotation == "left") {
        this.orientation -= this.turning * lapse;
    } else if (this.rotation == "right") {
        this.orientation += this.turning * lapse;
    }
    this.rotation = "neutral";
    
    this.keep_in_bounds();
    
    //update the vector
    this.motion.x += (Math.cos(this.orientation) * this.thrust - this.motion.x * this.inertia) * lapse;
    this.motion.y += (Math.sin(this.orientation) * this.thrust - this.motion.y * this.inertia) * lapse;
    
    //update the position
    this.x += this.motion.x * lapse;
    this.y += this.motion.y * lapse;
};

Airplane.prototype.fire = function() {
    return; //override in child classes
};

module.exports = Airplane;