export default class Action {
    private texture: string;
    private name: string;
    private description: string;
    private timeToComplete: number;

    constructor(texture: string, name: string, description: string, timeToComplete: number) {
        this.texture = texture;
        this.name = name;
        this.description = description;
        this.timeToComplete = timeToComplete;
    }

    public getTexture(): string {
        return this.texture;
    }

    public getName(): string {
        return this.name;
    }

    public getDescription(): string {
        return this.description;
    }

    public getTimeToComplete(): number {
        return this.timeToComplete;
    }
}