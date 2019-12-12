import { DragItem, DraggableFunction, DraggableType } from "./drag-item";
import { ConditionBlock } from "./draggable-types/condition-block";
import { zIndexPlus } from "../library";
import { OperatorBlock } from "./draggable-types/operator-block";

export class Canvas {
    element: HTMLDivElement;
    draggingItem: DragItem;
    dragItems: Array<DragItem> = [];
    select: HTMLDivElement = document.createElement('div');

    constructor() {
        this.init();
    }

    init(): void {
        this.element = document.createElement('div');
        this.element.classList.add('canvas');
        this.select.classList.add('drag-select');

        document.onmouseup = (e) => {
            this.select.remove();
            document.onmousemove = null;

            let target = e.target as HTMLElement;
            
            if (target.classList.contains('canvas') && this.draggingItem !== null && this.draggingItem !== undefined) {
                this.disableEnableDragItems(false);
                document.onmousemove = null;

                if (this.draggingItem.isSticky) {
                    this.draggingItem.shadowElement.remove();

                    this.dragItems.forEach((dragItem) => {
                        dragItem.select(false);
                    });

                    switch (this.draggingItem.draggableFunction) {
                        case DraggableFunction.CONDITION: {
                            let newConditional: ConditionBlock = new ConditionBlock();
                            newConditional.element.style.left = `${e.x - 2}px`;
                            newConditional.element.style.top = `${e.y - this.draggingItem.element.offsetHeight / 2}px`;

                            newConditional.select(true);

                            zIndexPlus(newConditional.element);

                            this.dragItems.push(newConditional);
                            this.element.appendChild(newConditional.element);
                            break;
                        }
                        case DraggableFunction.OPERATOR: {
                            let newOperator = new OperatorBlock(this.draggingItem.name);
                            newOperator.element.style.left = `${e.x - 2}px`;
                            newOperator.element.style.top = `${e.y - this.draggingItem.element.offsetHeight / 2}px`;

                            newOperator.select(true);

                            zIndexPlus(newOperator.element);

                            this.dragItems.push(newOperator);
                            this.element.appendChild(newOperator.element);
                            break;
                        }
                        default: {
                            let newDraggable: DragItem = new DragItem(this.draggingItem.name, false, this.draggingItem.type, this.draggingItem.draggableFunction);
                            newDraggable.element.style.left = `${e.x - 2}px`;
                            newDraggable.element.style.top = `${e.y - this.draggingItem.element.offsetHeight / 2}px`;
                            newDraggable.select(true);

                            zIndexPlus(newDraggable.element);

                            this.dragItems.push(newDraggable);
                            this.element.appendChild(newDraggable.element);
                            break;
                        }
                    }
                } else {
                    if (this.draggingItem.anchoredTo !== null && this.draggingItem.anchoredTo !== undefined) {
                        let index = 0;
                        let foundIt = false;

                        this.draggingItem.anchoredTo.anchoredItems.forEach((item) => {
                           if (!foundIt) {
                               if (item === this.draggingItem) {
                                   foundIt = true
                               } else {
                                   index++;
                               }
                           } 
                        });

                        if (foundIt) {
                            this.draggingItem.anchoredTo.anchoredItems.splice(index, 1)
                        }

                        this.draggingItem.anchoredTo = null;
                    }
                }

                this.draggingItem = null;
            }
            else if (this.draggingItem !== null && this.draggingItem !== undefined) {
                this.disableEnableDragItems(false);
                document.onmousemove = null;
                this.draggingItem.shadowElement.remove();
                this.draggingItem = null;
            }
            else {

            }
        };

        //multi select
        this.element.onmousedown = (e: MouseEvent) => {
            let target = e.target as HTMLElement;

            if (target.classList.contains('canvas')) {
                this.dragItems.forEach((dragItem) => {
                    dragItem.select(false);
                });

                this.select.remove();
                document.onmousemove = null;

                let startingX = e.x;
                let startingY = e.y;
                this.select.style.left = `${startingX}px`;
                this.select.style.top = `${startingY}px`;
                this.select.style.width = `0px`;
                this.select.style.height = `0px`;
                this.select.style.removeProperty('transform')

                document.body.appendChild(this.select);

                document.onmousemove = (dragEvent: MouseEvent) => {
                    let currentX = dragEvent.x;
                    let currentY = dragEvent.y;

                    let newWidth = currentX - startingX;
                    let newHeight = currentY - startingY;
                    
                    let flipVertical = newHeight < 0;
                    let flipHorizontal = newWidth < 0;
                    
                    let transform = `rotateX(${flipVertical ? '180' : '0'}deg) rotateY(${flipHorizontal ? '180' : '0'}deg)`
                    
                    this.select.style.transform = transform;

                    this.select.style.width = `${Math.abs(newWidth)}px`;
                    this.select.style.height = `${Math.abs(newHeight)}px`;
                    

                    let rectSelection = this.select.getBoundingClientRect();


                    this.dragItems.forEach((item) => {
                        var rect = item.element.getBoundingClientRect();
                        if (rect.top + rect.height > rectSelection.top
                            && rect.left + rect.width > rectSelection.left
                            && rect.bottom - rect.height < rectSelection.bottom
                            && rect.right - rect.width < rectSelection.right) {

                            item.select(true);
                        }
                        else {
                            item.select(false);
                        }
                    });
                }
            }
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

    disableEnableDragItems(disable: boolean): void {
        if (this.draggingItem !== undefined && this.draggingItem !== null) {
            if (disable) {
                this.draggingItem.element.style.pointerEvents = 'none'
            } else {
                this.draggingItem.element.style.removeProperty('pointer-events');
            }
        }

        this.dragItems.forEach((item) => {
            if (disable) {
                item.element.style.pointerEvents = 'none'
            } else {
                item.element.style.removeProperty('pointer-events');
            }
        });
    }
}