import { DragItem, applicationShell } from "../../library";
import { DraggableType, DraggableFunction } from "../drag-item";
import { OperatorBlock } from "./operator-block";

export class ConditionBlock extends DragItem {
    
    operator: DragItem;
    
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
        this.wireUpConditionBlock();
    }
    
    attachOperator(operatorBlock: OperatorBlock): void {
        if (operatorBlock.draggableFunction = DraggableFunction.OPERATOR) {
            var operatorBlockToUse: OperatorBlock;
            if (operatorBlock.isSticky) {
                operatorBlockToUse = new OperatorBlock(operatorBlock.name);
            } else {
                operatorBlockToUse = operatorBlock;
            }
            this.operator = operatorBlockToUse;
            operatorBlockToUse.anchor(true, this);
            this.element.querySelector('.operator-drop').appendChild(this.operator.element);
            applicationShell.canvas.dragItems.push(this.operator);
        }
    }
    
    wireUpConditionBlock(): void {
        this.element.onmouseup = (e) => {
            let target = e.target as HTMLElement
            if (applicationShell.canvas.draggingItem !== null && applicationShell.canvas.draggingItem !== undefined) {
                //attach dropped item
                switch (applicationShell.canvas.draggingItem.draggableFunction) {
                    case DraggableFunction.OPERATOR: {
                        if (target.classList.contains('operator-drop') && applicationShell.canvas.draggingItem instanceof OperatorBlock) {
                            this.attachOperator(applicationShell.canvas.draggingItem);
                        }
                        break;
                    }
                }
            }
        }
    }
}