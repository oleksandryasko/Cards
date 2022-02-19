// import './game.js';

// if canvas does not supporte
let myCanvas = document.getElementById('canvas');

let supportGame = {
    run: function () {

        if (myCanvas.getContext) {
            game.start();
        } else {
            alert("Your computer does not support canvas");
        }
    }
};


let game = {
    start: function () {
        this.ctx = canvas.getContext('2d');


        let background =  this.ctx;
        background.rect(0, 0, myCanvas.width, myCanvas.height);
        background.fillStyle = '#42622D';
        background.fill();

        // window.requestAnimationFrame(() => {
            // this.ctx.drawImage(background, 0, 0);
        // }); // все запланирование изображения необходимо отрисовать и выполнить перерисовку на следующем кадре
    } 
}

// after full loading html page run the game
window.addEventListener("load", () => {
    supportGame.run();
});