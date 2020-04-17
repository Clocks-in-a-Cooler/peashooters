const World = {
    get width() { return 2000; },
    get height() { return 1500; },
    
    airplanes: [], //bonus points to anyone who can figure out what goes in here.
    objects: [], //stuff like bullets, missiles, and ducks go here.
    
    update: function(lapse) {
        this.airplanes = this.airplanes.filter(a => { return a.active; });
        this.airplanes.forEach(a => { a.update(lapse); });
    },
    
    draw: function(cxt) {
        cxt.clearRect(0, 0, 800, 600);
        
        var in_view = viewport.get_in_view();
        
        var offset = { x: viewport.x, y: viewport.y };
        
        //draw a grid, at least until i can get hold of an 2000 by 1500 terrain picture
        cxt.strokeStyle = "white";
        cxt.lineWidth   = 2;
        
        var start_x = 50 - offset.x % 50;
        cxt.beginPath();
        for (var x = start_x; x < viewport.width; x += 50) {
            cxt.moveTo(x, 0);
            cxt.lineTo(x, viewport.height);
        }
                
        var start_y = 50 - offset.y % 50;
        for (var y = start_y; y < viewport.height; y += 50) {
            cxt.moveTo(0, y);
            cxt.lineTo(viewport.width, y);
        }
        
        cxt.closePath();
        cxt.stroke();
        
        in_view.forEach(i => {
            i.draw(cxt, offset);
        });
    },
    
    //more to come...
};

//i've done this (what feels like) a thousand times, but i'll do it again...
const viewport = {
    x: 0, y: 0, //of the top left corner
    width: 800, height: 600,
    
    translate: function(x, y) {
        this.x += x; this.y += y;
        
        //check to keep the viewport within bounds
        this.x = Math.max(this.x, 0); this.y = Math.max(this.y, 0);
        this.x = Math.min(World.width - this.width, this.x);
        this.y = Math.min(World.height - this.height, this.y);
    },
    
    get_in_view: function() {        
        var airplanes_in_view = World.airplanes.filter(a => {
            return (a.x + a.radius > this.x ||
                a.x - a.radius < this.x + this.width ||
                a.y + a.radius > this.y ||
                a.y - a.radius < this.y + this.height
            );
        });
        
        //same drill as above
        var objects_in_view = World.objects.filter(obj => {
            return (obj.x + obj.radius > this.x ||
                obj.x - obj.radius < this.x + this.width ||
                obj.y + obj.radius > this.y ||
                obj.y - obj.radius < this.y + this.height
            );
        });
        
        return airplanes_in_view.concat(objects_in_view);
    },
};

var clicking = false;

//makes the viewport draggable
addEventListener("mousedown", (evt) => {
    clicking = true;
});

addEventListener("mouseup", (evt) => {
    clicking = false;
});

addEventListener("mousemove", evt => {
    if (clicking) {
        viewport.translate(-evt.movementX, -evt.movementY);
        //is it really this simple? Huh...
    }
});