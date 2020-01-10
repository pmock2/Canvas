import { DragItem, applicationShell } from "../../library";
import { DraggableType, DraggableFunction } from "../drag-item";
import { ConnectorBlock } from "./connector-block";

export class ActionBlock extends DragItem{
    constructor(isSticky: boolean = false) {
        super('Action', isSticky, DraggableType.CONNECTOR_LARGE, DraggableFunction.ACTION);
        this.element.classList.add('action-block');
        this.shadowElement.classList.add('action-block');
        if (!this.isSticky) {
            this.initActionBlock();
        }
        
    }
    
    initActionBlock(): void {
        let innerHtml = `
            <div class="triangle-crop"></div>            
            <div class="action-drop-prepend"></div>
            <div class="action-drop-append"></div>
            <div style="margin: auto; width: 75%">DO SOMETHING</div>
        `;
        this.element.innerHTML = innerHtml;
        
        this.element.onmouseup = (e) => {
            let target = e.target as HTMLElement
            var draggingItem = applicationShell.canvas.draggingItem;
            if (draggingItem !== null && draggingItem !== undefined) {
                //attach dropped item
                switch (draggingItem.draggableFunction) {
                    case DraggableFunction.THEN: 
                    case DraggableFunction.ACTION: 
                    case DraggableFunction.ELSE: {
                        if (draggingItem instanceof ConnectorBlock) {
                            let width = target.offsetWidth;
                            let xCoordInClickTarget = e.clientX - target.getBoundingClientRect().left;
                            this.attachConnector(draggingItem, width / 2 > xCoordInClickTarget);
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
                    case DraggableFunction.THEN: 
                    case DraggableFunction.ACTION: 
                    case DraggableFunction.ELSE: { 
                        let width = target.offsetWidth;
                        let xCoordInClickTarget = e.clientX - target.getBoundingClientRect().left;
                        let triangleCrop = this.element.querySelector('.triangle-crop') as HTMLElement;

                        if (width / 2 > xCoordInClickTarget) {
                            //left side
                            if (draggingItem.draggableFunction !== DraggableFunction.ELSE) {
                                this.element.dataset.hover = 'false';   
                            }
                            triangleCrop.dataset.hover = 'true';
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
                && (this.append === null || this.append === undefined)) {
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
}