import { DragItem } from "./library";
import { Canvas } from "./components/canvas";
import { ActionItemBox } from "./components/action-item-box";

export class Shell {
    shell: HTMLDivElement;
    canvas: Canvas;
    actionItemBox: ActionItemBox;

    constructor() {
        this.shell = document.querySelector('#shell');
        this.init();
    }

    init(): void {
        this.canvas = new Canvas;
        this.shell.appendChild(this.canvas.element);

        this.actionItemBox = new ActionItemBox();
        this.shell.appendChild(this.actionItemBox.element);
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