import Phaser from 'phaser';

export default class BaseScene extends Phaser.Scene {
    private pointers: Phaser.Input.Pointer[] = [];
    private initialDistance: number | null = null;
    private initialScale: number | null = null;
    private isDragging: boolean = false;
    private dragStartX: number = 0;
    private dragStartY: number = 0;
    private cameraStartX: number = 0;
    private cameraStartY: number = 0;
    private originalZoom!: number;
    private originalScrollX!: number;
    private originalScrollY!: number;

    constructor(sceneKey: string) {
        super(sceneKey);
    }

    create() {
        this.input.addPointer(5);

        this.originalZoom = this.cameras.main.zoom;
        this.originalScrollX = this.cameras.main.scrollX;
        this.originalScrollY = this.cameras.main.scrollY;

        this.input.on('pointerdown', this.onPointerDown, this);
        this.input.on('pointermove', this.onPointerMove, this);
        this.input.on('pointerup', this.onPointerUp, this);
    }

    private onPointerDown(pointer: Phaser.Input.Pointer) {
        this.pointers.push(pointer);
        if (this.pointers.length >= 2) {
            this.startPinchZoom();
        } else if (this.pointers.length === 1) {
            this.startDrag(pointer);
        }
    }

    private onPointerMove(pointer: Phaser.Input.Pointer) {
        if (this.pointers.length >= 2) {
            this.updatePinchZoom();
        } else if (this.isDragging) {
            this.updateDrag(pointer);
        }
    }

    private onPointerUp(pointer: Phaser.Input.Pointer) {
        this.pointers = this.pointers.filter(p => p.id !== pointer.id);
        if (this.pointers.length < 2) {
            this.stopPinchZoom();
        }
        if (this.pointers.length === 0) {
            this.stopDrag();
        }
    }

    private startPinchZoom() {
        this.initialDistance = Phaser.Math.Distance.Between(
            this.pointers[0].x, this.pointers[0].y,
            this.pointers[1].x, this.pointers[1].y
        );
        this.initialScale = this.cameras.main.zoom;
    }

    private updatePinchZoom() {
        if (this.initialDistance !== null && this.initialScale !== null) {
            const newDistance = Phaser.Math.Distance.Between(
                this.pointers[0].x, this.pointers[0].y,
                this.pointers[1].x, this.pointers[1].y
            );
            const scaleFactor = newDistance / this.initialDistance;
            this.cameras.main.zoom = this.initialScale * scaleFactor;
        }
    }

    private stopPinchZoom() {
        if (this.cameras.main.zoom <= this.originalZoom) {
            this.cameras.main.zoom = this.originalZoom;
            this.cameras.main.scrollX = this.originalScrollX;
            this.cameras.main.scrollY = this.originalScrollY;
        }
        this.initialDistance = null;
        this.initialScale = null;
    }

    private startDrag(pointer: Phaser.Input.Pointer) {
        this.isDragging = true;
        this.dragStartX = pointer.x;
        this.dragStartY = pointer.y;
        this.cameraStartX = this.cameras.main.scrollX;
        this.cameraStartY = this.cameras.main.scrollY;
    }

    private updateDrag(pointer: Phaser.Input.Pointer) {
        if (this.isDragging) {
            const deltaX = pointer.x - this.dragStartX;
            const deltaY = pointer.y - this.dragStartY;

            if (this.cameras.main.zoom > this.originalZoom) {
                this.cameras.main.scrollX = this.cameraStartX - deltaX / this.cameras.main.zoom;
                this.cameras.main.scrollY = this.cameraStartY - deltaY / this.cameras.main.zoom;
            }
        }
    }

    private stopDrag() {
        if (this.cameras.main.zoom <= this.originalZoom) {
            this.cameras.main.scrollX = this.originalScrollX;
            this.cameras.main.scrollY = this.originalScrollY;
        }
        this.isDragging = false;
    }
}
