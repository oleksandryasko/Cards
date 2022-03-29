export default class Card {

  constructor(x, y, backImg, scaleX) {

    this.x = x;
    this.y = y;
    this.backImg = backImg;
    this.width = 200;
    this.height = 150;
    this.revealed = false;
    this.wrongCombination = false;
    this.scaleX = scaleX;
  }

  drawImgs(ctx) {

    let frontImg = document.getElementById("open");

    let imgWidth = 200,
    imgHeight = 150;

    let scaleDirection = -1,
    scaleDelta = 5;

    ctx.clearRect(this.x, this.y, this.width + 20, this.height);
    ctx.translate(this.x + 100, this.y + 75);

    // animation for one card
    if (this.revealed) {
      this.basicAnimation(ctx, scaleDirection, scaleDelta);
    }

    // end animation if wrong combination
    if (this.wrongCombination) {
      this.basicAnimation(ctx, scaleDirection, scaleDelta, false)

      if (this.scaleX > 100) {
        this.wrongCombination = false
      }
    }

    //draw imgs
    if (this.scaleX >= 0) {
      ctx.drawImage(frontImg, -frontImg.width / 9, -frontImg.height / 8, imgWidth, imgHeight);
    } else {
      ctx.drawImage(this.backImg, -this.backImg.width / 8.25, -this.backImg.height / 7.9, imgWidth, imgHeight);
    }

    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }

  basicAnimation(ctx, scaleDirection, scaleDelta, switcher = true) {

    ctx.scale(this.scaleX / 100, 1);

    if (switcher) {
      this.scaleX += scaleDirection * scaleDelta;
      if (this.scaleX < -110 || this.scaleX > 110) {
        scaleDirection *= -1;
        this.scaleX += scaleDirection * scaleDelta;
      }
    } else {
      this.scaleX -= scaleDirection * scaleDelta;
    }

  }

  is_selected(x, y) {
    return x >= this.x && x <= this.x + this.width && y >= this.y && y <= this.y + this.height;
  }
}
