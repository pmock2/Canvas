import { OperatorBlock } from "./draggable-types/operator-block";
import { VariableBlock } from "./draggable-types/variable-block";

export class VariableBox {
    element: HTMLDivElement;

    vendorBlock: VariableBlock = new VariableBlock('Vendor', true);
    agentBlock: VariableBlock = new VariableBlock('Agent', true);
    regionBlock: VariableBlock = new VariableBlock('Region', true);
    stateBlock: VariableBlock = new VariableBlock('State', true);
    jurisdictionBlock: VariableBlock = new VariableBlock('Jurisdiction', true);
    typeSearchIDBlock: VariableBlock = new VariableBlock('Type Search ID', true);

    constructor() {
        this.init();
    }

    init(): void {
        this.element = document.createElement('div');
        this.element.classList.add('variable-box-container');

        this.vendorBlock.element.classList.add('horizontal-box');
        this.element.appendChild(this.vendorBlock.element);

        this.agentBlock.element.classList.add('horizontal-box');
        this.element.appendChild(this.agentBlock.element);

        this.regionBlock.element.classList.add('horizontal-box');
        this.element.appendChild(this.regionBlock.element);

        this.stateBlock.element.classList.add('horizontal-box');
        this.element.appendChild(this.stateBlock.element);

        this.jurisdictionBlock.element.classList.add('horizontal-box');
        this.element.appendChild(this.jurisdictionBlock.element);

        this.typeSearchIDBlock.element.classList.add('horizontal-box');
        this.element.appendChild(this.typeSearchIDBlock.element);
    }
}