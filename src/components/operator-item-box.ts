import { DragItem } from "../library";
import { DraggableType, DraggableFunction } from "./drag-item";
import { OperatorBlock } from "./draggable-types/operator-block";

export class OperatorBox {
    element: HTMLDivElement;
    
    isBlock: OperatorBlock = new OperatorBlock('=', true);
    isNotBlock: OperatorBlock = new OperatorBlock('=/=', true);
    greaterThanBlock: OperatorBlock = new OperatorBlock('>', true);
    lessThanBlock: OperatorBlock = new OperatorBlock('<', true);
    greaterThanOrEqualToBlock: OperatorBlock = new OperatorBlock('>=', true);
    lessThanOrEqualToBlock: OperatorBlock = new OperatorBlock('<=', true);
    andBlock: OperatorBlock = new OperatorBlock('AND', true);
    orBlock: OperatorBlock = new OperatorBlock('OR', true);
    
    constructor() {
        this.init();
    }
    
    init(): void {
        this.element = document.createElement('div');
        this.element.classList.add('operator-box');
        
        this.isBlock.element.classList.add('draggable-sticky');
        this.isBlock.element.classList.add('operator-box-container');
        this.element.appendChild(this.isBlock.element);

        this.isNotBlock.element.classList.add('draggable-sticky');
        this.isNotBlock.element.classList.add('operator-box-container');
        this.element.appendChild(this.isNotBlock.element);

        this.greaterThanBlock.element.classList.add('draggable-sticky');
        this.greaterThanBlock.element.classList.add('operator-box-container');
        this.element.appendChild(this.greaterThanBlock.element);

        this.lessThanBlock.element.classList.add('draggable-sticky');
        this.lessThanBlock.element.classList.add('operator-box-container');
        this.element.appendChild(this.lessThanBlock.element);

        this.greaterThanOrEqualToBlock.element.classList.add('draggable-sticky');
        this.greaterThanOrEqualToBlock.element.classList.add('operator-box-container');
        this.element.appendChild(this.greaterThanOrEqualToBlock.element);

        this.lessThanOrEqualToBlock.element.classList.add('draggable-sticky');
        this.lessThanOrEqualToBlock.element.classList.add('operator-box-container');
        this.element.appendChild(this.lessThanOrEqualToBlock.element);

        this.andBlock.element.classList.add('draggable-sticky');
        this.andBlock.element.classList.add('operator-box-container');
        this.element.appendChild(this.andBlock.element);

        this.orBlock.element.classList.add('draggable-sticky');
        this.orBlock.element.classList.add('operator-box-container');
        this.element.appendChild(this.orBlock.element);
    }
}