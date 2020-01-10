import { applicationShell } from './init';
import { DragItem } from './components/drag-item';
import { ConditionBlock } from './components/draggable-types/condition-block';

let highestZIndex = 0;

export function zIndexPlus(element: HTMLElement) {
    element.style.zIndex = `${highestZIndex + 1}`
    highestZIndex++;
}

export function printLn(toPrint: any, text: string = null): void {
    if (text === null) {
        console.log(toPrint);
        return;
    }
    console.log(toPrint, `${text}`);
}

let states = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District of Columbia', 'Federated States of Micronesia', 'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Island', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming']


export {
    applicationShell,
    DragItem,
    ConditionBlock,
    states
}