import Phaser from 'phaser';

export default class RoundedRectangleWithBorder extends Phaser.GameObjects.Container {
    public background: Phaser.GameObjects.Graphics;
    public border: Phaser.GameObjects.Graphics;

    constructor(scene: Phaser.Scene, width: number, height: number, radiusConfig: any, fillColor: number, borderColor: number, borderWidth: number) {
        super(scene);

        this.background = scene.add.graphics();
        this.background.fillStyle(fillColor);
        this.background.fillRoundedRect(-width / 2, -height / 2, width, height, radiusConfig);
        
        this.border = scene.add.graphics();
        this.border.lineStyle(borderWidth, borderColor);
        this.border.strokeRoundedRect(-width / 2, -height / 2, width, height, radiusConfig);
        
        this.add(this.background);
        this.add(this.border);

        this.setSize(width, height);

        scene.add.existing(this);
    }
}
