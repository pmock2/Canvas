import { DragItem, applicationShell, printLn } from "../../library";
import { DraggableType, DraggableFunction } from "../drag-item";
import { ConditionBlock } from "./condition-block";
import { ActionBlock } from "./action-block";

export class ConnectorBlock extends DragItem {

    constructor(name: string, isSticky: boolean, type: DraggableType, dragFunction: DraggableFunction) {
        super(name, isSticky, type, dragFunction);
        this.initConnectorBlock();
    }

    initConnectorBlock() {
        this.element.onmouseup = (e) => {
            let target = e.target as HTMLElement
            var draggingItem = applicationShell.canvas.draggingItem;
            let width = target.offsetWidth;
            let xCoordInClickTarget = e.clientX - target.getBoundingClientRect().left;

            if (draggingItem !== null && draggingItem !== undefined) {
                //attach dropped item
                switch (draggingItem.draggableFunction) {
                    case DraggableFunction.ACTION: {
                        if (draggingItem instanceof ActionBlock) {
                            this.attachActionBlock(draggingItem, width / 2 > xCoordInClickTarget);
                        }
                        break;
                    }
                    case DraggableFunction.CONDITION: {
                        if (draggingItem instanceof ConditionBlock) {
                            this.attachConditionBlock(draggingItem, width / 2 > xCoordInClickTarget);
                        }
                        break;
                    }
                }
            }
        }

        this.element.onmouseover = (e) => {
            let target = e.target as HTMLElement;
            let draggingItem = applicationShell.canvas.draggingItem
            if (draggingItem !== null && draggingItem !== undefined) {
                //attach dropped item
                switch (draggingItem.draggableFunction) {
                    case DraggableFunction.ACTION:
                    case DraggableFunction.CONDITION: {
                        printLn('condition over');
                        let width = target.offsetWidth;
                        let xCoordInClickTarget = e.clientX - target.getBoundingClientRect().left;
                        let triangleCrop = this.element.querySelector('.triangle-crop') as HTMLElement;

                        if (width / 2 > xCoordInClickTarget) {
                            //left side
                            this.element.dataset.hover = 'false';
                            triangleCrop.dataset.hover = 'true';
                        } else {
                            //right side
                            // if (this.draggableFunction !== DraggableFunction.THEN && !(draggingItem instanceof ConditionBlock)) {
                                this.element.dataset.hover = 'true';
                            // }
                            triangleCrop.dataset.hover = 'false';
                        }
                        break;
                    }
                }
            }
        }

        this.element.onmouseout = (e) => {
            let target = e.target as HTMLElement;
            if (target.classList.contains('hover')) {
                target.classList.remove('hover');
            }

            let triangleCrop = this.element.querySelector('.triangle-crop') as HTMLElement;
            triangleCrop.dataset.hover = 'false';
            this.element.dataset.hover = 'false';
        }
    }

    attachActionBlock(actionBlock: ActionBlock, prepend: boolean): void {
        var actionBlockToUse: ActionBlock;
        var isValid = false;

        if (actionBlock.isSticky) {
            actionBlockToUse = new ActionBlock();
        } else {
            actionBlockToUse = actionBlock;
        }

        if (prepend
            && actionBlockToUse.type !== DraggableType.CONNECTOR
            && this.draggableFunction !== DraggableFunction.THEN
            && (this.prepend === null || this.prepend === undefined)) {
            isValid = true;
            this.prepend = actionBlockToUse;
            this.prepend.element.classList.add('prepended-action');
        }
        else if (!prepend
            && actionBlockToUse.type !== DraggableType.CONNECTOR
            && actionBlockToUse.draggableFunction !== DraggableFunction.CONDITION
            && (this.append === null || this.append === undefined)) {
            isValid = true;
            this.append = actionBlockToUse;
            this.append.element.classList.add('appended-action');
        }

        if (isValid) {
            actionBlockToUse.anchor(true, this);
            this.element.appendChild(actionBlockToUse.element);
        }
    }

    attachConditionBlock(conditionBlock: ConditionBlock, prepend: boolean): void {
        if (conditionBlock.draggableFunction == DraggableFunction.CONDITION) {
            var conditionBlockToUse: ConditionBlock;
            var isValid = false;

            if (conditionBlock.isSticky) {
                conditionBlockToUse = new ConditionBlock(false);
            } else {
                conditionBlockToUse = conditionBlock;
            }

            if (prepend
                && conditionBlockToUse.type !== DraggableType.CONNECTOR
                && this.draggableFunction !== DraggableFunction.THEN
                && (this.prepend === null || this.prepend === undefined)) {
                isValid = true;
                this.prepend = conditionBlockToUse;
                this.prepend.element.classList.add('prepended-condition');
            }
            else if (!prepend
                && conditionBlockToUse.type !== DraggableType.CONNECTOR
                && !(this.draggableFunction === DraggableFunction.THEN && conditionBlockToUse.draggableFunction !== DraggableFunction.CONDITION)
                && (this.append === null || this.append === undefined)) {
                isValid = true;
                this.append = conditionBlockToUse;
                this.append.element.classList.add('appended-condition');
            }

            if (isValid) {
                conditionBlockToUse.anchor(true, this);
                this.element.appendChild(conditionBlockToUse.element);
            }
        }
    }
}