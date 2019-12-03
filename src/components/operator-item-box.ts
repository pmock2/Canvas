import { DragItem } from "../library";

export class OperatorBox {
    element: HTMLDivElement;
    
    isBlock: DragItem = new DragItem('IS');
    isNotBlock: DragItem = new DragItem('IS NOT', true);
    andBlock: DragItem = new DragItem('AND', true);
    orBlock: DragItem = new DragItem('OR', true);
    greaterThanBlock: DragItem = new DragItem('>', true);
    lessThanBlock: DragItem = new DragItem('<', true);
    greaterThanOrEqualToBlock: DragItem = new DragItem('>=', true);
    lessThanOrEqualToBlock: DragItem = new DragItem('<=', true);
    
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

        this.andBlock.element.classList.add('draggable-sticky');
        this.andBlock.element.classList.add('operator-box-container');
        this.element.appendChild(this.andBlock.element);

        this.orBlock.element.classList.add('draggable-sticky');
        this.orBlock.element.classList.add('operator-box-container');
        this.element.appendChild(this.orBlock.element);

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
        
    }
}