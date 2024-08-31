import { deleteChart } from "@syncfusion/ej2-react-spreadsheet";

export const cellSave = (spreadsheetRef, args) => {
    if (spreadsheetRef.current) {
        spreadsheetRef.current.updateCell({ value: args.value }, args.address);
    }
};

export const format = (spreadsheetRef, args) => {
    if (spreadsheetRef.current) {
        traverseRangeAndExecute(spreadsheetRef, args.range, (cellArgs) => {
            spreadsheetRef.current.updateCell({ style: args.style }, cellArgs.address);
        });
    }
};

export const cellDelete = (spreadsheetRef, args) => {
    if (spreadsheetRef.current) {
        spreadsheetRef.current.updateCell({ value: "" }, args.address);
    }
};

export const renameSheet = (spreadsheetRef, args) => {
    if (spreadsheetRef.current) {
        spreadsheetRef.current.updateAction({ action: "renameSheet", eventArgs: args });
    }
};

export const insertSheetTab = (spreadsheetRef, args) => {
    if (spreadsheetRef.current) {
        spreadsheetRef.current.updateAction({ action: "insert", eventArgs: args });
    }
};

export const removeSheet = (spreadsheetRef, args) => {
    if (spreadsheetRef.current) {
        spreadsheetRef.current.updateAction({ action: "removeSheet", eventArgs: args });
    }
};

export const insertChart = (spreadsheetRef, args) => {
    if (spreadsheetRef.current) {
        spreadsheetRef.current.updateAction({ action: "insertChart", eventArgs: args });
    }
};

export const refreshChart = (spreadsheetRef, args) => {
    if (spreadsheetRef.current) {
        spreadsheetRef.current.updateAction({ action: "chartRefresh", eventArgs: args });
    }
};

export const deleteChartFromSheet = (spreadsheetRef, args) => {
    if (spreadsheetRef.current) {

        spreadsheetRef.current.updateAction({ action: "deleteChart", eventArgs: args });
    }
};

export const sorting = (spreadsheetRef, args) => {
    if (spreadsheetRef.current) {
        spreadsheetRef.current.updateAction({ action: "sorting", eventArgs: args });
    }
};

export const filtering = (spreadsheetRef, args) => {
    if (spreadsheetRef.current) {
        spreadsheetRef.current.updateAction({ action: "filter", eventArgs: args });
    }
};

const traverseRangeAndExecute = (spreadsheetRef, address, callback) => {
    const [sheet, range] = address.split("!");
    const [startCell, endCell = startCell] = range.split(":");
    const [startCol, startRow] = [startCell.match(/[A-Z]+/)[0], parseInt(startCell.match(/[0-9]+/)[0])];
    const [endCol, endRow] = [endCell.match(/[A-Z]+/)[0], parseInt(endCell.match(/[0-9]+/)[0])];

    for (let i = startCol.charCodeAt(0); i <= endCol.charCodeAt(0); i++) {
        for (let j = startRow; j <= endRow; j++) {
            const cell = String.fromCharCode(i) + j;
            callback({ address: `${sheet}!${cell}` });
        }
    }
};

export const spreadSheetFunctionsThroughPut = (item, spreadsheetRef) => {
    const { action, eventArgs } = item;

    switch (action) {
        case "cellSave":
            cellSave(spreadsheetRef, eventArgs);
            break;
        case "format":
            format(spreadsheetRef, eventArgs);
            break;
        case "cellDelete":
            if (eventArgs.address) {
                traverseRangeAndExecute(spreadsheetRef, eventArgs.address, (args) => {
                    cellDelete(spreadsheetRef, args);
                });
            } else {
                cellDelete(spreadsheetRef, eventArgs);
            }
            break;
        case "renameSheet":
            renameSheet(spreadsheetRef, eventArgs);
            break;
        case "insert":
            insertSheetTab(spreadsheetRef, eventArgs);
            break;
        case "removeSheet":
            removeSheet(spreadsheetRef, eventArgs);
            break;
        case "insertChart":
            insertChart(spreadsheetRef, eventArgs);
            break;
        case "chartRefresh":
            refreshChart(spreadsheetRef, eventArgs);
            break;
        case "deleteChart":
            deleteChartFromSheet(spreadsheetRef, eventArgs);
            break;
        case "sorting":
            sorting(spreadsheetRef, eventArgs);
            break;
        case "filter":
            filtering(spreadsheetRef, eventArgs);
            break;
        default:
            console.warn(`Unknown action: ${action}`);
    }
};
