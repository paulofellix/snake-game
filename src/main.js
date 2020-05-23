import Phaser from "phaser";

import MainScene from './scenes/MainScene';
import GameOverScene from './scenes/GameOverScene'

const config = {
	type: Phaser.AUTO,
	width: 640,
	height: 480,
	physics: {
		default: "arcade",
		arcade: {
			// debug: true,
		},
	},
	audio: {
        disableWebAudio: true
    },
	pixelArt: true,
	backgroundColor: '#bfcc00',
	scene: [MainScene, GameOverScene],
};

export default new Phaser.Game(config);