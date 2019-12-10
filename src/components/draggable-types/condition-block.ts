import { DragItem } from "../../library";
import { DraggableType, DraggableFunction } from "../drag-item";

export class ConditionBlock extends DragItem {
    constructor() {
        super('', false, DraggableType.SQUARE_LARGE, DraggableFunction.CONDITION);
        this.init();
        this.initConditionBlock();
    }
    
    initConditionBlock(): void {
        let innerHtml: string = `
            <div class="drag-label">Condition</div>
            
            <div class="drop-zone-long" data-dropType="identifier" title="Drop a variable card here">Variable</div>
            <div class="drop-zone operator-drop" data-dropType="operator" title="Drop an operator card here">Operator</div>
            <input type="text" class="draggable-input" placeholder="value">
        `;
        this.element.innerHTML = innerHtml;
        this.element.classList.add('condition-block');
    }
}