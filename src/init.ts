import { Canvas } from "./components/canvas";
import { ActionItemBox } from "./components/action-item-box";
import { OperatorBox } from "./components/operator-item-box";
import { VariableBox } from "./components/variable-item-box";

export class Shell {
    shell: HTMLDivElement;
    canvas: Canvas;
    actionItemBox: ActionItemBox;
    operatorItemBox: OperatorBox;
    variableItemBox: VariableBox;
    ctrlKey: boolean;

    constructor() {
        this.shell = document.querySelector('#shell');
        this.init();
    }

    init(): void {
        this.canvas = new Canvas;
        this.shell.appendChild(this.canvas.element);

        this.actionItemBox = new ActionItemBox();
        this.shell.appendChild(this.actionItemBox.element);

        this.operatorItemBox = new OperatorBox();
        this.shell.appendChild(this.operatorItemBox.element);

        this.variableItemBox = new VariableBox();
        this.shell.appendChild(this.variableItemBox.element);

        document.onkeydown = (k: KeyboardEvent) => {
            let keyCode = k.keyCode;
            if (k.ctrlKey) {
                this.ctrlKey = true;
            }
            switch (k.keyCode) {
                case 46: {
                    var toRemove: any = {};
                    let i = 0;
                    this.canvas.dragItems.forEach((item) => {
                        if (item.selected) {
                            toRemove[i] = item;
                            item.element.remove();
                        }
                        i++;
                    });
                    for (let i = 0; i < this.canvas.dragItems.length; i++) {
                        if (toRemove[i] !== undefined && toRemove[i] !== null) {
                            this.canvas.dragItems.splice(i, 1)
                        }
                    }   // toRemove.
                }
            }
        }

        document.onkeyup = (k: KeyboardEvent) => {
            if (k.ctrlKey) {
                this.ctrlKey = false;
            }
        }
    }
}

var applicationShell: Shell;

function init() {
    applicationShell = new Shell();
}

export {
    applicationShell,
    init
}