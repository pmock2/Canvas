import { DragItem } from "../../library";
import { DraggableType, DraggableFunction } from "../drag-item";

export class OperatorBlock extends DragItem {
    constructor(text: string, isSticky: boolean = false) {
        super(text, isSticky, DraggableType.ROUNDED, DraggableFunction.OPERATOR);
        this.init();
        this.initOperatorBlock();
    }

    initOperatorBlock(): void {
        this.element.classList.add('operator-block');
        this.shadowElement.classList.add('operator-block');
    }
}