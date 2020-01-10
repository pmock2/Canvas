import { DragItem } from "../library";
import { DraggableType, DraggableFunction } from "./drag-item";
import { ConditionBlock, ConditionType } from "./draggable-types/condition-block";
import { ConnectorBlock } from "./draggable-types/connector-block";
import { ActionBlock } from "./draggable-types/action-block";

export class ActionItemBox {
    element: HTMLDivElement;
    
    conditionBlock: ConditionBlock = new ConditionBlock(true);
    actionBlock: ActionBlock = new ActionBlock(true);
    thenBlock: ConnectorBlock = new ConnectorBlock('Then', true, DraggableType.CONNECTOR, DraggableFunction.THEN);
    elseBlock: ConnectorBlock = new ConnectorBlock('Else', true, DraggableType.CONNECTOR, DraggableFunction.ELSE);
    andBlock: ConnectorBlock = new ConnectorBlock('AND', true, DraggableType.CONNECTOR, DraggableFunction.AND);
    orBlock: ConnectorBlock = new ConnectorBlock('OR', true, DraggableType.CONNECTOR, DraggableFunction.OR);

    constructor() {
        this.init();
    }
    
    init(): void {
        this.element = document.createElement('div');
        this.element.classList.add('action-item-box');
        
        this.conditionBlock.element.classList.add('vertical-box');
        this.element.appendChild(this.conditionBlock.element);

        this.actionBlock.element.classList.add('vertical-box');
        this.element.appendChild(this.actionBlock.element);

        this.thenBlock.element.classList.add('vertical-box');
        this.element.appendChild(this.thenBlock.element);

        this.elseBlock.element.classList.add('vertical-box');
        this.element.appendChild(this.elseBlock.element);
        
        this.andBlock.element.classList.add('vertical-box');
        this.element.appendChild(this.andBlock.element);
        
        this.orBlock.element.classList.add('vertical-box');
        this.element.appendChild(this.orBlock.element);
    }
}