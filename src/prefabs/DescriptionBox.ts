import Phaser from 'phaser';

export default class DescriptionBox extends Phaser.GameObjects.Container {
    private textBox: Phaser.GameObjects.Text;
    private textContent: string;

    constructor(scene: Phaser.Scene, x: number, y: number, width: number, textContent: string) {
        super(scene, x, y);

        this.textContent = textContent;

        this.textBox = scene.add.text(0, 0, this.textContent, {
            fontFamily: 'Arvo',
            fontSize: '24px',
            color: '#283618',
            align: 'left',
            wordWrap: { width: width * 2, useAdvancedWrap: true }
        });
        this.textBox.setOrigin(0, 0);

        this.add(this.textBox);
        scene.add.existing(this);
    }

    public updateText(newText: string) {
        this.textBox.setText(newText);
    }
}
