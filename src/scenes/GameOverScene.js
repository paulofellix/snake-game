const Phaser = require('phaser')

class GameOverScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'game-over',
            active: false
        })
    }

    create(data) {
        this.gameOver = this.make.text({
            x: 130,
            y: 150,
            text: 'Game Over!',
            style: {
                fontSize: '64px',
                color: '#ffffff',
                strokeThickness: 2
            },
        })

        this.total = this.make.text({
            x: 130,
            y: 250,
            text: `Total of points: ${data.total}`,
            style: {
                fontSize: '32px',
                color: '#ffffff',
                strokeThickness: 1
            },
        })

        this.continue = this.make.text({
            x: 180,
            y: 380,
            text: `Press space to continue`,
            style: {
                fontSize: '20px',
                color: '#ffffff',
                strokeThickness: 0.7
            },
        })

        this.time.addEvent({
            args: [this.continue],
            callback: this.blinkText,
            callbackScope: this,
            delay: 700,
            loop: true
        })

        const spaceKey = this.input.keyboard.addKey('space')
        spaceKey.on('down', () => {
            this.scene.start('main-scene')
        })
    }

    blinkText(text, text2){
        text.setVisible(!text.visible)
    }
}

module.exports = GameOverScene