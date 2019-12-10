import {applicationShell} from './init';
import { DragItem } from './components/drag-item';

let highestZIndex = 0;

export function zIndexPlus(element: HTMLElement) {
    element.style.zIndex = `${highestZIndex + 1}`
    highestZIndex++;
}

export {
    applicationShell,
    DragItem
}