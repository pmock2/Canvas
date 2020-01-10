import { ConditionBlock, printLn } from '../library';
import { applicationShell, zIndexPlus } from '../library'
import { OperatorBlock } from './draggable-types/operator-block';
import { VariableBlock } from './draggable-types/variable-block';

export enum DraggableType { CONNECTOR, CONNECTOR_LARGE, SQUARE, SQUARE_LARGE, ROUNDED }
export enum DraggableFunction { CONDITION, OPERATOR, VARIABLE, IF, AND, OR, THEN, ELSE, ACTION }

export class DragItem {
    name: string;
    element: HTMLDivElement;
    shadowElement: HTMLDivElement;
    selected: boolean;
    isSticky: boolean;
    type: DraggableType;
    draggableFunction: DraggableFunction;
    isAnchored: boolean;
    anchoredTo: DragItem;
    anchoredItems: Array<DragItem> = new Array<DragItem>();
    prepend: DragItem;
    append: DragItem;
    operator: DragItem;
    variable: DragItem;

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

        if (this.isSticky) {
            this.element.classList.add('draggable-sticky');
        }

        switch (this.type) {
            case DraggableType.CONNECTOR: {
                this.element.classList.add('pointer');
                this.element.classList.add('connector');

                this.shadowElement.classList.add('pointer');
                this.shadowElement.classList.add('connector');

                let triangleDrop = document.createElement('div');
                triangleDrop.classList.add('triangle-crop');
                this.element.appendChild(triangleDrop);
                break;
            }
            case DraggableType.CONNECTOR_LARGE: {
                this.element.classList.add('connector-large');
                this.shadowElement.classList.add('connector-large');

                let triangleDrop = document.createElement('div');
                triangleDrop.classList.add('triangle-crop');
                this.element.appendChild(triangleDrop);

                let triangleDropShadow = document.createElement('div');
                triangleDropShadow.classList.add('triangle-crop');
                this.element.appendChild(triangleDropShadow);
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
            this.mouseDown(e);
        };

        this.element.onclick = (e) => {
            if (!applicationShell.ctrlKey) {
                applicationShell.canvas.dragItems.forEach((dragItem) => {
                    dragItem.select(false);
                });
            }

            this.select(true);
        }

    }

    mouseDown(e: MouseEvent): void {
        let isDraggingChild = false;
        this.anchoredItems.forEach((item) => {
            if (item === applicationShell.canvas.draggingItem) {
                isDraggingChild = true;
            }
        });

        if (isDraggingChild) {
            return;
        }

        document.body.dataset.dragging = 'true';

        applicationShell.canvas.draggingItem = this;

        zIndexPlus(this.element);

        let startingX = e.x;
        let startingY = e.y;

        if (this.isAnchored) {
            this.anchor(false);
            this.element.style.left = `${startingX - 2}px`;
            this.element.style.top = `${startingY - this.element.offsetHeight / 2}px`;
        }

        let elementToUse = this.isSticky ? this.shadowElement : this.element;

        if (this.isSticky) {
            document.body.appendChild(this.shadowElement);
            this.shadowElement.style.top = `${e.y - this.shadowElement.offsetHeight / 2}`;
            this.shadowElement.style.left = `${e.x - 2}px`
        }

        let originalLeft: number = parseInt(elementToUse.style.left.replace('px', ''));
        let originalTop: number = parseInt(elementToUse.style.top.replace('px', ''));

        document.onmousemove = (m: MouseEvent) => {
            this.mouseMove(m, startingX, startingY, originalLeft, originalTop, elementToUse);
        }
    }

    mouseMove(e: MouseEvent, startingX: number, startingY: number, originalLeft: number, originalTop: number, dragElement: HTMLElement): void {
        this.element.dataset.dragging = 'true';
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

    anchor(anchor: boolean, anchoredTo: DragItem = null): void {
        this.isAnchored = anchor;
        if (anchor) {
            this.element.classList.add('grounded');
            this.element.style.removeProperty('left');
            this.element.style.removeProperty('top');
            this.element.style.removeProperty('z-index');
            this.element.style.removeProperty('pointer-events');
            this.anchoredTo = anchoredTo;
            this.anchoredTo.anchoredItems.push(this);
        }
        else {
            if (this.anchoredTo.prepend !== undefined && this.anchoredTo.prepend !== null && this.anchoredTo.prepend === this) {
                this.anchoredTo.prepend = null;
            }
            else if (this.anchoredTo.append !== undefined && this.anchoredTo.append !== null && this.anchoredTo.append === this) {
                this.anchoredTo.append = null;
            }
            if (this.draggableFunction === DraggableFunction.VARIABLE && this.anchoredTo instanceof ConditionBlock) {
                printLn('destroy')
                $(`#${this.anchoredTo.variableID}`).select2('destroy');
                document.getElementById(`${this.anchoredTo.variableID}`).remove();
                let variablePlaceHolder = document.createElement('div');
                variablePlaceHolder.classList.add('drop-zone');
                variablePlaceHolder.classList.add('variable-value');
                variablePlaceHolder.innerHTML = 'Value';
                this.anchoredTo.element.insertBefore(variablePlaceHolder, document.querySelector('.action-drop-prepend'));
            }


            this.element.classList.remove('grounded');
            this.element.classList.remove('appended-connector');
            this.element.classList.remove('prepended-connector');
            this.element.classList.remove('prepended-condition');
            this.element.classList.remove('appended-condition');
            this.element.classList.remove('prepended-action');
            this.element.classList.remove('appended-action');

            if (this.draggableFunction === DraggableFunction.VARIABLE) {
                this.element.parentElement.classList.remove('hide-label');
            }

            this.element.remove();
            applicationShell.canvas.element.append(this.element);
            anchoredTo = null;
        }
    }
}