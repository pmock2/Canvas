import { DragItem } from "../../library";
import { DraggableType, DraggableFunction } from "../drag-item";

export class VariableBlock extends DragItem {
    constructor(text: string, isSticky: boolean = false) {
        super(text, isSticky, DraggableType.SQUARE, DraggableFunction.VARIABLE);
        this.init();
        this.initVariableBlock();
    }

    initVariableBlock(): void {
        this.element.classList.add('variable-block');
        this.shadowElement.classList.add('variable-block');
    }
}