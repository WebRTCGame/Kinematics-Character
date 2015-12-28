 window.renderer = {
     fps: 30,
     now: 0,
     then: 0,
     fpsInterval: 1000 / this.fps,
     delta: 0,
     canvas: undefined,
     ctx: undefined,
     init: function init(canvasElem /*, width, height */) {
         this.canvas = canvasElem;
         this.then = Date.now();
         this.fpsInterval = 1000 / this.fps;

         //this.canvas.style.height = '800px'; //document.body.clientHeight;
         //this.canvas.style.width = '800px'; //document.body.clientHeight;
         //this.canvas.width = 1600; //width;
         //this.canvas.height = 1600; //height;
         this.ctx = this.canvas.getContext("2d");
     }
 }
 
 /*
 document.addEventListener("DOMContentLoaded", function() {
    'use strict';
    Sim.renderer.init(document.getElementById("canvas"), 1600, 1600);

    sea.init();

    Sim.renderer.process = function process() {
        'use strict';
        window.requestAnimationFrame(window.renderer.process, window.renderer.canvas);


        window.renderer.now = Date.now();
        window.renderer.delta = window.renderer.now - window.renderer.then;

        if (window.renderer.delta > window.renderer.fpsInterval) {
            window.renderer.ctx.clearRect(0, 0, sea.width, sea.height);
            sea.update();

            window.renderer.then = window.renderer.now - (window.renderer.delta % window.renderer.fpsInterval);


        }

    };

    window.renderer.process();

});
*/