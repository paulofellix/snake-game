const Phaser = require("phaser")
const Snake = require('../gameObjects/Snake')
const Food = require('../gameObjects/Food')

class MainScene extends Phaser.Scene {
	constructor() {
		super({
			key: "main-scene",
			active: true,
		})
	}

	preload() {
		this.load.setBaseURL('https://labs.phaser.io')
		this.load.image('food', 'assets/games/snake/food.png');
		this.load.image('body', 'assets/games/snake/body.png');
		this.load.audio('eat-sound', 'assets/audio/stacker/place.ogg')
		this.load.audio('gameover-sound', 'assets/audio/stacker/gamelost.ogg')
		// return this.scene.start('game-over', {
		// 	total: 10
		// })
	}

	create() {
		this.sound.add('eat-sound')
		this.food = new Food(this, 3, 4, 'food', 'eat-sound')
		this.snake = new Snake(this, 8, 8, 'body')
		this.cursors = this.input.keyboard.createCursorKeys()
		this.lettersKeys = this.input.keyboard.addKeys({
			A: 'A',
			D: 'D',
			W: 'W',
			S: 'S'
		})
	}

	update(time) {
		if (!this.snake.alive) {
			this.sound.play('gameover-sound')
			return this.scene.start('game-over', {
				total: this.food.total
			})
		}

		if (this.cursors.left.isDown || this.lettersKeys.A.isDown) {
			this.snake.faceLeft();
		} else if (this.cursors.right.isDown || this.lettersKeys.D.isDown) {
			this.snake.faceRight();
		} else if (this.cursors.up.isDown || this.lettersKeys.W.isDown) {
			this.snake.faceUp();
		} else if (this.cursors.down.isDown || this.lettersKeys.S.isDown) {
			this.snake.faceDown();
		}

		if (this.snake.update(time)) {
			this.snake.collideWithFood(this.food)
		}
	}
}

module.exports = MainScene