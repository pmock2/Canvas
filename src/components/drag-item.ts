import { applicationShell } from '../library'

export enum DraggableType { CONNECTOR, CONNECTOR_LARGE, SQUARE, SQUARE_LARGE, ROUNDED }

export class DragItem {
    name: string;
    element: HTMLDivElement;
    shadowElement: HTMLDivElement;
    selected: boolean;
    isSticky: boolean;
    type: DraggableType;

    constructor(name: string, isSticky: boolean = false, type: DraggableType = DraggableType.SQUARE) {

        this.name = name;
        this.isSticky = isSticky;
        this.type = type;
        this.init();
    }

    init(): void {
        let innerHtml: string = `
            <div class="text">${this.name}</div>
        `;

        this.element = document.createElement('div');
        this.element.classList.add('draggable');
        this.element.innerHTML = innerHtml;

        this.shadowElement = document.createElement('div');
        this.shadowElement.classList.add('draggable');
        this.shadowElement.classList.add('draggable-shadow');
        this.shadowElement.innerHTML = innerHtml;

        switch (this.type) {
            case DraggableType.CONNECTOR: {
                this.element.classList.add('pointer');
                this.shadowElement.classList.add('pointer');
                break;
            }
            case DraggableType.SQUARE: {
                this.element.classList.add('square');
                this.shadowElement.classList.add('square');
                break;
            }
            case DraggableType.SQUARE_LARGE: {
                this.element.classList.add('square-large');
                this.shadowElement.classList.add('square-large');
                break;
            }
        }

        this.selected = false;
        this.wireItUp();
    }

    wireItUp(): void {
        this.element.addEventListener("mousedown", () => {
            applicationShell.canvas.selectedDragItem = this;
            document.onmousemove = (e) => {
                this.mouseMove(e);
            }
        });

        this.element.onclick = (e) => {
            applicationShell.canvas.dragItems.forEach((dragItem) => {
                dragItem.select(false);
            });
            this.select(true);
        }

    }

    mouseMove(e: MouseEvent): void {
        let elementToUse = this.isSticky ? this.shadowElement : this.element;
        if (this.isSticky) {
            document.body.appendChild(this.shadowElement);
        }
        elementToUse.style.left = `${e.x - 2}px`;
        elementToUse.style.top = `${e.y - this.element.offsetHeight / 2}px`;
    }

    select(select: boolean): void {
        this.element.dataset.selected = select.toString();
        this.selected = select;
    }
}