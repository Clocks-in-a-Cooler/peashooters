const Misc_math = {
    get_angle: (start, end) => {
        var opp = end.y - start.y;
        var hyp = Math.hypot(start.x - end.x, start.y - end.y);
        var angle = Math.asin(opp / hyp);
        
        if (end.x < start.x) {
            angle = Math.PI - angle;
        }
        
        return Misc_math.reduce_angle(angle);
    },
    
    reduce_angle: (angle) => {
        //normalizes it to between -PI and +PI
        while (angle <= -Math.PI) {
            angle += 2 * Math.PI;
        }
        
        while (angle >= Math.PI) {
            angle -= 2 * Math.PI;
        }
        
        return angle;
    },
    
    get_direction: (start_angle, end_angle) => {
        start_angle = Misc_math.reduce_angle(angle);
        end_angle   = Misc_math.reduce_angle(angle);
        
        if (Math.abs(start_angle - end_angle) < Math.PI) {
            return Math.sign(end_angle - start_angle);
        } else {
            return -1 * Math.sign(end_angle - start_angle);
        }
    },
};

module.exports = Misc_math;