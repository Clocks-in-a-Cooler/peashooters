var airplanes = [];

var World = {
    get width() { return 800; },
    get height() { return 600; },
    
    get airplanes() { return airplanes; },
    
    update: function(lapse) {
        airplanes = airplanes.filter(a => { return a.active; });
        airplanes.forEach(a => { a.update(lapse); });
    },
    
    draw: function(cxt, sprites) {
        cxt.clearRect(0, 0, 800, 600);
        //for now, i guess
        airplanes.forEach(a => {
            cxt.save();
            cxt.translate(a.x, a.y);
            cxt.rotate(a.orientation);
            cxt.drawImage(sprites["airplane"], -32, -32, 64, 64);
            cxt.restore();
        });
    },
    
    //more to come...
};

module.exports = World;