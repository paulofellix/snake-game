const Phaser = require('phaser')

class Food extends Phaser.GameObjects.Image {

    constructor(scene, x, y, texture, eatSound) {
        super(scene, x * 16, y * 16)

        Phaser.GameObjects.Image.call(this, scene)
        this.setTexture(texture)
        this.setPosition(x * 16, y * 16)
        this.setOrigin(0)

        this.total = 0

        this.scene = scene
        this.eatSound = eatSound

        scene.children.add(this)
    }

    eat(snake) {
        this.total++
        this.scene.sound.play(this.eatSound)
        this.repositionFood(snake)
    }


    repositionFood(snake) {
        //  First create an array that assumes all positions
        //  are valid for the new piece of food

        //  A Grid we'll use to reposition the food each time it's eaten
        var testGrid = [];

        for (var y = 0; y < 30; y++) {
            testGrid[y] = [];

            for (var x = 0; x < 40; x++) {
                testGrid[y][x] = true;
            }
        }

        snake.updateGrid(testGrid);

        //  Purge out false positions
        var validLocations = [];

        for (var y = 0; y < 30; y++) {
            for (var x = 0; x < 40; x++) {
                if (testGrid[y][x] === true) {
                    //  Is this position valid for food? If so, add it here ...
                    validLocations.push({
                        x: x,
                        y: y
                    });
                }
            }
        }

        if (validLocations.length > 0) {
            //  Use the RNG to pick a random food position
            var pos = Phaser.Math.RND.pick(validLocations);

            //  And place it
            this.setPosition(pos.x * 16, pos.y * 16);

            return true;
        } else {
            return false;
        }
    }
}

module.exports = Food