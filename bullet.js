function Bullet(x, y, angle, alliance) {
    this.x = x; this.y = y;
    this.vector = {
        x: Math.cos(angle) * this.speed,
        y: Math.sin(angle) * this.speed,
    };
    
    this.alliance = alliance;
    
    this.active = true;
}

Bullet.prototype.speed = 0.4;

Bullet.prototype.update = function(lapse) {
    this.x += this.vector.x * lapse;
    this.y += this.vector.x * lapse;
    
    if (this.x > World.width || this.x < 0 || this.y > World.height || this.y < 0) {
        this.active = false;
    }
};
