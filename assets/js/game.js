function Game(options) {
    this.options = options;

    var vel = 1;

    var vx = vy = 0;
    var px = 10;
    var py = 15;
    var tp = 30;
    var qp = 20;
    var ax = ay = 15;

    var trail = [];
    var tail = 5;

    var ctx;

    var audio;

    this.init = function () {
        var self = this;

        if (self.options == null || self.options == undefined) {
            alert("Ops! Jogo sem parâmetros de construção.");
            return;
        }

        var stage = self.options.stage;
        ctx = stage.getContext("2d");

        audio = self.options.audio;
        
        document.addEventListener("keydown", keyPush);

        setInterval(game, 80);
    }, keyPush = function (event) {
        try {
            if (audio.duration <= 0 || audio.paused) {
                audio.play();
                //$(".toggle-audio").toggleClass("bxs-volume-mute");
            }
        } catch (e) {
            console.error(e);
        }
        
        switch (event.keyCode) {
            case 37: // Left
                vx = -vel;
                vy = 0;
                break;
            case 38: // up
                vx = 0;
                vy = -vel;
                break;
            case 39: // right
                vx = vel;
                vy = 0;
                break;
            case 40: // down
                vx = 0;
                vy = vel;
                break;
            default:
                break;
        }
    }, game = function () {
        px += vx;
        py += vy;
        if (px < 0) {
            px = qp - 1;
        }
        if (px > qp - 1) {
            px = 0;
        }
        if (py < 0) {
            py = qp - 1;
        }
        if (py > qp - 1) {
            py = 0;
        }

        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, stage.width, stage.height);

        ctx.fillStyle = "red";
        ctx.fillRect(ax * tp, ay * tp, tp, tp);

        ctx.fillStyle = "#669900";
        for (var i = 0; i < trail.length; i++) {
            ctx.fillRect(trail[i].x * tp, trail[i].y * tp, tp - 1, tp - 1);
            if (trail[i].x == px && trail[i].y == py) {
                vx = vy = 0;
                tail = 5;
            }
        }

        trail.push({ x: px, y: py })
        while (trail.length > tail) {
            trail.shift();
        }

        if (ax == px && ay == py) {
            tail++;
            ax = Math.floor(Math.random() * qp);
            ay = Math.floor(Math.random() * qp);
        }
    };

    this.init();
}