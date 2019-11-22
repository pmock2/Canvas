import { DragItem } from "../library";

export class ActionItemBox {
    element: HTMLDivElement;
    
    
    ifBlock: DragItem = new DragItem('If');
    elseBlock: DragItem = new DragItem('Else', true);
    thenBlock: DragItem = new DragItem('Then', true);
    conditionBLock: DragItem = new DragItem('Condition', true);
    actionBlock: DragItem = new DragItem('Action', true);

    constructor() {
        this.init();
    }
    
    init(): void {
        this.element = document.createElement('div');
        this.element.classList.add('action-item-box');

        this.ifBlock.element.classList.add('draggable-sticky-action-box');
        this.element.appendChild(this.ifBlock.element);
        
        this.elseBlock.element.classList.add('draggable-sticky-action-box');
        this.elseBlock.element.style.top = '10%';
        this.element.appendChild(this.elseBlock.element);
        
        this.thenBlock.element.classList.add('draggable-sticky-action-box');
        this.thenBlock.element.style.top = '20%';
        this.element.appendChild(this.thenBlock.element);
        
        this.conditionBLock.element.classList.add('draggable-sticky-action-box');
        this.conditionBLock.element.style.top = '30%';
        this.element.appendChild(this.conditionBLock.element);
        
        this.actionBlock.element.classList.add('draggable-sticky-action-box');
        this.actionBlock.element.style.top = '40%';
        this.element.appendChild(this.actionBlock.element);
        
    }
}