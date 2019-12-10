import { DragItem } from "./library";
import { Canvas } from "./components/canvas";
import { ActionItemBox } from "./components/action-item-box";
import { OperatorBox } from "./components/operator-item-box";

export class Shell {
    shell: HTMLDivElement;
    canvas: Canvas;
    actionItemBox: ActionItemBox;
    operatorItemBox: OperatorBox;
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
        
        document.onkeydown = (k: KeyboardEvent) => {
            let keyCode = k.keyCode;
            if (k.ctrlKey) {
                this.ctrlKey = true;
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