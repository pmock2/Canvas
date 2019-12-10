import { applicationShell, zIndexPlus } from '../library'
import { Canvas } from './canvas';

export enum DraggableType { CONNECTOR, CONNECTOR_LARGE, SQUARE, SQUARE_LARGE, ROUNDED }
export enum DraggableFunction {CONDITION, OPERATOR}

export class DragItem {
    name: string;
    element: HTMLDivElement;
    shadowElement: HTMLDivElement;
    selected: boolean;
    isSticky: boolean;
    type: DraggableType;
    draggableFunction: DraggableFunction;

    constructor(name: string, isSticky: boolean = false, type: DraggableType = DraggableType.SQUARE, draggableFunction: DraggableFunction = null) {

        this.name = name;
        this.isSticky = isSticky;
        this.type = type;
        this.draggableFunction = draggableFunction;
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
            case DraggableType.ROUNDED: {
                this.element.classList.add('rounded');
                this.shadowElement.classList.add('rounded');
                break;
            }
        }

        this.selected = false;
        this.wireItUp();
    }

    wireItUp(): void {
        this.element.onmousedown = (e: MouseEvent) => {
            zIndexPlus(this.element);
            
            let startingX = e.x;
            let startingY = e.y;
            
            let elementToUse = this.isSticky ? this.shadowElement : this.element;
            
            if (this.isSticky) {
                document.body.appendChild(this.shadowElement);
                this.shadowElement.style.top = `${e.y - this.shadowElement.offsetHeight / 2}`;
                this.shadowElement.style.left = `${e.x - 2}px`
            }
            
            let originalLeft: number = parseInt(elementToUse.style.left.replace('px', ''));
            let originalTop: number = parseInt(elementToUse.style.top.replace('px', ''));
            
            applicationShell.canvas.selectedDragItem = this;
            document.onmousemove = (m: MouseEvent) => {
                this.mouseMove(m, startingX, startingY, originalLeft, originalTop, elementToUse);
            }
        };

        this.element.onclick = (e) => {
            console.log('clicked')
            if (!applicationShell.ctrlKey) {
                applicationShell.canvas.dragItems.forEach((dragItem) => {
                    dragItem.select(false);
                });
            }
            
            this.select(true);
        }

    }

    mouseMove(e: MouseEvent, startingX: number, startingY: number, originalLeft: number, originalTop: number, dragElement: HTMLElement): void {
        this.element.style.pointerEvents = 'none';
        let currentX = e.x;
        let currentY = e.y;
        
        let diffX = currentX - startingX;
        let diffY = currentY - startingY;
        
        let newLeft: string = `${originalLeft + diffX}px`;
        let newTop: string = `${originalTop + diffY}px`;
        
        dragElement.style.left = newLeft;
        dragElement.style.top = newTop;
    }

    select(select: boolean): void {
        if (this.isSticky) {
            return;
        }
        this.element.dataset.selected = select.toString();
        this.selected = select;
    }
    
    ground(ground: boolean): void {
        if (ground) {
            this.element.classList.add('grounded');
            this.element.style.removeProperty('left');
            this.element.style.removeProperty('top');
            this.element.style.removeProperty('z-index');
            this.element.style.removeProperty('pointer-events');
        }
        else {
            this.element.classList.remove('grounded');
        }
    }
}