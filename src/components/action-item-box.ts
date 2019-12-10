import { DragItem } from "../library";
import { DraggableType, DraggableFunction } from "./drag-item";

export class ActionItemBox {
    element: HTMLDivElement;
    
    
    ifBlock: DragItem = new DragItem('If', true, DraggableType.CONNECTOR);
    elseBlock: DragItem = new DragItem('Else', true, DraggableType.CONNECTOR);
    thenBlock: DragItem = new DragItem('Then', true, DraggableType.CONNECTOR);
    conditionBLock: DragItem = new DragItem('Condition', true, DraggableType.SQUARE_LARGE, DraggableFunction.CONDITION);
    actionBlock: DragItem = new DragItem('Action', true, DraggableType.SQUARE_LARGE);

    constructor() {
        this.init();
    }
    
    init(): void {
        this.element = document.createElement('div');
        this.element.classList.add('action-item-box');

        this.ifBlock.element.classList.add('draggable-sticky');
        this.ifBlock.element.classList.add('action-box');
        this.element.appendChild(this.ifBlock.element);
        
        this.elseBlock.element.classList.add('draggable-sticky');
        this.elseBlock.element.classList.add('action-box');
        this.element.appendChild(this.elseBlock.element);
        
        this.thenBlock.element.classList.add('draggable-sticky');
        this.thenBlock.element.classList.add('action-box');
        this.element.appendChild(this.thenBlock.element);
        
        this.conditionBLock.element.classList.add('draggable-sticky');
        this.conditionBLock.element.classList.add('action-box');
        this.element.appendChild(this.conditionBLock.element);
        
        this.actionBlock.element.classList.add('draggable-sticky');
        this.actionBlock.element.classList.add('action-box');
        this.element.appendChild(this.actionBlock.element);
        
    }
}