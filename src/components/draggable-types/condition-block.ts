import { DragItem, applicationShell, states } from "../../library";
import { DraggableType, DraggableFunction } from "../drag-item";
import { OperatorBlock } from "./operator-block";
import { VariableBlock } from "./variable-block";
import { ConnectorBlock } from "./connector-block";

export enum ConditionType { IF, IF_ELSE }

export class ConditionBlock extends DragItem {
    
    variableID: number;

    constructor(isSticky: boolean = false) {
        let innerText = '';
        if (isSticky) {
            innerText = 'Conditional'
        }
        super(innerText, isSticky, DraggableType.CONNECTOR_LARGE, DraggableFunction.CONDITION);
        this.element.classList.add('condition-block');
        this.shadowElement.classList.add('condition-block'); 
        if (!isSticky) {
            this.initConditionBlock();
        }
    }

    initConditionBlock(): void {
        let innerHtml: string = `
            <div class="drag-label">Condition</div>
            <div class="triangle-crop"></div>
            <div class="large-box-title">If</div>
            <div class="drop-zone variable-drop" data-dropType="variable" title="Drop a variable card here">Variable</div>
            <div class="drop-zone operator-drop" data-dropType="operator" title="Drop an operator card here">Operator</div>
            <div type="text" class="drop-zone variable-value">Value</div>
            <div class="action-drop-prepend"></div>
            <div class="action-drop-append"></div>
        `;  
        this.element.innerHTML = innerHtml;
        
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
            this.element.querySelector('.operator-drop').appendChild(operatorBlockToUse.element);
            applicationShell.canvas.dragItems.push(operatorBlockToUse);
        }
    }

    attachVariable(variableBlock: VariableBlock): void {
        if (variableBlock.draggableFunction = DraggableFunction.VARIABLE) {
            var variableBlockToUse: VariableBlock;
            if (variableBlock.isSticky) {
                variableBlockToUse = new VariableBlock(variableBlock.name);
            } else {
                variableBlockToUse = variableBlock;
            }

            this.variable = variableBlockToUse;
            variableBlockToUse.anchor(true, this);
            this.element.querySelector('.variable-drop').appendChild(this.variable.element);
            this.element.querySelector('.variable-drop').classList.add('hide-label');
            variableBlockToUse.anchor(true, this);
            applicationShell.canvas.dragItems.push(this.variable);
            
            switch (variableBlockToUse.name.toLowerCase()) {
                case 'state': {
                    let select = document.createElement('select');
                    this.variableID = Date.now();
                    select.id = this.variableID.toString();
                    select.classList.add('drop-zone-long')
                    states.forEach((state) => {
                        let option = document.createElement('option');
                        option.text = state;
                       select.appendChild(option); 
                    });
                    
                    this.element.insertBefore(select, document.querySelector('.variable-value'));
                    document.querySelector('.variable-value').remove();
                    $(`#${this.variableID}`).select2();
                    
                    break;
                }
            }
        }
    }

    attachConnector(connectorBlock: ConnectorBlock, prepend: boolean) {
        if (connectorBlock.type == DraggableType.CONNECTOR) {
            var connectorBlockToUse: ConnectorBlock;
            var isValid = false;
            
            if (connectorBlock.isSticky) {
                connectorBlockToUse = new ConnectorBlock(connectorBlock.name, false, DraggableType.CONNECTOR, connectorBlock.draggableFunction);
            } else {
                connectorBlockToUse = connectorBlock;
            }

            if (prepend
                && connectorBlockToUse.draggableFunction !== DraggableFunction.THEN 
                && connectorBlockToUse.draggableFunction !== DraggableFunction.CONDITION
                && (this.prepend === null || this.prepend === undefined)) {
                isValid = true;
                this.prepend = connectorBlockToUse;
                this.prepend.element.classList.add('prepended-connector');
            }
            else if (!prepend 
                && connectorBlockToUse.draggableFunction !== DraggableFunction.CONDITION 
                && connectorBlockToUse.draggableFunction !== DraggableFunction.ELSE
                && (this.append === null || this.append === undefined)){
                isValid = true;
                this.append = connectorBlockToUse;
                this.append.element.classList.add('appended-connector');
            }
            
            if (isValid) {
                connectorBlockToUse.anchor(true, this);
                if (prepend) {
                    this.element.querySelector('.action-drop-prepend').appendChild(connectorBlockToUse.element);
                }
                else {
                    this.element.querySelector('.action-drop-append').appendChild(connectorBlockToUse.element);
                }
            }
        }
    }

    wireUpConditionBlock(): void {
        this.element.onmouseup = (e) => {
            let target = e.target as HTMLElement
            let draggingItem = applicationShell.canvas.draggingItem;
            if (draggingItem !== null && draggingItem !== undefined) {
                //attach dropped item
                switch (draggingItem.draggableFunction) {
                    case DraggableFunction.OPERATOR: {
                        if (target.classList.contains('operator-drop') && draggingItem instanceof OperatorBlock) {
                            this.attachOperator(draggingItem);
                        }
                        break;
                    }
                    case DraggableFunction.VARIABLE: {
                        if (target.classList.contains('variable-drop') && draggingItem instanceof VariableBlock) {
                            this.attachVariable(draggingItem);
                        }
                        break;
                    }
                    case DraggableFunction.AND:
                    case DraggableFunction.THEN:
                    case DraggableFunction.OR:
                    case DraggableFunction.IF: {
                        let width = target.offsetWidth;
                        let xCoordInClickTarget = e.clientX - target.getBoundingClientRect().left;
                        if (draggingItem instanceof ConnectorBlock) {
                            this.attachConnector(draggingItem, width / 2 > xCoordInClickTarget);
                        }
                        break;
                    }
                }
            }
        }
        
        this.element.onmouseover = (e) => {
            let target = e.target as HTMLElement;
            let draggingItem = applicationShell.canvas.draggingItem;
            if (draggingItem !== null && draggingItem !== undefined) {
                //highlight drop area
                switch (draggingItem.draggableFunction) {
                    case DraggableFunction.OPERATOR: {
                        if (target.classList.contains('operator-drop') && draggingItem instanceof OperatorBlock) {
                            target.classList.add('hover');
                        }
                        break;
                    }
                    case DraggableFunction.VARIABLE: {
                        if (target.classList.contains('variable-drop') && draggingItem instanceof VariableBlock) {
                            target.classList.add('hover');
                        }
                        break;
                    }
                    case DraggableFunction.AND:
                    case DraggableFunction.OR:
                    case DraggableFunction.THEN:{
                        let width = target.offsetWidth;
                        let xCoordInClickTarget = e.clientX - target.getBoundingClientRect().left;
                        let triangleCrop = this.element.querySelector('.triangle-crop') as HTMLElement;

                        if (width / 2 > xCoordInClickTarget) {
                            //left side
                            if (draggingItem.draggableFunction !== DraggableFunction.THEN) {
                                triangleCrop.dataset.hover = 'true';
                            }
                            this.element.dataset.hover = 'false';
                        } else {
                            //right side
                            this.element.dataset.hover = 'true';
                            triangleCrop.dataset.hover = 'false';
                        }
                        break;
                    }
                }
            }
        }

        this.element.onmousemove = (e) => {
            let target = e.target as HTMLElement;
            let draggingItem = applicationShell.canvas.draggingItem;
            if (draggingItem !== null && draggingItem !== undefined) {
                //attach dropped item
                switch (draggingItem.draggableFunction) {
                    case DraggableFunction.AND:
                    case DraggableFunction.OR:
                    case DraggableFunction.THEN:
                    case DraggableFunction.IF: {
                        let width = target.offsetWidth;
                        let xCoordInClickTarget = e.clientX - target.getBoundingClientRect().left;
                        let triangleCrop = this.element.querySelector('.triangle-crop') as HTMLElement;

                        if (width / 2 > xCoordInClickTarget) {
                            //left side
                            if (draggingItem.draggableFunction !== DraggableFunction.THEN) {
                                triangleCrop.dataset.hover = 'true';
                            }
                            this.element.dataset.hover = 'false';
                        } else {
                            //right side
                            this.element.dataset.hover = 'true';
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
}