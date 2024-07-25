import Phaser from 'phaser';
import ActionButton from '../prefabs/ActionButton';
import {
    KITCHEN_KETTLE_ACTION,
    KITCHEN_DISHES_ACTION,
    KITCHEN_LADLE_ACTION,
    KITCHEN_UTENSILS_ACTION,
    KITCHEN_MORTAR_ACTION,
    KITCHEN_TEACUP_ACTION,
    KITCHEN_CHEESE_ACTION,
    KITCHEN_OVEN_ACTION,
    KITCHEN_FRUIT_ACTION
} from '../actions/ActionConstants';

export default class Game extends Phaser.Scene {
    private buttonGrid: ActionButton[][];

    constructor() {
        super('Game');
        this.buttonGrid = [];
    }

    create() {
		this.cameras.main.setBackgroundColor('#dda15e');

        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        const buttonSize = 120;
        const spacing = 20;
        const gridSize = 3;

        const startX = centerX - ((gridSize - 1) * (buttonSize + spacing)) / 2;
        const startY = centerY - ((gridSize - 1) * (buttonSize + spacing)) / 2;

        const actions = [
            KITCHEN_KETTLE_ACTION,
            KITCHEN_DISHES_ACTION,
            KITCHEN_LADLE_ACTION,
            KITCHEN_UTENSILS_ACTION,
            KITCHEN_MORTAR_ACTION,
            KITCHEN_TEACUP_ACTION,
            KITCHEN_CHEESE_ACTION,
            KITCHEN_OVEN_ACTION,
            KITCHEN_FRUIT_ACTION
        ];

        for (let row = 0; row < gridSize; row++) {
            this.buttonGrid[row] = [];
            for (let col = 0; col < gridSize; col++) {
                const x = startX + col * (buttonSize + spacing);
                const y = startY + row * (buttonSize + spacing);

                const action = actions[row * gridSize + col];
                const button = new ActionButton(this, x, y, action, () => {
                    console.log(`Button ${action.getTexture()} clicked!`);
                });

                this.buttonGrid[row][col] = button;
            }
        }
    }
}
