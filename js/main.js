import { initCanvas, animate } from './canvas.js';
import { initTerminal } from './terminal.js';

window.addEventListener('load', function() {
    console.log("DIJUMPER Lab System Initialized.");
    
    if (typeof initCanvas === 'function') {
        initCanvas();
        animate();
    }

    if (typeof initTerminal === 'function') {
        initTerminal();
    }
});