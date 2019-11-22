import { DragItem } from "./drag-item";

export class Canvas {
    element: HTMLDivElement;
    selectedDragItem: DragItem;
    dragItems: Array<DragItem> = [];

    constructor() {
        this.init();
    }

    init(): void {
        this.element = document.createElement('div');
        this.element.classList.add('canvas');

        document.onmouseup = (e) => {
            let target = e.target as HTMLElement;
            console.log(target.classList);
            if (target.classList.contains('canvas') && this.selectedDragItem !== null) {
                document.onmousemove = null;

                if (this.selectedDragItem.isSticky) {
                    this.selectedDragItem.shadowElement.remove();

                    this.dragItems.forEach((dragItem) => {
                        dragItem.select(false);
                    });

                    let newDraggable: DragItem = new DragItem(this.selectedDragItem.name);
                    newDraggable.element.style.left = `${e.x - 2}px`;
                    newDraggable.element.style.top = `${e.y - this.selectedDragItem.element.offsetHeight / 2}px`;
                    newDraggable.select(true);

                    this.dragItems.push(newDraggable);
                    this.element.appendChild(newDraggable.element);
                }

                this.selectedDragItem = null;
            }
            else if (this.selectedDragItem !== null && this.selectedDragItem.isSticky) {
                document.onmousemove = null;
                this.selectedDragItem.shadowElement.remove();
                this.selectedDragItem = null;
            }
            else {
                console.log('wuh oh');
            }
        };

        this.element.onmousedown = (e: MouseEvent) => {
            let startingX = e.x;
            let startingY = e.y;


        }

        this.element.onclick = (e) => {
            let target = e.target as HTMLElement;

            if (target.classList.contains('canvas')) {
                this.dragItems.forEach((dragItem) => {
                    dragItem.select(false);
                });
            }
        }
    }
}