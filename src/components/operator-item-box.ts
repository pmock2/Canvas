import { OperatorBlock } from "./draggable-types/operator-block";

export class OperatorBox {
    element: HTMLDivElement;
    
    isBlock: OperatorBlock = new OperatorBlock('<span class="fas fa-equals"></span>', true);
    isNotBlock: OperatorBlock = new OperatorBlock('<span class="fas fa-not-equal"></span>', true);
    greaterThanBlock: OperatorBlock = new OperatorBlock('<span class="fas fa-greater-than"></span>', true);
    lessThanBlock: OperatorBlock = new OperatorBlock('<span class="fas fa-less-than"></span>', true);
    greaterThanOrEqualToBlock: OperatorBlock = new OperatorBlock('<span class="fas fa-greater-than-equal"></span>', true);
    lessThanOrEqualToBlock: OperatorBlock = new OperatorBlock('<span class="fas fa-less-than-equal"></span>', true);
    
    constructor() {
        this.init();
    }
    
    init(): void {
        this.element = document.createElement('div');
        this.element.classList.add('operator-box');
        
        this.isBlock.element.classList.add('horizontal-box');
        this.element.appendChild(this.isBlock.element);

        this.isNotBlock.element.classList.add('horizontal-box');
        this.element.appendChild(this.isNotBlock.element);

        this.greaterThanBlock.element.classList.add('horizontal-box');
        this.element.appendChild(this.greaterThanBlock.element);

        this.lessThanBlock.element.classList.add('horizontal-box');
        this.element.appendChild(this.lessThanBlock.element);

        this.greaterThanOrEqualToBlock.element.classList.add('horizontal-box');
        this.element.appendChild(this.greaterThanOrEqualToBlock.element);

        this.lessThanOrEqualToBlock.element.classList.add('horizontal-box');
        this.element.appendChild(this.lessThanOrEqualToBlock.element);
    }
}